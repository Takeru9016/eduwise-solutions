"use client";

import { ChevronLeft, ChevronRight, Linkedin, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

export function TestimonialsThree({
  testimonials,
  className,
}: TestimonialsThreeProps) {
  const sorted = useMemo(
    () => [...testimonials].sort((a, b) => a.id - b.id),
    [testimonials]
  );

  const [index, setIndex] = useState(0);
  const [isSmall, setIsSmall] = useState(false);

  // Track viewport for mobile-friendly behavior
  useEffect(() => {
    const onResize = () => setIsSmall(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + sorted.length) % sorted.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % sorted.length);
  };

  // Compute 3 visible items with wrap-around
  const visible = useMemo(() => {
    if (sorted.length === 0) {
      return [] as TestimonialThreeUp[];
    }
    const visibleCount = isSmall ? 1 : 3;
    const items: TestimonialThreeUp[] = [];
    for (let i = 0; i < Math.min(visibleCount, sorted.length); i++) {
      items.push(sorted[(index + i) % sorted.length]);
    }
    return items;
  }, [sorted, index, isSmall]);

  if (sorted.length === 0) {
    return null;
  }

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text font-bold text-3xl text-transparent tracking-tight md:text-4xl">
            What Our Students Say
          </h2>
          <div className="hidden gap-3 md:flex">
            <Button
              aria-label="Previous"
              className="rounded-full shadow-sm"
              onClick={handlePrev}
              size="icon"
              variant="outline"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              aria-label="Next"
              className="rounded-full shadow-sm"
              onClick={handleNext}
              size="icon"
              variant="outline"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile arrows moved below cards; overlay removed to avoid being hidden behind content */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
          {visible.map((t) => (
            <Card
              className="relative flex h-full flex-col rounded-xl border border-border/80 p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg md:p-8"
              key={t.id}
            >
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-60" />
              <div className="relative flex items-center gap-4 md:gap-5">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-primary/20 shadow-sm md:h-20 md:w-20">
                  <Image
                    alt={t.name}
                    className="object-cover"
                    fill
                    src={t.avatar}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-base md:text-xl">
                    {t.name}
                  </span>
                  <span className="text-muted-foreground text-sm md:text-base">
                    {t.role}
                  </span>
                  {t.company && (
                    <span className="mt-1 text-primary/80 text-xs md:text-sm">
                      {t.company}
                    </span>
                  )}
                </div>
              </div>

              <div className="relative mt-5 flex-1 md:mt-6">
                <Quote className="absolute -top-2 -left-1 h-6 w-6 rotate-180 text-primary-50 md:h-7 md:w-7" />
                <p className="pt-6 pl-6 text-base leading-relaxed md:pl-8 md:text-lg">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {t.linkedinUrl && (
                <div className="relative mt-auto pt-5 md:pt-6">
                  <Link
                    aria-label={`View ${t.name} on LinkedIn`}
                    href={t.linkedinUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Button className="group h-10 w-full rounded-full bg-gradient-to-r from-blue-700 to-blue-700/90 px-5 py-5 text-white shadow ring-1 ring-blue-700/30 transition-all duration-200 hover:from-blue-700/90 hover:to-blue-700 hover:shadow-md md:h-11 md:w-auto">
                      <Linkedin className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                      Connect on LinkedIn
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {sorted.map((_, i) => (
            <button
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-primary" : "w-2 bg-primary/30"
              )}
              key={i}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>

        {/* Mobile navigation controls below cards */}
        <div className="mt-6 flex justify-center gap-3 md:hidden">
          <Button
            aria-label="Previous"
            className="rounded-full shadow-sm"
            onClick={handlePrev}
            size="icon"
            variant="outline"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            aria-label="Next"
            className="rounded-full shadow-sm"
            onClick={handleNext}
            size="icon"
            variant="outline"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
