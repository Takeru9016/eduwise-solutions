import {
  Check,
  Clock,
  Briefcase,
  GraduationCap,
  DollarSign,
  Sparkles,
  Target,
  Users,
  Building,
  Trophy,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Trophy,
    title: "100% Job Placement Guarantee",
    description: "Your success is our priority.",
  },
  {
    icon: Building,
    title: "Top Industry Connections",
    description: "Work with leading companies in IT and Non-IT domains.",
  },
  {
    icon: Users,
    title: "Experienced Trainers",
    description: "Learn from the best to become the best.",
  },
  {
    icon: Target,
    title: "Fast-Track Career Growth",
    description: "Short-term courses designed to get you job-ready quickly.",
  },
];

const itCareers = [
  {
    title: "Data Associate",
    description:
      "Learn how to handle and process large volumes of data efficiently.",
  },
  {
    title: "Data and Risk Management Analyst",
    description:
      "Master the art of identifying, assessing, and mitigating risks using data-driven strategies.",
  },
  {
    title: "Product Compliance Specialist",
    description:
      "Understand global product compliance standards and help businesses stay competitive.",
  },
  {
    title: "Customer Support Analyst",
    description:
      "Build problem-solving and communication skills to support customer-focused operations.",
  },
];

const nonItCareers = [
  {
    title: "Sales Executive",
    description:
      "Master the art of persuasion, customer engagement, and revenue generation.",
  },
  {
    title: "Finance Analyst",
    description:
      "Learn financial modeling, budgeting, and forecasting to support business growth.",
  },
  {
    title: "Operations Manager",
    description:
      "Acquire the skills to optimize processes and manage resources effectively.",
  },
  {
    title: "HR Specialist",
    description:
      "Understand talent acquisition, employee relations, and organizational development.",
  },
];

export default function ProfessionalPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-primary-99 to-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-95 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-97 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} className="text-primary-75" />
              Professional Programs
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-vietnam font-bold text-grey-15 mb-6">
              Professional Courses with 100% Job Guarantee
            </h1>

            <p className="text-xl text-primary-75 font-semibold mb-6">
              Your Career, Our Commitment!
            </p>

            <p className="text-grey-35 text-lg md:text-xl leading-relaxed">
              At Eduwise Solutions, we specialize in empowering individuals with
              the skills and opportunities needed to thrive in today&apos;s
              competitive job market. Our Professional Courses are tailored for
              both IT and Non-IT domains, offering fast-track programs with a
              guaranteed job placement.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Target size={16} className="text-primary-75" />
              Our Advantages
            </div>
            <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15">
              Why Eduwise Solutions?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border-light-90 hover:border-primary-90 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary-99 flex items-center justify-center mb-6 group-hover:bg-primary-95 transition-colors">
                    <feature.icon className="w-7 h-7 text-primary-75" />
                  </div>
                  <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-grey-35 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-light-97">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* IT Courses */}
            <Card className="group border-light-90 hover:border-primary-90 hover:shadow-lg transition-all duration-300">
              <CardHeader className="bg-primary-99 rounded-t-lg p-8">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-primary-75 text-white px-4 py-2">
                    IT Courses
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-primary-75 text-primary-75"
                  >
                    3 Months
                  </Badge>
                </div>
                <CardTitle className="text-2xl md:text-3xl font-vietnam font-bold text-grey-15">
                  IT Professional Courses
                </CardTitle>
              </CardHeader>

              <CardContent className="p-8 space-y-8">
                <div>
                  <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-4">
                    Why Choose IT Professional Courses?
                  </h3>
                  <p className="text-grey-35 leading-relaxed">
                    In just 3 months, gain specialized skills that employers in
                    the tech industry demand. Our courses prepare you for
                    high-paying, in-demand roles in top organizations like
                    Amazon, Flipkart, Genpact, and many others.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-4">
                    Career Opportunities
                  </h3>
                  <div className="grid gap-4">
                    {itCareers.map((career, index) => (
                      <div
                        key={index}
                        className="flex gap-3 bg-white p-4 rounded-lg border border-light-90"
                      >
                        <Check className="w-5 h-5 text-primary-75 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-grey-20 block mb-1">
                            {career.title}
                          </span>
                          <span className="text-grey-35">
                            {career.description}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary-99 p-6 rounded-lg">
                  <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-4">
                    Program Highlights
                  </h3>
                  <div className="grid gap-4">
                    {[
                      { icon: Clock, text: "Duration: 3 months" },
                      {
                        icon: GraduationCap,
                        text: "Industry-Relevant Curriculum: Designed by experts",
                      },
                      {
                        icon: Briefcase,
                        text: "Hands-On Training: Live projects and practical learning",
                      },
                      {
                        icon: DollarSign,
                        text: "Guaranteed Placement: Begin your career with top companies",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-white p-4 rounded-lg"
                      >
                        <item.icon className="w-5 h-5 text-primary-75" />
                        <span className="text-grey-35">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-light-90 pt-6">
                  <div className="grid gap-4">
                    <div className="bg-light-97 p-4 rounded-lg">
                      <p className="text-grey-20 font-bold mb-1">
                        Upfront Fees
                      </p>
                      <p className="text-3xl font-vietnam font-bold text-primary-75">
                        ₹20,000
                      </p>
                    </div>
                    <div className="bg-light-97 p-4 rounded-lg">
                      <p className="text-grey-20 font-bold mb-1">
                        Pay After Placement
                      </p>
                      <p className="text-3xl font-vietnam font-bold text-primary-75">
                        ₹8,000
                        <span className="text-sm text-grey-35">
                          /month (12 months)
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Non-IT Courses */}
            <Card className="group border-light-90 hover:border-primary-90 hover:shadow-lg transition-all duration-300">
              <CardHeader className="bg-primary-99 rounded-t-lg p-8">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-primary-75 text-white px-4 py-2">
                    Non-IT Courses
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-primary-75 text-primary-75"
                  >
                    2 Months
                  </Badge>
                </div>
                <CardTitle className="text-2xl md:text-3xl font-vietnam font-bold text-grey-15">
                  Non-IT Professional Courses
                </CardTitle>
              </CardHeader>

              <CardContent className="p-8 space-y-8">
                <div>
                  <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-4">
                    Why Choose Non-IT Professional Courses?
                  </h3>
                  <p className="text-grey-35 leading-relaxed">
                    Our 2-month programs cater to dynamic industries, equipping
                    you with the essential skills to excel in non-technical
                    roles across diverse sectors.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-4">
                    Career Opportunities
                  </h3>
                  <div className="grid gap-4">
                    {nonItCareers.map((career, index) => (
                      <div
                        key={index}
                        className="flex gap-3 bg-white p-4 rounded-lg border border-light-90"
                      >
                        <Check className="w-5 h-5 text-primary-75 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-grey-20 block mb-1">
                            {career.title}
                          </span>
                          <span className="text-grey-35">
                            {career.description}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary-99 p-6 rounded-lg">
                  <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-4">
                    Program Highlights
                  </h3>
                  <div className="grid gap-4">
                    {[
                      { icon: Clock, text: "Duration: 2 months" },
                      {
                        icon: GraduationCap,
                        text: "Focused Training: Industry-specific skills",
                      },
                      {
                        icon: Briefcase,
                        text: "Expert Mentorship: Learn from experienced professionals",
                      },
                      {
                        icon: DollarSign,
                        text: "Guaranteed Placement in leading companies",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 bg-white p-4 rounded-lg"
                      >
                        <item.icon className="w-5 h-5 text-primary-75" />
                        <span className="text-grey-35">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-light-90 pt-6">
                  <div className="grid gap-4">
                    <div className="bg-light-97 p-4 rounded-lg">
                      <p className="text-grey-20 font-bold mb-1">
                        Upfront Fees
                      </p>
                      <p className="text-3xl font-vietnam font-bold text-primary-75">
                        ₹5,000
                      </p>
                    </div>
                    <div className="bg-light-97 p-4 rounded-lg">
                      <p className="text-grey-20 font-bold mb-1">
                        Pay After Placement
                      </p>
                      <p className="text-3xl font-vietnam font-bold text-primary-75">
                        ₹20,000
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
