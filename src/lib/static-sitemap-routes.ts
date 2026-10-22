import type { MetadataRoute } from "next";

export type SitemapChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

export interface StaticSitemapRoute {
  changeFrequency: SitemapChangeFrequency;
  path: string;
  priority: number;
}

/**
 * Canonical registry for site-code routes included in the sitemap.
 * CMS-backed detail pages are sourced from Sanity in src/app/sitemap.ts.
 */
export const STATIC_SITEMAP_ROUTES: StaticSitemapRoute[] = [
  { changeFrequency: "weekly", path: "", priority: 1 },
  { changeFrequency: "weekly", path: "/courses", priority: 0.9 },
  { changeFrequency: "weekly", path: "/pricing", priority: 0.9 },
  { changeFrequency: "weekly", path: "/certifications/aws", priority: 0.9 },
  { changeFrequency: "weekly", path: "/blogs", priority: 0.8 },
  { changeFrequency: "monthly", path: "/about", priority: 0.6 },
  { changeFrequency: "monthly", path: "/contact", priority: 0.6 },
  { changeFrequency: "monthly", path: "/faq", priority: 0.6 },
  { changeFrequency: "monthly", path: "/testimonials", priority: 0.6 },
  { changeFrequency: "monthly", path: "/quiz", priority: 0.6 },
  { changeFrequency: "monthly", path: "/resources", priority: 0.6 },
  { changeFrequency: "yearly", path: "/press", priority: 0.4 },
  { changeFrequency: "yearly", path: "/privacy", priority: 0.4 },
  { changeFrequency: "yearly", path: "/terms", priority: 0.4 },
  { changeFrequency: "yearly", path: "/refund", priority: 0.4 },
];
