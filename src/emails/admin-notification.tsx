import { format } from "date-fns";
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
} from "react-email";

interface AdminEmailProps {
  course: string;
  email: string;
  fullName: string;
  message?: string;
  phoneNumber: string;
  sessionDate: Date;
  sessionTime: string;
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
          <table style={{ borderCollapse: "collapse", borderSpacing: 0 }}>
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
                  backgroundColor: "#f9f9f9",
                  borderLeft: "4px solid #ddd",
                  padding: "10px",
                }}
              >
                {message}
              </Text>
            </Section>
          )}

          <Hr
            style={{
              borderTop: "1px solid #ddd",
              marginBottom: "30px",
              marginTop: "30px",
            }}
          />
          <Text style={{ color: "#666", fontSize: "12px" }}>
            This is an automated notification from your booking system.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
