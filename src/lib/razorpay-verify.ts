/**
 * Server-only check that a Razorpay payment ID is real and paid, used before
 * the CRM marks someone "Won / Enrolled". The payment page reports the ID
 * from the browser, so on its own it is only a claim.
 *
 * Fails CLOSED: any error, missing key or unexpected answer returns false,
 * and the lead is then created as an ordinary (unverified) lead instead.
 */

// Razorpay payment IDs look like "pay_29QQoUBi66xm2f".
const PAYMENT_ID_PATTERN = /^pay_[A-Za-z0-9]{6,40}$/;
const PAID_STATUSES = new Set(["authorized", "captured"]);
const REQUEST_TIMEOUT_MS = 8000;

export function isValidRazorpayPaymentId(id: string): boolean {
  return PAYMENT_ID_PATTERN.test(id);
}

export async function isRazorpayPaymentPaid(
  paymentId: string
): Promise<boolean> {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!(keyId && keySecret && isValidRazorpayPaymentId(paymentId))) {
    return false;
  }
  try {
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const res = await fetch(
      `https://api.razorpay.com/v1/payments/${paymentId}`,
      {
        headers: { Authorization: `Basic ${auth}` },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      }
    );
    if (!res.ok) {
      console.warn(
        `[razorpay-verify] Payment lookup returned HTTP ${res.status}`
      );
      return false;
    }
    const payment = (await res.json()) as { status?: string };
    return PAID_STATUSES.has(String(payment.status));
  } catch (error) {
    console.warn(
      "[razorpay-verify] Payment lookup failed:",
      error instanceof Error ? error.message : error
    );
    return false;
  }
}
