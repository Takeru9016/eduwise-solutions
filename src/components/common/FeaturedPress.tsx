import { Newspaper } from "lucide-react";
import type { SanityPressFeature } from "@/components/common/FeaturedPressCarousel";
import { FeaturedPressCarousel } from "@/components/common/FeaturedPressCarousel";
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
      <section className="relative overflow-hidden border-light-90 border-t bg-linear-to-b from-white via-light-99 to-light-97 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-99">
            <Newspaper className="h-8 w-8 text-primary-75" />
          </div>
          <h2 className="mb-3 font-bold text-2xl text-dark-20 lg:text-3xl">
            Press Coverage Coming Soon
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-dark-40 text-lg">
            We&apos;re actively working with leading media outlets. Featured
            articles and press coverage will be showcased here soon!
          </p>
          <div className="inline-flex items-center gap-2 rounded-lg border border-light-90 bg-white px-4 py-2 text-dark-40 text-sm shadow-xs">
            <Newspaper className="h-4 w-4 text-primary-75" />
            <span>Building Media Presence</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white via-light-99 to-light-97 py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-primary-90 opacity-10 blur-3xl" />
        <div className="absolute right-10 bottom-20 h-125 w-125 rounded-full bg-secondary-90 opacity-10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 font-bold text-3xl md:text-4xl lg:text-5xl">
            Featured On{" "}
            <span className="bg-linear-to-r from-primary-75 to-primary-90 bg-clip-text text-transparent">
              Leading Media Platforms
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-dark-40 text-lg">
            Trusted and recognized by India&apos;s leading media outlets
          </p>
        </div>

        <FeaturedPressCarousel pressFeatures={pressFeatures} />
      </div>
    </section>
  );
}
