"use client";

import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";

const highlights = [
  "Complete the 100% Course",
  "Must have overall attendance of 90% in Live Classes",
  "Complete all Assignments and Projects",
];

export default function RefundHighlight() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 py-12 md:py-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-cyan-200/30 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12">
          {/* Left: Icon and Main Message */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/25 shadow-lg md:h-20 md:w-20">
              <ShieldCheck
                className="h-8 w-8 text-white md:h-10 md:w-10"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-emerald-100 px-3 py-1 font-bold text-emerald-700 text-xs uppercase tracking-wide">
                  Risk-Free
                </span>
              </div>
              <h3 className="font-bold font-vietnam text-2xl text-grey-15 md:text-3xl">
                100% Placement Guarantee
              </h3>
              <p className="mt-1 text-grey-40 text-sm md:text-base">
                We&apos;re confident in our placement success
              </p>
            </div>
          </div>

          {/* Center: Highlights */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
            {highlights.map((item, index) => (
              <div className="flex items-center gap-2 text-grey-30" key={index}>
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                <span className="font-medium text-sm md:text-base">{item}</span>
              </div>
            ))}
          </div>

          {/* Right: CTA */}
          <Link
            className="group inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/25 hover:shadow-xl"
            href="/refund"
          >
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Note Section */}
        <div className="mt-8 w-full rounded-lg border-amber-400 border-l-4 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex-shrink-0">
              <svg
                className="h-5 w-5 text-amber-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="mb-3 font-bold text-amber-900 text-sm md:text-base">
                Important Policy Information
              </p>
              <ul className="space-y-2 text-amber-800 text-xs md:text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1 flex-shrink-0 text-amber-600">•</span>
                  <span>
                    If you are changing batch, you will not be eligible for
                    refund as per policy.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 flex-shrink-0 text-amber-600">•</span>
                  <span>
                    Course duration will start from the date of allotment of
                    Batch.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
