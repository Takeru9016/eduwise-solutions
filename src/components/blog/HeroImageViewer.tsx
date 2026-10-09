"use client";

import { Maximize2 } from "lucide-react";
import Image from "next/image";
import { Dialog as DialogPrimitive } from "radix-ui";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function HeroImageViewer({
  alt,
  height,
  src,
  width,
}: {
  alt: string;
  height: number;
  src: string;
  width: number;
}) {
  return (
    <Dialog>
      <DialogTrigger className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-4 font-bold text-grey-15 text-sm transition-colors hover:bg-primary-90">
        <Maximize2 className="h-4 w-4" />
        View full image
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] w-[95vw] max-w-6xl overflow-auto rounded-2xl border-2 border-grey-15 bg-white p-2 sm:rounded-2xl">
        <DialogPrimitive.Title asChild>
          <p className="sr-only">{alt || "Image"}</p>
        </DialogPrimitive.Title>
        <DialogPrimitive.Description className="sr-only">
          Full image
        </DialogPrimitive.Description>
        <Image
          alt={alt}
          className="h-auto w-full rounded-xl"
          height={height}
          sizes="95vw"
          src={src}
          width={width}
        />
      </DialogContent>
    </Dialog>
  );
}
