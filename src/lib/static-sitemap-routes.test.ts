import { readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { STATIC_SITEMAP_ROUTES } from "./static-sitemap-routes";

const appDirectory = path.resolve(import.meta.dirname, "../app");
const excludedSegments = new Set(["api", "studio"]);

function getStaticPageRoutes(
  directory: string,
  segments: string[] = []
): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const nextSegments = entry.isDirectory()
      ? [...segments, entry.name]
      : segments;
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return getStaticPageRoutes(entryPath, nextSegments);
    }

    if (entry.name !== "page.tsx") {
      return [];
    }

    if (
      nextSegments.some(
        (segment) => excludedSegments.has(segment) || segment.startsWith("[")
      )
    ) {
      return [];
    }

    const routeSegments = nextSegments.filter(
      (segment) => !(segment.startsWith("(") && segment.endsWith(")"))
    );
    return [routeSegments.length > 0 ? `/${routeSegments.join("/")}` : ""];
  });
}

describe("static sitemap route registry", () => {
  it("includes each static App Router page exactly once", () => {
    const expected = getStaticPageRoutes(appDirectory).sort();
    const actual = STATIC_SITEMAP_ROUTES.map(({ path: routePath }) =>
      routePath.endsWith("/") ? routePath.slice(0, -1) : routePath
    ).sort();

    expect(new Set(actual).size).toBe(actual.length);
    expect(actual).toEqual(expected);
  });
});
