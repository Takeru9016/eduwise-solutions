"use client";

import {
  ArrowRight,
  BookOpen,
  Play,
  Sparkles,
  Star,
  Target,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

// Modern feature badge component
const FeatureBadge = ({
  icon: Icon,
  text,
  index,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
  index: number;
}) => (
  <div
    className="group flex items-center gap-2 rounded-full border border-white/40 bg-linear-to-r from-white/95 to-white/80 px-3 py-2 shadow-xl backdrop-blur-md transition-all duration-500 hover:scale-105 hover:shadow-2xl sm:gap-3 sm:px-6 sm:py-3"
    style={{
      animation: "fadeInUp 0.8s ease-out forwards",
      animationDelay: `${index * 300}ms`,
    }}
  >
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-primary-90 to-primary-75 transition-transform duration-300 group-hover:rotate-12 sm:h-10 sm:w-10">
      <Icon className="h-4 w-4 text-white sm:h-5 sm:w-5" />
    </div>
    <span className="font-semibold text-grey-35 text-xs sm:text-sm">
      {text}
    </span>
  </div>
);

// Enhanced CTA button
const ModernCTAButton = ({
  href,
  variant,
  children,
  className = "",
}: {
  href: string;
  variant: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
}) => (
  <Link href={href}>
    <Button
      className={`group relative w-full transform overflow-hidden rounded-full px-4 py-3 font-bold text-base transition-all duration-500 hover:scale-105 sm:w-auto sm:px-8 sm:py-4 sm:text-lg sm:hover:scale-110 ${
        variant === "primary"
          ? "bg-linear-to-r bg-size-200 from-primary-75 via-primary-70 to-primary-75 text-white shadow-2xl hover:bg-pos-100 hover:shadow-primary-75/50"
          : "border-2 border-primary-75 bg-white/90 text-primary-75 shadow-xl backdrop-blur-xs hover:bg-primary-99 hover:shadow-2xl"
      }
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
        {children}
      </span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-linear-to-r from-primary-70 to-primary-65 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      )}
    </Button>
  </Link>
);

// Floating decorative element
const FloatingDecor = ({
  className,
  delay = "0s",
}: {
  className: string;
  delay?: string;
}) => (
  <div
    className={`absolute animate-float ${className}`}
    style={{ animationDelay: delay }}
  >
    <div className="h-2 w-2 rounded-full bg-primary-90 opacity-40 sm:h-3 sm:w-3" />
  </div>
);

export default function HeroSection() {
  const features = [
    { icon: BookOpen, text: "Expert-Led Programs" },
    { icon: Target, text: "Job-Ready Skills" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-primary-99 via-white to-primary-97">
      {/* Dynamic background elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-20 sm:opacity-30">
          <div className="absolute top-10 left-1/4 h-48 w-48 animate-pulse rounded-full bg-linear-to-br from-primary-90/60 to-transparent blur-2xl sm:top-0 sm:h-96 sm:w-96 sm:blur-3xl" />
          <div
            className="absolute right-1/4 bottom-10 h-40 w-40 animate-pulse rounded-full bg-linear-to-tl from-primary-95/80 to-transparent blur-xl sm:bottom-0 sm:h-80 sm:w-80 sm:blur-2xl"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-linear-to-r from-primary-97 to-primary-95 blur-lg sm:h-64 sm:w-64 sm:blur-xl"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Floating decorative elements */}
        <FloatingDecor className="top-20 right-10 sm:right-20" delay="0s" />
        <FloatingDecor className="bottom-32 left-10 sm:left-16" delay="1.5s" />
        <FloatingDecor className="top-1/3 left-10 sm:left-20" delay="0.5s" />
        <FloatingDecor className="top-1/4 right-1/3" delay="2s" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-8 sm:px-6 sm:py-16">
        {/* Main content container */}
        <div className="mx-auto max-w-7xl">
          <div className="grid min-h-[calc(100vh-4rem)] items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Content */}
            <div className="order-1 text-center lg:order-1 lg:text-left">
              {/* Top badge section */}
              <div className="mb-8 sm:mb-12">
                <div
                  className="group inline-flex items-center gap-3 rounded-full border border-primary-95/50 bg-white/95 px-4 py-3 font-bold text-primary-75 text-sm shadow-2xl backdrop-blur-md transition-all duration-500 hover:shadow-primary-75/20 sm:gap-4 sm:px-8 sm:py-4 sm:text-base"
                  style={{ animation: "fadeInDown 0.8s ease-out" }}
                >
                  <div className="relative">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-primary-95 to-primary-75 transition-transform duration-500 group-hover:rotate-180 sm:h-10 sm:w-10">
                      <Sparkles
                        className="text-white sm:h-5 sm:w-5"
                        size={16}
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full bg-primary-75 sm:h-4 sm:w-4" />
                  </div>
                  <span className="whitespace-nowrap">
                    Your Career Journey Starts Here
                  </span>
                </div>
              </div>

              {/* Main heading */}
              <div className="mb-8 sm:mb-12 lg:mb-16">
                <h1 className="mb-6 font-black font-vietnam leading-tight sm:mb-8">
                  <div className="mb-3 text-2xl sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                    <span
                      className="inline-block text-primary-75 opacity-0"
                      style={{
                        animation: "slideInLeft 1s ease-out 0.2s forwards",
                      }}
                    >
                      Accelerate Your Career.
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                    <span
                      className="inline-block text-grey-15 opacity-0"
                      style={{
                        animation: "slideInRight 1s ease-out 0.6s forwards",
                      }}
                    >
                      Eliminate the Skill Gap
                    </span>
                  </div>
                </h1>

                {/* Enhanced description */}
                <div
                  className="mx-auto max-w-2xl space-y-4 text-lg leading-relaxed opacity-0 sm:space-y-6 sm:text-xl lg:mx-0 lg:text-2xl"
                  style={{ animation: "fadeInUp 1s ease-out 1s forwards" }}
                >
                  <div className="text-gray-700">
                    Looking to elevate your career with the{" "}
                    <span className="relative inline-block">
                      <span className="rounded-lg bg-linear-to-r from-primary-95 via-primary-90 to-primary-95 px-2 py-1 font-bold text-base text-black shadow-lg sm:rounded-xl sm:px-4 sm:py-2 sm:text-inherit">
                        RIGHT JOB
                      </span>
                      <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-75 sm:-top-2 sm:-right-2 sm:h-6 sm:w-6">
                        <Star className="h-2 w-2 text-white sm:h-3 sm:w-3" />
                      </div>
                    </span>{" "}
                    and enhance your skills with the{" "}
                    <span className="relative inline-block">
                      <span className="rounded-lg bg-linear-to-r from-primary-95 via-primary-90 to-primary-95 px-2 py-1 font-bold text-base text-black shadow-lg sm:rounded-xl sm:px-4 sm:py-2 sm:text-inherit">
                        PERFECT PROGRAM
                      </span>
                      <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-75 sm:-top-2 sm:-right-2 sm:h-6 sm:w-6">
                        <Zap className="h-2 w-2 text-white sm:h-3 sm:w-3" />
                      </div>
                    </span>
                  </div>
                </div>
              </div>

              {/* Feature badges */}
              <div
                className="mb-8 flex flex-wrap justify-center gap-3 opacity-0 sm:mb-12 sm:gap-6 lg:mb-16 lg:justify-start"
                style={{ animation: "fadeInUp 1s ease-out 1.4s forwards" }}
              >
                {features.map((feature, index) => (
                  <FeatureBadge
                    icon={feature.icon}
                    index={index}
                    key={index}
                    text={feature.text}
                  />
                ))}
              </div>

              {/* CTA section */}
              <div
                className="flex flex-col justify-center gap-4 opacity-0 sm:flex-row sm:gap-6 lg:justify-start lg:gap-8"
                style={{ animation: "fadeInUp 1s ease-out 1.8s forwards" }}
              >
                <ModernCTAButton
                  className="group"
                  href="/courses"
                  variant="primary"
                >
                  <span className="flex items-center gap-2 sm:gap-3">
                    Explore Courses
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 sm:h-6 sm:w-6 sm:group-hover:translate-x-2" />
                  </span>
                </ModernCTAButton>

                <ModernCTAButton
                  className="group border-[#FF9900]! text-[#FF9900]! hover:bg-[#FF9900]/10!"
                  href="/certifications/aws"
                  variant="secondary"
                >
                  <span className="flex items-center gap-2 sm:gap-3">
                    AWS Certifications
                    <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                  </span>
                </ModernCTAButton>

                <ModernCTAButton
                  className="group"
                  href="/contact"
                  variant="secondary"
                >
                  <span className="flex items-center gap-2 sm:gap-3">
                    <Play className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6 sm:group-hover:scale-125" />
                    Contact Us
                  </span>
                </ModernCTAButton>
              </div>
            </div>

            {/* Right Images Section */}
            <div className="relative order-2 flex w-full justify-center lg:order-2">
              <div className="grid w-full max-w-sm grid-cols-2 gap-3 sm:max-w-md sm:gap-4 lg:max-w-lg lg:gap-6">
                {/* Large image spanning both columns */}
                <div
                  className="col-span-2 opacity-0"
                  style={{ animation: "fadeInRight 1s ease-out 0.5s forwards" }}
                >
                  <div className="group relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl sm:rounded-2xl">
                    <Image
                      alt="Students studying together"
                      className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-48 lg:h-64"
                      height={300}
                      priority
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=300&fit=crop&auto=format&q=80"
                      width={600}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>

                {/* Two smaller images */}
                <div
                  className="opacity-0"
                  style={{ animation: "fadeInRight 1s ease-out 0.7s forwards" }}
                >
                  <div className="group relative overflow-hidden rounded-lg shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl sm:rounded-xl">
                    <Image
                      alt="Students collaborating"
                      className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-36 lg:h-48"
                      height={240}
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=240&fit=crop&auto=format&q=80"
                      width={300}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>

                <div
                  className="opacity-0"
                  style={{ animation: "fadeInRight 1s ease-out 0.9s forwards" }}
                >
                  <div className="group relative overflow-hidden rounded-lg shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl sm:rounded-xl">
                    <Image
                      alt="Student studying with laptop"
                      className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-36 lg:h-48"
                      height={240}
                      src="https://images.unsplash.com/photo-1581726690015-c9861fa5057f?w=300&h=240&fit=crop&auto=format&q=80"
                      width={300}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>
              </div>

              {/* Decorative elements (hidden on small screens) */}
              <div className="absolute -top-2 -right-2 hidden h-6 w-6 animate-pulse rounded-full bg-primary-95 opacity-60 sm:block lg:-top-4 lg:-right-4 lg:h-8 lg:w-8" />
              <div className="absolute -bottom-3 -left-3 hidden h-4 w-4 animate-bounce rounded-full bg-primary-90 opacity-40 sm:block lg:-bottom-6 lg:-left-6 lg:h-6 lg:w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations - Using CSS modules would be better in production */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .bg-size-200 {
          background-size: 200% 200%;
        }

        .bg-pos-100 {
          background-position: 100% 100%;
        }

        @media (max-width: 640px) {
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      `}</style>
    </section>
  );
}
