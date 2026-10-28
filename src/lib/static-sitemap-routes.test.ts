import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { createSitemapManifest } from "../../scripts/sitemap-manifest";

const STATIC_SITEMAP_ROUTES = createSitemapManifest().routes;

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

describe("static sitemap route discovery", () => {
  it("discovers new grouped pages and only updates dates for affected source dependencies", () => {
    const root = mkdtempSync(path.join(tmpdir(), "sitemap-test-"));
    const git = (args: string[], date = "2026-01-01T12:00:00Z") =>
      execFileSync("git", args, {
        cwd: root,
        env: {
          ...process.env,
          GIT_AUTHOR_DATE: date,
          GIT_COMMITTER_DATE: date,
        },
        stdio: "pipe",
      });
    const commit = (date: string) => {
      git(["add", "."]);
      git(
        [
          "-c",
          "user.name=Sitemap Test",
          "-c",
          "user.email=sitemap-test@example.invalid",
          "commit",
          "-m",
          "fixture",
        ],
        date
      );
    };
    try {
      mkdirSync(path.join(root, "src/app/(marketing)/new-page"), {
        recursive: true,
      });
      mkdirSync(path.join(root, "src/app/other"), { recursive: true });
      mkdirSync(path.join(root, "src/components"), { recursive: true });
      mkdirSync(path.join(root, "src/components/common"), { recursive: true });
      writeFileSync(
        path.join(root, "src/components/common/Navbar.tsx"),
        "export default function Navbar() { return 'navigation'; }"
      );
      writeFileSync(
        path.join(root, "src/components/index.ts"),
        "export { default as Card } from './Card'; export { default as Navbar } from './common/Navbar';"
      );
      writeFileSync(
        path.join(root, "src/app/layout.tsx"),
        "export default function Layout() { return 'shared layout'; }"
      );
      writeFileSync(
        path.join(root, "src/components/Card.tsx"),
        "export default function Card() { return 'first'; }"
      );
      writeFileSync(
        path.join(root, "src/app/(marketing)/new-page/page.tsx"),
        "import { Card, Navbar } from '@/components'; export default Card;"
      );
      writeFileSync(
        path.join(root, "src/app/other/page.tsx"),
        "export default function Page() { return 'other'; }"
      );
      git(["init"]);
      commit("2026-01-01T12:00:00Z");
      writeFileSync(
        path.join(root, "src/components/Card.tsx"),
        "export default function Card() { return 'updated'; }"
      );
      commit("2026-02-01T12:00:00Z");
      writeFileSync(
        path.join(root, "src/components/common/Navbar.tsx"),
        "export default function Navbar() { return 'new navigation'; }"
      );
      writeFileSync(
        path.join(root, "src/app/layout.tsx"),
        "export default function Layout() { return 'new shared layout'; }"
      );
      writeFileSync(
        path.join(root, "src/components/index.ts"),
        "export { default as Card } from './Card'; export { default as Navbar } from './common/Navbar'; export { default as Unrelated } from './Card';"
      );
      commit("2026-03-01T12:00:00Z");
      const manifest = createSitemapManifest(root);
      expect(manifest.routes.map((route) => route.path)).toEqual([
        "/new-page",
        "/other",
      ]);
      expect(Date.parse(manifest.routes[0].lastModified ?? "")).toBe(
        Date.parse("2026-02-01T12:00:00Z")
      );
      expect(Date.parse(manifest.routes[1].lastModified ?? "")).toBe(
        Date.parse("2026-01-01T12:00:00Z")
      );
    } finally {
      rmSync(root, { force: true, recursive: true });
    }
  });

  it("records static content dates and leaves CMS detail routes to Sanity", () => {
    const manifest = createSitemapManifest();
    for (const route of manifest.routes) {
      expect(Number.isFinite(Date.parse(route.lastModified ?? ""))).toBe(true);
    }
    expect(manifest.routes.some((route) => route.path.includes("["))).toBe(
      false
    );
    expect(
      manifest.routes.some(({ path: route }) => route.startsWith("/studio"))
    ).toBe(false);
  });
  it("includes each static App Router page exactly once", () => {
    const expected = getStaticPageRoutes(appDirectory).sort();
    const actual = STATIC_SITEMAP_ROUTES.map(({ path: routePath }) =>
      routePath.endsWith("/") ? routePath.slice(0, -1) : routePath
    ).sort();

    expect(new Set(actual).size).toBe(actual.length);
    expect(actual).toEqual(expected);
  });
});
