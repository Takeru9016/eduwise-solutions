import { NextResponse } from "next/server";
import {
  appendRow,
  ensureSheetExists,
  getSheetsClient,
} from "@/lib/google-sheets";

const SHEET_NAME = "AWS Enquiry";
const HEADERS = [
  "First Name",
  "Last Name",
  "Email",
  "Mobile Number",
  "Subject",
  "Message",
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sheets = getSheetsClient();
    await ensureSheetExists(sheets, SHEET_NAME, HEADERS);
    await appendRow(sheets, SHEET_NAME, [
      body.firstName,
      body.lastName,
      body.email,
      body.mobile,
      body.subject,
      body.message,
    ]);

    return NextResponse.json({
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
