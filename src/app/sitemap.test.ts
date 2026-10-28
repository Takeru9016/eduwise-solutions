import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  ALL_COURSE_SLUGS_QUERY,
  SITEMAP_PAGE_UPDATES_QUERY,
  SITEMAP_POSTS_QUERY,
  SITEMAP_RESOURCES_QUERY,
} from "@/sanity/lib/queries";

const { fetch } = vi.hoisted(() => ({ fetch: vi.fn() }));

vi.mock("@/sanity/lib/client", () => ({ client: { fetch } }));

vi.mock("@/lib/static-sitemap-routes", () => ({
  STATIC_SITEMAP_ROUTES: [
    {
      changeFrequency: "daily",
      lastModified: "2026-01-01T00:00:00Z",
      path: "/",
      priority: 1,
    },
    {
      changeFrequency: "weekly",
      lastModified: "2026-01-01T00:00:00Z",
      path: "/blogs",
      priority: 0.8,
    },
    {
      changeFrequency: "yearly",
      lastModified: "2026-01-02T00:00:00Z",
      path: "/privacy",
      priority: 0.4,
    },
  ],
}));

import sitemap, { dynamic } from "./sitemap";

describe("sitemap", () => {
  beforeEach(() => fetch.mockReset().mockResolvedValue([]));

  it("includes the current course, indexable post, and active resource slugs", async () => {
    const updatedAt = "2026-10-01T12:00:00.000Z";
    fetch
      .mockResolvedValueOnce([{ slug: "cloud-course", updatedAt }])
      .mockResolvedValueOnce([{ slug: "new-article", updatedAt }])
      .mockResolvedValueOnce([{ slug: "study-guide", updatedAt }]);

    const result = await sitemap();
    const urls = result.map(({ url }) => url);

    expect(urls).toContain("https://eduwise.solutions/courses/cloud-course");
    expect(urls).toContain("https://eduwise.solutions/blogs/new-article");
    expect(urls).toContain("https://eduwise.solutions/resources/study-guide");
    const options = { cache: "no-store", perspective: "published" };
    expect(fetch).toHaveBeenNthCalledWith(
      1,
      ALL_COURSE_SLUGS_QUERY,
      {},
      options
    );
    expect(fetch).toHaveBeenNthCalledWith(2, SITEMAP_POSTS_QUERY, {}, options);
    expect(fetch).toHaveBeenNthCalledWith(
      3,
      SITEMAP_RESOURCES_QUERY,
      {},
      options
    );
  });

  it("includes newly published articles on the next request without a webhook or redeployment", async () => {
    expect(dynamic).toBe("force-dynamic");
    const article = {
      slug: "what-is-digital-marketing",
      updatedAt: "2026-10-26T10:07:13Z",
    };
    fetch
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([article])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    const before = await sitemap();
    const after = await sitemap();
    const url = "https://eduwise.solutions/blogs/what-is-digital-marketing";
    expect(before.map((entry) => entry.url)).not.toContain(url);
    expect(after.map((entry) => entry.url)).toContain(url);
    for (const call of fetch.mock.calls) {
      expect(call[2]).toEqual({ cache: "no-store", perspective: "published" });
    }
  });

  it("omits all audit exclusions while retaining target and replacement URLs", async () => {
    const { NOINDEX_PATHS, SITEMAP_ONLY_EXCLUSIONS } = await import(
      "@/lib/indexing-policy"
    );
    const excluded = [...NOINDEX_PATHS, ...SITEMAP_ONLY_EXCLUSIONS];
    const updatedAt = "2026-10-01T12:00:00Z";
    fetch
      .mockResolvedValueOnce([
        ...excluded
          .filter((path) => path.startsWith("/courses/"))
          .map((path) => ({ slug: path.slice(9), updatedAt })),
        { slug: "devops", updatedAt },
      ])
      .mockResolvedValueOnce([
        ...excluded
          .filter((path) => path.startsWith("/blogs/"))
          .map((path) => ({ slug: path.slice(7), updatedAt })),
        { slug: "what-is-devops", updatedAt },
      ])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);
    const urls = (await sitemap()).map(({ url }) => url);
    for (const path of excluded) {
      expect(urls).not.toContain(`https://eduwise.solutions${path}`);
    }
    expect(urls).toContain("https://eduwise.solutions/courses/devops");
    expect(urls).toContain("https://eduwise.solutions/blogs/what-is-devops");
  });

  it("restores the five approved articles to indexing and the dynamic sitemap", async () => {
    const { shouldNoIndex } = await import("@/lib/indexing-policy");
    const restoredSlugs = [
      "top-devops-skills-get-hired-2026",
      "devops-periodic-table-complete-guide-2026",
      "why-cybersecurity-smartest-skill-2026",
      "top-skills-to-become-data-scientist-2026",
      "2026-must-learn-skills-why-devops-is-the-smartest-career-move-in-india",
    ];
    fetch.mockResolvedValueOnce([]).mockResolvedValueOnce(
      restoredSlugs.map((slug) => ({
        slug,
        updatedAt: "2026-10-09T15:42:37Z",
      }))
    );

    const urls = (await sitemap()).map((entry) => entry.url);
    for (const slug of restoredSlugs) {
      expect(shouldNoIndex(`/blogs/${slug}`)).toBe(false);
      expect(urls).toContain(`https://eduwise.solutions/blogs/${slug}`);
    }
    expect(shouldNoIndex("/blogs/devops-tools-2026-complete-guide")).toBe(true);
  });

  it("uses source and CMS update times without changing dates on each request", async () => {
    fetch
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        { slug: "article", updatedAt: "2026-10-01T12:00:00Z" },
      ])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        { _type: "post", updatedAt: "2026-10-01T12:00:00Z" },
      ]);
    const entries = await sitemap();
    expect(
      entries.find(({ url }) => url.endsWith("/privacy"))?.lastModified
    ).toEqual(new Date("2026-01-02T00:00:00Z"));
    expect(
      entries.find(({ url }) => url.endsWith("/blogs"))?.lastModified
    ).toEqual(new Date("2026-10-01T12:00:00Z"));
    expect(
      entries.find(({ url }) => url.endsWith("/blogs/article"))?.lastModified
    ).toEqual(new Date("2026-10-01T12:00:00Z"));
    expect(fetch).toHaveBeenCalledWith(
      SITEMAP_PAGE_UPDATES_QUERY,
      expect.objectContaining({
        types: expect.arrayContaining(["homePage", "awsPage"]),
      }),
      { cache: "no-store", perspective: "published" }
    );
  });

  it("filters out no-index posts and inactive resources at the query level", () => {
    expect(SITEMAP_POSTS_QUERY).toContain("noIndex != true");
    expect(SITEMAP_RESOURCES_QUERY).toContain("isActive == true");
  });

  it("keeps independent CMS content dates when the website is redeployed", async () => {
    fetch
      .mockResolvedValueOnce([
        { slug: "course", updatedAt: "2025-12-01T10:00:00Z" },
      ])
      .mockResolvedValueOnce([
        { slug: "older-post", updatedAt: "2025-11-01T10:00:00Z" },
        {
          contentDates: ["2026-10-21T12:00:00Z"],
          slug: "updated-post",
          updatedAt: "2026-10-20T11:00:00Z",
        },
      ])
      .mockResolvedValueOnce([
        { slug: "resource", updatedAt: "2025-10-01T10:00:00Z" },
      ]);
    const entries = await sitemap();
    const dates = new Map(
      entries.map((entry) => [entry.url, entry.lastModified])
    );
    expect(dates.get("https://eduwise.solutions/courses/course")).toEqual(
      new Date("2025-12-01T10:00:00Z")
    );
    expect(dates.get("https://eduwise.solutions/blogs/older-post")).toEqual(
      new Date("2025-11-01T10:00:00Z")
    );
    expect(dates.get("https://eduwise.solutions/blogs/updated-post")).toEqual(
      new Date("2026-10-21T12:00:00Z")
    );
    expect(dates.get("https://eduwise.solutions/resources/resource")).toEqual(
      new Date("2025-10-01T10:00:00Z")
    );
  });

  it("throws if Sanity fails instead of returning a sitemap missing CMS routes", async () => {
    fetch.mockRejectedValueOnce(new Error("Sanity unavailable"));

    await expect(sitemap()).rejects.toThrow("Sanity unavailable");
  });
});
