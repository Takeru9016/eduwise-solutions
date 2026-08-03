import { google } from "googleapis";
import { NextResponse } from "next/server";

const SHEET_NAME = "LinkedIn";

async function initSheets() {
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  );

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ auth, version: "v4" });

  // Ensure the "LinkedIn" sheet exists
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
  });

  const exists = spreadsheet.data.sheets?.some(
    (s) => s.properties?.title === SHEET_NAME
  );

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                gridProperties: { columnCount: 7, rowCount: 1000 },
                title: SHEET_NAME,
              },
            },
          },
        ],
      },
      spreadsheetId: process.env.SPREADSHEET_ID,
    });

    // Add header row
    await sheets.spreadsheets.values.update({
      range: `${SHEET_NAME}!A1:G1`,
      requestBody: {
        values: [
          [
            "Name",
            "Email",
            "Mobile",
            "Course Interest",
            "Source",
            "Timestamp",
            "Consent",
          ],
        ],
      },
      spreadsheetId: process.env.SPREADSHEET_ID,
      valueInputOption: "RAW",
    });
  }

  return sheets;
}

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

    const sheets = await initSheets();

    await sheets.spreadsheets.values.append({
      range: SHEET_NAME,
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
      spreadsheetId: process.env.SPREADSHEET_ID,
      valueInputOption: "USER_ENTERED",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[linkedin-lead] Error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
