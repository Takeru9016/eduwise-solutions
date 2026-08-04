"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface Testimonial {
  company: string;
  image: string;
  linkedinUrl?: string;
  name: string;
  text: string;
  username: string;
}

interface TestimonialsProps {
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
  description?: string;
  maxDisplayed?: number;
  testimonials: Testimonial[];
  title?: string;
}

export function Testimonials({
  testimonials,
  className,
  title = "What Our Students Say",
  description = "Discover how Eduwise Solutions has transformed careers and lives.",
  maxDisplayed = 6,
  autoplay = true,
  autoplayInterval = 5000,
}: TestimonialsProps) {
  const [showAll, setShowAll] = useState(false);
  const [view, setView] = useState<"grid" | "carousel">("grid");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (autoplay && view === "carousel") {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayInterval, testimonials.length, view]);

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className={cn("px-4 py-16 md:px-8", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center justify-center">
          <h2 className="mb-4 bg-linear-to-r from-primary to-primary/70 bg-clip-text text-center font-bold text-3xl text-transparent md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-center text-muted-foreground">
            {description.split("<br />").map((line, i) => (
              <span key={i}>
                {line}
                {i !== description.split("<br />").length - 1 && <br />}
              </span>
            ))}
          </p>

          <div className="mt-8 flex gap-2">
            <Button
              className="rounded-full"
              onClick={() => setView("grid")}
              size="sm"
              variant={view === "grid" ? "default" : "outline"}
            >
              Grid View
            </Button>
            <Button
              className="rounded-full"
              onClick={() => setView("carousel")}
              size="sm"
              variant={view === "carousel" ? "default" : "outline"}
            >
              Carousel
            </Button>
          </div>
        </div>

        {view === "grid" ? (
          <div className="relative">
            <div
              className={cn(
                "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
                !showAll &&
                  testimonials.length > maxDisplayed &&
                  "max-h-[800px] overflow-hidden"
              )}
            >
              {testimonials
                .slice(0, showAll ? undefined : maxDisplayed)
                .map((testimonial, index) => (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    key={index}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Card className="group h-full overflow-hidden border-l-4 border-l-primary-70/70 p-6 transition-shadow duration-300 hover:shadow-lg">
                      <div className="flex items-center">
                        <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-primary/20">
                          <Image
                            alt={testimonial.name}
                            className="object-cover"
                            fill
                            src={testimonial.image}
                          />
                        </div>
                        <div className="flex flex-col pl-4">
                          <span className="font-bold text-base">
                            {testimonial.name}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {testimonial.username}
                          </span>
                          {testimonial.company && (
                            <span className="mt-1 text-primary/80 text-xs">
                              {testimonial.company}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-5">
                        <p className="text-foreground leading-relaxed">
                          &ldquo;{testimonial.text}&ldquo;
                        </p>
                        {testimonial.linkedinUrl && (
                          <div className="mt-4">
                            <a
                              href={testimonial.linkedinUrl}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <Button
                                className="rounded-full hover:bg-blue-600 hover:text-white"
                                variant="outline"
                              >
                                <Icons.linkedin className="mr-2 h-4 w-4" />
                                View on LinkedIn
                              </Button>
                            </a>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
            </div>

            {testimonials.length > maxDisplayed && (
              <div className="relative z-10 mt-12 pt-4">
                {showAll ? (
                  <div className="flex justify-center">
                    <Button
                      className="rounded-full px-8"
                      onClick={() => setShowAll(false)}
                      variant="outline"
                    >
                      Show Less
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="absolute -top-32 left-0 h-32 w-full bg-linear-to-t from-background to-transparent" />
                    <div className="flex justify-center">
                      <Button
                        className="rounded-full px-8"
                        onClick={() => setShowAll(true)}
                      >
                        View All Testimonials
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="relative mx-auto mt-12 max-w-4xl px-10">
            <Button
              className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full"
              onClick={handlePrev}
              size="icon"
              variant="outline"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="overflow-hidden py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col items-center"
                  exit={{ opacity: 0, x: -100 }}
                  initial={{ opacity: 0, x: 100 }}
                  key={activeIndex}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative mb-6 h-20 w-20 overflow-hidden rounded-full border-4 border-primary/20">
                    <Image
                      alt={testimonials[activeIndex].name}
                      className="object-cover"
                      fill
                      src={testimonials[activeIndex].image}
                    />
                  </div>

                  <div className="relative mb-6 max-w-3xl rounded-lg border border-border bg-card p-8 shadow-lg">
                    <Quote className="absolute right-4 bottom-4 h-10 w-10 text-primary-70" />
                    <Quote className="absolute top-4 left-4 h-10 w-10 rotate-180 text-primary-70" />
                    <p className="px-10 py-4 text-center text-lg italic">
                      &ldquo;{testimonials[activeIndex].text}&ldquo;
                    </p>
                  </div>

                  <h3 className="font-bold text-xl">
                    {testimonials[activeIndex].name}
                  </h3>
                  <p className="text-muted-foreground">
                    {testimonials[activeIndex].username}
                  </p>
                  {testimonials[activeIndex].company && (
                    <p className="mt-1 text-primary/80 text-sm">
                      {testimonials[activeIndex].company}
                    </p>
                  )}
                  {testimonials[activeIndex].linkedinUrl && (
                    <div className="mt-4">
                      <a
                        href={testimonials[activeIndex].linkedinUrl}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Button
                          className="rounded-full hover:bg-blue-600 hover:text-white"
                          variant="outline"
                        >
                          <Icons.linkedin className="mr-2 h-4 w-4" />
                          View on LinkedIn
                        </Button>
                      </a>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <Button
              className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full"
              onClick={handleNext}
              size="icon"
              variant="outline"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    index === activeIndex ? "w-6 bg-primary" : "bg-primary/30"
                  )}
                  key={index}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
