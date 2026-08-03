"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FAQS } from "./aws-data";

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <button
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 font-bold text-emerald-700 text-xs">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-semibold text-gray-900 text-sm leading-snug sm:text-base">
            {q}
          </span>
        </div>
        <ChevronDown
          aria-hidden="true"
          className={`h-5 w-5 shrink-0 text-emerald-600 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-gray-100 border-t px-6 pt-0 pb-5">
          <p className="mt-4 text-gray-600 text-sm leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function AWSFaqAccordion() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block font-semibold text-emerald-600 text-sm uppercase tracking-widest">
            Have Questions?
          </span>
          <h2 className="mb-4 font-extrabold text-3xl text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500">
            Everything you need to know about AWS Certifications and exam
            vouchers.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FaqItem a={faq.a} index={i} key={i} q={faq.q} />
          ))}
        </div>
      </div>
    </section>
  );
}
