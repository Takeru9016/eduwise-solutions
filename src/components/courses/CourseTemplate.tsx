"use client";

import {
  ArrowRight,
  Award,
  Banknote,
  BookOpen,
  Briefcase,
  Building,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Cloud,
  Code,
  FileText,
  GraduationCap,
  HelpCircle,
  IndianRupee,
  Laptop,
  LifeBuoy,
  Lightbulb,
  type LucideIcon,
  Medal,
  Play,
  Rocket,
  ServerCog,
  Settings2,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { CourseContent } from "@/types/course";
import GoogleReviews from "../common/GoogleReviews";
import RefundHighlight from "../common/RefundHighlight";
import PaymentModal from "../payment/PaymentModal";
import PaymentStatusModal from "../payment/PaymentStatusModal";
import CourseLeadForm from "./CourseLeadForm";
import PlacementSection from "./PlacementSection";

// Icon Map
// Maps string icon names from Sanity to Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  ArrowRight,
  Award,
  Banknote,
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Cloud,
  Code,
  FileText,
  GraduationCap,
  HelpCircle,
  IndianRupee,
  Laptop,
  LifeBuoy,
  Lightbulb,
  Medal,
  Play,
  Rocket,
  ServerCog,
  Settings2,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
};

function getIcon(name?: string): LucideIcon {
  if (!name) {
    return Sparkles;
  }
  return ICON_MAP[name] || Sparkles;
}

// Main Component
interface CourseTemplateProps {
  course: CourseContent;
}

export default function CourseTemplate({ course }: CourseTemplateProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [activeBenefitTab, setActiveBenefitTab] = useState(0);
  const [activeCurriculumTab, setActiveCurriculumTab] = useState(0);
  const [activeCareerTrackTab, setActiveCareerTrackTab] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const [paymentStatus, setPaymentStatus] = useState<{
    isOpen: boolean;
    status: "success" | "failure" | "cancelled";
    message?: string;
  }>({
    isOpen: false,
    status: "success",
  });

  // Animated counter for stats
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsVisible) {
          setStatsVisible(true);
          const targets = course.stats.map((stat) => {
            const num = Number.parseFloat(stat.value.replace(/[^0-9.]/g, ""));
            return Number.isNaN(num) ? 0 : num;
          });
          const duration = 1500;
          const steps = 40;
          const interval = duration / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = Math.min(step / steps, 1);
            const eased = 1 - (1 - progress) ** 3;
            setAnimatedValues(
              targets.map((t) => {
                const decimals = (String(t).split(".")[1] || "").length;
                return Number.parseFloat((t * eased).toFixed(decimals));
              })
            );
            if (step >= steps) {
              clearInterval(timer);
            }
          }, interval);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, [course.stats, statsVisible]);

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);
  const handleCloseStatusModal = () =>
    setPaymentStatus((prev) => ({ ...prev, isOpen: false }));

  const discount = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );
  const saving = course.originalPrice - course.price;

  return (
    <main className="min-h-screen bg-white">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <PaymentStatusModal
        isOpen={paymentStatus.isOpen}
        message={paymentStatus.message}
        onClose={handleCloseStatusModal}
        status={paymentStatus.status}
      />
      <PaymentModal
        amount={course.price}
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        onPaymentComplete={(status, message) => {
          setPaymentStatus({ isOpen: true, message, status });
          closePaymentModal();
        }}
        programName={course.title}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary-99 via-white to-primary-97 py-12 sm:py-16 md:py-20 lg:py-28">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-linear-to-br from-primary-90/20 to-transparent blur-3xl sm:h-80 sm:w-80 lg:h-96 lg:w-96" />
          <div className="absolute right-1/4 bottom-0 h-48 w-48 rounded-full bg-linear-to-tl from-primary-95/30 to-transparent blur-2xl sm:h-64 sm:w-64 lg:h-80 lg:w-80" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2">
            {/* Left — text content */}
            <div className="order-2 text-center lg:order-1 lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-90/30 bg-white/90 px-4 py-2 font-semibold text-primary-75 text-sm shadow-lg backdrop-blur-xs">
                <Sparkles className="h-4 w-4" />
                {course.title}
              </div>

              <h1 className="mb-6 font-bold font-vietnam text-3xl text-grey-15 leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {course.title.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="bg-linear-to-r from-primary-75 to-primary-90 bg-clip-text text-transparent">
                  {course.title.split(" ").slice(-2).join(" ")}
                </span>
              </h1>

              <p className="mb-4 font-semibold text-lg text-primary-75 sm:text-xl lg:text-2xl">
                {course.subtitle}
              </p>

              <p className="mx-auto mb-8 max-w-2xl text-base text-grey-35 leading-relaxed sm:text-lg lg:mx-0">
                {course.description}
              </p>
            </div>

            {/* Right — lead capture form */}
            <div className="relative order-1 lg:order-2">
              <CourseLeadForm courseTitle={course.title} />
            </div>
          </div>

          {/* Stats strip — floating glassmorphism bar */}
          <div className="relative z-30 mt-12 -mb-16 sm:mt-16" ref={statsRef}>
            <div className="rounded-2xl border border-grey-90/60 bg-white/90 p-2 shadow-[0_8px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-3">
              <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
                {course.stats.map((stat, i) => {
                  const Icon = getIcon(stat.icon);
                  const colors = [
                    {
                      bg: "bg-emerald-50",
                      border: "border-emerald-500",
                      icon: "from-emerald-500 to-teal-500",
                      text: "text-emerald-600",
                    },
                    {
                      bg: "bg-blue-50",
                      border: "border-blue-500",
                      icon: "from-blue-500 to-indigo-500",
                      text: "text-blue-600",
                    },
                    {
                      bg: "bg-amber-50",
                      border: "border-amber-500",
                      icon: "from-amber-500 to-orange-500",
                      text: "text-amber-600",
                    },
                    {
                      bg: "bg-violet-50",
                      border: "border-violet-500",
                      icon: "from-violet-500 to-purple-500",
                      text: "text-violet-600",
                    },
                  ];
                  const c = colors[i % 4];

                  // Build the displayed value: replace the numeric part with animated value
                  const suffix = stat.value.replace(/[0-9.]/g, "").trim();
                  const targetNum = Number.parseFloat(
                    stat.value.replace(/[^0-9.]/g, "")
                  );
                  const decimals = (String(targetNum).split(".")[1] || "")
                    .length;
                  const displayVal =
                    animatedValues[i] === undefined
                      ? stat.value
                      : `${decimals > 0 ? animatedValues[i].toFixed(decimals) : animatedValues[i].toLocaleString("en-IN")}${suffix ? ` ${suffix}` : ""}`;

                  return (
                    <div
                      className={`relative rounded-xl border-[3px] p-4 text-center sm:p-6 ${c.border} group bg-linear-to-b from-white to-slate-50/80 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg`}
                      key={i}
                      style={{
                        opacity: statsVisible ? 1 : 0,
                        transform: statsVisible
                          ? "translateY(0)"
                          : "translateY(16px)",
                        transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`,
                      }}
                    >
                      <div
                        className={`h-10 w-10 bg-linear-to-br sm:h-11 sm:w-11 ${c.icon} mx-auto mb-3 flex items-center justify-center rounded-xl shadow-xs transition-transform duration-300 group-hover:scale-110`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <p
                        className={`font-extrabold font-vietnam text-2xl sm:text-3xl lg:text-4xl ${c.text} mb-1 tabular-nums`}
                      >
                        {displayVal}
                      </p>
                      <p className="font-semibold text-grey-40 text-xs uppercase tracking-wide sm:text-sm">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REFUND HIGHLIGHT */}
      {course.slug.current.toLowerCase() === "devops" && <RefundHighlight />}

      {/* 3. FEATURES — Bento Grid */}
      <section className="bg-linear-to-b from-slate-50 to-white pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-5 py-2.5 font-bold text-emerald-700 text-sm">
              <Sparkles size={16} />
              Why Choose This Program
            </div>
            <h2 className="mb-6 font-bold font-vietnam text-3xl text-grey-15 lg:text-5xl">
              Program{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Highlights
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-grey-40 text-lg leading-relaxed">
              Comprehensive training designed to make you job-ready with
              industry-relevant skills and hands-on experience.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl auto-rows-auto grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {course.features.map((feature, i) => {
              const Icon = getIcon(feature.icon);
              const accents = [
                {
                  badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
                  bg: "hover:bg-emerald-50/50",
                  border: "border-l-emerald-500",
                  iconBg: "from-emerald-500 to-teal-500",
                  shadow: "hover:shadow-emerald-100",
                },
                {
                  badge: "bg-blue-50 text-blue-700 border-blue-100",
                  bg: "hover:bg-blue-50/50",
                  border: "border-l-blue-500",
                  iconBg: "from-blue-500 to-indigo-500",
                  shadow: "hover:shadow-blue-100",
                },
                {
                  badge: "bg-amber-50 text-amber-700 border-amber-100",
                  bg: "hover:bg-amber-50/50",
                  border: "border-l-amber-500",
                  iconBg: "from-amber-500 to-orange-500",
                  shadow: "hover:shadow-amber-100",
                },
                {
                  badge: "bg-violet-50 text-violet-700 border-violet-100",
                  bg: "hover:bg-violet-50/50",
                  border: "border-l-violet-500",
                  iconBg: "from-violet-500 to-purple-500",
                  shadow: "hover:shadow-violet-100",
                },
              ];
              const a = accents[i % 4];
              // First card: large featured bento cell spanning 2 cols + 2 rows
              const isFeatured = i === 0;
              // Last card spans 2 cols if odd number of remaining cards
              const isLastWide =
                i === course.features.length - 1 &&
                course.features.length % 3 === 1 &&
                i > 0;

              return (
                <div
                  className={`group relative rounded-2xl border border-slate-100 border-l-4 bg-white ${a.border} ${a.bg} ${a.shadow} shadow-xs transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
                    isFeatured
                      ? "flex flex-col justify-between p-8 md:col-span-2 lg:col-span-1 lg:row-span-2"
                      : isLastWide
                        ? "p-7 md:col-span-2 lg:col-span-2"
                        : "p-7"
                  }`}
                  key={i}
                >
                  {isFeatured ? (
                    /* Featured card — vertical layout with larger icon */
                    <div className="flex h-full flex-col">
                      <div className="mb-5 flex items-center gap-4">
                        <div
                          className={`h-16 w-16 bg-linear-to-br ${a.iconBg} flex shrink-0 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <span
                          className={`rounded-full border px-3 py-1 font-bold text-xs ${a.badge}`}
                        >
                          Featured
                        </span>
                      </div>
                      <h3 className="mb-3 font-bold font-vietnam text-2xl text-grey-15 transition-colors group-hover:text-grey-10">
                        {feature.title}
                      </h3>
                      <p className="flex-1 text-[15px] text-grey-40 leading-relaxed">
                        {feature.description}
                      </p>
                      <div
                        className={`mt-5 h-1 w-full rounded-full bg-linear-to-r ${a.iconBg} opacity-40 transition-opacity duration-300 group-hover:opacity-100`}
                      />
                    </div>
                  ) : (
                    /* Standard cards — horizontal layout */
                    <div className="flex items-start gap-5">
                      <div
                        className={`h-14 w-14 bg-linear-to-br ${a.iconBg} flex shrink-0 items-center justify-center rounded-2xl shadow-md transition-transform duration-300 group-hover:scale-110`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-2 font-bold font-vietnam text-grey-15 text-xl transition-colors group-hover:text-grey-10">
                          {feature.title}
                        </h3>
                        <p className="text-[15px] text-grey-40 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PROGRAM BENEFITS — Interactive Tabs */}
      <section className="relative overflow-hidden bg-white py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-20 right-0 h-[600px] w-[600px] rounded-full bg-linear-to-bl from-blue-50 to-transparent opacity-60 blur-3xl" />
          <div className="absolute bottom-20 left-0 h-[500px] w-[500px] rounded-full bg-linear-to-tr from-violet-50 to-transparent opacity-60 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-5 py-2.5 font-bold text-blue-700 text-sm">
              <Zap size={16} />
              What You&apos;ll Get
            </div>
            <h2 className="mb-6 font-bold font-vietnam text-4xl text-grey-15 lg:text-5xl">
              Program{" "}
              <span className="bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Benefits
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-grey-40 text-lg leading-relaxed">
              Unlock your potential with our exclusive program advantages
            </p>
          </div>

          {/* Desktop: sidebar tabs */}
          <div className="mx-auto hidden max-w-6xl gap-8 lg:grid lg:grid-cols-[320px_1fr]">
            {/* Tab list */}
            <div className="space-y-2">
              {course.highlights.map((highlight, i) => {
                const Icon = getIcon(highlight.icon);
                const isActive = activeBenefitTab === i;
                const tabColors = [
                  {
                    active: "from-emerald-500 to-teal-500",
                    ring: "ring-emerald-200",
                  },
                  {
                    active: "from-blue-500 to-indigo-500",
                    ring: "ring-blue-200",
                  },
                  {
                    active: "from-amber-500 to-orange-500",
                    ring: "ring-amber-200",
                  },
                  {
                    active: "from-violet-500 to-purple-500",
                    ring: "ring-violet-200",
                  },
                ];
                const tc = tabColors[i % 4];

                return (
                  <button
                    className={`flex w-full items-center gap-4 rounded-xl px-5 py-4 text-left transition-all duration-300 ${
                      isActive
                        ? `bg-white shadow-lg ring-2 ${tc.ring} scale-[1.02]`
                        : "bg-white/50 hover:bg-white hover:shadow-md"
                    }`}
                    key={i}
                    onClick={() => setActiveBenefitTab(i)}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                        isActive
                          ? `bg-linear-to-br ${tc.active} shadow-md`
                          : "bg-slate-100"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${isActive ? "text-white" : "text-grey-40"}`}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4
                        className={`font-bold font-vietnam text-[15px] transition-colors ${
                          isActive ? "text-grey-15" : "text-grey-40"
                        }`}
                      >
                        {highlight.category}
                      </h4>
                    </div>
                    {isActive && (
                      <ArrowRight className="h-4 w-4 shrink-0 text-grey-40" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content panel */}
            <div className="min-h-[320px] rounded-2xl border border-slate-100 bg-white p-8 shadow-lg">
              {course.highlights[activeBenefitTab] &&
                (() => {
                  const h = course.highlights[activeBenefitTab];
                  const Icon = getIcon(h.icon);
                  const panelColors = [
                    {
                      badge: "bg-emerald-50 text-emerald-700",
                      dot: "bg-emerald-500",
                      gradient: "from-emerald-500 to-teal-500",
                    },
                    {
                      badge: "bg-blue-50 text-blue-700",
                      dot: "bg-blue-500",
                      gradient: "from-blue-500 to-indigo-500",
                    },
                    {
                      badge: "bg-amber-50 text-amber-700",
                      dot: "bg-amber-500",
                      gradient: "from-amber-500 to-orange-500",
                    },
                    {
                      badge: "bg-violet-50 text-violet-700",
                      dot: "bg-violet-500",
                      gradient: "from-violet-500 to-purple-500",
                    },
                  ];
                  const pc = panelColors[activeBenefitTab % 4];

                  return (
                    <div
                      className="fade-in slide-in-from-right-4 animate-in duration-300"
                      key={activeBenefitTab}
                    >
                      <div className="mb-8 flex items-center gap-4">
                        <div
                          className={`h-14 w-14 bg-linear-to-br ${pc.gradient} flex items-center justify-center rounded-2xl shadow-md`}
                        >
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold font-vietnam text-2xl text-grey-15">
                            {h.category}
                          </h3>
                          <span
                            className={`mt-1 inline-block rounded-full px-3 py-1 font-bold text-xs ${pc.badge}`}
                          >
                            {h.points.length} benefits included
                          </span>
                        </div>
                      </div>
                      <ul className="space-y-4">
                        {h.points.map((point, j) => (
                          <li
                            className="group/point flex items-start gap-3"
                            key={j}
                          >
                            <div
                              className={`h-2 w-2 ${pc.dot} mt-2 shrink-0 rounded-full transition-transform group-hover/point:scale-150`}
                            />
                            <span className="text-[15px] text-grey-35 leading-relaxed">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })()}
            </div>
          </div>

          {/* Mobile: stacked cards */}
          <div className="mx-auto max-w-2xl space-y-4 lg:hidden">
            {course.highlights.map((highlight, i) => {
              const Icon = getIcon(highlight.icon);
              const mobileColors = [
                {
                  border: "border-l-emerald-500",
                  dot: "bg-emerald-500",
                  iconBg: "from-emerald-500 to-teal-500",
                },
                {
                  border: "border-l-blue-500",
                  dot: "bg-blue-500",
                  iconBg: "from-blue-500 to-indigo-500",
                },
                {
                  border: "border-l-amber-500",
                  dot: "bg-amber-500",
                  iconBg: "from-amber-500 to-orange-500",
                },
                {
                  border: "border-l-violet-500",
                  dot: "bg-violet-500",
                  iconBg: "from-violet-500 to-purple-500",
                },
              ];
              const mc = mobileColors[i % 4];

              return (
                <details
                  className={`group rounded-xl border border-slate-100 border-l-4 bg-white ${mc.border} overflow-hidden shadow-xs`}
                  key={i}
                >
                  <summary className="flex cursor-pointer list-none items-center gap-3 p-5 [&::-webkit-details-marker]:hidden">
                    <div
                      className={`h-10 w-10 bg-linear-to-br ${mc.iconBg} flex shrink-0 items-center justify-center rounded-xl`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="flex-1 font-bold font-vietnam text-grey-15">
                      {highlight.category}
                    </h4>
                    <ChevronDown className="h-5 w-5 text-grey-40 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pt-1 pb-5">
                    <ul className="space-y-3">
                      {highlight.points.map((point, j) => (
                        <li className="flex items-start gap-3" key={j}>
                          <div
                            className={`h-1.5 w-1.5 ${mc.dot} mt-2 shrink-0 rounded-full`}
                          />
                          <span className="text-grey-35 text-sm leading-relaxed">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. WHAT YOU'LL LEARN — 5-Section Sequential Flow */}
      <section className="relative overflow-hidden bg-linear-to-b from-white to-slate-50 py-20">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-5 py-2.5 font-bold text-emerald-700 text-sm">
              <GraduationCap size={16} />
              Your Learning Journey
            </div>
            <h2 className="mb-6 font-bold font-vietnam text-4xl text-grey-15 lg:text-5xl">
              What You&apos;ll{" "}
              <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Learn
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-grey-35 text-lg leading-relaxed">
              A structured 5-step journey from learning to career placement
            </p>
          </div>

          <div className="mx-auto max-w-6xl space-y-8">
            {/* ── Section 1: Course Curriculum ── */}
            <div className="overflow-hidden rounded-3xl shadow-lg">
              {/* Header */}
              <div className="bg-linear-to-r from-emerald-500 to-teal-500 px-6 py-6 sm:px-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 font-bold text-white text-xl backdrop-blur-xs">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold font-vietnam text-2xl text-white">
                        Course Curriculum
                      </h3>
                      <p className="mt-1 max-w-2xl text-emerald-100 text-sm">
                        Our course is designed by industry experts for excellent
                        academic and industrial experience.
                      </p>
                    </div>
                  </div>
                  {course.duration && (
                    <div className="hidden items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-xs sm:flex">
                      <Calendar className="h-4 w-4 text-white" />
                      <span className="font-bold text-sm text-white">
                        {course.duration}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content with sidebar tabs */}
              <div className="bg-white">
                {/* Desktop: sidebar + content */}
                <div className="hidden h-[650px] md:grid md:grid-cols-[320px_1fr]">
                  {/* Module sidebar */}
                  <div className="scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent overflow-y-auto border-slate-100 border-r py-4">
                    {course.modules.map((mod, i) => (
                      <button
                        className={`flex w-full items-center justify-between border-l-3 px-5 py-4 text-left transition-all duration-200 ${
                          activeCurriculumTab === i
                            ? "border-l-[3px] border-l-emerald-500 bg-emerald-50/60"
                            : "border-l-[3px] border-l-transparent hover:bg-slate-50"
                        }`}
                        key={i}
                        onClick={() => setActiveCurriculumTab(i)}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-grey-50 text-xs">
                            Module {i + 1}
                          </p>
                          <p
                            className={`mt-0.5 font-bold font-vietnam text-sm ${
                              activeCurriculumTab === i
                                ? "text-emerald-700"
                                : "text-grey-25"
                            }`}
                          >
                            {mod.title}
                          </p>
                        </div>
                        {activeCurriculumTab === i && (
                          <ChevronRight className="h-4 w-4 shrink-0 text-emerald-500" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Topic content */}
                  <div className="scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent overflow-y-auto p-8">
                    {course.modules[activeCurriculumTab] &&
                      (() => {
                        const mod = course.modules[activeCurriculumTab];
                        return (
                          <div key={activeCurriculumTab}>
                            <h4 className="mb-1 font-bold font-vietnam text-grey-15 text-xl">
                              {mod.title}
                            </h4>
                            {(mod.duration || mod.description) && (
                              <p className="mb-6 text-grey-40 text-sm">
                                Description: {mod.description}
                              </p>
                            )}
                            <div className="space-y-6 border-slate-100 border-t pt-6">
                              {mod.submodules?.map((submod, idx) => (
                                <div key={idx}>
                                  <h5 className="mb-3 font-bold font-vietnam text-grey-15 text-lg">
                                    {submod.title}
                                  </h5>

                                  {submod.subtopics?.length > 0 && (
                                    <div className="mb-4">
                                      <p className="mb-2 font-bold text-grey-30 text-sm uppercase tracking-wider">
                                        Topics:
                                      </p>
                                      <ul className="space-y-2">
                                        {submod.subtopics.map((topic, j) => (
                                          <li
                                            className="flex items-start gap-3"
                                            key={j}
                                          >
                                            <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                            <span className="text-[15px] text-grey-35 leading-relaxed">
                                              {topic}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {submod.handsOn?.length > 0 && (
                                    <div>
                                      <p className="mb-2 font-bold text-emerald-600 text-sm uppercase tracking-wider">
                                        Hands-on:
                                      </p>
                                      <ul className="space-y-2">
                                        {submod.handsOn.map((item, j) => (
                                          <li
                                            className="flex items-start gap-3"
                                            key={j}
                                          >
                                            <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                                            <span className="text-[15px] text-grey-35 leading-relaxed">
                                              {item}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                  </div>
                </div>

                {/* Mobile: accordion */}
                <div className="p-4 md:hidden">
                  <Accordion className="space-y-2" collapsible type="single">
                    {course.modules.map((mod, i) => (
                      <AccordionItem
                        className="overflow-hidden rounded-xl border border-slate-100"
                        key={i}
                        value={`curriculum-${i}`}
                      >
                        <AccordionTrigger className="px-4 py-3 text-left hover:no-underline">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-emerald-500 to-teal-500 font-bold text-white text-xs">
                              {i + 1}
                            </div>
                            <div>
                              <p className="font-bold font-vietnam text-grey-15 text-sm">
                                {mod.title}
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="ml-11 space-y-4">
                            {mod.submodules?.map((submod, idx) => (
                              <div key={idx}>
                                <h5 className="mb-2 font-bold font-vietnam text-grey-15 text-sm">
                                  {submod.title}
                                </h5>

                                {submod.subtopics?.length > 0 && (
                                  <ul className="mb-2 space-y-1">
                                    {submod.subtopics.map((topic, j) => (
                                      <li
                                        className="flex items-start gap-2 text-grey-35 text-sm"
                                        key={j}
                                      >
                                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                                        <span>{topic}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}

                                {submod.handsOn?.length > 0 && (
                                  <ul className="space-y-1">
                                    {submod.handsOn.map((item, j) => (
                                      <li
                                        className="flex items-start gap-2 text-grey-35 text-sm"
                                        key={`ho-${j}`}
                                      >
                                        <Code className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                                        <span>
                                          <strong className="font-medium text-grey-30">
                                            Hands-on:
                                          </strong>{" "}
                                          {item}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>

              {/* Chevron connector */}
              <div className="flex justify-center bg-linear-to-r from-emerald-500 to-teal-500 py-3">
                <ChevronDown className="h-6 w-6 animate-bounce text-white" />
              </div>
            </div>

            {/* ── Section 2: Placement Readiness Test (PRT) ── */}
            {course.isJobGuaranteeProgram &&
              course.prtSteps &&
              course.prtSteps.length > 0 && (
                <div className="overflow-hidden rounded-3xl shadow-lg">
                  <div className="bg-linear-to-r from-emerald-500 to-teal-500 px-6 py-6 sm:px-8">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 font-bold text-white text-xl backdrop-blur-xs">
                        2
                      </div>
                      <div>
                        <h3 className="font-bold font-vietnam text-2xl text-white">
                          Placement Readiness Test (PRT)
                        </h3>
                        <p className="mt-1 text-emerald-100 text-sm">
                          To become eligible for our Job Guarantee Program,
                          complete these milestones:
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-linear-to-b from-emerald-50 to-white p-6 sm:p-8">
                    {(() => {
                      const prtSteps = course.prtSteps!;
                      const prtColors = [
                        "from-emerald-500 to-teal-500",
                        "from-blue-500 to-indigo-500",
                        "from-violet-500 to-purple-500",
                      ];
                      const prtIcons = [Check, Target, Award];
                      return (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                          {prtSteps.map((step, idx) => (
                            <div
                              className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-xs transition-shadow hover:shadow-md"
                              key={idx}
                            >
                              <div
                                className={`h-14 w-14 bg-linear-to-br ${prtColors[idx % prtColors.length]} mx-auto mb-4 flex items-center justify-center rounded-full font-bold text-white text-xl shadow-md`}
                              >
                                {idx + 1}
                              </div>
                              <h4 className="mb-3 font-bold font-vietnam text-grey-15 text-lg">
                                {step.title}
                              </h4>
                              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                                {(() => {
                                  const Icon = prtIcons[idx % prtIcons.length];
                                  return (
                                    <Icon className="mx-auto mb-2 h-5 w-5 text-emerald-600" />
                                  );
                                })()}
                                <p className="text-grey-35 text-sm leading-relaxed">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>

                  <div className="flex justify-center bg-linear-to-r from-emerald-500 to-teal-500 py-3">
                    <ChevronDown className="h-6 w-6 animate-bounce text-white" />
                  </div>
                </div>
              )}

            {/* ── Section 3: Sign ISA Agreement ── */}
            {course.isJobGuaranteeProgram &&
              course.isaSteps &&
              course.isaSteps.length > 0 && (
                <div className="overflow-hidden rounded-3xl shadow-lg">
                  <div className="bg-linear-to-r from-emerald-500 to-teal-500 px-6 py-6 sm:px-8">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 font-bold text-white text-xl backdrop-blur-xs">
                        3
                      </div>
                      <div>
                        <h3 className="font-bold font-vietnam text-2xl text-white">
                          Sign ISA Agreement
                        </h3>
                        <p className="mt-1 text-emerald-100 text-sm">
                          Pay INR{" "}
                          {(course.careerServiceFee || 20_000).toLocaleString(
                            "en-IN"
                          )}{" "}
                          to Eduwise Solutions as a career services fee after
                          placement.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-linear-to-b from-emerald-50 to-white p-6 sm:p-8">
                    {(() => {
                      const isaSteps = course.isaSteps!;
                      const isaColors = [
                        "from-emerald-500 to-teal-500",
                        "from-blue-500 to-indigo-500",
                        "from-violet-500 to-purple-500",
                      ];
                      const isaIcons = [FileText, UserCheck, Banknote];
                      return (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                          {isaSteps.map((step, idx) => (
                            <div
                              className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-xs transition-shadow hover:shadow-md"
                              key={idx}
                            >
                              <div
                                className={`h-16 w-16 bg-linear-to-br ${isaColors[idx % isaColors.length]} mx-auto mb-4 flex items-center justify-center rounded-2xl bg-opacity-10`}
                              >
                                {(() => {
                                  const Icon = isaIcons[idx % isaIcons.length];
                                  return (
                                    <Icon className="h-8 w-8 text-white" />
                                  );
                                })()}
                              </div>
                              <h4 className="mb-1 font-bold font-vietnam text-grey-15 text-lg">
                                {step.title}
                              </h4>
                              <p className="text-grey-40 text-sm">
                                {step.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>

                  <div className="flex justify-center bg-linear-to-r from-emerald-500 to-teal-500 py-3">
                    <ChevronDown className="h-6 w-6 animate-bounce text-white" />
                  </div>
                </div>
              )}

            {/* ── Section 4: Career Track ── */}
            {course.isJobGuaranteeProgram &&
              course.careerTrack &&
              course.careerTrack.length > 0 && (
                <div className="overflow-hidden rounded-3xl shadow-lg">
                  <div className="bg-linear-to-r from-emerald-500 to-teal-500 px-6 py-6 sm:px-8">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 font-bold text-white text-xl backdrop-blur-xs">
                        4
                      </div>
                      <div>
                        <h3 className="font-bold font-vietnam text-2xl text-white">
                          Career Track
                        </h3>
                        <p className="mt-1 text-emerald-100 text-sm">
                          Access a wide range of resources to become a Job-Ready
                          Candidate with our dedicated placement team.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white">
                    {(() => {
                      const careerTrackItems = course.careerTrack!;

                      return (
                        <>
                          {/* Desktop: sidebar tabs */}
                          <div className="hidden min-h-[600px] md:grid md:grid-cols-[320px_1fr]">
                            <div className="border-slate-100 border-r py-4">
                              {careerTrackItems.map((item, i) => (
                                <button
                                  className={`flex w-full items-center justify-between border-l-[3px] px-5 py-4 text-left transition-all duration-200 ${
                                    activeCareerTrackTab === i
                                      ? "border-l-emerald-500 bg-emerald-50/60"
                                      : "border-l-transparent hover:bg-slate-50"
                                  }`}
                                  key={i}
                                  onClick={() => setActiveCareerTrackTab(i)}
                                >
                                  <div className="min-w-0 flex-1">
                                    <p
                                      className={`font-bold font-vietnam text-sm ${
                                        activeCareerTrackTab === i
                                          ? "text-emerald-700"
                                          : "text-grey-25"
                                      }`}
                                    >
                                      {item.title}
                                    </p>
                                    <p className="mt-0.5 truncate text-grey-50 text-xs">
                                      {item.description}
                                    </p>
                                  </div>
                                  {activeCareerTrackTab === i && (
                                    <ChevronRight className="h-4 w-4 shrink-0 text-emerald-500" />
                                  )}
                                </button>
                              ))}
                            </div>

                            <div className="p-8">
                              {careerTrackItems[activeCareerTrackTab] && (
                                <div key={activeCareerTrackTab}>
                                  <h4 className="mb-1 font-bold font-vietnam text-grey-15 text-xl">
                                    {
                                      careerTrackItems[activeCareerTrackTab]
                                        .title
                                    }
                                  </h4>
                                  <p className="mb-6 text-grey-40 text-sm">
                                    {
                                      careerTrackItems[activeCareerTrackTab]
                                        .description
                                    }
                                  </p>
                                  <div className="border-slate-100 border-t pt-6">
                                    <p className="mb-4 font-bold text-grey-30 text-sm uppercase tracking-wider">
                                      What You&apos;ll Learn:
                                    </p>
                                    <ul className="space-y-3">
                                      {careerTrackItems[
                                        activeCareerTrackTab
                                      ].topics.map((topic, j) => (
                                        <li
                                          className="flex items-start gap-3"
                                          key={j}
                                        >
                                          <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                                          <span className="text-[15px] text-grey-35 leading-relaxed">
                                            {topic}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Mobile: stacked cards */}
                          <div className="space-y-3 p-4 md:hidden">
                            {careerTrackItems.map((item, i) => (
                              <details
                                className="group overflow-hidden rounded-xl border border-slate-100 bg-slate-50"
                                key={i}
                              >
                                <summary className="flex cursor-pointer list-none items-center gap-3 p-4 [&::-webkit-details-marker]:hidden">
                                  <Briefcase className="h-5 w-5 shrink-0 text-emerald-600" />
                                  <span className="flex-1 font-bold font-vietnam text-grey-15 text-sm">
                                    {item.title}
                                  </span>
                                  <ChevronDown className="h-4 w-4 text-grey-40 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="px-4 pb-4">
                                  <ul className="ml-8 space-y-2">
                                    {item.topics.map((topic, j) => (
                                      <li
                                        className="flex items-start gap-2 text-grey-35 text-sm"
                                        key={j}
                                      >
                                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                                        <span>{topic}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </details>
                            ))}
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  <div className="flex justify-center bg-linear-to-r from-emerald-500 to-teal-500 py-3">
                    <ChevronDown className="h-6 w-6 animate-bounce text-white" />
                  </div>
                </div>
              )}

            {/* ── Section 5: Pay Career Services Fee & Hiring Partners ── */}
            {course.isJobGuaranteeProgram &&
              course.hiringPartners &&
              course.hiringPartners.length > 0 && (
                <div className="overflow-hidden rounded-3xl shadow-lg">
                  <div className="bg-linear-to-r from-emerald-500 to-teal-500 px-6 py-6 sm:px-8">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 font-bold text-white text-xl backdrop-blur-xs">
                        5
                      </div>
                      <div>
                        <h3 className="font-bold font-vietnam text-2xl text-white">
                          Pay Career Services Fee
                        </h3>
                        <p className="mt-1 text-emerald-100 text-sm">
                          Only pay after you receive an offer letter. Our hiring
                          partners are waiting for you!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-linear-to-b from-emerald-50 to-white p-6 sm:p-10">
                    <p className="mb-8 text-center font-medium text-grey-35 text-lg">
                      Our Hiring Partners
                    </p>
                    {(() => {
                      const partners = course.hiringPartners!;
                      return (
                        <>
                          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                            {partners.map((partner, i) => (
                              <div
                                className="group flex h-20 flex-col items-center justify-center rounded-xl border border-slate-100 bg-white p-4 shadow-xs transition-shadow hover:border-emerald-200 hover:shadow-md"
                                key={i}
                              >
                                {partner.logoUrl ? (
                                  <Image
                                    alt={partner.name}
                                    className="h-full w-full object-contain transition-transform group-hover:scale-110"
                                    height={40}
                                    src={partner.logoUrl}
                                    unoptimized
                                    width={120}
                                  />
                                ) : (
                                  <>
                                    <Building className="mb-1 h-5 w-5 text-slate-300 transition-colors group-hover:text-emerald-500" />
                                    <span className="text-center font-bold text-grey-30 text-xs leading-tight">
                                      {partner.name}
                                    </span>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="mt-8 text-center">
                            <p className="text-grey-40 text-sm">
                              Career services fee:{" "}
                              <span className="font-bold text-emerald-700">
                                INR{" "}
                                {(
                                  course.careerServiceFee || 20_000
                                ).toLocaleString("en-IN")}
                              </span>{" "}
                              (payable after placement, EMI available)
                            </p>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* 6. TOOLS & TECHNOLOGIES (Optional) */}
      {course.tools && course.tools.length > 0 && (
        <section className="bg-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-99 px-4 py-2 font-semibold text-primary-75 text-sm">
                <Code size={16} />
                Tech Stack
              </div>
              <h2 className="mb-6 font-bold font-vietnam text-3xl text-grey-15 lg:text-5xl">
                Tools & Technologies
              </h2>
              <p className="mx-auto max-w-3xl text-grey-35 text-lg">
                Master industry-standard tools used by top companies
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {course.tools.map((tool, i) => (
                <div
                  className="group flex flex-col items-center gap-3 rounded-xl p-4 shadow-md transition-colors duration-200 hover:bg-primary-99"
                  key={i}
                >
                  {tool.logoUrl ? (
                    <Image
                      alt={tool.name}
                      className="h-12 w-12 object-contain shadow-none transition-transform group-hover:scale-110"
                      height={48}
                      src={tool.logoUrl}
                      width={48}
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary-75 to-primary-90">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                  )}
                  <span className="text-center font-medium text-grey-35 text-xs">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. TARGET AUDIENCE (Optional) */}
      {course.targetAudience && course.targetAudience.length > 0 && (
        <section className="bg-light-97 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-99 px-4 py-2 font-semibold text-primary-75 text-sm">
                <Users size={16} />
                Who Is This For
              </div>
              <h2 className="mb-6 font-bold font-vietnam text-3xl text-grey-15 lg:text-5xl">
                Perfect For You
              </h2>
              <p className="mx-auto max-w-3xl text-grey-35 text-lg">
                This program is designed for individuals from various
                backgrounds
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {course.targetAudience.map((target, i) => {
                const Icon = getIcon(target.icon);
                return (
                  <div
                    className="group rounded-2xl border border-light-90 bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary-90 hover:shadow-xl"
                    key={i}
                  >
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-primary-75 to-primary-90 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold font-vietnam text-grey-15 text-xl">
                      {target.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 8. PLACEMENT SECTION */}
      <PlacementSection categorySlug={course.slug.current} />

      {/* 9. GOOGLE REVIEWS */}
      <GoogleReviews categorySlug={course.slug.current} />

      {/* 10A. CAREER OPPORTUNITIES (standalone) */}
      {course.careerPaths && course.careerPaths.length > 0 && (
        <section className="relative overflow-hidden bg-linear-to-b from-white to-slate-50 py-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-20 left-0 h-[500px] w-[500px] rounded-full bg-linear-to-br from-teal-50 to-transparent opacity-60 blur-3xl" />
            <div className="absolute right-0 bottom-20 h-[400px] w-[400px] rounded-full bg-linear-to-tl from-emerald-50 to-transparent opacity-60 blur-3xl" />
          </div>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-5 py-2.5 font-bold text-sm text-teal-700">
                <TrendingUp size={16} />
                Career Paths
              </div>
              <h2 className="mb-6 font-bold font-vietnam text-4xl text-grey-15 lg:text-5xl">
                Career{" "}
                <span className="bg-linear-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                  Opportunities
                </span>
              </h2>
              <p className="mx-auto max-w-3xl text-grey-40 text-lg leading-relaxed">
                Join the fastest-growing tech domain with lucrative salary
                packages
              </p>

              {course.industryGrowth && (
                <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-linear-to-r from-emerald-50 to-teal-50 px-5 py-2.5">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium text-grey-40 text-sm">
                    Industry Growth:
                  </span>
                  <span className="font-bold text-emerald-700 text-lg">
                    {course.industryGrowth}
                  </span>
                </div>
              )}
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {course.careerPaths.map((career, i) => {
                const Icon = getIcon(career.icon);
                const cardColors = [
                  {
                    border: "border-t-teal-500",
                    iconBg: "from-teal-500 to-emerald-500",
                    text: "text-teal-700",
                  },
                  {
                    border: "border-t-blue-500",
                    iconBg: "from-blue-500 to-indigo-500",
                    text: "text-blue-700",
                  },
                  {
                    border: "border-t-violet-500",
                    iconBg: "from-violet-500 to-purple-500",
                    text: "text-violet-700",
                  },
                  {
                    border: "border-t-amber-500",
                    iconBg: "from-amber-500 to-orange-500",
                    text: "text-amber-700",
                  },
                ];
                const cc = cardColors[i % 4];

                return (
                  <div
                    className={`group relative rounded-2xl border border-slate-100 border-t-[3px] bg-white p-6 ${cc.border} shadow-xs transition-all duration-500 hover:-translate-y-1 hover:shadow-xl`}
                    key={i}
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div
                        className={`h-12 w-12 bg-linear-to-br ${cc.iconBg} flex items-center justify-center rounded-xl shadow-xs transition-transform duration-300 group-hover:scale-110`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 font-bold text-emerald-700 text-xs">
                        High Demand
                      </span>
                    </div>
                    <h4 className="mb-3 font-bold font-vietnam text-grey-15 text-lg transition-colors group-hover:text-grey-10">
                      {career.title}
                    </h4>
                    {career.salary && (
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-grey-40" />
                        <p className={`font-bold text-xl ${cc.text}`}>
                          {career.salary}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 10B. PRICING (standalone, full-width) */}
      <section className="relative overflow-hidden bg-linear-to-b from-slate-50 to-white py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/3 h-[600px] w-[600px] rounded-full bg-linear-to-br from-violet-50 to-transparent opacity-50 blur-3xl" />
          <div className="absolute right-1/3 bottom-0 h-[500px] w-[500px] rounded-full bg-linear-to-tl from-blue-50 to-transparent opacity-50 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-5 py-2.5 font-bold text-sm text-violet-700">
              <IndianRupee size={16} />
              Program Investment
            </div>
            <h2 className="mb-4 font-bold font-vietnam text-4xl text-grey-15 lg:text-5xl">
              Invest in Your{" "}
              <span className="bg-linear-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Future
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-grey-40 text-lg">
              Best value in the market with everything you need to succeed
            </p>
          </div>

          <div className="mx-auto max-w-xl">
            {/* Pricing card */}
            <div className="relative">
              {/* Discount badge */}
              <div className="absolute -top-5 left-1/2 z-20 -translate-x-1/2">
                <div className="flex items-center gap-2 rounded-full bg-linear-to-r from-amber-500 to-orange-500 px-6 py-2.5 font-bold text-sm text-white tracking-wide shadow-lg">
                  <Sparkles className="h-4 w-4" />
                  {discount}% OFF — Limited Time
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border-2 border-violet-100 bg-white shadow-[0_8px_50px_rgba(0,0,0,0.08)]">
                {/* Price hero */}
                <div className="border-violet-100 border-b bg-linear-to-br from-violet-50 via-white to-purple-50 px-8 pt-14 pb-8 text-center">
                  <p className="mb-4 font-semibold text-grey-40 text-sm uppercase tracking-wider">
                    One-time Payment
                  </p>
                  <div className="mb-4">
                    <p className="font-extrabold font-vietnam text-6xl text-grey-15 sm:text-7xl">
                      ₹{course.price.toLocaleString("en-IN")}
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-3">
                      <p className="text-grey-50 text-xl line-through">
                        ₹{course.originalPrice.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-linear-to-r from-emerald-50 to-teal-50 px-5 py-2.5">
                    <span className="font-bold text-base text-emerald-700">
                      🎉 You Save ₹{saving.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Inclusions + CTA */}
                <div className="p-8">
                  {/* What's included */}
                  {course.whatsIncluded && course.whatsIncluded.length > 0 && (
                    <div className="mb-6 space-y-3">
                      <p className="mb-4 font-bold text-grey-30 text-xs uppercase tracking-wider">
                        What&apos;s Included
                      </p>
                      {course.whatsIncluded.map((item, i) => (
                        <div className="flex items-center gap-3" key={i}>
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                            <Check className="h-3 w-3 text-emerald-600" />
                          </div>
                          <span className="font-medium text-grey-35 text-sm">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* EMI option */}
                  {course.emiOption && (
                    <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-center">
                      <p className="text-grey-40 text-sm">
                        EMI Available from{" "}
                        <span className="font-bold text-blue-700">
                          {course.emiOption}
                        </span>
                      </p>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="space-y-4">
                    <Button
                      className="w-full rounded-2xl bg-linear-to-r from-violet-600 to-purple-600 px-8 py-7 font-bold text-white text-xl shadow-xl transition-all duration-300 hover:scale-[1.02] hover:from-violet-700 hover:to-purple-700 hover:shadow-2xl"
                      onClick={openPaymentModal}
                    >
                      Enroll Now
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>

                    <div className="flex items-center justify-center gap-6 pt-2 text-grey-50 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Shield className="h-4 w-4" />
                        <span>Secure Payment</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className="h-4 w-4" />
                        <span>Certified Program</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ (Optional) */}
      {course.faq && course.faq.length > 0 && (
        <section className="bg-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-99 px-4 py-2 font-bold text-primary-75 text-sm">
                <HelpCircle className="h-4 w-4" />
                FAQ
              </div>
              <h2 className="mb-4 font-bold font-vietnam text-4xl text-grey-15 md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto max-w-2xl text-grey-40 text-lg">
                Everything you need to know about our {course.title} course
              </p>
            </div>

            <div className="mx-auto max-w-6xl">
              <Accordion className="w-full" collapsible type="single">
                <div className="grid gap-6 md:grid-cols-2">
                  {course.faq.map((item, i) => (
                    <AccordionItem
                      className="rounded-2xl border-0 bg-grey-99 p-6 transition-all duration-300 hover:bg-primary-99 hover:shadow-lg"
                      key={i}
                      value={`faq-${i}`}
                    >
                      <AccordionTrigger className="pb-4 text-left font-bold font-vietnam text-grey-15 text-lg transition-colors hover:text-primary-75 hover:no-underline data-[state=open]:text-primary-75">
                        <div className="flex w-full items-start gap-3 pr-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-75 font-bold text-sm text-white">
                            {i + 1}
                          </div>
                          <span className="flex-1 pt-0.5">{item.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-2 pl-11">
                        <p className="text-grey-35 leading-relaxed">
                          {item.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </div>
              </Accordion>
            </div>

            {/* Contact CTA */}
            <div className="mt-16 text-center">
              <p className="mb-6 text-grey-30 text-lg">
                Still have questions? We&apos;re here to help!
              </p>
              <a
                className="inline-flex items-center gap-2 rounded-full bg-primary-75 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-primary-60 hover:shadow-xl"
                href="/contact"
              >
                Contact Our Team
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
