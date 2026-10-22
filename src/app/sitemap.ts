import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";
import { STATIC_SITEMAP_ROUTES } from "@/lib/static-sitemap-routes";
import { client } from "@/sanity/lib/client";
import {
  ALL_COURSE_SLUGS_QUERY,
  SITEMAP_POSTS_QUERY,
  SITEMAP_RESOURCES_QUERY,
} from "@/sanity/lib/queries";

// Webhooks invalidate the sitemap after CMS changes; this interval is a
// fallback in case a webhook is delayed or misconfigured.
export const revalidate = 300;

interface SlugEntry {
  slug: string;
  updatedAt: string;
}

function latest(entries: SlugEntry[]) {
  if (entries.length === 0) {
    return;
  }
  return new Date(
    Math.max(...entries.map((entry) => new Date(entry.updatedAt).getTime()))
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [courses, posts, resources] = await Promise.all([
    client.fetch<SlugEntry[]>(ALL_COURSE_SLUGS_QUERY),
    client.fetch<SlugEntry[]>(SITEMAP_POSTS_QUERY),
    client.fetch<SlugEntry[]>(SITEMAP_RESOURCES_QUERY),
  ]);

  const sectionLastModified: Record<string, Date | undefined> = {
    "/blogs": latest(posts),
    "/courses": latest(courses),
    "/resources": latest(resources),
  };

  const staticEntries: MetadataRoute.Sitemap = STATIC_SITEMAP_ROUTES.map(
    (route) => ({
      changeFrequency: route.changeFrequency,
      lastModified: sectionLastModified[route.path],
      priority: route.priority,
      url: `${SITE_URL}${route.path}`,
    })
  );

  const courseEntries: MetadataRoute.Sitemap = courses.map((course) => ({
    changeFrequency: "weekly",
    lastModified: new Date(course.updatedAt),
    priority: 0.9,
    url: `${SITE_URL}/courses/${course.slug}`,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    changeFrequency: "monthly",
    lastModified: new Date(post.updatedAt),
    priority: 0.7,
    url: `${SITE_URL}/blogs/${post.slug}`,
  }));

  const resourceEntries: MetadataRoute.Sitemap = resources.map((resource) => ({
    changeFrequency: "monthly",
    lastModified: new Date(resource.updatedAt),
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
