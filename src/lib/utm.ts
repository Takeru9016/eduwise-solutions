/**
 * Campaign attribution for lead forms.
 *
 * When a visitor lands with utm_source / utm_medium / utm_campaign in the URL
 * (from a tagged ad, email or post), we remember them in localStorage for 30
 * days and attach them to whichever lead form they submit later, even on a
 * different page. Last touch wins: a new tagged visit replaces the old tags;
 * an untagged visit keeps them.
 *
 * Browser-only helpers, but written against a minimal Storage interface so
 * they can be unit-tested. Every storage access is wrapped: private mode,
 * disabled storage or a full quota must never break a form.
 */

export interface Utm {
  campaign?: string;
  medium?: string;
  source?: string;
}

interface StoredUtm extends Utm {
  capturedAt: number;
}

type MinimalStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export const UTM_STORAGE_KEY = "ew_utm";
export const UTM_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const MAX_VALUE_LENGTH = 100;
// biome-ignore lint/suspicious/noControlCharactersInRegex: intentionally stripping control characters
const CONTROL_CHARS = /[\x00-\x1F\x7F]/g;

function clean(value: string | null | undefined): string | undefined {
  const v = value?.replace(CONTROL_CHARS, "").trim().slice(0, MAX_VALUE_LENGTH);
  return v || undefined;
}

/** Reads UTM tags from a query string ("?utm_source=..."). */
export function parseUtm(search: string): Utm | null {
  let params: URLSearchParams;
  try {
    params = new URLSearchParams(search);
  } catch {
    return null;
  }
  const utm: Utm = {
    campaign: clean(params.get("utm_campaign")),
    medium: clean(params.get("utm_medium")),
    source: clean(params.get("utm_source")),
  };
  return utm.source || utm.medium || utm.campaign ? utm : null;
}

/** Stores UTM tags from the current URL, if it has any. */
export function captureUtm(
  search: string,
  storage: MinimalStorage | undefined,
  now = Date.now()
): void {
  const utm = parseUtm(search);
  if (!(utm && storage)) {
    return;
  }
  try {
    const stored: StoredUtm = { ...utm, capturedAt: now };
    storage.setItem(UTM_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    // Storage unavailable - attribution is best-effort.
  }
}

/** Returns stored UTM tags if they are younger than 30 days. */
export function readStoredUtm(
  storage: MinimalStorage | undefined,
  now = Date.now()
): Utm | undefined {
  if (!storage) {
    return;
  }
  try {
    const raw = storage.getItem(UTM_STORAGE_KEY);
    if (!raw) {
      return;
    }
    const stored = JSON.parse(raw) as Partial<StoredUtm>;
    if (
      typeof stored.capturedAt !== "number" ||
      now - stored.capturedAt > UTM_TTL_MS
    ) {
      storage.removeItem(UTM_STORAGE_KEY);
      return;
    }
    const utm: Utm = {
      campaign: clean(stored.campaign),
      medium: clean(stored.medium),
      source: clean(stored.source),
    };
    return utm.source || utm.medium || utm.campaign ? utm : undefined;
  } catch {
    // Corrupted or unavailable storage: report no attribution.
    return undefined;
  }
}

function browserStorage(): MinimalStorage | undefined {
  try {
    return typeof window === "undefined" ? undefined : window.localStorage;
  } catch {
    // Accessing localStorage throws when it is disabled (e.g. some
    // privacy modes); the forms simply submit without attribution.
    return undefined;
  }
}

/** For form submit handlers: the UTM tags to send with this lead, if any. */
export function getLeadUtm(): Utm | undefined {
  return readStoredUtm(browserStorage());
}

/** For the sitewide capture component. */
export function captureUtmFromLocation(): void {
  if (typeof window === "undefined") {
    return;
  }
  captureUtm(window.location.search, browserStorage());
}
