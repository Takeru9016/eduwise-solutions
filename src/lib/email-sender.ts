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
