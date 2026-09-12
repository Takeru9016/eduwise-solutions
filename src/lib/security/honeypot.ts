/**
 * Honeypot field shared by every public lead form. Named to look like a
 * real optional field (not "honeypot"/"trap") so bots that fill every
 * input don't learn to skip it. Legitimate users never see or fill it -
 * it's visually and structurally hidden from sighted and screen-reader
 * users alike, with autocomplete disabled so browser autofill can't
 * populate it either.
 */
export const HONEYPOT_FIELD_NAME = "company_url";

export function isHoneypotTripped(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}
