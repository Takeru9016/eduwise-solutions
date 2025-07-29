"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProgramCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  viewLink: string;
  featured?: boolean;
}

// Enhanced data structure with more programs and unique IDs
const programCategories: ProgramCategory[] = [
  {
    id: "ai-cert",
    title: "Artificial Intelligence",
    subtitle: "Master the future of tech",
    description:
      "Dive into AI and machine learning with hands-on projects and real-world applications.",
    viewLink: "/ai-ml",
    featured: false,
  },
  {
    id: "cyber-security-cert",
    title: "Cyber Security",
    subtitle: "Defend against digital threats",
    description:
      "Learn ethical hacking, network defense, and more to become a cybersecurity expert.",
    viewLink: "/cyber-sec",
    featured: false,
  },
  {
    id: "data-science-cert",
    title: "Data Science",
    subtitle: "Turn data into insights",
    description:
      "Explore data analysis, visualization, and predictive modeling using industry-standard tools.",
    viewLink: "/data-science",
    featured: false,
  },
  {
    id: "full-stack-cert",
    title: "Full Stack Web Developer",
    subtitle: "Build dynamic web apps",
    description:
      "Master front-end and back-end development using modern technologies like React, Node.js, and more.",
    viewLink: "/full-stack",
    featured: false,
  },
  {
    id: "professional-cert",
    title: "Professional Certification",
    subtitle: "100% Job Guarantee",
    description:
      "Get a 100% job guarantee with our 45-day programme! Learn resume building, LinkedIn optimization, business communication, and more.",
    viewLink: "/professional",
    featured: true,
  },
];

const ProgramCard = ({ program }: { program: ProgramCategory }) => {
  return (
    <Card
      key={program.id}
      className="group hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 bg-white"
    >
      <CardContent className="p-0">
        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Badge */}
          <div className="mb-4">
            {program.featured ? (
              <Badge
                variant="default"
                className="bg-primary-50 text-white text-base border-primary-200"
              >
                Most Popular
              </Badge>
            ) : (
              <Badge
                variant="secondary"
                className="bg-primary-75 text-white text-sm border-primary-200"
              >
                New
              </Badge>
            )}
          </div>

          {/* Title */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
              {program.title}
            </h3>
            <p className="text-primary-600 font-medium inline-block px-3 py-1 bg-primary-100 rounded-full text-sm">
              {program.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-slate-600 leading-relaxed text-sm">
            {program.description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {/* <Button
              variant="default"
              className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300"
            >
              <Download size={16} />
              Brochure
            </Button> */}

            <Link href={program.viewLink}>
              <Button
                variant="outline"
                className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Programs() {
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
              Choose your{" "}
              <span className="px-2 py-1 rounded-md text-primary-80">
                area of interest
              </span>
            </h2>
          </div>

          <Link href="/courses">
            <Button
              variant="outline"
              className="border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-all duration-300"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
