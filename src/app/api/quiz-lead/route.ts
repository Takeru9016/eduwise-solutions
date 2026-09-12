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
  mobileSchema,
  nameSchema,
} from "@/lib/security/validation";

const GENERIC_ERROR = {
  error: "Failed to submit. Please try again.",
} as const;

const bodySchema = z.object({
  [HONEYPOT_FIELD_NAME]: z.string().optional(),
  email: emailSchema,
  formToken: z.string().optional(),
  mobile: mobileSchema,
  name: nameSchema,
  recommendedCategory: z.string().trim().max(100).optional(),
  turnstileToken: z.string().optional(),
  wantsJobGuarantee: z.boolean().optional(),
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
        { error: "Name, email and mobile are required" },
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
      console.warn(`[quiz-lead] Rejected silently: ${botCheck.logReason}`);
      return NextResponse.json({ success: true });
    }
    if (botCheck.type === "reject") {
      console.warn(`[quiz-lead] Rejected: ${botCheck.logReason}`);
      return NextResponse.json(GENERIC_ERROR, { status: 400 });
    }

    const rateLimit = await checkLeadRateLimits({
      email: body.email,
      ip: getClientIp(req),
      mobile: body.mobile,
      route: "quiz-lead",
    });
    if (!rateLimit.allowed) {
      console.warn(`[quiz-lead] Rate limited: ${rateLimit.logReason}`);
      return NextResponse.json(GENERIC_ERROR, { status: 429 });
    }

    await recordLead(
      "quizLead",
      [
        body.name,
        body.email,
        body.mobile,
        body.recommendedCategory || "Not specified",
        body.wantsJobGuarantee ? "Yes" : "No",
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      ],
      body.mobile
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[quiz-lead] Error:", error);
    return NextResponse.json(GENERIC_ERROR, { status: 500 });
  }
}
