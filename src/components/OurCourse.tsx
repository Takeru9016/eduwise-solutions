// app/courses/page.tsx
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const courseCategories = [
  {
    title: "Master's Programme (Earn while you Learn)",
    description:
      "We provide various Online Master's program such as MBA, MS (Data Science) & Cloud Computing, MCA.",
    duration: "2 Years",
    level: "Beginner",
    provider: "University Name",
    images: ["/courses/mba.png", "/courses/aids.jpg", "/courses/cloud.jpeg"],
    viewLink: "/masters",
  },
  {
    title: "Professional Certification",
    description:
      "We provide professional courses with 100% Job Guarantee in - IT JOBS and NON-IT JOBS.",
    duration: "2 Years",
    level: "Intermediate",
    provider: "University Name",
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
    duration: "2 Years",
    level: "Intermediate",
    provider: "University Name",
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
      {/* Header Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
              Our Online Courses and Programme
            </h1>
            <p className="text-grey-35 text-base md:text-lg">
              An overview of the programs and courses available here to start
              your new journey in your life and something new.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="pb-12 md:pb-16 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {courseCategories.map((category, index) => (
              <div
                key={index}
                className="bg-light-97 rounded-xl p-6 md:p-8 lg:p-10"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-vietnam font-bold text-grey-15 mb-4">
                      {category.title}
                    </h2>
                    <p className="text-grey-35 max-w-2xl mb-4">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-grey-40">
                      <span>{category.duration}</span>
                      <span>•</span>
                      <span>{category.level}</span>
                      <span>•</span>
                      <span>By {category.provider}</span>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="mt-4 lg:mt-0 bg-primary-75 hover:bg-primary-70 text-white"
                  >
                    <Link href={category.viewLink}>View Course</Link>
                  </Button>
                </div>

                {/* Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {category.images.map((image, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="relative h-64 rounded-lg overflow-hidden group"
                    >
                      <Image
                        src={image}
                        alt={`${category.title} image ${imgIndex + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-primary-75/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
