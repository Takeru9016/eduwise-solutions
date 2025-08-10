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
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PaymentStatusModal from "../payment/PaymentStatusModal";
import PaymentModal from "../payment/PaymentModal";
import DevOpsToolsSection from "../common/DevOpsTools";

const features = [
  {
    icon: Sparkles,
    title: "100% Job Assistance",
  },
  {
    icon: Laptop,
    title: "Industry Projects",
  },
  {
    icon: Users,
    title: "Expert Mentors",
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
  { title: "Engineering Students & 3-yr Degree", icon: Users },
  { title: "Career Changers", icon: Settings2 },
  { title: "Working Professionals", icon: Briefcase },
];

const modules = [
  {
    title: "Linux Fundamentals & Git",
    description: "Command line, shell scripting, and version control.",
    weeks: ["Linux Essentials", "Shell Scripting Basics", "Git & GitHub"],
  },
  {
    title: "CI/CD with Jenkins",
    description: "Build pipelines, automation, and best practices.",
    weeks: ["Jenkins Setup", "Pipeline as Code", "Automated Testing & Deploys"],
  },
  {
    title: "Containerization with Docker",
    description: "Images, containers, registries, and workflows.",
    weeks: ["Docker Essentials", "Docker Compose", "Best Practices"],
  },
  {
    title: "Orchestration with Kubernetes",
    description: "Deployments, services, scaling, and observability.",
    weeks: ["K8s Core Objects", "Helm Basics", "Scaling & Monitoring"],
  },
  {
    title: "Infrastructure as Code (Terraform/Ansible)",
    description: "Provisioning and configuration management.",
    weeks: ["Terraform Basics", "IaC Workflows", "Ansible for Config Mgmt"],
  },
  {
    title: "Cloud on AWS & Monitoring",
    description: "Core AWS services, Prometheus & Grafana.",
    weeks: ["AWS Foundations", "Prometheus Metrics", "Grafana Dashboards"],
  },
];

const careers = [
  { title: "DevOps Consultant" },
  { title: "Cloud Architect" },
  { title: "Site Reliability Engineer" },
  { title: "Release Manager" },
  { title: "Security Engineer" },
  { title: "Cloud Engineer" },
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
        amount={7000}
        programName="DevOps & Cloud Computing Program"
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary-99 to-white overflow-hidden">
        <div className="container mx-auto relative">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
                <Sparkles size={16} className="text-primary-75" />
                DevOps & Cloud Computing
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6 leading-tight">
                DevOps and Cloud Computing
              </h1>
              <p className="text-xl text-primary-75 font-semibold mb-6">
                Become a DevOps Engineer with 100% Placement Support
              </p>
              <p className="text-grey-35 text-base md:text-lg leading-relaxed mb-8">
                Learn modern DevOps with Jenkins, Docker, Kubernetes, Terraform,
                Ansible, AWS, Prometheus & Grafana. Work on industry-grade
                projects and get job-ready.
              </p>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-95 rounded-2xl transform rotate-3"></div>
                <Image
                  src="/courses/devops.png"
                  alt="DevOps & Cloud"
                  width={600}
                  height={400}
                  className="relative rounded-2xl shadow-lg w-full h-auto object-cover"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-95 rounded-full p-2">
                      <Cloud className="h-6 w-6 text-primary-75" />
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
                600+
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
              <p className="text-grey-35">Industry Projects</p>
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
            *Anyone interested in DevOps & Cloud can enroll!*
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
              A step-by-step journey from basics to advanced DevOps & Cloud
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

      {/* Tools & Platforms Section */}
      <DevOpsToolsSection />

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
                      <ServerCog className="w-5 h-5 text-primary-75" />
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
                        ₹7,000
                      </p>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-grey-35">
                        One-time payment • No Cost EMI options available
                      </p>
                    </div>
                    <Button
                      className="mt-4 w-full bg-primary-75 text-white text-lg px-6 py-3 hover:bg-primary-80 font-semibold flex items-center justify-center gap-2"
                      onClick={openPaymentModal}
                    >
                      Enroll Now
                    </Button>
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
