import { NextResponse } from "next/server";
import { recordLead } from "@/lib/leads";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, mobile, course, consent } = body;

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[linkedin-lead] Error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
