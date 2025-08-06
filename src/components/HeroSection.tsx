"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, Target, Play, Star, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

// Floating icon component
const FloatingIcon = ({ icon: Icon, className = "" }) => (
  <div className={`absolute animate-float ${className}`}>
    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30">
      <Icon className="w-6 h-6 text-primary-75" />
    </div>
  </div>
);

// Modern feature badge component
const FeatureBadge = ({ icon: Icon, text, index }) => (
  <div
    className="flex items-center gap-3 bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
    style={{ 
      animationDelay: `${index * 300}ms`,
      animation: 'fadeInUp 0.8s ease-out forwards'
    }}
  >
    <div className="w-10 h-10 bg-gradient-to-br from-primary-90 to-primary-75 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
      <Icon className="w-5 h-5 text-white" />
    </div>
    <span className="text-grey-35 font-semibold text-sm">{text}</span>
  </div>
);

// Enhanced CTA button
const ModernCTAButton = ({ href, variant, children, className = "" }) => (
  <Link href={href}>
    <Button
      className={`
        relative overflow-hidden px-8 py-4 text-lg font-bold rounded-full transition-all duration-500 transform hover:scale-110 group
        ${
          variant === "primary"
            ? "bg-gradient-to-r from-primary-75 via-primary-70 to-primary-75 bg-size-200 hover:bg-pos-100 text-white shadow-2xl hover:shadow-primary-75/50"
            : "bg-white/90 backdrop-blur-sm border-2 border-primary-75 text-primary-75 hover:bg-primary-99 shadow-xl hover:shadow-2xl"
        }
        ${className}
      `}
    >
      <span className="relative z-10 flex items-center gap-3">
        {children}
      </span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-70 to-primary-65 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
    </Button>
  </Link>
);

export default function HeroSection() {
  const features = [
    { icon: BookOpen, text: "Expert-Led Programs" },
    { icon: Target, text: "Job-Ready Skills" },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-tr from-primary-99 via-white to-primary-97 overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0">
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-90/60 to-transparent rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-primary-95/80 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary-97 to-primary-95 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Geometric shapes */}
        <div className="absolute top-20 right-20 w-6 h-6 border-2 border-primary-75 rotate-45 animate-spin-slow" />
        <div className="absolute bottom-32 left-16 w-8 h-8 border-2 border-primary-90 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 left-20 w-4 h-4 bg-primary-95 transform rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Floating icons */}
        <FloatingIcon icon={Star} className="top-24 left-1/3 animate-delay-1000" />
        <FloatingIcon icon={Zap} className="bottom-40 right-1/3 animate-delay-2000" />
        <FloatingIcon icon={Sparkles} className="top-1/2 right-20 animate-delay-500" />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Main content container with different layout */}
        <div className="max-w-6xl mx-auto">
          {/* Top badge section */}
          <div className="text-center mb-12">
            <div 
              className="inline-flex items-center gap-4 bg-white/95 backdrop-blur-md text-primary-75 px-8 py-4 rounded-full text-base font-bold shadow-2xl border border-primary-95/50 hover:shadow-primary-75/20 transition-all duration-500 group"
              style={{ animation: 'fadeInDown 0.8s ease-out' }}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-95 to-primary-75 rounded-full flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-75 rounded-full animate-ping" />
              </div>
              <span>Your Career Journey Starts Here</span>
            </div>
          </div>

          {/* Main heading - centered with dramatic typography */}
          <div className="text-center mb-16">
            <h1 className="font-vietnam font-black leading-tight mb-8">
              <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-4">
                <span 
                  className="inline-block text-primary-75 opacity-0"
                  style={{ 
                    animation: 'slideInLeft 1s ease-out 0.2s forwards'
                  }}
                >
                  Confused
                </span>
              </div>
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                <span 
                  className="inline-block text-grey-15 opacity-0"
                  style={{ 
                    animation: 'slideInRight 1s ease-out 0.6s forwards'
                  }}
                >
                  About What's Next?
                </span>
              </div>
            </h1>

            {/* Enhanced description with centered layout */}
            <div 
              className="max-w-4xl mx-auto space-y-6 text-xl md:text-2xl leading-relaxed opacity-0"
              style={{ animation: 'fadeInUp 1s ease-out 1s forwards' }}
            >
              <p className="text-gray-700">
                Looking to elevate your career with{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary-95 via-primary-90 to-primary-95 px-4 py-2 rounded-xl text-primary-75 font-bold shadow-lg">
                    THE RIGHT JOB
                  </span>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-75 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                </span>{" "}
                and enhance your skills with the{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary-95 via-primary-90 to-primary-95 px-4 py-2 rounded-xl text-primary-75 font-bold shadow-lg">
                    PERFECT PROGRAM
                  </span>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-75 rounded-full flex items-center justify-center">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                </span>
              </p>

              <p className="text-gray-600 flex items-center justify-center gap-3 text-2xl">
                <span>We're here to guide you every step of the way!</span>
                <span className="text-4xl animate-bounce">🚀</span>
              </p>
            </div>
          </div>

          {/* Feature badges - horizontal centered layout */}
          <div 
            className="flex flex-wrap justify-center gap-6 mb-16 opacity-0"
            style={{ animation: 'fadeInUp 1s ease-out 1.4s forwards' }}
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

          {/* CTA section - centered with more spacing */}
          <div 
            className="flex flex-col sm:flex-row gap-8 justify-center items-center opacity-0"
            style={{ animation: 'fadeInUp 1s ease-out 1.8s forwards' }}
          >
            <ModernCTAButton href="/courses" variant="primary" className="group">
              <span className="flex items-center gap-3">
                Explore Courses
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </ModernCTAButton>

            <ModernCTAButton href="/contact" variant="secondary" className="group">
              <span className="flex items-center gap-3">
                <Play className="w-6 h-6 group-hover:scale-125 transition-transform duration-300" />
                Contact Us
              </span>
            </ModernCTAButton>
          </div>
        </div>
      </div>

      {/* Enhanced CSS animations */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-delay-500 {
          animation-delay: 0.5s;
        }

        .animate-delay-1000 {
          animation-delay: 1s;
        }

        .animate-delay-2000 {
          animation-delay: 2s;
        }

        .bg-size-200 {
          background-size: 200% 200%;
        }

        .bg-pos-100 {
          background-position: 100% 100%;
        }
      `}</style>
    </section>
  );
}