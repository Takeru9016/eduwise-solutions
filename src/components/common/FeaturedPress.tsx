"use client";

import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { client } from "@/sanity/lib/client";
import { PRESS_FEATURES_QUERY } from "@/sanity/lib/queries";

// Sanity press feature type
interface SanityPressFeature {
  _id: string;
  articleUrl: string;
  description: string;
  featured?: boolean;
  headline: string;
  order: number;
  publicationLogoUrl: string;
  publicationName: string;
  publishedAt?: string;
}

// Loading skeleton component
function PressFeatureSkeleton() {
  return (
    <div className="rounded-2xl border border-light-90 bg-white/60 p-6 backdrop-blur-xs md:p-8">
      <div className="mb-6 flex h-16 items-center">
        <Skeleton className="h-12 w-40" />
      </div>
      <Skeleton className="mb-2 h-6 w-full" />
      <Skeleton className="mb-4 h-6 w-3/4" />
      <Skeleton className="mb-6 h-20 w-full" />
      <Skeleton className="h-10 w-32" />
    </div>
  );
}

// Main component - Client Component with Carousel
export default function FeaturedPress() {
  const [pressFeatures, setPressFeatures] = useState<SanityPressFeature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPressFeatures() {
      try {
        const features =
          await client.fetch<SanityPressFeature[]>(PRESS_FEATURES_QUERY);
        setPressFeatures(features || []);
      } catch (error) {
        console.error("Error fetching press features:", error);
        setPressFeatures([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPressFeatures();
  }, []);

  // Empty state - no data
  if (!loading && (!pressFeatures || pressFeatures.length === 0)) {
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
        <div className="absolute right-10 bottom-20 h-[500px] w-[500px] rounded-full bg-secondary-90 opacity-10 blur-3xl" />
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

        {/* Carousel */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <PressFeatureSkeleton key={i} />
            ))}
          </div>
        ) : (
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
          >
            <CarouselContent className="-ml-4">
              {pressFeatures.map((feature) => (
                <CarouselItem
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                  key={feature._id}
                >
                  <article className="group relative flex h-full flex-col rounded-2xl border border-light-90 bg-white/60 p-6 shadow-xs backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8">
                    {/* Featured Badge */}
                    {feature.featured && (
                      <div className="absolute top-4 right-4 rounded-full bg-linear-to-r from-primary-50 to-secondary-50 px-3 py-1 font-semibold text-white text-xs">
                        Featured
                      </div>
                    )}

                    {/* Publication Logo */}
                    <div className="mb-6 flex h-16 items-center justify-start">
                      {feature.publicationLogoUrl ? (
                        <div className="relative h-full w-auto max-w-[200px]">
                          <Image
                            alt={`${feature.publicationName} logo`}
                            className="h-full w-auto object-contain object-left"
                            height={64}
                            src={feature.publicationLogoUrl}
                            width={200}
                          />
                        </div>
                      ) : (
                        <h3 className="font-bold text-2xl text-dark-20">
                          {feature.publicationName}
                        </h3>
                      )}
                    </div>

                    {/* Article Headline */}
                    <h4 className="mb-3 line-clamp-2 min-h-14 font-bold text-dark-20 text-lg md:text-xl">
                      {feature.headline}
                    </h4>

                    {/* Description */}
                    <p className="mb-6 line-clamp-3 min-h-18 grow text-dark-40 text-sm md:text-base">
                      {feature.description}
                    </p>

                    {/* CTA Link */}
                    <Link
                      className="mt-auto inline-flex items-center gap-2 font-semibold text-primary-40 text-sm transition-all duration-300 group-hover:gap-3 md:text-base"
                      href={feature.articleUrl}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Read Full Article
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 -z-10 rounded-2xl bg-linear-to-br from-primary-95 to-secondary-95 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <CarouselPrevious className="-left-4 hidden border-light-90 bg-white/80 text-dark-20 backdrop-blur-xs hover:border-primary-90 hover:bg-white hover:text-primary-50 md:flex lg:-left-12" />
            <CarouselNext className="-right-4 hidden border-light-90 bg-white/80 text-dark-20 backdrop-blur-xs hover:border-primary-90 hover:bg-white hover:text-primary-50 md:flex lg:-right-12" />
          </Carousel>
        )}
      </div>
    </section>
  );
}
