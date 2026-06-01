import { NextResponse } from "next/server";
import { google } from "googleapis";

const SHEET_NAME = "LinkedIn";

async function initSheets() {
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n",
  );

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Ensure the "LinkedIn" sheet exists
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
  });

  const exists = spreadsheet.data.sheets?.some(
    (s) => s.properties?.title === SHEET_NAME,
  );

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: process.env.SPREADSHEET_ID,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title: SHEET_NAME,
                gridProperties: { rowCount: 1000, columnCount: 7 },
              },
            },
          },
        ],
      },
    });

    // Add header row
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1:G1`,
      valueInputOption: "RAW",
      requestBody: {
        values: [
          ["Name", "Email", "Mobile", "Course Interest", "Source", "Timestamp", "Consent"],
        ],
      },
    });
  }

  return sheets;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, mobile, course, consent } = body;

    if (!name || !email || !mobile) {
      return NextResponse.json(
        { error: "Name, email and mobile are required" },
        { status: 400 },
      );
    }

    const sheets = await initSheets();

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: SHEET_NAME,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            name,
            email,
            mobile,
            course || "Not specified",
            "Course Hero Form",
            new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            consent ? "Yes" : "No",
          ],
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[linkedin-lead] Error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 },
    );
  }
}
