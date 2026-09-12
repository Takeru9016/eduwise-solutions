import { SITE_URL } from "@/lib/seo";

/**
 * Soft same-origin check. Trivially spoofable by a deliberate attacker
 * (Origin is just a header) - this filters naive cross-origin scripts and
 * browser extensions, it's one signal among several, not a security
 * boundary on its own.
 */
export function isTrustedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");

  // Many legitimate same-origin requests (older browsers, some server-to-
  // server retries) omit Origin entirely - don't penalize its absence.
  if (!origin) {
    return true;
  }

  try {
    return new URL(origin).origin === new URL(SITE_URL).origin;
  } catch {
    return false;
  }
}
