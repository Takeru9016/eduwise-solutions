"use client";

import {
  ClipboardCheck,
  GraduationCap,
  Code2,
  Award,
  Briefcase,
  ArrowRight,
  Sparkles,
  LucideIcon,
} from "lucide-react";

interface Step {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const steps: Step[] = [
  {
    step: 1,
    title: "Enroll",
    description: "Choose your program and complete a simple enrollment process",
    icon: ClipboardCheck,
    color: "from-blue-500 to-blue-600",
  },
  {
    step: 2,
    title: "Learn",
    description:
      "Attend live classes with industry experts and access materials",
    icon: GraduationCap,
    color: "from-green-500 to-emerald-600",
  },
  {
    step: 3,
    title: "Practice",
    description: "Work on real-world projects and hands-on assignments",
    icon: Code2,
    color: "from-purple-500 to-violet-600",
  },
  {
    step: 4,
    title: "Get Certified",
    description: "Earn industry-recognized certificates upon completion",
    icon: Award,
    color: "from-amber-500 to-orange-600",
  },
  {
    step: 5,
    title: "Get Placed",
    description: "Apply for jobs with our dedicated placement support",
    icon: Briefcase,
    color: "from-pink-500 to-rose-600",
  },
];

const StepCard = ({ step, isLast }: { step: Step; isLast: boolean }) => {
  const Icon = step.icon;

  return (
    <div className="relative flex flex-col items-center group">
      {/* Step Number Badge */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
        <span className="bg-white text-primary-75 text-xs font-bold px-2.5 py-1 rounded-full shadow-md border border-primary-90">
          Step {step.step}
        </span>
      </div>

      {/* Card */}
      <div className="relative bg-white rounded-2xl p-6 pt-8 shadow-lg border border-grey-90 hover:shadow-2xl hover:border-primary-90 transition-all duration-500 hover:-translate-y-2 w-full max-w-[220px] min-h-[200px] flex flex-col items-center text-center">
        {/* Icon Circle */}
        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-vietnam font-bold text-grey-15 mb-2">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-grey-35 leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Connector Arrow - Desktop */}
      {!isLast && (
        <div className="hidden lg:flex absolute top-1/2 -right-5 transform -translate-y-1/2 z-20">
          <div className="w-10 h-10 bg-primary-95 rounded-full flex items-center justify-center shadow-md">
            <ArrowRight className="w-5 h-5 text-primary-75" />
          </div>
        </div>
      )}

      {/* Connector Arrow - Mobile */}
      {!isLast && (
        <div className="lg:hidden flex justify-center my-4">
          <div className="w-8 h-8 bg-primary-95 rounded-full flex items-center justify-center rotate-90">
            <ArrowRight className="w-4 h-4 text-primary-75" />
          </div>
        </div>
      )}
    </div>
  );
};

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-primary-99 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm border border-primary-95">
            <Sparkles size={16} />
            Your Success Journey
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-4">
            How Our Courses{" "}
            <span className="bg-gradient-to-r from-primary-75 to-primary-90 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="text-grey-35 text-lg max-w-2xl mx-auto">
            A simple step-by-step process to transform your career with
            industry-ready skills and guaranteed placement support.
          </p>
        </div>

        {/* Steps Grid - Desktop */}
        <div className="hidden lg:flex justify-center items-start gap-10">
          {steps.map((step, index) => (
            <StepCard
              key={step.step}
              step={step}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* Steps List - Mobile */}
        <div className="lg:hidden flex flex-col items-center">
          {steps.map((step, index) => (
            <StepCard
              key={step.step}
              step={step}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
