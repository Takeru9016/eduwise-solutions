"use client";

import {
  Award,
  BookOpen,
  Brain,
  Briefcase,
  CheckCircle,
  Linkedin,
  MessageCircle,
  Target,
  Users,
} from "lucide-react";

export default function LearningJourney() {
  const journeySteps = [
    {
      color: "from-blue-500 to-blue-600",
      description:
        "Select from our curated programs designed by industry experts",
      icon: BookOpen,
      step: 1,
      title: "Choose your Programs",
    },
    {
      color: "from-green-500 to-green-600",
      description: "Get mentored by professionals with real-world experience",
      icon: Users,
      step: 2,
      title: "Learn from field experts",
    },
    {
      color: "from-purple-500 to-purple-600",
      description: "Build portfolio-worthy projects that showcase your skills",
      icon: Target,
      step: 3,
      title: "Complete Capstone Projects",
    },
    {
      color: "from-orange-500 to-orange-600",
      description:
        "Get your queries resolved in dedicated doubt clearing sessions",
      icon: MessageCircle,
      step: 4,
      title: "Ask Questions in Doubt Sessions",
    },
    {
      color: "from-red-500 to-red-600",
      description:
        "Practice Aptitude, Reasoning, Quants, and English for interviews",
      icon: Brain,
      step: 5,
      title: "Master Interview Skills",
    },
    {
      color: "from-indigo-500 to-indigo-600",
      description:
        "Collaborate and learn with peers in interactive group sessions",
      icon: Users,
      step: 6,
      title: "Join Group Sessions",
    },
    {
      color: "from-yellow-500 to-yellow-600",
      description: "Earn industry-recognized certificates upon completion",
      icon: Award,
      step: 7,
      title: "Receive Your Certificates",
    },
    {
      color: "from-blue-600 to-blue-700",
      description: "Build a professional online presence to attract recruiters",
      icon: Linkedin,
      step: 8,
      title: "Enhance Your LinkedIn Profile",
    },
    {
      color: "from-teal-500 to-teal-600",
      description:
        "Hone your interview skills with our AI-powered mock interviews",
      icon: MessageCircle,
      step: 9,
      title: "Practice Mock Interviews",
    },
    {
      color: "from-emerald-500 to-emerald-600",
      description: "Access our job portal and apply to relevant opportunities",
      icon: Briefcase,
      step: 10,
      title: "Apply for Jobs",
    },
  ];

  return (
    <section className="bg-linear-to-b from-white to-primary-99 py-20">
      <div className="container">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 font-bold text-3xl text-grey-15 md:text-4xl lg:text-5xl">
            How Your Learning Journey Would Be at{" "}
            <span className="bg-linear-to-r from-primary-75 to-primary-90 bg-clip-text text-transparent">
              eduwise
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-grey-40 text-lg">
            At eduwise, your learning journey is personalized, hands-on, and
            supported by a vibrant community of learners and industry experts.
          </p>
        </div>

        {/* Journey Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-0 bottom-0 left-1/2 hidden w-1 -translate-x-1/2 transform bg-linear-to-b from-primary-75 via-primary-90 to-primary-75 lg:block" />

          <div className="space-y-8 lg:space-y-12">
            {journeySteps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  className={`relative flex items-center gap-6 lg:items-start lg:gap-8 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                  key={step.step}
                >
                  {/* Step Content */}
                  <div
                    className={`flex-1 ${
                      isEven ? "lg:text-right" : "lg:text-left"
                    }`}
                  >
                    <div
                      className={`rounded-2xl border border-primary-95/50 bg-white p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl lg:p-8 ${
                        isEven ? "lg:mr-8" : "lg:ml-8"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div
                          className={`h-12 w-12 rounded-full bg-linear-to-r ${step.color} flex shrink-0 items-center justify-center`}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <span className="rounded-full bg-primary-95 px-3 py-1 font-semibold text-primary-75 text-sm">
                              Step {step.step}
                            </span>
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <h3 className="mb-2 font-bold text-grey-15 text-xl">
                            {step.title}
                          </h3>
                          <p className="text-grey-40 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step Number Circle (Desktop) */}
                  <div className="z-10 hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-primary-75 bg-white shadow-lg lg:flex">
                    <span className="font-bold text-primary-75 text-xl">
                      {step.step}
                    </span>
                  </div>

                  {/* Step Number Circle (Mobile) */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-r from-primary-75 to-primary-90 lg:hidden">
                    <span className="font-bold text-lg text-white">
                      {step.step}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="rounded-2xl bg-linear-to-r from-primary-75 to-primary-90 p-8 text-white lg:p-12">
              <h3 className="mb-4 font-bold text-2xl lg:text-3xl">
                Ready to Start Your Journey?
              </h3>
              <p className="mb-6 text-lg opacity-90">
                Join thousands of learners who have transformed their careers
                with eduwise
              </p>
              <button className="rounded-full bg-white px-8 py-4 font-semibold text-primary-75 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary-95">
                Explore Programs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
