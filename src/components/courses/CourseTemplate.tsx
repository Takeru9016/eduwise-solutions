"use client";

import { gsap } from "gsap";
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
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type {
  CareerTrackItem,
  CourseContent,
  CourseTool,
  ISAStep,
  PRTStep,
} from "@/types/course";
import GoogleReviews from "../common/GoogleReviews";
import RefundHighlight from "../common/RefundHighlight";
import PaymentModal from "../payment/PaymentModal";
import PaymentStatusModal from "../payment/PaymentStatusModal";
import CourseLeadForm from "./CourseLeadForm";
import PlacementSection from "./PlacementSection";

const ICON_MAP: Record<string, LucideIcon> = {
  Award,
  Banknote,
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  ChevronDown,
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

const CARD_TINTS = [
  "bg-primary-99",
  "bg-gold-90",
  "bg-white",
  "bg-primary-90",
  "bg-light-95",
  "bg-primary-95",
] as const;

interface JGStep {
  content: React.ReactNode;
  description: string;
  title: string;
}

function useStaggerReveal<T extends HTMLElement>(count: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(T | null)[]>([]);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean);
    if (!items.length) {
      return;
    }
    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: 24 },
      {
        duration: 0.5,
        ease: "power2.out",
        opacity: 1,
        scrollTrigger: { start: "top 80%", trigger: containerRef.current },
        stagger: 0.08,
        y: 0,
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [count]);

  return { containerRef, itemRefs };
}

function buildJGSteps(course: CourseContent): JGStep[] {
  const jgSteps: JGStep[] = [];
  if (!course.isJobGuaranteeProgram) {
    return jgSteps;
  }
  if (course.prtSteps?.length) {
    jgSteps.push({
      content: <PRTStepsGrid steps={course.prtSteps} />,
      description:
        "To become eligible for our Job Guarantee Program, complete these milestones.",
      title: "Placement Readiness Test (PRT)",
    });
  }
  if (course.isaSteps?.length) {
    jgSteps.push({
      content: <ISAStepsGrid steps={course.isaSteps} />,
      description: `Pay INR ${(course.careerServiceFee ?? 20_000).toLocaleString("en-IN")} to Eduwise Solutions as a career services fee after placement.`,
      title: "Sign ISA Agreement",
    });
  }
  if (course.careerTrack?.length) {
    jgSteps.push({
      content: <CareerTrackPanel items={course.careerTrack} />,
      description:
        "Access a wide range of resources to become a job-ready candidate with our dedicated placement team.",
      title: "Career Track",
    });
  }
  if (course.hiringPartners?.length) {
    jgSteps.push({
      content: (
        <HiringPartnersGrid
          careerServiceFee={course.careerServiceFee}
          partners={course.hiringPartners}
        />
      ),
      description:
        "Only pay after you receive an offer letter. Our hiring partners are waiting for you!",
      title: "Pay Career Services Fee",
    });
  }
  return jgSteps;
}

interface CourseTemplateProps {
  course: CourseContent;
}

export default function CourseTemplate({ course }: CourseTemplateProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<{
    isOpen: boolean;
    status: "success" | "failure" | "cancelled";
    message?: string;
  }>({
    isOpen: false,
    status: "success",
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const features = useStaggerReveal<HTMLDivElement>(course.features.length);
  const targetAudience = useStaggerReveal<HTMLDivElement>(
    course.targetAudience?.length ?? 0
  );
  const careerPaths = useStaggerReveal<HTMLDivElement>(
    course.careerPaths?.length ?? 0
  );

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

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);
  const handleCloseStatusModal = () =>
    setPaymentStatus((prev) => ({ ...prev, isOpen: false }));

  const discount = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );
  const saving = course.originalPrice - course.price;

  const jgSteps = buildJGSteps(course);

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

      {/* HERO */}
      <section className="bg-light-97 py-16 sm:py-20 lg:py-24" ref={heroRef}>
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_460px] lg:gap-14">
            <div className="text-center lg:text-left">
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-semibold text-grey-15 text-sm"
                data-reveal
              >
                <Sparkles className="h-4 w-4" />
                {course.subtitle}
              </div>

              <h1
                className="mb-4 font-black font-vietnam text-3xl text-grey-15 tracking-tight sm:mb-6 sm:text-4xl md:text-5xl"
                data-reveal
              >
                {course.title}
              </h1>

              <p
                className="mx-auto mb-8 max-w-2xl px-2 text-base text-grey-40 leading-relaxed sm:text-lg lg:mx-0 lg:px-0"
                data-reveal
              >
                {course.description}
              </p>

              <div
                className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start"
                data-reveal
              >
                {course.duration && (
                  <div className="flex items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-3 py-2 sm:gap-3 sm:px-5 sm:py-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-99 sm:h-10 sm:w-10">
                      <Calendar className="h-4 w-4 text-grey-15 sm:h-5 sm:w-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold font-vietnam text-grey-15 text-sm leading-tight sm:text-base">
                        {course.duration}
                      </p>
                      <p className="text-[10px] text-grey-40 leading-tight sm:text-xs">
                        Duration
                      </p>
                    </div>
                  </div>
                )}
                {course.stats.map((stat) => {
                  const Icon = getIcon(stat.icon);
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

              {course.heroImageUrl && (
                <div
                  className="relative mt-10 h-100 w-full overflow-hidden rounded-3xl border-2 border-grey-15"
                  data-reveal
                >
                  <Image
                    alt={course.title}
                    className="object-cover"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 704px"
                    src={course.heroImageUrl}
                  />
                </div>
              )}
            </div>

            <div data-reveal>
              {course.batchInfo && (
                <div className="mb-4 flex items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-4 py-2 text-sm">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-primary-75" />
                  <span className="font-bold text-grey-15">
                    {course.batchInfo.status}
                  </span>
                  <span className="text-grey-40">
                    · {course.batchInfo.enrolledCount} ·{" "}
                    {course.batchInfo.label}
                  </span>
                </div>
              )}
              <CourseLeadForm courseTitle={course.title} />
            </div>
          </div>
        </div>
      </section>

      {course.slug.current.toLowerCase() === "devops" && <RefundHighlight />}

      <div className="container space-y-16 py-12 sm:py-16 lg:py-20">
        {/* PROGRAM HIGHLIGHTS */}
        <section>
          <h2 className="mb-8 font-black font-vietnam text-2xl text-grey-15 sm:text-3xl">
            Program Highlights
          </h2>
          <div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            ref={features.containerRef}
          >
            {course.features.map((feature, i) => {
              const Icon = getIcon(feature.icon);
              const tint = CARD_TINTS[i % CARD_TINTS.length];
              return (
                <div
                  className={`flex flex-col gap-3 rounded-2xl border-2 border-grey-15 p-6 shadow-[4px_4px_0_0_var(--color-grey-15)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-grey-15)] ${tint}`}
                  key={feature.title}
                  ref={(el) => {
                    features.itemRefs.current[i] = el;
                  }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-white">
                    <Icon className="h-6 w-6 text-grey-15" />
                  </div>
                  <h3 className="font-bold font-vietnam text-grey-15 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-grey-35 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* PROGRAM BENEFITS */}
        {course.highlights.length > 0 && (
          <section>
            <h2 className="mb-8 font-black font-vietnam text-2xl text-grey-15 sm:text-3xl">
              Program Benefits
            </h2>
            <Accordion
              className="space-y-3"
              collapsible
              defaultValue="benefit-0"
              type="single"
            >
              {course.highlights.map((highlight, i) => {
                const Icon = getIcon(highlight.icon);
                return (
                  <AccordionItem
                    className="overflow-hidden rounded-2xl border-2 border-grey-15 bg-white"
                    key={highlight.category}
                    value={`benefit-${i}`}
                  >
                    <AccordionTrigger className="gap-3 px-5 py-4 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90">
                          <Icon className="h-5 w-5 text-grey-15" />
                        </div>
                        <span className="font-bold font-vietnam text-grey-15">
                          {highlight.category}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pl-17">
                      <ul className="space-y-2.5">
                        {highlight.points.map((point) => (
                          <li className="flex items-start gap-2.5" key={point}>
                            <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-75" />
                            <span className="text-grey-35 text-sm leading-relaxed">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </section>
        )}

        {/* CURRICULUM - OPEN ROADMAP */}
        <section>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-black font-vietnam text-2xl text-grey-15 sm:text-3xl">
              Course Curriculum
            </h2>
            {course.duration && (
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-bold text-grey-15 text-sm">
                <Calendar className="h-4 w-4" />
                {course.duration}
              </span>
            )}
          </div>
          <Accordion
            className="space-y-6"
            collapsible
            defaultValue="module-0"
            type="single"
          >
            {course.modules.map((mod, i) => (
              <div className="flex gap-4 sm:gap-6" key={mod.title}>
                <div className="flex flex-col items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90 font-bold text-grey-15 text-sm">
                    {i + 1}
                  </div>
                  {i < course.modules.length - 1 && (
                    <div className="mt-2 w-0.5 flex-1 bg-grey-15/15" />
                  )}
                </div>

                <AccordionItem
                  className="min-w-0 flex-1 overflow-hidden rounded-3xl border-2 border-grey-15 bg-white"
                  value={`module-${i}`}
                >
                  <AccordionTrigger className="gap-3 px-5 py-4 hover:no-underline sm:px-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 text-left">
                      <h3 className="font-bold font-vietnam text-grey-15 text-lg">
                        {mod.title}
                      </h3>
                      {mod.duration && (
                        <span className="shrink-0 text-grey-40 text-xs">
                          {mod.duration}
                        </span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-6 sm:px-6">
                    {mod.description && (
                      <p className="mb-4 text-grey-35 text-sm leading-relaxed">
                        {mod.description}
                      </p>
                    )}
                    <div className="space-y-4">
                      {mod.submodules?.map((submod) => (
                        <div key={submod.title}>
                          <h5 className="mb-2 font-bold font-vietnam text-grey-15 text-sm">
                            {submod.title}
                          </h5>
                          {submod.subtopics?.length > 0 && (
                            <div className="mb-2 flex flex-wrap gap-2">
                              {submod.subtopics.map((topic) => (
                                <span
                                  className="inline-flex items-center gap-1.5 rounded-full border border-grey-15/15 bg-light-97 px-3 py-1 text-grey-35 text-xs"
                                  key={topic}
                                >
                                  <Check className="h-3 w-3 shrink-0 text-primary-75" />
                                  {topic}
                                </span>
                              ))}
                            </div>
                          )}
                          {submod.handsOn?.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {submod.handsOn.map((item) => (
                                <span
                                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-grey-15 bg-primary-90 px-3 py-1 font-medium text-grey-15 text-xs"
                                  key={item}
                                >
                                  <Code className="h-3 w-3 shrink-0" />
                                  {item}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </section>

        {/* JOB GUARANTEE TRACK */}
        {jgSteps.length > 0 && (
          <section>
            <h2 className="mb-2 font-black font-vietnam text-2xl text-grey-15 sm:text-3xl">
              Job Guarantee Track
            </h2>
            <p className="mb-8 text-grey-40">
              Your path from graduation to a confirmed offer letter.
            </p>
            <div className="space-y-6">
              {jgSteps.map((step, i) => (
                <div
                  className="overflow-hidden rounded-3xl border-2 border-grey-15"
                  key={step.title}
                >
                  <div className="flex items-center gap-4 bg-grey-15 px-6 py-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white/30 font-bold text-white">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold font-vietnam text-lg text-white">
                        {step.title}
                      </h3>
                      <p className="mt-0.5 text-sm text-white/70">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-6 sm:p-8">{step.content}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TOOLS */}
        {course.tools && course.tools.length > 0 && (
          <section>
            <h2 className="mb-8 font-black font-vietnam text-2xl text-grey-15 sm:text-3xl">
              Tools &amp; Technologies
            </h2>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
              {course.tools.map((tool) => (
                <div
                  className="flex flex-col items-center gap-2 rounded-2xl border-2 border-grey-15 bg-white p-4"
                  key={tool.name}
                >
                  {tool.logoUrl ? (
                    <Image
                      alt={tool.name}
                      className="h-10 w-10 object-contain"
                      height={40}
                      src={tool.logoUrl}
                      width={40}
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90">
                      <Code className="h-5 w-5 text-grey-15" />
                    </div>
                  )}
                  <span className="text-center font-bold text-grey-35 text-xs">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TARGET AUDIENCE */}
        {course.targetAudience && course.targetAudience.length > 0 && (
          <section>
            <h2 className="mb-8 font-black font-vietnam text-2xl text-grey-15 sm:text-3xl">
              Who Is This For
            </h2>
            <div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              ref={targetAudience.containerRef}
            >
              {course.targetAudience.map((target, i) => {
                const Icon = getIcon(target.icon);
                return (
                  <div
                    className="flex items-center gap-4 rounded-2xl border-2 border-grey-15 bg-white p-5"
                    key={target.title}
                    ref={(el) => {
                      targetAudience.itemRefs.current[i] = el;
                    }}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90">
                      <Icon className="h-5 w-5 text-grey-15" />
                    </div>
                    <p className="font-bold font-vietnam text-grey-15">
                      {target.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* PROGRAM INVESTMENT */}
        <section>
          <div className="mb-8 text-center">
            <h2 className="font-black font-vietnam text-2xl text-grey-15 sm:text-3xl">
              Program Investment
            </h2>
            <p className="mt-2 text-grey-40">
              One-time payment, transparent pricing, no hidden fees.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <PricingCard
              course={course}
              discount={discount}
              onEnroll={openPaymentModal}
              saving={saving}
            />
          </div>
        </section>

        {/* CAREER OPPORTUNITIES */}
        {course.careerPaths && course.careerPaths.length > 0 && (
          <section>
            <div className="mb-8">
              <h2 className="mb-2 font-black font-vietnam text-2xl text-grey-15 sm:text-3xl">
                Career Opportunities
              </h2>
              {course.industryGrowth && (
                <p className="text-grey-40">
                  Industry growth:{" "}
                  <span className="font-bold text-grey-15">
                    {course.industryGrowth}
                  </span>
                </p>
              )}
            </div>
            <div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              ref={careerPaths.containerRef}
            >
              {course.careerPaths.map((career, i) => {
                const Icon = getIcon(career.icon);
                const tint = CARD_TINTS[i % CARD_TINTS.length];
                return (
                  <div
                    className={`rounded-2xl border-2 border-grey-15 p-5 ${tint}`}
                    key={career.title}
                    ref={(el) => {
                      careerPaths.itemRefs.current[i] = el;
                    }}
                  >
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border-2 border-grey-15 bg-white">
                      <Icon className="h-5 w-5 text-grey-15" />
                    </div>
                    <h4 className="mb-2 font-bold font-vietnam text-grey-15">
                      {career.title}
                    </h4>
                    {career.salary && (
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-grey-15">
                          {career.salary}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <PlacementSection categorySlug={course.slug.current} />
        <GoogleReviews categorySlug={course.slug.current} />

        {/* FAQ */}
        {course.faq && course.faq.length > 0 && (
          <section>
            <h2 className="mb-8 font-black font-vietnam text-2xl text-grey-15 sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <Accordion className="space-y-3" collapsible type="single">
              {course.faq.map((item, i) => (
                <AccordionItem
                  className="overflow-hidden rounded-2xl border-2 border-grey-15 bg-white"
                  key={item.question}
                  value={`faq-${i}`}
                >
                  <AccordionTrigger className="gap-3 px-5 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90 font-bold text-grey-15 text-sm">
                        {i + 1}
                      </div>
                      <span className="font-bold font-vietnam text-grey-15">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pl-15">
                    <p className="text-grey-35 leading-relaxed">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 text-center">
              <p className="mb-4 text-grey-40">Still have questions?</p>
              <Link
                className="inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 px-6 py-3 font-bold text-grey-15 transition-colors hover:bg-primary-90"
                href="/contact"
              >
                Contact Our Team
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function PricingCard({
  course,
  discount,
  saving,
  onEnroll,
}: {
  course: CourseContent;
  discount: number;
  onEnroll: () => void;
  saving: number;
}) {
  const hasDiscount = course.originalPrice > course.price;
  const hasSaving = saving > 0;

  return (
    <div className="overflow-hidden rounded-3xl border-2 border-grey-15 shadow-[6px_6px_0_0_var(--color-grey-15)] md:grid md:grid-cols-[1fr_1.2fr]">
      {/* Left - price panel */}
      <div className="relative flex flex-col justify-center bg-grey-15 p-8 sm:p-10">
        {discount > 0 && (
          <span className="mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-grey-15 bg-gold px-4 py-1.5 font-bold text-grey-15 text-xs">
            <Sparkles className="h-3 w-3" />
            {discount}% OFF - Limited Seats
          </span>
        )}
        <p className="mb-2 font-bold text-primary-90 text-xs uppercase tracking-wider">
          One-time Payment
        </p>
        <p className="font-black font-vietnam text-5xl text-white">
          ₹{course.price.toLocaleString("en-IN")}
        </p>
        {hasDiscount && (
          <p className="mt-2 text-lg text-white/50 line-through">
            ₹{course.originalPrice.toLocaleString("en-IN")}
          </p>
        )}
        {hasSaving && (
          <p className="mt-4 font-bold text-primary-90 text-sm">
            You save ₹{saving.toLocaleString("en-IN")}
          </p>
        )}
        {course.emiOption && (
          <p className="mt-6 border-white/10 border-t pt-4 text-sm text-white/60">
            EMI from{" "}
            <span className="font-bold text-white">{course.emiOption}</span>
          </p>
        )}
      </div>

      {/* Right - inclusions + CTA */}
      <div className="bg-white p-8 sm:p-10">
        {course.whatsIncluded && course.whatsIncluded.length > 0 && (
          <div className="mb-6">
            <p className="mb-4 font-bold text-grey-30 text-xs uppercase tracking-wider">
              What&apos;s Included
            </p>
            <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
              {course.whatsIncluded.map((item) => (
                <div className="flex items-start gap-2.5" key={item}>
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90">
                    <Check className="h-3 w-3 text-grey-15" />
                  </div>
                  <span className="text-grey-35 text-sm leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 py-6 font-bold text-grey-15 text-lg shadow-none hover:bg-primary-90"
          onClick={onEnroll}
        >
          Enroll Now
          <ArrowRight className="h-5 w-5" />
        </Button>

        <div className="mt-5 flex items-center justify-center gap-6 text-grey-40 text-xs">
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
  );
}

function PRTStepsGrid({ steps }: { steps: PRTStep[] }) {
  const icons = [Check, Target, Award];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {steps.map((step, i) => {
        const Icon = icons[i % icons.length];
        return (
          <div
            className="rounded-2xl border-2 border-grey-15/10 bg-light-97 p-5 text-center"
            key={step.title}
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90 font-bold text-grey-15">
              {i + 1}
            </div>
            <h4 className="mb-2 font-bold font-vietnam text-grey-15">
              {step.title}
            </h4>
            <div className="flex items-start gap-2 text-left">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-grey-15" />
              <p className="text-grey-35 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ISAStepsGrid({ steps }: { steps: ISAStep[] }) {
  const icons = [FileText, UserCheck, Banknote];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {steps.map((step, i) => {
        const Icon = icons[i % icons.length];
        return (
          <div
            className="rounded-2xl border-2 border-grey-15/10 bg-light-97 p-5 text-center"
            key={step.title}
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90">
              <Icon className="h-5 w-5 text-grey-15" />
            </div>
            <h4 className="mb-1 font-bold font-vietnam text-grey-15">
              {step.title}
            </h4>
            <p className="text-grey-35 text-sm">{step.description}</p>
          </div>
        );
      })}
    </div>
  );
}

function CareerTrackPanel({ items }: { items: CareerTrackItem[] }) {
  return (
    <Accordion className="space-y-3" collapsible type="single">
      {items.map((item) => (
        <AccordionItem
          className="overflow-hidden rounded-xl border-2 border-grey-15/10 bg-light-97"
          key={item.title}
          value={item.title}
        >
          <AccordionTrigger className="gap-3 px-4 py-3 hover:no-underline">
            <div className="text-left">
              <p className="font-bold font-vietnam text-grey-15 text-sm">
                {item.title}
              </p>
              <p className="mt-0.5 text-grey-40 text-xs">{item.description}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4">
            <ul className="space-y-2">
              {item.topics.map((topic) => (
                <li className="flex items-start gap-2" key={topic}>
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-75" />
                  <span className="text-grey-35 text-sm">{topic}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function HiringPartnersGrid({
  partners,
  careerServiceFee,
}: {
  careerServiceFee?: number;
  partners: CourseTool[];
}) {
  return (
    <>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {partners.map((partner) => (
          <div
            className="flex h-16 items-center justify-center rounded-xl border-2 border-grey-15/10 bg-light-97 p-3"
            key={partner.name}
          >
            {partner.logoUrl ? (
              <Image
                alt={partner.name}
                className="h-full w-full object-contain"
                height={40}
                src={partner.logoUrl}
                unoptimized
                width={100}
              />
            ) : (
              <div className="flex flex-col items-center gap-1">
                <Building className="h-4 w-4 text-grey-40" />
                <span className="text-center font-bold text-[10px] text-grey-30 leading-tight">
                  {partner.name}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-grey-40 text-sm">
        Career services fee:{" "}
        <span className="font-bold text-grey-15">
          INR {(careerServiceFee ?? 20_000).toLocaleString("en-IN")}
        </span>{" "}
        (payable after placement, EMI available)
      </p>
    </>
  );
}
