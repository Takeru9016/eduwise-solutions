import Image from "next/image";
import {
  Clock,
  Users,
  BookOpen,
  Building,
  DollarSign,
  GraduationCap,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-primary-99 to-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-95 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-97 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} className="text-primary-75" />
              Get Certified, Get Hired
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-vietnam font-bold text-grey-15 mb-6">
              Certification Programs
            </h1>

            <p className="text-grey-35 text-lg md:text-xl leading-relaxed mb-8">
              At Eduwise Solutions, we provide industry-relevant certification
              courses designed to help you gain practical skills and advance
              your career. Our programs include hands-on training, expert
              mentorship, and guaranteed job placement support.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-primary-99 px-4 py-2 rounded-lg">
                <CheckCircle2 size={20} className="text-primary-75" />
                <span className="text-grey-35">Industry-Recognized</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-99 px-4 py-2 rounded-lg">
                <CheckCircle2 size={20} className="text-primary-75" />
                <span className="text-grey-35">Job Guarantee</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-99 px-4 py-2 rounded-lg">
                <CheckCircle2 size={20} className="text-primary-75" />
                <span className="text-grey-35">Expert Mentorship</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Cards Section */}
      <section className="py-16 bg-light-97">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15 mb-2">
                Explore our Certification Courses
              </h2>
              <p className="text-grey-35">
                Choose from our range of industry-focused certification programs
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificationCourses.map((course, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-light-90 hover:border-primary-90"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {course.isNew && (
                    <Badge className="absolute top-4 right-4 bg-primary-75">
                      NEW
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className="absolute bottom-4 left-4 text-white border-white"
                  >
                    100% Job Guarantee
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-2xl font-vietnam font-bold text-grey-15 mb-4">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary-75" />
                      <span className="text-grey-35">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary-75" />
                      <span className="text-grey-35">{course.level}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="font-semibold text-grey-20">Key Topics:</p>
                    <ul className="grid grid-cols-1 gap-3">
                      {course.topics.map((topic, idx) => (
                        <li
                          key={idx}
                          className="flex items-center text-grey-35"
                        >
                          <div className="w-2 h-2 bg-primary-75 rounded-full mr-3" />
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
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15 mb-4">
              Program Benefits
            </h2>
            <p className="text-grey-35 text-lg">
              Experience the advantages of learning with Eduwise Solutions
            </p>
          </div>

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
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-light-90 hover:border-primary-90 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary-99 flex items-center justify-center mb-6 group-hover:bg-primary-95 transition-colors">
                    <benefit.icon className="w-7 h-7 text-primary-75" />
                  </div>
                  <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-grey-35 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
