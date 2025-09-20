import {
  Shield,
  Lock,
  Database,
  Mail,
  FileText,
  CheckCircle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types
interface PrivacyFeature {
  icon: React.ElementType;
  title: string;
  items?: string[];
  content?: string;
}

interface TabContent {
  value: string;
  label: string;
}

// Reusable components
const FeatureCard = ({ icon: Icon, title, items }: PrivacyFeature) => (
  <Card className="hover:shadow-lg transition-shadow duration-300">
    <CardHeader>
      <CardTitle className="flex items-center gap-3">
        <Icon className="w-6 h-6 text-primary-75" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      {items ? (
        <ul className="space-y-2 text-grey-35">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
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
    <h3 className="font-semibold text-grey-20 mb-3">{title}</h3>
    <ul className="list-disc pl-6 text-grey-35 space-y-2">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 15, 2025";

  const tabContents: TabContent[] = [
    { value: "overview", label: "Overview" },
    { value: "details", label: "Details" },
    { value: "rights", label: "Your Rights" },
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
      <section className="relative py-16 md:py-20 lg:py-24 bg-primary-99 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-vietnam font-bold text-grey-15 mb-6 animate-fade-in-up">
              Privacy Policy
            </h1>
            <p className="text-grey-35 text-xl md:text-2xl max-w-2xl mx-auto">
              Your data privacy and security are our top priorities
            </p>
            <p className="text-grey-35 text-lg mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-25 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {tabContents.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-6">
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Shield className="w-7 h-7 text-primary-75" />
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

                <div className="grid md:grid-cols-2 gap-6">
                  <FeatureCard
                    icon={Database}
                    title="Data We Collect"
                    items={dataCollectionItems}
                  />

                  <FeatureCard
                    icon={Lock}
                    title="Data Protection"
                    items={dataProtectionItems}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="w-7 h-7 text-primary-75" />
                    Detailed Information Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <InfoSection
                    title="Personal Information"
                    items={personalInfoItems}
                  />

                  <InfoSection
                    title="Technical Information"
                    items={technicalInfoItems}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rights">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="w-7 h-7 text-primary-75" />
                    Your Privacy Rights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-primary-99 p-4 rounded-lg">
                    <h3 className="font-semibold text-grey-20 mb-2">
                      Your Control, Your Data
                    </h3>
                    <p className="text-grey-35">
                      We believe in empowering you with complete control over
                      your personal information.
                    </p>
                  </div>
                  <ul className="list-disc pl-6 text-grey-35 space-y-3">
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
            <Card className="max-w-xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-3">
                  <Mail className="w-7 h-7 text-primary-75" />
                  Contact Our Privacy Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-grey-35 mb-4">
                  For any privacy-related inquiries or concerns, reach out to
                  us:
                </p>
                <a
                  href="mailto:legal@eduwise.solutions"
                  className="text-primary-50 font-bold text-xl hover:underline"
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
