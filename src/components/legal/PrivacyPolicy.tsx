import {
  CheckCircle,
  Database,
  FileText,
  Lock,
  Mail,
  Shield,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types
interface PrivacyFeature {
  content?: string;
  icon: React.ElementType;
  items?: string[];
  title: string;
}

interface TabContent {
  label: string;
  value: string;
}

// Reusable components
const FeatureCard = ({ icon: Icon, title, items }: PrivacyFeature) => (
  <Card className="transition-shadow duration-300 hover:shadow-lg">
    <CardHeader>
      <CardTitle className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-primary-75" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      {items ? (
        <ul className="space-y-2 text-grey-35">
          {items.map((item, index) => (
            <li className="flex items-center gap-2" key={index}>
              <CheckCircle className="h-4 w-4 text-green-500" />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </CardContent>
  </Card>
);

const InfoSection = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h3 className="mb-3 font-semibold text-grey-20">{title}</h3>
    <ul className="list-disc space-y-2 pl-6 text-grey-35">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 1, 2026";

  const tabContents: TabContent[] = [
    { label: "Overview", value: "overview" },
    { label: "Details", value: "details" },
    { label: "Your Rights", value: "rights" },
  ];

  const dataCollectionItems = [
    "Personal Details",
    "Contact Information",
    "Technical Usage Data",
  ];

  const dataProtectionItems = [
    "End-to-End Encryption",
    "Regular Security Audits",
    "Strict Access Controls",
  ];

  const personalInfoItems = [
    "Name and contact details",
    "Email address",
    "Phone number",
    "Educational background",
    "Employment history",
  ];

  const technicalInfoItems = [
    "Device information",
    "IP address",
    "Browser type",
    "Usage data",
  ];

  const privacyRightsItems = [
    "Access and review your personal information",
    "Request corrections to your data",
    "Request deletion of your data",
    "Object to specific data processing activities",
    "Request data portability",
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-primary-99 py-16 md:py-20 lg:py-24">
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 animate-fade-in-up font-bold font-vietnam text-4xl text-grey-15 md:text-5xl lg:text-6xl">
              Privacy Policy
            </h1>
            <p className="mx-auto max-w-2xl text-grey-35 text-xl md:text-2xl">
              Your data privacy and security are our top priorities
            </p>
            <p className="mt-4 text-grey-35 text-lg">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary-50 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-primary-25 blur-3xl" />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <Tabs className="mx-auto max-w-4xl" defaultValue="overview">
            <TabsList className="mb-8 grid w-full grid-cols-3">
              {tabContents.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-6">
                <Card className="transition-shadow duration-300 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Shield className="h-7 w-7 text-primary-75" />
                      Our Commitment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-grey-35 leading-relaxed">
                      At Eduwise Solutions, we are committed to protecting your
                      privacy through transparent data practices, robust
                      security measures, and respectful information handling.
                    </p>
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <FeatureCard
                    icon={Database}
                    items={dataCollectionItems}
                    title="Data We Collect"
                  />

                  <FeatureCard
                    icon={Lock}
                    items={dataProtectionItems}
                    title="Data Protection"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="h-7 w-7 text-primary-75" />
                    Detailed Information Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <InfoSection
                    items={personalInfoItems}
                    title="Personal Information"
                  />

                  <InfoSection
                    items={technicalInfoItems}
                    title="Technical Information"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rights">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="h-7 w-7 text-primary-75" />
                    Your Privacy Rights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg bg-primary-99 p-4">
                    <h3 className="mb-2 font-semibold text-grey-20">
                      Your Control, Your Data
                    </h3>
                    <p className="text-grey-35">
                      We believe in empowering you with complete control over
                      your personal information.
                    </p>
                  </div>
                  <ul className="list-disc space-y-3 pl-6 text-grey-35">
                    {privacyRightsItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <Card className="mx-auto max-w-xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-3">
                  <Mail className="h-7 w-7 text-primary-75" />
                  Contact Our Privacy Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-grey-35">
                  For any privacy-related inquiries or concerns, reach out to
                  us:
                </p>
                <a
                  className="font-bold text-primary-50 text-xl hover:underline"
                  href="mailto:legal@eduwise.solutions"
                >
                  contact@eduwise.solutions
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
