"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award,
  Briefcase,
  ClipboardCheck,
  Code2,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Step {
  description: string;
  icon: LucideIcon;
  title: string;
}

const STEPS: Step[] = [
  {
    description:
      "Choose your program and complete a simple enrollment process.",
    icon: ClipboardCheck,
    title: "Enroll",
  },
  {
    description:
      "Attend live classes with industry experts and access materials.",
    icon: GraduationCap,
    title: "Learn",
  },
  {
    description: "Work on real-world projects and hands-on assignments.",
    icon: Code2,
    title: "Practice",
  },
  {
    description: "Earn industry-recognized certificates upon completion.",
    icon: Award,
    title: "Get Certified",
  },
  {
    description: "Apply for jobs with our dedicated placement support.",
    icon: Briefcase,
    title: "Get Placed",
  },
];

// Builds a smooth vertical S-curve through a list of (x,y) node centers.
function buildCurvePath(points: { x: number; y: number }[]): string {
  if (points.length === 0) {
    return "";
  }
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midY = (prev.y + curr.y) / 2;
    d += ` C${prev.x},${midY} ${curr.x},${midY} ${curr.x},${curr.y}`;
  }
  return d;
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathD, setPathD] = useState("");
  const [svgHeight, setSvgHeight] = useState(0);

  // Measure real badge centers so the curve always matches the actual layout.
  useLayoutEffect(() => {
    const measure = () => {
      const container = timelineRef.current;
      if (!container) {
        return;
      }
      const containerRect = container.getBoundingClientRect();
      const points = badgeRefs.current
        .filter((el): el is HTMLDivElement => el !== null)
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top,
          };
        });
      setPathD(buildCurvePath(points));
      setSvgHeight(containerRect.height);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scroll-linked curve draw + staggered step reveals.
  useEffect(() => {
    const path = pathRef.current;
    const section = sectionRef.current;
    if (!(path && section && pathD)) {
      return;
    }

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const drawTween = gsap.to(path, {
      ease: "none",
      scrollTrigger: {
        end: "bottom 65%",
        scrub: 0.6,
        start: "top 75%",
        trigger: section,
      },
      strokeDashoffset: 0,
    });

    const stepTweens = stepRefs.current.map((el) => {
      if (!el) {
        return null;
      }
      return gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          duration: 0.7,
          ease: "power2.out",
          opacity: 1,
          scrollTrigger: { start: "top 82%", trigger: el },
          y: 0,
        }
      );
    });

    return () => {
      drawTween.scrollTrigger?.kill();
      drawTween.kill();
      for (const tween of stepTweens) {
        tween?.scrollTrigger?.kill();
        tween?.kill();
      }
    };
  }, [pathD]);

  return (
    <section
      className="overflow-hidden bg-light-97 py-20 sm:py-24 lg:py-28"
      ref={sectionRef}
    >
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Left — headline + illustration */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="font-black font-vietnam text-4xl text-grey-15 leading-[1.05] tracking-tight sm:text-5xl">
              Get Job-Ready in 5 Steps
            </h2>
            <p className="mt-5 max-w-sm text-grey-40 text-lg leading-relaxed">
              From enrollment to placement — one guided path, backed by mentors
              the whole way.
            </p>

            <svg
              aria-hidden="true"
              className="mt-12 h-auto w-full max-w-72 text-grey-15"
              fill="none"
              viewBox="0 0 240 200"
            >
              {/* desk */}
              <line
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={3}
                x1={20}
                x2={220}
                y1={168}
                y2={168}
              />
              {/* laptop base */}
              <path
                d="M70 168 L90 150 L170 150 L190 168 Z"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth={3}
              />
              {/* laptop screen */}
              <rect
                height={70}
                rx={4}
                stroke="currentColor"
                strokeWidth={3}
                width={72}
                x={92}
                y={78}
              />
              <path
                d="M104 96 L148 96 M104 112 L148 112 M104 128 L128 128"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={3}
              />
              {/* graduation cap */}
              <path
                d="M128 30 L172 46 L128 62 L84 46 Z"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth={3}
              />
              <path
                d="M104 54 V70 C104 78 152 78 152 70 V54"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={3}
              />
              <path
                d="M172 46 V64"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={3}
              />
              <circle cx={172} cy={68} fill="currentColor" r={3} />
              {/* sparkle accents */}
              <path
                d="M40 60 L44 70 L54 74 L44 78 L40 88 L36 78 L26 74 L36 70 Z"
                fill="var(--color-gold)"
              />
              <circle cx={208} cy={110} fill="var(--color-primary-75)" r={5} />
            </svg>
          </div>

          {/* Right — curved step timeline */}
          <div className="relative" ref={timelineRef}>
            {svgHeight > 0 && (
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden sm:block"
                fill="none"
                height={svgHeight}
                width="100%"
              >
                <path
                  className="text-grey-90"
                  d={pathD}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                />
                <path
                  className="text-primary-75"
                  d={pathD}
                  fill="none"
                  ref={pathRef}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth={2}
                />
              </svg>
            )}

            <div className="flex flex-col gap-14 sm:gap-16">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const offset = index % 2 === 0 ? "sm:ml-0" : "sm:ml-24";

                return (
                  <div
                    className={`relative flex items-start gap-5 ${offset}`}
                    key={step.title}
                    ref={(el) => {
                      stepRefs.current[index] = el;
                    }}
                  >
                    <div
                      className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-white font-black font-vietnam text-grey-15"
                      ref={(el) => {
                        badgeRefs.current[index] = el;
                      }}
                    >
                      0{index + 1}
                    </div>
                    <div className="pt-1">
                      <div className="mb-1 flex items-center gap-2">
                        <Icon
                          className="h-5 w-5 text-primary-75"
                          strokeWidth={2}
                        />
                        <h3 className="font-bold font-vietnam text-grey-15 text-xl">
                          {step.title}
                        </h3>
                      </div>
                      <p className="max-w-sm text-grey-40 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
