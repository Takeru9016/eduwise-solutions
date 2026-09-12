/**
 * Cloudflare Turnstile server-side verification.
 *
 * Fails open (skips the check, logs a warning) when TURNSTILE_SECRET_KEY
 * is unset - the widget still renders using the default Cloudflare TEST
 * sitekey (1x00000000000000000000AA, "always passes"), but until a real
 * secret is configured this provides NO actual bot protection. Replace
 * both NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY with real
 * production keys from the Cloudflare Turnstile dashboard before launch.
 */

const VERIFY_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface TurnstileResult {
  skipped: boolean;
  success: boolean;
}

export async function verifyTurnstileToken(
  token: unknown,
  remoteIp?: string
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.warn(
      "[turnstile] TURNSTILE_SECRET_KEY not configured - Turnstile verification is disabled"
    );
    return { skipped: true, success: true };
  }

  if (typeof token !== "string" || token.length === 0) {
    return { skipped: false, success: false };
  }

  try {
    const body = new URLSearchParams({ response: token, secret });
    if (remoteIp) {
      body.set("remoteip", remoteIp);
    }

    const res = await fetch(VERIFY_ENDPOINT, { body, method: "POST" });
    const data = (await res.json()) as { success: boolean };
    return { skipped: false, success: Boolean(data.success) };
  } catch (error) {
    console.error("[turnstile] Verification request failed:", error);
    // Infra failure, not a bot signal - fail open rather than blocking
    // every lead because Cloudflare's API had a blip.
    return { skipped: true, success: true };
  }
}
