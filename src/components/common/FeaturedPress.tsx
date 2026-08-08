import { ArrowUpRight, Newspaper } from "lucide-react";
import Link from "next/link";

import { PressLogoMarquee } from "@/components/common/PressLogoMarquee";
import type { SanityPressFeature } from "@/components/press/PressCard";
import { PressCard } from "@/components/press/PressCard";
import { client } from "@/sanity/lib/client";
import { PRESS_FEATURES_QUERY } from "@/sanity/lib/queries";

export default async function FeaturedPress() {
  let pressFeatures: SanityPressFeature[] = [];

  try {
    pressFeatures =
      (await client.fetch<SanityPressFeature[]>(PRESS_FEATURES_QUERY)) || [];
  } catch (error) {
    console.error("Error fetching press features:", error);
    pressFeatures = [];
  }

  // Empty state - no data
  if (pressFeatures.length === 0) {
    return (
      <section className="bg-light-97 py-16 md:py-24">
        <div className="container text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-grey-15 bg-white">
            <Newspaper className="h-8 w-8 text-grey-15" />
          </div>
          <h2 className="mb-3 font-black font-vietnam text-2xl text-grey-15 lg:text-3xl">
            Press Coverage Coming Soon
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-grey-40 text-lg">
            We&apos;re actively working with leading media outlets. Featured
            articles and press coverage will be showcased here soon!
          </p>
        </div>
      </section>
    );
  }

  const featured = pressFeatures.filter((f) => f.featured).slice(0, 3);
  const highlightIds = new Set(featured.map((f) => f._id));
  const logos = pressFeatures
    .filter((f) => !highlightIds.has(f._id))
    .map((f) => ({ logoUrl: f.publicationLogoUrl, name: f.publicationName }));

  return (
    <section className="bg-light-97 py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 font-black font-vietnam text-3xl text-grey-15 tracking-tight md:text-4xl lg:text-5xl">
            Featured On Leading Media Platforms
          </h2>
          <p className="mx-auto max-w-2xl text-grey-40 text-lg">
            {pressFeatures.length}+ features and mentions across India&apos;s
            leading publications
          </p>
        </div>

        {featured.length > 0 && (
          <div className="mb-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((feature) => (
              <PressCard feature={feature} key={feature._id} />
            ))}
          </div>
        )}

        {logos.length > 0 && <PressLogoMarquee logos={logos} />}

        <div className="mt-12 text-center">
          <Link
            className="group inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-6 py-3 font-bold text-grey-15 transition-transform hover:-translate-y-0.5"
            href="/press"
          >
            View All Press Coverage
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
