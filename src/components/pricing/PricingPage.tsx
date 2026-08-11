"use client";

import { gsap } from "gsap";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/data/courses";
import { prefersReducedMotion } from "@/lib/utils";

export interface PricingCourse {
  _id: string;
  category: string;
  duration: string | null;
  emiOption: string | null;
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

const CARD_TINTS = [
  "bg-primary-99",
  "bg-gold-90",
  "bg-white",
  "bg-primary-90",
  "bg-light-95",
  "bg-primary-95",
] as const;

function formatInr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function PricingCard({
  course,
  index,
  cardRef,
}: {
  cardRef: (el: HTMLDivElement | null) => void;
  course: PricingCourse;
  index: number;
}) {
  const originalPrice = course.originalPrice ?? 0;
  const hasDiscount = originalPrice > course.price;
  const discountPct = hasDiscount
    ? Math.round(((originalPrice - course.price) / originalPrice) * 100)
    : 0;
  const category = CATEGORIES.find((c) => c.id === course.category);
  const CategoryIcon = category?.icon ?? Sparkles;
  const tint = CARD_TINTS[index % CARD_TINTS.length];

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 border-grey-15 bg-white shadow-[4px_4px_0_0_var(--color-grey-15)] transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-grey-15)]"
      ref={cardRef}
    >
      {course.featured && (
        <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-1 rounded-full border-2 border-grey-15 bg-gold px-3 py-1 font-bold text-grey-15 text-xs">
          <Sparkles className="h-3 w-3" />
          Popular
        </span>
      )}

      <div
        className={`flex items-center gap-3 border-grey-15 border-b-2 p-6 ${tint}`}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-white">
          <CategoryIcon className="h-5 w-5 text-grey-15" />
        </div>
        <div className="min-w-0">
          {category && (
            <p className="font-bold text-grey-40 text-xs uppercase tracking-wider">
              {category.label}
            </p>
          )}
          <h3 className="truncate font-bold font-vietnam text-grey-15 text-lg">
            {course.title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {course.subtitle && (
          <p className="mb-4 text-grey-40 text-sm">{course.subtitle}</p>
        )}

        {course.isJobGuaranteeProgram && (
          <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-grey-15 bg-primary-90 px-3 py-1 font-bold text-grey-15 text-xs">
            <Check className="h-3 w-3" />
            Job Guarantee Program
          </span>
        )}

        <div className="mb-5">
          <div className="flex items-baseline gap-2">
            <span className="font-black font-vietnam text-3xl text-grey-15 tabular-nums">
              {formatInr(course.price)}
            </span>
            {hasDiscount && (
              <span className="text-grey-50 text-sm tabular-nums line-through">
                {formatInr(originalPrice)}
              </span>
            )}
          </div>
          {hasDiscount && (
            <p className="mt-1 font-bold text-primary-40 text-xs">
              Save {discountPct}% • {formatInr(originalPrice - course.price)}{" "}
              off
            </p>
          )}
          {course.emiOption && (
            <p className="mt-2 text-grey-40 text-xs">
              EMI from{" "}
              <span className="font-bold text-grey-15">{course.emiOption}</span>
            </p>
          )}
        </div>

        {course.whatsIncluded && course.whatsIncluded.length > 0 && (
          <ul className="mb-6 flex-1 space-y-2.5">
            {course.whatsIncluded.slice(0, 5).map((item) => (
              <li className="flex items-start gap-2" key={item}>
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-grey-15" />
                <span className="text-grey-35 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        )}

        <Button
          asChild
          className="mt-auto w-full rounded-full border-2 border-grey-15 bg-white font-bold text-grey-15 shadow-none hover:bg-primary-99"
        >
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
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredCourses = useMemo(
    () =>
      activeFilter === "all"
        ? courses
        : courses.filter((c) => c.category === activeFilter),
    [courses, activeFilter]
  );

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || prefersReducedMotion()) {
      return;
    }
    const targets = hero.querySelectorAll("[data-reveal]");
    gsap.fromTo(
      targets,
      { opacity: 0, y: 20 },
      { duration: 0.6, ease: "power2.out", opacity: 1, stagger: 0.1, y: 0 }
    );
  }, []);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length || prefersReducedMotion()) {
      return;
    }
    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      { duration: 0.5, ease: "power2.out", opacity: 1, stagger: 0.08, y: 0 }
    );
    return () => {
      tween.kill();
    };
  }, [filteredCourses]);

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-light-97 py-16 sm:py-20 lg:py-24" ref={heroRef}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-semibold text-grey-15 text-sm sm:mb-8"
              data-reveal
            >
              <Sparkles className="h-4 w-4" />
              Transparent Pricing
            </div>

            <h1
              className="mb-4 font-black font-vietnam text-3xl text-grey-15 tracking-tight sm:mb-6 sm:text-4xl md:text-5xl"
              data-reveal
            >
              Simple, Upfront Program Pricing
            </h1>

            <p
              className="mx-auto max-w-2xl px-2 text-base text-grey-40 leading-relaxed sm:text-lg"
              data-reveal
            >
              No hidden fees. Compare every program at a glance and pick the
              path that fits your career goals and budget.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container">
          <div className="mb-8 sm:mb-12">
            <div className="scrollbar-hide -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
              {FILTER_TABS.map((tab) => (
                <button
                  className={`shrink-0 whitespace-nowrap rounded-full border-2 border-grey-15 px-4 py-2 font-bold text-sm transition-colors duration-200 sm:px-6 sm:py-2.5 ${
                    activeFilter === tab.value
                      ? "bg-primary-75 text-grey-15"
                      : "bg-white text-grey-35 hover:bg-primary-99"
                  }`}
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course, index) => (
                <PricingCard
                  cardRef={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  course={course}
                  index={index}
                  key={course._id}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-grey-40 text-lg">
                No programs found for this category.
              </p>
              <button
                className="mt-4 font-bold text-grey-15 hover:underline"
                onClick={() => setActiveFilter("all")}
                type="button"
              >
                View all programs
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl border-2 border-grey-15 bg-grey-15 px-6 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="font-black font-vietnam text-2xl text-white sm:text-3xl">
              Not sure which program fits you?
            </h2>
            <p className="max-w-xl text-white/70">
              Talk to a career counselor - free consultation, no commitment.
            </p>
            <Button
              asChild
              className="rounded-full border-2 border-grey-15 bg-primary-75 px-8 font-bold text-grey-15 shadow-none hover:bg-primary-90"
              size="lg"
            >
              <Link href="/contact">Talk to a Counselor</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
