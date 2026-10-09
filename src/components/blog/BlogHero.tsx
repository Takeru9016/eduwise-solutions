import type { SanityImageSource } from "@sanity/image-url";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AuthorAvatar } from "@/app/blogs/BlogsClient";
import { HeroImageViewer } from "@/components/blog/HeroImageViewer";
import { getImageDimensions, urlFor } from "@/sanity/lib/image";

type HeroImage = SanityImageSource & {
  alt?: string;
  hotspot?: { x: number; y: number };
};

interface BlogHeroProps {
  author?: { _id: string; image?: SanityImageSource; name: string };
  categories?: { _id: string; title: string }[];
  date?: string | null;
  heading: string;
  image?: HeroImage;
  readTime: number;
}

const MAX_IMAGE_WIDTH_PX = 2200;
const MAX_VIEWER_WIDTH_PX = 2400;

export function BlogHero({
  author,
  categories,
  date,
  heading,
  image,
  readTime,
}: BlogHeroProps) {
  const dimensions = image
    ? (getImageDimensions(image) ?? { height: 900, width: 1600 })
    : null;
  const objectPosition = image?.hotspot
    ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
    : "50% 40%";

  return (
    <header className="relative flex h-[70vh] max-h-180 min-h-130 w-full flex-col justify-between overflow-hidden border-grey-15 border-b-2 bg-primary-99 md:min-h-140">
      {image && dimensions && (
        <Image
          alt={image.alt || heading}
          className="object-cover blur-lg"
          fill
          priority
          sizes="100vw"
          src={urlFor(image)
            .width(Math.min(MAX_IMAGE_WIDTH_PX, dimensions.width))
            .url()}
          style={{ objectPosition }}
        />
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 pt-6 sm:px-6">
        <Link
          aria-label="Back to blogs"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-4 font-bold text-grey-15 text-sm transition-colors hover:bg-primary-90"
          href="/blogs"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Link>
        {image && dimensions && (
          <HeroImageViewer
            alt={image.alt || heading}
            height={dimensions.height}
            src={urlFor(image)
              .width(Math.min(MAX_VIEWER_WIDTH_PX, dimensions.width))
              .url()}
            width={dimensions.width}
          />
        )}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6 sm:pb-10">
        <div className="max-w-3xl rounded-3xl border-2 border-grey-15 bg-white p-5 shadow-[6px_6px_0_0_var(--color-grey-15)] sm:p-8">
          {categories && categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  className="inline-flex items-center rounded-full border-2 border-grey-15 bg-primary-90 px-3 py-1 font-bold text-grey-15 text-xs"
                  key={category._id}
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          <h1 className="mb-5 font-black font-vietnam text-2xl text-grey-15 leading-tight sm:text-4xl lg:text-5xl">
            {heading}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-grey-15/15 border-t pt-4">
            <div className="flex items-center gap-2.5">
              <AuthorAvatar author={author} />
              <span className="font-bold text-grey-15 text-sm">
                {author?.name ?? "Eduwise Team"}
              </span>
            </div>
            {date && (
              <span className="flex items-center gap-1.5 text-grey-40 text-sm">
                <Calendar className="h-4 w-4" />
                {date}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-grey-40 text-sm">
              <Clock className="h-4 w-4" />
              {readTime} min read
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
