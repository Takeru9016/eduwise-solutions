import {
  FileText,
  UserCheck,
  ShieldAlert,
  Ban,
  Scale,
  Mail,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Types
interface TermsSection {
  icon: React.ElementType;
  title: string;
  content: React.ReactNode;
}

interface ListItem {
  text: string;
}

interface SubSection {
  title: string;
  items: ListItem[];
}

// Reusable components
const PageHeader = ({
  title,
  lastUpdated,
}: {
  title: string;
  lastUpdated: string;
}) => (
  <section className="py-12 md:py-16 lg:py-20 bg-primary-99">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
          {title}
        </h1>
        <p className="text-grey-35 text-lg">Last updated: {lastUpdated}</p>
      </div>
    </div>
  </section>
);

const TermsCard = ({ section }: { section: TermsSection }) => {
  const { icon: Icon, title, content } = section;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-6 h-6 text-primary-75" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-grey-35">{content}</CardContent>
    </Card>
  );
};

const ListSection = ({
  intro,
  items,
}: {
  intro?: string;
  items: ListItem[];
}) => (
  <div className="space-y-4">
    {intro && <p>{intro}</p>}
    <ul className="list-disc pl-6 space-y-2">
      {items.map((item, index) => (
        <li key={index}>{item.text}</li>
      ))}
    </ul>
  </div>
);

const SubSectionList = ({ sections }: { sections: SubSection[] }) => (
  <div className="space-y-4">
    {sections.map((section, index) => (
      <div key={index} className="space-y-2">
        <h3 className="font-semibold text-grey-20">{section.title}</h3>
        <ul className="list-disc pl-6 space-y-2">
          {section.items.map((item, itemIndex) => (
            <li key={itemIndex}>{item.text}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const ContactSection = ({ email }: { email: string }) => (
  <div>
    <p>For questions about these Terms of Service, please contact us at:</p>
    <div className="mt-4">
      <p className="text-primary-50 font-bold">{email}</p>
    </div>
  </div>
);

export default function TermsOfServicePage() {
  // Data
  const lastUpdated = "January 15, 2025";
  const legalEmail = "legal@eduwise.solutions";

  const accountRequirements: ListItem[] = [
    { text: "Provide accurate and complete information" },
    { text: "Maintain the security of your account" },
    { text: "Promptly update any changes to your information" },
    { text: "Accept responsibility for all activities under your account" },
  ];

  const coursePolicySections: SubSection[] = [
    {
      title: "Enrollment:",
      items: [
        { text: "Course access is granted after successful payment" },
        { text: "Enrollment is non-transferable" },
        { text: "Course materials are for personal use only" },
      ],
    },
    {
      title: "Course Content:",
      items: [
        { text: "All materials are protected by copyright" },
        { text: "Sharing or redistributing content is prohibited" },
        { text: "Course content may be updated periodically" },
      ],
    },
  ];

  const prohibitedActivities: ListItem[] = [
    { text: "Sharing account credentials" },
    { text: "Copying or redistributing course materials" },
    { text: "Engaging in disruptive behavior" },
    { text: "Using services for illegal purposes" },
    { text: "Attempting to access unauthorized areas" },
  ];

  // Sections data
  const termsSections: TermsSection[] = [
    {
      icon: FileText,
      title: "Agreement to Terms",
      content: (
        <p>
          By accessing or using Eduwise Solutions services, you agree to be
          bound by these Terms of Service. If you disagree with any part of
          these terms, you may not access our services.
        </p>
      ),
    },
    {
      icon: UserCheck,
      title: "User Accounts",
      content: (
        <ListSection
          intro="When creating an account, you must:"
          items={accountRequirements}
        />
      ),
    },
    {
      icon: Scale,
      title: "Course Policies",
      content: <SubSectionList sections={coursePolicySections} />,
    },
    {
      icon: Ban,
      title: "Prohibited Activities",
      content: (
        <ListSection
          intro="Users are prohibited from:"
          items={prohibitedActivities}
        />
      ),
    },
    {
      icon: ShieldAlert,
      title: "Intellectual Property",
      content: (
        <p>
          All content, including but not limited to courses, materials, logos,
          and trademarks, are the exclusive property of Eduwise Solutions. Users
          agree not to reproduce, distribute, or create derivative works without
          explicit permission.
        </p>
      ),
    },
    {
      icon: Ban,
      title: "Termination",
      content: (
        <p>
          We reserve the right to terminate or suspend accounts for violations
          of these terms, inappropriate behavior, or at our discretion. Upon
          termination, your right to access our services will immediately cease.
        </p>
      ),
    },
    {
      icon: Mail,
      title: "Contact Us",
      content: <ContactSection email={legalEmail} />,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <PageHeader title="Terms of Service" lastUpdated={lastUpdated} />

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            {termsSections.map((section, index) => (
              <TermsCard key={index} section={section} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
