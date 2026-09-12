import type { sheets_v4 } from "googleapis";
import {
  appendRow,
  ensureSheetExists,
  getSheetsClient,
} from "@/lib/google-sheets";
import { sanitizeSheetRow } from "@/lib/security/sanitize-sheets";

const DEDUP_WINDOW_MS = 24 * 60 * 60 * 1000;
// Narrower than DEDUP_WINDOW_MS and scoped to the same sheet only - this
// flags a retry/double-click/replay of THIS submission so the caller can
// skip firing a second ad conversion, without touching the existing
// cross-sheet "Duplicate Check" business logic below.
const REPLAY_WINDOW_MS = 5 * 60 * 1000;

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

async function analyzeMobileHistory(
  sheets: sheets_v4.Sheets,
  mobile: string,
  key: LeadSourceKey
): Promise<{ duplicateSource: string | null; isReplay: boolean }> {
  const cutoff = Date.now() - DEDUP_WINDOW_MS;
  const replayCutoff = Date.now() - REPLAY_WINDOW_MS;
  const entries = Object.entries(LEAD_SHEETS) as [
    LeadSourceKey,
    LeadSheetConfig,
  ][];
  const candidates = entries.filter(([, config]) => config.mobileColumn >= 0);

  const results = await Promise.all(
    candidates.map(async ([candidateKey, config]) => {
      const rows = await fetchSheetRows(sheets, config.sheetName);
      return {
        candidateKey,
        isOwnRecentReplay:
          candidateKey === key &&
          hasRecentMatch(rows, config, mobile, replayCutoff),
        matchedDuplicate: hasRecentMatch(rows, config, mobile, cutoff),
        sheetName: config.sheetName,
      };
    })
  );

  const duplicateMatch = results.find((r) => r.matchedDuplicate);
  let duplicateSource: string | null = null;
  if (duplicateMatch) {
    duplicateSource =
      duplicateMatch.candidateKey === key
        ? "the same form"
        : duplicateMatch.sheetName;
  }

  const isReplay = results.some((r) => r.isOwnRecentReplay);

  return { duplicateSource, isReplay };
}

/**
 * Logs a lead into its own source-specific sheet tab (unchanged column
 * layout per tab) and cross-checks mobile number against every other lead
 * sheet for a submission in the last 24h, so the same person filling
 * multiple funnels shows up flagged rather than silently duplicated.
 *
 * Also reports `isReplay` - a much narrower same-sheet, same-mobile match
 * within the last few minutes - so callers can skip firing a second ad
 * conversion for a retry/double-click without affecting the business-level
 * "Duplicate Check" column above.
 *
 * Cell values are sanitized against spreadsheet formula injection before
 * being written.
 */
export async function recordLead(
  key: LeadSourceKey,
  contentFields: (string | number)[],
  mobile?: string
): Promise<{ duplicateSource: string | null; isReplay: boolean }> {
  const config = LEAD_SHEETS[key];
  const sheets = getSheetsClient();
  await ensureSheetExists(sheets, config.sheetName, [...config.headers]);

  const { duplicateSource, isReplay } = mobile
    ? await analyzeMobileHistory(sheets, mobile, key)
    : { duplicateSource: null, isReplay: false };

  const row = sanitizeSheetRow([
    ...contentFields,
    new Date().toISOString(),
    mobile ? (duplicateSource ?? "No") : "N/A",
  ]);

  await appendRow(sheets, config.sheetName, row);

  return { duplicateSource, isReplay };
}
