import {
  ShieldCheck,
  AlertCircle,
  RefreshCcw,
  Ban,
  Mail,
  Clock,
  Calendar,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types
interface PolicyTab {
  value: string;
  label: string;
}

interface AccordionSection {
  value: string;
  title: string;
  content: {
    highlightTitle: string;
    highlightIcon: React.ElementType;
    highlightText: string;
    listItems: string[];
  };
}

interface InfoCard {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface AdditionalTerm {
  title: string;
  description: string;
}

// Reusable components
const PageHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <section className="relative py-16 md:py-20 lg:py-24 bg-primary-99 overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-vietnam font-bold text-grey-15 mb-6 animate-fade-in-up">
          {title}
        </h1>
        <p className="text-grey-35 text-xl md:text-2xl max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
    </div>
    {/* Decorative Background Elements */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-25 rounded-full blur-3xl"></div>
    </div>
  </section>
);

const NoticeCard = ({ icon: Icon, title, description }: InfoCard) => (
  <div className="bg-primary-99 rounded-lg flex gap-4 p-6 mb-8 items-center shadow-md">
    <Icon className="w-8 h-8 text-primary-75 flex-shrink-0" />
    <div>
      <h2 className="font-semibold text-grey-20 mb-2">{title}</h2>
      <p className="text-grey-35">{description}</p>
    </div>
  </div>
);

const PolicyAccordionItem = ({ section }: { section: AccordionSection }) => {
  const { value, title, content } = section;
  const {
    highlightTitle,
    highlightIcon: HighlightIcon,
    highlightText,
    listItems,
  } = content;

  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-lg font-vietnam font-semibold">
        {title}
      </AccordionTrigger>
      <AccordionContent className="space-y-4 text-grey-35">
        <div className="bg-primary-99 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <HighlightIcon className="w-5 h-5 text-primary-75" />
            <span className="font-semibold text-grey-20">{highlightTitle}</span>
          </div>
          <p>{highlightText}</p>
        </div>
        <ul className="list-disc pl-6 space-y-2">
          {listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

const HighlightCard = ({
  icon: Icon,
  title,
  description,
  bgColor = "bg-primary-99",
}: InfoCard & { bgColor?: string }) => (
  <div className={`${bgColor} p-6 rounded-lg`}>
    <div className="flex items-center gap-3 mb-3">
      <Icon className="w-6 h-6 text-primary-75" />
      <h3 className="font-semibold text-grey-20 text-lg">{title}</h3>
    </div>
    <p className="text-grey-35">{description}</p>
  </div>
);

const AdditionalTermItem = ({ term }: { term: AdditionalTerm }) => (
  <div>
    <h3 className="font-semibold text-grey-20 mb-2">{term.title}</h3>
    <p className="text-grey-35">{term.description}</p>
  </div>
);

const ContactCard = ({ email }: { email: string }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-3">
        <Mail className="w-7 h-7 text-primary-75" />
        Contact Our Support Team
      </CardTitle>
    </CardHeader>
    <CardContent className="text-center">
      <p className="text-grey-35 mb-4">
        Questions about our refund policy? Reach out to us:
      </p>
      <a
        href={`mailto:${email}`}
        className="text-primary-50 font-bold text-xl hover:underline"
      >
        {email}
      </a>
    </CardContent>
  </Card>
);

export default function RefundPolicyPage() {
  // Data
  const policyTabs: PolicyTab[] = [
    { value: "courses", label: "Course Refunds" },
    { value: "webinars", label: "Webinar Policy" },
  ];

  const accordionSections: AccordionSection[] = [
    {
      value: "eligibility",
      title: "Refund Eligibility",
      content: {
        highlightIcon: Clock,
        highlightTitle: "7-Day Window",
        highlightText:
          "Refunds are available within the first 3 sessions (approximately 7 days).",
        listItems: [
          "Must attend and actively participate in all first 3 sessions",
          "Complete and submit all assignments during this period",
          "Provide a valid reason for the refund request",
        ],
      },
    },
    {
      value: "partial-refund",
      title: "Partial Refund Details",
      content: {
        highlightIcon: RefreshCcw,
        highlightTitle: "Prorated Refund",
        highlightText:
          "Partial refunds calculated after deducting fees for initial sessions.",
        listItems: [
          "Refund amount based on participation and resources used",
          "First 3 sessions fees will be deducted",
          "Remaining balance eligible for partial refund",
        ],
      },
    },
    {
      value: "non-refundable",
      title: "Non-Refundable Scenarios",
      content: {
        highlightIcon: Ban,
        highlightTitle: "Refund Restrictions",
        highlightText: "Certain conditions void refund eligibility.",
        listItems: [
          "Missing all 3 initial sessions",
          "Incomplete assignment submission",
          "Refund request after initial 3 sessions",
          "Invalid reason per review board",
        ],
      },
    },
    {
      value: "processing-time",
      title: "Refund Processing Time",
      content: {
        highlightIcon: Calendar,
        highlightTitle: "30 Working Days",
        highlightText:
          "All approved refunds will be processed and credited within a specified timeframe.",
        listItems: [
          "Refunds will be processed and credited within 30 working days from the date of approval",
          "Processing time may vary based on payment method used",
          "You will receive email confirmation once the refund is processed and credited",
        ],
      },
    },
  ];

  const webinarCards: InfoCard[] = [
    {
      icon: Ban,
      title: "No Refunds",
      description:
        "Webinar purchases are non-refundable, regardless of attendance or satisfaction.",
    },
    {
      icon: RefreshCcw,
      title: "Recording Access",
      description:
        "Missed live webinars may have recording access upon request, subject to availability.",
    },
  ];

  const additionalTerms: AdditionalTerm[] = [
    {
      title: "Cancellation by Eduwise Solutions",
      description:
        "If a course is canceled or postponed, you'll receive a full refund or free transfer to another cohort.",
    },
    {
      title: "Policy Updates",
      description:
        "We reserve the right to modify this policy. Continued service use indicates acceptance of changes.",
    },
  ];

  const supportEmail = "vishal.chettri@eduwise.solutions";

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <PageHeader
        title="Refund Policy"
        subtitle="Fair, Transparent, and Customer-Centric Approach"
      />

      {/* Main Content */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Important Notice */}
            <NoticeCard
              icon={AlertCircle}
              title="Important Notice"
              description="This policy is designed to ensure fairness for both participants and Eduwise Solutions, in full compliance with Indian laws."
            />

            <Tabs defaultValue="courses" className="mb-8">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                {policyTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="courses">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <ShieldCheck className="w-7 h-7 text-primary-75" />
                      Course Refund Guidelines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {accordionSections.map((section) => (
                        <PolicyAccordionItem
                          key={section.value}
                          section={section}
                        />
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="webinars">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <ShieldCheck className="w-7 h-7 text-primary-75" />
                      Webinar Refund Policy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <HighlightCard
                      icon={webinarCards[0].icon}
                      title={webinarCards[0].title}
                      description={webinarCards[0].description}
                      bgColor="bg-primary-99"
                    />

                    <HighlightCard
                      icon={webinarCards[1].icon}
                      title={webinarCards[1].title}
                      description={webinarCards[1].description}
                      bgColor="bg-light-97"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Processing Time Notice */}
            <NoticeCard
              icon={Calendar}
              title="Refund Processing Time"
              description="All approved refunds will be processed and credited within 30 working days from the date of approval. You will receive a confirmation email once your refund has been processed."
            />


            {/* Additional Terms */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <AlertCircle className="w-7 h-7 text-primary-75" />
                  Additional Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {additionalTerms.map((term, index) => (
                  <AdditionalTermItem key={index} term={term} />
                ))}
              </CardContent>
            </Card>

            {/* Contact Section */}
            <ContactCard email={supportEmail} />
          </div>
        </div>
      </section>
    </main>
  );
}