import type { AwsPageContent } from "@/types/pages";

export default function AWSCategories({
  content,
}: {
  content: NonNullable<AwsPageContent["tracks"]>;
}) {
  const cards = content.cards ?? [];
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-bold text-grey-15 text-sm">
            {content.eyebrow}
          </div>
          <h2 className="mb-4 font-black font-vietnam text-3xl text-grey-15 lg:text-5xl">
            {content.heading}
          </h2>
          <p className="mx-auto max-w-2xl text-grey-35 text-lg">
            {content.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {cards.map((card) => (
            <div
              className={`rounded-3xl border-2 border-grey-15 p-8 shadow-[4px_4px_0_0_var(--color-grey-15)] ${card.tint ?? "bg-primary-99"}`}
              key={card.title}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-grey-15 bg-white font-black text-grey-15 text-lg">
                  {card.letter}
                </span>
                <h3 className="font-black font-vietnam text-grey-15 text-xl">
                  {card.title}
                </h3>
              </div>
              <p className="mb-5 text-grey-35 text-sm leading-relaxed">
                {card.intro}
              </p>
              <p className="mb-3 font-bold text-grey-15 text-sm uppercase tracking-wide">
                {card.listLabel}
              </p>
              <ul className="space-y-2">
                {(card.items ?? []).map((item) => (
                  <li
                    className="flex items-center gap-2 text-grey-35 text-sm"
                    key={item}
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-grey-15" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
