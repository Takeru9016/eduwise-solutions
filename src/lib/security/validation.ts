import { z } from "zod";

/**
 * Shared server-side validation for every public lead-capture endpoint.
 * Client-side (react-hook-form/Zod) validation is UX only - none of it is
 * trusted here. These schemas are the actual security boundary.
 */

// biome-ignore lint/suspicious/noControlCharactersInRegex: intentionally rejecting control characters in user input
const CONTROL_CHAR_PATTERN = /[\x00-\x1F\x7F]/;
const EXCESSIVE_REPEAT_PATTERN = /(.)\1{9,}/;
const WHITESPACE_DASH_PATTERN = /[\s-]/g;
const INDIA_PREFIX_PATTERN = /^(\+?91)/;
const INDIA_MOBILE_PATTERN = /^[6-9]\d{9}$/;

export const nameSchema = z
  .string()
  .trim()
  .min(2, "Enter at least 2 characters")
  .max(100, "Name is too long")
  .refine((v) => !CONTROL_CHAR_PATTERN.test(v), "Invalid characters")
  .refine((v) => !EXCESSIVE_REPEAT_PATTERN.test(v), "Invalid input");

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(254, "Email is too long")
  .email("Enter a valid email address");

// Indian mobile numbers: 10 digits, starting 6-9. Matches the business
// requirement already enforced client-side across every course/lead form.
// Accepts an optional +91 / 91 prefix and normalizes to bare 10 digits.
export const mobileSchema = z
  .string()
  .trim()
  .transform((v) => v.replace(WHITESPACE_DASH_PATTERN, ""))
  .transform((v) => v.replace(INDIA_PREFIX_PATTERN, ""))
  .refine(
    (v) => INDIA_MOBILE_PATTERN.test(v),
    "Enter a valid 10-digit mobile number"
  );

export const consentSchema = z
  .boolean()
  .refine((v) => v === true, "Consent is required");

// Course/subject text is dynamic (Sanity-driven, not an allowlist), but must
// still be bounded and free of control characters before it reaches Sheets.
export const freeTextSchema = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .refine((v) => !CONTROL_CHAR_PATTERN.test(v), "Invalid characters")
    .optional()
    .default("");

export const courseSchema = z
  .string()
  .trim()
  .max(150, "Course name is too long")
  .refine((v) => !CONTROL_CHAR_PATTERN.test(v), "Invalid characters")
  .optional()
  .default("Not specified");

// Internal source labels only - never an arbitrary client-supplied string.
export const SOURCE_ALLOWLIST = [
  "Course Hero Form",
  "Popup Form Submission",
  "Contact Page",
  "AWS Enquiry",
  "Quiz",
  "Lead Magnet",
  "Payment Confirmation",
] as const;

export type NormalizedName = z.infer<typeof nameSchema>;
export type NormalizedEmail = z.infer<typeof emailSchema>;
export type NormalizedMobile = z.infer<typeof mobileSchema>;
