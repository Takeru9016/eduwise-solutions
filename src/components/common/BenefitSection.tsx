"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { getIcon } from "@/lib/icon-map";
import { prefersReducedMotion } from "@/lib/utils";
import type { HomePageContent } from "@/types/pages";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Benefit = NonNullable<
  NonNullable<HomePageContent["benefits"]>["items"]
>[number];

const TextCard = ({
  benefit,
  cardRef,
}: {
  benefit: Benefit;
  cardRef: (el: HTMLDivElement | null) => void;
}) => {
  const Icon = getIcon(benefit.icon);

  return (
    <div
      className={`group flex flex-col gap-3 rounded-2xl border-2 border-grey-15 p-5 shadow-[4px_4px_0_0_var(--color-grey-15)] transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-grey-15)] sm:p-6 ${benefit.tint ?? "bg-white"}`}
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
  benefit: Benefit;
  cardRef: (el: HTMLDivElement | null) => void;
}) => (
  <div
    className="group relative h-48 overflow-hidden rounded-2xl border-2 border-grey-15 shadow-[4px_4px_0_0_var(--color-grey-15)] transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-grey-15)] sm:h-full sm:min-h-48"
    ref={cardRef}
  >
    <Image
      alt={benefit.title}
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      fill
      sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
      src={benefit.imagePath ?? ""}
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

export default function BenefitSection({
  content,
}: {
  content: NonNullable<HomePageContent["benefits"]>;
}) {
  const items = content.items ?? [];
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
              {content.heading}
            </h2>
            <p className="mb-8 text-grey-40 text-lg leading-relaxed">
              {content.subheading}
            </p>
            <Link
              className="group inline-flex w-fit items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 px-8 py-4 font-bold text-base text-grey-15 transition-transform hover:-translate-y-0.5 hover:bg-primary-80"
              href="/courses"
            >
              {content.ctaLabel}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {items.map((benefit, index) =>
              benefit.imagePath ? (
                <ImageCard
                  benefit={benefit}
                  cardRef={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  key={benefit.title}
                />
              ) : (
                <TextCard
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
