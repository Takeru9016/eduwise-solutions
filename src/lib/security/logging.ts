/**
 * PII-safe masking for security/diagnostic logs. Never log raw email or
 * phone values - masked forms are enough to correlate repeated rejections
 * without building a surveillance trail of personal data in log storage.
 */

export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!(local && domain)) {
    return "***";
  }
  const visible = local.slice(0, 1);
  return `${visible}${"*".repeat(Math.max(local.length - 1, 1))}@${domain}`;
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) {
    return "****";
  }
  return `${"*".repeat(digits.length - 4)}${digits.slice(-4)}`;
}
