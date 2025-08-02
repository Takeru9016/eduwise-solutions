"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, Target, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import PartnersLogo from "./common/PartnersLogo";

// Animated feature card component
const FeatureCard = ({
  icon: Icon,
  text,
  delay = 0,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
  delay?: number;
}) => (
  <div
    className="group flex items-center gap-4 bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-primary-95"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex-shrink-0 w-12 h-12 bg-primary-95 rounded-xl flex items-center justify-center group-hover:bg-primary-90 transition-colors duration-300">
      <Icon className="w-6 h-6 text-primary-75" />
    </div>
    <span className="text-grey-35 font-medium">{text}</span>
  </div>
);

// Enhanced CTA button with more visual appeal
const CTAButton = ({
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
        px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105
        ${
          variant === "primary"
            ? "bg-gradient-to-r from-primary-75 to-primary-70 hover:from-primary-70 hover:to-primary-65 text-white shadow-lg hover:shadow-xl"
            : "bg-white border-2 border-primary-75 text-primary-75 hover:bg-primary-99 shadow-md hover:shadow-lg"
        }
        ${className}
      `}
    >
      {children}
    </Button>
  </Link>
);

export default function HeroSection() {
  const features = [
    { icon: BookOpen, text: "Expert-Led Programs" },
    { icon: Target, text: "Job-Ready Skills" },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-white via-primary-99 to-primary-97 overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        {/* Floating shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-90 rounded-full opacity-60 animate-pulse" />
        <div
          className="absolute top-40 right-32 w-16 h-16 bg-primary-95 rounded-full opacity-40 animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-32 w-24 h-24 bg-primary-97 rounded-full opacity-50 animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Large gradient orbs */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-primary-95 to-primary-90 rounded-full opacity-30 blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-primary-97 to-primary-95 rounded-full opacity-25 blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #666 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Content - Enhanced layout */}
          <div className="text-center lg:text-left space-y-8">
            {/* Animated badge */}
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm text-primary-75 px-6 py-3 rounded-full text-sm font-semibold shadow-lg border border-primary-95 hover:shadow-xl transition-all duration-300">
              <div className="w-8 h-8 bg-primary-95 rounded-full flex items-center justify-center">
                <Sparkles size={16} className="text-primary-75" />
              </div>
              Your Career Journey Starts Here
            </div>

            {/* Main heading with better typography hierarchy */}
            <div className="space-y-4">
              <h1 className="font-vietnam font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight">
                <div className="overflow-hidden">
                  <span className="text-primary-75 inline-block transform translate-y-full animate-slide-up">
                    Confused
                  </span>
                </div>
                <div className="overflow-hidden">
                  <span
                    className="text-grey-15 inline-block transform translate-y-full animate-slide-up"
                    style={{ animationDelay: "200ms" }}
                  >
                    About What&apos;s Next?
                  </span>
                </div>
              </h1>
            </div>

            {/* Enhanced description with better visual hierarchy */}
            <div className="space-y-6 text-lg md:text-xl leading-relaxed">
              <p className="text-gray-700">
                Looking to elevate your career with{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary-95 to-primary-90 px-3 py-1 rounded-lg text-primary-75 font-semibold">
                    THE RIGHT JOB
                  </span>
                </span>{" "}
                and enhance your skills with the{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary-95 to-primary-90 px-3 py-1 rounded-lg text-primary-75 font-semibold">
                    PERFECT PROGRAM
                  </span>
                </span>
              </p>

              <p className="text-gray-600 flex items-center gap-2">
                We&apos;re here to guide you every step of the way!
                <span className="text-2xl">🚀</span>
              </p>
            </div>

            {/* Enhanced feature cards */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  text={feature.text}
                  delay={index * 200}
                />
              ))}
            </div>

            {/* Enhanced CTA section */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
              <CTAButton href="/courses" variant="primary" className="group">
                <span className="flex items-center gap-3">
                  Explore Courses
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </CTAButton>

              <CTAButton href="/contact" variant="secondary" className="group">
                <span className="flex items-center gap-3">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  Contact Us
                </span>
              </CTAButton>
            </div>
          </div>

          {/* Right Image - More dynamic presentation */}
          <div className="relative">
            {/* Main image container with enhanced styling */}
            <div className="relative w-full h-[500px] md:h-[700px]">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-95 to-primary-90 rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-primary-97 to-primary-95 rounded-3xl transform -rotate-2 opacity-15"></div>

              {/* Main image */}
              <div className="relative h-full transform hover:scale-105 transition-transform duration-700 ease-out">
                <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <Image
                    src="/home/hero.png"
                    alt="Student learning online"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Floating elements around image */}
              <div
                className="absolute -top-6 -right-6 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-bounce"
                style={{ animationDelay: "1s" }}
              >
                <BookOpen className="w-8 h-8 text-primary-75" />
              </div>
              <div
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-bounce"
                style={{ animationDelay: "2s" }}
              >
                <Target className="w-8 h-8 text-primary-75" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats or partners section placeholder */}
        <div className="mt-20 text-center opacity-80">
          <PartnersLogo />
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slide-up {
          to {
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
