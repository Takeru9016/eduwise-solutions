"use client";

import {
  ArrowRight,
  Award,
  Briefcase,
  ClipboardCheck,
  Code2,
  GraduationCap,
  type LucideIcon,
  Sparkles,
} from "lucide-react";

interface Step {
  color: string;
  description: string;
  icon: LucideIcon;
  step: number;
  title: string;
}

const steps: Step[] = [
  {
    color: "from-blue-500 to-blue-600",
    description: "Choose your program and complete a simple enrollment process",
    icon: ClipboardCheck,
    step: 1,
    title: "Enroll",
  },
  {
    color: "from-green-500 to-emerald-600",
    description:
      "Attend live classes with industry experts and access materials",
    icon: GraduationCap,
    step: 2,
    title: "Learn",
  },
  {
    color: "from-purple-500 to-violet-600",
    description: "Work on real-world projects and hands-on assignments",
    icon: Code2,
    step: 3,
    title: "Practice",
  },
  {
    color: "from-amber-500 to-orange-600",
    description: "Earn industry-recognized certificates upon completion",
    icon: Award,
    step: 4,
    title: "Get Certified",
  },
  {
    color: "from-pink-500 to-rose-600",
    description: "Apply for jobs with our dedicated placement support",
    icon: Briefcase,
    step: 5,
    title: "Get Placed",
  },
];

const StepCard = ({ step, isLast }: { step: Step; isLast: boolean }) => {
  const Icon = step.icon;

  return (
    <div className="group relative flex flex-col items-center">
      {/* Step Number Badge */}
      <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
        <span className="rounded-full border border-primary-90 bg-white px-2.5 py-1 font-bold text-primary-75 text-xs shadow-md">
          Step {step.step}
        </span>
      </div>

      {/* Card */}
      <div className="relative flex min-h-[200px] w-full max-w-[220px] flex-col items-center rounded-2xl border border-grey-90 bg-white p-6 pt-8 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-primary-90 hover:shadow-2xl">
        {/* Icon Circle */}
        <div
          className={`h-16 w-16 rounded-2xl bg-linear-to-br ${step.color} mb-4 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className="h-8 w-8 text-white" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className="mb-2 font-bold font-vietnam text-grey-15 text-lg">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-grey-35 text-sm leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Connector Arrow - Desktop */}
      {!isLast && (
        <div className="absolute top-1/2 -right-5 z-20 hidden -translate-y-1/2 transform lg:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-95 shadow-md">
            <ArrowRight className="h-5 w-5 text-primary-75" />
          </div>
        </div>
      )}

      {/* Connector Arrow - Mobile */}
      {!isLast && (
        <div className="my-4 flex justify-center lg:hidden">
          <div className="flex h-8 w-8 rotate-90 items-center justify-center rounded-full bg-primary-95">
            <ArrowRight className="h-4 w-4 text-primary-75" />
          </div>
        </div>
      )}
    </div>
  );
};

export default function HowItWorks() {
  return (
    <section className="overflow-hidden bg-linear-to-b from-white via-primary-99 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-95 bg-primary-99 px-4 py-2 font-semibold text-primary-75 text-sm shadow-xs">
            <Sparkles size={16} />
            Your Success Journey
          </div>
          <h2 className="mb-4 font-bold font-vietnam text-3xl text-grey-15 md:text-4xl lg:text-5xl">
            How Our Courses{" "}
            <span className="bg-linear-to-r from-primary-75 to-primary-90 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-grey-35 text-lg">
            A simple step-by-step process to transform your career with
            industry-ready skills and guaranteed placement support.
          </p>
        </div>

        {/* Steps Grid - Desktop */}
        <div className="hidden items-start justify-center gap-10 lg:flex">
          {steps.map((step, index) => (
            <StepCard
              isLast={index === steps.length - 1}
              key={step.step}
              step={step}
            />
          ))}
        </div>

        {/* Steps List - Mobile */}
        <div className="flex flex-col items-center lg:hidden">
          {steps.map((step, index) => (
            <StepCard
              isLast={index === steps.length - 1}
              key={step.step}
              step={step}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
