import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Clock,
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  Target,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const mastersCourses = [
  {
    title: "MBA",
    degree: "MASTER OF BUSINESS ADMINISTRATION",
    duration: "24 Months",
    // image: "/courses/mba.png",
    link: "/masters/mba",
    highlights: ["Industry mentorship", "Live projects", "Global exposure"],
  },
  {
    title: "MSc",
    degree: "MASTER IN ARTIFICIAL INTELLIGENCE & DATA SCIENCE",
    duration: "24 Months",
    // image: "/courses/aids.jpg",
    link: "/masters/msc-in-ds",
    highlights: [
      "Advanced AI tools",
      "Research focus",
      "Industry partnerships",
    ],
  },
  {
    title: "MSc",
    degree: "MASTER IN CLOUD COMPUTING",
    duration: "24 Months",
    // image: "/courses/cloud.jpeg",
    isNew: true,
    link: "/masters/msc-in-cloud",
    highlights: [
      "Multi-cloud expertise",
      "DevOps training",
      "Certification prep",
    ],
  },
];

const benefits = [
  {
    title: "Career Growth",
    description: [
      "Industry-aligned curriculum with focus on practical skills",
      "Personalized career coaching and mentorship",
    ],
    icon: Target,
    bgColor: "bg-emerald-50",
  },
  {
    title: "Flexible Learning",
    description: [
      "Balanced schedule for working professionals",
      "24/7 access to learning resources",
    ],
    icon: Clock,
    bgColor: "bg-emerald-50",
  },
  {
    title: "Industry Connect",
    description: [
      "Regular interactions with industry experts",
      "Access to exclusive networking events",
    ],
    icon: Users,
    bgColor: "bg-emerald-50",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Enroll in Your Chosen Program",
    description:
      "Select the specialization that aligns with your career aspirations.",
  },
  {
    number: "02",
    title: "Start Learning Online",
    description:
      "Attend live sessions, work on real-world projects, and learn at your convenience.",
  },
  {
    number: "03",
    title: "Get a Job While Studying",
    description:
      "Secure a job placement with our partner companies and start earning immediately.",
  },
  {
    number: "04",
    title: "Graduate with Confidence",
    description:
      "Complete your program with practical experience, a steady income, and industry connections.",
  },
];

export default function MastersPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary-99 via-white to-primary-97 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary-95 rounded-full opacity-30 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-primary-90 rounded-full opacity-20 blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-primary-75 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-sm">
              <Star size={16} className="text-primary-75" />
              Transform Your Career with Masters Education
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-vietnam font-bold text-grey-15 mb-8 leading-tight">
              Master Your Future{" "}
              <span className="text-primary-75">Success</span>
            </h1>

            <p className="text-grey-35 text-xl leading-relaxed mb-12 max-w-3xl mx-auto">
              Elevate your career with our industry-integrated masters programs.
              Learn from experts, gain practical experience, and secure your
              dream job while studying.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-sm">
                <CheckCircle2 size={24} className="text-emerald-500" />
                <span className="text-grey-35 font-medium">
                  Learn & Earn Model
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-sm">
                <CheckCircle2 size={24} className="text-emerald-500" />
                <span className="text-grey-35 font-medium">
                  Industry Recognition
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-vietnam font-bold text-grey-15 mb-4">
              Our Master Programs
            </h2>
            <p className="text-grey-35 text-lg">
              Choose from our carefully curated selection of industry-focused
              master&apos;s degrees
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mastersCourses.map((course, index) => (
              <Link href={course.link} key={index} className="group">
                <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
                  {/* <div className="relative h-48 overflow-hidden">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {course.isNew && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          NEW LAUNCH
                        </span>
                      </div>
                    )}
                  </div> */}

                  <CardContent className="flex flex-col flex-grow p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <GraduationCap className="w-5 h-5 text-emerald-500" />
                      <span className="text-emerald-500 font-medium">
                        {course.title}
                      </span>
                    </div>

                    <h3 className="text-xl font-vietnam font-semibold text-gray-900 mb-6">
                      {course.degree}
                    </h3>

                    <div className="flex-grow space-y-3 mb-6">
                      {course.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-gray-600"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-emerald-500 flex-shrink-0"
                          />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center gap-2 mb-4 bg-emerald-50 text-gray-600 px-4 py-2 rounded-md">
                        <Clock className="w-4 h-4 text-emerald-500" />
                        <span>{course.duration}</span>
                      </div>

                      <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white group-hover:shadow-md transition-all duration-300">
                        Explore Program
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-vietnam font-bold text-grey-15 mb-4">
              Why Choose Our Masters Program?
            </h2>
            <p className="text-grey-35 text-lg">
              Experience a transformative learning journey designed for your
              success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="group border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 rounded-2xl ${benefit.bgColor} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}
                  >
                    <benefit.icon className="w-8 h-8 text-emerald-500" />
                  </div>

                  <h3 className="text-2xl font-vietnam font-bold text-grey-15 mb-6">
                    {benefit.title}
                  </h3>

                  <ul className="space-y-4">
                    {benefit.description.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-grey-35"
                      >
                        <CheckCircle2
                          size={20}
                          className="text-emerald-500 mt-1 flex-shrink-0"
                        />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-light-97">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15 mb-4">
              How It Works
            </h2>
            <p className="text-grey-35 text-lg">
              Your journey to success in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative group">
                <Card className="border-light-90 h-full hover:border-primary-90 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <span className="text-5xl font-vietnam font-bold text-primary-75/20 mb-6 block group-hover:text-primary-75/30 transition-colors">
                      {step.number}
                    </span>

                    <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-4">
                      {step.title}
                    </h3>

                    <p className="text-grey-35 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-primary-99 rounded-full flex items-center justify-center">
                      <ArrowRight size={16} className="text-primary-75" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
