import {
  Award,
  Code2,
  MessageSquare,
  PieChart,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const SKILL_TAGS = [
  { filled: true, label: "AI & Data Science" },
  { filled: false, label: "Cloud & DevOps" },
  { filled: false, label: "Full Stack Dev" },
  { filled: false, label: "Cyber Security" },
];

const TOOL_ICONS = [
  { Icon: Sparkles, label: "AI-assisted learning" },
  { Icon: Code2, label: "Hands-on projects" },
  { Icon: PieChart, label: "Career analytics" },
  { Icon: MessageSquare, label: "1:1 mentorship" },
  { Icon: Award, label: "Certification prep" },
];

// 6-lobe scalloped flower: r(theta) = 0.40 + 0.055*cos(6*theta), 36 samples
// joined with a Catmull-Rom-fitted closed cubic-bezier for round petal tips.
const heroBlobPath =
  "M0.9550,0.5000 C0.9550,0.5247 0.9385,0.5530 0.9210,0.5742 C0.9035,0.5955 0.8704,0.6110 0.8500,0.6274 C0.8297,0.6438 0.8096,0.6538 0.7988,0.6725 C0.7880,0.6912 0.7893,0.7136 0.7854,0.7394 C0.7814,0.7653 0.7844,0.8017 0.7748,0.8275 C0.7651,0.8533 0.7489,0.8817 0.7275,0.8940 C0.7061,0.9064 0.6733,0.9063 0.6462,0.9017 C0.6191,0.8972 0.5891,0.8763 0.5647,0.8668 C0.5403,0.8574 0.5216,0.8450 0.5000,0.8450 C0.4784,0.8450 0.4597,0.8574 0.4353,0.8668 C0.4109,0.8763 0.3809,0.8972 0.3538,0.9017 C0.3267,0.9063 0.2939,0.9064 0.2725,0.8940 C0.2511,0.8817 0.2349,0.8533 0.2252,0.8275 C0.2156,0.8017 0.2186,0.7653 0.2146,0.7394 C0.2107,0.7136 0.2120,0.6912 0.2012,0.6725 C0.1904,0.6538 0.1703,0.6438 0.1500,0.6274 C0.1296,0.6110 0.0965,0.5955 0.0790,0.5742 C0.0615,0.5530 0.0450,0.5247 0.0450,0.5000 C0.0450,0.4753 0.0615,0.4470 0.0790,0.4258 C0.0965,0.4045 0.1296,0.3890 0.1500,0.3726 C0.1703,0.3562 0.1904,0.3462 0.2012,0.3275 C0.2120,0.3088 0.2107,0.2864 0.2146,0.2606 C0.2186,0.2347 0.2156,0.1983 0.2252,0.1725 C0.2349,0.1467 0.2511,0.1183 0.2725,0.1060 C0.2939,0.0936 0.3267,0.0937 0.3538,0.0983 C0.3809,0.1028 0.4109,0.1237 0.4353,0.1332 C0.4597,0.1426 0.4784,0.1550 0.5000,0.1550 C0.5216,0.1550 0.5403,0.1426 0.5647,0.1332 C0.5891,0.1237 0.6191,0.1028 0.6462,0.0983 C0.6733,0.0937 0.7061,0.0936 0.7275,0.1060 C0.7489,0.1183 0.7651,0.1467 0.7748,0.1725 C0.7844,0.1983 0.7814,0.2347 0.7854,0.2606 C0.7893,0.2864 0.7880,0.3088 0.7988,0.3275 C0.8096,0.3462 0.8297,0.3562 0.8500,0.3726 C0.8704,0.3890 0.9035,0.4045 0.9210,0.4258 C0.9385,0.4470 0.9550,0.4753 0.9550,0.5000 Z";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-light-97 py-14 sm:py-20 lg:py-24">
      {/* Reusable blob clip-path, shared by the photo and its backdrop shapes */}
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <defs>
          <clipPath clipPathUnits="objectBoundingBox" id="hero-blob">
            <path d={heroBlobPath} />
          </clipPath>
        </defs>
      </svg>

      <div className="container relative">
        <div className="grid items-start gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-8">
          {/* Left column — copy */}
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
              Job-ready courses in AI, cloud, and development — built with
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

          {/* Right column — photo, blob backdrop, floating badges */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative aspect-square w-full max-w-sm lg:max-w-95">
                {/* Shadow, green, and gold blob layers (sticker-stack effect) */}
                <div
                  className="absolute inset-0 translate-x-3 translate-y-4 bg-grey-15"
                  style={{ clipPath: "url(#hero-blob)" }}
                />
                <div
                  className="absolute inset-0 translate-x-2 translate-y-1 bg-primary-75"
                  style={{ clipPath: "url(#hero-blob)" }}
                />
                <div
                  className="absolute inset-0 bg-gold"
                  style={{ clipPath: "url(#hero-blob)" }}
                />
                <div
                  className="absolute inset-[6%] overflow-hidden"
                  style={{ clipPath: "url(#hero-blob)" }}
                >
                  <Image
                    alt="Eduwise Solutions learner"
                    className="h-full w-full object-cover"
                    fill
                    priority
                    sizes="(min-width: 1024px) 380px, 320px"
                    src="/home/hero/woman-portrait.jpg"
                  />
                </div>
              </div>

              {/* Floating skill tags — stacked along the blob's upper-right edge */}
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

              {/* Floating info card — soft card, lower-right, overlapping the blob's bottom edge */}
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

        {/* Bottom row — stats (under col 1) and course strip (under col 2), same row */}
        <div className="mt-16 grid items-center gap-10 lg:mt-20 lg:grid-cols-[1fr_1.3fr] lg:gap-8">
          <div className="flex items-center justify-center gap-10 lg:justify-start">
            <div>
              <div className="font-black font-vietnam text-4xl text-grey-15">
                17+
              </div>
              <div className="text-grey-40 text-sm">Career Programs</div>
            </div>
            <div>
              <div className="font-black font-vietnam text-4xl text-grey-15">
                7+
              </div>
              <div className="text-grey-40 text-sm">Course Categories</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <div className="relative aspect-4/3 w-full max-w-56 shrink-0 overflow-hidden rounded-[40%] border-2 border-grey-15 shadow-lg">
              <Image
                alt="Student learning with Eduwise Solutions"
                className="h-full w-full object-cover"
                fill
                sizes="224px"
                src="/home/hero/classroom.jpg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-grey-15/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-grey-15 bg-white">
                  <Play className="ml-0.5 h-4 w-4 fill-grey-15 text-grey-15" />
                </div>
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2 className="mb-4 font-bold font-vietnam text-grey-15 text-xl leading-snug sm:text-2xl">
                We have 17+ industry-aligned courses to fast-track your career
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
