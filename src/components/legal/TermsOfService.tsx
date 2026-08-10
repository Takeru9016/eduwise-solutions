import {
  Ban,
  FileText,
  Mail,
  Scale,
  ShieldAlert,
  UserCheck,
} from "lucide-react";

interface TermsSection {
  content: React.ReactNode;
  icon: React.ElementType;
  title: string;
}

interface ListItem {
  text: string;
}

interface SubSection {
  items: ListItem[];
  title: string;
}

const TermsCard = ({ section }: { section: TermsSection }) => {
  const { icon: Icon, title, content } = section;

  return (
    <div className="rounded-2xl border-2 border-grey-15 bg-white p-6 shadow-[4px_4px_0_0_var(--color-grey-15)] sm:p-8">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90">
          <Icon className="h-5 w-5 text-grey-15" />
        </div>
        <h2 className="font-bold font-vietnam text-grey-15 text-xl">{title}</h2>
      </div>
      <div className="text-grey-35 leading-relaxed">{content}</div>
    </div>
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
    <ul className="space-y-2">
      {items.map((item) => (
        <li className="flex items-start gap-2" key={item.text}>
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-grey-15" />
          {item.text}
        </li>
      ))}
    </ul>
  </div>
);

const SubSectionList = ({ sections }: { sections: SubSection[] }) => (
  <div className="space-y-4">
    {sections.map((section) => (
      <div className="space-y-2" key={section.title}>
        <h3 className="font-bold text-grey-15">{section.title}</h3>
        <ul className="space-y-2">
          {section.items.map((item) => (
            <li className="flex items-start gap-2" key={item.text}>
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-grey-15" />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const ContactSection = ({ email }: { email: string }) => (
  <div>
    <p>For questions about these Terms of Service, please contact us at:</p>
    <a
      className="mt-4 block font-bold text-primary-75 hover:underline"
      href={`mailto:${email}`}
    >
      {email}
    </a>
  </div>
);

export default function TermsOfServicePage() {
  const lastUpdated = "January 1, 2026";
  const legalEmail = "contact@eduwise.solutions";

  const accountRequirements: ListItem[] = [
    { text: "Provide accurate and complete information" },
    { text: "Maintain the security of your account" },
    { text: "Promptly update any changes to your information" },
    { text: "Accept responsibility for all activities under your account" },
  ];

  const coursePolicySections: SubSection[] = [
    {
      items: [
        { text: "Course access is granted after successful payment" },
        { text: "Enrollment is non-transferable" },
        { text: "Course materials are for personal use only" },
      ],
      title: "Enrollment:",
    },
    {
      items: [
        { text: "All materials are protected by copyright" },
        { text: "Sharing or redistributing content is prohibited" },
        { text: "Course content may be updated periodically" },
      ],
      title: "Course Content:",
    },
  ];

  const prohibitedActivities: ListItem[] = [
    { text: "Sharing account credentials" },
    { text: "Copying or redistributing course materials" },
    { text: "Engaging in disruptive behavior" },
    { text: "Using services for illegal purposes" },
    { text: "Attempting to access unauthorized areas" },
  ];

  const termsSections: TermsSection[] = [
    {
      content: (
        <p>
          By accessing or using Eduwise Solutions services, you agree to be
          bound by these Terms of Service. If you disagree with any part of
          these terms, you may not access our services.
        </p>
      ),
      icon: FileText,
      title: "Agreement to Terms",
    },
    {
      content: (
        <ListSection
          intro="When creating an account, you must:"
          items={accountRequirements}
        />
      ),
      icon: UserCheck,
      title: "User Accounts",
    },
    {
      content: <SubSectionList sections={coursePolicySections} />,
      icon: Scale,
      title: "Course Policies",
    },
    {
      content: (
        <ListSection
          intro="Users are prohibited from:"
          items={prohibitedActivities}
        />
      ),
      icon: Ban,
      title: "Prohibited Activities",
    },
    {
      content: (
        <p>
          All content, including but not limited to courses, materials, logos,
          and trademarks, are the exclusive property of Eduwise Solutions. Users
          agree not to reproduce, distribute, or create derivative works without
          explicit permission.
        </p>
      ),
      icon: ShieldAlert,
      title: "Intellectual Property",
    },
    {
      content: (
        <p>
          We reserve the right to terminate or suspend accounts for violations
          of these terms, inappropriate behavior, or at our discretion. Upon
          termination, your right to access our services will immediately cease.
        </p>
      ),
      icon: Ban,
      title: "Termination",
    },
    {
      content: <ContactSection email={legalEmail} />,
      icon: Mail,
      title: "Contact Us",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-light-97 py-16 sm:py-20 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-bold text-grey-15 text-sm sm:mb-8">
              <Scale className="h-4 w-4" />
              Legal
            </div>

            <h1 className="mb-4 font-black font-vietnam text-3xl text-grey-15 tracking-tight sm:mb-6 sm:text-4xl md:text-5xl">
              Terms of Service
            </h1>

            <p className="mx-auto max-w-2xl px-2 text-grey-40 text-lg leading-relaxed">
              The rules and guidelines for using Eduwise Solutions&apos; website
              and programs
            </p>
            <p className="mt-4 text-grey-40 text-sm">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-6">
            {termsSections.map((section) => (
              <TermsCard key={section.title} section={section} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
