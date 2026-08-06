import { google, type sheets_v4 } from "googleapis";

function validateEnvVariables() {
  const requiredVars = {
    GOOGLE_SHEETS_CLIENT_EMAIL: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    GOOGLE_SHEETS_PRIVATE_KEY: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
    SPREADSHEET_ID: process.env.SPREADSHEET_ID,
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
}

export function getSheetsClient(): sheets_v4.Sheets {
  validateEnvVariables();

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

  return google.sheets({ auth, version: "v4" });
}

/**
 * Ensures a sheet with the given name and header row exists in the
 * configured spreadsheet, creating it (with headers) on first use.
 */
export async function ensureSheetExists(
  sheets: sheets_v4.Sheets,
  sheetName: string,
  headers: string[]
) {
  const spreadsheetId = process.env.SPREADSHEET_ID;

  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
  const exists = spreadsheet.data.sheets?.some(
    (sheet) => sheet.properties?.title === sheetName
  );

  if (exists) {
    return;
  }

  await sheets.spreadsheets.batchUpdate({
    requestBody: {
      requests: [
        {
          addSheet: {
            properties: {
              gridProperties: { columnCount: headers.length, rowCount: 1000 },
              title: sheetName,
            },
          },
        },
      ],
    },
    spreadsheetId,
  });

  const lastColumn = String.fromCharCode(64 + headers.length); // 1 -> A, 6 -> F, 7 -> G
  await sheets.spreadsheets.values.update({
    range: `${sheetName}!A1:${lastColumn}1`,
    requestBody: { values: [headers] },
    spreadsheetId,
    valueInputOption: "RAW",
  });
}

export async function appendRow(
  sheets: sheets_v4.Sheets,
  sheetName: string,
  values: (string | number)[]
) {
  await sheets.spreadsheets.values.append({
    range: sheetName,
    requestBody: { values: [values] },
    spreadsheetId: process.env.SPREADSHEET_ID,
    valueInputOption: "USER_ENTERED",
  });
}
