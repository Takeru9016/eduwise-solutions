"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  Clock,
  Briefcase,
  GraduationCap,
  DollarSign,
  Sparkles,
  Target,
  Users,
  Building,
  Trophy,
  Calendar,
  Award,
  BookOpen,
  Laptop,
  Handshake,
  Zap,
  LifeBuoy,
  Presentation,
  Medal,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Trophy,
    title: "100% Job Placement Guarantee",
    description: "Your success is our priority.",
  },
  {
    icon: Building,
    title: "Top Industry Connections",
    description: "Work with leading companies in IT and Non-IT domains.",
  },
  {
    icon: Users,
    title: "Experienced Trainers",
    description: "Learn from the best to become the best.",
  },
  {
    icon: Target,
    title: "Fast-Track Career Growth",
    description:
      "45-day intensive program designed to get you job-ready quickly.",
  },
];

const careerOpportunities = [
  {
    title: "Data Associate",
  },
  {
    title: "Sales Executive",
  },
  {
    title: "Customer Support Analyst",
  },
  {
    title: "Operations Manager",
  },
];

const programModules = [
  {
    title: "Personal Branding, Resume Building & Networking",
    duration: "15 days",
    description:
      "Create a compelling professional identity and network effectively",
    weeks: [
      {
        title: "Week 1: Personal Branding & Resume Mastery",
        days: [
          "Day 1-2: Understanding Resume Types & ATS (Applicant Tracking System)",
          "Day 3-4: Writing a Resume with High ATS Score",
          "Day 5-6: Using Keywords & Customizing Resumes for Different Roles",
          "Day 7: Resume Review & Feedback Session",
        ],
      },
      {
        title: "Week 2: LinkedIn Optimization & Networking",
        days: [
          "Day 8-9: Creating a Professional LinkedIn Profile",
          "Day 10-11: Optimizing LinkedIn for Recruiters & Job Search Strategies",
          "Day 12: Engaging with Recruiters & Building a Professional Network",
          "Day 13: LinkedIn Content & Personal Branding",
          "Day 14: LinkedIn Profile Review & Q&A",
        ],
      },
    ],
  },
  {
    title: "Fundamentals & Business Communication",
    duration: "15 days",
    description: "Master professional communication and interview skills",
    weeks: [
      {
        title: "Week 3: Business Communication & Hiring Insights",
        days: [
          "Day 15-16: Email Etiquette & Professional Writing",
          "Day 17-18: Interview Preparation & Behavioral Questions",
          "Day 19-20: Common Hiring Tricks & Understanding HR Perspectives",
          "Day 21: Mock Interview Round",
        ],
      },
    ],
  },
  {
    title: "Job Specific Skills & AI Abilities",
    duration: "15 days",
    description: "Develop practical skills needed for today's workplace",
    weeks: [
      {
        title: "Week 4: Operational & Job-Specific Skills",
        days: [
          "Day 22-23: Excel Basics for Office & Data Entry Tasks",
          "Day 24-25: Advanced Excel (Pivot Tables, VLOOKUP, etc.)",
          "Day 26-27: Accounts-Related Work Fundamentals",
          "Day 28: Practical Hands-on Tasks & Case Studies",
        ],
      },
      {
        title: "Week 5: Sales & Client Communication",
        days: [
          "Day 29-30: Understanding Sales & Call Pitching Techniques",
          "Day 31-32: Live Call Pitching Practice & Role Plays",
          "Day 33-34: Handling Objections & Negotiation Skills",
          "Day 35: Assessment & Feedback",
        ],
      },
      {
        title: "Week 6: Final Preparation & Job Readiness",
        days: [
          "Day 36-37: Interview Simulations & HR Round Preparation",
          "Day 38-39: Final Resume & LinkedIn Review",
          "Day 40-41: Salary Negotiation & Offer Letter Guidance",
          "Day 42: Final Mock Interviews with Industry Experts",
          "Day 43: Personalized Career Roadmap & Job Search Strategy",
          "Day 44: Final Q&A, Doubt Clearing & Feedback Session",
          "Day 45: Graduation & Job Assistance",
        ],
      },
    ],
  },
];

const careerAssuranceSteps = [
  {
    number: 1,
    title: "Job Roles Understanding",
    description:
      "We'll understand your job role requirements and recommend the role based on experience and the market.",
  },
  {
    number: 2,
    title: "Resume Building",
    description:
      "We will help to build Resumes tailored to specific to job roles and keywords for easy shortlisting.",
  },
  {
    number: 3,
    title: "LinkedIn Preparation",
    description:
      "Improving your LinkedIn profile and visibility with relevant keywords, highlighted projects and case studies.",
  },
  {
    number: 4,
    title: "Personal Branding & Thought Leadership",
    description:
      "Teaching candidates how to showcase their expertise through LinkedIn articles, blogs, and industry discussions.",
  },
  {
    number: 5,
    title: "Conducting Initial Mock Interviews",
    description:
      "Conducting initial mock interviews to evaluate candidates' technical skills.",
  },
  {
    number: 6,
    title: "Interpersonal Skills",
    description:
      "Conducting tests and mock interviews to assess candidates' skills and personality.",
  },
  {
    number: 7,
    title: "Advanced Mock Interviews",
    description:
      "Inviting candidates who passed prior stages for further mock interviews as per Job description provided for the role",
  },
  {
    number: 8,
    title: "Job Interviews",
    description:
      "Referring to job interview opportunities through our onboarded companies and job portals",
  },
  {
    number: 9,
    title: "Compensation Negotiations",
    description:
      "Receive expert guidance on negotiating compensation to match market rates",
  },
  {
    number: 10,
    title: "Hurray!!",
    description: "You are ready for your new opportunities in real world.",
  },
];

const programHighlights = [
  {
    category: "Classes",
    icon: Presentation,
    points: [
      "100% Live Session",
      "Instructor Led Classes",
      "Flexible Timing",
      "Unlimited Class Access",
      "Lifetime Content Access",
    ],
  },
  {
    category: "Handson Learning",
    icon: Laptop,
    points: [
      "Live Projects",
      "Hands on skill",
      "Multiple Projects for each topics",
      "Case study based program",
    ],
  },
  {
    category: "Support",
    icon: LifeBuoy,
    points: ["1-1 doubt clearing session", "Real Time session"],
  },
  {
    category: "Placements",
    icon: Briefcase,
    points: [
      "Resume Building",
      "Multiple Mock Interviews",
      "Placement Assurance",
      "Multiple Job Interviews",
    ],
  },
  {
    category: "Industry Experts",
    icon: Medal,
    points: [
      "Experience Instructor",
      "Certified Professional",
      "Proven Track Records",
      "Real World Expertise",
    ],
  },
];

const programTargets = [
  {
    title: "Graduation Final Year",
    icon: GraduationCap,
  },
  {
    title: "Fresh Graduates",
    icon: Award,
  },
];

// Define interfaces for the data structures

interface Week {
  title: string;
  days: string[];
}

interface Module {
  title: string;
  duration: string;
  description: string;
  weeks: Week[];
}

// Accordion component for curriculum with proper TypeScript types
const CurriculumAccordion = ({
  module,
  moduleIndex,
}: {
  module: Module;
  moduleIndex: number;
}) => {
  const [openWeek, setOpenWeek] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <h3 className="text-xl md:text-2xl font-vietnam font-bold text-grey-15 border-b border-light-90 pb-3 flex items-center justify-between">
        <span>
          {module.title}{" "}
          <span className="text-primary-75">({module.duration})</span>
        </span>
        <Badge className="bg-primary-75 text-white">
          Module {moduleIndex + 1}
        </Badge>
      </h3>

      <div className="space-y-3">
        {module.weeks.map((week: Week, weekIndex: number) => (
          <div
            key={weekIndex}
            className="border border-light-90 rounded-lg overflow-hidden"
          >
            <button
              className={`w-full flex justify-between items-center p-4 text-left ${
                openWeek === weekIndex
                  ? "bg-primary-95"
                  : "bg-white hover:bg-primary-99"
              } transition-colors`}
              onClick={() =>
                setOpenWeek(openWeek === weekIndex ? null : weekIndex)
              }
            >
              <span className="font-vietnam font-semibold text-grey-15">
                {week.title}
              </span>
              {openWeek === weekIndex ? (
                <ChevronDown className="h-5 w-5 text-primary-75" />
              ) : (
                <ChevronRight className="h-5 w-5 text-primary-75" />
              )}
            </button>

            {openWeek === weekIndex && (
              <div className="p-4 bg-white">
                <div className="grid grid-cols-1 gap-2">
                  {week.days.map((day: string, dayIndex: number) => (
                    <div
                      key={dayIndex}
                      className="flex gap-3 p-3 rounded-lg border border-light-90 hover:border-primary-90 transition-colors"
                    >
                      <Calendar className="w-5 h-5 text-primary-75 mt-1 flex-shrink-0" />
                      <span className="text-grey-35">{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ProfessionalPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary-99 to-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-95 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-97 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="container mx-auto relative">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
                <Sparkles size={16} className="text-primary-75" />
                Professional Program
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6 leading-tight">
                45-Day Intensive Career Program with Job Guarantee
              </h1>

              <p className="text-xl text-primary-75 font-semibold mb-6">
                Your Career, Our Commitment!
              </p>

              <p className="text-grey-35 text-base md:text-lg leading-relaxed mb-8">
                At Eduwise Solutions, we specialize in empowering individuals
                with the skills and opportunities needed to thrive in
                today&apos;s competitive job market. Our comprehensive 45-day
                program is designed to equip you with fundamental skills to
                crack entry-level job interviews and secure employment with a
                guaranteed job placement.
              </p>
            </div>

            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-95 rounded-2xl transform rotate-3"></div>
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                  alt="Students learning"
                  width={1471}
                  height={980}
                  className="relative rounded-2xl shadow-lg w-full h-auto object-cover"
                  priority
                />

                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary-95 rounded-full p-2">
                      <Trophy className="h-6 w-6 text-primary-75" />
                    </div>
                    <div>
                      <p className="font-vietnam font-bold text-grey-15">
                        100% Job Guarantee
                      </p>
                      <p className="text-sm text-grey-35">
                        45-day intensive program
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 bg-white rounded-xl shadow-lg p-6">
            <div className="text-center">
              <p className="text-3xl font-vietnam font-bold text-primary-75">
                1000+
              </p>
              <p className="text-grey-35">Successful Placements</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-vietnam font-bold text-primary-75">
                45
              </p>
              <p className="text-grey-35">Days Program</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-vietnam font-bold text-primary-75">
                50+
              </p>
              <p className="text-grey-35">Industry Partners</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-vietnam font-bold text-primary-75">
                100%
              </p>
              <p className="text-grey-35">Job Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="features" className="py-16 bg-light-97">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
              <Sparkles size={16} className="text-primary-75" />
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15">
              Key Features of Our Program
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md border border-light-90 hover:border-primary-90 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary-95 flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="h-6 w-6 text-primary-75" />
                </div>
                <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-2">
                  {feature.title}
                </h3>
                <p className="text-grey-35">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Join Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
              <Users size={16} className="text-primary-75" />
              Target Audience
            </div>
            <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15">
              Who Can Join
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-3xl mx-auto">
            {programTargets.map((target, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md border border-light-90 hover:border-primary-90 hover:shadow-lg transition-all duration-300 w-full md:w-1/2 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary-95 flex items-center justify-center mx-auto mb-4">
                  <target.icon className="h-8 w-8 text-primary-75" />
                </div>
                <h3 className="text-xl font-vietnam font-bold text-grey-15">
                  {target.title}
                </h3>
              </div>
            ))}
          </div>

          <p className="text-center text-grey-35 mt-8 bg-white bg-opacity-50 p-3 rounded-lg inline-block mx-auto">
            **Note: Any Individuals who graduate can pursue the course*
          </p>
        </div>
      </section>

      {/* Program Highlights Section */}
      <section className="py-16 bg-light-97">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
              <Zap size={16} className="text-primary-75" />
              Program Features
            </div>
            <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15">
              Program Highlights
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programHighlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-light-90 hover:border-primary-90 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-primary-95 p-4">
                  <div className="flex items-center gap-3">
                    <highlight.icon className="w-6 h-6 text-primary-75" />
                    <h3 className="text-xl font-vietnam font-bold text-grey-15">
                      {highlight.category}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {highlight.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary-75 mt-1 flex-shrink-0" />
                        <span className="text-grey-35">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Assurance Service Section - Redesigned */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15">
              How It Works
            </h2>
            <p className="text-grey-35 mt-4 max-w-3xl mx-auto">
              Your journey to success in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {careerAssuranceSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-light-90 hover:border-primary-90 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4">
                  <span className="text-5xl font-light text-primary-95">
                    {index < 9 ? `0${step.number}` : step.number}
                  </span>
                </div>
                <h3 className="text-xl font-vietnam font-bold text-grey-15 mb-2">
                  {step.title}
                </h3>
                <p className="text-grey-35 text-sm">{step.description}</p>
                {index < careerAssuranceSteps.length - 1 && (
                  <div className="hidden md:flex justify-end mt-4">
                    <ChevronRight className="h-5 w-5 text-primary-75" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Overview Section - Redesigned */}
      <section
        id="curriculum"
        className="py-16 bg-gradient-to-b from-light-97 to-white"
      >
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
              <BookOpen size={16} className="text-primary-75" />
              Program Structure
            </div>
            <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15">
              Comprehensive Career Program
            </h2>
            <p className="text-grey-35 text-lg mt-4 max-w-3xl mx-auto">
              Our 45-day intensive program combines essential skills training
              with practical experience to make you job-ready
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programModules.map((module, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-b-4 border-primary-75"
              >
                <div className="bg-primary-95 p-6">
                  <div className="flex justify-between items-center mb-3">
                    <Badge className="bg-primary-75 text-white px-3 py-1">
                      Module {index + 1}
                    </Badge>
                    <div className="flex items-center text-black bg-white p-2 rounded-full text-xs font-medium">
                      <Clock size={16} className="mr-2" />
                      {module.duration}
                    </div>
                  </div>
                  <h3 className="text-xl font-vietnam font-bold text-grey-15">
                    {module.title}
                  </h3>
                  <p className="mt-2 text-grey-35">{module.description}</p>
                </div>

                <div className="p-6">
                  <h4 className="font-vietnam font-semibold text-grey-15 mb-3">
                    Key Focus Areas:
                  </h4>
                  <ul className="space-y-2">
                    {module.weeks.map((week, weekIdx) => (
                      <li key={weekIdx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary-75 mt-0.5 flex-shrink-0" />
                        <span className="text-grey-35">
                          {week.title.split(":")[1] || week.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 border-l-4 border-primary-75">
              <h3 className="text-2xl font-vietnam font-bold text-grey-15 mb-6">
                Career Opportunities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {careerOpportunities.map((career, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-95 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-primary-75" />
                    </div>
                    <div>
                      <h4 className="font-vietnam font-bold text-grey-15">
                        {career.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 border-l-4 border-primary-75">
              <h3 className="text-2xl font-vietnam font-bold text-grey-15 mb-6">
                Program Investment
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary-95 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-7 h-7 text-primary-75" />
                  </div>
                  <div>
                    <p className="text-grey-20 font-bold">Upfront Payment</p>
                    <p className="text-2xl font-vietnam font-bold text-primary-75">
                      ₹15,000
                    </p>
                    <p className="text-sm text-grey-35">One-time payment</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary-95 flex items-center justify-center flex-shrink-0">
                    <Handshake className="w-7 h-7 text-primary-75" />
                  </div>
                  <div>
                    <p className="text-grey-20 font-bold">
                      Pay After Placement
                    </p>
                    <p className="text-2xl font-vietnam font-bold text-primary-75">
                      ₹5,000{" "}
                      <span className="text-sm text-grey-35">
                        /month (6 months)
                      </span>
                    </p>
                    <p className="text-sm text-grey-35">Total: ₹30,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Curriculum Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm">
              <Calendar size={16} className="text-primary-75" />
              Detailed Curriculum
            </div>
            <h2 className="text-3xl md:text-4xl font-vietnam font-bold text-grey-15">
              Week-by-Week Program Breakdown
            </h2>
          </div>

          <div className="space-y-8">
            {programModules.map((module, moduleIndex) => (
              <CurriculumAccordion
                key={moduleIndex}
                module={module}
                moduleIndex={moduleIndex}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
