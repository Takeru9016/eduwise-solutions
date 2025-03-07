import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Globe, BookCheck, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const courseCategories = [
  // {
  //   title: "Master's Programme",
  //   subtitle: "Earn while you Learn",
  //   description:
  //     "We provide various Online Master's program such as MBA, MS (Data Science) & Cloud Computing, MCA.",
  //   images: ["/courses/mba.png", "/courses/aids.jpg", "/courses/cloud.jpeg"],
  //   viewLink: "/masters",
  //   icon: Trophy,
  //   stats: [
  //     { label: "Duration", value: "24 Months" },
  //     { label: "Placement", value: "100%" },
  //     { label: "Students", value: "5000+" },
  //   ],
  // },
  {
    title: "Professional Certification",
    subtitle: "100% Job Guarantee",
    description:
      "We provide professional courses with 100% Job Guarantee in - IT JOBS and NON-IT JOBS.",
    images: [
      "/courses/it jobs.jpg",
      "/courses/jobs.jpg",
      "/courses/non-it.jpg",
    ],
    viewLink: "/professional",
    icon: BookCheck,
    stats: [
      { label: "Duration", value: "6 Months" },
      { label: "Projects", value: "12+" },
      { label: "Companies", value: "100+" },
    ],
  },
  // {
  //   title: "Certification Programme",
  //   subtitle: "Industry-Ready Skills",
  //   description:
  //     "Digital marketing, Trading, Cybersecurity, Ethical Hacking, Data Science, Web Development, MERN Stack",
  //   images: [
  //     "/courses/mern.png",
  //     "/courses/ethical.png",
  //     "/courses/trading.jpg",
  //   ],
  //   viewLink: "/certification",
  //   icon: Globe,
  //   stats: [
  //     { label: "Duration", value: "3 Months" },
  //     { label: "Courses", value: "20+" },
  //     { label: "Mentors", value: "50+" },
  //   ],
  // },
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

        <div className="container mx-auto px-4">
          <Badge variant="secondary" className="mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Transform Your Career
          </Badge>

          <div className="max-w-4xl space-y-6">
            <h1 className="text-5xl font-bold text-slate-900 tracking-tight">
              Discover Your Perfect
              <span className="text-primary-600 block">Learning Path</span>
            </h1>

            <p className="text-xl text-slate-600 leading-relaxed">
              Explore our comprehensive range of programs designed to help you
              master new skills, advance your career, and achieve your goals.
            </p>

            {/* <div className="flex gap-4 pt-4">
              <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
                Explore Courses
              </Button>
              <Button size="lg" variant="outline">
                Download Brochure
              </Button>
            </div> */}
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8">
            {courseCategories.map((category, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-5 gap-6">
                    {/* Content */}
                    <div className="lg:col-span-2 p-8 flex flex-col justify-between">
                      <div className="space-y-6">
                        <div className="inline-flex p-3 rounded-xl bg-primary-50">
                          <category.icon className="w-6 h-6 text-white" />
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2">
                            {category.title}
                          </h3>
                          <p className="text-primary-600 font-medium">
                            {category.subtitle}
                          </p>
                        </div>

                        <p className="text-slate-600">{category.description}</p>

                        <div className="grid grid-cols-3 gap-4">
                          {category.stats.map((stat, i) => (
                            <div
                              key={i}
                              className="text-center p-3 rounded-lg bg-slate-50"
                            >
                              <div className="font-bold text-slate-900">
                                {stat.value}
                              </div>
                              <div className="text-sm text-slate-600">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button
                        asChild
                        className="mt-6 bg-white hover:bg-slate-50 text-primary-600 border border-slate-200 group-hover:border-primary-600 transition-colors"
                      >
                        <Link
                          href={category.viewLink}
                          className="flex items-center justify-between"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>

                    {/* Images */}
                    <div className="lg:col-span-3 grid grid-cols-3 gap-3 p-8 bg-slate-50 items-center">
                      {category.images.map((image, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="relative aspect-[4/3] rounded-lg overflow-hidden group/image"
                        >
                          <Image
                            src={image}
                            alt={`${category.title} image ${imgIndex + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover/image:scale-105 w-full h-[100%]"
                          />
                          <div className="absolute inset-0 bg-primary-600/20 opacity-0 group-hover/image:opacity-100 transition-opacity" />
                        </div>
                      ))}
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
