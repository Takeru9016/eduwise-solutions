"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  GraduationCap,
  Users,
  Award,
  Building,
  Phone,
  ShieldCheck,
  HeartHandshake,
  Compass,
  Clock,
  CheckCircle,
  BookCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/data/courses";

// Types
export interface SanityCourseListItem {
  _id: string;
  title: string;
  subtitle: string | null;
  slug: { current: string };
  category: string;
  heroImageUrl: string | null;
  duration: string | null;
  price: number | null;
  originalPrice: number | null;
  featured: boolean;
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
  { value: "2000+", label: "Students", icon: Users },
  { value: "100%", label: "Placements", icon: Award },
  { value: "250+", label: "Hiring Partners", icon: Building },
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
      className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-md px-3 py-2 sm:px-5 sm:py-3 rounded-full shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 hover:scale-105 opacity-0"
      style={{
        animation: `fadeInUp 0.6s ease-out ${0.8 + index * 0.15}s forwards`,
      }}
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-90 to-primary-75 rounded-full flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
      <div className="text-left">
        <p className="font-vietnam font-bold text-grey-15 text-sm sm:text-base leading-tight">
          {stat.value}
        </p>
        <p className="text-grey-40 text-[10px] sm:text-xs leading-tight">
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
    <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onFilterChange(tab.value)}
          className={`whitespace-nowrap px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex-shrink-0 ${
            activeFilter === tab.value ?
              "bg-gradient-to-r from-primary-75 to-primary-90 text-white shadow-lg shadow-primary-75/25"
            : "bg-white/80 text-grey-35 border border-grey-70 hover:border-primary-90 hover:text-primary-75 hover:bg-primary-99"
          }`}
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
      className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-light-90 hover:border-primary-90 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col opacity-0"
      style={{
        animation: `fadeInUp 0.6s ease-out ${0.1 + index * 0.1}s forwards`,
      }}
    >
      {/* Image Section */}
      <div className="relative h-44 sm:h-52 overflow-hidden">
        <Image
          src={imageUrl}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Accent tag on image */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary-75 to-primary-90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
            <BookCheck className="w-3 h-3" />
            {subtitle}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-vietnam font-bold text-grey-15 mb-2 group-hover:text-primary-75 transition-colors duration-300">
          {course.title}
        </h3>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-2 mb-5">
          <div className="flex items-center gap-1.5 bg-primary-99 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm">
            <Clock className="w-3.5 h-3.5 text-primary-75 flex-shrink-0" />
            <span className="font-semibold text-grey-15">{duration}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-primary-99 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm">
            <CheckCircle className="w-3.5 h-3.5 text-primary-75 flex-shrink-0" />
            <span className="font-semibold text-grey-15">100%</span>
            <span className="text-grey-40 hidden xs:inline">Live</span>
          </div>
          <div className="flex items-center gap-1.5 bg-primary-99 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm">
            <Award className="w-3.5 h-3.5 text-primary-75 flex-shrink-0" />
            <span className="font-semibold text-grey-15">100%</span>
            <span className="text-grey-40 hidden xs:inline">Placement</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          asChild
          variant="outline"
          className="w-full rounded-xl border-primary-90 text-primary-75 hover:bg-primary-99 hover:border-primary-75 transition-all duration-300 group/btn mt-auto"
        >
          <Link
            href={courseSlug}
            className="flex items-center justify-center gap-2 py-5"
          >
            View Program Details
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
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
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          {/* Dark gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-grey-10 via-grey-15 to-grey-20" />

          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-primary-75/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-tr from-primary-90/15 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary-75/5 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 p-6 sm:p-10 lg:p-14">
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              {/* Left content — takes 3 cols */}
              <div className="lg:col-span-3 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-primary-75/20 backdrop-blur-sm text-primary-90 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-5 border border-primary-75/30">
                  <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Need Help Choosing?
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-vietnam font-bold text-white mb-3 sm:mb-4 leading-tight">
                  Not sure which program{" "}
                  <span className="bg-gradient-to-r from-primary-90 to-primary-75 bg-clip-text text-transparent">
                    is right for you?
                  </span>
                </h2>

                <p className="text-grey-60 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Our career counselors will understand your background, goals,
                  and interests to recommend the perfect learning path for you.
                </p>

                {/* CTA button */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-primary-75 to-primary-90 hover:from-primary-70 hover:to-primary-80 text-white font-bold text-sm sm:text-base px-6 py-5 sm:px-8 sm:py-6 rounded-xl shadow-lg shadow-primary-75/25 hover:shadow-xl hover:shadow-primary-75/30 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                  >
                    <Link
                      href="/contact"
                      className="flex items-center justify-center gap-2.5"
                    >
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                      Talk to Our Counselor
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                  </Button>

                  <span className="text-grey-60 text-xs sm:text-sm">
                    Response within 24 hours
                  </span>
                </div>
              </div>

              {/* Right side — takes 2 cols: stat highlights + trust badges */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-5">
                {/* Stats highlight cards */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center hover:bg-white/10 transition-all duration-300">
                    <p className="text-2xl sm:text-3xl font-vietnam font-bold text-primary-90 mb-1">
                      6K+
                    </p>
                    <p className="text-grey-60 text-xs sm:text-sm">
                      Students Counseled
                    </p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center hover:bg-white/10 transition-all duration-300">
                    <p className="text-2xl sm:text-3xl font-vietnam font-bold text-primary-90 mb-1">
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
                        key={i}
                        className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-primary-75/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <TrustIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-primary-90" />
                        </div>
                        <span className="text-white/80 text-sm sm:text-base font-medium">
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
        (cat) => ({ label: cat.label, value: cat.id }),
      ),
    ];
  }, [courses]);

  const filteredCourses = useMemo(
    () =>
      activeFilter === "all" ? courses : (
        courses.filter((c) => c.category === activeFilter)
      ),
    [activeFilter, courses],
  );

  const totalPrograms = courses.length;



  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-primary-99 via-white to-primary-97">
        {/* Animated background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-primary-90/40 to-transparent rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-1/4 w-40 h-40 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-tl from-primary-95/50 to-transparent rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-r from-primary-97 to-primary-95 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div
              className="opacity-0"
              style={{ animation: "fadeInDown 0.6s ease-out 0.1s forwards" }}
            >
              <Badge
                variant="secondary"
                className="mb-6 sm:mb-8 bg-white/90 backdrop-blur-sm border border-primary-95/50 shadow-lg text-primary-75 px-4 py-2 text-sm font-semibold hover:shadow-xl transition-all"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Your Career, Your Choice
              </Badge>
            </div>

            {/* Heading */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-vietnam font-bold text-grey-15 mb-4 sm:mb-6 leading-tight opacity-0"
              style={{ animation: "fadeInUp 0.8s ease-out 0.3s forwards" }}
            >
              Explore Our{" "}
              <span className="bg-gradient-to-r from-primary-75 to-primary-90 bg-clip-text text-transparent">
                Programs
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-base sm:text-lg lg:text-xl text-grey-35 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 px-2 opacity-0"
              style={{ animation: "fadeInUp 0.8s ease-out 0.5s forwards" }}
            >
              Comprehensive, industry-aligned programs designed to help you
              master new skills, advance your career, and achieve your goals
              with 100% placement assurance.
            </p>

            {/* Hero stat pills */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <div
                className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-md px-3 py-2 sm:px-5 sm:py-3 rounded-full shadow-lg border border-white/40 hover:shadow-xl transition-all duration-300 hover:scale-105 opacity-0"
                style={{ animation: `fadeInUp 0.6s ease-out 0.65s forwards` }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-90 to-primary-75 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-vietnam font-bold text-grey-15 text-sm sm:text-base leading-tight">
                    {totalPrograms}+
                  </p>
                  <p className="text-grey-40 text-[10px] sm:text-xs leading-tight">Programs</p>
                </div>
              </div>
              {heroStats.map((stat, i) => (
                <HeroStatPill key={i} stat={stat} index={i} />
              ))}
            </div>

            {/* Decorative separator */}
            <div
              className="flex items-center justify-center gap-3 mt-10 sm:mt-14 opacity-0"
              style={{ animation: "fadeInUp 0.6s ease-out 1.5s forwards" }}
            >
              <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-transparent to-primary-75 rounded-full" />
              <div className="w-2 h-2 bg-primary-75 rounded-full" />
              <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-primary-75 via-primary-90 to-primary-75 rounded-full" />
              <div className="w-2 h-2 bg-primary-75 rounded-full" />
              <div className="w-12 sm:w-16 h-1 bg-gradient-to-l from-transparent to-primary-75 rounded-full" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course._id} course={course} index={index} />
            ))}
          </div>

          {/* Empty state */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-grey-40 text-lg">
                No programs found for this category.
              </p>
              <button
                onClick={() => setActiveFilter("all")}
                className="mt-4 text-primary-75 font-semibold hover:underline"
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
