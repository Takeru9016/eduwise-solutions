import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import ts from "typescript";

interface SourceRoute {
  lastModified?: string;
  path: string;
}

const extensions = [
  "",
  ".tsx",
  ".ts",
  ".jsx",
  ".js",
  ".json",
  ".css",
  "/index.ts",
  "/index.tsx",
];

/** Build-time only: ISR never needs the filesystem or Git. */
export function createSitemapManifest(root = process.cwd()) {
  const history = prepareHistory(root);
  const routes: SourceRoute[] = [];
  const dependencyCache = new Map<string, Set<string>>();

  function resolveImport(file: string, specifier: string) {
    let base: string;
    if (specifier.startsWith("@/")) {
      base = path.join(root, "src", specifier.slice(2));
    } else if (specifier.startsWith(".")) {
      base = path.resolve(path.dirname(file), specifier);
    } else {
      return;
    }
    return extensions
      .map((ext) => `${base}${ext}`)
      .find(
        (candidate) => existsSync(candidate) && statSync(candidate).isFile()
      );
  }

  function dependencies(
    file: string,
    names?: Set<string>,
    seen = new Set<string>()
  ): Set<string> {
    const key = `${file}:${names ? [...names].sort().join(",") : "*"}`;
    if (seen.has(key)) {
      return new Set();
    }
    const cached = dependencyCache.get(key);
    if (cached) {
      return cached;
    }
    seen.add(key);
    const module = moduleReferences(file, names);
    const files = new Set<string>(module.isReExport ? [] : [file]);
    for (const reference of module.references) {
      const target = resolveImport(file, reference.specifier);
      if (!(target && isContentSource(root, target))) {
        continue;
      }
      for (const dependency of dependencies(
        target,
        reference.selectedNames,
        new Set(seen)
      )) {
        files.add(dependency);
      }
    }
    dependencyCache.set(key, files);
    return files;
  }

  function walk(directory: string, segments: string[] = []) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        if (isPublicSegment(entry.name)) {
          walk(file, [...segments, entry.name]);
        }
      } else if (PAGE_FILE_PATTERN.test(entry.name)) {
        addPage(file, segments);
      }
    }
  }

  function addPage(file: string, segments: string[]) {
    const route = `/${segments.filter((segment) => !(segment.startsWith("(") && segment.endsWith(")"))).join("/")}`;
    const files = new Set<string>();
    for (const dependency of dependencies(file)) {
      files.add(path.relative(root, dependency));
    }
    const lastModified = sourceDate(history.directory, files, history.revision);
    routes.push({ lastModified, path: route });
  }

  try {
    walk(path.join(root, "src/app"));
  } finally {
    history.cleanup?.();
  }
  if (routes.some((route) => !route.lastModified)) {
    console.warn(
      "[sitemap] Source history unavailable. Static pages without a verified content update date omit lastmod."
    );
  }
  return {
    routes: routes.sort((a, b) => a.path.localeCompare(b.path)),
  };
}

function getModuleReference(statement: ts.Statement, names?: Set<string>) {
  if (
    ts.isImportDeclaration(statement) &&
    ts.isStringLiteral(statement.moduleSpecifier)
  ) {
    if (statement.importClause?.isTypeOnly) {
      return;
    }
    return {
      selectedNames: importNames(statement.importClause),
      specifier: statement.moduleSpecifier.text,
    };
  }
  if (
    !(
      ts.isExportDeclaration(statement) &&
      !statement.isTypeOnly &&
      statement.moduleSpecifier &&
      ts.isStringLiteral(statement.moduleSpecifier)
    )
  ) {
    return;
  }
  let selectedNames: Set<string> | undefined;
  if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
    const selected = statement.exportClause.elements.filter(
      (element) =>
        !element.isTypeOnly && (!names || names.has(element.name.text))
    );
    if (!selected.length) {
      return;
    }
    selectedNames = new Set(
      selected.map((element) => element.propertyName?.text ?? element.name.text)
    );
  }
  return { selectedNames, specifier: statement.moduleSpecifier.text };
}

function importNames(clause?: ts.ImportClause) {
  const names = new Set<string>();
  if (clause?.name) {
    names.add("default");
  }
  const bindings = clause?.namedBindings;
  if (bindings && ts.isNamedImports(bindings)) {
    for (const element of bindings.elements) {
      if (!element.isTypeOnly) {
        names.add(element.propertyName?.text ?? element.name.text);
      }
    }
  }
  return names.size ? names : undefined;
}

function sourceDate(root: string, files: Set<string>, revision = "HEAD") {
  try {
    const date = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", revision, "--", ...files],
      {
        cwd: root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
      }
    ).trim();
    if (date) {
      return date;
    }
  } catch {
    // Unknown dates are omitted rather than replaced with deployment time.
  }
}

function isPublicSegment(segment: string) {
  return !(
    ["api", "studio"].includes(segment) ||
    ["_", "@", "[", "(.)", "(..)", "(...)"].some((prefix) =>
      segment.startsWith(prefix)
    )
  );
}

const SOURCE_FILE_PATTERN = /\.[jt]sx?$/;
const PAGE_FILE_PATTERN = /^page\.[jt]sx?$/;

function moduleReferences(file: string, names?: Set<string>) {
  if (!SOURCE_FILE_PATTERN.test(file)) {
    return { isReExport: false, references: [] };
  }
  const source = ts.createSourceFile(
    file,
    readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true
  );
  return {
    isReExport:
      source.statements.length > 0 &&
      source.statements.every(ts.isExportDeclaration),
    references: source.statements.flatMap((statement) => {
      const reference = getModuleReference(statement, names);
      return reference ? [reference] : [];
    }),
  };
}

// Shared navigation, presentation and SEO plumbing are not page content.
// Their deployment must not reset content dates across the whole website.
function isContentSource(root: string, file: string) {
  const relative = path.relative(root, file).split(path.sep).join("/");
  return !(
    NON_CONTENT_FILES.has(relative) ||
    NON_CONTENT_PREFIXES.some((prefix) => relative.startsWith(prefix)) ||
    relative.endsWith(".css")
  );
}

const NON_CONTENT_FILES = new Set([
  "src/lib/seo.ts",
  "src/lib/utils.ts",
  "src/lib/indexing-policy.ts",
]);
const NON_CONTENT_PREFIXES = [
  "src/sanity/",
  "src/components/ui/",
  "src/components/common/Navbar",
  "src/components/common/Footer",
];

// Vercel may supply a shallow checkout or omit .git. Fetch only source history
// into a temporary bare repository, pinned to the deployment's exact commit.
function prepareHistory(root: string): {
  directory: string;
  revision: string;
  cleanup?: () => void;
} {
  try {
    const shallow = execFileSync(
      "git",
      ["rev-parse", "--is-shallow-repository"],
      { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    ).trim();
    if (shallow === "false") {
      return { directory: root, revision: "HEAD" };
    }
  } catch {
    // Fall through to Vercel's Git metadata for archive builds.
  }
  const owner = process.env.VERCEL_GIT_REPO_OWNER;
  const repository = process.env.VERCEL_GIT_REPO_SLUG;
  const revision = process.env.VERCEL_GIT_COMMIT_SHA;
  if (!(owner && repository && revision)) {
    return { directory: root, revision: "HEAD" };
  }
  if (
    !(
      GITHUB_NAME_PATTERN.test(owner) &&
      GITHUB_NAME_PATTERN.test(repository) &&
      COMMIT_PATTERN.test(revision)
    )
  ) {
    throw new Error("Invalid Git metadata for sitemap source history");
  }
  const directory = mkdtempSync(path.join(tmpdir(), "sitemap-history-"));
  const options = { cwd: directory, stdio: "pipe" as const, timeout: 45_000 };
  try {
    execFileSync("git", ["init", "--bare"], options);
    execFileSync(
      "git",
      [
        "fetch",
        "--filter=blob:none",
        "--no-tags",
        `https://github.com/${owner}/${repository}.git`,
        revision,
      ],
      options
    );
  } catch (cause) {
    rmSync(directory, { force: true, recursive: true });
    throw new Error(
      "Cannot retrieve source history for sitemap lastmod dates. Build with full Git history available.",
      { cause }
    );
  }
  return {
    cleanup: () => rmSync(directory, { force: true, recursive: true }),
    directory,
    revision,
  };
}

const GITHUB_NAME_PATTERN = /^[a-zA-Z0-9_.-]+$/;
const COMMIT_PATTERN = /^[a-f0-9]{40}$/i;
