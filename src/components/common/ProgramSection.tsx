"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Course } from "@/data/courses";
import { getFeaturedCourses } from "@/data/courses";

const programCategories = getFeaturedCourses();

const ProgramCard = ({ program }: { program: Course }) => {
  const themeById: Record<string, { gradient: string; blob: string }> = {
    "ai-ml": {
      blob: "from-violet-300 via-fuchsia-300 to-pink-300",
      gradient: "from-violet-500 via-fuchsia-500 to-pink-500",
    },
    "cyber-sec": {
      blob: "from-sky-300 via-blue-300 to-indigo-300",
      gradient: "from-sky-500 via-blue-500 to-indigo-500",
    },
    "data-science": {
      blob: "from-amber-300 via-orange-300 to-rose-300",
      gradient: "from-amber-500 via-orange-500 to-rose-500",
    },
    devops: {
      blob: "from-emerald-300 via-teal-300 to-cyan-300",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    },
    "full-stack": {
      blob: "from-fuchsia-300 via-rose-300 to-red-300",
      gradient: "from-fuchsia-500 via-rose-500 to-red-500",
    },
    "placement-accelerator": {
      blob: "from-yellow-300 via-amber-300 to-orange-300",
      gradient: "from-yellow-500 via-amber-500 to-orange-500",
    },
  };

  const theme = themeById[program.id] ?? {
    blob: "from-slate-300 via-slate-200 to-slate-100",
    gradient: "from-slate-500 via-slate-400 to-slate-300",
  };

  return (
    <Card
      className="group relative overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:shadow-2xl"
      key={program.id}
    >
      {/* Decorative gradient blob */}
      <div
        className={`pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-linear-to-br ${theme.blob} opacity-30 blur-2xl`}
      />
      <CardContent className="p-0">
        {/* Top gradient bar */}
        <div className={`h-1 w-full bg-linear-to-r ${theme.gradient}`} />
        {/* Content */}
        <div className="space-y-4 p-6">
          {/* Title */}
          <div>
            <h3 className="mb-2 font-bold text-slate-900 text-xl leading-tight">
              {program.title}
            </h3>
            <span
              className={`inline-flex items-center gap-1 rounded-full bg-linear-to-r px-3 py-1 font-medium text-sm text-white ${theme.gradient} shadow-xs`}
            >
              <Sparkles className="opacity-90" size={14} />
              {program.subtitle}
            </span>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-sm leading-relaxed">
            {program.description}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Link href={program.slug}>
              <Button
                className={`border-2 border-transparent bg-linear-to-r ${theme.gradient} rounded-full p-px`}
                variant="outline"
              >
                <span className="flex items-center gap-2 rounded-full bg-white px-6 py-2 text-slate-700 transition-colors duration-300 group-hover:bg-slate-50">
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
    <section className="relative bg-linear-to-b from-white to-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 sm:flex-row md:mb-16">
          <div className="text-center sm:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 font-medium text-primary-600 text-sm">
              <Sparkles className="text-primary-600" size={16} />
              Featured Programs
            </div>
            <h2 className="font-bold text-3xl text-slate-900 md:text-4xl lg:text-5xl">
              Choose your{" "}
              <span className="rounded-md px-2 py-1 text-primary-80">
                area of interest
              </span>
            </h2>
          </div>

          <Link href="/courses">
            <Button
              className="flex items-center gap-2 rounded-lg border-2 border-primary-500 px-6 py-2 text-primary-600 transition-all duration-300 hover:bg-primary-50 hover:text-white"
              variant="outline"
            >
              View All Programs
              <ArrowRight
                className="transition-transform duration-300 group-hover:translate-x-1"
                size={18}
              />
            </Button>
          </Link>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programCategories.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>

        {/* Empty State */}
        {programCategories.length === 0 && (
          <div className="rounded-lg bg-slate-50 py-12 text-center">
            <p className="text-slate-600">
              No programs available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
