"use client";

import { ArrowRight, Award, BookOpen, Play, Target, Zap } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useEffect, useMemo, useState } from "react";

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
      className={`relative h-full overflow-hidden rounded-2xl p-8 transition-all duration-500 ${
        active
          ? "border-2 border-primary-75/50 bg-gradient-to-br from-grey-20 to-grey-30 shadow-2xl shadow-primary-75/20"
          : "border border-grey-40/30 bg-gradient-to-br from-grey-20/50 to-grey-30/50 hover:from-grey-20 hover:to-grey-30"
      }`}
    >
      <div
        className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r transition-all duration-500 ${
          feature.color
        } ${active ? "shadow-lg" : "shadow-md"}`}
      >
        {feature.icon}
      </div>
      <h3 className="mb-4 font-semibold text-light-95 text-xl">
        {feature.title}
      </h3>
      <p className="text-grey-60 leading-relaxed">{feature.description}</p>
      {active && (
        <div className="absolute right-4 bottom-4 opacity-50">
          <Play className="h-6 w-6 text-primary-75" />
        </div>
      )}
    </div>
  </div>
);

// StatCard subcomponent
const StatCard = ({ stat }: { stat: { number: string; label: string } }) => (
  <div className="group text-center">
    <div className="rounded-xl border border-grey-40/30 bg-gradient-to-br from-grey-20/50 to-grey-30/50 p-6 transition-all duration-300 hover:from-grey-20 hover:to-grey-30">
      <div className="mb-2 font-bold text-3xl text-primary-75 transition-transform duration-300 group-hover:scale-110 md:text-4xl">
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
        color: "from-blue-500 to-cyan-500",
        description: "Earn recognized certificates upon successful completion",
        icon: <Award className="h-8 w-8" />,
        title: "Certification Program",
      },
      {
        color: "from-purple-500 to-pink-500",
        description:
          "Curriculum designed with industry experts to ensure real-world relevance",
        icon: <Target className="h-8 w-8" />,
        title: "Industry-Focused Content",
      },
      {
        color: "from-emerald-500 to-teal-500",
        description:
          "Live coding sessions, project-based learning, and hands-on experiences",
        icon: <Zap className="h-8 w-8" />,
        title: "Interactive Workshops",
      },
    ],
    []
  );

  const stats = useMemo(
    () => [
      { label: "Expert Instructors", number: "50+" },
      { label: "Courses Planned", number: "100+" },
      { label: "Learning Support", number: "24/7" },
      { label: "Career Growth", number: "∞" },
    ],
    []
  );

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-grey-10 via-grey-15 to-grey-20 text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 h-72 w-72 animate-pulse rounded-full bg-gradient-to-r from-primary-75/20 to-primary-90/20 blur-3xl" />
        <div className="absolute right-10 bottom-20 h-96 w-96 animate-pulse rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl delay-1000" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl delay-2000" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12">
        {/* Hero Section */}
        <div
          className={`mb-20 text-center transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-primary-75 to-primary-90 shadow-2xl shadow-primary-75/50">
            <BookOpen className="h-10 w-10 text-white" />
          </div>

          <h1 className="mb-6 font-bold text-6xl tracking-tight md:text-8xl">
            <span className="bg-gradient-to-r from-primary-75 via-primary-90 to-cyan-400 bg-clip-text text-transparent">
              Eduwise
            </span>
            <br />
            <span className="text-light-95">Solutions</span>
          </h1>

          <p className="mx-auto mb-8 max-w-3xl text-grey-60 text-xl leading-relaxed md:text-2xl">
            Revolutionizing education through innovative technology and
            personalized learning experiences
          </p>

          <div className="inline-flex items-center rounded-full border border-primary-75/30 bg-gradient-to-r from-primary-75/20 to-primary-90/20 px-6 py-3 backdrop-blur-sm">
            <div className="mr-3 h-3 w-3 animate-pulse rounded-full bg-primary-75" />
            <span className="font-medium text-primary-90">
              This Course is in Development
            </span>
          </div>
        </div>

        {/* Interactive Features Showcase */}
        <div className="mx-auto mb-20 max-w-6xl">
          <h2 className="mb-16 text-center font-bold text-3xl text-light-95 md:text-4xl">
            What Makes Us Different
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                active={activeFeature === index}
                feature={feature}
                key={index}
                onClick={() => setActiveFeature(index)}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mx-auto mb-20 max-w-4xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </div>

        {/* Vision Statement */}
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <div className="rounded-3xl border border-grey-40/20 bg-gradient-to-r from-grey-20/30 to-grey-30/30 p-12 backdrop-blur-sm">
            <h3 className="mb-6 font-bold text-2xl text-light-95 md:text-3xl">
              Our Vision
            </h3>
            <p className="mb-8 text-grey-60 text-lg leading-relaxed md:text-xl">
              To become a trusted career-launch platform that transforms the
              lives of graduates by making job readiness accessible, practical,
              and result-driven—one job at a time.
            </p>
            <div className="mt-8 flex flex-row items-center justify-center gap-4">
              {/* Primary filled button */}
              <div className="group inline-flex items-center rounded-full bg-gradient-to-r from-primary-75 to-primary-90 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <Link className="flex w-full items-center" href="/contact">
                  <span>Join the Revolution</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              {/* Outlined/lighter button */}
              <div className="group inline-flex items-center rounded-full border-2 border-primary-75 bg-white/90 px-8 py-4 font-semibold text-black shadow transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Link className="flex w-full items-center" href="/">
                  <span>Go Back to Homepage</span>
                  <ArrowRight className="ml-2 h-5 w-5 text-black transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
