"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getFeaturedCourses } from "@/data/courses";
import type { Course } from "@/data/courses";

const programCategories = getFeaturedCourses();

const ProgramCard = ({ program }: { program: Course }) => {
  const themeById: Record<string, { gradient: string; blob: string }> = {
    "ai-ml": {
      gradient: "from-violet-500 via-fuchsia-500 to-pink-500",
      blob: "from-violet-300 via-fuchsia-300 to-pink-300",
    },
    devops: {
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      blob: "from-emerald-300 via-teal-300 to-cyan-300",
    },
    "cyber-sec": {
      gradient: "from-sky-500 via-blue-500 to-indigo-500",
      blob: "from-sky-300 via-blue-300 to-indigo-300",
    },
    "data-science": {
      gradient: "from-amber-500 via-orange-500 to-rose-500",
      blob: "from-amber-300 via-orange-300 to-rose-300",
    },
    "full-stack": {
      gradient: "from-fuchsia-500 via-rose-500 to-red-500",
      blob: "from-fuchsia-300 via-rose-300 to-red-300",
    },
    "placement-accelerator": {
      gradient: "from-yellow-500 via-amber-500 to-orange-500",
      blob: "from-yellow-300 via-amber-300 to-orange-300",
    },
  };

  const theme = themeById[program.id] ?? {
    gradient: "from-slate-500 via-slate-400 to-slate-300",
    blob: "from-slate-300 via-slate-200 to-slate-100",
  };

  return (
    <Card
      key={program.id}
      className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 bg-white relative"
    >
      {/* Decorative gradient blob */}
      <div
        className={`pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-gradient-to-br ${theme.blob} opacity-30 blur-2xl`}
      />
      <CardContent className="p-0">
        {/* Top gradient bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${theme.gradient}`} />
        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
              {program.title}
            </h3>
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${theme.gradient} shadow-sm`}
            >
              <Sparkles size={14} className="opacity-90" />
              {program.subtitle}
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-600 leading-relaxed text-sm">
            {program.description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Link href={program.slug}>
              <Button
                variant="outline"
                className={`border-2 border-transparent bg-gradient-to-r ${theme.gradient} p-[1px] rounded-full`}
              >
                <span className="px-6 py-2 rounded-full bg-white text-slate-700 group-hover:bg-slate-50 transition-colors duration-300 flex items-center gap-2">
                  View Details
                </span>
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
