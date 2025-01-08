import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const programs = [
  {
    title: "Master's Programme (Earn while you Learn)",
    duration: "2 Years",
    level: "Beginner",
    provider: "University Name",
    description:
      "We provide various Online Master's program such as MBA, MS (Data Science) & Cloud Computing, MCA",
    imageUrl: "/images/masters-program.jpg",
  },
  {
    title: "Master's Programme (Earn while you Learn)",
    duration: "2 Years",
    level: "Beginner",
    provider: "University Name",
    description:
      "We provide various Online Master's program such as MBA, MS (Data Science) & Cloud Computing, MCA",
    imageUrl: "/images/masters-program.jpg",
  },
  {
    title: "Master's Programme (Earn while you Learn)",
    duration: "2 Years",
    level: "Beginner",
    provider: "University Name",
    description:
      "We provide various Online Master's program such as MBA, MS (Data Science) & Cloud Computing, MCA",
    imageUrl: "/images/masters-program.jpg",
  },
  {
    title: "Master's Programme (Earn while you Learn)",
    duration: "2 Years",
    level: "Beginner",
    provider: "University Name",
    description:
      "We provide various Online Master's program such as MBA, MS (Data Science) & Cloud Computing, MCA",
    imageUrl: "/images/masters-program.jpg",
  },
];

export default function Programs() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-vietnam font-bold text-grey-15 text-center sm:text-left">
            Our Programs
          </h2>
          <Link href="/programs">
            <Button
              variant="link"
              className="text-primary-75 hover:text-primary-70"
            >
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {programs.map((program, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-light-90"
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
                <CardTitle className="text-lg md:text-xl lg:text-2xl font-vietnam font-semibold">
                  {program.title}
                </CardTitle>
                <div className="flex flex-wrap gap-2 md:gap-4 text-sm text-grey-40 mt-2">
                  <span>{program.duration}</span>
                  <span>•</span>
                  <span>{program.level}</span>
                  <span>•</span>
                  <span>By {program.provider}</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <p className="text-grey-35 text-sm md:text-base mb-4">
                  {program.description}
                </p>
                <Button
                  variant="outline"
                  className="border-primary-75 text-primary-75 hover:bg-primary-99 w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
