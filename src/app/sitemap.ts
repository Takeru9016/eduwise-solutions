import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";
import { client } from "@/sanity/lib/client";
import {
  ALL_COURSE_SLUGS_QUERY,
  SITEMAP_POSTS_QUERY,
  SITEMAP_RESOURCES_QUERY,
} from "@/sanity/lib/queries";

export const revalidate = 3600;

type Frequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

interface StaticRoute {
  changeFrequency: Frequency;
  path: string;
  priority: number;
}

interface SlugEntry {
  slug: string;
  updatedAt: string;
}

const STATIC_ROUTES: StaticRoute[] = [
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

function latest(entries: SlugEntry[]) {
  if (entries.length === 0) {
    return;
  }
  return new Date(
    Math.max(...entries.map((entry) => new Date(entry.updatedAt).getTime()))
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let courses: SlugEntry[] = [];
  let posts: SlugEntry[] = [];
  let resources: SlugEntry[] = [];

  try {
    [courses, posts, resources] = await Promise.all([
      client.fetch<SlugEntry[]>(ALL_COURSE_SLUGS_QUERY),
      client.fetch<SlugEntry[]>(SITEMAP_POSTS_QUERY),
      client.fetch<SlugEntry[]>(SITEMAP_RESOURCES_QUERY),
    ]);
  } catch (err) {
    console.error("[sitemap] Failed to fetch Sanity slugs:", err);
  }

  const sectionLastModified: Record<string, Date | undefined> = {
    "/blogs": latest(posts),
    "/courses": latest(courses),
    "/resources": latest(resources),
  };

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    changeFrequency: route.changeFrequency,
    lastModified: sectionLastModified[route.path],
    priority: route.priority,
    url: `${SITE_URL}${route.path}`,
  }));

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
