/**
 * Neutralizes spreadsheet formula injection. Google Sheets (like Excel)
 * interprets a cell value starting with =, +, -, or @ as a formula when
 * opened - an attacker-controlled name/message field could otherwise
 * execute a formula (including exfiltration via IMPORTXML/HYPERLINK) the
 * moment someone on the team opens the sheet. Prefixing with a single
 * quote forces the cell to render as literal text in every major
 * spreadsheet app while leaving the visible value unchanged.
 */
const FORMULA_PREFIX_PATTERN = /^[=+\-@]/;

export function sanitizeSheetCell(value: string | number): string | number {
  if (typeof value !== "string") {
    return value;
  }
  return FORMULA_PREFIX_PATTERN.test(value) ? `'${value}` : value;
}

export function sanitizeSheetRow(
  row: (string | number)[]
): (string | number)[] {
  return row.map(sanitizeSheetCell);
}
