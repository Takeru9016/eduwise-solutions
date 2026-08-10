"use client";

import {
  AlertCircle,
  ArrowRight,
  Ban,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  CreditCard,
  FileText,
  Mail,
  Phone,
  RefreshCcw,
  Scale,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface PolicySection {
  content: React.ReactNode;
  icon: React.ElementType;
  number: string;
  title: string;
}

const REQUIREMENT_TINTS = [
  "bg-primary-99",
  "bg-gold-90",
  "bg-primary-90",
  "bg-light-95",
] as const;

function HeroSection() {
  return (
    <section className="bg-light-97 py-16 sm:py-20 lg:py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-bold text-grey-15 text-sm sm:mb-8">
            <Scale className="h-4 w-4" />
            Transparent & Fair
          </div>

          <h1 className="mb-4 font-black font-vietnam text-3xl text-grey-15 tracking-tight sm:mb-6 sm:text-4xl md:text-5xl">
            Refund Policy
          </h1>

          <p className="mx-auto mb-8 max-w-2xl px-2 text-grey-40 text-lg leading-relaxed">
            At Eduwise Solutions, we are committed to maintaining transparency
            and fairness in our enrollment and refund process.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-5 py-2.5 font-bold text-grey-15 text-sm transition-colors hover:bg-primary-90"
              href="#standard-policy"
            >
              <FileText className="h-4 w-4" />
              Standard Course Refund Policy
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-5 py-2.5 font-bold text-grey-15 text-sm transition-colors hover:bg-primary-90"
              href="#devops-policy"
            >
              <Trophy className="h-4 w-4" />
              DevOps Course Refund Policy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PolicyCard({
  section,
  isOpen,
  onToggle,
}: {
  section: PolicySection;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = section.icon;

  return (
    <div
      className={`overflow-hidden rounded-2xl border-2 border-grey-15 bg-white transition-all duration-200 ${
        isOpen
          ? "shadow-[6px_6px_0_0_var(--color-grey-15)]"
          : "shadow-[4px_4px_0_0_var(--color-grey-15)]"
      }`}
    >
      <button
        className="flex w-full items-center gap-3 p-4 text-left sm:gap-4 sm:p-5"
        onClick={onToggle}
        type="button"
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 font-bold text-xs transition-colors duration-200 sm:h-10 sm:w-10 sm:text-sm ${
            isOpen ? "bg-primary-75 text-grey-15" : "bg-primary-99 text-grey-15"
          }`}
        >
          {section.number}
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-white sm:h-10 sm:w-10">
            <Icon className="h-4 w-4 text-grey-15 sm:h-[18px] sm:w-[18px]" />
          </div>
          <h3 className="truncate font-bold font-vietnam text-grey-15 text-sm sm:text-base lg:text-lg">
            {section.title}
          </h3>
        </div>

        <ChevronDown
          className={`h-5 w-5 shrink-0 text-grey-15 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-0 pb-5 sm:px-5 sm:pb-6">
          <div className="mb-4 h-px bg-grey-15/10 sm:mb-5" />
          {section.content}
        </div>
      </div>
    </div>
  );
}

function StandardRefundPolicy() {
  const [openSections, setOpenSections] = useState<Set<number>>(
    new Set([0, 1])
  );

  const toggleSection = (index: number) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const sections: PolicySection[] = [
    {
      content: (
        <div className="space-y-3">
          <p className="text-grey-35 text-sm leading-relaxed sm:text-base">
            A learner is eligible to claim a refund under the following
            condition:
          </p>
          <div className="rounded-2xl border-2 border-grey-15/10 bg-light-97 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary-75" />
              <div>
                <p className="font-medium text-grey-20 text-sm sm:text-base">
                  The refund request must be submitted within{" "}
                  <strong className="text-grey-15">3 days (72 hours)</strong>{" "}
                  from the date of purchase/enrollment.
                </p>
                <p className="mt-2 text-grey-40 text-sm">
                  Any refund request received after 3 days from the date of
                  purchase will not be considered.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      icon: CheckCircle2,
      number: "01",
      title: "Refund Eligibility",
    },
    {
      content: (
        <div className="space-y-3">
          <p className="text-grey-35 text-sm leading-relaxed sm:text-base">
            The Money-Back Guarantee becomes{" "}
            <strong className="text-grey-15">void</strong> under the following
            circumstances:
          </p>
          <div className="space-y-2.5">
            {[
              "If the learner has accessed more than 2 classes from the enrolled course.",
              "If the learner has downloaded any course material (including PDFs, recordings, assignments, or other learning resources) for future reference.",
              "If the learner has actively participated in live sessions beyond 2 classes.",
            ].map((item) => (
              <div
                className="flex items-start gap-3 rounded-xl border-2 border-gold-90 bg-gold-90/40 p-3 sm:p-3.5"
                key={item}
              >
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-grey-15" />
                <span className="text-grey-30 text-sm sm:text-base">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl border-2 border-gold-90 bg-gold-90 p-3 sm:p-4">
            <p className="text-grey-20 text-sm sm:text-base">
              Once any of the above conditions are met, the enrollment will be
              considered fully utilized and <strong>non-refundable</strong>.
            </p>
          </div>
        </div>
      ),
      icon: ShieldCheck,
      number: "02",
      title: "Money-Back Guarantee Conditions",
    },
    {
      content: (
        <div className="space-y-4">
          <p className="text-grey-35 text-sm leading-relaxed sm:text-base">
            To request a refund, learners must:
          </p>

          <div className="space-y-3 rounded-2xl border-2 border-grey-15/10 bg-light-97 p-4 sm:p-5">
            <h4 className="font-bold text-grey-15 text-sm sm:text-base">
              Submit a written refund request via:
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary-75" />
                <span className="text-grey-30 text-sm sm:text-base">
                  The official support email of Eduwise.solutions
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <FileText className="h-4 w-4 shrink-0 text-primary-75" />
                <span className="text-grey-30 text-sm sm:text-base">
                  The Help & Support section on our website
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-grey-15/10 bg-white p-4 sm:p-5">
            <h4 className="mb-3 font-bold text-grey-15 text-sm sm:text-base">
              Include the following details:
            </h4>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                "Full Name",
                "Registered Email ID",
                "Course Name",
                "Date of Purchase",
                "Reason for Cancellation",
              ].map((detail) => (
                <div
                  className="flex items-center gap-2 text-grey-30 text-sm sm:text-base"
                  key={detail}
                >
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary-75" />
                  {detail}
                </div>
              ))}
            </div>
            <p className="mt-3 text-grey-50 text-xs italic sm:text-sm">
              Incomplete requests may delay the refund process.
            </p>
          </div>
        </div>
      ),
      icon: Mail,
      number: "03",
      title: "Refund Request Process",
    },
    {
      content: (
        <div className="space-y-3">
          {[
            {
              label: "Processing Time",
              value:
                "Refunds will be processed within 30 working days once approved.",
            },
            {
              label: "Payment Method",
              value:
                "The refund amount will be credited using the same payment method used during purchase.",
            },
            {
              label: "Note",
              value:
                "Processing time may vary depending on the payment gateway or bank.",
            },
          ].map((item) => (
            <div
              className="flex items-start gap-3 rounded-xl border-2 border-grey-15/10 bg-light-97 p-3 sm:p-4"
              key={item.label}
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-75" />
              <div>
                <span className="font-medium text-grey-20 text-sm sm:text-base">
                  {item.label}:
                </span>{" "}
                <span className="text-grey-35 text-sm sm:text-base">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      ),
      icon: CalendarClock,
      number: "04",
      title: "Refund Processing Timeline",
    },
    {
      content: (
        <div className="space-y-3">
          <p className="text-grey-35 text-sm leading-relaxed sm:text-base">
            Refunds will <strong className="text-red-600">not</strong> be
            applicable in the following cases:
          </p>
          <div className="space-y-2">
            {[
              "Requests made after 3 days from purchase.",
              "Access of more than 2 classes.",
              "Download of any course material.",
              "Failure to attend classes.",
              "Change of mind after course access.",
              "EMI/loan processing charges (if applicable).",
            ].map((item) => (
              <div
                className="flex items-start gap-3 rounded-xl border-2 border-red-200 bg-red-50 p-2.5 sm:p-3"
                key={item}
              >
                <Ban className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <span className="text-grey-30 text-sm sm:text-base">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      icon: Ban,
      number: "05",
      title: "Non-Refundable Situations",
    },
    {
      content: (
        <div className="space-y-3">
          <p className="text-grey-35 text-sm leading-relaxed sm:text-base">
            In case of accidental duplicate payment:
          </p>
          <div className="space-y-2.5">
            <div className="flex items-start gap-3 rounded-xl border-2 border-grey-15/10 bg-light-97 p-3 sm:p-4">
              <RefreshCcw className="mt-0.5 h-4 w-4 shrink-0 text-primary-75" />
              <span className="text-grey-30 text-sm sm:text-base">
                The excess amount will be refunded within{" "}
                <strong className="text-grey-15">15 working days</strong> after
                verification.
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-xl border-2 border-grey-15/10 bg-light-97 p-3 sm:p-4">
              <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-primary-75" />
              <span className="text-grey-30 text-sm sm:text-base">
                Refund will be made to the original payment source.
              </span>
            </div>
          </div>
        </div>
      ),
      icon: Copy,
      number: "06",
      title: "Duplicate Payments",
    },
    {
      content: (
        <div className="space-y-3">
          <p className="text-grey-35 text-sm leading-relaxed sm:text-base">
            Eduwise Solutions reserves the right to modify or update this refund
            policy at any time without prior notice. Learners are advised to
            review this page periodically for any changes.
          </p>
          <p className="text-grey-35 text-sm leading-relaxed sm:text-base">
            For any refund-related queries, please contact our support team
            through the{" "}
            <Link
              className="font-bold text-primary-75 hover:underline"
              href="/contact"
            >
              Help & Support
            </Link>{" "}
            section on our website.
          </p>
        </div>
      ),
      icon: AlertCircle,
      number: "07",
      title: "Policy Updates",
    },
  ];

  return (
    <section className="py-16 sm:py-20" id="standard-policy">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 sm:mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-bold text-grey-15 text-sm">
              <FileText className="h-3.5 w-3.5" />
              General Policy
            </div>
            <h2 className="mb-3 font-black font-vietnam text-2xl text-grey-15 sm:text-3xl lg:text-4xl">
              Standard Refund Policy
            </h2>
            <p className="max-w-2xl text-grey-40 leading-relaxed">
              Please read our refund policy carefully before purchasing any
              course or program through our platform.
            </p>
          </div>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <PolicyCard
                isOpen={openSections.has(index)}
                key={section.title}
                onToggle={() => toggleSection(index)}
                section={section}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DevOpsRefundPolicy() {
  const requirements = [
    {
      body: (
        <>
          <p className="mb-3 text-grey-35 text-sm">
            <strong className="text-grey-15">100% completion required</strong>{" "}
            including:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {["All Videos", "All Articles", "All Problems", "All Quizzes"].map(
              (item) => (
                <div
                  className="flex items-center gap-1.5 text-grey-30 text-sm"
                  key={item}
                >
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-grey-15" />
                  {item}
                </div>
              )
            )}
          </div>
        </>
      ),
      icon: BookOpen,
      label: "Requirement 1",
      title: "Chapter & Practice",
    },
    {
      body: (
        <div className="rounded-xl border-2 border-grey-15/10 bg-white p-3">
          <p className="text-grey-30 text-sm sm:text-base">
            <strong className="text-grey-15">Minimum 90% of Contests</strong>{" "}
            must be solved
          </p>
        </div>
      ),
      icon: Trophy,
      label: "Requirement 2",
      title: "Contest Participation",
    },
    {
      body: (
        <>
          <p className="mb-2 text-grey-30 text-sm sm:text-base">
            <strong className="text-grey-15">90% completion required</strong>
          </p>
          <div className="rounded-xl border-2 border-grey-15/10 bg-white p-3">
            <p className="text-grey-40 text-xs sm:text-sm">
              <strong>Important:</strong> Marks are awarded only for the{" "}
              <strong>first correct attempt</strong>. Subsequent attempts
              won&apos;t earn marks.
            </p>
          </div>
        </>
      ),
      icon: Target,
      label: "Requirement 3",
      title: "Problem Solving",
    },
    {
      body: (
        <>
          <p className="mb-2 text-grey-30 text-sm sm:text-base">
            <strong className="text-grey-15">90% overall attendance</strong>
          </p>
          <div className="space-y-1.5">
            {[
              "Attend more than 90% of a single class",
              "Maintain 90% overall attendance across all batch classes",
            ].map((item) => (
              <div
                className="flex items-start gap-2 text-grey-40 text-xs sm:text-sm"
                key={item}
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-grey-15" />
                {item}
              </div>
            ))}
          </div>
        </>
      ),
      icon: Users,
      label: "Requirement 4",
      title: "Live Class Attendance",
    },
  ];

  return (
    <section className="bg-light-97 py-16 sm:py-20" id="devops-policy">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 sm:mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-gold-90 px-4 py-2 font-bold text-grey-15 text-sm">
              <Trophy className="h-3.5 w-3.5" />
              Exclusive Offer
            </div>
            <h2 className="mb-3 font-black font-vietnam text-2xl text-grey-15 sm:text-3xl lg:text-4xl">
              DevOps — 100% Fee Refund Guarantee
            </h2>
            <p className="max-w-2xl text-grey-40 leading-relaxed">
              Complete the program successfully and qualify for a full refund if
              not placed. This guarantee is exclusive to our DevOps with Cloud &
              AI program.
            </p>
          </div>

          <div className="mb-6 rounded-3xl border-2 border-grey-15 bg-grey-15 p-6 text-white shadow-[6px_6px_0_0_var(--color-grey-15)] sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 sm:h-14 sm:w-14">
                <CheckCircle2 className="h-6 w-6 text-primary-90 sm:h-7 sm:w-7" />
              </div>
              <div>
                <h3 className="mb-2 font-bold text-lg sm:text-xl">
                  Main Requirement
                </h3>
                <p className="text-grey-70 text-sm leading-relaxed sm:text-base">
                  To qualify for the refund, you must complete{" "}
                  <strong className="text-white">
                    100% of the course content
                  </strong>{" "}
                  within the duration of the course from the date of purchase.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {requirements.map((req, i) => {
              const Icon = req.icon;
              const tint = REQUIREMENT_TINTS[i % REQUIREMENT_TINTS.length];
              return (
                <div
                  className={`rounded-2xl border-2 border-grey-15 p-5 shadow-[4px_4px_0_0_var(--color-grey-15)] sm:p-6 ${tint}`}
                  key={req.title}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-white">
                      <Icon className="h-5 w-5 text-grey-15" />
                    </div>
                    <div>
                      <p className="font-bold text-grey-15/60 text-xs uppercase tracking-wider">
                        {req.label}
                      </p>
                      <h4 className="font-bold font-vietnam text-grey-15 text-sm sm:text-base">
                        {req.title}
                      </h4>
                    </div>
                  </div>
                  {req.body}
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
              <div>
                <h4 className="mb-1 font-bold text-red-900 text-sm sm:text-base">
                  Important Note
                </h4>
                <p className="text-red-800 text-sm sm:text-base">
                  If you are changing batches, we{" "}
                  <strong>do not provide a refund</strong> on the course.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BottomCTA() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl rounded-3xl border-2 border-grey-15 bg-grey-15 p-8 text-center text-white shadow-[6px_6px_0_0_var(--color-grey-15)] sm:p-10">
          <Sparkles className="mx-auto mb-4 h-8 w-8 text-primary-90" />
          <h3 className="mb-3 font-black font-vietnam text-white text-xl sm:text-2xl">
            Have questions about our refund policy?
          </h3>
          <p className="mx-auto mb-6 max-w-lg text-grey-70">
            Our support team is here to help. Reach out through our Help &
            Support section for any refund-related queries.
          </p>
          <Link
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 px-6 py-3.5 font-bold text-grey-15 transition-colors hover:bg-primary-90"
            href="/contact"
          >
            <Phone className="h-4 w-4" />
            Contact Support
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-grey-70 text-xs">
            Thank you for choosing Eduwise.solutions. We appreciate your trust
            and cooperation.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <StandardRefundPolicy />
      <DevOpsRefundPolicy />
      <BottomCTA />
    </main>
  );
}
