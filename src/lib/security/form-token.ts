import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Lightweight signed form token: proves a client fetched a token from our
 * own server recently, and gives us a trustworthy issued-at time for the
 * timing check (a client-supplied timestamp can't be trusted; this one is
 * server-stamped and HMAC-signed so it can't be forged or backdated).
 *
 * This is a naive-bot filter, not a hard guarantee - GET /api/form-token
 * mints freely to any caller. It stops scripts that POST straight to a
 * lead endpoint with no prior request, which covers most drive-by spam.
 *
 * Fails open (see verifyFormToken) when ANTI_SPAM_SECRET is not
 * configured, so a missing env var never blocks real leads.
 */

const TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes
const MIN_FILL_TIME_MS = 1500; // reject submissions faster than this

function getSecret(): string | null {
  return process.env.ANTI_SPAM_SECRET || null;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function issueFormToken(): string {
  const secret = getSecret();
  const issuedAt = Date.now();
  const payload = String(issuedAt);

  if (!secret) {
    // No secret configured - return an unsigned token so the endpoint
    // still works end-to-end; verification below treats this as
    // "unconfigured" and skips the check rather than rejecting.
    return `${payload}.unsigned`;
  }

  return `${payload}.${sign(payload, secret)}`;
}

export interface FormTokenResult {
  ageMs: number | null;
  reason?: "expired" | "invalid" | "malformed" | "unconfigured";
  tooFast: boolean;
  valid: boolean;
}

export function verifyFormToken(token: unknown): FormTokenResult {
  const secret = getSecret();

  if (!secret) {
    return { ageMs: null, reason: "unconfigured", tooFast: false, valid: true };
  }

  if (typeof token !== "string" || !token.includes(".")) {
    return { ageMs: null, reason: "malformed", tooFast: false, valid: false };
  }

  const [payload, signature] = token.split(".");
  const issuedAt = Number(payload);

  if (!(payload && signature) || Number.isNaN(issuedAt)) {
    return { ageMs: null, reason: "malformed", tooFast: false, valid: false };
  }

  const expected = sign(payload, secret);
  const expectedBuf = Buffer.from(expected);
  const givenBuf = Buffer.from(signature);
  const signatureMatches =
    expectedBuf.length === givenBuf.length &&
    timingSafeEqual(expectedBuf, givenBuf);

  if (!signatureMatches) {
    return { ageMs: null, reason: "invalid", tooFast: false, valid: false };
  }

  const ageMs = Date.now() - issuedAt;

  if (ageMs > TOKEN_TTL_MS) {
    return { ageMs, reason: "expired", tooFast: false, valid: false };
  }

  return { ageMs, tooFast: ageMs < MIN_FILL_TIME_MS, valid: true };
}
