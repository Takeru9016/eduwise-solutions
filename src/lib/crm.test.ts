import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { utmSchema } from "@/lib/security/validation";
import {
  buildCrmLeadPayload,
  ENROLLED_STATUS,
  mapCourseInterest,
  pushLeadToCrm,
  resolvePaymentClaim,
} from "./crm";

vi.mock("@/lib/email-sender", () => ({
  sendCrmSyncFailureNotification: vi.fn().mockResolvedValue(undefined),
}));

import { sendCrmSyncFailureNotification } from "@/lib/email-sender";

describe("mapCourseInterest", () => {
  it.each([
    [
      "Master DevOps with Gen AI - Get Placement Assistance",
      "DevOps with Gen AI",
    ],
    [
      "Certificate Course in Artificial Intelligence and Machine Learning",
      "AI & Machine Learning",
    ],
    ["Data Science Course with Placement", "Data Science"],
    ["Cyber Security Course with Placement", "Cyber Security"],
    [
      "Best Digital Marketing Course with Placement Support",
      "Digital Marketing",
    ],
    [
      "AWS Certified Cloud Practitioner (CLF-C02)",
      "AWS Certification / Voucher",
    ],
    ["AI", "AI & Machine Learning"],
    ["AI for Business & Automation", "Other"],
  ])("maps %s", (text, expected) => {
    expect(mapCourseInterest(text)).toBe(expected);
  });

  it("returns undefined for unrelated or empty text", () => {
    expect(mapCourseInterest("Fee enquiry")).toBeUndefined();
    expect(mapCourseInterest("")).toBeUndefined();
    expect(mapCourseInterest(undefined)).toBeUndefined();
  });

  it("does not match 'ai' inside other words", () => {
    expect(mapCourseInterest("Need details")).toBeUndefined();
  });
});

describe("buildCrmLeadPayload", () => {
  it("splits a full name and maps the course", () => {
    const payload = buildCrmLeadPayload(
      {
        courseText: "Data Science Course with Placement",
        email: "a@b.com",
        form: "Website: Course form",
        fullName: "Varsha Singh M",
        mobile: "9876543210",
      },
      "web-1"
    );
    expect(payload).toEqual({
      custom_course_interest: "Data Science",
      custom_enquiry_form: "Website: Course form",
      custom_source_key: "web-1",
      email: "a@b.com",
      first_name: "Varsha",
      last_name: "Singh M",
      mobile_no: "9876543210",
      source: "Website",
    });
  });

  it("prefers an explicit course and omits empty fields", () => {
    const payload = buildCrmLeadPayload(
      {
        course: "AWS Certification / Voucher",
        courseText: "Data Science",
        firstName: "Kushal",
        form: "Website: AWS enquiry form",
      },
      "web-2"
    );
    expect(payload.custom_course_interest).toBe("AWS Certification / Voucher");
    expect(payload).not.toHaveProperty("last_name");
    expect(payload).not.toHaveProperty("email");
    expect(payload).not.toHaveProperty("mobile_no");
  });

  it("falls back to a placeholder first name and caps the message", () => {
    const payload = buildCrmLeadPayload(
      { form: "Website: Contact form", message: "x".repeat(5000) },
      "web-3"
    );
    expect(payload.first_name).toBe("Website lead");
    expect(payload.custom_enquiry_message).toHaveLength(1000);
  });
});

describe("pushLeadToCrm", () => {
  const original = {
    token: process.env.CRM_INTAKE_TOKEN,
    url: process.env.CRM_API_URL,
  };
  const lead = {
    email: "a@b.com",
    firstName: "Test",
    form: "Website: Contact form",
    mobile: "9876543210",
  };
  const noWait = { retryDelaysMs: [1, 1], sleep: () => Promise.resolve() };

  beforeEach(() => {
    process.env.CRM_API_URL = "https://crm.example.com/";
    process.env.CRM_INTAKE_TOKEN = "key:secret";
  });

  afterEach(() => {
    process.env.CRM_API_URL = original.url;
    process.env.CRM_INTAKE_TOKEN = original.token;
    vi.restoreAllMocks();
    vi.mocked(sendCrmSyncFailureNotification).mockClear();
  });

  it("skips without calling the CRM when not configured", async () => {
    process.env.CRM_INTAKE_TOKEN = "";
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    await expect(pushLeadToCrm(lead, noWait)).resolves.toBe("skipped");
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("creates the lead with the intake token", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("{}", { status: 200 }));
    await expect(pushLeadToCrm(lead, noWait)).resolves.toBe("created");
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("https://crm.example.com/api/resource/CRM%20Lead");
    const headers = init?.headers as Record<string, string> | undefined;
    expect(headers?.Authorization).toBe("token key:secret");
    const body = JSON.parse(init?.body as string);
    expect(body.source).toBe("Website");
    expect(body.custom_source_key.startsWith("web-")).toBe(true);
  });

  it("retries a server error with the SAME source key", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response("deadlock", { status: 500 }))
      .mockResolvedValueOnce(new Response("{}", { status: 200 }));
    await expect(pushLeadToCrm(lead, noWait)).resolves.toBe("created");
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    const keys = fetchSpy.mock.calls.map(
      ([, init]) => JSON.parse(init?.body as string).custom_source_key
    );
    expect(keys[0]).toBe(keys[1]);
  });

  it("treats 'already exists' as success (an earlier attempt worked)", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockRejectedValueOnce(new Error("timeout"))
      .mockResolvedValueOnce(
        new Response("Source key web-x already exists", { status: 417 })
      );
    await expect(pushLeadToCrm(lead, noWait)).resolves.toBe("duplicate");
    expect(sendCrmSyncFailureNotification).not.toHaveBeenCalled();
  });

  it("does not retry a 4xx and emails the admin", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response("AuthenticationError", { status: 401 }));
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    await expect(pushLeadToCrm(lead, noWait)).resolves.toBe("failed");
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(sendCrmSyncFailureNotification).toHaveBeenCalledTimes(1);
  });

  it("gives up after 3 attempts on repeated network errors, never throwing", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockRejectedValue(new Error("ECONNRESET"));
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    await expect(pushLeadToCrm(lead, noWait)).resolves.toBe("failed");
    expect(fetchSpy).toHaveBeenCalledTimes(3);
    const errorLog = vi.mocked(console.error).mock.calls.flat().join(" ");
    expect(errorLog).not.toContain("key:secret");
  });
});

describe("UTM and payment handling", () => {
  it("puts campaign tags and status into the CRM fields", () => {
    const payload = buildCrmLeadPayload(
      {
        firstName: "A",
        form: "Website: Course form",
        status: ENROLLED_STATUS,
        utm: { campaign: "devops_nov", medium: "paid", source: "facebook" },
      },
      "web-9"
    );
    expect(payload).toMatchObject({
      custom_utm_campaign: "devops_nov",
      custom_utm_medium: "paid",
      custom_utm_source: "facebook",
      status: "Won / Enrolled",
    });
  });

  it("leaves UTM fields out when there are no tags", () => {
    const payload = buildCrmLeadPayload({ firstName: "A", form: "f" }, "k");
    expect(payload).not.toHaveProperty("custom_utm_source");
    expect(payload).not.toHaveProperty("status");
  });

  it("marks a verified payment as enrolled and an unverified one as a labelled lead", async () => {
    const base = { firstName: "A", form: "Website: Payment confirmation" };
    const paid = await resolvePaymentClaim(
      { ...base, paymentId: "pay_ABC123xyz" },
      () => Promise.resolve(true)
    );
    expect(paid.status).toBe(ENROLLED_STATUS);
    const unpaid = await resolvePaymentClaim(
      { ...base, paymentId: "pay_ABC123xyz" },
      () => Promise.resolve(false)
    );
    expect(unpaid.status).toBeUndefined();
    expect(unpaid.form).toContain("UNVERIFIED");
    const plain = await resolvePaymentClaim(base, () => {
      throw new Error("must not be called without a payment ID");
    });
    expect(plain).toBe(base);
  });
});

describe("utmSchema", () => {
  it("accepts tags, and drops malformed ones instead of rejecting the lead", () => {
    expect(utmSchema.parse({ source: " google " })).toEqual({
      source: "google",
    });
    expect(utmSchema.parse({ source: "x".repeat(500) })).toBeUndefined();
    expect(utmSchema.parse("not-an-object")).toBeUndefined();
    expect(utmSchema.parse(undefined)).toBeUndefined();
  });
});
