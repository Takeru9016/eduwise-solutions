import type { MetadataRoute } from "next";

import { shouldIncludeInSitemap } from "@/lib/indexing-policy";
import { SITE_URL } from "@/lib/seo";
import {
  PAGE_CONTENT_TYPES,
  SITEMAP_DOCUMENT_TYPES,
} from "@/lib/sitemap-content";
import {
  SOURCE_TEMPLATE_DATES,
  STATIC_SITEMAP_ROUTES,
} from "@/lib/static-sitemap-routes";
import { client } from "@/sanity/lib/client";
import {
  ALL_COURSE_SLUGS_QUERY,
  SITEMAP_PAGE_UPDATES_QUERY,
  SITEMAP_POSTS_QUERY,
  SITEMAP_RESOURCES_QUERY,
} from "@/sanity/lib/queries";

// Webhooks invalidate the sitemap after CMS changes; this interval is a
// fallback in case a webhook is delayed or misconfigured.
export const revalidate = 300;

interface SlugEntry {
  contentDates?: string[];
  slug: string;
  updatedAt: string;
}

function latest(...values: (string | undefined)[]) {
  const timestamps = values
    .map((value) => (value ? Date.parse(value) : Number.NaN))
    .filter(Number.isFinite);
  return timestamps.length ? new Date(Math.max(...timestamps)) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, posts, resources, updates] = await Promise.all([
    client.fetch<SlugEntry[]>(ALL_COURSE_SLUGS_QUERY),
    client.fetch<SlugEntry[]>(SITEMAP_POSTS_QUERY),
    client.fetch<SlugEntry[]>(SITEMAP_RESOURCES_QUERY),
    client.fetch<{ _type: string; updatedAt: string }[]>(
      SITEMAP_PAGE_UPDATES_QUERY,
      { types: [...SITEMAP_DOCUMENT_TYPES] }
    ),
  ]);

  // Restrict CMS timestamps to the pages that display that content.
  const cmsDates = (types: readonly string[]) =>
    updates
      .filter((entry) => types.includes(entry._type))
      .map((entry) => entry.updatedAt);

  const staticEntries: MetadataRoute.Sitemap = STATIC_SITEMAP_ROUTES.filter(
    (route) => shouldIncludeInSitemap(route.path)
  ).map((route) => ({
    changeFrequency: route.changeFrequency,
    lastModified: latest(
      route.lastModified,
      ...cmsDates(PAGE_CONTENT_TYPES[route.path] ?? [])
    ),
    priority: route.priority,
    url: new URL(route.path, SITE_URL).toString(),
  }));

  const courseEntries: MetadataRoute.Sitemap = courses
    .filter((course) => shouldIncludeInSitemap(`/courses/${course.slug}`))
    .map((course) => ({
      changeFrequency: "weekly",
      lastModified: latest(
        course.updatedAt,
        SOURCE_TEMPLATE_DATES["/courses/[slug]"],
        ...(course.contentDates ?? [])
      ),
      priority: 0.9,
      url: `${SITE_URL}/courses/${course.slug}`,
    }));

  const blogEntries: MetadataRoute.Sitemap = posts
    .filter((post) => shouldIncludeInSitemap(`/blogs/${post.slug}`))
    .map((post) => ({
      changeFrequency: "monthly",
      lastModified: latest(
        post.updatedAt,
        SOURCE_TEMPLATE_DATES["/blogs/[slug]"],
        ...(post.contentDates ?? [])
      ),
      priority: 0.7,
      url: `${SITE_URL}/blogs/${post.slug}`,
    }));

  const resourceEntries: MetadataRoute.Sitemap = resources.map((resource) => ({
    changeFrequency: "monthly",
    lastModified: latest(
      resource.updatedAt,
      SOURCE_TEMPLATE_DATES["/resources/[slug]"],
      ...(resource.contentDates ?? [])
    ),
    priority: 0.6,
    url: `${SITE_URL}/resources/${resource.slug}`,
  }));

  return [
    ...staticEntries,
    ...courseEntries,
    ...blogEntries,
    ...resourceEntries,
  ];
}
