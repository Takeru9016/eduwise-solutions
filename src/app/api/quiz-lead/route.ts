import { NextResponse } from "next/server";
import { recordLead } from "@/lib/leads";

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

    await recordLead(
      "quizLead",
      [
        name,
        email,
        mobile,
        recommendedCategory || "Not specified",
        wantsJobGuarantee ? "Yes" : "No",
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      ],
      mobile
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[quiz-lead] Error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
