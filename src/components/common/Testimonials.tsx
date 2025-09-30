"use client";

import { testimonials } from "@/const/testimonial";
import { TestimonialsThree } from "@/components/ui/testimonials-three";

// Main component
export default function TestimonialsSectionBasic() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-light-97 to-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-95 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-97 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container mx-auto relative">
        <TestimonialsThree testimonials={testimonials} />
      </div>
    </section>
  );
}
