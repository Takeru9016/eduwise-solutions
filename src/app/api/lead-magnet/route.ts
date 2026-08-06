import { NextResponse } from "next/server";
import { Resend } from "resend";
import LeadMagnetDeliveryEmail from "@/emails/lead-magnet-delivery";
import {
  appendRow,
  ensureSheetExists,
  getSheetsClient,
} from "@/lib/google-sheets";
import { client } from "@/sanity/lib/client";
import { LEAD_MAGNET_BY_SLUG_QUERY } from "@/sanity/lib/queries";

const SHEET_NAME = "Lead Magnet Downloads";
const HEADERS = ["Name", "Email", "Resource", "Timestamp"];

interface LeadMagnet {
  _id: string;
  pdfFilename: string | null;
  pdfUrl: string | null;
  slug: { current: string };
  title: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, slug } = body;

    if (!(name && email && slug)) {
      return NextResponse.json(
        { error: "Name, email and resource are required" },
        { status: 400 }
      );
    }

    const resource = await client.fetch<LeadMagnet | null>(
      LEAD_MAGNET_BY_SLUG_QUERY,
      { slug }
    );

    if (!resource?.pdfUrl) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    const sheets = getSheetsClient();
    await ensureSheetExists(sheets, SHEET_NAME, HEADERS);
    await appendRow(sheets, SHEET_NAME, [
      name,
      email,
      resource.title,
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    ]);

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: "Eduwise Solutions <onboarding@resend.dev>",
        react: LeadMagnetDeliveryEmail({
          downloadUrl: resource.pdfUrl,
          name,
          resourceTitle: resource.title,
        }),
        subject: `Your free guide: ${resource.title}`,
        to: email,
      });
    }

    return NextResponse.json({ downloadUrl: resource.pdfUrl, success: true });
  } catch (error) {
    console.error("[lead-magnet] Error:", error);
    return NextResponse.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}
