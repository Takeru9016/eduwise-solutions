import type { MetadataRoute } from "next";

export type SitemapChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

export interface StaticSitemapRoute {
  changeFrequency: SitemapChangeFrequency;
  lastModified?: string;
  path: string;
  priority: number;
}

interface SourceManifest {
  routes: { lastModified?: string; path: string }[];
  templates: Record<string, string | undefined>;
}

// Build-time discovery is bundled here: ISR needs neither Git nor source files.
const manifest: SourceManifest = JSON.parse(
  process.env.SITEMAP_SOURCE_MANIFEST ?? '{"routes":[],"templates":{}}'
);

export const SOURCE_TEMPLATE_DATES = manifest.templates;
const YEARLY_PATHS = new Set(["/press", "/privacy", "/terms", "/refund"]);
const PRIMARY_PATHS = new Set(["/courses", "/pricing", "/certifications/aws"]);

export const STATIC_SITEMAP_ROUTES: StaticSitemapRoute[] = manifest.routes.map(
  (route) => {
    let changeFrequency: SitemapChangeFrequency = "monthly";
    let priority = 0.6;
    if (YEARLY_PATHS.has(route.path)) {
      changeFrequency = "yearly";
      priority = 0.4;
    }
    if (PRIMARY_PATHS.has(route.path)) {
      changeFrequency = "weekly";
      priority = 0.9;
    }
    if (route.path === "/blogs") {
      changeFrequency = "weekly";
      priority = 0.8;
    }
    if (route.path === "/") {
      changeFrequency = "weekly";
      priority = 1;
    }
    return { ...route, changeFrequency, priority };
  }
);
