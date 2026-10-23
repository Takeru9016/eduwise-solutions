import { isValidSignature } from "@sanity/webhook";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { SITEMAP_DOCUMENT_TYPES } from "@/lib/sitemap-content";

const sitemapDocumentTypes = new Set<string>(SITEMAP_DOCUMENT_TYPES);
const MAX_WEBHOOK_BODY_SIZE = 64 * 1024;
const SIGNATURE_MAX_AGE_MS = 5 * 60 * 1000;
const SIGNATURE_TIMESTAMP_PATTERN = /^t=(\d+)[, ]+v1=/;

interface SanityWebhookPayload {
  _type?: unknown;
}

export async function POST(request: Request) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    console.error(
      "[revalidate-sitemap] SANITY_WEBHOOK_SECRET is not configured"
    );
    return NextResponse.json(
      { error: "Webhook is not configured" },
      { status: 503 }
    );
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (contentLength > MAX_WEBHOOK_BODY_SIZE) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, "utf8") > MAX_WEBHOOK_BODY_SIZE) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  const signature = request.headers.get("sanity-webhook-signature");
  const timestamp = signature?.match(SIGNATURE_TIMESTAMP_PATTERN)?.[1];
  const timestampMs = timestamp ? Number(timestamp) : Number.NaN;
  if (
    !(signature && Number.isSafeInteger(timestampMs)) ||
    Math.abs(Date.now() - timestampMs) > SIGNATURE_MAX_AGE_MS ||
    !(await isValidSignature(rawBody, signature, secret))
  ) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: SanityWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as SanityWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (
    typeof payload._type !== "string" ||
    !sitemapDocumentTypes.has(payload._type)
  ) {
    return NextResponse.json({ revalidated: false, skipped: true });
  }

  revalidatePath("/sitemap.xml");
  return NextResponse.json({ revalidated: true });
}
