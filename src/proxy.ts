import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { REDIRECTS_QUERY } from "@/sanity/lib/queries";

interface RedirectRule {
  destination: string;
  permanent: boolean;
  source: string;
}

const CACHE_TTL_MS = 60_000;

let cachedRules: RedirectRule[] = [];
let cachedAt = 0;

async function getRedirectRules(): Promise<RedirectRule[]> {
  if (Date.now() - cachedAt < CACHE_TTL_MS) {
    return cachedRules;
  }

  try {
    cachedRules = await client.fetch<RedirectRule[]>(REDIRECTS_QUERY);
    cachedAt = Date.now();
  } catch {
    // Sanity unreachable - keep serving the last known rules rather than
    // breaking every page load.
  }

  return cachedRules;
}

export async function proxy(request: NextRequest) {
  const rules = await getRedirectRules();
  const match = rules.find((rule) => rule.source === request.nextUrl.pathname);

  if (!match) {
    return NextResponse.next();
  }

  const destination = match.destination.startsWith("http")
    ? match.destination
    : new URL(match.destination, request.url);

  return NextResponse.redirect(destination, match.permanent ? 308 : 307);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|api|studio|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
