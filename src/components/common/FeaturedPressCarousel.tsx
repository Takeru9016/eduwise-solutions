"use client";

import Autoplay from "embla-carousel-autoplay";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface SanityPressFeature {
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

export function FeaturedPressCarousel({
  pressFeatures,
}: {
  pressFeatures: SanityPressFeature[];
}) {
  return (
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
                  <div className="relative h-full w-auto max-w-50">
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
  );
}
