import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { revalidatePath } = vi.hoisted(() => ({
  revalidatePath: vi.fn(),
}));

vi.mock("next/cache", () => ({ revalidatePath }));

import { POST } from "./route";

const SECRET = "sitemap-webhook-test-secret";

function makeRequest(
  body: string,
  secret = SECRET,
  valid = true,
  timestamp = Date.now()
) {
  const signature = createHmac("sha256", secret)
    .update(`${timestamp}.${body}`)
    .digest("base64url");

  const signatureTimestamp = timestamp.toString();

  return new Request("http://localhost/api/revalidate-sitemap", {
    body,
    headers: {
      "sanity-webhook-signature": `t=${signatureTimestamp},v1=${valid ? signature : "invalid"}`,
    },
    method: "POST",
  });
}

describe("POST /api/revalidate-sitemap", () => {
  const originalSecret = process.env.SANITY_WEBHOOK_SECRET;

  beforeEach(() => {
    process.env.SANITY_WEBHOOK_SECRET = SECRET;
    revalidatePath.mockClear();
  });

  afterEach(() => {
    if (originalSecret === undefined) {
      delete process.env.SANITY_WEBHOOK_SECRET;
    } else {
      process.env.SANITY_WEBHOOK_SECRET = originalSecret;
    }
  });

  it("revalidates the sitemap for a valid sitemap document event", async () => {
    const response = await POST(
      makeRequest(JSON.stringify({ _type: "course" }))
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ revalidated: true });
    expect(revalidatePath).toHaveBeenCalledWith("/sitemap.xml");
  });

  it("revalidates after a CMS singleton page is updated", async () => {
    const response = await POST(
      makeRequest(JSON.stringify({ _type: "homePage" }))
    );
    expect(response.status).toBe(200);
    expect(revalidatePath).toHaveBeenCalledWith("/sitemap.xml");
  });

  it("rejects invalid signatures", async () => {
    const response = await POST(
      makeRequest(JSON.stringify({ _type: "course" }), SECRET, false)
    );

    expect(response.status).toBe(401);
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("rejects expired signed requests", async () => {
    const response = await POST(
      makeRequest(
        JSON.stringify({ _type: "course" }),
        SECRET,
        true,
        Date.now() - 6 * 60 * 1000
      )
    );

    expect(response.status).toBe(401);
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("skips document types that do not affect the sitemap", async () => {
    const response = await POST(
      makeRequest(JSON.stringify({ _type: "redirect" }))
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      revalidated: false,
      skipped: true,
    });
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("returns an unavailable response when the webhook secret is missing", async () => {
    delete process.env.SANITY_WEBHOOK_SECRET;

    const response = await POST(
      new Request("http://localhost/api/revalidate-sitemap", {
        body: JSON.stringify({ _type: "course" }),
        method: "POST",
      })
    );

    expect(response.status).toBe(503);
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
