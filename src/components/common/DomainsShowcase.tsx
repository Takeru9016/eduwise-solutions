import { ArrowUpRight, GraduationCap } from "lucide-react";
import Link from "next/link";

import { CATEGORIES } from "@/data/courses";
import { getIcon } from "@/lib/icon-map";
import type { HomePageContent } from "@/types/pages";

// With four or more cards: large card on the left of row 1 and on the right
// of row 2, alternating per row. With fewer, cards share the row equally.
const CARD_STYLE = [
  { span: "lg:col-span-2", tint: "bg-primary-99" },
  { span: "lg:col-span-1", tint: "bg-gold-90" },
  { span: "lg:col-span-1", tint: "bg-white" },
  { span: "lg:col-span-1", tint: "bg-primary-90" },
  { span: "lg:col-span-2", tint: "bg-light-95" },
  { span: "lg:col-span-1", tint: "bg-primary-95" },
] as const;

const GRID_COLUMNS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
};

const DEFAULT_CARDS = CATEGORIES.map((category) => ({
  category: category.id,
  icon: undefined,
  title: category.label,
}));

export default function DomainsShowcase({
  content,
  courseCategories,
}: {
  content: NonNullable<HomePageContent["domains"]>;
  courseCategories: string[];
}) {
  const countByCategory = new Map<string, number>();
  for (const category of courseCategories) {
    countByCategory.set(category, (countByCategory.get(category) ?? 0) + 1);
  }

  const configuredCards = content.cards?.length ? content.cards : DEFAULT_CARDS;
  const liveCards = configuredCards.filter(
    (card) => (countByCategory.get(card.category) ?? 0) > 0
  );
  const useLargeCards = liveCards.length > 3;
  const visibleCards = liveCards.map((card, index) => {
    const fallback = CATEGORIES.find((c) => c.id === card.category);
    const base = CARD_STYLE[index % CARD_STYLE.length];
    return {
      category: card.category,
      count: countByCategory.get(card.category) ?? 0,
      Icon: card.icon ? getIcon(card.icon) : (fallback?.icon ?? GraduationCap),
      span: useLargeCards ? base.span : "",
      tint: base.tint,
      title: card.title || fallback?.label || card.category,
    };
  });

  const totalPrograms = courseCategories.length;
  const gridColumns = useLargeCards
    ? "lg:grid-cols-4"
    : GRID_COLUMNS[visibleCards.length];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container">
        <div className="mb-12 text-center lg:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-semibold text-grey-15 text-sm">
            <GraduationCap className="h-4 w-4" />
            {totalPrograms} Career{" "}
            {totalPrograms === 1 ? "Program" : "Programs"}
          </div>
          <h2 className="mb-4 font-black font-vietnam text-4xl text-grey-15 tracking-tight sm:text-5xl">
            {content.heading}
          </h2>
          <p className="mx-auto max-w-xl text-grey-40 text-lg leading-relaxed">
            {content.subheading}
          </p>
        </div>

        <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${gridColumns}`}>
          {visibleCards.map((domain) => {
            const isLarge = domain.span === "lg:col-span-2" || !useLargeCards;
            const Icon = domain.Icon;

            return (
              <Link
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-grey-15 p-6 shadow-[4px_4px_0_0_var(--color-grey-15)] transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-grey-15)] sm:p-8 ${domain.span} ${domain.tint}`}
                href={`/courses?category=${domain.category}`}
                key={domain.category}
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
                    {domain.title}
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
