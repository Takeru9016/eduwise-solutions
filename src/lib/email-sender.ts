import { Resend } from "resend";
import AdminLeadNotificationEmail from "@/emails/admin-lead-notification";

export const SITE_FROM_EMAIL = "Eduwise Solutions <contact@eduwise.solutions>";

export async function sendAdminLeadNotification(
  sourceLabel: string,
  fields: { label: string; value: string }[]
): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!(resendApiKey && adminEmail)) {
    return;
  }

  const replyTo = fields.find(
    (field) => field.label.toLowerCase() === "email"
  )?.value;

  try {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: SITE_FROM_EMAIL,
      react: AdminLeadNotificationEmail({ fields, sourceLabel }),
      replyTo,
      subject: `New ${sourceLabel} submission`,
      to: adminEmail,
    });
  } catch (error) {
    console.error(
      `[email-sender] Failed to send admin notification for ${sourceLabel}:`,
      error
    );
  }
}

/**
 * Tells the admin that a lead reached the Google Sheet but could NOT be
 * created in the CRM, with enough detail to add it by hand. Never throws.
 */
export async function sendCrmSyncFailureNotification(
  form: string,
  problem: string,
  lead: Record<string, string>
): Promise<void> {
  const fields = [
    { label: "Problem", value: problem },
    ...Object.entries(lead)
      .filter(([key]) => key !== "custom_source_key")
      .map(([key, value]) => ({
        label: key === "email" ? "Email" : key,
        value,
      })),
  ];
  try {
    await sendAdminLeadNotification(
      `CRM sync FAILED (${form}) - add this lead by hand`,
      fields
    );
  } catch (error) {
    console.error("[email-sender] Failed to send CRM failure notice:", error);
  }
}
