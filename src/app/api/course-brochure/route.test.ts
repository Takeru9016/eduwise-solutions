import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BROCHURE_CONTACT_CONSENT } from "@/lib/brochure-consent";
import { HONEYPOT_FIELD_NAME } from "@/lib/security/honeypot";
import { POST } from "./route";

const { fetchCourse, recordLead } = vi.hoisted(() => ({
  fetchCourse: vi.fn(),
  recordLead: vi.fn(),
}));

vi.mock("@/sanity/lib/client", () => ({ client: { fetch: fetchCourse } }));
vi.mock("@/lib/leads", () => ({ recordLead }));

const SLUG = "ai-for-business-and-automation";
const COURSE = "AI for Business & Automation";
const PDF = "https://cdn.sanity.io/files/project/production/brochure.pdf";

function submit(overrides: Record<string, unknown> = {}) {
  return POST(
    new Request("https://eduwise.solutions/api/course-brochure", {
      body: JSON.stringify({
        consent: true,
        email: "learner@example.com",
        mobile: "+919123456789",
        name: "Test Learner",
        slug: SLUG,
        ...overrides,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
  );
}

describe("POST /api/course-brochure", () => {
  beforeEach(() => {
    vi.stubEnv("ANTI_SPAM_SECRET", undefined);
    vi.stubEnv("TURNSTILE_SECRET_KEY", undefined);
    vi.stubEnv("UPSTASH_REDIS_REST_URL", undefined);
    vi.resetAllMocks();
    fetchCourse.mockResolvedValue({ brochureUrl: PDF, title: COURSE });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("records the course and contact consent before releasing the PDF", async () => {
    const sheetWrite = Promise.withResolvers<void>();
    const saveStarted = Promise.withResolvers<void>();
    recordLead.mockImplementation(() => {
      saveStarted.resolve();
      return sheetWrite.promise;
    });

    let responseSent = false;
    const pending = submit({ downloadUrl: "https://example.com/other.pdf" });
    const response = pending.then((resolved) => {
      responseSent = true;
      return resolved;
    });
    await saveStarted.promise;
    expect(responseSent).toBe(false);
    expect(recordLead).toHaveBeenCalledWith(
      "courseBrochure",
      [
        "Test Learner",
        "learner@example.com",
        "9123456789",
        COURSE,
        SLUG,
        BROCHURE_CONTACT_CONSENT,
      ],
      "9123456789",
      expect.objectContaining({
        courseText: COURSE,
        form: `Website: Course brochure (${SLUG})`,
        message: expect.stringContaining(BROCHURE_CONTACT_CONSENT),
      })
    );
    sheetWrite.resolve();

    const result = await response;
    expect(result.status).toBe(200);
    expect(result.headers.get("Cache-Control")).toBe("no-store");
    expect(await result.json()).toEqual({ downloadUrl: `${PDF}?dl=` });
  });

  it("withholds the PDF when the write fails", async () => {
    recordLead.mockRejectedValueOnce(new Error("Sheets unavailable"));

    const response = await submit();
    expect(response.status).toBe(503);
    expect(await response.json()).not.toHaveProperty("downloadUrl");
  });

  it.each([
    ["missing consent", { consent: undefined }, 400],
    ["declined consent", { consent: false }, 400],
    ["invalid mobile", { mobile: "123" }, 400],
    ["honeypot submission", { [HONEYPOT_FIELD_NAME]: "filled" }, 404],
  ])("rejects %s before recording a lead", async (_, overrides, status) => {
    const response = await submit(overrides);
    expect(response.status).toBe(status);
    expect(await response.json()).not.toHaveProperty("downloadUrl");
    expect(recordLead).not.toHaveBeenCalled();
  });

  it("preserves existing site-local fallback brochure links", async () => {
    const brochureUrl = "/courses/ai-business/brochure.pdf";
    fetchCourse.mockResolvedValueOnce({ brochureUrl, title: COURSE });

    const response = await submit();
    expect(await response.json()).toEqual({ downloadUrl: brochureUrl });
  });
});
