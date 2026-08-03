import { beforeEach, describe, expect, it, vi } from "vitest";

const ordersCreateMock = vi.fn();

vi.mock("razorpay", () => ({
  default: class MockRazorpay {
    orders = { create: ordersCreateMock };
  },
}));

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/create-order", {
    body: JSON.stringify(body),
    method: "POST",
  });
}

describe("POST /api/create-order", () => {
  beforeEach(() => {
    ordersCreateMock.mockReset();
    process.env.RAZORPAY_KEY_ID = "test_key_id";
    process.env.RAZORPAY_KEY_SECRET = "test_key_secret";
  });

  it("converts the rupee amount to paise before calling Razorpay", async () => {
    ordersCreateMock.mockResolvedValue({ amount: 150_000, id: "order_abc" });

    const { POST } = await import("./route");
    const response = await POST(makeRequest({ amount: 1500 }));
    const json = await response.json();

    expect(ordersCreateMock).toHaveBeenCalledWith(
      expect.objectContaining({ amount: 150_000, currency: "INR" })
    );
    expect(response.status).toBe(200);
    expect(json.order).toEqual({ amount: 150_000, id: "order_abc" });
  });

  it("returns a 500 when Razorpay order creation fails", async () => {
    ordersCreateMock.mockRejectedValue(new Error("razorpay down"));

    const { POST } = await import("./route");
    const response = await POST(makeRequest({ amount: 1500 }));

    expect(response.status).toBe(500);
  });
});
