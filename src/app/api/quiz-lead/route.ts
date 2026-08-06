import { NextResponse } from "next/server";
import {
  appendRow,
  ensureSheetExists,
  getSheetsClient,
} from "@/lib/google-sheets";

const SHEET_NAME = "Quiz Leads";
const HEADERS = [
  "Name",
  "Email",
  "Mobile",
  "Recommended Category",
  "Wants Job Guarantee",
  "Timestamp",
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, mobile, recommendedCategory, wantsJobGuarantee } =
      body;

    if (!(name && email && mobile)) {
      return NextResponse.json(
        { error: "Name, email and mobile are required" },
        { status: 400 }
      );
    }

    const sheets = getSheetsClient();
    await ensureSheetExists(sheets, SHEET_NAME, HEADERS);
    await appendRow(sheets, SHEET_NAME, [
      name,
      email,
      mobile,
      recommendedCategory || "Not specified",
      wantsJobGuarantee ? "Yes" : "No",
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[quiz-lead] Error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
