"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Target,
  Play,
  Star,
  Zap,
} from "lucide-react";

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
    className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-white/95 to-white/80 backdrop-blur-md px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
    style={{
      animationDelay: `${index * 300}ms`,
      animation: "fadeInUp 0.8s ease-out forwards",
    }}
  >
    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-90 to-primary-75 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
    </div>
    <span className="text-grey-35 font-semibold text-xs sm:text-sm">
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
      className={`
        relative overflow-hidden px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-full transition-all duration-500 transform hover:scale-105 sm:hover:scale-110 group w-full sm:w-auto
        ${
          variant === "primary"
            ? "bg-gradient-to-r from-primary-75 via-primary-70 to-primary-75 bg-size-200 hover:bg-pos-100 text-white shadow-2xl hover:shadow-primary-75/50"
            : "bg-white/90 backdrop-blur-sm border-2 border-primary-75 text-primary-75 hover:bg-primary-99 shadow-xl hover:shadow-2xl"
        }
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
        {children}
      </span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-70 to-primary-65 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary-90 rounded-full opacity-40" />
  </div>
);

export default function HeroSection() {
  const features = [
    { icon: BookOpen, text: "Expert-Led Programs" },
    { icon: Target, text: "Job-Ready Skills" },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-99 via-white to-primary-97 overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-20 sm:opacity-30">
          <div className="absolute top-10 sm:top-0 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-primary-90/60 to-transparent rounded-full blur-2xl sm:blur-3xl animate-pulse" />
          <div
            className="absolute bottom-10 sm:bottom-0 right-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-tl from-primary-95/80 to-transparent rounded-full blur-xl sm:blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-primary-97 to-primary-95 rounded-full blur-lg sm:blur-xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Floating decorative elements */}
        <FloatingDecor className="top-20 right-10 sm:right-20" delay="0s" />
        <FloatingDecor className="bottom-32 left-10 sm:left-16" delay="1.5s" />
        <FloatingDecor className="top-1/3 left-10 sm:left-20" delay="0.5s" />
        <FloatingDecor className="top-1/4 right-1/3" delay="2s" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-10">
        {/* Main content container */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-4rem)]">
            {/* Left Content */}
            <div className="order-1 lg:order-1 text-center lg:text-left">
              {/* Top badge section */}
              <div className="mb-8 sm:mb-12">
                <div
                  className="inline-flex items-center gap-3 sm:gap-4 bg-white/95 backdrop-blur-md text-primary-75 px-4 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold shadow-2xl border border-primary-95/50 hover:shadow-primary-75/20 transition-all duration-500 group"
                  style={{ animation: "fadeInDown 0.8s ease-out" }}
                >
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-95 to-primary-75 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                      <Sparkles
                        size={16}
                        className="sm:w-5 sm:h-5 text-white"
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-primary-75 rounded-full animate-ping" />
                  </div>
                  <span className="whitespace-nowrap">
                    Your Career Journey Starts Here
                  </span>
                </div>
              </div>

              {/* Main heading */}
              <div className="mb-8 sm:mb-12 lg:mb-16">
                <h1 className="font-vietnam font-black leading-tight mb-6 sm:mb-8">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-3 sm:mb-6">
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
                  className="max-w-2xl mx-auto lg:mx-0 space-y-4 sm:space-y-6 text-lg sm:text-xl lg:text-2xl leading-relaxed opacity-0"
                  style={{ animation: "fadeInUp 1s ease-out 1s forwards" }}
                >
                  <div className="text-gray-700">
                    Looking to elevate your career with the{" "}
                    <span className="relative inline-block">
                      <span className="bg-gradient-to-r from-primary-95 via-primary-90 to-primary-95 px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl text-black font-bold shadow-lg text-base sm:text-inherit">
                        RIGHT JOB
                      </span>
                      <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-primary-75 rounded-full flex items-center justify-center">
                        <Star className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                      </div>
                    </span>{" "}
                    and enhance your skills with the{" "}
                    <span className="relative inline-block">
                      <span className="bg-gradient-to-r from-primary-95 via-primary-90 to-primary-95 px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl text-black font-bold shadow-lg text-base sm:text-inherit">
                        PERFECT PROGRAM
                      </span>
                      <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-primary-75 rounded-full flex items-center justify-center">
                        <Zap className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                      </div>
                    </span>
                  </div>
                </div>
              </div>

              {/* Feature badges */}
              <div
                className="flex flex-wrap gap-3 sm:gap-6 mb-8 sm:mb-12 lg:mb-16 opacity-0 justify-center lg:justify-start"
                style={{ animation: "fadeInUp 1s ease-out 1.4s forwards" }}
              >
                {features.map((feature, index) => (
                  <FeatureBadge
                    key={index}
                    icon={feature.icon}
                    text={feature.text}
                    index={index}
                  />
                ))}
              </div>

              {/* CTA section */}
              <div
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 opacity-0 justify-center lg:justify-start"
                style={{ animation: "fadeInUp 1s ease-out 1.8s forwards" }}
              >
                <ModernCTAButton
                  href="/courses"
                  variant="primary"
                  className="group"
                >
                  <span className="flex items-center gap-2 sm:gap-3">
                    Explore Courses
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </ModernCTAButton>

                <ModernCTAButton
                  href="/certifications/aws"
                  variant="secondary"
                  className="group !border-[#FF9900] !text-[#FF9900] hover:!bg-[#FF9900]/10"
                >
                  <span className="flex items-center gap-2 sm:gap-3">
                    AWS Certifications
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" />
                  </span>
                </ModernCTAButton>

                <ModernCTAButton
                  href="/contact"
                  variant="secondary"
                  className="group"
                >
                  <span className="flex items-center gap-2 sm:gap-3">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 sm:group-hover:scale-125 transition-transform duration-300" />
                    Contact Us
                  </span>
                </ModernCTAButton>
              </div>
            </div>

            {/* Right Images Section */}
            <div className="order-2 lg:order-2 relative w-full flex justify-center">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-sm sm:max-w-md lg:max-w-lg w-full">
                {/* Large image spanning both columns */}
                <div
                  className="col-span-2 opacity-0"
                  style={{ animation: "fadeInRight 1s ease-out 0.5s forwards" }}
                >
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 group">
                    <Image
                      src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=300&fit=crop&auto=format&q=80"
                      alt="Students studying together"
                      width={600}
                      height={300}
                      className="w-full h-32 sm:h-48 lg:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Two smaller images */}
                <div
                  className="opacity-0"
                  style={{ animation: "fadeInRight 1s ease-out 0.7s forwards" }}
                >
                  <div className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                    <Image
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=240&fit=crop&auto=format&q=80"
                      alt="Students collaborating"
                      width={300}
                      height={240}
                      className="w-full h-24 sm:h-36 lg:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                <div
                  className="opacity-0"
                  style={{ animation: "fadeInRight 1s ease-out 0.9s forwards" }}
                >
                  <div className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 group">
                    <Image
                      src="https://images.unsplash.com/photo-1581726690015-c9861fa5057f?w=300&h=240&fit=crop&auto=format&q=80"
                      alt="Student studying with laptop"
                      width={300}
                      height={240}
                      className="w-full h-24 sm:h-36 lg:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </div>

              {/* Decorative elements (hidden on small screens) */}
              <div className="hidden sm:block absolute -top-2 -right-2 lg:-top-4 lg:-right-4 w-6 h-6 lg:w-8 lg:h-8 bg-primary-95 rounded-full opacity-60 animate-pulse" />
              <div className="hidden sm:block absolute -bottom-3 -left-3 lg:-bottom-6 lg:-left-6 w-4 h-4 lg:w-6 lg:h-6 bg-primary-90 rounded-full opacity-40 animate-bounce" />
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
