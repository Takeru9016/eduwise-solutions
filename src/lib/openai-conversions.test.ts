import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildSafeSourceUrl,
  sendOpenAiLeadCreatedConversion,
} from "./openai-conversions";

describe("buildSafeSourceUrl", () => {
  it("builds an absolute URL from a valid relative pathname", () => {
    expect(buildSafeSourceUrl("/courses/devops")).toBe(
      "https://eduwise.solutions/courses/devops"
    );
  });

  it("falls back to the site root when pathname is missing", () => {
    expect(buildSafeSourceUrl(undefined)).toBe("https://eduwise.solutions");
  });

  it("rejects a protocol-relative path that could redirect the origin", () => {
    expect(buildSafeSourceUrl("//evil.example.com/phish")).toBe(
      "https://eduwise.solutions"
    );
  });

  it("rejects an absolute URL supplied as a pathname", () => {
    expect(buildSafeSourceUrl("https://evil.example.com")).toBe(
      "https://eduwise.solutions"
    );
  });

  it("rejects a pathname containing a query string", () => {
    expect(buildSafeSourceUrl("/courses/devops?utm_source=chatgpt")).toBe(
      "https://eduwise.solutions"
    );
  });
});

describe("sendOpenAiLeadCreatedConversion", () => {
  const originalKey = process.env.OPENAI_CONVERSIONS_API_KEY;

  beforeEach(() => {
    process.env.OPENAI_CONVERSIONS_API_KEY = "test-key";
  });

  afterEach(() => {
    process.env.OPENAI_CONVERSIONS_API_KEY = originalKey;
    vi.restoreAllMocks();
  });

  it("skips the request when the API key is not configured", async () => {
    process.env.OPENAI_CONVERSIONS_API_KEY = "";
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    await sendOpenAiLeadCreatedConversion({
      eventId: "event-1",
      sourceUrl: "https://eduwise.solutions/courses/devops",
      timestampMs: 1,
    });

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("sends the lead_created event with the same event_id and never throws on HTTP failure", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("server error", { status: 500 }));

    await expect(
      sendOpenAiLeadCreatedConversion({
        eventId: "event-1",
        sourceUrl: "https://eduwise.solutions/courses/devops",
        timestampMs: 1000,
      })
    ).resolves.toBeUndefined();

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe(
      "https://bzr.openai.com/v1/events?pid=QCitpXBdFMBPkmEeDB4Tvy"
    );
    const payload = JSON.parse(init?.body as string);
    expect(payload.events[0]).toMatchObject({
      action_source: "web",
      data: { type: "customer_action" },
      id: "event-1",
      source_url: "https://eduwise.solutions/courses/devops",
      timestamp_ms: 1000,
      type: "lead_created",
    });
  });

  it("never throws when the network request itself fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network down"));

    await expect(
      sendOpenAiLeadCreatedConversion({
        eventId: "event-1",
        sourceUrl: "https://eduwise.solutions/courses/devops",
        timestampMs: 1,
      })
    ).resolves.toBeUndefined();
  });
});
