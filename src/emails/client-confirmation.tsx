import { format } from "date-fns";
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
} from "react-email";

interface ClientEmailProps {
  course: string;
  fullName: string;
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
          backgroundColor: "#f7f7f7",
          fontFamily: "Arial, sans-serif",
          padding: "20px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            margin: "0 auto",
            maxWidth: "600px",
            padding: "30px",
          }}
        >
          <Heading
            as="h1"
            style={{
              color: "#333",
              fontSize: "28px",
              margin: "10px 0 30px",
              textAlign: "center",
            }}
          >
            Your Booking is Confirmed!
          </Heading>

          <Text style={{ color: "#444", fontSize: "16px", lineHeight: "1.6" }}>
            Dear {fullName},
          </Text>
          <Text style={{ color: "#444", fontSize: "16px", lineHeight: "1.6" }}>
            Thank you for booking a private counselling session with us. We have
            received your request and are looking forward to speaking with you.
          </Text>

          <Section
            style={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #eee",
              borderRadius: "5px",
              margin: "25px 0",
              padding: "20px",
            }}
          >
            <Heading
              as="h2"
              style={{
                borderBottom: "1px solid #eee",
                color: "#333",
                fontSize: "20px",
                margin: "0 0 15px",
                paddingBottom: "10px",
              }}
            >
              Session Details:
            </Heading>
            <table
              style={{
                borderCollapse: "collapse",
                borderSpacing: 0,
                width: "100%",
              }}
            >
              <tbody>
                <tr>
                  <td style={{ color: "#555", padding: "10px 0" }}>
                    <strong>Date:</strong> {formattedDate}
                  </td>
                </tr>
                <tr>
                  <td style={{ color: "#555", padding: "10px 0" }}>
                    <strong>Time:</strong> {sessionTime}
                  </td>
                </tr>
                <tr>
                  <td style={{ color: "#555", padding: "10px 0" }}>
                    <strong>Course Interest:</strong> {course}
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Text style={{ color: "#444", fontSize: "16px", lineHeight: "1.6" }}>
            Our counselor will contact you at the scheduled time. If you need to
            reschedule, please click the button below or contact us directly.
          </Text>

          <Section style={{ margin: "30px 0", textAlign: "center" }}>
            <Button
              href="mailto:support@knowledgehut.com"
              style={{
                backgroundColor: "#000000",
                borderRadius: "5px",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "bold",
                padding: "12px 30px",
                textDecoration: "none",
              }}
            >
              Contact Support
            </Button>
          </Section>

          <Hr style={{ borderTop: "1px solid #eee", margin: "30px 0" }} />

          <Text
            style={{
              color: "#666",
              fontSize: "14px",
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
