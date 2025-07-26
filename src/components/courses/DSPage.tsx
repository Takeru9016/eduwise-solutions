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
  Presentation,
  BarChart3,
  Target,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PaymentStatusModal from "../payment/PaymentStatusModal";
import PaymentModal from "../payment/PaymentModal";
import ToolsSection from "../common/ToolsSection";

const features = [
  {
    icon: Sparkles,
    title: "Beginner-friendly Python modules",
  },
  {
    icon: Laptop,
    title: "Real-time visualization with Matplotlib & Seaborn",
  },
  {
    icon: Users,
    title: "Industry-relevant Machine Learning algorithms",
  },
  {
    icon: LifeBuoy,
    title: "End-to-end capstone project",
  },
];

const highlights = [
  {
    category: "Classes",
    icon: BookOpen,
    points: [
      "Live & Recorded Sessions",
      "Flexible Timing",
      "Lifetime Content Access",
    ],
  },
  {
    category: "Projects",
    icon: Laptop,
    points: [
      "Capstone Project",
      "Multiple Mini-Projects",
      "Industry Case Studies",
    ],
  },
  {
    category: "Support",
    icon: LifeBuoy,
    points: [
      "1-1 Mentorship",
      "Doubt Clearing Sessions",
      "Peer Learning Groups",
    ],
  },
  {
    category: "Certification",
    icon: Medal,
    points: [
      "Industry-Recognized Certificate",
      "Project Showcase",
      "LinkedIn Endorsement",
    ],
  },
];

const targets = [
  { title: "Engineering students (CS/IT/Data Science)", icon: Users },
  { title: "Budding analysts and statisticians", icon: Medal },
  { title: "Professionals transitioning into data roles", icon: Briefcase },
];

const modules = [
  {
    title: "Introduction to Data Science & Python",
    description: "Foundational concepts and Python programming essentials.",
    weeks: ["Python Basics", "Data Structures", "Data Science Overview"],
  },
  {
    title: "Data Analysis & Visualization",
    description: "Learn to process, clean, and visualize data for insights.",
    weeks: ["Numpy & Pandas", "Data Cleaning", "Matplotlib & Seaborn"],
  },
  {
    title: "Statistics & Machine Learning",
    description: "Core statistics and ML algorithms for data-driven decisions.",
    weeks: [
      "Descriptive & Inferential Stats",
      "Regression & Classification",
      "Model Evaluation",
    ],
  },
  {
    title: "Deep Learning & Big Data",
    description: "Neural networks, deep learning, and big data tools.",
    weeks: ["Neural Networks", "Deep Learning Frameworks", "Big Data Basics"],
  },
  {
    title: "Deployment & Capstone",
    description: "Model deployment and final project.",
    weeks: ["Model Deployment", "MLOps Basics", "Capstone Project"],
  },
];

const careers = [
  { title: "Data Scientist" },
  { title: "Data Analyst" },
  { title: "Machine Learning Engineer" },
  { title: "Business Analyst" },
  { title: "Data Engineer" },
  { title: "BI Developer" },
];


export default function DSPage() {
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
        amount={11000}
        programName="Data Science Program"
      />
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary-99 to-white overflow-hidden">
        <div className="container mx-auto relative">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
                <Sparkles size={16} className="text-primary-75" />
                Data Science Program
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6 leading-tight">
                Data Science Course - Batch 2025
              </h1>
              <p className="text-xl text-primary-75 font-semibold mb-6">
                Unlock the Power of Data
              </p>
              <p className="text-grey-35 text-base md:text-lg leading-relaxed mb-8">
                Become a data-driven professional with hands-on projects, expert
                mentorship, and industry-recognized certification. Get job-ready
                for the data revolution.
              </p>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-95 rounded-2xl transform rotate-3"></div>
                <Image
                  src="/courses/data-science.png"
                  alt="Data Science"
                  width={600}
                  height={400}
                  className="relative rounded-2xl shadow-lg w-full h-auto object-cover"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-95 rounded-full p-2">
                      <Sparkles className="h-6 w-6 text-primary-75" />
                    </div>
                    <div>
                      <p className="font-vietnam font-bold text-grey-15">
                        Batch 2025
                      </p>
                      <p className="text-sm text-grey-35">Admissions Open</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 bg-white rounded-xl shadow-lg p-6">
            <div className="text-center">
              <p className="text-3xl font-vietnam font-bold text-primary-75">
                400+
              </p>
              <p className="text-grey-35">Students Trained</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-vietnam font-bold text-primary-75">
                6
              </p>
              <p className="text-grey-35">Months Program</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-vietnam font-bold text-primary-75">
                25+
              </p>
              <p className="text-grey-35">Projects & Labs</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-vietnam font-bold text-primary-75">
                100%
              </p>
              <p className="text-grey-35">Placement Support</p>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-light-97">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
              <Sparkles size={16} className="text-primary-75" />
              Why Choose This Program
            </div>
            <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15">
              Key Features
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md border border-light-90 hover:border-primary-90 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary-95 flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="h-6 w-6 text-primary-75" />
                </div>
                <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-2">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Who Can Join Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
              <Users size={16} className="text-primary-75" />
              Target Audience
            </div>
            <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15">
              Who Can Join
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mx-auto">
            {targets.map((target, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md border border-light-90 hover:border-primary-90 hover:shadow-lg transition-all duration-300 w-full md:w-1/3 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary-95 flex items-center justify-center mx-auto mb-4">
                  <target.icon className="h-8 w-8 text-primary-75" />
                </div>
                <h3 className="text-xl font-vietnam font-bold text-grey-15">
                  {target.title}
                </h3>
              </div>
            ))}
          </div>
          <p className="text-center text-grey-35 mt-8 bg-white bg-opacity-50 p-3 rounded-lg inline-block mx-auto">
            *Anyone with a passion for data science can enroll!*
          </p>
        </div>
      </section>
      {/* Program Highlights Section */}
      <section className="py-16 bg-light-97">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
              <Zap size={16} className="text-primary-75" />
              Program Highlights
            </div>
            <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15">
            What You&apos;ll Get
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-light-90 hover:border-primary-90 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-primary-95 p-4">
                  <div className="flex items-center gap-3">
                    <highlight.icon className="w-6 h-6 text-primary-75" />
                    <h3 className="text-xl font-vietnam font-bold text-grey-15">
                      {highlight.category}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {highlight.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary-75 mt-1 flex-shrink-0" />
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
      {/* Program Structure / Curriculum Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
              <BookOpen size={16} className="text-primary-75" />
              Program Structure
            </div>
            <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15">
              Curriculum Overview
            </h2>
            <p className="text-grey-35 text-lg mt-4 max-w-3xl mx-auto">
              A step-by-step journey from basics to advanced data science
              concepts, with hands-on projects and real-world applications.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-b-4 border-primary-75"
              >
                <div className="bg-primary-95 p-6">
                  <div className="flex justify-between items-center mb-3">
                    <Badge className="bg-primary-75 text-white px-3 py-1">
                      Module {index + 1}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-vietnam font-bold text-grey-15">
                    {module.title}
                  </h3>
                  <p className="mt-2 text-grey-35">{module.description}</p>
                </div>
                <div className="p-6">
                  <h4 className="font-vietnam font-semibold text-grey-15 mb-3">
                    Key Focus Areas:
                  </h4>
                  <ul className="space-y-2">
                    {module.weeks.map((week, weekIdx) => (
                      <li key={weekIdx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary-75 mt-0.5 flex-shrink-0" />
                        <span className="text-grey-35">{week}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Tools & Libraries Section */}
      <ToolsSection />
      {/* Career Opportunities & Pricing Section */}
      <section className="py-16 bg-light-97">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 border-l-4 border-primary-75">
              <h3 className="text-2xl font-vietnam font-bold text-grey-15 mb-6">
                Career Opportunities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {careers.map((career, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-95 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-primary-75" />
                    </div>
                    <div>
                      <h4 className="font-vietnam font-bold text-grey-15">
                        {career.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 border-l-4 border-primary-75 max-h-fit">
              <h3 className="text-2xl font-vietnam font-bold text-grey-15 mb-6">
                Program Investment
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary-95 flex items-center justify-center flex-shrink-0">
                    <IndianRupee className="w-7 h-7 text-primary-75" />
                  </div>
                  <div>
                    <p className="text-grey-20 font-bold">Upfront Payment</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-3xl font-vietnam font-bold text-primary-75">
                        ₹11,000
                      </p>
                      <Badge className="bg-green-500 text-white text-sm px-3 py-1 animate-pulse">
                        50% OFF
                      </Badge>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-grey-35">
                        <span className="line-through text-lg">₹50,000</span> •
                        One-time payment
                      </p>
                      <div className="mt-2 bg-green-50 border border-green-200 rounded-md p-2 inline-block">
                        <p className="text-sm text-green-700 font-medium flex items-center">
                          <Sparkles className="w-4 h-4 mr-1" />
                          Special discount for early birds!
                        </p>
                      </div>
                    </div>
                    <Button
                      className="mt-4 w-full bg-primary-75 text-white text-lg px-6 py-3 hover:bg-primary-80 font-semibold flex items-center justify-center gap-2"
                      onClick={openPaymentModal}
                    >
                      Enroll Now
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary-95 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-7 h-7 text-primary-75" />
                  </div>
                  <div>
                    <p className="text-grey-20 font-bold">
                      Pay After Placement
                    </p>
                    <p className="text-2xl font-vietnam font-bold text-primary-75">
                      ₹60,000
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
