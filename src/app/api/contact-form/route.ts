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
  utmSchema,
} from "@/lib/security/validation";

// PaymentForm sends message "Payment ID: <razorpay id>" after a payment.
const PAYMENT_MESSAGE_PATTERN = /^Payment ID: (pay_[A-Za-z0-9]+)/;

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
  utm: utmSchema,
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
      console.warn(`[contact-form] Rejected silently: ${botCheck.logReason}`);
      return NextResponse.json({
        message: "Form submission saved successfully",
        success: true,
      });
    }
    if (botCheck.type === "reject") {
      console.warn(`[contact-form] Rejected: ${botCheck.logReason}`);
      return NextResponse.json(GENERIC_ERROR, { status: 400 });
    }

    const rateLimit = await checkLeadRateLimits({
      email: body.email,
      ip: getClientIp(req),
      mobile: body.mobile,
      route: "contact-form",
    });
    if (!rateLimit.allowed) {
      console.warn(`[contact-form] Rate limited: ${rateLimit.logReason}`);
      return NextResponse.json(GENERIC_ERROR, { status: 429 });
    }

    const paymentId = PAYMENT_MESSAGE_PATTERN.exec(body.message)?.[1];

    const { duplicateSource } = await recordLead(
      "contactForm",
      [
        body.firstName,
        body.lastName,
        body.email,
        body.mobile,
        body.subject,
        body.message,
      ],
      body.mobile,
      {
        courseText: body.subject,
        email: body.email,
        firstName: body.firstName,
        // The payment page (PaymentForm) also posts here after a Razorpay
        // payment, with message "Payment ID: pay_...". The CRM sync checks
        // that ID with Razorpay and, only if paid, records the person as
        // enrolled instead of a new lead for an associate to cold-call.
        form: paymentId
          ? "Website: Payment confirmation"
          : "Website: Contact form",
        lastName: body.lastName,
        message: [body.subject, body.message].filter(Boolean).join("\n"),
        mobile: body.mobile,
        paymentId,
        utm: body.utm,
      }
    );

    return NextResponse.json({
      duplicate: Boolean(duplicateSource),
      message: "Form submission saved successfully",
      success: true,
    });
  } catch (error) {
    console.error("[contact-form] Error:", error);

    const statusCode =
      error instanceof Error &&
      error.message.includes("Missing required environment variables")
        ? 500
        : 503;

    return NextResponse.json(GENERIC_ERROR, { status: statusCode });
  }
}
