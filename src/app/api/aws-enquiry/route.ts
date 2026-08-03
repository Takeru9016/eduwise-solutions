/* eslint-disable @typescript-eslint/no-unused-vars */

import { google } from "googleapis";
import { NextResponse } from "next/server";

// Utility function to validate environment variables
function validateEnvVariables() {
  const requiredVars = {
    GOOGLE_SHEETS_CLIENT_EMAIL: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    GOOGLE_SHEETS_PRIVATE_KEY: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
    SPREADSHEET_ID: process.env.SPREADSHEET_ID,
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([name]) => name);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }

  // Log environment variable status (safely)
  console.log("Environment variables check:", {
    hasClientEmail: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    hasPrivateKey: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
    hasSpreadsheetId: !!process.env.SPREADSHEET_ID,
  });
}

// Utility function to initialize Google Sheets client
async function initializeGoogleSheets() {
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  )?.replace(/\n/g, "\n");

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ auth, version: "v4" });
  console.log("Google Sheets client initialized for AWS Enquiry");

  // Test the connection
  try {
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
    });

    // Verify the required sheet exists
    const sheetExists = spreadsheet.data.sheets?.some(
      (sheet) => sheet.properties?.title === "AWS Enquiry"
    );

    if (!sheetExists) {
      // Create the sheet if it doesn't exist
      await sheets.spreadsheets.batchUpdate({
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  gridProperties: {
                    columnCount: 6,
                    rowCount: 1000,
                  },
                  title: "AWS Enquiry",
                },
              },
            },
          ],
        },
        spreadsheetId: process.env.SPREADSHEET_ID,
      });

      // Add headers to the new sheet
      await sheets.spreadsheets.values.update({
        range: "AWS Enquiry!A1:F1",
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
        spreadsheetId: process.env.SPREADSHEET_ID,
        valueInputOption: "RAW",
      });

      console.log("Created new sheet 'AWS Enquiry' with headers");
    }

    console.log(
      "Successfully connected to spreadsheet and verified AWS Enquiry sheet exists"
    );
    return sheets;
  } catch (error) {
    console.error("Failed to verify spreadsheet access:", error);
    throw error;
  }
}

export async function POST(req: Request) {
  console.log("Received AWS Enquiry form submission");

  try {
    // Validate environment variables
    validateEnvVariables();

    // Parse and validate request body
    const body = await req.json();
    console.log("Parsed request body:", {
      ...body,
      message: `${body.message?.slice(0, 50)}...`, // Truncate message for logging
    });

    // Initialize Google Sheets
    const sheets = await initializeGoogleSheets();

    // Append data to sheet
    try {
      await sheets.spreadsheets.values.append({
        range: "AWS Enquiry",
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
        spreadsheetId: process.env.SPREADSHEET_ID,
        valueInputOption: "USER_ENTERED",
      });

      console.log("Successfully appended data to AWS Enquiry sheet");

      return NextResponse.json({
        message: "Form submission saved successfully",
        success: true,
      });
    } catch (appendError) {
      console.error("Failed to append data to sheet:", appendError);
      return NextResponse.json(
        {
          details:
            appendError instanceof Error
              ? appendError.message
              : "Unknown error",
          error: "Failed to save form submission",
        },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Server error:", error);

    // Determine appropriate status code based on error type
    const statusCode =
      error instanceof Error &&
      error.message.includes("Missing required environment variables")
        ? 500 // Server configuration error
        : 503; // Service unavailable (e.g., Google Sheets API issues)

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
