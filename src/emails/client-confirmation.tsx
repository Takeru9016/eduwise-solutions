import {
  Body,
  Button,
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

interface ClientEmailProps {
  fullName: string;
  course: string;
  sessionDate: Date;
  sessionTime: string;
}

export default function ClientConfirmationEmail({
  fullName,
  course,
  sessionDate,
  sessionTime,
}: ClientEmailProps) {
  const formattedDate = format(new Date(sessionDate), "MMMM dd, yyyy");

  return (
    <Html>
      <Head />
      <Preview>Your Counselling Session is Confirmed</Preview>
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          padding: "20px",
          backgroundColor: "#f7f7f7",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Heading
            as="h1"
            style={{
              color: "#333",
              fontSize: "28px",
              textAlign: "center",
              margin: "10px 0 30px",
            }}
          >
            Your Booking is Confirmed!
          </Heading>

          <Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#444" }}>
            Dear {fullName},
          </Text>
          <Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#444" }}>
            Thank you for booking a private counselling session with us. We have
            received your request and are looking forward to speaking with you.
          </Text>

          <Section
            style={{
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "5px",
              margin: "25px 0",
              border: "1px solid #eee",
            }}
          >
            <Heading
              as="h2"
              style={{
                color: "#333",
                fontSize: "20px",
                margin: "0 0 15px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              Session Details:
            </Heading>
            <table
              style={{
                borderSpacing: 0,
                borderCollapse: "collapse",
                width: "100%",
              }}
            >
              <tbody>
                <tr>
                  <td style={{ padding: "10px 0", color: "#555" }}>
                    <strong>Date:</strong> {formattedDate}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 0", color: "#555" }}>
                    <strong>Time:</strong> {sessionTime}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 0", color: "#555" }}>
                    <strong>Course Interest:</strong> {course}
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Text style={{ fontSize: "16px", lineHeight: "1.6", color: "#444" }}>
            Our counselor will contact you at the scheduled time. If you need to
            reschedule, please click the button below or contact us directly.
          </Text>

          <Section style={{ textAlign: "center", margin: "30px 0" }}>
            <Button
              href="mailto:support@knowledgehut.com"
              style={{
                backgroundColor: "#000000",
                color: "#ffffff",
                padding: "12px 30px",
                borderRadius: "5px",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Contact Support
            </Button>
          </Section>

          <Hr style={{ borderTop: "1px solid #eee", margin: "30px 0" }} />

          <Text
            style={{
              fontSize: "14px",
              color: "#666",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            Best regards,
            <br />
            KnowledgeHut Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
