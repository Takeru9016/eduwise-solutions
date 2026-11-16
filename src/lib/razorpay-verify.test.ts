import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  isRazorpayPaymentPaid,
  isValidRazorpayPaymentId,
} from "./razorpay-verify";

describe("isRazorpayPaymentPaid", () => {
  const original = {
    id: process.env.RAZORPAY_KEY_ID,
    secret: process.env.RAZORPAY_KEY_SECRET,
  };

  beforeEach(() => {
    process.env.RAZORPAY_KEY_ID = "rzp_test_key";
    process.env.RAZORPAY_KEY_SECRET = "secret";
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => {
    process.env.RAZORPAY_KEY_ID = original.id;
    process.env.RAZORPAY_KEY_SECRET = original.secret;
    vi.restoreAllMocks();
  });

  it("rejects malformed IDs without calling Razorpay", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    expect(isValidRazorpayPaymentId("pay_ABC123xyz")).toBe(true);
    expect(isValidRazorpayPaymentId("pay_../../orders")).toBe(false);
    await expect(isRazorpayPaymentPaid("../../orders")).resolves.toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns true only for a captured or authorized payment", async () => {
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(Response.json({ status: "captured" }))
      .mockResolvedValueOnce(Response.json({ status: "failed" }));
    await expect(isRazorpayPaymentPaid("pay_ABC123xyz")).resolves.toBe(true);
    await expect(isRazorpayPaymentPaid("pay_ABC123xyz")).resolves.toBe(false);
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("https://api.razorpay.com/v1/payments/pay_ABC123xyz");
    const headers = init?.headers as Record<string, string> | undefined;
    expect(headers?.Authorization.startsWith("Basic ")).toBe(true);
  });

  it("fails closed on HTTP errors, network errors and missing keys", async () => {
    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response("not found", { status: 404 }))
      .mockRejectedValueOnce(new Error("ECONNRESET"));
    await expect(isRazorpayPaymentPaid("pay_ABC123xyz")).resolves.toBe(false);
    await expect(isRazorpayPaymentPaid("pay_ABC123xyz")).resolves.toBe(false);
    process.env.RAZORPAY_KEY_SECRET = "";
    await expect(isRazorpayPaymentPaid("pay_ABC123xyz")).resolves.toBe(false);
  });
});
