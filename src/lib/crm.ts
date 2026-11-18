import { randomUUID } from "node:crypto";
import { sendCrmSyncFailureNotification } from "@/lib/email-sender";
import { isRazorpayPaymentPaid } from "@/lib/razorpay-verify";
import type { Utm } from "@/lib/utm";

/**
 * Pushes website leads into the Eduwise Frappe CRM (app.eduwise.solutions)
 * through its REST API, using the role-limited "intake" API token (it can
 * create leads and nothing else).
 *
 * Secondary to the Google Sheet: this never throws, and a failure here must
 * never affect the lead-persistence flow that calls it. It fails OPEN - if
 * CRM_API_URL / CRM_INTAKE_TOKEN are unset it skips itself with a warning,
 * like every other optional integration in this app. The token is never
 * logged.
 */

// Must match the "Course interest" options configured in the CRM exactly.
export const CRM_COURSES = [
  "AI & Machine Learning",
  "Data Science",
  "Cyber Security",
  "DevOps with Gen AI",
  "Digital Marketing",
  "AWS Certification / Voucher",
  "Other",
] as const;

export type CrmCourse = (typeof CRM_COURSES)[number];

// Order matters: "Master DevOps with Gen AI" must map to DevOps, not to the
// AI & ML course, so DevOps is checked before the generic AI pattern.
const COURSE_PATTERNS: [RegExp, CrmCourse][] = [
  // The CRM has no dedicated option for this course. The enquiry message
  // retains the full course title for the counselling team.
  [/\bai for business\s*(?:&|and)\s*automation\b/i, "Other"],
  [/devops/i, "DevOps with Gen AI"],
  [/data\s*science/i, "Data Science"],
  [/cyber/i, "Cyber Security"],
  [/digital\s*marketing/i, "Digital Marketing"],
  [
    /\baws\b|amazon web services|cloud practitioner/i,
    "AWS Certification / Voucher",
  ],
  [
    /artificial intelligence|machine learning|\bai\b|\bml\b/i,
    "AI & Machine Learning",
  ],
];

/** Maps free course text from the website to a CRM course option, if any. */
export function mapCourseInterest(text?: string): CrmCourse | undefined {
  if (!text) {
    return;
  }
  for (const [pattern, course] of COURSE_PATTERNS) {
    if (pattern.test(text)) {
      return course;
    }
  }
}

export interface CrmLeadInput {
  /** Explicit course; overrides anything mapped from courseText. */
  course?: CrmCourse;
  /** Free text to map to a course (course name, quiz category, subject). */
  courseText?: string;
  email?: string;
  firstName?: string;
  /** Which website form, e.g. "Website: Contact form". */
  form: string;
  /** Full name when the form has a single name field. */
  fullName?: string;
  lastName?: string;
  message?: string;
  /** Already normalised to 10 digits by mobileSchema. */
  mobile?: string;
  /**
   * Razorpay payment ID claimed by the payment page. Verified with Razorpay
   * before the lead is marked "Won / Enrolled".
   */
  paymentId?: string;
  /** Lead status to create the lead with (default: the CRM's default). */
  status?: string;
  /** Campaign tags remembered from the visitor's landing URL. */
  utm?: Utm;
}

export const ENROLLED_STATUS = "Won / Enrolled";

const MAX_MESSAGE_LENGTH = 1000;
const WHITESPACE_PATTERN = /\s+/;

function splitName(input: CrmLeadInput): { first: string; last: string } {
  if (input.firstName) {
    return { first: input.firstName, last: input.lastName ?? "" };
  }
  const parts = (input.fullName ?? "").trim().split(WHITESPACE_PATTERN);
  const [first = "", ...rest] = parts;
  return { first: first || "Website lead", last: rest.join(" ") };
}

/** Builds the CRM Lead document. Exported for tests. */
export function buildCrmLeadPayload(
  input: CrmLeadInput,
  sourceKey: string
): Record<string, string> {
  const { first, last } = splitName(input);
  const course = input.course ?? mapCourseInterest(input.courseText);
  const payload: Record<string, string> = {
    custom_enquiry_form: input.form,
    custom_source_key: sourceKey,
    first_name: first,
    source: "Website",
  };
  if (last) {
    payload.last_name = last;
  }
  if (input.email) {
    payload.email = input.email;
  }
  if (input.mobile) {
    payload.mobile_no = input.mobile;
  }
  if (course) {
    payload.custom_course_interest = course;
  }
  if (input.message) {
    payload.custom_enquiry_message = input.message.slice(0, MAX_MESSAGE_LENGTH);
  }
  if (input.status) {
    payload.status = input.status;
  }
  if (input.utm?.source) {
    payload.custom_utm_source = input.utm.source;
  }
  if (input.utm?.medium) {
    payload.custom_utm_medium = input.utm.medium;
  }
  if (input.utm?.campaign) {
    payload.custom_utm_campaign = input.utm.campaign;
  }
  return payload;
}

/**
 * Turns a claimed payment into either a verified enrolment or a clearly
 * labelled unverified lead. Exported for tests.
 */
export async function resolvePaymentClaim(
  input: CrmLeadInput,
  verify: (paymentId: string) => Promise<boolean> = isRazorpayPaymentPaid
): Promise<CrmLeadInput> {
  if (!input.paymentId) {
    return input;
  }
  if (await verify(input.paymentId)) {
    return { ...input, status: ENROLLED_STATUS };
  }
  return { ...input, form: `${input.form} (UNVERIFIED - check Razorpay)` };
}

export type CrmPushResult = "created" | "duplicate" | "skipped" | "failed";

interface PushOptions {
  /** Delays between attempts; injectable so tests do not wait. */
  retryDelaysMs?: number[];
  sleep?: (ms: number) => Promise<void>;
  /** Payment check; injectable for tests. */
  verifyPayment?: (paymentId: string) => Promise<boolean>;
}

const DEFAULT_RETRY_DELAYS_MS = [500, 2000];
const REQUEST_TIMEOUT_MS = 10_000;

const ALREADY_EXISTS_PATTERN = /already exists/i;
const TRAILING_SLASHES_PATTERN = /\/+$/;

const defaultSleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

// Frappe answers a second insert with the same unique source key with
// HTTP 417 "... already exists". That means an earlier attempt worked.
function isAlreadyExists(status: number, body: string): boolean {
  return (
    status === 409 || (status === 417 && ALREADY_EXISTS_PATTERN.test(body))
  );
}

/**
 * Creates the lead in the CRM. Retries network errors, timeouts and 5xx
 * (the CRM can deadlock when several leads arrive at once). Every attempt
 * reuses the same source key, so a retry can never create a second lead.
 */
export async function pushLeadToCrm(
  input: CrmLeadInput,
  options: PushOptions = {}
): Promise<CrmPushResult> {
  const baseUrl = process.env.CRM_API_URL?.replace(
    TRAILING_SLASHES_PATTERN,
    ""
  );
  const token = process.env.CRM_INTAKE_TOKEN;

  if (!(baseUrl && token)) {
    console.warn(
      "[crm] CRM_API_URL / CRM_INTAKE_TOKEN not configured - skipping CRM sync"
    );
    return "skipped";
  }

  const delays = options.retryDelaysMs ?? DEFAULT_RETRY_DELAYS_MS;
  const sleep = options.sleep ?? defaultSleep;
  const resolved = await resolvePaymentClaim(input, options.verifyPayment);
  const payload = buildCrmLeadPayload(resolved, `web-${randomUUID()}`);
  let lastProblem = "";

  for (let attempt = 0; attempt <= delays.length; attempt += 1) {
    if (attempt > 0) {
      // biome-ignore lint/performance/noAwaitInLoops: retries must run one after another, with a back-off, never in parallel
      await sleep(delays[attempt - 1]);
    }
    try {
      const res = await fetch(`${baseUrl}/api/resource/CRM%20Lead`, {
        body: JSON.stringify(payload),
        headers: {
          Accept: "application/json",
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      if (res.ok) {
        return "created";
      }

      const body = await res.text();
      if (isAlreadyExists(res.status, body)) {
        return "duplicate";
      }

      lastProblem = `HTTP ${res.status}: ${body.slice(0, 300)}`;
      if (res.status < 500) {
        // A 4xx will not fix itself on retry (bad token, missing field...).
        break;
      }
    } catch (error) {
      lastProblem = error instanceof Error ? error.message : String(error);
    }
  }

  console.error(
    `[crm] Failed to create lead from "${input.form}" after retries: ${lastProblem}`
  );
  await sendCrmSyncFailureNotification(input.form, lastProblem, payload);
  return "failed";
}
