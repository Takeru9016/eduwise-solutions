"use client";

import { Building2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function PartnersLogo() {
  const [isHovered, setIsHovered] = useState(false);

  const partners = [
    { alt: "upGrad", src: "/partners/upgrad.svg" },
    { alt: "Unacademy", src: "/partners/unacademy.png" },
    { alt: "Square Yards", src: "/partners/squareyards.jpeg" },
    { alt: "Manipal", src: "/partners/manipal.png" },
  ];

  // Create duplicated array for seamless scrolling
  const duplicatedPartners = [
    ...partners,
    ...partners,
    ...partners,
    ...partners,
  ];

  return (
    <div className="relative mt-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mb-3 flex items-center justify-center gap-2">
          <Building2 className="h-5 w-5 text-primary-75" />
          <h3 className="font-semibold font-vietnam text-grey-20 text-sm md:text-base">
            OUR TRUSTED PARTNERS
          </h3>
        </div>
        <p className="text-grey-35 text-lg md:text-xl">
          Join the ranks of students learning from industry leaders
        </p>
      </div>

      {/* Partners Slider */}
      <div className="relative w-full overflow-hidden bg-light-97 py-8">
        {/* Gradient Masks */}
        <div className="absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-light-97 to-transparent" />
        <div className="absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-light-97 to-transparent" />

        {/* Scrolling Container */}
        <div
          className="flex w-max animate-marquee gap-12 py-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            animationPlayState: isHovered ? "paused" : "running",
          }}
        >
          {duplicatedPartners.map((partner, idx) => (
            <div className="group relative h-24 w-48" key={idx}>
              <div className="absolute inset-0 rounded-xl bg-white shadow-sm transition-all duration-300 group-hover:shadow-md">
                <Image
                  alt={partner.alt}
                  className="object-contain p-6 grayscale filter transition-all duration-300 hover:grayscale-0"
                  fill
                  sizes="192px"
                  src={partner.src}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style global jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 24px));
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
