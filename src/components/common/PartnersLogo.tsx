"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2 } from "lucide-react";

export default function PartnersLogo() {
  const [isHovered, setIsHovered] = useState(false);

  const partners = [
    { src: "/partners/upgrad.svg", alt: "upGrad" },
    { src: "/partners/unacademy.png", alt: "Unacademy" },
    { src: "/partners/squareyards.jpeg", alt: "Square Yards" },
    { src: "/partners/manipal.png", alt: "Manipal" },
  ];

  // Create duplicated array for seamless scrolling
  const duplicatedPartners = [
    ...partners,
    ...partners,
    ...partners,
    ...partners,
  ];

  return (
    <div className="mt-16 relative">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Building2 className="w-5 h-5 text-primary-75" />
          <h3 className="font-vietnam font-semibold text-grey-20 text-sm md:text-base">
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
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-light-97 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-light-97 to-transparent z-10"></div>

        {/* Scrolling Container */}
        <div
          className="flex gap-12 py-4 w-max animate-marquee"
          style={{
            animationPlayState: isHovered ? "paused" : "running",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {duplicatedPartners.map((partner, idx) => (
            <div key={idx} className="relative w-48 h-24 group">
              <div className="absolute inset-0 bg-white rounded-xl shadow-sm transition-all duration-300 group-hover:shadow-md">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  fill
                  className="object-contain p-6 transition-all duration-300 filter grayscale hover:grayscale-0"
                  sizes="192px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
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
