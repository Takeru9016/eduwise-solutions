import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";
import { client } from "@/sanity/lib/client";
import {
  ALL_COURSE_SLUGS_QUERY,
  LEAD_MAGNETS_QUERY,
  POSTS_QUERY,
} from "@/sanity/lib/queries";

const STATIC_ROUTES = [
  "",
  "/about",
  "/contact",
  "/pricing",
  "/quiz",
  "/resources",
  "/courses",
  "/certifications/aws",
  "/blogs",
  "/faq",
  "/testimonials",
  "/press",
  "/privacy",
  "/refund",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    changeFrequency: path === "" ? "daily" : "weekly",
    lastModified: new Date(),
    priority: path === "" ? 1 : 0.7,
    url: `${SITE_URL}${path}`,
  }));

  let courseSlugs: { slug: string }[] = [];
  let posts: { slug: { current: string } }[] = [];
  let resources: { slug: { current: string } }[] = [];

  try {
    [courseSlugs, posts, resources] = await Promise.all([
      client.fetch<{ slug: string }[]>(ALL_COURSE_SLUGS_QUERY),
      client.fetch<{ slug: { current: string } }[]>(POSTS_QUERY),
      client.fetch<{ slug: { current: string } }[]>(LEAD_MAGNETS_QUERY),
    ]);
  } catch (err) {
    console.error("[sitemap] Failed to fetch Sanity slugs:", err);
  }

  const courseEntries: MetadataRoute.Sitemap = courseSlugs.map((c) => ({
    changeFrequency: "weekly",
    lastModified: new Date(),
    priority: 0.8,
    url: `${SITE_URL}/courses/${c.slug}`,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    changeFrequency: "monthly",
    lastModified: new Date(),
    priority: 0.6,
    url: `${SITE_URL}/blogs/${p.slug.current}`,
  }));

  const resourceEntries: MetadataRoute.Sitemap = resources.map((r) => ({
    changeFrequency: "monthly",
    lastModified: new Date(),
    priority: 0.6,
    url: `${SITE_URL}/resources/${r.slug.current}`,
  }));

  return [
    ...staticEntries,
    ...courseEntries,
    ...blogEntries,
    ...resourceEntries,
  ];
}
