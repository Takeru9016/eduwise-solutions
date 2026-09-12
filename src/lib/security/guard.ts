import { verifyFormToken } from "@/lib/security/form-token";
import { isHoneypotTripped } from "@/lib/security/honeypot";
import { maskEmail, maskPhone } from "@/lib/security/logging";
import { isTrustedOrigin } from "@/lib/security/origin-check";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";

const MAX_BODY_BYTES = 10_000;

export type ParsedBody =
  | { data: Record<string, unknown>; ok: true }
  | { ok: false; reason: string; status: number };

/**
 * Reads and parses the request body with explicit size/content-type/
 * malformed-JSON guards, before any downstream code sees it.
 */
export async function parseJsonBody(req: Request): Promise<ParsedBody> {
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return { ok: false, reason: "bad-content-type", status: 415 };
  }

  const contentLength = Number(req.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return { ok: false, reason: "payload-too-large", status: 413 };
  }

  const text = await req.text();
  if (text.length > MAX_BODY_BYTES) {
    return { ok: false, reason: "payload-too-large", status: 413 };
  }

  try {
    const data = JSON.parse(text);
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
      return { ok: false, reason: "malformed-json", status: 400 };
    }
    return { data: data as Record<string, unknown>, ok: true };
  } catch {
    return { ok: false, reason: "malformed-json", status: 400 };
  }
}

export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export type BotCheckOutcome =
  | { logReason: string; type: "reject" }
  | { logReason: string; type: "silent-accept" }
  | { timingSuspicious: boolean; type: "proceed" };

/**
 * Honeypot, signed form token, Turnstile, and origin checks. Honeypot
 * trips return "silent-accept" (a generic success response, no
 * persistence, no conversions) so bots never learn what triggered
 * detection. Everything else that genuinely fails returns "reject" with a
 * generic client-facing error.
 */
export async function checkBotSignals(input: {
  formToken: unknown;
  honeypotValue: unknown;
  req: Request;
  turnstileToken: unknown;
}): Promise<BotCheckOutcome> {
  if (isHoneypotTripped(input.honeypotValue)) {
    return { logReason: "honeypot", type: "silent-accept" };
  }

  if (!isTrustedOrigin(input.req)) {
    return { logReason: "origin-mismatch", type: "reject" };
  }

  const tokenResult = verifyFormToken(input.formToken);
  if (!tokenResult.valid) {
    return { logReason: `form-token:${tokenResult.reason}`, type: "reject" };
  }

  const turnstile = await verifyTurnstileToken(
    input.turnstileToken,
    getClientIp(input.req)
  );
  if (!turnstile.success) {
    return { logReason: "turnstile-failed", type: "reject" };
  }

  return { timingSuspicious: tokenResult.tooFast, type: "proceed" };
}

export interface RateLimitInputs {
  email?: string;
  ip: string;
  mobile?: string;
  route: string;
}

/**
 * Layered rate limits: per-IP burst protection, plus tighter per-contact
 * limits keyed on normalized email/mobile so one person can't flood a
 * form even by rotating IPs. All buckets fail open when Upstash isn't
 * configured (see checkRateLimit).
 */
export async function checkLeadRateLimits(
  input: RateLimitInputs
): Promise<{ allowed: boolean; logReason?: string }> {
  const ipCheck = await checkRateLimit(`${input.route}:ip`, input.ip, 20, 600);
  if (!ipCheck.allowed) {
    return { allowed: false, logReason: `rate-limit:ip:${input.ip}` };
  }

  if (input.email) {
    const emailCheck = await checkRateLimit(
      "lead:email",
      input.email,
      5,
      86_400
    );
    if (!emailCheck.allowed) {
      return {
        allowed: false,
        logReason: `rate-limit:email:${maskEmail(input.email)}`,
      };
    }
  }

  if (input.mobile) {
    const mobileCheck = await checkRateLimit(
      "lead:mobile",
      input.mobile,
      5,
      86_400
    );
    if (!mobileCheck.allowed) {
      return {
        allowed: false,
        logReason: `rate-limit:mobile:${maskPhone(input.mobile)}`,
      };
    }
  }

  return { allowed: true };
}
