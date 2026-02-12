"use client";

import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const highlights = [
  "Complete the full course & assignments",
  "Must have overall attendance of 90% in Live Classes",
  "Not placed? Claim your 100% Fee Refund",
];

export default function RefundHighlight() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left: Icon and Main Message */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25 flex-shrink-0">
              <ShieldCheck
                className="w-8 h-8 md:w-10 md:h-10 text-white"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Risk-Free
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-vietnam font-bold text-grey-15">
                100% Placement Guarantee
              </h3>
              <p className="text-grey-40 text-sm md:text-base mt-1">
                We&apos;re confident in our placement success
              </p>
            </div>
          </div>

          {/* Center: Highlights */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            {highlights.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-grey-30">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-sm md:text-base font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* Right: CTA */}
          <Link
            href="/refund"
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105 flex-shrink-0"
          >
            Learn More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Note Section */}
        <div className="w-full bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 rounded-lg px-6 py-4 mt-8 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg
                className="w-5 h-5 text-amber-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm md:text-base text-amber-900 font-bold mb-3">
                Important Policy Information
              </p>
              <ul className="space-y-2 text-xs md:text-sm text-amber-800">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1 flex-shrink-0">•</span>
                  <span>
                    If you are changing batch, you will not be eligible for
                    refund as per policy.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1 flex-shrink-0">•</span>
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
