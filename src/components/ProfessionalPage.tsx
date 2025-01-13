import {
  Check,
  Clock,
  Briefcase,
  GraduationCap,
  DollarSign,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfessionalPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
              Professional Courses with 100% Job Guarantee
            </h1>
            <p className="text-xl text-primary-75 font-semibold mb-8">
              Your Career, Our Commitment!
            </p>
            <p className="text-grey-35 text-lg">
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
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-vietnam font-bold text-grey-15 mb-8 text-center">
            Why Eduwise Solutions?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "100% Job Placement Guarantee",
                description: "Your success is our priority.",
              },
              {
                title: "Top Industry Connections",
                description:
                  "Work with leading companies in IT and Non-IT domains.",
              },
              {
                title: "Experienced Trainers",
                description: "Learn from the best to become the best.",
              },
              {
                title: "Fast-Track Career Growth",
                description:
                  "Short-term courses designed to get you job-ready quickly.",
              },
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-vietnam font-semibold text-grey-20 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-grey-35">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12 bg-light-97">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* IT Courses */}
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-primary-99 rounded-t-lg">
                <CardTitle className="text-2xl font-vietnam font-bold text-grey-15">
                  IT Professional Courses
                  <Badge className="ml-2 bg-primary-75">3 Months</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-vietnam font-semibold text-grey-20 mb-4">
                    Why Choose IT Professional Courses?
                  </h3>
                  <p className="text-grey-35">
                    In just 3 months, gain specialized skills that employers in
                    the tech industry demand. Our courses prepare you for
                    high-paying, in-demand roles in top organizations like
                    Amazon, Flipkart, Genpact, and many others.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-vietnam font-semibold text-grey-20 mb-4">
                    Career Opportunities
                  </h3>
                  <ul className="space-y-3">
                    {[
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
                    ].map((role, index) => (
                      <li key={index} className="flex gap-3">
                        <Check className="w-5 h-5 text-primary-75 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-grey-20">
                            {role.title}:
                          </span>
                          <span className="text-grey-35">
                            {" "}
                            {role.description}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary-99 p-4 rounded-lg">
                  <h3 className="text-lg font-vietnam font-semibold text-grey-20 mb-4">
                    Program Highlights
                  </h3>
                  <ul className="space-y-3">
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
                      <li key={index} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-primary-75" />
                        <span className="text-grey-35">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-light-90 pt-6">
                  <div className="space-y-2">
                    <p className="text-grey-20">
                      <span className="font-semibold">Upfront Fees:</span> Rs.
                      20,000
                    </p>
                    <p className="text-grey-20">
                      <span className="font-semibold">
                        Pay After Placement:
                      </span>{" "}
                      Rs. 8,000/month (12 months)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Non-IT Courses */}
            <Card className="border-none shadow-lg">
              <CardHeader className="bg-primary-99 rounded-t-lg">
                <CardTitle className="text-2xl font-vietnam font-bold text-grey-15">
                  Non-IT Professional Courses
                  <Badge className="ml-2 bg-primary-75">2 Months</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-vietnam font-semibold text-grey-20 mb-4">
                    Why Choose Non-IT Professional Courses?
                  </h3>
                  <p className="text-grey-35">
                    Our 2-month programs cater to dynamic industries, equipping
                    you with the essential skills to excel in non-technical
                    roles across diverse sectors.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-vietnam font-semibold text-grey-20 mb-4">
                    Career Opportunities
                  </h3>
                  <ul className="space-y-3">
                    {[
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
                    ].map((role, index) => (
                      <li key={index} className="flex gap-3">
                        <Check className="w-5 h-5 text-primary-75 mt-1 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-grey-20">
                            {role.title}:
                          </span>
                          <span className="text-grey-35">
                            {" "}
                            {role.description}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary-99 p-4 rounded-lg">
                  <h3 className="text-lg font-vietnam font-semibold text-grey-20 mb-4">
                    Program Highlights
                  </h3>
                  <ul className="space-y-3">
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
                      <li key={index} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-primary-75" />
                        <span className="text-grey-35">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-light-90 pt-6">
                  <div className="space-y-2">
                    <p className="text-grey-20">
                      <span className="font-semibold">Upfront Fees:</span> Rs.
                      5,000
                    </p>
                    <p className="text-grey-20">
                      <span className="font-semibold">
                        Pay After Placement:
                      </span>{" "}
                      Rs. 20,000
                    </p>
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
