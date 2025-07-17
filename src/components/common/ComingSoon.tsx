"use client";

import React, { useState, useEffect, useMemo } from "react";
import { BookOpen, Award, Target, Zap, ArrowRight, Play } from "lucide-react";
import Link from "next/link";

// FeatureCard subcomponent
const FeatureCard = ({
  feature,
  active,
  onClick,
}: {
  feature: {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
  };
  active: boolean;
  onClick: () => void;
}) => (
  <div
    className={`group cursor-pointer transition-all duration-500 ${
      active ? "scale-105" : "scale-100 hover:scale-102"
    }`}
    onClick={onClick}
  >
    <div
      className={`relative overflow-hidden rounded-2xl p-8 h-full transition-all duration-500 ${
        active
          ? "bg-gradient-to-br from-grey-20 to-grey-30 shadow-2xl shadow-primary-75/20 border-2 border-primary-75/50"
          : "bg-gradient-to-br from-grey-20/50 to-grey-30/50 hover:from-grey-20 hover:to-grey-30 border border-grey-40/30"
      }`}
    >
      <div
        className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 transition-all duration-500 bg-gradient-to-r ${
          feature.color
        } ${active ? "shadow-lg" : "shadow-md"}`}
      >
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold mb-4 text-light-95">
        {feature.title}
      </h3>
      <p className="text-grey-60 leading-relaxed">{feature.description}</p>
      {active && (
        <div className="absolute bottom-4 right-4 opacity-50">
          <Play className="w-6 h-6 text-primary-75" />
        </div>
      )}
    </div>
  </div>
);

// StatCard subcomponent
const StatCard = ({ stat }: { stat: { number: string; label: string } }) => (
  <div className="text-center group">
    <div className="bg-gradient-to-br from-grey-20/50 to-grey-30/50 rounded-xl p-6 hover:from-grey-20 hover:to-grey-30 transition-all duration-300 border border-grey-40/30">
      <div className="text-3xl md:text-4xl font-bold text-primary-75 mb-2 group-hover:scale-110 transition-transform duration-300">
        {stat.number}
      </div>
      <div className="text-grey-60 text-sm md:text-base">{stat.label}</div>
    </div>
  </div>
);

export default function ComingSoonPage() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = useMemo(
    () => [
      {
        icon: <Award className="w-8 h-8" />,
        title: "Certification Program",
        description: "Earn recognized certificates upon successful completion",
        color: "from-blue-500 to-cyan-500",
      },
      {
        icon: <Target className="w-8 h-8" />,
        title: "Industry-Focused Content",
        description:
          "Curriculum designed with industry experts to ensure real-world relevance",
        color: "from-purple-500 to-pink-500",
      },
      {
        icon: <Zap className="w-8 h-8" />,
        title: "Interactive Workshops",
        description:
          "Live coding sessions, project-based learning, and hands-on experiences",
        color: "from-emerald-500 to-teal-500",
      },
    ],
    []
  );

  const stats = useMemo(
    () => [
      { number: "50+", label: "Expert Instructors" },
      { number: "100+", label: "Courses Planned" },
      { number: "24/7", label: "Learning Support" },
      { number: "∞", label: "Career Growth" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-grey-10 via-grey-15 to-grey-20 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-75/20 to-primary-90/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-75 to-primary-90 rounded-2xl mb-8 shadow-2xl shadow-primary-75/50">
            <BookOpen className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-primary-75 via-primary-90 to-cyan-400 bg-clip-text text-transparent">
              Eduwise
            </span>
            <br />
            <span className="text-light-95">Solutions</span>
          </h1>

          <p className="text-xl md:text-2xl text-grey-60 max-w-3xl mx-auto leading-relaxed mb-8">
            Revolutionizing education through innovative technology and
            personalized learning experiences
          </p>

          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-75/20 to-primary-90/20 rounded-full border border-primary-75/30 backdrop-blur-sm">
            <div className="w-3 h-3 bg-primary-75 rounded-full mr-3 animate-pulse"></div>
            <span className="text-primary-90 font-medium">
              This Course is in Development
            </span>
          </div>
        </div>

        {/* Interactive Features Showcase */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-light-95">
            What Makes Us Different
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                feature={feature}
                active={activeFeature === index}
                onClick={() => setActiveFeature(index)}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </div>

        {/* Vision Statement */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="bg-gradient-to-r from-grey-20/30 to-grey-30/30 rounded-3xl p-12 border border-grey-40/20 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-light-95">
              Our Vision
            </h3>
            <p className="text-lg md:text-xl text-grey-60 leading-relaxed mb-8">
              To become a trusted career-launch platform that transforms the
              lives of graduates by making job readiness accessible, practical,
              and result-driven—one job at a time.
            </p>
            <div className="flex flex-row items-center justify-center gap-4 mt-8">
              {/* Primary filled button */}
              <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-75 to-primary-90 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <Link href="/contact" className="flex items-center w-full">
                  <span>Join the Revolution</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              {/* Outlined/lighter button */}
              <div className="inline-flex items-center px-8 py-4 border-2 border-primary-75 text-black bg-white/90 rounded-full font-semibold shadow hover:shadow-lg transition-all duration-300 hover:scale-105 group">
                <Link href="/" className="flex items-center w-full">
                  <span>Go Back to Homepage</span>
                  <ArrowRight className="ml-2 w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
