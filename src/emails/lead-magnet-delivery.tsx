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

interface LeadMagnetDeliveryEmailProps {
  downloadUrl: string;
  name: string;
  resourceTitle: string;
}

export default function LeadMagnetDeliveryEmail({
  name,
  resourceTitle,
  downloadUrl,
}: LeadMagnetDeliveryEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your free guide from Eduwise Solutions is ready</Preview>
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
              color: "#046c4e",
              fontSize: "26px",
              margin: "10px 0 30px",
              textAlign: "center",
            }}
          >
            Eduwise Solutions
          </Heading>

          <Text style={{ color: "#333", fontSize: "16px", lineHeight: "1.6" }}>
            Hi {name},
          </Text>
          <Text style={{ color: "#333", fontSize: "16px", lineHeight: "1.6" }}>
            Thanks for your interest! Your free guide,{" "}
            <strong>{resourceTitle}</strong>, is ready to download.
          </Text>

          <Section style={{ margin: "30px 0", textAlign: "center" }}>
            <Button
              href={downloadUrl}
              style={{
                backgroundColor: "#046c4e",
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "16px",
                fontWeight: "bold",
                padding: "14px 32px",
                textDecoration: "none",
              }}
            >
              Download Your Guide
            </Button>
          </Section>

          <Text style={{ color: "#666", fontSize: "14px", lineHeight: "1.6" }}>
            Have questions after reading it? Reply to this email or reach out to
            our team — we're happy to help you figure out the right next step in
            your career.
          </Text>

          <Hr style={{ borderTop: "1px solid #eee", margin: "30px 0" }} />

          <Text
            style={{
              color: "#999",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            Eduwise Solutions · Bengaluru, India
            <br />
            contact@eduwise.solutions
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
