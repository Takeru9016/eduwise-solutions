import type { SanityImageSource } from "@sanity/image-url";
import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "../env";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ dataset, projectId });

export const urlFor = (source: SanityImageSource) => builder.image(source);

export function getImageDimensions(
  source: unknown
): { height: number; width: number } | null {
  const ref = (source as { asset?: { _ref?: string } } | null)?.asset?._ref;
  const match = ref?.match(/-(\d+)x(\d+)-/);
  return match ? { height: Number(match[2]), width: Number(match[1]) } : null;
}
