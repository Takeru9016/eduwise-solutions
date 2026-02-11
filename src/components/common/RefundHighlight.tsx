"use client";

import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const highlights = [
  "Complete the full course & assignments",
  "Apply for jobs with our placement support",
  "Not placed? Claim your 100% refund",
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
                100% Refund Guarantee
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
      </div>
    </section>
  );
}
