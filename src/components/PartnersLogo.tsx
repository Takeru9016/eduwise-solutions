"use client";

import { useState } from "react";
import Image from "next/image";

export default function PartnersLogo() {
  const [isHovered, setIsHovered] = useState(false);

  const partners = [
    // { src: "/partners/amazon.svg", alt: "Amazon" },
    // { src: "/partners/almabetter.png", alt: "Alma Better" },
    { src: "/partners/upgrad.svg", alt: "upGrad" },
    // { src: "/partners/isda academy.png", alt: "ISDA Academy" },
    { src: "/partners/unacademy.png", alt: "Unacademy" },
    { src: "/partners/squareyards.jpeg", alt: "Square Yards" },
    { src: "/partners/manipal.png", alt: "Manipal" },
  ];

  // Filter out commented partners and duplicate the active ones
  const activePartners = partners.filter((partner) => partner.src);
  const duplicatedPartners = [
    ...activePartners,
    ...activePartners,
    ...activePartners,
    ...activePartners,
  ];

  return (
    <div className="mt-12 pb-10 relative">
      <h3 className="text-center mb-8 font-bold text-sm md:text-lg">
        Trusted by leading companies
      </h3>

      <div className="relative w-full overflow-hidden">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

        {/* Scrolling Container */}
        <div
          className="flex gap-8 py-4 w-max animate-scroll"
          style={{
            animationPlayState: isHovered ? "paused" : "running",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {duplicatedPartners.map((partner, idx) => (
            <div
              key={idx}
              className="w-40 h-20 relative flex items-center justify-center group rounded-lg bg-white"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                fill
                className="object-contain p-4 transition-all duration-300 filter grayscale hover:grayscale-0"
                sizes="160px"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
