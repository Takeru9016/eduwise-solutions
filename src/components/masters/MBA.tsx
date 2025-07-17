import React from "react";
import {
  Clock,
  Users,
  Building,
  BookOpen,
  Monitor,
  CheckCircle2,
  GraduationCap,
  Target,
  Award,
  Lightbulb,
  Network,
  BarChart,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SPECIALIZATIONS = [
  {
    name: "Finance",
    icon: "💰",
    description: "Master financial strategies and market analysis",
  },
  {
    name: "Digital Marketing",
    icon: "🌐",
    description: "Learn modern digital marketing techniques",
  },
  {
    name: "Marketing",
    icon: "📊",
    description: "Develop comprehensive marketing strategies",
  },
  {
    name: "HRM",
    icon: "👥",
    description: "Master human resource management practices",
  },
  {
    name: "Analytics & Data Science",
    icon: "📈",
    description: "Learn data-driven decision making",
  },
  {
    name: "IT & FinTech",
    icon: "💻",
    description: "Explore technology in finance",
  },
  {
    name: "Operations Management",
    icon: "⚙️",
    description: "Optimize business operations",
  },
  {
    name: "Retail Management",
    icon: "🏪",
    description: "Master retail business strategies",
  },
  {
    name: "International Business",
    icon: "🌍",
    description: "Navigate global business landscapes",
  },
];

const PROGRAM_STATS = [
  {
    icon: Clock,
    label: "Program Duration",
    value: "1 & 2 Years",
    subtext: "Flexible weekend classes",
  },
  {
    icon: Users,
    label: "Batch Size",
    value: "30+ Students",
    subtext: "Personalized attention",
  },
  {
    icon: Building,
    label: "Career Support",
    value: "100%",
    subtext: "Placement assistance",
  },
  {
    icon: GraduationCap,
    label: "Alumni Network",
    value: "5000+",
    subtext: "Global professionals",
  },
];

const COURSE_BENEFITS = [
  {
    icon: Award,
    title: "Industry Recognition",
    description: "AICTE approved program with global accreditation",
    highlights: [
      "International certification",
      "Industry partnerships",
      "Recognized degree",
    ],
  },
  {
    icon: Lightbulb,
    title: "Experiential Learning",
    description: "Learn through real-world business scenarios",
    highlights: ["Case studies", "Industry projects", "Business simulations"],
  },
  {
    icon: Network,
    title: "Networking Opportunities",
    description: "Connect with industry leaders and alumni",
    highlights: ["Guest lectures", "Industry events", "Alumni meetups"],
  },
  {
    icon: BarChart,
    title: "Career Advancement",
    description: "Comprehensive career development support",
    highlights: ["Career counseling", "Interview preparation", "Job placement"],
  },
];

const LEARNING_FEATURES = [
  {
    icon: Monitor,
    title: "Digital Infrastructure",
    features: [
      "24/7 Learning Portal Access",
      "HD Video Lectures",
      "Interactive Learning Tools",
    ],
  },
  {
    icon: BookOpen,
    title: "Learning Resources",
    features: [
      "Comprehensive Study Material",
      "Case Study Database",
      "Digital Library Access",
    ],
  },
  {
    icon: Target,
    title: "Career Development",
    features: ["Industry Projects", "Placement Support", "Career Mentoring"],
  },
];

export default function MBAPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-99 to-light-99">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Badge className="mb-6 bg-primary-97 text-primary-75 border-primary-75">
              Executive Education
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-grey-15 mb-6 leading-tight">
              Transform Your Career with Our
              <span className="text-primary-75 block mt-2">MBA Program</span>
            </h1>
            <p className="text-grey-35 text-lg mb-8 max-w-2xl mx-auto">
              Develop leadership skills, strategic thinking, and business acumen
              through our industry-aligned curriculum
            </p>
            {/* <Button className="bg-primary-75 hover:bg-primary-70 text-white px-8 py-6 text-lg">
              Download Brochure
            </Button> */}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROGRAM_STATS.map((stat, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary-99">
                      <stat.icon className="w-6 h-6 text-primary-75" />
                    </div>
                    <div>
                      <p className="text-grey-35 text-sm">{stat.label}</p>
                      <h3 className="text-2xl font-bold text-grey-15 mb-1">
                        {stat.value}
                      </h3>
                      <p className="text-sm text-grey-35">{stat.subtext}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations Grid */}
      <section className="py-16 bg-light-99">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary-97 text-primary-75 border-primary-75">
              Career Paths
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-grey-15 mb-4">
              Specialized Tracks
            </h2>
            <p className="text-grey-35 max-w-2xl mx-auto">
              Choose from our diverse range of specializations designed to align
              with industry demands
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIALIZATIONS.map((spec, index) => (
              <Card
                key={index}
                className="border-none shadow-md hover:shadow-lg transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{spec.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-grey-15 mb-2">
                        {spec.name}
                      </h3>
                      <p className="text-grey-35 text-sm">{spec.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary-97 text-primary-75 border-primary-75">
              Program Benefits
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-grey-15 mb-4">
              Why Choose Our MBA Program?
            </h2>
            <p className="text-grey-35 max-w-2xl mx-auto">
              Discover the advantages that set our MBA program apart and prepare
              you for leadership roles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COURSE_BENEFITS.map((benefit, index) => (
              <Card
                key={index}
                className="border-none shadow-xl hover:shadow-2xl transition-all"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="p-4 rounded-2xl bg-primary-99">
                      <benefit.icon className="w-8 h-8 text-primary-75" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-grey-15 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-grey-35 mb-4">{benefit.description}</p>
                      <ul className="space-y-2">
                        {benefit.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary-75 flex-shrink-0" />
                            <span className="text-grey-35 text-sm">
                              {highlight}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Features */}
      <section className="py-16 bg-primary-99">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Badge className="mb-4 bg-primary-97 text-primary-75 border-primary-75">
                Learning Experience
              </Badge>
              <h2 className="text-3xl font-bold text-grey-15 mb-4">
                Modern Learning Infrastructure
              </h2>
              <p className="text-grey-35 mb-8">
                Experience a blend of traditional and digital learning methods
                designed for working professionals
              </p>
              <Button
                variant="outline"
                className="border-primary-75 text-primary-75 hover:bg-primary-99"
              >
                Explore Platform
              </Button>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              {LEARNING_FEATURES.map((feature, index) => (
                <Card key={index} className="border-none shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <feature.icon className="w-5 h-5 text-primary-75" />
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary-75" />
                          <span className="text-grey-35">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
