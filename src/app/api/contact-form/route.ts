import { NextResponse } from "next/server";
import { recordLead } from "@/lib/leads";

export async function POST(req: Request) {
  try {
    const body = await req.json();
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
      body.mobile
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

    return NextResponse.json(
      {
        details:
          error instanceof Error ? error.message : "Unknown error occurred",
        error: "Failed to process form submission",
      },
      { status: statusCode }
    );
  }
}
