import {
  ArrowUpRight,
  Award,
  BrainCircuit,
  CalendarClock,
  Code2,
  MessageSquare,
  PieChart,
  Play,
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

          {/* Right column - next-cohort urgency card, no photos */}
          <div className="mx-auto flex w-full max-w-md items-center lg:mx-0 lg:max-w-none">
            <div className="w-full rounded-3xl border-2 border-grey-15 bg-gold p-8 shadow-[8px_8px_0_0_var(--color-grey-15)] sm:p-10 lg:p-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-grey-15 bg-white">
                <CalendarClock className="h-6 w-6 text-grey-15" />
              </div>

              <p className="mt-6 font-bold text-grey-15 text-xs uppercase tracking-wider">
                Enrollment Open
              </p>
              <h2 className="mt-2 font-black font-vietnam text-3xl text-grey-15 leading-tight sm:text-4xl">
                New batches start every month
              </h2>
              <p className="mt-4 max-w-sm text-grey-20 leading-relaxed">
                Live, mentor-led classes - no fixed intake, no long wait. Pick a
                program and start learning within weeks.
              </p>

              <Link className="mt-8 inline-block" href="/courses">
                <Button className="h-auto rounded-full border-2 border-grey-15 bg-white px-7 py-3.5 font-bold text-base text-grey-15 shadow-none transition-transform hover:-translate-y-0.5 hover:bg-primary-99">
                  Enroll Now
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
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
              <div className="text-grey-40 text-sm">Placement Assistance</div>
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
