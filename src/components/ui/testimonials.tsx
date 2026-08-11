"use client";

import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Icons } from "@/components/ui/icons";

interface Testimonial {
  company: string;
  image: string;
  linkedinUrl?: string;
  name: string;
  text: string;
  username: string;
}

interface TestimonialsProps {
  className?: string;
  description?: string;
  maxDisplayed?: number;
  testimonials: Testimonial[];
  title?: string;
}

const CARD_TINTS = [
  "bg-primary-99",
  "bg-gold-90",
  "bg-white",
  "bg-primary-90",
  "bg-light-95",
  "bg-primary-95",
] as const;

export function Testimonials({
  testimonials,
  className = "",
  title = "What Our Students Say",
  description = "Discover how Eduwise Solutions has transformed careers and lives.",
  maxDisplayed = 9,
}: TestimonialsProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = testimonials.slice(0, showAll ? undefined : maxDisplayed);

  return (
    <div className={`py-16 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-bold text-grey-15 text-sm">
            <Sparkles className="h-4 w-4" />
            Student Success Stories
          </div>
          <h1 className="mb-4 font-black font-vietnam text-3xl text-grey-15 md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto max-w-2xl text-grey-40 text-lg">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((testimonial, index) => {
            const tint = CARD_TINTS[index % CARD_TINTS.length];
            return (
              <div
                className={`flex h-full flex-col rounded-2xl border-2 border-grey-15 p-6 shadow-[4px_4px_0_0_var(--color-grey-15)] transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-grey-15)] ${tint}`}
                key={testimonial.name}
              >
                <div className="flex items-center">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-grey-15">
                    <Image
                      alt={testimonial.name}
                      className="object-cover"
                      fill
                      src={testimonial.image}
                    />
                  </div>
                  <div className="flex flex-col pl-4">
                    <span className="font-bold text-grey-15">
                      {testimonial.name}
                    </span>
                    <span className="text-grey-40 text-sm">
                      {testimonial.username}
                    </span>
                    {testimonial.company && (
                      <span className="mt-1 font-bold text-primary-75 text-xs">
                        {testimonial.company}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-5 grow">
                  <p className="text-grey-35 leading-relaxed">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </div>
                {testimonial.linkedinUrl && (
                  <div className="mt-4">
                    <a
                      className="inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-4 py-2 font-bold text-grey-15 text-sm transition-colors hover:bg-primary-90"
                      href={testimonial.linkedinUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Icons.linkedin className="h-4 w-4" />
                      View on LinkedIn
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {testimonials.length > maxDisplayed && (
          <div className="mt-12 flex justify-center">
            <button
              className="rounded-full border-2 border-grey-15 bg-white px-8 py-3 font-bold text-grey-15 transition-colors hover:bg-primary-90"
              onClick={() => setShowAll((prev) => !prev)}
              type="button"
            >
              {showAll ? "Show Less" : "View All Testimonials"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
