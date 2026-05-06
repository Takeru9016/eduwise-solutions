/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { google } from "googleapis";

// Utility function to validate environment variables
function validateEnvVariables() {
  const requiredVars = {
    SPREADSHEET_ID: process.env.SPREADSHEET_ID,
    GOOGLE_SHEETS_CLIENT_EMAIL: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    GOOGLE_SHEETS_PRIVATE_KEY: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([name]) => name);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`,
    );
  }

  // Log environment variable status (safely)
  console.log("Environment variables check:", {
    hasSpreadsheetId: !!process.env.SPREADSHEET_ID,
    hasClientEmail: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    hasPrivateKey: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
  });
}

// Utility function to initialize Google Sheets client
async function initializeGoogleSheets() {
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n",
  )?.replace(/\n/g, "\n");

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  console.log("Google Sheets client initialized");

  // Test the connection
  try {
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
    });

    // Verify the required sheet exists
    const sheetExists = spreadsheet.data.sheets?.some(
      (sheet) => sheet.properties?.title === "Website Lead",
    );

    if (!sheetExists) {
      // Create the sheet if it doesn't exist
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: process.env.SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: "Website Lead",
                  gridProperties: {
                    rowCount: 1000,
                    columnCount: 6,
                  },
                },
              },
            },
          ],
        },
      });

      // Add headers to the new sheet
      await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: "Website Lead!A1:F1",
        valueInputOption: "RAW",
        requestBody: {
          values: [
            [
              "First Name",
              "Last Name",
              "Email",
              "Mobile Number",
              "Subject",
              "Message",
            ],
          ],
        },
      });

      console.log("Created new sheet 'Website Lead' with headers");
    }

    console.log(
      "Successfully connected to spreadsheet and verified sheet exists",
    );
    return sheets;
  } catch (error) {
    console.error("Failed to verify spreadsheet access:", error);
    throw error;
  }
}

export async function POST(req: Request) {
  console.log("Received contact form submission");

  try {
    // Validate environment variables
    validateEnvVariables();

    // Parse and validate request body
    const body = await req.json();
    console.log("Parsed request body:", {
      ...body,
      message: body.message?.slice(0, 50) + "...", // Truncate message for logging
    });

    // Initialize Google Sheets
    const sheets = await initializeGoogleSheets();

    // Append data to sheet
    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: "Website Lead",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [
            [
              body.firstName,
              body.lastName,
              body.email,
              body.mobile,
              body.subject,
              body.message,
            ],
          ],
        },
      });

      console.log("Successfully appended data to sheet");

      return NextResponse.json({
        success: true,
        message: "Form submission saved successfully",
      });
    } catch (appendError) {
      console.error("Failed to append data to sheet:", appendError);
      return NextResponse.json(
        {
          error: "Failed to save form submission",
          details:
            appendError instanceof Error ?
              appendError.message
            : "Unknown error",
        },
        { status: 503 },
      );
    }
  } catch (error) {
    console.error("Server error:", error);

    // Determine appropriate status code based on error type
    const statusCode =
      (
        error instanceof Error &&
        error.message.includes("Missing required environment variables")
      ) ?
        500 // Server configuration error
      : 503; // Service unavailable (e.g., Google Sheets API issues)

    return NextResponse.json(
      {
        error: "Failed to process form submission",
        details:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: statusCode },
    );
  }
}
