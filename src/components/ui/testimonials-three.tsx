"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Linkedin, Quote } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface TestimonialThreeUp {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating?: number;
  linkedinUrl?: string;
}

interface TestimonialsThreeProps {
  testimonials: TestimonialThreeUp[];
  className?: string;
  autoPlay?: boolean;
  autoPlayIntervalMs?: number;
}

export function TestimonialsThree({
  testimonials,
  className,
  autoPlay = true,
  autoPlayIntervalMs = 5000,
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

  // Auto-advance
  useEffect(() => {
    if (!autoPlay || sorted.length <= 3) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % sorted.length);
    }, autoPlayIntervalMs);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayIntervalMs, sorted.length]);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + sorted.length) % sorted.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % sorted.length);
  };

  // Compute 3 visible items with wrap-around
  const visible = useMemo(() => {
    if (sorted.length === 0) return [] as TestimonialThreeUp[];
    const visibleCount = isSmall ? 1 : 3;
    const items: TestimonialThreeUp[] = [];
    for (let i = 0; i < Math.min(visibleCount, sorted.length); i++) {
      items.push(sorted[(index + i) % sorted.length]);
    }
    return items;
  }, [sorted, index, isSmall]);

  if (sorted.length === 0) return null;

  return (
    <div className={cn("relative w-full", className)}>
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            What Our Students Say
          </h2>
          <div className="hidden md:flex gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-sm"
              onClick={handlePrev}
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-sm"
              onClick={handleNext}
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile arrows moved below cards; overlay removed to avoid being hidden behind content */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          {visible.map((t) => (
            <Card
              key={t.id}
              className="relative p-6 md:p-8 h-full flex flex-col rounded-xl border border-border/80 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-60 pointer-events-none" />
              <div className="relative flex items-center gap-4 md:gap-5">
                <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-base md:text-xl">
                    {t.name}
                  </span>
                  <span className="text-sm md:text-base text-muted-foreground">
                    {t.role}
                  </span>
                  {t.company && (
                    <span className="text-xs md:text-sm text-primary/80 mt-1">
                      {t.company}
                    </span>
                  )}
                </div>
              </div>

              <div className="relative mt-5 md:mt-6 flex-1">
                <Quote className="absolute -top-2 -left-1 h-6 w-6 md:h-7 md:w-7 text-primary-50 rotate-180" />
                <p className="text-base md:text-lg leading-relaxed pt-6 pl-6 md:pl-8">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {t.linkedinUrl && (
                <div className="relative mt-auto pt-5 md:pt-6">
                  <Link
                    href={t.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${t.name} on LinkedIn`}
                  >
                    <Button className="group w-full md:w-auto rounded-full px-5 py-5 h-10 md:h-11 bg-gradient-to-r from-blue-700 to-blue-700/90 text-white shadow hover:shadow-md hover:from-blue-700/90 hover:to-blue-700 transition-all duration-200 ring-1 ring-blue-700/30">
                      <Linkedin className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                      Connect on LinkedIn
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {sorted.map((_, i) => (
            <button
              key={i}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "bg-primary w-6" : "bg-primary/30 w-2"
              )}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Mobile navigation controls below cards */}
        <div className="flex md:hidden justify-center gap-3 mt-6">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-sm"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-sm"
            onClick={handleNext}
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
