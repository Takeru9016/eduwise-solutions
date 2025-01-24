import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="group">
              <Card className="overflow-hidden h-full border-none bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative h-56 lg:h-64 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  <Image
                    src={program.imageUrl}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Badge */}
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

                  {/* Call to Action */}
                  <div className="pt-4">
                    <Link href={"/contact"}>
                      <Button
                        variant="link"
                        className="text-primary-75 hover:text-primary-70 p-0 h-auto font-medium group-hover:gap-3 flex items-center gap-2 transition-all duration-300"
                      >
                        Enquire Now{" "}
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
      </div>
    </section>
  );
}
