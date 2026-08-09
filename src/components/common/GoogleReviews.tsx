"use client";

import type { SanityImageSource } from "@sanity/image-url";
import { CheckCircle, Loader2, Quote, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Button } from "../ui/button";

interface GoogleReview {
  _id: string;
  category?: string;
  isVerified: boolean;
  publishedAt: string;
  rating: number;
  reviewerImage?: SanityImageSource;
  reviewerName: string;
  reviewText: string;
}

interface GoogleReviewsProps {
  categorySlug: string;
  subtitle?: string;
  title?: string;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        className={`h-4 w-4 sm:h-5 sm:w-5 ${
          star <= rating ? "fill-amber-400 text-amber-400" : "text-grey-15/15"
        }`}
        key={star}
      />
    ))}
  </div>
);

const GoogleBadge = () => (
  <div className="flex items-center gap-1.5">
    <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
    <span className="font-bold text-grey-15 text-xs sm:text-sm">
      Customer Reviews
    </span>
  </div>
);

const CHAR_LIMIT = 180;

const ReviewText = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > CHAR_LIMIT;

  const displayText =
    shouldTruncate && !isExpanded ? `${text.slice(0, CHAR_LIMIT)}...` : text;

  return (
    <div className="relative mb-5">
      <Quote className="absolute -top-1 -left-1 h-6 w-6 text-grey-15/10 sm:h-8 sm:w-8" />
      <p className="pl-5 text-grey-35 text-sm leading-relaxed sm:pl-6 sm:text-base">
        {displayText}
      </p>
      {shouldTruncate && (
        <Button
          className="mt-2 flex items-center justify-center rounded-full border-2 border-grey-15 pl-5 font-bold text-grey-15 text-sm sm:pl-6"
          onClick={() => setIsExpanded(!isExpanded)}
          size="default"
          variant="outline"
        >
          {isExpanded ? "Read less" : "Read more"}
        </Button>
      )}
    </div>
  );
};

export default function GoogleReviews({
  categorySlug,
  title = "What Our Learners Say",
  subtitle = "Real reviews from verified students who transformed their careers with Eduwise",
}: GoogleReviewsProps) {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const query = `*[_type == "googleReview" && category->slug.current == $categorySlug] | order(publishedAt desc) {
          _id,
          reviewerName,
          reviewerImage,
          reviewText,
          rating,
          isVerified,
          "category": category->slug.current,
          publishedAt
        }`;

        const data = await client.fetch(query, { categorySlug });
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [categorySlug]);

  if (loading) {
    return (
      <section>
        <div className="flex items-center justify-center gap-3 py-12">
          <Loader2 className="h-6 w-6 animate-spin text-grey-15" />
          <span className="text-grey-35">Loading reviews...</span>
        </div>
      </section>
    );
  }

  if (!loading && reviews.length === 0) {
    return (
      <section className="text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-99">
          <Star className="h-8 w-8 text-grey-15" />
        </div>
        <h2 className="mb-3 font-black font-vietnam text-2xl text-grey-15 lg:text-3xl">
          Reviews Coming Soon
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-grey-35 text-lg">
          Our students are currently completing their courses. Authentic Google
          verified reviews will be added here as they share their experiences!
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-4 py-2 text-grey-35 text-sm">
          <GoogleBadge />
          <span className="text-grey-40">•</span>
          <span>Collecting Feedback</span>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2">
          <GoogleBadge />
        </div>
        <h2 className="mb-2 font-black font-vietnam text-2xl text-grey-15 sm:text-3xl">
          {title}
        </h2>
        <p className="mx-auto max-w-2xl text-grey-40">{subtitle}</p>
      </div>

      <div className="px-0 py-4 md:px-14 lg:px-16">
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-6">
            {reviews.map((review) => (
              <CarouselItem
                className="py-2 pl-6 md:basis-1/2 lg:basis-1/3"
                key={review._id}
              >
                <div className="group h-full rounded-3xl border-2 border-grey-15 bg-white p-6 shadow-[4px_4px_0_0_var(--color-grey-15)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-grey-15)] sm:p-7">
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-grey-15 bg-primary-99 sm:h-14 sm:w-14">
                        {review.reviewerImage ? (
                          <Image
                            alt={review.reviewerName}
                            className="object-cover"
                            fill
                            src={urlFor(review.reviewerImage).url()}
                          />
                        ) : (
                          <span className="font-bold text-grey-15 text-lg sm:text-xl">
                            {review.reviewerName.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold font-vietnam text-base text-grey-15 sm:text-lg">
                          {review.reviewerName}
                        </h3>
                        {review.isVerified && (
                          <div className="flex items-center gap-1 text-primary-75">
                            <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span className="font-semibold text-xs sm:text-sm">
                              Verified Learner
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0">
                      <svg
                        className="h-6 w-6 sm:h-7 sm:w-7"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                    </div>
                  </div>

                  <ReviewText text={review.reviewText} />

                  <div className="flex items-center justify-between border-grey-15/10 border-t pt-4">
                    <StarRating rating={review.rating} />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-6 hidden border-2 border-grey-15 md:flex lg:-left-10" />
          <CarouselNext className="-right-6 hidden border-2 border-grey-15 md:flex lg:-right-10" />
        </Carousel>
      </div>
    </section>
  );
}
