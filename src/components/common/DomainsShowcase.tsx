import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { CATEGORIES, COURSES } from "@/data/courses";

// Row 1: large card on the left (development), two small on the right.
// Row 2: two small on the left, large card on the right (business) — the
// large-card position alternates per row instead of repeating.
const CARD_STYLE = [
  { span: "lg:col-span-2", tint: "bg-primary-99" },
  { span: "lg:col-span-1", tint: "bg-gold-90" },
  { span: "lg:col-span-1", tint: "bg-white" },
  { span: "lg:col-span-1", tint: "bg-primary-90" },
  { span: "lg:col-span-2", tint: "bg-light-95" },
  { span: "lg:col-span-1", tint: "bg-primary-95" },
] as const;

const DOMAIN_CARDS = CATEGORIES.map((category, index) => ({
  count: COURSES.filter((course) => course.category === category.id).length,
  ...category,
  ...CARD_STYLE[index % CARD_STYLE.length],
}));

export default function DomainsShowcase() {
  const totalPrograms = COURSES.length;

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container">
        <div className="mb-12 text-center lg:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-semibold text-grey-15 text-sm">
            <Sparkles className="h-4 w-4" />
            {totalPrograms}+ Career Programs
          </div>
          <h2 className="mb-4 font-black font-vietnam text-4xl text-grey-15 tracking-tight sm:text-5xl">
            Pick Your Path
          </h2>
          <p className="mx-auto max-w-xl text-grey-40 text-lg leading-relaxed">
            Six career domains, one goal — job-ready skills backed by industry
            mentors.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DOMAIN_CARDS.map((domain) => {
            const isLarge = domain.span === "lg:col-span-2";
            const Icon = domain.icon;

            return (
              <Link
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-grey-15 p-6 shadow-[4px_4px_0_0_var(--color-grey-15)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-grey-15)] sm:p-8 ${domain.span} ${domain.tint}`}
                href={`/courses?category=${domain.id}`}
                key={domain.id}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex items-center justify-center rounded-full border-2 border-grey-15 bg-white ${
                      isLarge ? "h-14 w-14" : "h-12 w-12"
                    }`}
                  >
                    <Icon
                      className={isLarge ? "h-7 w-7" : "h-6 w-6"}
                      strokeWidth={2}
                    />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-grey-40 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-grey-15" />
                </div>

                <div className="mt-8">
                  <h3
                    className={`font-bold font-vietnam text-grey-15 ${
                      isLarge ? "text-2xl sm:text-3xl" : "text-xl"
                    }`}
                  >
                    {domain.label}
                  </h3>
                  <p className="mt-1 text-grey-40 text-sm">
                    {domain.count} Career{" "}
                    {domain.count === 1 ? "Program" : "Programs"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
