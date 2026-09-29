import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

const DISALLOWED_PATHS = ["/studio", "/api/"];

const IMAGE_AND_XML_PATTERNS = [
  "/*.webp",
  "/*.jpeg",
  "/*.jpg",
  "/*.JPEG",
  "/*.JPG",
  "/*.gif",
  "/*.GIF",
  "/*.png",
  "/*.PNG",
  "/*.xml",
];

const AI_CRAWLERS = [
  "Google-Extended",
  "GoogleOther",
  "GoogleOther-Image",
  "Gemini",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "ClaudeBot",
  "anthropic-ai",
  "Applebot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        allow: ["/", ...IMAGE_AND_XML_PATTERNS],
        disallow: DISALLOWED_PATHS,
        userAgent: "*",
      },
      {
        allow: "/",
        disallow: DISALLOWED_PATHS,
        userAgent: AI_CRAWLERS,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
