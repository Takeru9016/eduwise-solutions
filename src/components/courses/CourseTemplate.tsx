"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import {
  Check,
  BookOpen,
  Users,
  Sparkles,
  Laptop,
  LifeBuoy,
  Medal,
  Zap,
  IndianRupee,
  Cloud,
  ServerCog,
  Settings2,
  ArrowRight,
  Clock,
  Target,
  Award,
  Star,
  TrendingUp,
  Shield,
  ChevronDown,
  GraduationCap,
  Lightbulb,
  Code,
  Briefcase,
  Rocket,
  HelpCircle,
  Play,
  FileText,
  UserCheck,
  Banknote,
  ChevronRight,
  Calendar,
  Building,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PaymentStatusModal from "../payment/PaymentStatusModal";
import PaymentModal from "../payment/PaymentModal";
import PlacementSection from "./PlacementSection";
import GoogleReviews from "../common/GoogleReviews";
import RefundHighlight from "../common/RefundHighlight";
import CourseLeadForm from "./CourseLeadForm";
import type { CourseContent } from "@/types/course";

// Icon Map
// Maps string icon names from Sanity to Lucide components
const ICON_MAP: Record<string, LucideIcon> = {
  Users,
  Clock,
  Target,
  Award,
  Star,
  Sparkles,
  Laptop,
  Shield,
  BookOpen,
  LifeBuoy,
  Medal,
  Zap,
  Cloud,
  ServerCog,
  Settings2,
  TrendingUp,
  GraduationCap,
  Lightbulb,
  Code,
  Briefcase,
  Rocket,
  IndianRupee,
  Check,
  Play,
  HelpCircle,
  ArrowRight,
  ChevronDown,
  FileText,
  UserCheck,
  Banknote,
  ChevronRight,
  Calendar,
};

function getIcon(name?: string): LucideIcon {
  if (!name) return Sparkles;
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
            const num = parseFloat(stat.value.replace(/[^0-9.]/g, ""));
            return isNaN(num) ? 0 : num;
          });
          const duration = 1500;
          const steps = 40;
          const interval = duration / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = Math.min(step / steps, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setAnimatedValues(
              targets.map((t) => {
                const decimals = (String(t).split(".")[1] || "").length;
                return parseFloat((t * eased).toFixed(decimals));
              }),
            );
            if (step >= steps) clearInterval(timer);
          }, interval);
        }
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [course.stats, statsVisible]);

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);
  const handleCloseStatusModal = () =>
    setPaymentStatus((prev) => ({ ...prev, isOpen: false }));

  const discount = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100,
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
        onClose={handleCloseStatusModal}
        status={paymentStatus.status}
        message={paymentStatus.message}
      />
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        amount={course.price}
        programName={course.title}
        onPaymentComplete={(status, message) => {
          setPaymentStatus({ isOpen: true, status, message });
          closePaymentModal();
        }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 bg-gradient-to-br from-primary-99 via-white to-primary-97 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-primary-90/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-80 bg-gradient-to-tl from-primary-95/30 to-transparent rounded-full blur-2xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left — text content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-primary-75 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg border border-primary-90/30">
                <Sparkles className="w-4 h-4" />
                {course.title}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-vietnam font-bold text-grey-15 mb-6 leading-tight">
                {course.title.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="bg-gradient-to-r from-primary-75 to-primary-90 bg-clip-text text-transparent">
                  {course.title.split(" ").slice(-2).join(" ")}
                </span>
              </h1>

              <p className="text-lg sm:text-xl lg:text-2xl text-primary-75 font-semibold mb-4">
                {course.subtitle}
              </p>

              <p className="text-grey-35 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                {course.description}
              </p>
            </div>

            {/* Right — lead capture form */}
            <div className="relative order-1 lg:order-2">
              <CourseLeadForm courseTitle={course.title} />
            </div>
          </div>

          {/* Stats strip — floating glassmorphism bar */}
          <div ref={statsRef} className="mt-12 sm:mt-16 -mb-16 relative z-30">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-grey-90/60 p-2 sm:p-3">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                {course.stats.map((stat, i) => {
                  const Icon = getIcon(stat.icon);
                  const colors = [
                    {
                      border: "border-emerald-500",
                      bg: "bg-emerald-50",
                      text: "text-emerald-600",
                      icon: "from-emerald-500 to-teal-500",
                    },
                    {
                      border: "border-blue-500",
                      bg: "bg-blue-50",
                      text: "text-blue-600",
                      icon: "from-blue-500 to-indigo-500",
                    },
                    {
                      border: "border-amber-500",
                      bg: "bg-amber-50",
                      text: "text-amber-600",
                      icon: "from-amber-500 to-orange-500",
                    },
                    {
                      border: "border-violet-500",
                      bg: "bg-violet-50",
                      text: "text-violet-600",
                      icon: "from-violet-500 to-purple-500",
                    },
                  ];
                  const c = colors[i % 4];

                  // Build the displayed value: replace the numeric part with animated value
                  const suffix = stat.value.replace(/[0-9.]/g, "").trim();
                  const targetNum = parseFloat(
                    stat.value.replace(/[^0-9.]/g, ""),
                  );
                  const decimals = (String(targetNum).split(".")[1] || "")
                    .length;
                  const displayVal =
                    animatedValues[i] !== undefined ?
                      `${decimals > 0 ? animatedValues[i].toFixed(decimals) : animatedValues[i].toLocaleString("en-IN")}${suffix ? " " + suffix : ""}`
                    : stat.value;

                  return (
                    <div
                      key={i}
                      className={`relative rounded-xl p-4 sm:p-6 text-center border-[3px] ${c.border} bg-gradient-to-b from-white to-slate-50/80 hover:shadow-lg transition-all duration-500 hover:-translate-y-0.5 group`}
                      style={{
                        opacity: statsVisible ? 1 : 0,
                        transform:
                          statsVisible ? "translateY(0)" : "translateY(16px)",
                        transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`,
                      }}
                    >
                      <div
                        className={`w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br ${c.icon} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <p
                        className={`text-2xl sm:text-3xl lg:text-4xl font-vietnam font-extrabold ${c.text} mb-1 tabular-nums`}
                      >
                        {displayVal}
                      </p>
                      <p className="text-grey-40 font-semibold text-xs sm:text-sm tracking-wide uppercase">
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
      <section className="pt-28 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-full text-sm font-bold mb-5 border border-emerald-100">
              <Sparkles size={16} />
              Why Choose This Program
            </div>
            <h2 className="text-3xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
              Program{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Highlights
              </span>
            </h2>
            <p className="text-grey-40 text-lg max-w-3xl mx-auto leading-relaxed">
              Comprehensive training designed to make you job-ready with
              industry-relevant skills and hands-on experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto auto-rows-auto">
            {course.features.map((feature, i) => {
              const Icon = getIcon(feature.icon);
              const accents = [
                {
                  border: "border-l-emerald-500",
                  bg: "hover:bg-emerald-50/50",
                  iconBg: "from-emerald-500 to-teal-500",
                  shadow: "hover:shadow-emerald-100",
                  badge: "bg-emerald-50 text-emerald-700 border-emerald-100",
                },
                {
                  border: "border-l-blue-500",
                  bg: "hover:bg-blue-50/50",
                  iconBg: "from-blue-500 to-indigo-500",
                  shadow: "hover:shadow-blue-100",
                  badge: "bg-blue-50 text-blue-700 border-blue-100",
                },
                {
                  border: "border-l-amber-500",
                  bg: "hover:bg-amber-50/50",
                  iconBg: "from-amber-500 to-orange-500",
                  shadow: "hover:shadow-amber-100",
                  badge: "bg-amber-50 text-amber-700 border-amber-100",
                },
                {
                  border: "border-l-violet-500",
                  bg: "hover:bg-violet-50/50",
                  iconBg: "from-violet-500 to-purple-500",
                  shadow: "hover:shadow-violet-100",
                  badge: "bg-violet-50 text-violet-700 border-violet-100",
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
                  key={i}
                  className={`group relative bg-white rounded-2xl border border-slate-100 border-l-4 ${a.border} ${a.bg} ${a.shadow} shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
                    isFeatured ?
                      "md:col-span-2 lg:col-span-1 lg:row-span-2 p-8 flex flex-col justify-between"
                    : isLastWide ? "md:col-span-2 lg:col-span-2 p-7"
                    : "p-7"
                  }`}
                >
                  {isFeatured ?
                    /* Featured card — vertical layout with larger icon */
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-5">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br ${a.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full border ${a.badge}`}
                        >
                          Featured
                        </span>
                      </div>
                      <h3 className="text-2xl font-vietnam font-bold text-grey-15 mb-3 group-hover:text-grey-10 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-grey-40 leading-relaxed text-[15px] flex-1">
                        {feature.description}
                      </p>
                      <div
                        className={`mt-5 w-full h-1 rounded-full bg-gradient-to-r ${a.iconBg} opacity-40 group-hover:opacity-100 transition-opacity duration-300`}
                      />
                    </div>
                  : /* Standard cards — horizontal layout */
                    <div className="flex items-start gap-5">
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${a.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-2 group-hover:text-grey-10 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-grey-40 leading-relaxed text-[15px]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  }
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PROGRAM BENEFITS — Interactive Tabs */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-50 to-transparent rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-violet-50 to-transparent rounded-full blur-3xl opacity-60" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-2.5 rounded-full text-sm font-bold mb-5 border border-blue-100">
              <Zap size={16} />
              What You&apos;ll Get
            </div>
            <h2 className="text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
              Program{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Benefits
              </span>
            </h2>
            <p className="text-grey-40 text-lg max-w-3xl mx-auto leading-relaxed">
              Unlock your potential with our exclusive program advantages
            </p>
          </div>

          {/* Desktop: sidebar tabs */}
          <div className="hidden lg:grid lg:grid-cols-[320px_1fr] gap-8 max-w-6xl mx-auto">
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
                    key={i}
                    onClick={() => setActiveBenefitTab(i)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-300 ${
                      isActive ?
                        `bg-white shadow-lg ring-2 ${tc.ring} scale-[1.02]`
                      : "bg-white/50 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isActive ?
                          `bg-gradient-to-br ${tc.active} shadow-md`
                        : "bg-slate-100"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${isActive ? "text-white" : "text-grey-40"}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`font-vietnam font-bold text-[15px] transition-colors ${
                          isActive ? "text-grey-15" : "text-grey-40"
                        }`}
                      >
                        {highlight.category}
                      </h4>
                    </div>
                    {isActive && (
                      <ArrowRight className="w-4 h-4 text-grey-40 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content panel */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 min-h-[320px]">
              {course.highlights[activeBenefitTab] &&
                (() => {
                  const h = course.highlights[activeBenefitTab];
                  const Icon = getIcon(h.icon);
                  const panelColors = [
                    {
                      gradient: "from-emerald-500 to-teal-500",
                      dot: "bg-emerald-500",
                      badge: "bg-emerald-50 text-emerald-700",
                    },
                    {
                      gradient: "from-blue-500 to-indigo-500",
                      dot: "bg-blue-500",
                      badge: "bg-blue-50 text-blue-700",
                    },
                    {
                      gradient: "from-amber-500 to-orange-500",
                      dot: "bg-amber-500",
                      badge: "bg-amber-50 text-amber-700",
                    },
                    {
                      gradient: "from-violet-500 to-purple-500",
                      dot: "bg-violet-500",
                      badge: "bg-violet-50 text-violet-700",
                    },
                  ];
                  const pc = panelColors[activeBenefitTab % 4];

                  return (
                    <div
                      key={activeBenefitTab}
                      className="animate-in fade-in slide-in-from-right-4 duration-300"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div
                          className={`w-14 h-14 bg-gradient-to-br ${pc.gradient} rounded-2xl flex items-center justify-center shadow-md`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-vietnam font-bold text-grey-15">
                            {h.category}
                          </h3>
                          <span
                            className={`inline-block mt-1 text-xs font-bold px-3 py-1 rounded-full ${pc.badge}`}
                          >
                            {h.points.length} benefits included
                          </span>
                        </div>
                      </div>
                      <ul className="space-y-4">
                        {h.points.map((point, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 group/point"
                          >
                            <div
                              className={`w-2 h-2 ${pc.dot} rounded-full mt-2 flex-shrink-0 group-hover/point:scale-150 transition-transform`}
                            />
                            <span className="text-grey-35 leading-relaxed text-[15px]">
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
          <div className="lg:hidden space-y-4 max-w-2xl mx-auto">
            {course.highlights.map((highlight, i) => {
              const Icon = getIcon(highlight.icon);
              const mobileColors = [
                {
                  border: "border-l-emerald-500",
                  iconBg: "from-emerald-500 to-teal-500",
                  dot: "bg-emerald-500",
                },
                {
                  border: "border-l-blue-500",
                  iconBg: "from-blue-500 to-indigo-500",
                  dot: "bg-blue-500",
                },
                {
                  border: "border-l-amber-500",
                  iconBg: "from-amber-500 to-orange-500",
                  dot: "bg-amber-500",
                },
                {
                  border: "border-l-violet-500",
                  iconBg: "from-violet-500 to-purple-500",
                  dot: "bg-violet-500",
                },
              ];
              const mc = mobileColors[i % 4];

              return (
                <details
                  key={i}
                  className={`group bg-white rounded-xl border border-slate-100 border-l-4 ${mc.border} shadow-sm overflow-hidden`}
                >
                  <summary className="flex items-center gap-3 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${mc.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-vietnam font-bold text-grey-15 flex-1">
                      {highlight.category}
                    </h4>
                    <ChevronDown className="w-5 h-5 text-grey-40 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 pt-1">
                    <ul className="space-y-3">
                      {highlight.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div
                            className={`w-1.5 h-1.5 ${mc.dot} rounded-full mt-2 flex-shrink-0`}
                          />
                          <span className="text-grey-35 leading-relaxed text-sm">
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
      <section className="py-20 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-full text-sm font-bold mb-5 border border-emerald-100">
              <GraduationCap size={16} />
              Your Learning Journey
            </div>
            <h2 className="text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
              What You&apos;ll{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Learn
              </span>
            </h2>
            <p className="text-grey-35 text-lg max-w-3xl mx-auto leading-relaxed">
              A structured 5-step journey from learning to career placement
            </p>
          </div>

          <div className="space-y-8 max-w-6xl mx-auto">
            {/* ── Section 1: Course Curriculum ── */}
            <div className="rounded-3xl overflow-hidden shadow-lg">
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 sm:px-8 py-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-xl">
                      1
                    </div>
                    <div>
                      <h3 className="text-2xl font-vietnam font-bold text-white">
                        Course Curriculum
                      </h3>
                      <p className="text-emerald-100 text-sm mt-1 max-w-2xl">
                        Our course is designed by industry experts for excellent
                        academic and industrial experience.
                      </p>
                    </div>
                  </div>
                  {course.duration && (
                    <div className="hidden sm:flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Calendar className="w-4 h-4 text-white" />
                      <span className="text-white font-bold text-sm">
                        {course.duration}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content with sidebar tabs */}
              <div className="bg-white">
                {/* Desktop: sidebar + content */}
                <div className="hidden md:grid md:grid-cols-[320px_1fr] h-[650px]">
                  {/* Module sidebar */}
                  <div className="border-r border-slate-100 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent">
                    {course.modules.map((mod, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveCurriculumTab(i)}
                        className={`w-full flex items-center justify-between px-5 py-4 text-left transition-all duration-200 border-l-3 ${
                          activeCurriculumTab === i ?
                            "bg-emerald-50/60 border-l-emerald-500 border-l-[3px]"
                          : "border-l-transparent hover:bg-slate-50 border-l-[3px]"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-grey-50 font-medium">
                            Module {i + 1}
                          </p>
                          <p
                            className={`font-vietnam font-bold text-sm mt-0.5 ${
                              activeCurriculumTab === i ? "text-emerald-700" : (
                                "text-grey-25"
                              )
                            }`}
                          >
                            {mod.title}
                          </p>
                        </div>
                        {activeCurriculumTab === i && (
                          <ChevronRight className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Topic content */}
                  <div className="p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent">
                    {course.modules[activeCurriculumTab] &&
                      (() => {
                        const mod = course.modules[activeCurriculumTab];
                        return (
                          <div key={activeCurriculumTab}>
                            <h4 className="text-xl font-vietnam font-bold text-grey-15 mb-1">
                              {mod.title}
                            </h4>
                            {(mod.duration || mod.description) && (
                              <p className="text-sm text-grey-40 mb-6">
                                Description: {mod.description}
                              </p>
                            )}
                            <div className="border-t border-slate-100 pt-6 space-y-6">
                              {mod.submodules?.map((submod, idx) => (
                                <div key={idx}>
                                  <h5 className="font-vietnam font-bold text-lg text-grey-15 mb-3">
                                    {submod.title}
                                  </h5>

                                  {submod.subtopics?.length > 0 && (
                                    <div className="mb-4">
                                      <p className="text-sm font-bold text-grey-30 uppercase tracking-wider mb-2">
                                        Topics:
                                      </p>
                                      <ul className="space-y-2">
                                        {submod.subtopics.map((topic, j) => (
                                          <li
                                            key={j}
                                            className="flex items-start gap-3"
                                          >
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-grey-35 leading-relaxed text-[15px]">
                                              {topic}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {submod.handsOn?.length > 0 && (
                                    <div>
                                      <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-2">
                                        Hands-on:
                                      </p>
                                      <ul className="space-y-2">
                                        {submod.handsOn.map((item, j) => (
                                          <li
                                            key={j}
                                            className="flex items-start gap-3"
                                          >
                                            <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0" />
                                            <span className="text-grey-35 leading-relaxed text-[15px]">
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
                <div className="md:hidden p-4">
                  <Accordion type="single" collapsible className="space-y-2">
                    {course.modules.map((mod, i) => (
                      <AccordionItem
                        key={i}
                        value={`curriculum-${i}`}
                        className="border border-slate-100 rounded-xl overflow-hidden"
                      >
                        <AccordionTrigger className="px-4 py-3 hover:no-underline text-left">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                              {i + 1}
                            </div>
                            <div>
                              <p className="font-vietnam font-bold text-sm text-grey-15">
                                {mod.title}
                              </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="space-y-4 ml-11">
                            {mod.submodules?.map((submod, idx) => (
                              <div key={idx}>
                                <h5 className="font-vietnam font-bold text-sm text-grey-15 mb-2">
                                  {submod.title}
                                </h5>

                                {submod.subtopics?.length > 0 && (
                                  <ul className="space-y-1 mb-2">
                                    {submod.subtopics.map((topic, j) => (
                                      <li
                                        key={j}
                                        className="flex items-start gap-2 text-grey-35 text-sm"
                                      >
                                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                        <span>{topic}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}

                                {submod.handsOn?.length > 0 && (
                                  <ul className="space-y-1">
                                    {submod.handsOn.map((item, j) => (
                                      <li
                                        key={`ho-${j}`}
                                        className="flex items-start gap-2 text-grey-35 text-sm"
                                      >
                                        <Code className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
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
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 flex justify-center py-3">
                <ChevronDown className="w-6 h-6 text-white animate-bounce" />
              </div>
            </div>

            {/* ── Section 2: Placement Readiness Test (PRT) ── */}
            {course.isJobGuaranteeProgram &&
              course.prtSteps &&
              course.prtSteps.length > 0 && (
                <div className="rounded-3xl overflow-hidden shadow-lg">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 sm:px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-xl">
                        2
                      </div>
                      <div>
                        <h3 className="text-2xl font-vietnam font-bold text-white">
                          Placement Readiness Test (PRT)
                        </h3>
                        <p className="text-emerald-100 text-sm mt-1">
                          To become eligible for our Job Guarantee Program,
                          complete these milestones:
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-b from-emerald-50 to-white p-6 sm:p-8">
                    {(() => {
                      const prtSteps = course.prtSteps!;
                      const prtColors = [
                        "from-emerald-500 to-teal-500",
                        "from-blue-500 to-indigo-500",
                        "from-violet-500 to-purple-500",
                      ];
                      const prtIcons = [Check, Target, Award];
                      return (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                          {prtSteps.map((step, idx) => (
                            <div
                              key={idx}
                              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                            >
                              <div
                                className={`w-14 h-14 bg-gradient-to-br ${prtColors[idx % prtColors.length]} rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-md`}
                              >
                                {idx + 1}
                              </div>
                              <h4 className="font-vietnam font-bold text-grey-15 text-lg mb-3">
                                {step.title}
                              </h4>
                              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                                {(() => {
                                  const Icon = prtIcons[idx % prtIcons.length];
                                  return (
                                    <Icon className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
                                  );
                                })()}
                                <p className="text-sm text-grey-35 leading-relaxed">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>

                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 flex justify-center py-3">
                    <ChevronDown className="w-6 h-6 text-white animate-bounce" />
                  </div>
                </div>
              )}

            {/* ── Section 3: Sign ISA Agreement ── */}
            {course.isJobGuaranteeProgram &&
              course.isaSteps &&
              course.isaSteps.length > 0 && (
                <div className="rounded-3xl overflow-hidden shadow-lg">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 sm:px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-xl">
                        3
                      </div>
                      <div>
                        <h3 className="text-2xl font-vietnam font-bold text-white">
                          Sign ISA Agreement
                        </h3>
                        <p className="text-emerald-100 text-sm mt-1">
                          Pay INR{" "}
                          {(course.careerServiceFee || 20000).toLocaleString(
                            "en-IN",
                          )}{" "}
                          to Eduwise Solutions as a career services fee after
                          placement.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-b from-emerald-50 to-white p-6 sm:p-8">
                    {(() => {
                      const isaSteps = course.isaSteps!;
                      const isaColors = [
                        "from-emerald-500 to-teal-500",
                        "from-blue-500 to-indigo-500",
                        "from-violet-500 to-purple-500",
                      ];
                      const isaIcons = [FileText, UserCheck, Banknote];
                      return (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                          {isaSteps.map((step, idx) => (
                            <div
                              key={idx}
                              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                            >
                              <div
                                className={`w-16 h-16 bg-gradient-to-br ${isaColors[idx % isaColors.length]} bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-4`}
                              >
                                {(() => {
                                  const Icon = isaIcons[idx % isaIcons.length];
                                  return (
                                    <Icon className="w-8 h-8 text-white" />
                                  );
                                })()}
                              </div>
                              <h4 className="font-vietnam font-bold text-grey-15 text-lg mb-1">
                                {step.title}
                              </h4>
                              <p className="text-sm text-grey-40">
                                {step.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>

                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 flex justify-center py-3">
                    <ChevronDown className="w-6 h-6 text-white animate-bounce" />
                  </div>
                </div>
              )}

            {/* ── Section 4: Career Track ── */}
            {course.isJobGuaranteeProgram &&
              course.careerTrack &&
              course.careerTrack.length > 0 && (
                <div className="rounded-3xl overflow-hidden shadow-lg">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 sm:px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-xl">
                        4
                      </div>
                      <div>
                        <h3 className="text-2xl font-vietnam font-bold text-white">
                          Career Track
                        </h3>
                        <p className="text-emerald-100 text-sm mt-1">
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
                          <div className="hidden md:grid md:grid-cols-[320px_1fr] min-h-[600px]">
                            <div className="border-r border-slate-100 py-4">
                              {careerTrackItems.map((item, i) => (
                                <button
                                  key={i}
                                  onClick={() => setActiveCareerTrackTab(i)}
                                  className={`w-full flex items-center justify-between px-5 py-4 text-left transition-all duration-200 border-l-[3px] ${
                                    activeCareerTrackTab === i ?
                                      "bg-emerald-50/60 border-l-emerald-500"
                                    : "border-l-transparent hover:bg-slate-50"
                                  }`}
                                >
                                  <div className="flex-1 min-w-0">
                                    <p
                                      className={`font-vietnam font-bold text-sm ${
                                        activeCareerTrackTab === i ?
                                          "text-emerald-700"
                                        : "text-grey-25"
                                      }`}
                                    >
                                      {item.title}
                                    </p>
                                    <p className="text-xs text-grey-50 mt-0.5 truncate">
                                      {item.description}
                                    </p>
                                  </div>
                                  {activeCareerTrackTab === i && (
                                    <ChevronRight className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                  )}
                                </button>
                              ))}
                            </div>

                            <div className="p-8">
                              {careerTrackItems[activeCareerTrackTab] && (
                                <div key={activeCareerTrackTab}>
                                  <h4 className="text-xl font-vietnam font-bold text-grey-15 mb-1">
                                    {
                                      careerTrackItems[activeCareerTrackTab]
                                        .title
                                    }
                                  </h4>
                                  <p className="text-sm text-grey-40 mb-6">
                                    {
                                      careerTrackItems[activeCareerTrackTab]
                                        .description
                                    }
                                  </p>
                                  <div className="border-t border-slate-100 pt-6">
                                    <p className="text-sm font-bold text-grey-30 uppercase tracking-wider mb-4">
                                      What You&apos;ll Learn:
                                    </p>
                                    <ul className="space-y-3">
                                      {careerTrackItems[
                                        activeCareerTrackTab
                                      ].topics.map((topic, j) => (
                                        <li
                                          key={j}
                                          className="flex items-start gap-3"
                                        >
                                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                                          <span className="text-grey-35 leading-relaxed text-[15px]">
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
                          <div className="md:hidden p-4 space-y-3">
                            {careerTrackItems.map((item, i) => (
                              <details
                                key={i}
                                className="group bg-slate-50 rounded-xl border border-slate-100 overflow-hidden"
                              >
                                <summary className="flex items-center gap-3 p-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                                  <Briefcase className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                  <span className="font-vietnam font-bold text-sm text-grey-15 flex-1">
                                    {item.title}
                                  </span>
                                  <ChevronDown className="w-4 h-4 text-grey-40 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="px-4 pb-4">
                                  <ul className="space-y-2 ml-8">
                                    {item.topics.map((topic, j) => (
                                      <li
                                        key={j}
                                        className="flex items-start gap-2 text-grey-35 text-sm"
                                      >
                                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
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

                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 flex justify-center py-3">
                    <ChevronDown className="w-6 h-6 text-white animate-bounce" />
                  </div>
                </div>
              )}

            {/* ── Section 5: Pay Career Services Fee & Hiring Partners ── */}
            {course.isJobGuaranteeProgram &&
              course.hiringPartners &&
              course.hiringPartners.length > 0 && (
                <div className="rounded-3xl overflow-hidden shadow-lg">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 sm:px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-xl">
                        5
                      </div>
                      <div>
                        <h3 className="text-2xl font-vietnam font-bold text-white">
                          Pay Career Services Fee
                        </h3>
                        <p className="text-emerald-100 text-sm mt-1">
                          Only pay after you receive an offer letter. Our hiring
                          partners are waiting for you!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-b from-emerald-50 to-white p-6 sm:p-10">
                    <p className="text-center text-grey-35 mb-8 text-lg font-medium">
                      Our Hiring Partners
                    </p>
                    {(() => {
                      const partners = course.hiringPartners!;
                      return (
                        <>
                          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                            {partners.map((partner, i) => (
                              <div
                                key={i}
                                className="bg-white rounded-xl border border-slate-100 p-4 flex flex-col items-center justify-center h-20 shadow-sm hover:shadow-md transition-shadow hover:border-emerald-200 group"
                              >
                                {partner.logoUrl ?
                                  <Image
                                    src={partner.logoUrl}
                                    alt={partner.name}
                                    width={120}
                                    height={40}
                                    className="object-contain h-full w-full group-hover:scale-110 transition-transform"
                                    unoptimized
                                  />
                                : <>
                                    <Building className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors mb-1" />
                                    <span className="text-xs font-bold text-grey-30 text-center leading-tight">
                                      {partner.name}
                                    </span>
                                  </>
                                }
                              </div>
                            ))}
                          </div>
                          <div className="text-center mt-8">
                            <p className="text-sm text-grey-40">
                              Career services fee:{" "}
                              <span className="font-bold text-emerald-700">
                                INR{" "}
                                {(
                                  course.careerServiceFee || 20000
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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Code size={16} />
                Tech Stack
              </div>
              <h2 className="text-3xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
                Tools & Technologies
              </h2>
              <p className="text-grey-35 text-lg max-w-3xl mx-auto">
                Master industry-standard tools used by top companies
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 max-w-5xl mx-auto">
              {course.tools.map((tool, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-primary-99 transition-colors duration-200 group shadow-md"
                >
                  {tool.logoUrl ?
                    <Image
                      src={tool.logoUrl}
                      alt={tool.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-contain group-hover:scale-110 transition-transform shadow-none"
                    />
                  : <div className="w-12 h-12 bg-gradient-to-br from-primary-75 to-primary-90 rounded-xl flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                  }
                  <span className="text-xs text-grey-35 font-medium text-center">
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
        <section className="py-20 bg-light-97">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Users size={16} />
                Who Is This For
              </div>
              <h2 className="text-3xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
                Perfect For You
              </h2>
              <p className="text-grey-35 text-lg max-w-3xl mx-auto">
                This program is designed for individuals from various
                backgrounds
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {course.targetAudience.map((target, i) => {
                const Icon = getIcon(target.icon);
                return (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-8 text-center shadow-lg border border-light-90 hover:border-primary-90 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-75 to-primary-90 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-vietnam font-bold text-grey-15">
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
        <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-gradient-to-br from-teal-50 to-transparent rounded-full blur-3xl opacity-60" />
            <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-emerald-50 to-transparent rounded-full blur-3xl opacity-60" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-5 py-2.5 rounded-full text-sm font-bold mb-5 border border-teal-100">
                <TrendingUp size={16} />
                Career Paths
              </div>
              <h2 className="text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
                Career{" "}
                <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                  Opportunities
                </span>
              </h2>
              <p className="text-grey-40 text-lg max-w-3xl mx-auto leading-relaxed">
                Join the fastest-growing tech domain with lucrative salary
                packages
              </p>

              {course.industryGrowth && (
                <div className="inline-flex items-center gap-2 mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-2.5 rounded-xl border border-emerald-100">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  <span className="text-grey-40 text-sm font-medium">
                    Industry Growth:
                  </span>
                  <span className="text-emerald-700 font-bold text-lg">
                    {course.industryGrowth}
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
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
                    key={i}
                    className={`group relative bg-white rounded-2xl p-6 border border-slate-100 border-t-[3px] ${cc.border} shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${cc.iconBg} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-100">
                        High Demand
                      </span>
                    </div>
                    <h4 className="font-vietnam font-bold text-grey-15 text-lg mb-3 group-hover:text-grey-10 transition-colors">
                      {career.title}
                    </h4>
                    {career.salary && (
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-grey-40" />
                        <p className={`text-xl font-bold ${cc.text}`}>
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
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-violet-50 to-transparent rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-gradient-to-tl from-blue-50 to-transparent rounded-full blur-3xl opacity-50" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 px-5 py-2.5 rounded-full text-sm font-bold mb-5 border border-violet-100">
              <IndianRupee size={16} />
              Program Investment
            </div>
            <h2 className="text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-4">
              Invest in Your{" "}
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Future
              </span>
            </h2>
            <p className="text-grey-40 text-lg max-w-2xl mx-auto">
              Best value in the market with everything you need to succeed
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            {/* Pricing card */}
            <div className="relative">
              {/* Discount badge */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 rounded-full shadow-lg font-bold text-sm tracking-wide flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {discount}% OFF — Limited Time
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-[0_8px_50px_rgba(0,0,0,0.08)] border-2 border-violet-100 overflow-hidden">
                {/* Price hero */}
                <div className="bg-gradient-to-br from-violet-50 via-white to-purple-50 px-8 pt-14 pb-8 text-center border-b border-violet-100">
                  <p className="text-grey-40 font-semibold text-sm uppercase tracking-wider mb-4">
                    One-time Payment
                  </p>
                  <div className="mb-4">
                    <p className="text-6xl sm:text-7xl font-vietnam font-extrabold text-grey-15">
                      ₹{course.price.toLocaleString("en-IN")}
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-3">
                      <p className="text-grey-50 line-through text-xl">
                        ₹{course.originalPrice.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-2.5 rounded-xl border border-emerald-200">
                    <span className="text-emerald-700 font-bold text-base">
                      🎉 You Save ₹{saving.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Inclusions + CTA */}
                <div className="p-8">
                  {/* What's included */}
                  {course.whatsIncluded && course.whatsIncluded.length > 0 && (
                    <div className="mb-6 space-y-3">
                      <p className="text-grey-30 font-bold text-xs uppercase tracking-wider mb-4">
                        What&apos;s Included
                      </p>
                      {course.whatsIncluded.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-emerald-600" />
                          </div>
                          <span className="text-grey-35 text-sm font-medium">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* EMI option */}
                  {course.emiOption && (
                    <div className="bg-blue-50 rounded-xl p-4 mb-6 text-center border border-blue-100">
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
                      onClick={openPaymentModal}
                      className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xl px-8 py-7 font-bold hover:from-violet-700 hover:to-purple-700 transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-2xl rounded-2xl"
                    >
                      Enroll Now
                      <ArrowRight className="ml-3 w-6 h-6" />
                    </Button>

                    <div className="flex items-center justify-center gap-6 pt-2 text-grey-50 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-4 h-4" />
                        <span>Secure Payment</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4" />
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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <HelpCircle className="w-4 h-4" />
                FAQ
              </div>
              <h2 className="text-4xl md:text-5xl font-vietnam font-bold text-grey-15 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-grey-40 text-lg max-w-2xl mx-auto">
                Everything you need to know about our {course.title} course
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <div className="grid md:grid-cols-2 gap-6">
                  {course.faq.map((item, i) => (
                    <AccordionItem
                      key={i}
                      value={`faq-${i}`}
                      className="border-0 bg-grey-99 rounded-2xl p-6 hover:bg-primary-99 transition-all duration-300 hover:shadow-lg"
                    >
                      <AccordionTrigger className="text-left font-vietnam font-bold text-lg text-grey-15 hover:text-primary-75 transition-colors hover:no-underline [&[data-state=open]]:text-primary-75 pb-4">
                        <div className="flex items-start gap-3 w-full pr-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-75 text-white flex items-center justify-center text-sm font-bold">
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
            <div className="text-center mt-16">
              <p className="text-grey-30 text-lg mb-6">
                Still have questions? We&apos;re here to help!
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary-75 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-60 transition-all duration-300 hover:shadow-xl"
              >
                Contact Our Team
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
