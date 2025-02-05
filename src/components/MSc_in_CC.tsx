import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GraduationCap,
  Clock,
  Globe2,
  Building,
  Users,
  BookOpen,
  BrainCircuit,
  MessageCircle,
  Briefcase,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Globe2,
    title: "Global Recognition",
    description:
      "Equivalent to an MS from any US institution with opportunities across 60+ countries",
  },
  {
    icon: Building,
    title: "Expert Instructors",
    description:
      "Learn from instructors from IIT Guwahati, MAANG, and other global companies",
  },
  {
    icon: Users,
    title: "Limited Batch Size",
    description: "Founder-led classes with personalized attention",
  },
  {
    icon: MessageCircle,
    title: "Comprehensive Support",
    description: "1:1 Mentor Sessions and unlimited live doubt support",
  },
];

export default function MScinCCPage() {
  return (
    <main className="min-h-screen bg-light-97">
      {/* Hero Section - Modernized with gradient and pattern */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-primary-99 to-primary-95 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl">
            <Badge className="mb-6 bg-primary-75 hover:bg-primary-80 transition-colors">
              Masters Program
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-vietnam font-bold text-grey-15 mb-8">
              MSc in Cloud Computing
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white/80 backdrop-blur border-none">
                <CardContent className="p-6 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-primary-75" />
                  <div>
                    <p className="font-medium text-grey-20">Duration</p>
                    <p className="text-grey-35">12 Months</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur border-none">
                <CardContent className="p-6 flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-primary-75" />
                  <div>
                    <p className="font-medium text-grey-20">Certification</p>
                    <p className="text-grey-35">IIT Advanced</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur border-none">
                <CardContent className="p-6 flex items-center gap-3">
                  <Building className="w-6 h-6 text-primary-75" />
                  <div>
                    <p className="font-medium text-grey-20">Placement</p>
                    <p className="text-grey-35">100% Assured</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Redesigned with better hierarchy */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Program Overview */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-vietnam">
                    Program Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-99 flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-6 h-6 text-primary-75" />
                        </div>
                        <div>
                          <h3 className="font-vietnam font-semibold text-grey-20 mb-2">
                            {feature.title}
                          </h3>
                          <p className="text-grey-35">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Program Highlights - Modernized */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-vietnam">
                    Program Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      "Masters Degree with Advanced IIT certification",
                      "Global career opportunities across 60+ countries",
                      "High-quality learning material",
                      "Extra mile placement support",
                      "Unlimited live doubt support",
                      "Industry-aligned curriculum",
                    ].map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary-75 mt-1" />
                        <span className="text-grey-35">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Experience - Redesigned Grid */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-vietnam">
                    Learning Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        icon: Users,
                        title: "Expert-Led Sessions",
                        description:
                          "Learn directly from industry veterans and IIT faculty",
                      },
                      {
                        icon: MessageCircle,
                        title: "Interactive Learning",
                        description:
                          "Engage in live discussions and doubt-clearing sessions",
                      },
                      {
                        icon: BookOpen,
                        title: "Comprehensive Material",
                        description:
                          "Access high-quality content developed with top institutions",
                      },
                      {
                        icon: BrainCircuit,
                        title: "Practical Projects",
                        description:
                          "Work on real-world Cloud Computing projects",
                      },
                    ].map((item, index) => (
                      <div key={index} className="p-6 bg-primary-99 rounded-xl">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                            <item.icon className="w-6 h-6 text-primary-75" />
                          </div>
                          <div>
                            <h3 className="font-vietnam font-semibold text-grey-20 mb-2">
                              {item.title}
                            </h3>
                            <p className="text-grey-35">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar - Enhanced */}
            <div className="space-y-6">
              {/* Program Requirements - Modernized */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-vietnam">
                    Program Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-grey-20 mb-3">
                        Eligibility
                      </h4>
                      <ul className="space-y-3">
                        {[
                          "Bachelor's degree in relevant field",
                          "Basic programming knowledge",
                          "Understanding of mathematics and statistics",
                          "English proficiency",
                        ].map((item, index) => (
                          <li key={index} className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary-75" />
                            <span className="text-grey-35">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Career Support */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-vietnam">
                    Career Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Briefcase,
                        title: "Placement Assistance",
                        description: "Dedicated team for career guidance",
                      },
                      {
                        icon: Users,
                        title: "Mentorship",
                        description: "1:1 sessions with industry experts",
                      },
                      {
                        icon: Globe2,
                        title: "Global Opportunities",
                        description: "Access to international job markets",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 p-4 bg-primary-99 rounded-lg"
                      >
                        <item.icon className="w-6 h-6 text-primary-75" />
                        <div>
                          <h4 className="font-semibold text-grey-20">
                            {item.title}
                          </h4>
                          <p className="text-grey-35 text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
