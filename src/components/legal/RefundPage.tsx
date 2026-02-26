"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  AlertCircle,
  Clock,
  Ban,
  CheckCircle2,
  Trophy,
  BookOpen,
  Target,
  Users,
  ChevronDown,
  CreditCard,
  FileText,
  Mail,
  Sparkles,
  ArrowRight,
  Phone,
  Copy,
  CalendarClock,
  XCircle,
  RefreshCcw,
  Scale,
} from "lucide-react";

// Types

interface PolicySection {
  number: string;
  title: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  content: React.ReactNode;
}

// Hero Section

function HeroSection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-99 via-white to-primary-97" />

      {/* Decorative orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-primary-90/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-gradient-to-tr from-primary-75/15 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-primary-75 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-6 border border-primary-90/40 shadow-sm">
            <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Transparent & Fair
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-vietnam font-bold text-grey-15 mb-4 sm:mb-5 leading-tight">
            Refund{" "}
            <span className="bg-gradient-to-r from-primary-75 to-primary-50 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-grey-40 text-base sm:text-lg lg:text-xl max-w-xl mx-auto mb-8 leading-relaxed">
            At Eduwise Solutions, we are committed to maintaining transparency
            and fairness in our enrollment and refund process.
          </p>

          {/* Quick nav pills */}
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#standard-policy"
              className="inline-flex items-center gap-2 bg-white rounded-full px-4 sm:px-5 py-2.5 text-sm font-medium text-grey-30 border border-light-90 shadow-sm hover:border-primary-90 hover:text-primary-75 transition-all duration-300 hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              Standard Course Refund Policy
            </a>
            <a
              href="#devops-policy"
              className="inline-flex items-center gap-2 bg-white rounded-full px-4 sm:px-5 py-2.5 text-sm font-medium text-grey-30 border border-light-90 shadow-sm hover:border-primary-90 hover:text-primary-75 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Trophy className="w-4 h-4" />
              DevOps Course Refund Policy
            </a>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-90/40 to-transparent" />
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
      className={`bg-white rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen ?
          "border-primary-90/50 shadow-lg shadow-primary-90/5"
        : "border-light-90 shadow-sm hover:border-primary-90/30 hover:shadow-md"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 text-left cursor-pointer group"
      >
        {/* Number badge */}
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 text-xs sm:text-sm font-bold transition-colors duration-300 ${
            isOpen ?
              "bg-primary-75 text-white"
            : "bg-primary-99 text-primary-75 group-hover:bg-primary-97"
          }`}
        >
          {section.number}
        </div>

        {/* Icon + title */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
          <div
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${section.iconBg}`}
          >
            <Icon
              className={`w-4 h-4 sm:w-[18px] sm:h-[18px] ${section.iconColor}`}
            />
          </div>
          <h3 className="font-vietnam font-semibold text-grey-15 text-sm sm:text-base lg:text-lg truncate">
            {section.title}
          </h3>
        </div>

        {/* Chevron */}
        <ChevronDown
          className={`w-5 h-5 text-grey-50 flex-shrink-0 transition-transform duration-300 ${
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
        <div className="px-4 sm:px-5 pb-5 sm:pb-6 pt-0">
          <div className="h-px bg-gradient-to-r from-primary-90/20 via-primary-90/10 to-transparent mb-4 sm:mb-5" />
          {section.content}
        </div>
      </div>
    </div>
  );
}

// Standard Refund Policy Section

function StandardRefundPolicy() {
  const [openSections, setOpenSections] = useState<Set<number>>(
    new Set([0, 1]),
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
      number: "01",
      title: "Refund Eligibility",
      icon: CheckCircle2,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      content: (
        <div className="space-y-3">
          <p className="text-grey-35 text-sm sm:text-base leading-relaxed">
            A learner is eligible to claim a refund under the following
            condition:
          </p>
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-grey-20 font-medium text-sm sm:text-base">
                  The refund request must be submitted within{" "}
                  <strong className="text-emerald-700">
                    3 days (72 hours)
                  </strong>{" "}
                  from the date of purchase/enrollment.
                </p>
                <p className="text-grey-40 text-sm mt-2">
                  Any refund request received after 3 days from the date of
                  purchase will not be considered.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "02",
      title: "Money-Back Guarantee Conditions",
      icon: ShieldCheck,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
      content: (
        <div className="space-y-3">
          <p className="text-grey-35 text-sm sm:text-base leading-relaxed">
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
                key={i}
                className="flex items-start gap-3 bg-amber-50/60 border border-amber-100 rounded-lg p-3 sm:p-3.5"
              >
                <XCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span className="text-grey-30 text-sm sm:text-base">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-3 sm:p-4 mt-3">
            <p className="text-amber-800 text-sm sm:text-base">
              Once any of the above conditions are met, the enrollment will be
              considered fully utilized and <strong>non-refundable</strong>.
            </p>
          </div>
        </div>
      ),
    },
    {
      number: "03",
      title: "Refund Request Process",
      icon: Mail,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      content: (
        <div className="space-y-4">
          <p className="text-grey-35 text-sm sm:text-base leading-relaxed">
            To request a refund, learners must:
          </p>

          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 sm:p-5 space-y-3">
            <h4 className="font-semibold text-grey-20 text-sm sm:text-base">
              Submit a written refund request via:
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-grey-30 text-sm sm:text-base">
                  The official support email of Eduwise.solutions
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="text-grey-30 text-sm sm:text-base">
                  The Help & Support section on our website
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-blue-100 rounded-xl p-4 sm:p-5">
            <h4 className="font-semibold text-grey-20 text-sm sm:text-base mb-3">
              Include the following details:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Full Name",
                "Registered Email ID",
                "Course Name",
                "Date of Purchase",
                "Reason for Cancellation",
              ].map((detail, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm sm:text-base text-grey-30"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  {detail}
                </div>
              ))}
            </div>
            <p className="text-grey-50 text-xs sm:text-sm mt-3 italic">
              Incomplete requests may delay the refund process.
            </p>
          </div>
        </div>
      ),
    },
    {
      number: "04",
      title: "Refund Processing Timeline",
      icon: CalendarClock,
      iconColor: "text-violet-600",
      iconBg: "bg-violet-50",
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
              key={i}
              className="flex items-start gap-3 bg-violet-50/40 border border-violet-100 rounded-lg p-3 sm:p-4"
            >
              <CheckCircle2 className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" />
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
    },
    {
      number: "05",
      title: "Non-Refundable Situations",
      icon: Ban,
      iconColor: "text-red-600",
      iconBg: "bg-red-50",
      content: (
        <div className="space-y-3">
          <p className="text-grey-35 text-sm sm:text-base leading-relaxed">
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
                key={i}
                className="flex items-start gap-3 bg-red-50/40 border border-red-100 rounded-lg p-2.5 sm:p-3"
              >
                <Ban className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-grey-30 text-sm sm:text-base">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      number: "06",
      title: "Duplicate Payments",
      icon: Copy,
      iconColor: "text-teal-600",
      iconBg: "bg-teal-50",
      content: (
        <div className="space-y-3">
          <p className="text-grey-35 text-sm sm:text-base leading-relaxed">
            In case of accidental duplicate payment:
          </p>
          <div className="space-y-2.5">
            <div className="flex items-start gap-3 bg-teal-50/40 border border-teal-100 rounded-lg p-3 sm:p-4">
              <RefreshCcw className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <span className="text-grey-30 text-sm sm:text-base">
                The excess amount will be refunded within{" "}
                <strong className="text-teal-700">15 working days</strong> after
                verification.
              </span>
            </div>
            <div className="flex items-start gap-3 bg-teal-50/40 border border-teal-100 rounded-lg p-3 sm:p-4">
              <CreditCard className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <span className="text-grey-30 text-sm sm:text-base">
                Refund will be made to the original payment source.
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "07",
      title: "Policy Updates",
      icon: AlertCircle,
      iconColor: "text-grey-40",
      iconBg: "bg-grey-95",
      content: (
        <div className="space-y-3">
          <p className="text-grey-35 text-sm sm:text-base leading-relaxed">
            Eduwise Solutions reserves the right to modify or update this refund
            policy at any time without prior notice. Learners are advised to
            review this page periodically for any changes.
          </p>
          <p className="text-grey-35 text-sm sm:text-base leading-relaxed">
            For any refund-related queries, please contact our support team
            through the{" "}
            <Link
              href="/contact"
              className="text-primary-75 font-medium hover:underline"
            >
              Help & Support
            </Link>{" "}
            section on our website.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section id="standard-policy" className="py-10 sm:py-14 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 border border-primary-90/40">
              <FileText className="w-3.5 h-3.5" />
              General Policy
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-vietnam font-bold text-grey-15 mb-3">
              Standard Refund Policy
            </h2>
            <p className="text-grey-40 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
              Please read our refund policy carefully before purchasing any
              course or program through our platform.
            </p>
          </div>

          {/* Policy cards */}
          <div className="space-y-3 sm:space-y-4">
            {sections.map((section, index) => (
              <PolicyCard
                key={index}
                section={section}
                isOpen={openSections.has(index)}
                onToggle={() => toggleSection(index)}
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
      id="devops-policy"
      className="py-10 sm:py-14 lg:py-16 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4 border border-emerald-200">
              <Trophy className="w-3.5 h-3.5" />
              Exclusive Offer
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-vietnam font-bold text-grey-15 mb-3">
              DevOps — 100% Fee Refund{" "}
              <span className="bg-gradient-to-r from-primary-75 to-emerald-500 bg-clip-text text-transparent">
                Guarantee
              </span>
            </h2>
            <p className="text-grey-40 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
              Complete the program successfully and qualify for a full refund if
              not placed. This guarantee is exclusive to our DevOps with Cloud &
              AI program.
            </p>
          </div>

          {/* Main requirement card */}
          <div className="bg-gradient-to-br from-primary-75 to-primary-50 rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 mb-6 shadow-xl shadow-primary-75/15 text-white relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            </div>

            <div className="relative z-10 flex items-start gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  Main Requirement
                </h3>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  To qualify for the refund, you must complete{" "}
                  <strong>100% of the course content</strong> within the
                  duration of the course from the date of purchase.
                </p>
              </div>
            </div>
          </div>

          {/* Requirements grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
            {/* Chapter & Practice */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
                    Requirement 1
                  </p>
                  <h4 className="font-vietnam font-bold text-grey-15 text-sm sm:text-base">
                    Chapter & Practice
                  </h4>
                </div>
              </div>
              <p className="text-grey-35 text-sm mb-3">
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
                    key={i}
                    className="flex items-center gap-1.5 text-sm text-grey-30"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Contest */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-violet-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-violet-600 font-semibold uppercase tracking-wider">
                    Requirement 2
                  </p>
                  <h4 className="font-vietnam font-bold text-grey-15 text-sm sm:text-base">
                    Contest Participation
                  </h4>
                </div>
              </div>
              <div className="bg-violet-50 rounded-lg p-3 border border-violet-100">
                <p className="text-grey-30 text-sm sm:text-base">
                  <strong className="text-violet-600">
                    Minimum 90% of Contests
                  </strong>{" "}
                  must be solved
                </p>
              </div>
            </div>

            {/* Problem Solving */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-emerald-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">
                    Requirement 3
                  </p>
                  <h4 className="font-vietnam font-bold text-grey-15 text-sm sm:text-base">
                    Problem Solving
                  </h4>
                </div>
              </div>
              <p className="text-grey-30 text-sm sm:text-base mb-2">
                <strong className="text-emerald-600">
                  90% completion required
                </strong>
              </p>
              <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                <p className="text-xs sm:text-sm text-grey-40">
                  <strong>Important:</strong> Marks are awarded only for the{" "}
                  <strong>first correct attempt</strong>. Subsequent attempts
                  won&apos;t earn marks.
                </p>
              </div>
            </div>

            {/* Live Class */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-orange-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-orange-600 font-semibold uppercase tracking-wider">
                    Requirement 4
                  </p>
                  <h4 className="font-vietnam font-bold text-grey-15 text-sm sm:text-base">
                    Live Class Attendance
                  </h4>
                </div>
              </div>
              <p className="text-grey-30 text-sm sm:text-base mb-2">
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
                    key={i}
                    className="flex items-start gap-2 text-xs sm:text-sm text-grey-40"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-red-50 border border-red-200 rounded-xl sm:rounded-2xl p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-900 text-sm sm:text-base mb-1">
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
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-grey-10 via-grey-15 to-grey-20" />
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-gradient-to-br from-primary-75/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-tr from-primary-90/15 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 p-6 sm:p-8 lg:p-10 text-center">
              <Sparkles className="w-8 h-8 text-primary-90 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-vietnam font-bold text-white mb-3">
                Have questions about our refund policy?
              </h3>
              <p className="text-grey-60 text-sm sm:text-base max-w-lg mx-auto mb-6">
                Our support team is here to help. Reach out through our Help &
                Support section for any refund-related queries.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-75 to-primary-90 hover:from-primary-70 hover:to-primary-80 text-white font-semibold text-sm sm:text-base px-6 py-3 sm:py-3.5 rounded-xl shadow-lg shadow-primary-75/25 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-4 h-4" />
                  Contact Support
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-grey-60 text-xs mt-4">
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-light-90 to-transparent" />
      </div>
      <DevOpsRefundPolicy />
      <BottomCTA />
    </main>
  );
}
