"use client";

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
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
];

// Sub-Components

function HeroStatPill({
  stat,
  index,
}: {
  stat: (typeof heroStats)[0];
  index: number;
}) {
  const Icon = stat.icon;
  return (
    <div
      className="flex items-center gap-2 rounded-full border border-white/40 bg-white/90 px-3 py-2 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl sm:gap-3 sm:px-5 sm:py-3"
      style={{
        animation: `fadeInUp 0.6s ease-out ${0.8 + index * 0.15}s forwards`,
      }}
    >
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-90 to-primary-75 sm:h-10 sm:w-10">
        <Icon className="h-4 w-4 text-white sm:h-5 sm:w-5" />
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
}

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
    <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-3 sm:px-0">
      {tabs.map((tab) => (
        <button
          className={`flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 font-semibold text-sm transition-all duration-300 sm:px-6 sm:py-2.5 ${
            activeFilter === tab.value
              ? "bg-gradient-to-r from-primary-75 to-primary-90 text-white shadow-lg shadow-primary-75/25"
              : "border border-grey-70 bg-white/80 text-grey-35 hover:border-primary-90 hover:bg-primary-99 hover:text-primary-75"
          }`}
          key={tab.value}
          onClick={() => onFilterChange(tab.value)}
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
}: {
  course: SanityCourseListItem;
  index: number;
}) {
  const imageUrl = course.heroImageUrl ?? "/courses/placeholder.png";
  const subtitle = course.subtitle ?? "Industry-ready program";
  const duration = course.duration ?? "Flexible";
  const courseSlug = `/courses/${course.slug.current}`;

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-2xl border border-light-90 bg-white opacity-0 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-primary-90 hover:shadow-2xl sm:rounded-3xl"
      style={{
        animation: `fadeInUp 0.6s ease-out ${0.1 + index * 0.1}s forwards`,
      }}
    >
      {/* Image Section */}
      <div className="relative h-44 overflow-hidden sm:h-52">
        <Image
          alt={course.title}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={imageUrl}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Accent tag on image */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-primary-75 to-primary-90 px-3 py-1.5 font-bold text-white text-xs shadow-lg backdrop-blur-sm">
            <BookCheck className="h-3 w-3" />
            {subtitle}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Title */}
        <h3 className="mb-2 font-bold font-vietnam text-grey-15 text-lg transition-colors duration-300 group-hover:text-primary-75 sm:text-xl">
          {course.title}
        </h3>

        {/* Quick stats */}
        <div className="mb-5 flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 rounded-lg bg-primary-99 px-2.5 py-1.5 text-xs sm:text-sm">
            <Clock className="h-3.5 w-3.5 flex-shrink-0 text-primary-75" />
            <span className="font-semibold text-grey-15">{duration}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-primary-99 px-2.5 py-1.5 text-xs sm:text-sm">
            <CheckCircle className="h-3.5 w-3.5 flex-shrink-0 text-primary-75" />
            <span className="font-semibold text-grey-15">100%</span>
            <span className="xs:inline hidden text-grey-40">Live</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-primary-99 px-2.5 py-1.5 text-xs sm:text-sm">
            <Award className="h-3.5 w-3.5 flex-shrink-0 text-primary-75" />
            <span className="font-semibold text-grey-15">100%</span>
            <span className="xs:inline hidden text-grey-40">Placement</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          asChild
          className="group/btn mt-auto w-full rounded-xl border-primary-90 text-primary-75 transition-all duration-300 hover:border-primary-75 hover:bg-primary-99"
          variant="outline"
        >
          <Link
            className="flex items-center justify-center gap-2 py-5"
            href={courseSlug}
          >
            View Program Details
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </Button>
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
    <section className="bg-gradient-to-b from-white to-slate-50 py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl sm:rounded-3xl">
          {/* Dark gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-grey-10 via-grey-15 to-grey-20" />

          {/* Decorative elements */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gradient-to-br from-primary-75/20 to-transparent blur-3xl sm:h-80 sm:w-80" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gradient-to-tr from-primary-90/15 to-transparent blur-3xl sm:h-64 sm:w-64" />
            <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-75/5 blur-3xl" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 lg:p-14">
            <div className="grid items-center gap-8 lg:grid-cols-5 lg:gap-12">
              {/* Left content — takes 3 cols */}
              <div className="text-center lg:col-span-3 lg:text-left">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary-75/30 bg-primary-75/20 px-4 py-2 font-semibold text-primary-90 text-xs backdrop-blur-sm sm:text-sm">
                  <Compass className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Need Help Choosing?
                </div>

                <h2 className="mb-3 font-bold font-vietnam text-2xl text-white leading-tight sm:mb-4 sm:text-3xl lg:text-4xl">
                  Not sure which program{" "}
                  <span className="bg-gradient-to-r from-primary-90 to-primary-75 bg-clip-text text-transparent">
                    is right for you?
                  </span>
                </h2>

                <p className="mx-auto mb-6 max-w-lg text-grey-60 text-sm leading-relaxed sm:mb-8 sm:text-base lg:mx-0 lg:text-lg">
                  Our career counselors will understand your background, goals,
                  and interests to recommend the perfect learning path for you.
                </p>

                {/* CTA button */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                  <Button
                    asChild
                    className="w-full rounded-xl bg-gradient-to-r from-primary-75 to-primary-90 px-6 py-5 font-bold text-sm text-white shadow-lg shadow-primary-75/25 transition-all duration-300 hover:scale-105 hover:from-primary-70 hover:to-primary-80 hover:shadow-primary-75/30 hover:shadow-xl sm:w-auto sm:px-8 sm:py-6 sm:text-base"
                  >
                    <Link
                      className="flex items-center justify-center gap-2.5"
                      href="/contact"
                    >
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                      Talk to Our Counselor
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                  </Button>

                  <span className="text-grey-60 text-xs sm:text-sm">
                    Response within 24 hours
                  </span>
                </div>
              </div>

              {/* Right side — takes 2 cols: stat highlights + trust badges */}
              <div className="space-y-4 sm:space-y-5 lg:col-span-2">
                {/* Stats highlight cards */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/10 sm:rounded-2xl sm:p-5">
                    <p className="mb-1 font-bold font-vietnam text-2xl text-primary-90 sm:text-3xl">
                      6K+
                    </p>
                    <p className="text-grey-60 text-xs sm:text-sm">
                      Students Counseled
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/10 sm:rounded-2xl sm:p-5">
                    <p className="mb-1 font-bold font-vietnam text-2xl text-primary-90 sm:text-3xl">
                      95%
                    </p>
                    <p className="text-grey-60 text-xs sm:text-sm">
                      Satisfaction Rate
                    </p>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="space-y-2.5 sm:space-y-3">
                  {trustPoints.map((point, i) => {
                    const TrustIcon = point.icon;
                    return (
                      <div
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                        key={i}
                      >
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-75/20 sm:h-9 sm:w-9">
                          <TrustIcon className="h-4 w-4 text-primary-90 sm:h-[18px] sm:w-[18px]" />
                        </div>
                        <span className="font-medium text-sm text-white/80 sm:text-base">
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
      </div>
    </section>
  );
}

// Main Component

export default function CoursesPage({ courses }: OurCourseProps) {
  const [activeFilter, setActiveFilter] = useState("all");

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

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-99 via-white to-primary-97 py-16 sm:py-20 lg:py-28">
        {/* Animated background orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 h-48 w-48 animate-pulse rounded-full bg-gradient-to-br from-primary-90/40 to-transparent blur-3xl sm:h-72 sm:w-72 lg:h-96 lg:w-96" />
          <div
            className="absolute right-1/4 bottom-0 h-40 w-40 animate-pulse rounded-full bg-gradient-to-tl from-primary-95/50 to-transparent blur-2xl sm:h-64 sm:w-64 lg:h-80 lg:w-80"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-primary-97 to-primary-95 blur-xl sm:h-48 sm:w-48 lg:h-64 lg:w-64"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div
              className="opacity-0"
              style={{ animation: "fadeInDown 0.6s ease-out 0.1s forwards" }}
            >
              <Badge
                className="mb-6 border border-primary-95/50 bg-white/90 px-4 py-2 font-semibold text-primary-75 text-sm shadow-lg backdrop-blur-sm transition-all hover:shadow-xl sm:mb-8"
                variant="secondary"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Your Career, Your Choice
              </Badge>
            </div>

            {/* Heading */}
            <h1
              className="mb-4 font-bold font-vietnam text-3xl text-grey-15 leading-tight opacity-0 sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ animation: "fadeInUp 0.8s ease-out 0.3s forwards" }}
            >
              Explore Our{" "}
              <span className="bg-gradient-to-r from-primary-75 to-primary-90 bg-clip-text text-transparent">
                Programs
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="mx-auto mb-8 max-w-2xl px-2 text-base text-grey-35 leading-relaxed opacity-0 sm:mb-10 sm:text-lg lg:text-xl"
              style={{ animation: "fadeInUp 0.8s ease-out 0.5s forwards" }}
            >
              Comprehensive, industry-aligned programs designed to help you
              master new skills, advance your career, and achieve your goals
              with 100% placement assurance.
            </p>

            {/* Hero stat pills */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <div
                className="flex items-center gap-2 rounded-full border border-white/40 bg-white/90 px-3 py-2 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl sm:gap-3 sm:px-5 sm:py-3"
                style={{ animation: "fadeInUp 0.6s ease-out 0.65s forwards" }}
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-90 to-primary-75 sm:h-10 sm:w-10">
                  <GraduationCap className="h-4 w-4 text-white sm:h-5 sm:w-5" />
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
              {heroStats.map((stat, i) => (
                <HeroStatPill index={i} key={i} stat={stat} />
              ))}
            </div>

            {/* Decorative separator */}
            <div
              className="mt-10 flex items-center justify-center gap-3 opacity-0 sm:mt-14"
              style={{ animation: "fadeInUp 0.6s ease-out 1.5s forwards" }}
            >
              <div className="h-1 w-12 rounded-full bg-gradient-to-r from-transparent to-primary-75 sm:w-16" />
              <div className="h-2 w-2 rounded-full bg-primary-75" />
              <div className="h-1 w-20 rounded-full bg-gradient-to-r from-primary-75 via-primary-90 to-primary-75 sm:w-24" />
              <div className="h-2 w-2 rounded-full bg-primary-75" />
              <div className="h-1 w-12 rounded-full bg-gradient-to-l from-transparent to-primary-75 sm:w-16" />
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Filter Tabs */}
          <div className="mb-8 sm:mb-12">
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              tabs={filterTabs}
            />
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course, index) => (
              <CourseCard course={course} index={index} key={course._id} />
            ))}
          </div>

          {/* Empty state */}
          {filteredCourses.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-grey-40 text-lg">
                No programs found for this category.
              </p>
              <button
                className="mt-4 font-semibold text-primary-75 hover:underline"
                onClick={() => setActiveFilter("all")}
              >
                View all programs
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <BottomCTA />

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
