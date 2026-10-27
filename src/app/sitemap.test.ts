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
  SOURCE_TEMPLATE_DATES: { "/blogs/[slug]": "2026-01-01T00:00:00Z" },
  STATIC_SITEMAP_ROUTES: [
    {
      changeFrequency: "weekly",
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

  it("throws if Sanity fails instead of returning a sitemap missing CMS routes", async () => {
    fetch.mockRejectedValueOnce(new Error("Sanity unavailable"));

    await expect(sitemap()).rejects.toThrow("Sanity unavailable");
  });
});
