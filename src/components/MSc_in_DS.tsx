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
    description: "50+ Mentorship Sessions and unlimited live doubt support",
  },
];

export default function MScAIDSPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-primary-99">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-primary-75">Masters Program</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
              MSc in Data Science and Artificial Intelligence
            </h1>
            <div className="flex flex-wrap gap-4 text-grey-35">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>12 Months</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                <span>Advanced IIT certification</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                <span>Assured Placement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Reordered Content */}
            <div className="lg:col-span-2">
              {/* Program Requirements - Moved to top */}
              <Card className="border-none shadow-lg mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-vietnam">
                    Program Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-grey-20 mb-3">
                        Eligibility Criteria
                      </h4>
                      <ul className="space-y-2">
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

                    <div className="bg-primary-99 p-4 rounded-lg">
                      <h4 className="font-semibold text-grey-20 mb-3">
                        Admission Process
                      </h4>
                      <ul className="space-y-2">
                        {[
                          "Online application submission",
                          "Document verification",
                          "Technical assessment",
                          "Personal interview",
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

              {/* Program Highlights - Moved to middle */}
              <Card className="border-none shadow-lg mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl font-vietnam">
                    Program Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      "Masters Degree with Advanced IIT certification",
                      "Global career opportunities across 60+ countries, including the UK, US, and Canada",
                      "High-quality learning material created with ECTS-accredited university, Woolf, and E&ICT Academy, IIT Guwahati",
                      "Extra mile placement support with dedicated mentorship",
                      "Unlimited live doubt support throughout the program",
                    ].map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <BrainCircuit className="w-5 h-5 text-primary-75 mt-1 flex-shrink-0" />
                        <span className="text-grey-35">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Key Features - Moved to bottom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="border-none shadow-lg">
                    <CardContent className="p-6">
                      <feature.icon className="w-10 h-10 text-primary-75 mb-4" />
                      <h3 className="text-xl font-vietnam font-semibold text-grey-20 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-grey-35">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Sidebar - Unchanged */}
            <div className="space-y-6">
              {/* Course Details */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-vietnam">
                    Course Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      { icon: Clock, text: "12 months intensive program" },
                      {
                        icon: Users,
                        text: "Limited batch size for personalized attention",
                      },
                      { icon: Building, text: "Industry-aligned curriculum" },
                      { icon: MessageCircle, text: "50+ Mentorship sessions" },
                      { icon: Briefcase, text: "Dedicated placement support" },
                      { icon: BookOpen, text: "Comprehensive study materials" },
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-primary-75" />
                        <span className="text-grey-35">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-vietnam">
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-primary-99 rounded-lg">
                      <h4 className="font-semibold text-grey-20 mb-2">
                        IIT Advanced Certification
                      </h4>
                      <p className="text-grey-35">
                        Receive advanced certification from IIT Guwahati,
                        enhancing your credibility in the industry.
                      </p>
                    </div>
                    <div className="p-4 bg-primary-99 rounded-lg">
                      <h4 className="font-semibold text-grey-20 mb-2">
                        Global Recognition
                      </h4>
                      <p className="text-grey-35">
                        Equivalent to an MS degree from US institutions,
                        recognized across 60+ countries.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Placement Support */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-vietnam">
                    Placement Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-primary-75 mt-1" />
                      <span className="text-grey-35">
                        Dedicated placement team for career guidance
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary-75 mt-1" />
                      <span className="text-grey-35">
                        Industry expert mentorship sessions
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-primary-75 mt-1" />
                      <span className="text-grey-35">
                        Access to global job opportunities
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Experience Section - Unchanged */}
      <section className="py-12 bg-light-97">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-vietnam font-bold text-grey-15 mb-8 text-center">
            Learning Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                description: "Work on real-world AI and Data Science projects",
              },
              {
                icon: Briefcase,
                title: "Career Support",
                description:
                  "Get placement assistance and interview preparation",
              },
              {
                icon: Globe2,
                title: "Global Opportunities",
                description:
                  "Access to international job markets and networking",
              },
            ].map((item, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-99 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary-75" />
                    </div>
                    <div>
                      <h3 className="font-vietnam font-semibold text-grey-20 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-grey-35">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
