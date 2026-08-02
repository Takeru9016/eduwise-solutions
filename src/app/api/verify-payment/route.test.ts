import crypto from "crypto";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { POST } from "./route";

const KEY_SECRET = "test_secret";

function signaturePayload(orderId: string, paymentId: string) {
  return crypto
    .createHmac("sha256", KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
}

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/verify-payment", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

describe("POST /api/verify-payment", () => {
  const originalSecret = process.env.RAZORPAY_KEY_SECRET;

  beforeEach(() => {
    process.env.RAZORPAY_KEY_SECRET = KEY_SECRET;
  });

  afterEach(() => {
    process.env.RAZORPAY_KEY_SECRET = originalSecret;
  });

  it("accepts a request with a valid HMAC signature", async () => {
    const razorpay_order_id = "order_123";
    const razorpay_payment_id = "pay_456";
    const razorpay_signature = signaturePayload(razorpay_order_id, razorpay_payment_id);

    const response = await POST(
      makeRequest({ razorpay_order_id, razorpay_payment_id, razorpay_signature }),
    );
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json).toEqual({ success: true });
  });

  it("rejects a request with an invalid signature", async () => {
    const response = await POST(
      makeRequest({
        razorpay_order_id: "order_123",
        razorpay_payment_id: "pay_456",
        razorpay_signature: "not_the_real_signature",
      }),
    );
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Payment verification failed");
  });

  it("rejects a signature computed against a different order/payment pair", async () => {
    const razorpay_signature = signaturePayload("order_123", "pay_456");

    const response = await POST(
      makeRequest({
        razorpay_order_id: "order_123",
        razorpay_payment_id: "pay_DIFFERENT",
        razorpay_signature,
      }),
    );

    expect(response.status).toBe(400);
  });
});
