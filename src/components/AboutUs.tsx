"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Building,
  CheckCircle2,
  GraduationCap,
  Handshake,
  Rocket,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// Hook: fade + stagger a group of items in on scroll
function useStaggerReveal<T extends HTMLElement>(count: number) {
  const containerRef = useRef<T>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const items = itemRefs.current.filter(Boolean);
    if (!(container && items.length)) {
      return;
    }
    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: 24 },
      {
        duration: 0.5,
        ease: "power2.out",
        opacity: 1,
        scrollTrigger: { start: "top 80%", trigger: container },
        stagger: 0.08,
        y: 0,
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // biome-ignore lint/correctness/useExhaustiveDependencies: rebuild on item count change
  }, [count]);

  return { containerRef, itemRefs };
}

const differentiators: { icon: IconType; label: string }[] = [
  { icon: GraduationCap, label: "Industry-aligned curriculum" },
  { icon: Briefcase, label: "150+ hiring partners" },
  { icon: Users, label: "1:1 mentorship" },
  { icon: Award, label: "8+ years of experience" },
];

const pipelineSteps = [
  {
    description:
      "Resume building, LinkedIn optimization, communication, interview technique, Excel, call pitching, and more.",
    icon: Sparkles,
    title: "Skill Development",
  },
  {
    description:
      "Personalized counseling to help you choose the right job path and maximize your opportunities.",
    icon: Users,
    title: "Career Guidance",
  },
  {
    description:
      "Direct placement with leading MNCs and startups in high-demand entry-level roles.",
    icon: Building,
    title: "Job Placement",
  },
];

const benefits = [
  { icon: CheckCircle2, label: "Guaranteed Job Opportunities" },
  { icon: CheckCircle2, label: "Industry-Driven Training" },
  { icon: CheckCircle2, label: "MNC Partnerships" },
  { icon: CheckCircle2, label: "Affordable & Effective" },
];

export default function AboutUs() {
  const heroRef = useRef<HTMLDivElement>(null);
  const story = useStaggerReveal<HTMLDivElement>(differentiators.length);
  const pipeline = useStaggerReveal<HTMLDivElement>(pipelineSteps.length);
  const choose = useStaggerReveal<HTMLDivElement>(benefits.length);

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

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-light-97 py-16 md:py-24" ref={heroRef}>
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div data-reveal>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-semibold text-grey-15 text-sm">
                <Sparkles className="h-4 w-4" />
                Welcome to Eduwise
              </div>
              <h1 className="mb-5 font-black font-vietnam text-4xl text-grey-15 tracking-tight md:text-5xl lg:text-6xl">
                About Eduwise
              </h1>
              <p className="text-grey-40 text-lg leading-relaxed">
                Eduwise Solutions runs live, mentor-led career programs out of
                Bengaluru - 17+ tracks across development, AI & data, cloud,
                design, and business, each one built to end in a placement, not
                just a certificate.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { label: "Years of Experience", value: "8+" },
                  { label: "Learners Trained", value: "2,000+" },
                  { label: "Hiring Partners", value: "150+" },
                ].map((stat) => (
                  <div
                    className="flex items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-4 py-2.5"
                    key={stat.label}
                  >
                    <span className="font-black font-vietnam text-grey-15 text-lg">
                      {stat.value}
                    </span>
                    <span className="text-grey-40 text-xs leading-tight">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative" data-reveal>
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-primary-90" />
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl border-2 border-grey-15">
                <Image
                  alt="Eduwise mentors guiding a student"
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  src="/home/benefits/mentor-support.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-gold-90" />
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl border-2 border-grey-15">
                <Image
                  alt="Eduwise team celebrating a partnership"
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  src="/home/benefits/partner-handshake.jpg"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-gold-90 px-4 py-2 font-semibold text-grey-15 text-sm">
                <Handshake className="h-4 w-4" />
                Our Story
              </div>
              <h2 className="mb-5 font-black font-vietnam text-3xl text-grey-15 tracking-tight md:text-4xl">
                More than an education platform-a career success partner
              </h2>
              <p className="mb-4 text-grey-35 text-lg leading-relaxed">
                Eduwise Solutions was built on a simple idea: learning should
                lead somewhere. We deliver our programs in collaboration with
                industry-leading organizations and reputed universities, across
                domains including Data Science, Web Development, and Cloud
                Computing.
              </p>
              <p className="mb-8 text-grey-35 text-lg leading-relaxed">
                Our counsellors sit with every learner one-on-one to map out a
                career goal before the first class starts, then track progress
                against it through placement.
              </p>

              <div className="grid grid-cols-2 gap-4" ref={story.containerRef}>
                {differentiators.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      className="flex items-center gap-3"
                      key={item.label}
                      ref={(el) => {
                        story.itemRefs.current[index] = el;
                      }}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-99">
                        <Icon className="h-4 w-4 text-grey-15" />
                      </div>
                      <span className="font-semibold text-grey-15 text-sm">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="bg-light-97 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-3xl border-2 border-grey-15 bg-primary-75 p-8 text-center shadow-[8px_8px_0_0_var(--color-grey-15)] sm:p-14">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-grey-15 bg-white">
              <Rocket className="h-7 w-7 text-grey-15" />
            </div>
            <p className="mb-8 font-black font-vietnam text-2xl text-grey-15 leading-snug md:text-3xl">
              &ldquo;Job readiness shouldn&apos;t depend on which college you
              went to. It should depend on whether you showed up and did the
              work.&rdquo;
            </p>
            <div className="mx-auto flex max-w-xl items-center justify-center gap-2 border-grey-15/20 border-t pt-6">
              <Target className="h-4 w-4 shrink-0 text-grey-15" />
              <span className="text-grey-20 text-sm">
                <span className="font-bold">Our Vision:</span> an Eduwise
                graduate on every hiring shortlist that matters.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help You Succeed */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
            <h2 className="mb-4 font-black font-vietnam text-3xl text-grey-15 tracking-tight md:text-4xl">
              How We Help You Succeed
            </h2>
            <p className="text-grey-40 text-lg leading-relaxed">
              A 15-day intensive program, three steps, one outcome: 100% job
              placement.
            </p>
          </div>

          <div
            className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4"
            ref={pipeline.containerRef}
          >
            {pipelineSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div className="relative" key={step.title}>
                  <div
                    className="h-full rounded-3xl border-2 border-grey-15 bg-white p-6 shadow-[4px_4px_0_0_var(--color-grey-15)] sm:p-7"
                    ref={(el) => {
                      pipeline.itemRefs.current[index] = el;
                    }}
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <span className="font-black font-vietnam text-2xl text-grey-60 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-99">
                        <Icon className="h-5 w-5 text-grey-15" />
                      </div>
                    </div>
                    <h3 className="mb-2 font-bold font-vietnam text-grey-15 text-lg">
                      {step.title}
                    </h3>
                    <p className="text-grey-40 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {index < pipelineSteps.length - 1 && (
                    <div className="absolute top-1/2 -right-5 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-grey-15 bg-gold-90 md:flex">
                      <ArrowUpRight className="h-4 w-4 text-grey-15" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Students Choose Us */}
      <section className="bg-light-97 py-16 md:py-24">
        <div className="container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="mb-4 font-black font-vietnam text-3xl text-grey-15 tracking-tight md:text-4xl">
              Why Students Choose Eduwise
            </h2>
            <p className="text-grey-40 text-lg leading-relaxed">
              8+ years placing graduates who had no head start.
            </p>
          </div>

          <div
            className="flex flex-wrap justify-center gap-3"
            ref={choose.containerRef}
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  className="flex items-center gap-2.5 rounded-full border-2 border-grey-15 bg-white px-5 py-3"
                  key={benefit.label}
                  ref={(el) => {
                    choose.itemRefs.current[index] = el;
                  }}
                >
                  <Icon className="h-4 w-4 shrink-0 text-grey-15" />
                  <span className="font-semibold text-grey-15 text-sm">
                    {benefit.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
