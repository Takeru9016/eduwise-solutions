"use client";

import {
  CheckCircle,
  BookOpen,
  Users,
  Award,
  Linkedin,
  Briefcase,
  MessageCircle,
  Brain,
  Target,
} from "lucide-react";

export default function LearningJourney() {
  const journeySteps = [
    {
      step: 1,
      title: "Choose your Programs",
      description:
        "Select from our curated programs designed by industry experts",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
    },
    {
      step: 2,
      title: "Learn from field experts",
      description: "Get mentored by professionals with real-world experience",
      icon: Users,
      color: "from-green-500 to-green-600",
    },
    {
      step: 3,
      title: "Complete Capstone Projects",
      description: "Build portfolio-worthy projects that showcase your skills",
      icon: Target,
      color: "from-purple-500 to-purple-600",
    },
    {
      step: 4,
      title: "Ask Questions in Doubt Sessions",
      description:
        "Get your queries resolved in dedicated doubt clearing sessions",
      icon: MessageCircle,
      color: "from-orange-500 to-orange-600",
    },
    {
      step: 5,
      title: "Master Interview Skills",
      description:
        "Practice Aptitude, Reasoning, Quants, and English for interviews",
      icon: Brain,
      color: "from-red-500 to-red-600",
    },
    {
      step: 6,
      title: "Join Group Sessions",
      description:
        "Collaborate and learn with peers in interactive group sessions",
      icon: Users,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      step: 7,
      title: "Receive Your Certificates",
      description: "Earn industry-recognized certificates upon completion",
      icon: Award,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      step: 8,
      title: "Enhance Your LinkedIn Profile",
      description: "Build a professional online presence to attract recruiters",
      icon: Linkedin,
      color: "from-blue-600 to-blue-700",
    },
    {
      step: 9,
      title: "Practice Mock Interviews",
      description:
        "Hone your interview skills with our AI-powered mock interviews",
      icon: MessageCircle,
      color: "from-teal-500 to-teal-600",
    },
    {
      step: 10,
      title: "Apply for Jobs",
      description: "Access our job portal and apply to relevant opportunities",
      icon: Briefcase,
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-99">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-grey-15 mb-6">
            How Your Learning Journey Would Be at{" "}
            <span className="bg-gradient-to-r from-primary-75 to-primary-90 bg-clip-text text-transparent">
              eduwise
            </span>
          </h2>
          <p className="text-lg text-grey-40 max-w-3xl mx-auto">
            At eduwise, your learning journey is personalized, hands-on, and
            supported by a vibrant community of learners and industry experts.
          </p>
        </div>

        {/* Journey Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-75 via-primary-90 to-primary-75 transform -translate-x-1/2 hidden lg:block" />

          <div className="space-y-8 lg:space-y-12">
            {journeySteps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={step.step}
                  className={`relative flex items-center lg:items-start gap-6 lg:gap-8 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Step Content */}
                  <div
                    className={`flex-1 ${
                      isEven ? "lg:text-right" : "lg:text-left"
                    }`}
                  >
                    <div
                      className={`bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-primary-95/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
                        isEven ? "lg:mr-8" : "lg:ml-8"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center flex-shrink-0`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-sm font-semibold text-primary-75 bg-primary-95 px-3 py-1 rounded-full">
                              Step {step.step}
                            </span>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                          <h3 className="text-xl font-bold text-grey-15 mb-2">
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
                  <div className="hidden lg:flex w-16 h-16 bg-white rounded-full border-4 border-primary-75 items-center justify-center flex-shrink-0 z-10 shadow-lg">
                    <span className="text-xl font-bold text-primary-75">
                      {step.step}
                    </span>
                  </div>

                  {/* Step Number Circle (Mobile) */}
                  <div className="lg:hidden w-12 h-12 bg-gradient-to-r from-primary-75 to-primary-90 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary-75 to-primary-90 rounded-2xl p-8 lg:p-12 text-white">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Join thousands of learners who have transformed their careers
                with eduwise
              </p>
              <button className="bg-white text-primary-75 px-8 py-4 rounded-full font-semibold hover:bg-primary-95 transition-all duration-300 hover:scale-105 shadow-lg">
                Explore Programs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
