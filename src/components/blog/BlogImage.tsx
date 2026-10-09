"use client";

import { Maximize2 } from "lucide-react";
import Image from "next/image";
import { Dialog as DialogPrimitive } from "radix-ui";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ZOOM_MIN_WIDTH_PX = 900;

export function BlogImage({
  alt,
  caption,
  fullSrc,
  height,
  src,
  width,
}: {
  alt: string;
  caption?: string;
  fullSrc: string;
  height: number;
  src: string;
  width: number;
}) {
  const image = (
    <Image
      alt={alt}
      className="h-auto w-full"
      height={height}
      sizes="(max-width: 1024px) 100vw, 720px"
      src={src}
      width={width}
    />
  );

  return (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-2xl border-2 border-grey-15 bg-light-95">
        {width >= ZOOM_MIN_WIDTH_PX ? (
          <Dialog>
            <DialogTrigger
              aria-label={`Enlarge image${alt ? `: ${alt}` : ""}`}
              className="group block w-full cursor-zoom-in"
            >
              {image}
              <span
                aria-hidden="true"
                className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full border-2 border-grey-15 bg-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 max-lg:opacity-100"
              >
                <Maximize2 className="h-4 w-4 text-grey-15" />
              </span>
            </DialogTrigger>
            <DialogContent className="max-h-[92vh] w-[95vw] max-w-6xl overflow-auto rounded-2xl border-2 border-grey-15 bg-white p-2 sm:rounded-2xl">
              <DialogPrimitive.Title asChild>
                <p className="sr-only">{alt || "Image"}</p>
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="sr-only">
                Enlarged view
              </DialogPrimitive.Description>
              <Image
                alt={alt}
                className="h-auto w-full rounded-xl"
                height={height}
                sizes="95vw"
                src={fullSrc}
                width={width}
              />
            </DialogContent>
          </Dialog>
        ) : (
          image
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-grey-40 text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
