import type { sheets_v4 } from "googleapis";
import {
  appendRow,
  ensureSheetExists,
  getSheetsClient,
} from "@/lib/google-sheets";

const DEDUP_WINDOW_MS = 24 * 60 * 60 * 1000;

interface LeadSheetConfig {
  headers: readonly string[];
  mobileColumn: number;
  sheetName: string;
  timestampColumn: number;
}

const LEAD_SHEETS = {
  awsEnquiry: {
    headers: [
      "First Name",
      "Last Name",
      "Email",
      "Mobile Number",
      "Subject",
      "Message",
      "Logged At",
      "Duplicate Check",
    ],
    mobileColumn: 3,
    sheetName: "AWS Enquiry",
    timestampColumn: 6,
  },
  contactForm: {
    headers: [
      "First Name",
      "Last Name",
      "Email",
      "Mobile Number",
      "Subject",
      "Message",
      "Logged At",
      "Duplicate Check",
    ],
    mobileColumn: 3,
    sheetName: "Website Lead",
    timestampColumn: 6,
  },
  leadMagnet: {
    headers: [
      "Name",
      "Email",
      "Resource",
      "Timestamp",
      "Logged At",
      "Duplicate Check",
    ],
    mobileColumn: -1,
    sheetName: "Lead Magnet Downloads",
    timestampColumn: 4,
  },
  linkedinLead: {
    headers: [
      "Name",
      "Email",
      "Mobile",
      "Course Interest",
      "Source",
      "Timestamp",
      "Consent",
      "Logged At",
      "Duplicate Check",
    ],
    mobileColumn: 2,
    sheetName: "LinkedIn",
    timestampColumn: 7,
  },
  quizLead: {
    headers: [
      "Name",
      "Email",
      "Mobile",
      "Recommended Category",
      "Wants Job Guarantee",
      "Timestamp",
      "Logged At",
      "Duplicate Check",
    ],
    mobileColumn: 2,
    sheetName: "Quiz Leads",
    timestampColumn: 6,
  },
} as const satisfies Record<string, LeadSheetConfig>;

type LeadSourceKey = keyof typeof LEAD_SHEETS;

async function fetchSheetRows(
  sheets: sheets_v4.Sheets,
  sheetName: string
): Promise<string[][]> {
  try {
    const res = await sheets.spreadsheets.values.get({
      range: `${sheetName}!A2:Z`,
      spreadsheetId: process.env.SPREADSHEET_ID,
    });
    return res.data.values ?? [];
  } catch {
    return [];
  }
}

function hasRecentMatch(
  rows: string[][],
  config: LeadSheetConfig,
  mobile: string,
  cutoff: number
): boolean {
  return rows.some((row) => {
    if (row[config.mobileColumn] !== mobile) {
      return false;
    }
    const timestamp = Date.parse(row[config.timestampColumn] ?? "");
    return !Number.isNaN(timestamp) && timestamp >= cutoff;
  });
}

async function findDuplicateSource(
  sheets: sheets_v4.Sheets,
  mobile: string,
  excludeKey: LeadSourceKey
): Promise<string | null> {
  const cutoff = Date.now() - DEDUP_WINDOW_MS;
  const entries = Object.entries(LEAD_SHEETS) as [
    LeadSourceKey,
    LeadSheetConfig,
  ][];
  const candidates = entries.filter(([, config]) => config.mobileColumn >= 0);

  const results = await Promise.all(
    candidates.map(async ([key, config]) => {
      const rows = await fetchSheetRows(sheets, config.sheetName);
      const matched = hasRecentMatch(rows, config, mobile, cutoff);
      return matched ? { key, sheetName: config.sheetName } : null;
    })
  );

  const match = results.find(Boolean);
  if (!match) {
    return null;
  }
  return match.key === excludeKey ? "the same form" : match.sheetName;
}

/**
 * Logs a lead into its own source-specific sheet tab (unchanged column
 * layout per tab) and cross-checks mobile number against every other lead
 * sheet for a submission in the last 24h, so the same person filling
 * multiple funnels shows up flagged rather than silently duplicated.
 */
export async function recordLead(
  key: LeadSourceKey,
  contentFields: (string | number)[],
  mobile?: string
): Promise<{ duplicateSource: string | null }> {
  const config = LEAD_SHEETS[key];
  const sheets = getSheetsClient();
  await ensureSheetExists(sheets, config.sheetName, [...config.headers]);

  const duplicateSource = mobile
    ? await findDuplicateSource(sheets, mobile, key)
    : null;

  const row = [
    ...contentFields,
    new Date().toISOString(),
    mobile ? (duplicateSource ?? "No") : "N/A",
  ];

  await appendRow(sheets, config.sheetName, row);

  return { duplicateSource };
}
