"use client";

import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface Testimonial {
  avatar: string;
  company: string;
  content: string;
  id: number;
  linkedinUrl?: string;
  name: string;
  rating: number;
  role: string;
}

export interface TestimonialsSectionProps {
  autoRotateInterval?: number;
  className?: string;
  showVerifiedBadge?: boolean;
  subtitle?: string;
  testimonials?: Testimonial[];
  title?: string;
  trustedCompanies?: string[];
  trustedCompaniesTitle?: string;
}

export function TestimonialsSection({
  title = "What Our Students Say",
  subtitle = "Hear from our graduates about their journey with Eduwise Solutions",
  testimonials = [],
  autoRotateInterval = 6000,
  showVerifiedBadge = true,
  trustedCompanies = [],
  trustedCompaniesTitle = "Trusted by teams at these companies and more",
  className,
}: TestimonialsSectionProps) {
  // State for active testimonial
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs for scroll animations
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2, once: true });
  const controls = useAnimation();

  // Automatically cycle through testimonials
  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [testimonials.length, autoRotateInterval]);

  // Trigger animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Handlers for navigation
  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
      y: 0,
    },
  } as const;

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section
      className={cn(
        "relative flex justify-center overflow-hidden py-16 md:py-32",
        className
      )}
      id="testimonials-alt"
      ref={sectionRef}
    >
      <div className="container items-center px-4 md:px-6">
        <motion.div
          animate={controls}
          className="mb-12 space-y-4 text-center"
          initial="hidden"
          variants={containerVariants}
        >
          <motion.h2
            className="font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl"
            variants={itemVariants}
          >
            {title}
          </motion.h2>
          <motion.p
            className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed"
            variants={itemVariants}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          animate={controls}
          className="max-w-[1200px] items-center gap-8 md:grid md:grid-cols-[1fr_auto]"
          initial="hidden"
          variants={containerVariants}
        >
          <motion.div className="relative" variants={itemVariants}>
            <div className="absolute -top-6 -left-6 z-10">
              <Quote className="h-12 w-12 text-primary-80" strokeWidth={1} />
            </div>

            {/* Testimonial cards */}
            <div className="relative h-[320px] md:h-[280px]">
              {testimonials.map((testimonial, index) => (
                <Card
                  className={cn(
                    "absolute inset-0 border transition-all duration-500",
                    index === activeIndex
                      ? "translate-x-0 opacity-100 shadow-lg"
                      : "pointer-events-none translate-x-[100px] opacity-0"
                  )}
                  key={testimonial.id}
                >
                  <CardContent className="flex h-full flex-col p-6 md:p-8">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-primary/10">
                          <AvatarImage
                            alt={testimonial.name}
                            src={testimonial.avatar}
                          />
                          <AvatarFallback>
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-muted-foreground text-sm">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        {[...new Array(testimonial.rating)].map((_, i) => (
                          <Star
                            className="h-4 w-4 fill-yellow-500 text-yellow-500"
                            key={i}
                          />
                        ))}
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <p className="flex-1 text-base/relaxed italic">
                      &quot;{testimonial.content}&quot;
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

                    {showVerifiedBadge && (
                      <div className="mt-4 text-right text-muted-foreground text-xs">
                        Verified Customer
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <motion.div
            className="mt-8 flex justify-center gap-4 md:mt-0 md:flex-col"
            variants={itemVariants}
          >
            <Button
              aria-label="Previous testimonial"
              className="h-10 w-10 rounded-full"
              onClick={handlePrev}
              size="icon"
              variant="outline"
            >
              <ChevronLeft className="h-4 w-4 text-primary-75" />
            </Button>

            <div className="flex items-center justify-center gap-2 md:flex-col">
              {testimonials.map((_, index) => (
                <div
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    index === activeIndex
                      ? "bg-primary"
                      : "bg-muted-foreground/20"
                  )}
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveIndex(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                />
              ))}
            </div>

            <Button
              aria-label="Next testimonial"
              className="h-10 w-10 rounded-full"
              onClick={handleNext}
              size="icon"
              variant="outline"
            >
              <ChevronRight className="h-4 w-4 text-primary-75" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Logo cloud - Updated to match TestimonialsSection */}
        {trustedCompanies.length > 0 && (
          <motion.div className="mt-20 border-t pt-10" variants={itemVariants}>
            <h3 className="mb-8 text-center font-medium text-muted-foreground text-sm">
              {trustedCompaniesTitle}
            </h3>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
              {trustedCompanies.map((company) => (
                <div
                  className="font-semibold text-2xl text-muted-foreground/50"
                  key={company}
                >
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
