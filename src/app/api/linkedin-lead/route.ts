import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { recordLead } from "@/lib/leads";
import {
  buildSafeSourceUrl,
  sendOpenAiLeadCreatedConversion,
} from "@/lib/openai-conversions";
import {
  checkBotSignals,
  checkLeadRateLimits,
  getClientIp,
  parseJsonBody,
} from "@/lib/security/guard";
import { HONEYPOT_FIELD_NAME } from "@/lib/security/honeypot";
import {
  consentSchema,
  courseSchema,
  emailSchema,
  mobileSchema,
  nameSchema,
} from "@/lib/security/validation";

// Name is legacy: this route now handles every CourseLeadForm submission
// (DevOps included), not just LinkedIn-sourced traffic. Left in place to
// avoid a rename with only one caller and no compelling reason to churn it.

const GENERIC_ERROR = {
  error: "Failed to submit. Please try again.",
} as const;

const bodySchema = z.object({
  [HONEYPOT_FIELD_NAME]: z.string().optional(),
  consent: consentSchema,
  course: courseSchema,
  email: emailSchema,
  formToken: z.string().optional(),
  mobile: mobileSchema,
  name: nameSchema,
  pagePath: z.string().optional(),
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
      console.warn(`[linkedin-lead] Rejected silently: ${botCheck.logReason}`);
      return NextResponse.json({ success: true });
    }
    if (botCheck.type === "reject") {
      console.warn(`[linkedin-lead] Rejected: ${botCheck.logReason}`);
      return NextResponse.json(GENERIC_ERROR, { status: 400 });
    }

    const rateLimit = await checkLeadRateLimits({
      email: body.email,
      ip: getClientIp(req),
      mobile: body.mobile,
      route: "linkedin-lead",
    });
    if (!rateLimit.allowed) {
      console.warn(`[linkedin-lead] Rate limited: ${rateLimit.logReason}`);
      return NextResponse.json(GENERIC_ERROR, { status: 429 });
    }

    const { isReplay } = await recordLead(
      "linkedinLead",
      [
        body.name,
        body.email,
        body.mobile,
        body.course,
        "Course Hero Form",
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        body.consent ? "Yes" : "No",
      ],
      body.mobile
    );

    // Lead is already persisted at this point. Everything below is
    // best-effort conversion telemetry and must never fail the request.
    // A replay (same person, same form, within minutes) still records the
    // row above but does not fire a second ad conversion.
    if (isReplay) {
      return NextResponse.json({ success: true });
    }

    const eventId = randomUUID();
    const sourceUrl = buildSafeSourceUrl(body.pagePath);

    await sendOpenAiLeadCreatedConversion({
      eventId,
      sourceUrl,
      timestampMs: Date.now(),
    });

    return NextResponse.json({ event_id: eventId, success: true });
  } catch (error) {
    console.error("[linkedin-lead] Error:", error);
    return NextResponse.json(GENERIC_ERROR, { status: 500 });
  }
}
