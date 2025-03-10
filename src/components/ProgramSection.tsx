"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProgramCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  viewLink: string;
  featured?: boolean;
}

// Enhanced data structure with more programs and unique IDs
const programCategories: ProgramCategory[] = [
  {
    id: "professional-cert",
    title: "Professional Certification",
    subtitle: "100% Job Guarantee",
    description:
      "Get a 100% job guarantee with our 50-day programme! Learn resume building, LinkedIn optimization, business communication, and more.",
    image: "/courses/professional.png",
    viewLink: "/professional",
    featured: true,
  },
  // You can add more programs here when needed
];

const ProgramCard = ({ program }: { program: ProgramCategory }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      key={program.id}
      className="group hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Content - Left Side */}
          <div className="p-8 flex flex-col justify-between md:w-2/5 bg-gradient-to-br from-white to-slate-50">
            <div className="space-y-6">
              {program.featured && (
                <Badge
                  variant="outline"
                  className="bg-primary-50 text-white text-sm border-primary-200 mb-2"
                >
                  Featured Program
                </Badge>
              )}

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {program.title}
                </h3>
                <p className="text-primary-600 font-medium inline-block px-3 py-1 bg-primary-100 rounded-full text-sm">
                  {program.subtitle}
                </p>
              </div>

              <p className="text-slate-600 leading-relaxed">
                {program.description}
              </p>

              <div className="pt-4">
                <Link href={program.viewLink}>
                  <Button
                    variant="outline"
                    className="border-primary-500 text-black hover:text-white hover:bg-primary-50 flex items-center gap-2 transition-all duration-300"
                  >
                    View Details
                    <ArrowRight
                      size={18}
                      className={`transition-transform duration-300 ${
                        isHovered ? "translate-x-1" : ""
                      }`}
                    />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="md:w-3/5 relative overflow-hidden">
            <div className="relative w-full h-full min-h-[280px]">
              <Image
                src={program.image}
                alt={program.title}
                fill
                className={`object-cover transition-transform duration-700 ${
                  isHovered ? "scale-105" : "scale-100"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Programs() {
  const featuredPrograms = programCategories.filter(
    (program) => program.featured
  );

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12 md:mb-16">
          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles size={16} className="text-primary-600" />
              Featured Programs
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
              Our Programs
            </h2>
          </div>

          <Link href="/courses">
            <Button
              variant="outline"
              className="border-2 border-primary-500 text-primary-600 hover:bg-primary-50 px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
            >
              View All Programs
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Button>
          </Link>
        </div>

        {/* Programs Grid */}
        <div className="grid gap-8">
          {programCategories.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>

        {/* Empty State */}
        {programCategories.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-lg">
            <p className="text-slate-600">
              No programs available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
