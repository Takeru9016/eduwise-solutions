"use client";

import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/data/courses";

export interface PricingCourse {
  _id: string;
  category: string;
  duration: string | null;
  emiOption: string | null;
  emoji: string | null;
  featured: boolean;
  isJobGuaranteeProgram: boolean | null;
  originalPrice: number | null;
  price: number;
  slug: { current: string };
  subtitle: string | null;
  title: string;
  whatsIncluded: string[] | null;
}

interface PricingPageProps {
  courses: PricingCourse[];
}

const FILTER_TABS = [
  { label: "All Programs", value: "all" },
  ...CATEGORIES.map((c) => ({ label: c.label, value: c.id })),
];

function formatInr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function PricingCard({ course }: { course: PricingCourse }) {
  const originalPrice = course.originalPrice ?? 0;
  const hasDiscount = originalPrice > course.price;
  const discountPct = hasDiscount
    ? Math.round(((originalPrice - course.price) / originalPrice) * 100)
    : 0;
  const category = CATEGORIES.find((c) => c.id === course.category);

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-light-90 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary-90 hover:shadow-2xl sm:rounded-3xl">
      {course.featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="gap-1 bg-linear-to-r from-primary-75 to-primary-90 text-white">
            <Sparkles className="h-3 w-3" />
            Popular
          </Badge>
        </div>
      )}

      <div className="border-light-90 border-b bg-light-97 p-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-2xl">{course.emoji}</span>
          {category && (
            <span className="text-grey-40 text-xs uppercase tracking-wider">
              {category.label}
            </span>
          )}
        </div>
        <h3 className="mb-1 font-bold font-vietnam text-grey-15 text-xl">
          {course.title}
        </h3>
        {course.subtitle && (
          <p className="text-grey-40 text-sm">{course.subtitle}</p>
        )}
        {course.isJobGuaranteeProgram && (
          <Badge className="mt-3" variant="secondary">
            Job Guarantee Program
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold font-vietnam text-3xl text-grey-15">
              {formatInr(course.price)}
            </span>
            {hasDiscount && (
              <span className="text-grey-50 text-sm line-through">
                {formatInr(originalPrice)}
              </span>
            )}
          </div>
          {hasDiscount && (
            <p className="mt-1 font-semibold text-emerald-600 text-xs">
              Save {discountPct}% • {formatInr(originalPrice - course.price)}{" "}
              off
            </p>
          )}
          {course.emiOption && (
            <p className="mt-2 text-grey-40 text-xs">
              EMI from{" "}
              <span className="font-semibold text-primary-75">
                {course.emiOption}
              </span>
            </p>
          )}
        </div>

        {course.whatsIncluded && course.whatsIncluded.length > 0 && (
          <ul className="mb-6 flex-1 space-y-2.5">
            {course.whatsIncluded.slice(0, 5).map((item) => (
              <li className="flex items-start gap-2" key={item}>
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-75" />
                <span className="text-grey-35 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        )}

        <Button asChild className="mt-auto w-full">
          <Link href={`/courses/${course.slug.current}`}>
            View Program & Enroll
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function PricingPage({ courses }: PricingPageProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCourses = useMemo(
    () =>
      activeFilter === "all"
        ? courses
        : courses.filter((c) => c.category === activeFilter),
    [courses, activeFilter]
  );

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-linear-to-b from-primary-99 to-white px-4 py-16 sm:py-20">
        <div className="container relative z-10 mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            Transparent Pricing
          </Badge>
          <h1 className="mb-4 font-bold font-vietnam text-4xl text-grey-15 leading-tight sm:text-5xl">
            Simple, Upfront{" "}
            <span className="bg-linear-to-r from-primary-75 to-primary-90 bg-clip-text text-transparent">
              Program Pricing
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-grey-40 text-lg">
            No hidden fees. Compare every program at a glance and pick the path
            that fits your career goals and budget.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="container mx-auto">
          <div className="scrollbar-hide -mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-3 sm:px-0">
            {FILTER_TABS.map((tab) => (
              <button
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 font-semibold text-sm transition-all duration-300 sm:px-6 sm:py-2.5 ${
                  activeFilter === tab.value
                    ? "bg-linear-to-r from-primary-75 to-primary-90 text-white shadow-lg shadow-primary-75/25"
                    : "border border-grey-70 bg-white/80 text-grey-35 hover:border-primary-90 hover:bg-primary-99 hover:text-primary-75"
                }`}
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <PricingCard course={course} key={course._id} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-grey-40 text-lg">
                No programs found for this category.
              </p>
              <button
                className="mt-4 font-semibold text-primary-75 hover:underline"
                onClick={() => setActiveFilter("all")}
                type="button"
              >
                View all programs
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-light-97 px-4 py-16">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-bold font-vietnam text-2xl text-grey-15 sm:text-3xl">
            Not sure which program fits you?
          </h2>
          <p className="mb-6 text-grey-40">
            Talk to a career counselor — free consultation, no commitment.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Talk to a Counselor</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
