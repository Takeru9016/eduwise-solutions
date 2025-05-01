"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  image: string;
  name: string;
  username: string;
  company: string;
  text: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  className?: string;
  title?: string;
  description?: string;
  maxDisplayed?: number;
  autoplay?: boolean;
  autoplayInterval?: number;
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
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className={cn("py-16 px-4 md:px-8", className)}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            {title}
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            {description.split("<br />").map((line, i) => (
              <span key={i}>
                {line}
                {i !== description.split("<br />").length - 1 && <br />}
              </span>
            ))}
          </p>
          
          <div className="flex gap-2 mt-8">
            <Button 
              variant={view === "grid" ? "default" : "outline"} 
              onClick={() => setView("grid")}
              className="rounded-full"
              size="sm"
            >
              Grid View
            </Button>
            <Button 
              variant={view === "carousel" ? "default" : "outline"} 
              onClick={() => setView("carousel")}
              className="rounded-full"
              size="sm"
            >
              Carousel
            </Button>
          </div>
        </div>

        {view === "grid" ? (
          <div className="relative">
            <div
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                !showAll && testimonials.length > maxDisplayed && "max-h-[800px] overflow-hidden"
              )}
            >
              {testimonials
                .slice(0, showAll ? undefined : maxDisplayed)
                .map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-full p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-primary-70/70 overflow-hidden group">
                      <div className="flex items-center">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col pl-4">
                          <span className="font-bold text-base">
                            {testimonial.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {testimonial.username}
                          </span>
                          {testimonial.company && (
                            <span className="text-xs text-primary/80 mt-1">
                              {testimonial.company}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-5">
                        <p className="text-foreground leading-relaxed">
                          &ldquo;{testimonial.text}&ldquo;
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
            </div>

            {testimonials.length > maxDisplayed && (
              <div className="mt-12 pt-4 relative z-10">
                {!showAll ? (
                  <>
                    <div className="absolute -top-32 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
                    <div className="flex justify-center">
                      <Button 
                        onClick={() => setShowAll(true)}
                        className="rounded-full px-8"
                      >
                        View All Testimonials
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowAll(false)}
                      className="rounded-full px-8"
                    >
                      Show Less
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="relative max-w-4xl mx-auto mt-12 px-10">
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="overflow-hidden py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20 mb-6">
                    <Image
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="bg-card p-8 rounded-lg shadow-lg border border-border relative mb-6 max-w-3xl">
                    <Quote className="text-primary-70 absolute bottom-4 right-4 w-10 h-10" />
                    <Quote className="text-primary-70 absolute top-4 left-4 w-10 h-10 rotate-180" />
                    <p className="text-lg text-center italic px-10 py-4">
                      &ldquo;{testimonials[activeIndex].text}&ldquo;
                    </p>
                  </div>
                  
                  <h3 className="font-bold text-xl">{testimonials[activeIndex].name}</h3>
                  <p className="text-muted-foreground">{testimonials[activeIndex].username}</p>
                  {testimonials[activeIndex].company && (
                    <p className="text-primary/80 text-sm mt-1">
                      {testimonials[activeIndex].company}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full"
              onClick={handleNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === activeIndex ? "bg-primary w-6" : "bg-primary/30"
                  )}
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