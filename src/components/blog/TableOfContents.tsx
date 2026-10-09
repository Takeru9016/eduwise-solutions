"use client";

import { ChevronDown, ListTree } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { TocItem } from "@/lib/blog-toc";

const MIN_ITEMS = 3;
const OBSERVER_MARGIN = "-96px 0px -70% 0px";

function TocLinks({
  activeId,
  items,
  onNavigate,
}: {
  activeId: string;
  items: TocItem[];
  onNavigate?: () => void;
}) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item.id}>
          <a
            aria-current={activeId === item.id ? "location" : undefined}
            className={`block rounded-lg py-1.5 text-sm leading-snug transition-colors duration-150 ${
              item.level === 3 ? "pl-5" : "pl-2"
            } ${
              activeId === item.id
                ? "bg-primary-90 font-bold text-grey-15"
                : "text-grey-40 hover:bg-light-95 hover:text-grey-15"
            }`}
            href={`#${item.id}`}
            onClick={onNavigate}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function TableOfContents({
  items,
  variant,
}: {
  items: TocItem[];
  variant: "sidebar" | "inline";
}) {
  const [activeId, setActiveId] = useState("");
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (variant !== "sidebar") {
      return;
    }
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: OBSERVER_MARGIN }
    );
    for (const heading of headings) {
      observer.observe(heading);
    }
    return () => observer.disconnect();
  }, [items, variant]);

  if (items.length < MIN_ITEMS) {
    return null;
  }

  if (variant === "inline") {
    return (
      <details
        className="group mb-8 rounded-2xl border-2 border-grey-15 bg-light-97"
        ref={detailsRef}
      >
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 font-bold text-grey-15 text-sm [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2">
            <ListTree className="h-4 w-4" />
            Jump to section
          </span>
          <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <nav aria-label="Table of contents" className="px-2 pb-3">
          <TocLinks
            activeId=""
            items={items}
            onNavigate={() => {
              if (detailsRef.current) {
                detailsRef.current.open = false;
              }
            }}
          />
        </nav>
      </details>
    );
  }

  return (
    <nav
      aria-label="Table of contents"
      className="max-h-[calc(100vh-8rem)] overflow-y-auto pr-1"
    >
      <p className="mb-3 flex items-center gap-2 font-bold text-grey-15 text-xs uppercase tracking-wider">
        <ListTree className="h-4 w-4" />
        On this page
      </p>
      <TocLinks activeId={activeId} items={items} />
    </nav>
  );
}
