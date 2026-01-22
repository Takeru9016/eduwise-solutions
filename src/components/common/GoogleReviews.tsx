"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, Quote, CheckCircle, Loader2 } from "lucide-react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";

interface GoogleReview {
  _id: string;
  reviewerName: string;
  reviewerImage?: SanityImageSource;
  reviewText: string;
  rating: number;
  isVerified: boolean;
  category?: string;
  publishedAt: string;
}

interface GoogleReviewsProps {
  categorySlug: string;
  title?: string;
  subtitle?: string;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
            star <= rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const GoogleBadge = () => (
  <div className="flex items-center gap-2">
    <div className="flex items-center gap-1.5">
      <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6">
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
      <span className="text-xs sm:text-sm font-semibold text-grey-30">
        Customer Reviews
      </span>
    </div>
  </div>
);

const CHAR_LIMIT = 180;

const ReviewText = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > CHAR_LIMIT;

  const displayText =
    shouldTruncate && !isExpanded ? text.slice(0, CHAR_LIMIT) + "..." : text;

  return (
    <div className="relative mb-5">
      <Quote className="absolute -top-1 -left-1 w-6 h-6 sm:w-8 sm:h-8 text-primary-90/30" />
      <p className="text-grey-35 text-sm sm:text-base leading-relaxed pl-5 sm:pl-6">
        {displayText}
      </p>
      {shouldTruncate && (
        <Button
          size="default"
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary-75 text-sm font-medium pl-5 sm:pl-6 mt-2 hover:text-primary-60 transition-colors border border-primary-90 flex items-center justify-center"
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
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-white to-primary-99">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary-75" />
            <span className="text-grey-35">Loading reviews...</span>
          </div>
        </div>
      </section>
    );
  }

  if (!loading && reviews.length === 0) {
    return (
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 via-white to-primary-99 border-t border-light-90">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-99 rounded-full mb-6">
            <Star className="w-8 h-8 text-primary-75" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-vietnam font-bold text-grey-15 mb-3">
            Reviews Coming Soon
          </h2>
          <p className="text-grey-35 text-lg max-w-2xl mx-auto mb-6">
            Our students are currently completing their courses. Authentic
            Google verified reviews will be added here as they share their
            experiences!
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm text-grey-35 border border-slate-200 shadow-sm">
            <GoogleBadge />
            <span className="text-grey-40">•</span>
            <span>Collecting Feedback</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-slate-200 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-99/50 via-white to-amber-50/30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-75/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-amber-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-grey-30 px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg border border-slate-200">
            <GoogleBadge />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-4 sm:mb-6">
            {title}
          </h2>
          <p className="text-grey-35 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="py-4 px-0 md:px-16 lg:px-20">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6">
              {reviews.map((review) => (
                <CarouselItem
                  key={review._id}
                  className="pl-6 md:basis-1/2 lg:basis-1/3 py-4"
                >
                  <div className="h-full bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-white/50 hover:shadow-2xl hover:border-primary-90 transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden">
                    {/* Decorative gradient border on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-75/0 via-transparent to-amber-400/0 group-hover:from-primary-75/5 group-hover:to-amber-400/5 transition-all duration-500 rounded-2xl sm:rounded-3xl" />

                    <div className="relative z-10">
                      {/* Header with reviewer info and Google badge */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-3 sm:gap-4">
                          {/* Avatar */}
                          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-primary-90 bg-gradient-to-br from-primary-95 to-primary-99 flex items-center justify-center flex-shrink-0 shadow-lg">
                            {review.reviewerImage ?
                              <Image
                                src={urlFor(review.reviewerImage).url()}
                                alt={review.reviewerName}
                                fill
                                className="object-cover"
                              />
                            : <span className="text-lg sm:text-xl font-bold text-primary-75">
                                {review.reviewerName.charAt(0).toUpperCase()}
                              </span>
                            }
                          </div>
                          {/* Name and verified badge */}
                          <div>
                            <h3 className="text-base sm:text-lg font-vietnam font-bold text-grey-15">
                              {review.reviewerName}
                            </h3>
                            {review.isVerified && (
                              <div className="flex items-center gap-1 text-primary-75">
                                <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span className="text-xs sm:text-sm font-medium">
                                  Verified Learner
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Google logo */}
                        <div className="flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-6 h-6 sm:w-7 sm:h-7"
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

                      {/* Review text */}
                      <ReviewText text={review.reviewText} />

                      {/* Rating */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-6 lg:-left-10 bg-white shadow-lg border-slate-200 hover:bg-primary-75 hover:text-white hover:border-primary-75 transition-all duration-300 w-10 h-10" />
            <CarouselNext className="hidden md:flex -right-6 lg:-right-10 bg-white shadow-lg border-slate-200 hover:bg-primary-75 hover:text-white hover:border-primary-75 transition-all duration-300 w-10 h-10" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
