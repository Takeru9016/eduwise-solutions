import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  ALL_COURSE_SLUGS_QUERY,
  SITEMAP_POSTS_QUERY,
  SITEMAP_RESOURCES_QUERY,
} from "@/sanity/lib/queries";

const { fetch } = vi.hoisted(() => ({ fetch: vi.fn() }));

vi.mock("@/sanity/lib/client", () => ({ client: { fetch } }));

import sitemap from "./sitemap";

describe("sitemap", () => {
  beforeEach(() => fetch.mockReset());

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
    expect(fetch).toHaveBeenNthCalledWith(1, ALL_COURSE_SLUGS_QUERY);
    expect(fetch).toHaveBeenNthCalledWith(2, SITEMAP_POSTS_QUERY);
    expect(fetch).toHaveBeenNthCalledWith(3, SITEMAP_RESOURCES_QUERY);
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
