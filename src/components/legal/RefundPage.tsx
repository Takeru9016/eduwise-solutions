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

// Types

interface PolicySection {
  content: React.ReactNode;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  number: string;
  title: string;
}

// Hero Section

function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-primary-99 via-white to-primary-97" />

      {/* Decorative orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-linear-to-br from-primary-90/30 to-transparent blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-linear-to-tr from-primary-75/15 to-transparent blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-90/40 bg-white/80 px-4 py-2 font-semibold text-primary-75 text-xs shadow-xs backdrop-blur-xs sm:text-sm">
            <Scale className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Transparent & Fair
          </div>

          {/* Heading */}
          <h1 className="mb-4 font-bold font-vietnam text-3xl text-grey-15 leading-tight sm:mb-5 sm:text-4xl lg:text-5xl xl:text-6xl">
            Refund{" "}
            <span className="bg-linear-to-r from-primary-75 to-primary-50 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-8 max-w-xl text-base text-grey-40 leading-relaxed sm:text-lg lg:text-xl">
            At Eduwise Solutions, we are committed to maintaining transparency
            and fairness in our enrollment and refund process.
          </p>

          {/* Quick nav pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-full border border-light-90 bg-white px-4 py-2.5 font-medium text-grey-30 text-sm shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-90 hover:text-primary-75 sm:px-5"
              href="#standard-policy"
            >
              <FileText className="h-4 w-4" />
              Standard Course Refund Policy
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-full border border-light-90 bg-white px-4 py-2.5 font-medium text-grey-30 text-sm shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-90 hover:text-primary-75 sm:px-5"
              href="#devops-policy"
            >
              <Trophy className="h-4 w-4" />
              DevOps Course Refund Policy
            </a>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-primary-90/40 to-transparent" />
    </section>
  );
}

// Accordion-style Policy Card

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
      className={`overflow-hidden rounded-xl border bg-white transition-all duration-300 sm:rounded-2xl ${
        isOpen
          ? "border-primary-90/50 shadow-lg shadow-primary-90/5"
          : "border-light-90 shadow-xs hover:border-primary-90/30 hover:shadow-md"
      }`}
    >
      <button
        className="group flex w-full cursor-pointer items-center gap-3 p-4 text-left sm:gap-4 sm:p-5"
        onClick={onToggle}
      >
        {/* Number badge */}
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold text-xs transition-colors duration-300 sm:h-10 sm:w-10 sm:rounded-xl sm:text-sm ${
            isOpen
              ? "bg-primary-75 text-white"
              : "bg-primary-99 text-primary-75 group-hover:bg-primary-97"
          }`}
        >
          {section.number}
        </div>

        {/* Icon + title */}
        <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg sm:h-9 sm:w-9 ${section.iconBg}`}
          >
            <Icon
              className={`h-4 w-4 sm:h-[18px] sm:w-[18px] ${section.iconColor}`}
            />
          </div>
          <h3 className="truncate font-semibold font-vietnam text-grey-15 text-sm sm:text-base lg:text-lg">
            {section.title}
          </h3>
        </div>

        {/* Chevron */}
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-grey-50 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-4 pt-0 pb-5 sm:px-5 sm:pb-6">
          <div className="mb-4 h-px bg-linear-to-r from-primary-90/20 via-primary-90/10 to-transparent sm:mb-5" />
          {section.content}
        </div>
      </div>
    </div>
  );
}

// Standard Refund Policy Section

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
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <p className="font-medium text-grey-20 text-sm sm:text-base">
                  The refund request must be submitted within{" "}
                  <strong className="text-emerald-700">
                    3 days (72 hours)
                  </strong>{" "}
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
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      number: "01",
      title: "Refund Eligibility",
    },
    {
      content: (
        <div className="space-y-3">
          <p className="text-grey-35 text-sm leading-relaxed sm:text-base">
            The Money-Back Guarantee becomes{" "}
            <strong className="text-grey-20">void</strong> under the following
            circumstances:
          </p>
          <div className="space-y-2.5">
            {[
              "If the learner has accessed more than 2 classes from the enrolled course.",
              "If the learner has downloaded any course material (including PDFs, recordings, assignments, or other learning resources) for future reference.",
              "If the learner has actively participated in live sessions beyond 2 classes.",
            ].map((item, i) => (
              <div
                className="flex items-start gap-3 rounded-lg border border-amber-100 bg-amber-50/60 p-3 sm:p-3.5"
                key={i}
              >
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <span className="text-grey-30 text-sm sm:text-base">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-r-lg border-amber-400 border-l-4 bg-amber-50 p-3 sm:p-4">
            <p className="text-amber-800 text-sm sm:text-base">
              Once any of the above conditions are met, the enrollment will be
              considered fully utilized and <strong>non-refundable</strong>.
            </p>
          </div>
        </div>
      ),
      icon: ShieldCheck,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      number: "02",
      title: "Money-Back Guarantee Conditions",
    },
    {
      content: (
        <div className="space-y-4">
          <p className="text-grey-35 text-sm leading-relaxed sm:text-base">
            To request a refund, learners must:
          </p>

          <div className="space-y-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4 sm:p-5">
            <h4 className="font-semibold text-grey-20 text-sm sm:text-base">
              Submit a written refund request via:
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-blue-600" />
                <span className="text-grey-30 text-sm sm:text-base">
                  The official support email of Eduwise.solutions
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <FileText className="h-4 w-4 shrink-0 text-blue-600" />
                <span className="text-grey-30 text-sm sm:text-base">
                  The Help & Support section on our website
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-blue-100 bg-white p-4 sm:p-5">
            <h4 className="mb-3 font-semibold text-grey-20 text-sm sm:text-base">
              Include the following details:
            </h4>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                "Full Name",
                "Registered Email ID",
                "Course Name",
                "Date of Purchase",
                "Reason for Cancellation",
              ].map((detail, i) => (
                <div
                  className="flex items-center gap-2 text-grey-30 text-sm sm:text-base"
                  key={i}
                >
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-blue-500" />
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
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
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
          ].map((item, i) => (
            <div
              className="flex items-start gap-3 rounded-lg border border-violet-100 bg-violet-50/40 p-3 sm:p-4"
              key={i}
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
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
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
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
            ].map((item, i) => (
              <div
                className="flex items-start gap-3 rounded-lg border border-red-100 bg-red-50/40 p-2.5 sm:p-3"
                key={i}
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
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
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
            <div className="flex items-start gap-3 rounded-lg border border-teal-100 bg-teal-50/40 p-3 sm:p-4">
              <RefreshCcw className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
              <span className="text-grey-30 text-sm sm:text-base">
                The excess amount will be refunded within{" "}
                <strong className="text-teal-700">15 working days</strong> after
                verification.
              </span>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-teal-100 bg-teal-50/40 p-3 sm:p-4">
              <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
              <span className="text-grey-30 text-sm sm:text-base">
                Refund will be made to the original payment source.
              </span>
            </div>
          </div>
        </div>
      ),
      icon: Copy,
      iconBg: "bg-teal-50",
      iconColor: "text-teal-600",
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
              className="font-medium text-primary-75 hover:underline"
              href="/contact"
            >
              Help & Support
            </Link>{" "}
            section on our website.
          </p>
        </div>
      ),
      icon: AlertCircle,
      iconBg: "bg-grey-95",
      iconColor: "text-grey-40",
      number: "07",
      title: "Policy Updates",
    },
  ];

  return (
    <section className="py-10 sm:py-14 lg:py-16" id="standard-policy">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Section header */}
          <div className="mb-8 sm:mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-90/40 bg-primary-99 px-3 py-1.5 font-semibold text-primary-75 text-xs sm:text-sm">
              <FileText className="h-3.5 w-3.5" />
              General Policy
            </div>
            <h2 className="mb-3 font-bold font-vietnam text-2xl text-grey-15 sm:text-3xl lg:text-4xl">
              Standard Refund Policy
            </h2>
            <p className="max-w-2xl text-grey-40 text-sm leading-relaxed sm:text-base lg:text-lg">
              Please read our refund policy carefully before purchasing any
              course or program through our platform.
            </p>
          </div>

          {/* Policy cards */}
          <div className="space-y-3 sm:space-y-4">
            {sections.map((section, index) => (
              <PolicyCard
                isOpen={openSections.has(index)}
                key={index}
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

// DevOps Refund Policy Section

function DevOpsRefundPolicy() {
  return (
    <section
      className="bg-linear-to-b from-slate-50 to-white py-10 sm:py-14 lg:py-16"
      id="devops-policy"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Section header */}
          <div className="mb-8 sm:mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-700 text-xs sm:text-sm">
              <Trophy className="h-3.5 w-3.5" />
              Exclusive Offer
            </div>
            <h2 className="mb-3 font-bold font-vietnam text-2xl text-grey-15 sm:text-3xl lg:text-4xl">
              DevOps — 100% Fee Refund{" "}
              <span className="bg-linear-to-r from-primary-75 to-emerald-500 bg-clip-text text-transparent">
                Guarantee
              </span>
            </h2>
            <p className="max-w-2xl text-grey-40 text-sm leading-relaxed sm:text-base lg:text-lg">
              Complete the program successfully and qualify for a full refund if
              not placed. This guarantee is exclusive to our DevOps with Cloud &
              AI program.
            </p>
          </div>

          {/* Main requirement card */}
          <div className="relative mb-6 overflow-hidden rounded-2xl bg-linear-to-br from-primary-75 to-primary-50 p-5 text-white shadow-primary-75/15 shadow-xl sm:rounded-3xl sm:p-7 lg:p-8">
            {/* Decorative */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
            </div>

            <div className="relative z-10 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs sm:h-14 sm:w-14 sm:rounded-2xl">
                <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div>
                <h3 className="mb-2 font-bold text-lg sm:text-xl">
                  Main Requirement
                </h3>
                <p className="text-sm text-white/90 leading-relaxed sm:text-base">
                  To qualify for the refund, you must complete{" "}
                  <strong>100% of the course content</strong> within the
                  duration of the course from the date of purchase.
                </p>
              </div>
            </div>
          </div>

          {/* Requirements grid */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {/* Chapter & Practice */}
            <div className="rounded-xl border border-blue-100 bg-white p-5 shadow-xs transition-shadow duration-300 hover:shadow-md sm:rounded-2xl sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-blue-600">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-blue-600 text-xs uppercase tracking-wider">
                    Requirement 1
                  </p>
                  <h4 className="font-bold font-vietnam text-grey-15 text-sm sm:text-base">
                    Chapter & Practice
                  </h4>
                </div>
              </div>
              <p className="mb-3 text-grey-35 text-sm">
                <strong className="text-blue-600">
                  100% completion required
                </strong>{" "}
                including:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "All Videos",
                  "All Articles",
                  "All Problems",
                  "All Quizzes",
                ].map((item, i) => (
                  <div
                    className="flex items-center gap-1.5 text-grey-30 text-sm"
                    key={i}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Contest */}
            <div className="rounded-xl border border-violet-100 bg-white p-5 shadow-xs transition-shadow duration-300 hover:shadow-md sm:rounded-2xl sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-violet-600">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-violet-600 text-xs uppercase tracking-wider">
                    Requirement 2
                  </p>
                  <h4 className="font-bold font-vietnam text-grey-15 text-sm sm:text-base">
                    Contest Participation
                  </h4>
                </div>
              </div>
              <div className="rounded-lg border border-violet-100 bg-violet-50 p-3">
                <p className="text-grey-30 text-sm sm:text-base">
                  <strong className="text-violet-600">
                    Minimum 90% of Contests
                  </strong>{" "}
                  must be solved
                </p>
              </div>
            </div>

            {/* Problem Solving */}
            <div className="rounded-xl border border-emerald-100 bg-white p-5 shadow-xs transition-shadow duration-300 hover:shadow-md sm:rounded-2xl sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-emerald-600 text-xs uppercase tracking-wider">
                    Requirement 3
                  </p>
                  <h4 className="font-bold font-vietnam text-grey-15 text-sm sm:text-base">
                    Problem Solving
                  </h4>
                </div>
              </div>
              <p className="mb-2 text-grey-30 text-sm sm:text-base">
                <strong className="text-emerald-600">
                  90% completion required
                </strong>
              </p>
              <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-3">
                <p className="text-grey-40 text-xs sm:text-sm">
                  <strong>Important:</strong> Marks are awarded only for the{" "}
                  <strong>first correct attempt</strong>. Subsequent attempts
                  won&apos;t earn marks.
                </p>
              </div>
            </div>

            {/* Live Class */}
            <div className="rounded-xl border border-orange-100 bg-white p-5 shadow-xs transition-shadow duration-300 hover:shadow-md sm:rounded-2xl sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 to-orange-600">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-orange-600 text-xs uppercase tracking-wider">
                    Requirement 4
                  </p>
                  <h4 className="font-bold font-vietnam text-grey-15 text-sm sm:text-base">
                    Live Class Attendance
                  </h4>
                </div>
              </div>
              <p className="mb-2 text-grey-30 text-sm sm:text-base">
                <strong className="text-orange-600">
                  90% overall attendance
                </strong>
              </p>
              <div className="space-y-1.5">
                {[
                  "Attend more than 90% of a single class",
                  "Maintain 90% overall attendance across all batch classes",
                ].map((item, i) => (
                  <div
                    className="flex items-start gap-2 text-grey-40 text-xs sm:text-sm"
                    key={i}
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 sm:rounded-2xl sm:p-5">
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

// Bottom CTA

function BottomCTA() {
  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl shadow-xl sm:rounded-3xl">
            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-br from-grey-10 via-grey-15 to-grey-20" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-linear-to-br from-primary-75/20 to-transparent blur-3xl" />
              <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-linear-to-tr from-primary-90/15 to-transparent blur-3xl" />
            </div>

            <div className="relative z-10 p-6 text-center sm:p-8 lg:p-10">
              <Sparkles className="mx-auto mb-4 h-8 w-8 text-primary-90" />
              <h3 className="mb-3 font-bold font-vietnam text-white text-xl sm:text-2xl">
                Have questions about our refund policy?
              </h3>
              <p className="mx-auto mb-6 max-w-lg text-grey-60 text-sm sm:text-base">
                Our support team is here to help. Reach out through our Help &
                Support section for any refund-related queries.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary-75 to-primary-90 px-6 py-3 font-semibold text-sm text-white shadow-lg shadow-primary-75/25 transition-all duration-300 hover:scale-105 hover:from-primary-70 hover:to-primary-80 hover:shadow-xl sm:py-3.5 sm:text-base"
                  href="/contact"
                >
                  <Phone className="h-4 w-4" />
                  Contact Support
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-4 text-grey-60 text-xs">
                Thank you for choosing Eduwise.solutions. We appreciate your
                trust and cooperation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Component

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <StandardRefundPolicy />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="h-px bg-linear-to-r from-transparent via-light-90 to-transparent" />
      </div>
      <DevOpsRefundPolicy />
      <BottomCTA />
    </main>
  );
}
