import { randomInt } from "node:crypto";
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
  const sheetExists = async () => {
    const spreadsheet = await sheets.spreadsheets.get({
      fields: "sheets.properties.title",
      spreadsheetId,
    });
    return spreadsheet.data.sheets?.some(
      (sheet) => sheet.properties?.title === sheetName
    );
  };

  if (await sheetExists()) {
    return;
  }

  // Create the tab and its headers atomically, including on concurrent first submissions.
  const sheetId = randomInt(1, 2 ** 31);
  try {
    await sheets.spreadsheets.batchUpdate({
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                gridProperties: { columnCount: headers.length, rowCount: 1000 },
                sheetId,
                title: sheetName,
              },
            },
          },
          {
            updateCells: {
              fields: "userEnteredValue",
              rows: [
                {
                  values: headers.map((stringValue) => ({
                    userEnteredValue: { stringValue },
                  })),
                },
              ],
              start: { columnIndex: 0, rowIndex: 0, sheetId },
            },
          },
        ],
      },
      spreadsheetId,
    });
  } catch (error) {
    if (!(await sheetExists())) {
      throw error;
    }
  }
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
