import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { recordLead } from "@/lib/leads";
import {
  buildSafeSourceUrl,
  sendOpenAiLeadCreatedConversion,
} from "@/lib/openai-conversions";

// Name is legacy: this route now handles every CourseLeadForm submission
// (DevOps included), not just LinkedIn-sourced traffic. Left in place to
// avoid a rename with only one caller and no compelling reason to churn it.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, mobile, course, consent, pagePath } = body;

    if (!(name && email && mobile)) {
      return NextResponse.json(
        { error: "Name, email and mobile are required" },
        { status: 400 }
      );
    }

    await recordLead(
      "linkedinLead",
      [
        name,
        email,
        mobile,
        course || "Not specified",
        "Course Hero Form",
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        consent ? "Yes" : "No",
      ],
      mobile
    );

    // Lead is already persisted at this point. Everything below is
    // best-effort conversion telemetry and must never fail the request.
    const eventId = randomUUID();
    const sourceUrl = buildSafeSourceUrl(
      typeof pagePath === "string" ? pagePath : undefined
    );

    await sendOpenAiLeadCreatedConversion({
      eventId,
      sourceUrl,
      timestampMs: Date.now(),
    });

    return NextResponse.json({ event_id: eventId, success: true });
  } catch (error) {
    console.error("[linkedin-lead] Error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
