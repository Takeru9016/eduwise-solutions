"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";

import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface TestimonialThreeUp {
  avatar: string;
  company: string;
  content: string;
  id: number;
  linkedinUrl?: string;
  name: string;
  rating?: number;
  role: string;
}

interface TestimonialsThreeProps {
  className?: string;
  testimonials: TestimonialThreeUp[];
}

const CARD_TINTS = [
  "bg-primary-99",
  "bg-gold-90",
  "bg-white",
  "bg-primary-90",
  "bg-light-95",
  "bg-primary-95",
] as const;

export function TestimonialsThree({
  testimonials,
  className,
}: TestimonialsThreeProps) {
  const sorted = useMemo(
    () =>
      [...testimonials].sort((a, b) => {
        const linkedinDiff = Number(!!b.linkedinUrl) - Number(!!a.linkedinUrl);
        return linkedinDiff === 0 ? a.id - b.id : linkedinDiff;
      }),
    [testimonials]
  );

  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!(section && cards.length)) {
      return;
    }

    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      {
        duration: 0.6,
        ease: "power2.out",
        opacity: 1,
        scrollTrigger: { start: "top 80%", trigger: section },
        stagger: 0.06,
        y: 0,
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  if (sorted.length === 0) {
    return null;
  }

  return (
    <div className={cn("relative w-full", className)} ref={sectionRef}>
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-semibold text-grey-15 text-sm">
            <Sparkles className="h-4 w-4" />
            Student Stories
          </div>
          <h2 className="mb-4 font-black font-vietnam text-3xl text-grey-15 tracking-tight md:text-4xl lg:text-5xl">
            What Our Students Say
          </h2>
          <p className="mx-auto max-w-xl text-grey-40 text-lg leading-relaxed">
            Real outcomes from real students — placements, career switches, and
            everything in between.
          </p>
        </div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {sorted.map((t, index) => (
            <div
              className={`group mb-5 break-inside-avoid rounded-2xl border-2 border-grey-15 p-6 shadow-[4px_4px_0_0_var(--color-grey-15)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-grey-15)] md:p-7 ${CARD_TINTS[index % CARD_TINTS.length]}`}
              key={t.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-grey-15 bg-white">
                  <Quote
                    className="h-4 w-4 text-gold"
                    fill="var(--color-gold)"
                  />
                </div>
                {t.linkedinUrl && (
                  <Link
                    aria-label={`View ${t.name} on LinkedIn`}
                    className="flex items-center gap-1.5 rounded-full border-2 border-grey-15 bg-white px-3 py-1.5 font-semibold text-grey-15 text-xs transition-transform duration-200 hover:-translate-y-0.5"
                    href={t.linkedinUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icons.linkedin className="h-3.5 w-3.5" />
                    LinkedIn
                  </Link>
                )}
              </div>

              <p className="mt-5 text-grey-35 text-sm leading-relaxed md:text-base">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3 border-grey-15/20 border-t pt-5">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-grey-15">
                  <Image
                    alt={t.name}
                    className="object-cover"
                    fill
                    src={t.avatar}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold font-vietnam text-grey-15 text-sm">
                    {t.name}
                  </p>
                  <p className="truncate text-grey-40 text-xs">
                    {t.role}
                    {t.company ? ` · ${t.company}` : ""}
                  </p>
                </div>
                {t.rating && (
                  <div className="flex shrink-0 items-center gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        className="h-3.5 w-3.5 text-gold"
                        fill="var(--color-gold)"
                        key={`${t.id}-star-${i}`}
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
