import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const programs = [
  {
    title: "Master's Programme",
    subtitle: "Earn while you Learn",
    description:
      "We provide various Online Master's program such as MBA, MS (Data Science) & Cloud Computing, MCA",
    imageUrl: "/home/masters.png",
    link: "/masters",
  },
  {
    title: "Professional Certification",
    description:
      "We provide professional courses with 100% Job Guarantee in - IT JOBS and NON-IT JOBS.",
    imageUrl: "/home/professional.png",
    link: "/professional",
  },
  {
    title: "Certification Programme",
    description:
      "Digital marketing, Trading, Cybersecurity, Ethical Hacking, Data Science, Web Development, MERN Stack",
    imageUrl: "/home/certification.png",
    link: "/certification",
  },
];

export default function Programs() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-grey-15 text-center sm:text-left">
            Our Programs
          </h2>
          <Link href="/courses">
            <Button className="bg-primary-70 text-white hover:bg-primary-50">
              View All
              <ArrowRight size={24} className="ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {programs.map((program, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full border border-light-90 flex flex-col"
            >
              <div className="relative h-48 md:h-56 lg:h-64 w-full">
                <Image
                  src={program.imageUrl}
                  alt={program.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl lg:text-2xl font-semibold">
                  {program.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0 flex-grow">
                <p className="text-lg font-bold md:text-2xl mb-4">
                  {program.subtitle}
                </p>
                <p className="text-grey-35 text-sm md:text-base mb-4">
                  {program.description}
                </p>
              </CardContent>
              <div className="p-4">
                <Link href={"/contact"}>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 w-full">
                    Enquire Now
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
