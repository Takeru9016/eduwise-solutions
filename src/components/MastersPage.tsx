import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Clock, Building, DollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const mastersCourses = [
  {
    title: "MBA",
    degree: "MASTER OF BUSINESS ADMINISTRATION",
    duration: "12 & 24 Months",
    image: "/courses/mba.png",
    link: "/masters/mba",
  },
  {
    title: "MSc",
    degree: "MASTER IN ARTIFICIAL INTELLIGENCE & DATA SCIENCE",
    duration: "12 & 24 Months",
    image: "/courses/aids.jpg",
    link: "/masters/msc-in-ds",
  },
  {
    title: "MSc",
    degree: "MASTER IN CLOUD COMPUTING",
    duration: "12 & 24 Months",
    image: "/courses/cloud.jpeg",
    isNew: true,
    link: "/masters/msc-in-cloud",
  },
];

const benefits = [
  {
    title: "Earn While You Learn",
    description: [
      "Gain industry-relevant jobs while studying",
      "Start earning from Day 1 with guaranteed job placements",
    ],
    icon: DollarSign,
  },
  {
    title: "Flexible and Accessible Learning",
    description: [
      "Learn at your own pace with live online classes",
      "Access course materials anytime, anywhere",
    ],
    icon: Clock,
  },
  {
    title: "Job-Integrated Education",
    description: [
      "Apply theoretical concepts in real-world scenarios",
      "Bridge the gap between academics and industry",
    ],
    icon: Building,
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
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
              For Masters
            </h1>
            <p className="text-grey-35 text-base md:text-lg">
              At Eduwise Solutions, we redefine higher education by offering an
              Online Masters Program that empowers you to pursue your dreams
              without financial stress. Our program is designed to help students
              learn, grow, and earn simultaneously, ensuring financial stability
              and career growth while completing their postgraduate studies.
            </p>
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="py-12 bg-light-97">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-vietnam font-bold text-grey-15 mb-8">
            Explore our Master Degree and certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mastersCourses.map((course, index) => (
              <Link href={course.link} key={index}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    {course.isNew && (
                      <span className="absolute top-4 right-4 bg-primary-75 text-white px-3 py-1 rounded-full text-sm">
                        NEW LAUNCH
                      </span>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <GraduationCap className="w-5 h-5 text-primary-75" />
                      <span className="text-primary-75 font-semibold">
                        {course.title}
                      </span>
                    </div>
                    <p className="text-sm text-grey-35 mb-4">{course.degree}</p>
                    <div className="flex items-center justify-between text-sm text-grey-40">
                      <span>⏱ {course.duration}</span>
                    </div>
                    <Button className="w-full mt-4 bg-primary-75 hover:bg-primary-70 text-white">
                      Know More
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-vietnam font-bold text-grey-15 mb-8">
            Why Choose Our Online Masters Program?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-6 bg-light-97 rounded-lg">
                <div className="w-12 h-12 bg-primary-99 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary-75" />
                </div>
                <h3 className="text-xl font-vietnam font-semibold text-grey-20 mb-4">
                  {benefit.title}
                </h3>
                <ul className="space-y-2">
                  {benefit.description.map((item, i) => (
                    <li key={i} className="text-grey-35 flex items-start gap-2">
                      <span className="text-primary-75 mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-12 bg-light-97">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-vietnam font-bold text-grey-15 mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-lg h-full hover:shadow-lg transition-shadow">
                  <span className="text-4xl font-bold text-primary-75 mb-4 block">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-vietnam font-semibold text-grey-20 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-grey-35">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="#059669"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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
