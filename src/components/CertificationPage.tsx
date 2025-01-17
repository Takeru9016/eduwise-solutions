import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  Users,
  BookOpen,
  Building,
  DollarSign,
  GraduationCap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const certificationCourses = [
  {
    title: "Digital Marketing",
    duration: "3 Months",
    level: "Beginner",
    topics: [
      "SEO & Content Marketing",
      "Social Media Marketing",
      "Email Marketing",
      "Google Analytics",
    ],
    image: "/courses/trading.jpg",
    isNew: true,
  },
  {
    title: "Web Development",
    duration: "4 Months",
    level: "Intermediate",
    topics: [
      "Frontend Development",
      "Backend Development",
      "Database Management",
      "Deployment",
    ],
    image: "/courses/mern.png",
  },
  {
    title: "Cybersecurity",
    duration: "3 Months",
    level: "Advanced",
    topics: [
      "Network Security",
      "Ethical Hacking",
      "Security Protocols",
      "Threat Analysis",
    ],
    image: "/courses/ethical.png",
  },
];

export default function CertificationPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-primary-99">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-center text-grey-15 mb-6">
              Certification Programs
            </h1>
            <p className="text-grey-35 text-base md:text-lg text-justify">
              At Eduwise Solutions, we provide industry-relevant certification
              courses designed to help you gain practical skills and advance
              your career. Our programs include hands-on training, expert
              mentorship, and guaranteed job placement support.
            </p>
          </div>
        </div>
      </section>

      {/* Course Cards Section */}
      <section className="py-12 bg-light-97">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-vietnam font-bold text-grey-15 mb-8">
            Explore our Certification Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificationCourses.map((course, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  {course.isNew && (
                    <Badge className="absolute top-4 right-4 bg-primary-75">
                      NEW
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-vietnam font-semibold text-grey-20 mb-4">
                    {course.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary-75" />
                      <span className="text-sm text-grey-35">
                        {course.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary-75" />
                      <span className="text-sm text-grey-35">
                        {course.level}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <Badge
                        variant="outline"
                        className="text-primary-75 border-primary-75"
                      >
                        100% Job Guarantee
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <p className="font-medium text-grey-20">Key Topics:</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {course.topics.map((topic, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-sm text-grey-35"
                        >
                          <span className="w-1.5 h-1.5 bg-primary-75 rounded-full mr-2" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Benefits */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-vietnam font-bold text-grey-15 text-center mb-8">
            Program Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Industry-Aligned Curriculum",
                description:
                  "Courses designed with input from industry experts to ensure relevance",
              },
              {
                icon: Users,
                title: "Expert Mentorship",
                description:
                  "Learn from experienced professionals with real-world expertise",
              },
              {
                icon: Building,
                title: "Job Guarantee",
                description:
                  "100% placement assistance with our network of partner companies",
              },
              {
                icon: GraduationCap,
                title: "Recognized Certification",
                description:
                  "Receive industry-recognized certifications upon completion",
              },
              {
                icon: Clock,
                title: "Flexible Learning",
                description:
                  "Balance your studies with work through our flexible schedule",
              },
              {
                icon: DollarSign,
                title: "Affordable Fees",
                description:
                  "Competitive pricing with easy payment options and EMI facility",
              },
            ].map((benefit, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary-99 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary-75" />
                  </div>
                  <h3 className="text-xl font-vietnam font-semibold text-grey-20 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-grey-35">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-vietnam font-bold text-gray-900 mb-4">
                <span className="text-gray-900">
                  Take the First Step Toward Your
                </span>
                <br />
                <span className="text-emerald-700">Dream Career!</span>
              </h2>
              <p className="text-gray-600">
                Join our Online Masters Program today and experience a unique
                blend of learning and earning.
              </p>
            </div>
            <div>
              <Button
                asChild
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-8 py-2 rounded-md"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
