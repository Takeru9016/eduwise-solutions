"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Compass,
  Focus,
  GraduationCap,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextBenefit {
  description: string;
  icon: LucideIcon;
  tint: string;
  title: string;
  type: "text";
}

interface ImageBenefit {
  description: string;
  imageUrl: string;
  title: string;
  type: "image";
}

type Benefit = TextBenefit | ImageBenefit;

const BENEFITS: Benefit[] = [
  {
    description:
      "Development, AI & Data, Cloud & DevOps, Design, Business, and Placement Prep - one platform, real depth in each.",
    icon: Compass,
    tint: "bg-primary-99",
    title: "17+ Programs, 6 Career Tracks",
    type: "text",
  },
  {
    description:
      "Every program maps to specific job titles and salary bands, not generic 'skills training'.",
    icon: GraduationCap,
    tint: "bg-gold-90",
    title: "Curriculum Tied to Real Roles",
    type: "text",
  },
  {
    description:
      "Not sure which track fits? Take the course-finder quiz or talk to a counselor.",
    icon: LayoutGrid,
    tint: "bg-white",
    title: "Clear, Guided Enrollment",
    type: "text",
  },
  {
    description:
      "Enroll, learn, practice, get certified, get placed - every program follows the same path to a job.",
    icon: Focus,
    tint: "bg-primary-90",
    title: "Placement Is the End Goal",
    type: "text",
  },
  {
    description: "Mentor-led sessions, not pre-recorded videos on a timer.",
    imageUrl: "/home/benefits/mentor-support.jpg",
    title: "Live Classes, Real Mentors",
    type: "image",
  },
  {
    description:
      "Cloud training and certification backed by an official partnership.",
    imageUrl: "/home/benefits/partner-handshake.jpg",
    title: "Official AWS Partner",
    type: "image",
  },
];

const TextCard = ({
  benefit,
  cardRef,
}: {
  benefit: TextBenefit;
  cardRef: (el: HTMLDivElement | null) => void;
}) => {
  const Icon = benefit.icon;

  return (
    <div
      className={`group flex flex-col gap-3 rounded-2xl border-2 border-grey-15 p-5 shadow-[4px_4px_0_0_var(--color-grey-15)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-grey-15)] sm:p-6 ${benefit.tint}`}
      ref={cardRef}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-grey-15 bg-white">
        <Icon className="h-5 w-5 text-grey-15" strokeWidth={1.75} />
      </div>
      <div>
        <h3 className="mb-1 font-bold font-vietnam text-base text-grey-15">
          {benefit.title}
        </h3>
        <p className="text-grey-40 text-sm leading-relaxed">
          {benefit.description}
        </p>
      </div>
    </div>
  );
};

const ImageCard = ({
  benefit,
  cardRef,
}: {
  benefit: ImageBenefit;
  cardRef: (el: HTMLDivElement | null) => void;
}) => (
  <div
    className="group relative h-48 overflow-hidden rounded-2xl border-2 border-grey-15 shadow-[4px_4px_0_0_var(--color-grey-15)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-grey-15)] sm:h-full sm:min-h-48"
    ref={cardRef}
  >
    <Image
      alt={benefit.title}
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      fill
      sizes="(min-width: 1024px) 320px, 50vw"
      src={benefit.imageUrl}
    />
    <div className="absolute inset-0 bg-linear-to-t from-grey-15/90 via-grey-15/10 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-5">
      <h3 className="mb-0.5 font-bold font-vietnam text-base text-white">
        {benefit.title}
      </h3>
      <p className="line-clamp-1 text-sm text-white/75">
        {benefit.description}
      </p>
    </div>
  </div>
);

export default function BenefitSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!(section && cards.length) || prefersReducedMotion()) {
      return;
    }

    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 28 },
      {
        duration: 0.6,
        ease: "power2.out",
        opacity: 1,
        scrollTrigger: { start: "top 80%", trigger: section },
        stagger: 0.08,
        y: 0,
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="bg-light-97 py-16 md:py-24" ref={sectionRef}>
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 font-black font-vietnam text-3xl text-grey-15 tracking-tight md:text-4xl">
              Benefits That Set Us Apart
            </h2>
            <p className="mb-8 text-grey-40 text-lg leading-relaxed">
              Everything you need for a serious tech career - curated courses,
              real mentors, and support that doesn&apos;t stop at enrollment.
            </p>
            <Link
              className="group inline-flex w-fit items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 px-8 py-4 font-bold text-base text-grey-15 transition-transform hover:-translate-y-0.5 hover:bg-primary-80"
              href="/courses"
            >
              Explore Courses
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {BENEFITS.map((benefit, index) =>
              benefit.type === "text" ? (
                <TextCard
                  benefit={benefit}
                  cardRef={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  key={benefit.title}
                />
              ) : (
                <ImageCard
                  benefit={benefit}
                  cardRef={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  key={benefit.title}
                />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
