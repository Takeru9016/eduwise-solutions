import { NextResponse } from "next/server";
import { z } from "zod";
import { BROCHURE_CONTACT_CONSENT } from "@/lib/brochure-consent";
import { recordLead } from "@/lib/leads";
import {
  checkBotSignals,
  checkLeadRateLimits,
  getClientIp,
  parseJsonBody,
} from "@/lib/security/guard";
import { HONEYPOT_FIELD_NAME } from "@/lib/security/honeypot";
import {
  consentSchema,
  emailSchema,
  mobileSchema,
  nameSchema,
  utmSchema,
} from "@/lib/security/validation";
import { SITE_URL } from "@/lib/seo";
import { client } from "@/sanity/lib/client";
import { COURSE_BROCHURE_BY_SLUG_QUERY } from "@/sanity/lib/queries";

const GENERIC_ERROR = {
  error: "Could not save your details. Please try again.",
};
const NOT_FOUND = { error: "This course brochure is currently unavailable." };

const bodySchema = z.object({
  [HONEYPOT_FIELD_NAME]: z.string().optional(),
  consent: consentSchema,
  email: emailSchema,
  formToken: z.string().optional(),
  mobile: mobileSchema,
  name: nameSchema,
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/i),
  turnstileToken: z.string().optional(),
  utm: utmSchema,
});

function getDownloadUrl(value: string): string | null {
  const url = URL.parse(value, SITE_URL);
  if (url?.protocol !== "https:") {
    return null;
  }

  if (url.hostname === "cdn.sanity.io" && url.pathname.startsWith("/files/")) {
    url.searchParams.set("dl", "");
  }

  return url.origin === new URL(SITE_URL).origin &&
    !url.pathname.startsWith("//")
    ? `${url.pathname}${url.search}${url.hash}`
    : url.href;
}

export async function POST(req: Request) {
  try {
    const parsed = await parseJsonBody(req);
    if (!parsed.ok) {
      return NextResponse.json(GENERIC_ERROR, { status: parsed.status });
    }

    const result = bodySchema.safeParse(parsed.data);
    if (!result.success) {
      return NextResponse.json(
        {
          error:
            "Enter a valid name, email, and mobile number, and tick the contact consent checkbox.",
        },
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
      return NextResponse.json(NOT_FOUND, { status: 404 });
    }
    if (botCheck.type === "reject") {
      return NextResponse.json(GENERIC_ERROR, { status: 400 });
    }

    const rateLimit = await checkLeadRateLimits({
      email: body.email,
      ip: getClientIp(req),
      mobile: body.mobile,
      route: "course-brochure",
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 }
      );
    }

    const course = await client.fetch<{
      brochureUrl: string | null;
      title: string;
    } | null>(COURSE_BROCHURE_BY_SLUG_QUERY, { slug: body.slug });
    const downloadUrl =
      course?.brochureUrl && getDownloadUrl(course.brochureUrl);
    if (!(course && downloadUrl)) {
      return NextResponse.json(NOT_FOUND, { status: 404 });
    }

    await recordLead(
      "courseBrochure",
      [
        body.name,
        body.email,
        body.mobile,
        course.title,
        body.slug,
        BROCHURE_CONTACT_CONSENT,
      ],
      body.mobile,
      {
        courseText: course.title,
        email: body.email,
        form: `Website: Course brochure (${body.slug})`,
        fullName: body.name,
        message: `Requested the ${course.title} brochure. Contact consent: ${BROCHURE_CONTACT_CONSENT}`,
        mobile: body.mobile,
        utm: body.utm,
      }
    );

    return NextResponse.json(
      { downloadUrl },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    console.error("[course-brochure] Could not process brochure request");
    return NextResponse.json(GENERIC_ERROR, { status: 503 });
  }
}
