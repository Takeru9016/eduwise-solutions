"use client";

import { useState } from "react";
import Image from "next/image";
import Script from "next/script";
import {
  Check,
  BookOpen,
  Users,
  Sparkles,
  Laptop,
  LifeBuoy,
  Briefcase,
  Medal,
  Zap,
  IndianRupee,
  Cloud,
  ServerCog,
  Settings2,
  ArrowRight,
  Clock,
  Target,
  Award,
  Star,
  TrendingUp,
  Shield,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import PaymentStatusModal from "../payment/PaymentStatusModal";
import PaymentModal from "../payment/PaymentModal";
import DevOpsToolsSection from "../common/DevOpsTools";
import DevOpsCurriculum from "./DevOps_Curriculum";
import PlacementSection from "./PlacementSection";
import GoogleReviews from "../common/GoogleReviews";
import DevOpsFAQ from "./DevOpsFAQ";
import RefundHighlight from "../common/RefundHighlight";

const stats = [
  { icon: Users, value: "2000+", label: "Students Trained" },
  { icon: Clock, value: "3.5", label: "Months Program" },
  { icon: Target, value: "25+", label: "Industry Projects" },
  { icon: Award, value: "100%", label: "Placement Assurance" },
];

const features = [
  {
    icon: Sparkles,
    title: "Structured Learning Roadmap",
    description:
      "A clear step-by-step curriculum designed to take you from basics to job-ready DevOps skills.",
  },
  {
    icon: Laptop,
    title: " Real-World Skill Validation",
    description:
      "Assignments and projects aligned with real industry requirements.",
  },
  {
    icon: Users,
    title: " Course Fee Refund Eligibility",
    description:
      "Complete the course and assignments successfully to become eligible for a 100% course fee refund as per policy.",
  },
  {
    icon: Shield,
    title: "Lifetime Learning Access",
    description:
      "Access course materials and updates even after course completion.",
  },
];

const highlights = [
  {
    category: "Live Interactive Classes",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
    points: [
      "Instructor-led Live Sessions",
      "Flexible Batch Options",
      "Recorded Sessions for Revision",
      "Expert-led Q&A Discussions",
    ],
  },
  {
    category: "Hands-on Learning & Projects",
    icon: Laptop,
    color: "from-green-500 to-green-600",
    points: [
      "Practical DevOps Assignments",
      "End-to-End Capstone Projects",
      "Industry-Based Case Studies",
      "Portfolio Ready Project Work",
    ],
  },
  {
    category: "Continuous Support",
    icon: LifeBuoy,
    color: "from-purple-500 to-purple-600",
    points: [
      "1-on-1 Mentorship",
      "Regular Doubt Clearing Sessions",
      "Peer Learning",
      "Technical Support",
    ],
  },
  {
    category: "Certification & Career Support",
    icon: Medal,
    color: "from-orange-500 to-orange-600",
    points: [
      "Course Completion Certificate",
      "Project Showcase Guidance",
      "Career Guidance",
    ],
  },
];

const targets = [
  {
    title: "Engineering Students",
    subtitle: "3-year degree holders",
    icon: Users,
    description: "Perfect for students looking to enter the tech industry",
  },
  {
    title: "Career Changers",
    subtitle: "From any background",
    icon: Settings2,
    description: "Transform your career with in-demand DevOps skills",
  },
  {
    title: "Working Professionals",
    subtitle: "IT & Non-IT backgrounds",
    icon: Briefcase,
    description: "Upskill and advance your career in DevOps",
  },
];

const careers = [
  { title: "DevOps Engineer", salary: "₹8-15 LPA", icon: ServerCog },
  { title: "Cloud Architect", salary: "₹12-25 LPA", icon: Cloud },
  { title: "Site Reliability Engineer", salary: "₹10-20 LPA", icon: Shield },
  { title: "Release Manager", salary: "₹8-18 LPA", icon: Settings2 },
  { title: "Security Engineer", salary: "₹10-22 LPA", icon: Shield },
  { title: "Cloud Engineer", salary: "₹8-16 LPA", icon: Cloud },
];

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

interface SectionHeaderProps {
  badge: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    text: string;
  };
  title: string;
  titleGradient?: string;
  description: string;
  showDecorator?: boolean;
}

const SectionHeader = ({
  badge,
  title,
  titleGradient,
  description,
  showDecorator = false,
}: SectionHeaderProps) => {
  const BadgeIcon = badge.icon;
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-semibold mb-4">
        <BadgeIcon size={16} />
        {badge.text}
      </div>
      <h2 className="text-3xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
        {titleGradient ?
          <span
            className={`bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent`}
          >
            {title}
          </span>
        : title}
      </h2>
      <p className="text-grey-35 text-lg max-w-3xl mx-auto">{description}</p>
      {showDecorator && (
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent to-primary-75 rounded-full" />
          <div className="w-2 h-2 bg-primary-75 rounded-full" />
          <div className="w-24 h-1 bg-gradient-to-r from-primary-75 via-primary-90 to-primary-75 rounded-full" />
          <div className="w-2 h-2 bg-primary-75 rounded-full" />
          <div className="w-16 h-1 bg-gradient-to-l from-transparent to-primary-75 rounded-full" />
        </div>
      )}
    </div>
  );
};

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}

const StatCard = ({ icon: Icon, value, label }: StatCardProps) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary-75 to-primary-90 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
    </div>
    <p className="text-xl sm:text-2xl lg:text-3xl font-vietnam font-bold text-primary-75 mb-1">
      {value}
    </p>
    <p className="text-grey-35 font-medium text-xs sm:text-sm lg:text-base">
      {label}
    </p>
  </div>
);

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="bg-white rounded-2xl p-8 shadow-lg border border-light-90 hover:border-primary-90 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center group">
    <div className="w-16 h-16 bg-gradient-to-r from-primary-75 to-primary-90 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
      <Icon className="h-8 w-8 text-white" />
    </div>
    <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-3">
      {title}
    </h3>
    <p className="text-grey-35 leading-relaxed">{description}</p>
  </div>
);

interface TargetCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
}

const TargetCard = ({
  icon: Icon,
  title,
  subtitle,
  description,
}: TargetCardProps) => (
  <div className="bg-gradient-to-br from-primary-99 to-white rounded-2xl p-8 shadow-lg border border-primary-95 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center group">
    <div className="w-20 h-20 bg-gradient-to-r from-primary-75 to-primary-90 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
      <Icon className="h-10 w-10 text-white" />
    </div>
    <h3 className="text-2xl font-vietnam font-bold text-grey-15 mb-2">
      {title}
    </h3>
    <p className="text-primary-75 font-semibold mb-3">{subtitle}</p>
    <p className="text-grey-35 leading-relaxed">{description}</p>
  </div>
);

interface CareerCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  salary: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface DevOpsPageProps {
  faqData?: {
    _id: string;
    title: string;
    questions: {
      _key: string;
      question: string;
      answer: string;
    }[];
  } | null;
}
export default function DevOpsPage({ faqData }: DevOpsPageProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<{
    isOpen: boolean;
    status: "success" | "failure" | "cancelled";
    message?: string;
  }>({
    isOpen: false,
    status: "success",
  });

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);
  const handleCloseStatusModal = () =>
    setPaymentStatus((prev) => ({ ...prev, isOpen: false }));

  return (
    <main className="min-h-screen bg-white">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <PaymentStatusModal
        isOpen={paymentStatus.isOpen}
        onClose={handleCloseStatusModal}
        status={paymentStatus.status}
        message={paymentStatus.message}
      />
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        amount={20000}
        programName="DevOps & Cloud Computing Program"
      />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-br from-primary-99 via-white to-primary-97 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-primary-90/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-tl from-primary-95/30 to-transparent rounded-full blur-2xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-primary-75 px-3 py-2 sm:px-4 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-lg">
                <Sparkles size={14} className="sm:w-4 sm:h-4" />
                DevOps with Cloud & AI
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-vietnam font-bold text-grey-15 mb-4 sm:mb-6 leading-tight px-2 sm:px-0">
                Master DevOps{" "}
                <span className="bg-gradient-to-r from-primary-75 to-primary-90 bg-clip-text text-transparent">
                  with Cloud & AI
                </span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-primary-75 font-semibold mb-4 sm:mb-6 px-2 sm:px-0">
                Become a DevOps Engineer with 100% Placement Assurance
              </p>

              <p className="text-grey-35 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 px-4 sm:px-0">
                Learn modern DevOps practices with Jenkins, Docker, Kubernetes,
                Terraform, Ansible, AWS, and monitoring tools. Build
                industry-grade projects and get job-ready.
              </p>
            </div>

            {/* Right Image */}
            <div className="relative order-2 lg:order-2">
              <div className="relative z-10 px-4 sm:px-0">
                <Image
                  src="/courses/devops.png"
                  alt="DevOps & Cloud Computing"
                  width={600}
                  height={400}
                  className="rounded-xl sm:rounded-2xl shadow-2xl w-full h-auto object-cover"
                  priority
                />

                {/* Floating Stats Card - Hidden on small screens, visible on md+ */}
                <div className="hidden md:block absolute -bottom-4 sm:-bottom-6 -right-2 sm:-right-6 bg-white rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-6 max-w-xs">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary-75 to-primary-90 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-vietnam font-bold text-grey-15 text-sm sm:text-base">
                        Batch 2026
                      </p>
                      <p className="text-xs sm:text-sm text-grey-35">
                        Admissions Open
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-grey-35">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                    <span>2000+ Students Enrolled</span>
                  </div>
                </div>

                {/* Mobile Stats Card - Visible only on small screens */}
                <div className="md:hidden mt-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 mx-4 sm:mx-0">
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-75 to-primary-90 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-center">
                      <p className="font-vietnam font-bold text-grey-15 text-sm">
                        Batch 2026 - Admissions Open
                      </p>
                      <div className="flex items-center justify-center gap-1 text-xs text-grey-35 mt-1">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span>2000+ Students Enrolled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 px-2 sm:px-0">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <RefundHighlight />

      {/* Features Section */}
      <section className="py-20 bg-light-97">
        <div className="container mx-auto">
          <SectionHeader
            badge={{ icon: Sparkles, text: "Why Choose This Program" }}
            title="Program Highlights"
            description="Comprehensive training designed to make you job-ready with industry-relevant skills and hands-on experience."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Join Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <SectionHeader
            badge={{ icon: Users, text: "Target Audience" }}
            title="Who Can Join"
            description="This program is designed for individuals from various backgrounds who want to build a career in DevOps."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {targets.map((target, index) => (
              <TargetCard key={index} {...target} />
            ))}
          </div>
        </div>
      </section>

      {/* Program Benefits Section - Modern Split Design */}
      <section className="py-24 bg-gradient-to-br from-primary-99/40 via-white to-primary-95/30 relative overflow-hidden">
        {/* Enhanced Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-90/10 via-transparent to-primary-95/15" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-primary-75/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tl from-blue-500/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-white to-primary-99/50 backdrop-blur-sm shadow-lg text-primary-75 px-6 py-3 rounded-full text-sm font-bold mb-8 border border-primary-90/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Zap size={18} className="animate-pulse" />
              What You&apos;ll Get
            </div>

            {/* Enhanced Title with Gradient */}
            <h2 className="text-5xl lg:text-6xl font-vietnam font-bold mb-6">
              <span className="bg-gradient-to-r from-grey-15 via-primary-75 to-grey-15 bg-clip-text text-transparent">
                Program Benefits
              </span>
            </h2>

            {/* Enhanced Description */}
            <p className="text-grey-35 text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-medium">
              Unlock your potential with our{" "}
              <span className="text-primary-75 font-semibold">
                exclusive program advantages
              </span>
            </p>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent to-primary-75 rounded-full" />
              <div className="w-2 h-2 bg-primary-75 rounded-full" />
              <div className="w-24 h-1 bg-gradient-to-r from-primary-75 via-primary-90 to-primary-75 rounded-full" />
              <div className="w-2 h-2 bg-primary-75 rounded-full" />
              <div className="w-16 h-1 bg-gradient-to-l from-transparent to-primary-75 rounded-full" />
            </div>
          </div>

          {/* Benefits Grid - Dynamic Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={index}
                  className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-grey-90 hover:shadow-2xl transition-all duration-500 group"
                >
                  {/* Large Number Watermark */}
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <span className="absolute -top-8 -left-4 text-[200px] font-vietnam font-bold text-primary-99 opacity-50 select-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative z-10 p-8">
                    {/* Header with Icon and Title */}
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${highlight.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-vietnam font-bold text-primary-75 mb-2">
                          {highlight.category}
                        </h3>
                      </div>
                    </div>

                    {/* Points List */}
                    <ul className="space-y-3 ml-0">
                      {highlight.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-primary-75 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-grey-35 leading-relaxed">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary-75/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-primary-75 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg border border-primary-75/20">
              <BookOpen size={16} />
              Comprehensive Curriculum
            </div>
            <h2 className="text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
              What You&apos;ll{" "}
              <span className="bg-gradient-to-r from-primary-75 to-primary-90 bg-clip-text text-transparent">
                Learn
              </span>
            </h2>
            <p className="text-grey-35 text-xl max-w-4xl mx-auto leading-relaxed">
              A comprehensive curriculum designed to take you from basics to
              advanced DevOps practices with real-world projects
            </p>
          </div>

          <DevOpsCurriculum />
        </div>
      </section>

      {/* Tools & Platforms Section */}
      <DevOpsToolsSection />

      {/* Placement Section */}
      <PlacementSection categorySlug="devops" />

      {/* Google Reviews Section */}
      <GoogleReviews categorySlug="devops" />

      {/* Career Opportunities & Pricing Section - Premium Revamp */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary-75/20 to-transparent rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-blue-500/15 to-transparent rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-90/5 to-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Career Opportunities - Enhanced */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/40 hover:shadow-3xl transition-all duration-500 group">
              {/* Enhanced Header with Statistics */}
              <div className="bg-gradient-to-r from-primary-75 via-primary-80 to-primary-90 p-8 text-white relative overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                        <TrendingUp className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-vietnam font-bold">
                          Career Opportunities
                        </h3>
                        <p className="text-white/80 text-sm mt-1">
                          High-growth DevOps roles
                        </p>
                      </div>
                    </div>
                    {/* Industry Growth Badge */}
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
                      <p className="text-xs text-white/80 font-medium">
                        Industry Growth
                      </p>
                      <p className="text-2xl font-bold">+45%</p>
                    </div>
                  </div>
                  <p className="text-white/90 text-base leading-relaxed">
                    Join the fastest-growing tech domain with lucrative salary
                    packages and endless opportunities
                  </p>
                </div>
              </div>

              {/* Career Cards Grid */}
              <div className="p-8 bg-gradient-to-br from-slate-50/50 to-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {careers.map((career, index) => {
                    const Icon = career.icon;
                    return (
                      <div
                        key={index}
                        className="group/card relative bg-white rounded-2xl p-5 border border-slate-200 hover:border-primary-75/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                      >
                        {/* Gradient Overlay on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-75/5 to-blue-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

                        <div className="relative z-10">
                          {/* Icon and Demand Badge */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-75/20 to-primary-90/20 rounded-xl flex items-center justify-center group-hover/card:scale-110 group-hover/card:rotate-6 transition-all duration-300">
                              <Icon className="w-6 h-6 text-primary-75" />
                            </div>
                            <span className="bg-green-500/10 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-500/20">
                              High Demand
                            </span>
                          </div>

                          {/* Job Title */}
                          <h4 className="font-vietnam font-bold text-grey-15 text-lg mb-2 group-hover/card:text-primary-75 transition-colors">
                            {career.title}
                          </h4>

                          {/* Salary with Gradient */}
                          <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold bg-gradient-to-r from-primary-75 to-blue-600 bg-clip-text text-transparent">
                              {career.salary}
                            </p>
                            <span className="text-xs text-grey-35">
                              per annum
                            </span>
                          </div>

                          {/* Salary Range Visualization */}
                          <div className="mt-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary-75 to-blue-600 rounded-full transition-all duration-500 group-hover/card:w-full"
                              style={{ width: "70%" }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Pricing - Premium Design */}
            <div className="relative">
              {/* "Most Popular" Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full shadow-lg border-4 border-white font-bold text-sm animate-pulse">
                  ⭐ MOST POPULAR
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary-75 via-primary-80 to-primary-90 rounded-3xl shadow-2xl overflow-hidden text-white relative hover:shadow-3xl transition-all duration-500">
                {/* Decorative Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 p-8 lg:p-10">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                      <IndianRupee className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-vietnam font-bold">
                        Program Investment
                      </h3>
                      <p className="text-white/90 text-base">
                        Best value in the market
                      </p>
                    </div>
                  </div>

                  {/* Pricing Card */}
                  <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 mb-6 border border-white/20">
                    <div className="text-center">
                      <p className="text-white/80 font-medium text-base mb-4">
                        One-time Payment
                      </p>

                      {/* Price Display */}
                      <div className="mb-6">
                        <div className="flex items-center justify-center gap-4 mb-3">
                          <p className="text-7xl font-vietnam font-bold">
                            ₹20,000
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                          <p className="text-white/70 line-through text-2xl">
                            ₹45,000
                          </p>
                          <div className="bg-orange-500 text-white font-bold text-lg px-4 py-1.5 rounded-full">
                            56% OFF
                          </div>
                        </div>
                      </div>

                      {/* Savings Highlight */}
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                        <p className="text-white font-semibold text-lg">
                          🎉 You Save ₹25,000!
                        </p>
                        <p className="text-white/80 text-sm mt-1">
                          Limited time offer - Ends soon
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="mb-6 space-y-3">
                    <p className="text-white/90 font-semibold text-sm uppercase tracking-wide mb-3">
                      What&apos;s Included:
                    </p>
                    {[
                      "3.5 Months Live Training",
                      "25+ Industry Projects",
                      "Lifetime Course Access",
                      "Placement Assistance",
                      "Course Completion Certificate",
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white/90 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3">
                    <Button
                      onClick={openPaymentModal}
                      className="w-full bg-white text-primary-75 text-xl px-8 py-7 font-bold hover:bg-primary-75 hover:text-white transition-all duration-300 hover:scale-105 shadow-2xl rounded-2xl"
                    >
                      Enroll Now
                      <ArrowRight className="ml-3 w-6 h-6" />
                    </Button>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center gap-6 pt-4 text-white/80 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-4 h-4" />
                        <span>Secure Payment</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4" />
                        <span>Certified Program</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <DevOpsFAQ faqData={faqData ?? null} />
    </main>
  );
}
