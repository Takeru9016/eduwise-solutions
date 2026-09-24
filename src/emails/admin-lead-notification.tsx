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

interface AdminLeadNotificationEmailProps {
  fields: { label: string; value: string }[];
  sourceLabel: string;
}

export default function AdminLeadNotificationEmail({
  sourceLabel,
  fields,
}: AdminLeadNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New {sourceLabel} submission</Preview>
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
              fontSize: "22px",
              margin: "10px 0 20px",
            }}
          >
            New {sourceLabel} submission
          </Heading>

          <Section>
            {fields.map((field) => (
              <Text
                key={field.label}
                style={{
                  borderBottom: "1px solid #eee",
                  color: "#333",
                  fontSize: "15px",
                  lineHeight: "1.6",
                  margin: 0,
                  padding: "8px 0",
                }}
              >
                <strong>{field.label}:</strong> {field.value}
              </Text>
            ))}
          </Section>

          <Hr style={{ borderTop: "1px solid #eee", margin: "24px 0" }} />

          <Text style={{ color: "#999", fontSize: "12px" }}>
            Also logged in the {sourceLabel} Google Sheet tab.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
