import Image from "next/image";
import Link from "next/link";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const courseCategories = [
  {
    title: "Master's Programme (Earn while you Learn)",
    description:
      "We provide various Online Master's program such as MBA, MS (Data Science) & Cloud Computing, MCA.",
    images: ["/courses/mba.png", "/courses/aids.jpg", "/courses/cloud.jpeg"],
    viewLink: "/masters",
  },
  {
    title: "Professional Certification",
    description:
      "We provide professional courses with 100% Job Guarantee in - IT JOBS and NON-IT JOBS.",
    images: [
      "/courses/it jobs.jpg",
      "/courses/jobs.jpg",
      "/courses/non-it.jpg",
    ],
    viewLink: "/professional",
  },
  {
    title: "Certification Programme",
    description:
      "Digital marketing, Trading, Cybersecurity, Ethical Hacking, Data Science, Web Development, MERN Stack",
    images: [
      "/courses/mern.png",
      "/courses/ethical.png",
      "/courses/trading.jpg",
    ],
    viewLink: "/certification",
  },
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-primary-99 to-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-95 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-97 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="container mx-auto relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} className="text-primary-75" />
              Education for Everyone
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-vietnam font-bold text-grey-15 mb-6">
              Our Online Courses and Programme
            </h1>

            <p className="text-grey-35 text-lg md:text-xl leading-relaxed">
              An overview of the programs and courses available here to start
              your new journey in your life and something new.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="space-y-16">
            {courseCategories.map((category, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-light-97 to-white rounded-2xl p-8 md:p-10 border border-light-90 hover:border-primary-90 transition-colors group"
              >
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary-99 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-primary-75" />
                      </div>
                      <h2 className="text-2xl md:text-3xl font-vietnam font-bold text-grey-15">
                        {category.title}
                      </h2>
                    </div>

                    <p className="text-grey-35 text-lg max-w-2xl">
                      {category.description}
                    </p>
                  </div>

                  <Button
                    asChild
                    className="bg-primary-75 hover:bg-primary-70 text-white px-6 h-12 flex items-center gap-2 group-hover:translate-x-1 transition-all"
                  >
                    <Link href={category.viewLink}>
                      View Course
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                </div>

                {/* Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {category.images.map((image, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="relative h-72 rounded-xl overflow-hidden group/image"
                    >
                      {/* Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />

                      <Image
                        src={image}
                        alt={`${category.title} image ${imgIndex + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover/image:scale-105"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-primary-75/30 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-20" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
