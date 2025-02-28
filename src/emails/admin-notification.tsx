import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { format } from "date-fns";

interface AdminEmailProps {
  fullName: string;
  email: string;
  phoneNumber: string;
  course: string;
  sessionDate: Date;
  sessionTime: string;
  message?: string;
  whatsappUpdates: boolean;
}

export default function AdminNotificationEmail({
  fullName,
  email,
  phoneNumber,
  course,
  sessionDate,
  sessionTime,
  message,
  whatsappUpdates,
}: AdminEmailProps) {
  const formattedDate = format(new Date(sessionDate), "MMMM dd, yyyy");

  return (
    <Html>
      <Head />
      <Preview>New Counselling Session Booking</Preview>
      <Body style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <Container>
          <Heading as="h1" style={{ color: "#333", fontSize: "24px" }}>
            New Booking Request
          </Heading>
          <Text>A new private counselling session has been booked.</Text>

          <Heading
            as="h2"
            style={{ color: "#555", fontSize: "20px", marginTop: "25px" }}
          >
            Client Details:
          </Heading>
          <table style={{ borderSpacing: 0, borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ padding: "8px 0" }}>
                  <strong>Name:</strong> {fullName}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0" }}>
                  <strong>Email:</strong> {email}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0" }}>
                  <strong>Phone:</strong> +91 {phoneNumber}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0" }}>
                  <strong>Course Interest:</strong> {course}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0" }}>
                  <strong>Session Date:</strong> {formattedDate}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0" }}>
                  <strong>Session Time:</strong> {sessionTime}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "8px 0" }}>
                  <strong>WhatsApp Updates:</strong>{" "}
                  {whatsappUpdates ? "Yes" : "No"}
                </td>
              </tr>
            </tbody>
          </table>

          {message && (
            <Section style={{ marginTop: "20px" }}>
              <Heading as="h2" style={{ color: "#555", fontSize: "20px" }}>
                Additional Message:
              </Heading>
              <Text
                style={{
                  padding: "10px",
                  backgroundColor: "#f9f9f9",
                  borderLeft: "4px solid #ddd",
                }}
              >
                {message}
              </Text>
            </Section>
          )}

          <Hr
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              borderTop: "1px solid #ddd",
            }}
          />
          <Text style={{ fontSize: "12px", color: "#666" }}>
            This is an automated notification from your booking system.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
