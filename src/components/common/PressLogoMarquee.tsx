"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface MarqueeLogo {
  logoUrl: string;
  name: string;
}

export function PressLogoMarquee({ logos }: { logos: MarqueeLogo[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    // Track is rendered twice back-to-back; scroll exactly one copy's
    // width for a seamless loop.
    const loopWidth = track.scrollWidth / 2;

    const tween = gsap.to(track, {
      duration: Math.max(loopWidth / 60, 20),
      ease: "none",
      repeat: -1,
      x: -loopWidth,
    });
    tweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, []);

  const doubled = [...logos, ...logos];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.play()}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-light-97 to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-light-97 to-transparent sm:w-32" />

      <div className="flex w-max items-center gap-12 sm:gap-16" ref={trackRef}>
        {doubled.map((logo, index) => (
          <div
            className="relative h-8 w-28 shrink-0 grayscale transition-all duration-200 hover:grayscale-0 sm:h-9 sm:w-32"
            key={`${logo.name}-${index}`}
          >
            <Image
              alt={logo.name}
              className="object-contain object-center"
              fill
              sizes="128px"
              src={logo.logoUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
