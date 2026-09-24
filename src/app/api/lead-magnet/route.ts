import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import LeadMagnetDeliveryEmail from "@/emails/lead-magnet-delivery";
import { SITE_FROM_EMAIL } from "@/lib/email-sender";
import { recordLead } from "@/lib/leads";
import {
  checkBotSignals,
  checkLeadRateLimits,
  getClientIp,
  parseJsonBody,
} from "@/lib/security/guard";
import { HONEYPOT_FIELD_NAME } from "@/lib/security/honeypot";
import { emailSchema, nameSchema } from "@/lib/security/validation";
import { client } from "@/sanity/lib/client";
import { LEAD_MAGNET_BY_SLUG_QUERY } from "@/sanity/lib/queries";

interface LeadMagnet {
  _id: string;
  pdfFilename: string | null;
  pdfUrl: string | null;
  slug: { current: string };
  title: string;
}

const GENERIC_ERROR = {
  error: "Failed to process request. Please try again.",
} as const;

const bodySchema = z.object({
  [HONEYPOT_FIELD_NAME]: z.string().optional(),
  email: emailSchema,
  formToken: z.string().optional(),
  name: nameSchema,
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/i, "Invalid resource"),
  turnstileToken: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const parsed = await parseJsonBody(req);
    if (!parsed.ok) {
      return NextResponse.json(GENERIC_ERROR, { status: parsed.status });
    }

    const result = bodySchema.safeParse(parsed.data);
    if (!result.success) {
      return NextResponse.json(
        { error: "Name, email and resource are required" },
        { status: 400 }
      );
    }
    const body = result.data;

    const botCheck = await checkBotSignals({
      formToken: body.formToken,
      honeypotValue: body[HONEYPOT_FIELD_NAME],
      req,
      turnstileToken: body.turnstileToken,
    });

    if (botCheck.type === "silent-accept") {
      console.warn(`[lead-magnet] Rejected silently: ${botCheck.logReason}`);
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }
    if (botCheck.type === "reject") {
      console.warn(`[lead-magnet] Rejected: ${botCheck.logReason}`);
      return NextResponse.json(GENERIC_ERROR, { status: 400 });
    }

    const rateLimit = await checkLeadRateLimits({
      email: body.email,
      ip: getClientIp(req),
      route: "lead-magnet",
    });
    if (!rateLimit.allowed) {
      console.warn(`[lead-magnet] Rate limited: ${rateLimit.logReason}`);
      return NextResponse.json(GENERIC_ERROR, { status: 429 });
    }

    const resource = await client.fetch<LeadMagnet | null>(
      LEAD_MAGNET_BY_SLUG_QUERY,
      { slug: body.slug }
    );

    if (!resource?.pdfUrl) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    await recordLead("leadMagnet", [
      body.name,
      body.email,
      resource.title,
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    ]);

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: SITE_FROM_EMAIL,
        react: LeadMagnetDeliveryEmail({
          downloadUrl: resource.pdfUrl,
          name: body.name,
          resourceTitle: resource.title,
        }),
        subject: `Your free guide: ${resource.title}`,
        to: body.email,
      });
    }

    return NextResponse.json({ downloadUrl: resource.pdfUrl, success: true });
  } catch (error) {
    console.error("[lead-magnet] Error:", error);
    return NextResponse.json(GENERIC_ERROR, { status: 500 });
  }
}
