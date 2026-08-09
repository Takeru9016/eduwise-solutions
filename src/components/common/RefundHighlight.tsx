"use client";

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const highlights = [
  "Complete the 100% Course",
  "Must have overall attendance of 90% in Live Classes",
  "Complete all Assignments and Projects",
];

const policyNotes = [
  "If you are changing batch, you will not be eligible for refund as per policy.",
  "Course duration will start from the date of allotment of Batch.",
];

export default function RefundHighlight() {
  return (
    <section className="bg-light-97 py-12 md:py-16">
      <div className="container">
        <div className="rounded-3xl border-2 border-grey-15 bg-white p-6 shadow-[4px_4px_0_0_var(--color-grey-15)] sm:p-8">
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row lg:gap-12">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-grey-15 bg-primary-90 md:h-20 md:w-20">
                <ShieldCheck
                  className="h-8 w-8 text-grey-15 md:h-10 md:w-10"
                  strokeWidth={1.5}
                />
              </div>
              <div>
                <span className="mb-1 inline-flex items-center rounded-full border-2 border-grey-15 bg-gold-90 px-3 py-1 font-bold text-grey-15 text-xs uppercase tracking-wide">
                  Risk-Free
                </span>
                <h3 className="font-black font-vietnam text-2xl text-grey-15 md:text-3xl">
                  100% Placement Guarantee
                </h3>
                <p className="mt-1 text-grey-40 text-sm md:text-base">
                  We&apos;re confident in our placement success
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              {highlights.map((item) => (
                <div
                  className="flex items-center gap-2 text-grey-30"
                  key={item}
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary-75" />
                  <span className="font-semibold text-sm md:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 px-6 py-3 font-bold text-grey-15 transition-colors hover:bg-primary-90"
              href="/refund"
            >
              Learn More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-8 w-full rounded-2xl border-2 border-grey-15/10 bg-light-97 px-6 py-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-grey-15" />
              <div className="flex-1">
                <p className="mb-3 font-bold text-grey-15 text-sm md:text-base">
                  Important Policy Information
                </p>
                <ul className="space-y-2 text-grey-35 text-xs md:text-sm">
                  {policyNotes.map((note) => (
                    <li className="flex items-start gap-2" key={note}>
                      <span className="mt-1 shrink-0 text-grey-40">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
