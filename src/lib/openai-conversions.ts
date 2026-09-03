import { SITE_URL } from "@/lib/seo";

const CAPI_ENDPOINT =
  "https://bzr.openai.com/v1/events?pid=QCitpXBdFMBPkmEeDB4Tvy";

// Relative pathname only - no scheme, no host, no query string. Keeps a
// client-supplied path from ever redirecting where OpenAI's Conversions
// API attributes the event.
const SAFE_PATH_PATTERN = /^\/[A-Za-z0-9\-._~/]*$/;

/**
 * Builds an absolute source_url for the OpenAI Conversions API from a
 * client-supplied pathname, always anchored to the site's own trusted
 * origin so a client can never point the event at an arbitrary domain.
 * Falls back to the site root when the pathname is missing or unsafe.
 */
export function buildSafeSourceUrl(pathname?: string): string {
  if (
    pathname &&
    SAFE_PATH_PATTERN.test(pathname) &&
    !pathname.includes("//")
  ) {
    try {
      return new URL(pathname, SITE_URL).toString();
    } catch {
      // fall through to the default below
    }
  }
  return SITE_URL;
}

interface LeadCreatedConversionInput {
  eventId: string;
  sourceUrl: string;
  timestampMs: number;
}

/**
 * Reports a lead_created conversion to OpenAI's server-side Conversions
 * API. This is secondary telemetry: it never throws and a failure here
 * must never affect the lead-persistence flow that calls it. Logs enough
 * to diagnose failures without ever logging the API key.
 */
export async function sendOpenAiLeadCreatedConversion({
  eventId,
  sourceUrl,
  timestampMs,
}: LeadCreatedConversionInput): Promise<void> {
  const apiKey = process.env.OPENAI_CONVERSIONS_API_KEY;

  if (!apiKey) {
    console.warn(
      "[openai-conversions] OPENAI_CONVERSIONS_API_KEY is not configured - skipping lead_created conversion"
    );
    return;
  }

  try {
    const res = await fetch(CAPI_ENDPOINT, {
      body: JSON.stringify({
        events: [
          {
            action_source: "web",
            data: { type: "customer_action" },
            id: eventId,
            source_url: sourceUrl,
            timestamp_ms: timestampMs,
            type: "lead_created",
          },
        ],
        validate_only: false,
      }),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(
        `[openai-conversions] CAPI request failed with status ${res.status}: ${body.slice(0, 300)}`
      );
    }
  } catch (error) {
    console.error(
      "[openai-conversions] CAPI request threw:",
      error instanceof Error ? error.message : error
    );
  }
}
