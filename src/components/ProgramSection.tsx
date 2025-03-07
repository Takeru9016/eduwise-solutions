import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, BookCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const programs = [
//   {
//     title: "Master's Programme",
//     subtitle: "Earn while you Learn",
//     description:
//       "We provide various Online Master's program such as MBA, MS (Data Science) & Cloud Computing, MCA",
//     imageUrl: "/home/masters.png",
//     link: "/masters",
//   },
//   {
//     title: "Professional Certification",
//     subtitle: "100% Job Guarantee",
//     description:
//       "We provide professional courses with 100% Job Guarantee in - IT JOBS and NON-IT JOBS.",
//     imageUrl: "/home/professional.png",
//     link: "/professional",
//   },
//   {
//     title: "Certification Programme",
//     subtitle: "Get Certified",
//     description:
//       "Digital marketing, Trading, Cybersecurity, Ethical Hacking, Data Science, Web Development, MERN Stack",
//     imageUrl: "/home/certification.png",
//     link: "/certification",
//   },
// ];

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

export default function Programs() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-white to-light-97">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 md:mb-16">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles size={16} className="text-primary-75" />
              Featured Programs
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15">
              Our Programs
            </h2>
          </div>
          <Link href="/courses">
            <Button
              variant="outline"
              className="border-2 border-primary-75 text-primary-75 hover:bg-primary-99 px-6 py-2 rounded-lg flex items-center gap-2"
            >
              View All Programs
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>

        {/* TEMP Programs Grid */}
        <section className="py-1">
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

                          <p className="text-slate-600">
                            {category.description}
                          </p>

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

        {/* Programs Grid */}
        {/* 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="group">
              <Card className="overflow-hidden h-full border-none bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                
                <div className="relative h-56 lg:h-64 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  <Image
                    src={program.imageUrl}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-sm font-medium text-primary-75">
                      {program.subtitle}
                    </span>
                  </div>
                </div>

                <CardHeader className="p-6">
                  <CardTitle className="text-xl lg:text-2xl font-vietnam font-bold text-grey-15">
                    {program.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6 pt-0 space-y-4">
                  <p className="text-grey-35">{program.description}</p>

                  
                  <div className="pt-4">
                    <Link href={program.link}>
                      <Button
                        variant="link"
                        className="text-primary-75 hover:text-primary-70 p-0 h-auto font-medium group-hover:gap-3 flex items-center gap-2 transition-all duration-300"
                      >
                        Know More{" "}
                        <ArrowRight
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        */}
      </div>
    </section>
  );
}
