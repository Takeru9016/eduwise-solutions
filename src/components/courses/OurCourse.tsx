"use client";

import { gsap } from "gsap";
import {
  ArrowRight,
  Award,
  BookCheck,
  Building,
  CheckCircle,
  Clock,
  Compass,
  GraduationCap,
  HeartHandshake,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { CATEGORIES } from "@/data/courses";

// Types
export interface SanityCourseListItem {
  _id: string;
  category: string;
  duration: string | null;
  featured: boolean;
  heroImageUrl: string | null;
  originalPrice: number | null;
  price: number | null;
  slug: { current: string };
  subtitle: string | null;
  title: string;
}

export interface FilterTab {
  label: string;
  value: string;
}

interface OurCourseProps {
  courses: SanityCourseListItem[];
}

// Data
const heroStats = [
  { icon: Users, label: "Students", value: "2000+" },
  { icon: Award, label: "Placements", value: "100%" },
  { icon: Building, label: "Hiring Partners", value: "250+" },
] as const;

const CARD_TINTS = [
  "bg-primary-99",
  "bg-gold-90",
  "bg-white",
  "bg-primary-90",
  "bg-light-95",
  "bg-primary-95",
] as const;

// Sub-Components

function FilterTabs({
  activeFilter,
  onFilterChange,
  tabs,
}: {
  activeFilter: string;
  onFilterChange: (value: string) => void;
  tabs: FilterTab[];
}) {
  return (
    <div className="scrollbar-hide -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
      {tabs.map((tab) => (
        <button
          className={`shrink-0 whitespace-nowrap rounded-full border-2 border-grey-15 px-4 py-2 font-bold text-sm transition-all duration-200 sm:px-6 sm:py-2.5 ${
            activeFilter === tab.value
              ? "bg-primary-75 text-grey-15"
              : "bg-white text-grey-35 hover:bg-primary-99"
          }`}
          key={tab.value}
          onClick={() => onFilterChange(tab.value)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function CourseCard({
  course,
  index,
  cardRef,
}: {
  course: SanityCourseListItem;
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const imageUrl = course.heroImageUrl ?? "/courses/placeholder.png";
  const subtitle = course.subtitle ?? "Industry-ready program";
  const duration = course.duration ?? "Flexible";
  const courseSlug = `/courses/${course.slug.current}`;
  const tint = CARD_TINTS[index % CARD_TINTS.length];

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-3xl border-2 border-grey-15 bg-white shadow-[4px_4px_0_0_var(--color-grey-15)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-grey-15)]"
      ref={cardRef}
    >
      {/* Image Section */}
      <div className="relative h-44 w-full border-grey-15 border-b-2 sm:h-52">
        <Image
          alt={course.title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={imageUrl}
        />
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-grey-15 bg-white px-3 py-1.5 font-bold text-grey-15 text-xs">
            <BookCheck className="h-3 w-3" />
            {subtitle}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${tint}`}>
        <h3 className="mb-3 font-bold font-vietnam text-grey-15 text-lg sm:text-xl">
          {course.title}
        </h3>

        {/* Quick stats */}
        <div className="mb-5 flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 rounded-full border-2 border-grey-15 bg-white px-2.5 py-1.5 text-xs sm:text-sm">
            <Clock className="h-3.5 w-3.5 shrink-0 text-grey-15" />
            <span className="font-semibold text-grey-15">{duration}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border-2 border-grey-15 bg-white px-2.5 py-1.5 text-xs sm:text-sm">
            <CheckCircle className="h-3.5 w-3.5 shrink-0 text-grey-15" />
            <span className="font-semibold text-grey-15">100% Live</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border-2 border-grey-15 bg-white px-2.5 py-1.5 text-xs sm:text-sm">
            <Award className="h-3.5 w-3.5 shrink-0 text-grey-15" />
            <span className="font-semibold text-grey-15">100% Placement</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          className="group/btn mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-white py-3 font-bold text-grey-15 transition-transform hover:-translate-y-0.5"
          href={courseSlug}
        >
          View Program Details
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

function BottomCTA() {
  const trustPoints = [
    { icon: ShieldCheck, label: "Free Consultation" },
    { icon: HeartHandshake, label: "No Commitment" },
    { icon: Sparkles, label: "Personalized Guidance" },
  ];

  return (
    <section className="bg-light-97 py-12 sm:py-16 lg:py-20">
      <div className="container">
        <div className="rounded-3xl border-2 border-grey-15 bg-primary-75 p-6 shadow-[8px_8px_0_0_var(--color-grey-15)] sm:p-10 lg:p-14">
          <div className="grid items-center gap-8 lg:grid-cols-5 lg:gap-12">
            {/* Left content — takes 3 cols */}
            <div className="text-center lg:col-span-3 lg:text-left">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-4 py-2 font-semibold text-grey-15 text-xs sm:text-sm">
                <Compass className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Need Help Choosing?
              </div>

              <h2 className="mb-3 font-black font-vietnam text-2xl text-grey-15 leading-tight sm:mb-4 sm:text-3xl lg:text-4xl">
                Not sure which program is right for you?
              </h2>

              <p className="mx-auto mb-6 max-w-lg text-grey-20 text-sm leading-relaxed sm:mb-8 sm:text-base lg:mx-0 lg:text-lg">
                Our career counselors will understand your background, goals,
                and interests to recommend the perfect learning path for you.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full border-2 border-grey-15 bg-grey-15 px-6 py-3.5 font-bold text-sm text-white transition-transform hover:-translate-y-0.5 sm:w-auto sm:px-8 sm:text-base"
                  href="/contact"
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                  Talk to Our Counselor
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 sm:h-5 sm:w-5" />
                </Link>
                <span className="text-grey-20 text-xs sm:text-sm">
                  Response within 24 hours
                </span>
              </div>
            </div>

            {/* Right side — stat highlights + trust badges */}
            <div className="space-y-4 sm:space-y-5 lg:col-span-2">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-2xl border-2 border-grey-15 bg-white p-4 text-center sm:p-5">
                  <p className="mb-1 font-black font-vietnam text-2xl text-grey-15 sm:text-3xl">
                    6K+
                  </p>
                  <p className="text-grey-40 text-xs sm:text-sm">
                    Students Counseled
                  </p>
                </div>
                <div className="rounded-2xl border-2 border-grey-15 bg-white p-4 text-center sm:p-5">
                  <p className="mb-1 font-black font-vietnam text-2xl text-grey-15 sm:text-3xl">
                    95%
                  </p>
                  <p className="text-grey-40 text-xs sm:text-sm">
                    Satisfaction Rate
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                {trustPoints.map((point) => {
                  const TrustIcon = point.icon;
                  return (
                    <div
                      className="flex items-center gap-3 rounded-full border-2 border-grey-15 bg-white px-4 py-3"
                      key={point.label}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-99 sm:h-9 sm:w-9">
                        <TrustIcon className="h-4 w-4 text-grey-15 sm:h-4.5 sm:w-4.5" />
                      </div>
                      <span className="font-semibold text-grey-15 text-sm sm:text-base">
                        {point.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Component

export default function CoursesPage({ courses }: OurCourseProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeFilter, setActiveFilter] = useState(categoryParam ?? "all");

  const heroRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Build filter tabs from actual Sanity data
  const filterTabs = useMemo<FilterTab[]>(() => {
    const categoriesInData = new Set(courses.map((c) => c.category));
    return [
      { label: "All Programs", value: "all" },
      ...CATEGORIES.filter((cat) => categoriesInData.has(cat.id)).map(
        (cat) => ({ label: cat.label, value: cat.id })
      ),
    ];
  }, [courses]);

  const filteredCourses = useMemo(
    () =>
      activeFilter === "all"
        ? courses
        : courses.filter((c) => c.category === activeFilter),
    [activeFilter, courses]
  );

  const totalPrograms = courses.length;

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) {
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
    if (!cards.length) {
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
      {/* Hero Section */}
      <section className="bg-light-97 py-16 sm:py-20 lg:py-24" ref={heroRef}>
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-semibold text-grey-15 text-sm sm:mb-8"
              data-reveal
            >
              <Sparkles className="h-4 w-4" />
              Your Career, Your Choice
            </div>

            <h1
              className="mb-4 font-black font-vietnam text-3xl text-grey-15 tracking-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
              data-reveal
            >
              Explore Our Programs
            </h1>

            <p
              className="mx-auto mb-8 max-w-2xl px-2 text-base text-grey-40 leading-relaxed sm:mb-10 sm:text-lg lg:text-xl"
              data-reveal
            >
              Comprehensive, industry-aligned programs designed to help you
              master new skills, advance your career, and achieve your goals
              with 100% placement assurance.
            </p>

            <div
              className="flex flex-wrap justify-center gap-3 sm:gap-4"
              data-reveal
            >
              <div className="flex items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-3 py-2 sm:gap-3 sm:px-5 sm:py-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-99 sm:h-10 sm:w-10">
                  <GraduationCap className="h-4 w-4 text-grey-15 sm:h-5 sm:w-5" />
                </div>
                <div className="text-left">
                  <p className="font-bold font-vietnam text-grey-15 text-sm leading-tight sm:text-base">
                    {totalPrograms}+
                  </p>
                  <p className="text-[10px] text-grey-40 leading-tight sm:text-xs">
                    Programs
                  </p>
                </div>
              </div>
              {heroStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    className="flex items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-3 py-2 sm:gap-3 sm:px-5 sm:py-3"
                    key={stat.label}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-99 sm:h-10 sm:w-10">
                      <Icon className="h-4 w-4 text-grey-15 sm:h-5 sm:w-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold font-vietnam text-grey-15 text-sm leading-tight sm:text-base">
                        {stat.value}
                      </p>
                      <p className="text-[10px] text-grey-40 leading-tight sm:text-xs">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container">
          <div className="mb-8 sm:mb-12">
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              tabs={filterTabs}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course, index) => (
              <CourseCard
                cardRef={(el) => {
                  cardRefs.current[index] = el;
                }}
                course={course}
                index={index}
                key={course._id}
              />
            ))}
          </div>

          {filteredCourses.length === 0 && (
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

      {/* Bottom CTA */}
      <BottomCTA />
    </main>
  );
}
