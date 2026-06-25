"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "./aws-data";

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset"
      >
        <div className="flex items-center gap-4">
          <span className="shrink-0 w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">
            {q}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-emerald-600 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-5 pt-0 border-t border-gray-100">
          <p className="text-gray-600 text-sm leading-relaxed mt-4">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function AWSFaqAccordion() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Have Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500">
            Everything you need to know about AWS Certifications and exam
            vouchers.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
