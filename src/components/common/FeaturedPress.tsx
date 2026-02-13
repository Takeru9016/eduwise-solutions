"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import { client } from "@/sanity/lib/client";
import { PRESS_FEATURES_QUERY } from "@/sanity/lib/queries";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Sanity press feature type
interface SanityPressFeature {
  _id: string;
  publicationName: string;
  publicationLogoUrl: string;
  headline: string;
  description: string;
  articleUrl: string;
  publishedAt?: string;
  order: number;
  featured?: boolean;
}

// Loading skeleton component
function PressFeatureSkeleton() {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-light-90">
      <div className="mb-6 h-16 flex items-center">
        <Skeleton className="h-12 w-40" />
      </div>
      <Skeleton className="h-6 w-full mb-2" />
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-20 w-full mb-6" />
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
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-white via-light-99 to-light-97 overflow-hidden border-t border-light-90">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-99 rounded-full mb-6">
            <Newspaper className="w-8 h-8 text-primary-75" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-dark-20 mb-3">
            Press Coverage Coming Soon
          </h2>
          <p className="text-dark-40 text-lg max-w-2xl mx-auto mb-6">
            We&apos;re actively working with leading media outlets. Featured
            articles and press coverage will be showcased here soon!
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm text-dark-40 border border-light-90 shadow-sm">
            <Newspaper className="w-4 h-4 text-primary-75" />
            <span>Building Media Presence</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-white via-light-99 to-light-97 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary-90 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-secondary-90 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Featured On{" "}
            <span className="bg-gradient-to-r from-primary-75 to-primary-90 bg-clip-text text-transparent">
              Leading Media Platforms
            </span>
          </h2>
          <p className="text-lg text-dark-40 max-w-2xl mx-auto">
            Trusted and recognized by India&apos;s leading media outlets
          </p>
        </div>

        {/* Carousel */}
        {loading ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((i) => (
              <PressFeatureSkeleton key={i} />
            ))}
          </div>
        : <Carousel
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
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {pressFeatures.map((feature) => (
                <CarouselItem
                  key={feature._id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <article className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-light-90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                    {/* Featured Badge */}
                    {feature.featured && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-50 to-secondary-50 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Featured
                      </div>
                    )}

                    {/* Publication Logo */}
                    <div className="mb-6 h-16 flex items-center justify-start">
                      {feature.publicationLogoUrl ?
                        <div className="relative h-full w-auto max-w-[200px]">
                          <Image
                            src={feature.publicationLogoUrl}
                            alt={`${feature.publicationName} logo`}
                            width={200}
                            height={64}
                            className="object-contain object-left h-full w-auto"
                          />
                        </div>
                      : <h3 className="text-2xl font-bold text-dark-20">
                          {feature.publicationName}
                        </h3>
                      }
                    </div>

                    {/* Article Headline */}
                    <h4 className="text-lg md:text-xl font-bold text-dark-20 mb-3 line-clamp-2 min-h-[3.5rem]">
                      {feature.headline}
                    </h4>

                    {/* Description */}
                    <p className="text-dark-40 text-sm md:text-base mb-6 line-clamp-3 min-h-[4.5rem] flex-grow">
                      {feature.description}
                    </p>

                    {/* CTA Link */}
                    <Link
                      href={feature.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary-40 font-semibold text-sm md:text-base group-hover:gap-3 transition-all duration-300 mt-auto"
                    >
                      Read Full Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-95 to-secondary-95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12 bg-white/80 backdrop-blur-sm hover:bg-white border-light-90 hover:border-primary-90 text-dark-20 hover:text-primary-50" />
            <CarouselNext className="hidden md:flex -right-4 lg:-right-12 bg-white/80 backdrop-blur-sm hover:bg-white border-light-90 hover:border-primary-90 text-dark-20 hover:text-primary-50" />
          </Carousel>
        }
      </div>
    </section>
  );
}
