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
import DevOpsBenefits from "./DevOpsBenefits";
import DevOpsComparisonTable from "./DevOpsComparisonTable";
import DevOpsCurriculum from "./DevOps_Curriculum";

const stats = [
  { icon: Users, value: "600+", label: "Students Trained" },
  { icon: Clock, value: "3.5", label: "Months Program" },
  { icon: Target, value: "25+", label: "Industry Projects" },
  { icon: Award, value: "100%", label: "Placement Support" },
];

const features = [
  {
    icon: Sparkles,
    title: "100% Job Assistance",
    description:
      "Comprehensive placement support with resume building and interview preparation",
  },
  {
    icon: Laptop,
    title: "Industry Projects",
    description:
      "Real-world projects that showcase your skills to potential employers",
  },
  {
    icon: Users,
    title: "Expert Mentors",
    description:
      "Learn from industry professionals with years of DevOps experience",
  },
  {
    icon: Shield,
    title: "Lifetime Access",
    description: "Access to course content and updates even after completion",
  },
];

const highlights = [
  {
    category: "Live Classes",
    icon: BookOpen,
    color: "from-blue-500 to-blue-600",
    points: [
      "Interactive Live Sessions",
      "Flexible Timing Options",
      "Recorded Sessions Access",
      "Q&A with Experts",
    ],
  },
  {
    category: "Hands-on Projects",
    icon: Laptop,
    color: "from-green-500 to-green-600",
    points: [
      "Capstone Project",
      "Multiple Mini-Projects",
      "Industry Case Studies",
      "Portfolio Building",
    ],
  },
  {
    category: "24/7 Support",
    icon: LifeBuoy,
    color: "from-purple-500 to-purple-600",
    points: [
      "1-1 Mentorship",
      "Doubt Clearing Sessions",
      "Peer Learning Groups",
      "Technical Support",
    ],
  },
  {
    category: "Certification",
    icon: Medal,
    color: "from-orange-500 to-orange-600",
    points: [
      "Industry-Recognized Certificate",
      "Project Showcase",
      "LinkedIn Endorsement",
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

export default function DevOpsPage() {
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
        amount={10000}
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
                Become a DevOps Engineer with 100% Placement Support
              </p>

              <p className="text-grey-35 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 px-4 sm:px-0">
                Learn modern DevOps practices with Jenkins, Docker, Kubernetes,
                Terraform, Ansible, AWS, and monitoring tools. Build
                industry-grade projects and get job-ready.
              </p>

              {/* CTA Buttons */}
              {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-12 px-4 sm:px-0">
                <Button
                  onClick={openPaymentModal}
                  className="bg-primary-75 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold hover:bg-primary-80 transition-all duration-300 hover:scale-105 shadow-lg w-full sm:w-auto"
                >
                  Enroll Now - ₹7,000
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-primary-75 text-primary-75 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold hover:bg-primary-75 hover:text-white transition-all duration-300 w-full sm:w-auto"
                >
                  Download Brochure
                </Button>
              </div> */}
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
                        Batch 2025
                      </p>
                      <p className="text-xs sm:text-sm text-grey-35">
                        Admissions Open
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-grey-35">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                    <span>600+ Students Enrolled</span>
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
                        Batch 2025 - Admissions Open
                      </p>
                      <div className="flex items-center justify-center gap-1 text-xs text-grey-35 mt-1">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span>600+ Students Enrolled</span>
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
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary-75 to-primary-90 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <p className="text-xl sm:text-2xl lg:text-3xl font-vietnam font-bold text-primary-75 mb-1">
                  {stat.value}
                </p>
                <p className="text-grey-35 font-medium text-xs sm:text-sm lg:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-light-97">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Sparkles size={16} />
              Why Choose This Program
            </div>
            <h2 className="text-3xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
              Program Highlights
            </h2>
            <p className="text-grey-35 text-lg max-w-3xl mx-auto">
              Comprehensive training designed to make you job-ready with
              industry-relevant skills and hands-on experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-light-90 hover:border-primary-90 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-75 to-primary-90 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-3">
                  {feature.title}
                </h3>
                <p className="text-grey-35 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Join Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Users size={16} />
              Target Audience
            </div>
            <h2 className="text-3xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
              Who Can Join
            </h2>
            <p className="text-grey-35 text-lg max-w-3xl mx-auto">
              This program is designed for individuals from various backgrounds
              who want to build a career in DevOps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {targets.map((target, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary-99 to-white rounded-2xl p-8 shadow-lg border border-primary-95 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-primary-75 to-primary-90 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <target.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-vietnam font-bold text-grey-15 mb-2">
                  {target.title}
                </h3>
                <p className="text-primary-75 font-semibold mb-3">
                  {target.subtitle}
                </p>
                <p className="text-grey-35 leading-relaxed">
                  {target.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <DevOpsBenefits />

      {/* Program Highlights Section */}
      <section className="py-20 bg-light-97">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Zap size={16} />
              What You&apos;ll Get
            </div>
            <h2 className="text-3xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
              Program Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-light-90 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-r ${highlight.color} p-6`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <highlight.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-vietnam font-bold text-white">
                      {highlight.category}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {highlight.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary-75 mt-0.5 flex-shrink-0" />
                        <span className="text-grey-35">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
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

          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {modules.map((module, index) => (
              <div
                key={index}
                className="group bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
              >
                <div className="bg-gradient-to-r from-primary-75 via-primary-80 to-primary-90 p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 text-sm font-semibold border border-white/30">
                        Module {index + 1}
                      </Badge>
                      <span className="text-sm font-semibold text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                        {module.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                        <module.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-2xl font-vietnam font-bold text-white">
                        {module.title}
                      </h3>
                    </div>
                    <p className="text-white/90 text-lg leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="font-vietnam font-bold text-grey-15 mb-6 text-lg">
                    Key Topics:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {module.topics.map((topic, topicIdx) => (
                      <div
                        key={topicIdx}
                        className="flex items-center gap-3 group/item"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-primary-75 to-primary-90 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-grey-35 font-medium">
                          {topic}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Tools & Platforms Section */}
      <DevOpsToolsSection />

      {/* Comparison Table Section */}
      <DevOpsComparisonTable />

      {/* Career Opportunities & Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-75/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Career Opportunities */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
              <div className="bg-gradient-to-r from-primary-75 via-primary-80 to-primary-90 p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-vietnam font-bold">
                      Career Opportunities
                    </h3>
                  </div>
                  <p className="text-white/90 text-lg">
                    High-paying roles in the booming DevOps industry
                  </p>
                </div>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {careers.map((career, index) => (
                    <div
                      key={index}
                      className="group flex flex-col items-center text-center p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white hover:from-primary-75/5 hover:to-primary-90/5 transition-all duration-300 border border-slate-100 hover:border-primary-75/20 hover:shadow-lg"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-75/20 to-primary-90/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                        <career.icon className="w-6 h-6 text-primary-75" />
                      </div>
                      <h4 className="font-vietnam font-bold text-grey-15 text-base mb-1">
                        {career.title}
                      </h4>
                      <p className="text-primary-75 font-semibold text-sm">
                        {career.salary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-br from-primary-75 via-primary-80 to-primary-90 rounded-3xl shadow-2xl overflow-hidden text-white relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="relative z-10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                    <IndianRupee className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-vietnam font-bold">
                      Program Investment
                    </h3>
                    <p className="text-white/90 text-lg">
                      Affordable pricing with flexible payment options
                    </p>
                  </div>
                </div>

                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
                  <div className="text-center">
                    <p className="text-white/80 font-medium text-lg mb-4">
                      One-time Payment
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 mb-6">
                      <p className="text-6xl font-vietnam font-bold">₹10,000</p>
                      <div className="text-left">
                        <p className="text-white/70 line-through text-2xl">
                          ₹25,000
                        </p>
                        <p className="text-primary-99 font-bold text-2xl">
                          60% OFF
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <p className="text-white font-medium">
                        🎉 Limited Time Offer - Save ₹15,000!
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={openPaymentModal}
                  className="w-full bg-white text-primary-75 text-xl px-8 py-6 font-bold hover:bg-primary-95 hover:text-black transition-all duration-300 hover:scale-105 shadow-2xl rounded-2xl"
                >
                  Enroll Now
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
