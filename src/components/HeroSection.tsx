import {
  Award,
  BrainCircuit,
  Check,
  Code2,
  MessageSquare,
  PieChart,
  Play,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const TOOL_ICONS = [
  { Icon: BrainCircuit, label: "AI-assisted learning" },
  { Icon: Code2, label: "Hands-on projects" },
  { Icon: PieChart, label: "Career analytics" },
  { Icon: MessageSquare, label: "1:1 mentorship" },
  { Icon: Award, label: "Certification prep" },
];

const SKILL_TAGS = [
  { filled: true, label: "AI & Data Science" },
  { filled: false, label: "Cloud & DevOps" },
  { filled: false, label: "Full Stack Dev" },
  { filled: false, label: "Cyber Security" },
];

const LEARNING_PATH = [
  { done: true, label: "AI & Data Science" },
  { done: true, label: "Cloud & DevOps" },
  { done: false, label: "Full Stack Development" },
  { done: false, label: "Cyber Security" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-light-97 py-14 sm:py-20 lg:py-24">
      <div className="container relative">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-8">
          {/* Left column - copy */}
          <div className="text-center lg:text-left">
            <h1 className="pt-2 font-black font-vietnam text-6xl text-grey-15 leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl">
              <span className="block">Accelerate</span>
              <span className="block">Your Tech</span>
              <span className="block">Career</span>
            </h1>

            {/* Decorative pill/dot indicator */}
            <div className="mt-8 flex items-center justify-center gap-2 lg:justify-start">
              <span className="h-3 w-14 rounded-full bg-grey-15" />
              <span className="h-3 w-3 rounded-full bg-primary-75" />
              <span className="h-3 w-3 rounded-full bg-grey-15" />
              <span className="h-3 w-9 rounded-full bg-primary-75" />
            </div>

            <p className="mx-auto mt-6 max-w-md text-grey-35 text-lg leading-relaxed lg:mx-0">
              Job-ready courses in AI, cloud, and development - built with
              industry mentors to turn curiosity into a career.
            </p>

            <div className="mt-8">
              <Link href="/courses">
                <Button className="h-auto rounded-full border-2 border-grey-15 bg-primary-75 px-8 py-4 font-bold text-base text-grey-15 shadow-none transition-transform hover:-translate-y-0.5 hover:bg-primary-80">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>

          {/* Right column - sticker collage, floating pills + info card, no photos */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative aspect-square w-full max-w-sm lg:max-w-95">
                {/* Primary panel - mock learning-path dashboard */}
                <div className="absolute top-0 right-0 h-4/5 w-4/5 rotate-2 overflow-hidden rounded-3xl border-2 border-grey-15 bg-white shadow-[8px_8px_0_0_var(--color-grey-15)]">
                  <div className="flex items-center gap-1.5 border-grey-15 border-b-2 bg-grey-15 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-primary-75" />
                    <span className="ml-2 font-bold text-white/70 text-xs">
                      Your Learning Path
                    </span>
                  </div>
                  <div className="space-y-3 p-5">
                    {LEARNING_PATH.map((step) => (
                      <div className="flex items-center gap-3" key={step.label}>
                        <div
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 ${
                            step.done ? "bg-primary-75" : "bg-white"
                          }`}
                        >
                          {step.done && (
                            <Check className="h-3.5 w-3.5 text-grey-15" />
                          )}
                        </div>
                        <span className="font-semibold text-grey-15 text-sm">
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secondary panel - stat sticker */}
                <div className="absolute bottom-0 left-0 h-3/5 w-3/5 -rotate-6 overflow-hidden rounded-2xl border-2 border-grey-15 bg-gold shadow-[6px_6px_0_0_var(--color-grey-15)]">
                  <div className="flex h-full flex-col items-center justify-center gap-1 p-4 text-center">
                    <Award className="h-8 w-8 text-grey-15" />
                    <div className="font-black font-vietnam text-4xl text-grey-15">
                      100%
                    </div>
                    <div className="font-semibold text-grey-15/70 text-xs">
                      Placement Assurance
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating skill tags - stacked along the top-right edge */}
              <div className="absolute top-4 right-0 flex flex-col items-end gap-2 lg:right-[-8%]">
                {SKILL_TAGS.map((tag) => (
                  <span
                    className={`whitespace-nowrap rounded-full border-2 border-grey-15 px-4 py-2 font-semibold text-xs sm:text-sm ${
                      tag.filled
                        ? "bg-gold text-grey-15"
                        : "bg-white text-grey-15"
                    }`}
                    key={tag.label}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>

              {/* Floating info card - overlapping bottom-right */}
              <div className="absolute right-0 bottom-8 w-56 rounded-2xl border border-light-90 bg-white p-4 shadow-xl lg:right-[-6%] lg:bottom-0">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold">
                    <ShieldCheck className="h-4 w-4 text-grey-15" />
                  </div>
                  <h3 className="font-bold font-vietnam text-grey-15 text-sm">
                    Mentor-Led Learning
                  </h3>
                </div>
                <p className="text-grey-40 text-xs leading-relaxed">
                  Learn directly from industry experts with hands-on projects
                  and real interview practice.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row - stats (under col 1) and course strip (under col 2), same row */}
        <div className="mt-16 grid items-center gap-10 lg:mt-20 lg:grid-cols-[1fr_1.3fr] lg:gap-8">
          <div className="mx-auto grid w-fit grid-cols-2 gap-x-8 gap-y-6 text-center lg:mx-0 lg:text-left">
            <div>
              <div className="font-black font-vietnam text-4xl text-grey-15">
                17+
              </div>
              <div className="text-grey-40 text-sm">Courses</div>
            </div>
            <div>
              <div className="font-black font-vietnam text-4xl text-grey-15">
                8,000+
              </div>
              <div className="text-grey-40 text-sm">Learners</div>
            </div>
            <div>
              <div className="font-black font-vietnam text-4xl text-grey-15">
                50+
              </div>
              <div className="text-grey-40 text-sm">Industry Projects</div>
            </div>
            <div>
              <div className="font-black font-vietnam text-4xl text-grey-15">
                100%
              </div>
              <div className="text-grey-40 text-sm">Placement Assurance</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <div className="relative aspect-4/3 w-full max-w-56 shrink-0 overflow-hidden rounded-[40%] border-2 border-grey-15 shadow-lg">
              <Image
                alt="Learners collaborating on a project with Eduwise Solutions"
                className="h-full w-full object-cover"
                fill
                sizes="224px"
                src="/home/benefits/mentor-support.jpg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-grey-15/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-grey-15 bg-white">
                  <Play className="ml-0.5 h-4 w-4 fill-grey-15 text-grey-15" />
                </div>
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="mb-4 font-bold font-vietnam text-grey-15 text-xl leading-snug sm:text-2xl">
                17+ programs across 6 domains - pick one and start this month
              </h2>
              <div className="flex justify-center gap-3 sm:justify-start">
                {TOOL_ICONS.map(({ Icon, label }) => (
                  <div
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-grey-15 bg-white text-grey-15"
                    key={label}
                    role="img"
                    title={label}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
