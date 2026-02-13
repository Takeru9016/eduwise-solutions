import {
  ShieldCheck,
  AlertCircle,
  RefreshCcw,
  Ban,
  Mail,
  Clock,
  Calendar,
  CheckCircle2,
  Trophy,
  BookOpen,
  Target,
  Users,
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
    highlightText?: string;
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
      <h2 className="font-semibold text-grey-20 mb-2 text-xl">{title}</h2>
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
        highlightTitle: "30-Day Window",
        highlightText:
          "Refunds are available within 30 days.",
        listItems: [
          "Must attend and actively participate in all sessions",
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

  const supportEmail = "contact@eduwise.solutions";

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
                {/* 100% Refund Eligibility Section */}
                <Card className="mb-8 border-2 border-primary-75/30 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-primary-99 to-white pb-6">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Trophy className="w-8 h-8 text-primary-75" />
                      100% Course Fee Refund Eligibility
                    </CardTitle>
                    <p className="text-grey-35 mt-2 text-base">
                      Complete the program successfully and qualify for a full
                      refund if not placed
                    </p>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {/* Main Requirement */}
                    <div className="bg-gradient-to-br from-primary-75 to-primary-90 text-white rounded-xl p-6 mb-6 shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2">
                            Main Requirement
                          </h3>
                          <p className="text-white/90 text-base leading-relaxed">
                            To qualify for the refund, you must complete{" "}
                            <strong>100% of the course content</strong> within
                            the duration of the course from the date of
                            purchase.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Requirements */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-4">
                        Content Coverage Requirements:
                      </h3>

                      {/* Chapter & Practice */}
                      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-grey-15 mb-2">
                              1. Chapter & Practice
                            </h4>
                            <div className="bg-white rounded-lg p-4 border border-blue-100">
                              <p className="text-grey-35 mb-3">
                                <strong className="text-blue-600">
                                  100% completion required
                                </strong>{" "}
                                including:
                              </p>
                              <ul className="space-y-2 ml-4">
                                <li className="flex items-start gap-2 text-grey-35">
                                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                                  <span>All Videos</span>
                                </li>
                                <li className="flex items-start gap-2 text-grey-35">
                                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                                  <span>All Articles</span>
                                </li>
                                <li className="flex items-start gap-2 text-grey-35">
                                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                                  <span>All Problems</span>
                                </li>
                                <li className="flex items-start gap-2 text-grey-35">
                                  <CheckCircle2 className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                                  <span>All Quizzes</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contest */}
                      <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Trophy className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-grey-15 mb-2">
                              2. Contest Participation
                            </h4>
                            <div className="bg-white rounded-lg p-4 border border-purple-100">
                              <p className="text-grey-35 mb-2">
                                <strong className="text-purple-600">
                                  Minimum 90% of Contests
                                </strong>{" "}
                                must be solved
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Problems */}
                      <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Target className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-grey-15 mb-2">
                              3. Problem Solving
                            </h4>
                            <div className="bg-white rounded-lg p-4 border border-green-100 space-y-3">
                              <p className="text-grey-35">
                                <strong className="text-green-600">
                                  90% completion required
                                </strong>
                              </p>
                              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                <p className="text-sm text-grey-35">
                                  <strong>Important:</strong> Marks are awarded
                                  only for the{" "}
                                  <strong>first correct attempt</strong>.
                                  Subsequent attempts won&apos;t earn marks. An
                                  incorrect first attempt will increase your
                                  progress but not marks.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Live Class */}
                      <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-grey-15 mb-2">
                              4. Live Class Attendance
                            </h4>
                            <div className="bg-white rounded-lg p-4 border border-orange-100 space-y-3">
                              <p className="text-grey-35">
                                <strong className="text-orange-600">
                                  90% overall attendance required
                                </strong>
                              </p>
                              <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                                <p className="text-sm text-grey-35 mb-2">
                                  <strong>Attendance Criteria:</strong>
                                </p>
                                <ul className="space-y-1 ml-4">
                                  <li className="flex items-start gap-2 text-sm text-grey-35">
                                    <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <span>
                                      Attendance is awarded if you attend more
                                      than 90% of a single class
                                    </span>
                                  </li>
                                  <li className="flex items-start gap-2 text-sm text-grey-35">
                                    <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <span>
                                      You must maintain 90% overall attendance
                                      across all batch classes
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Important Note */}
                    <div className="mt-8 bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-red-900 mb-2 text-lg">
                            Important Note
                          </h4>
                          <p className="text-red-800">
                            If you are changing batches, we{" "}
                            <strong>do not provide a refund</strong> on the
                            course.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Regular Refund Guidelines */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <ShieldCheck className="w-7 h-7 text-primary-75" />
                      Standard Course Refund Guidelines
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
