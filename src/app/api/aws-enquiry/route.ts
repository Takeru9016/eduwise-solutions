import { NextResponse } from "next/server";
import { z } from "zod";
import { recordLead } from "@/lib/leads";
import {
  checkBotSignals,
  checkLeadRateLimits,
  getClientIp,
  parseJsonBody,
} from "@/lib/security/guard";
import { HONEYPOT_FIELD_NAME } from "@/lib/security/honeypot";
import {
  emailSchema,
  freeTextSchema,
  mobileSchema,
  nameSchema,
} from "@/lib/security/validation";

const GENERIC_ERROR = {
  error: "Failed to process form submission",
} as const;

const bodySchema = z.object({
  [HONEYPOT_FIELD_NAME]: z.string().optional(),
  email: emailSchema,
  firstName: nameSchema,
  formToken: z.string().optional(),
  lastName: nameSchema,
  message: freeTextSchema(1000),
  mobile: mobileSchema,
  subject: freeTextSchema(150),
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
      return NextResponse.json(GENERIC_ERROR, { status: 400 });
    }
    const body = result.data;

    const botCheck = await checkBotSignals({
      formToken: body.formToken,
      honeypotValue: body[HONEYPOT_FIELD_NAME],
      req,
      turnstileToken: body.turnstileToken,
    });

    if (botCheck.type === "silent-accept") {
      console.warn(`[aws-enquiry] Rejected silently: ${botCheck.logReason}`);
      return NextResponse.json({
        message: "Form submission saved successfully",
        success: true,
      });
    }
    if (botCheck.type === "reject") {
      console.warn(`[aws-enquiry] Rejected: ${botCheck.logReason}`);
      return NextResponse.json(GENERIC_ERROR, { status: 400 });
    }

    const rateLimit = await checkLeadRateLimits({
      email: body.email,
      ip: getClientIp(req),
      mobile: body.mobile,
      route: "aws-enquiry",
    });
    if (!rateLimit.allowed) {
      console.warn(`[aws-enquiry] Rate limited: ${rateLimit.logReason}`);
      return NextResponse.json(GENERIC_ERROR, { status: 429 });
    }

    const { duplicateSource } = await recordLead(
      "awsEnquiry",
      [
        body.firstName,
        body.lastName,
        body.email,
        body.mobile,
        body.subject,
        body.message,
      ],
      body.mobile
    );

    return NextResponse.json({
      duplicate: Boolean(duplicateSource),
      message: "Form submission saved successfully",
      success: true,
    });
  } catch (error) {
    console.error("[aws-enquiry] Error:", error);

    const statusCode =
      error instanceof Error &&
      error.message.includes("Missing required environment variables")
        ? 500
        : 503;

    return NextResponse.json(GENERIC_ERROR, { status: statusCode });
  }
}
