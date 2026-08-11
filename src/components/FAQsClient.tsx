"use client";

import {
  BookOpen,
  Building2,
  GraduationCap,
  HelpCircle,
  MessageCircle,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

interface Question {
  a: string;
  q: string;
}

interface Category {
  questions: Question[];
  title: string;
}

interface FAQsClientProps {
  categories: Category[];
}

const CATEGORY_ICONS = [
  GraduationCap,
  Building2,
  BookOpen,
  Sparkles,
  Users,
  HelpCircle,
];

export default function FAQsClient({ categories }: FAQsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (idx !== -1) {
              setActiveCategory(idx);
            }
          }
        }
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    for (const el of sectionRefs.current) {
      if (el) {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, []);

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return null;
    }

    const results: {
      categoryTitle: string;
      question: Question;
      key: string;
    }[] = [];
    categories.forEach((category, catIdx) => {
      category.questions.forEach((q, qIdx) => {
        if (
          q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.a.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          results.push({
            categoryTitle: category.title,
            key: `search-${catIdx}-${qIdx}`,
            question: q,
          });
        }
      });
    });
    return results;
  }, [searchTerm, categories]);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-light-97 py-16 sm:py-20 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-bold text-grey-15 text-sm">
              <MessageCircle className="h-4 w-4" />
              Got questions? We&apos;ve got answers
            </div>

            <h1 className="mb-8 font-black font-vietnam text-3xl text-grey-15 tracking-tight sm:text-4xl md:text-5xl">
              How can we help you today?
            </h1>

            <div className="relative mx-auto max-w-xl">
              <Search className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-grey-40" />
              <Input
                className="h-14 w-full rounded-full border-2 border-grey-15 bg-white pr-6 pl-14 text-base shadow-[4px_4px_0_0_var(--color-grey-15)] placeholder:text-grey-40 focus-visible:ring-0"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for answers..."
                type="text"
                value={searchTerm}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container">
          {searchResults === null ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
              <aside className="lg:sticky lg:top-24 lg:h-fit">
                <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0 lg:pb-0">
                  {categories.map((category, idx) => {
                    const Icon = CATEGORY_ICONS[idx % CATEGORY_ICONS.length];
                    const active = idx === activeCategory;
                    return (
                      <button
                        className={`flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border-2 px-4 py-2.5 text-left font-bold text-sm transition-colors duration-200 lg:w-full ${
                          active
                            ? "border-grey-15 bg-primary-75 text-grey-15"
                            : "border-grey-15/15 bg-white text-grey-35 hover:border-grey-15"
                        }`}
                        key={category.title}
                        onClick={() =>
                          sectionRefs.current[idx]?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          })
                        }
                        type="button"
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {category.title}
                      </button>
                    );
                  })}
                </div>
              </aside>

              <div className="min-w-0 space-y-12">
                {categories.map((category, catIdx) => {
                  const Icon = CATEGORY_ICONS[catIdx % CATEGORY_ICONS.length];
                  return (
                    <div
                      key={category.title}
                      ref={(el) => {
                        sectionRefs.current[catIdx] = el;
                      }}
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90">
                          <Icon className="h-5 w-5 text-grey-15" />
                        </div>
                        <h2 className="font-black font-vietnam text-grey-15 text-xl">
                          {category.title}
                        </h2>
                      </div>

                      <Accordion className="space-y-3" type="multiple">
                        {category.questions.map((item, qIdx) => (
                          <AccordionItem
                            className="overflow-hidden rounded-2xl border-2 border-grey-15 bg-white px-6 shadow-[3px_3px_0_0_var(--color-grey-15)]"
                            key={`${catIdx}-${qIdx}`}
                            value={`${catIdx}-${qIdx}`}
                          >
                            <AccordionTrigger className="py-5 text-left font-bold text-grey-15 text-sm hover:no-underline sm:text-base [&>svg]:text-grey-15">
                              {item.q}
                            </AccordionTrigger>
                            <AccordionContent className="pb-5 text-grey-35 leading-relaxed">
                              {item.a}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 flex items-center gap-2 text-grey-40 text-sm">
                <Search className="h-4 w-4" />
                <span>
                  Found{" "}
                  <span className="font-bold text-grey-15">
                    {searchResults.length}
                  </span>{" "}
                  {searchResults.length === 1 ? "result" : "results"} for{" "}
                  &ldquo;{searchTerm}&rdquo;
                </span>
              </div>

              {searchResults.length > 0 ? (
                <Accordion className="space-y-3" type="multiple">
                  {searchResults.map((result) => (
                    <AccordionItem
                      className="overflow-hidden rounded-2xl border-2 border-grey-15 bg-white px-6 shadow-[3px_3px_0_0_var(--color-grey-15)]"
                      key={result.key}
                      value={result.key}
                    >
                      <AccordionTrigger className="py-5 hover:no-underline [&>svg]:text-grey-15">
                        <div className="text-left">
                          <span className="mb-1 block font-bold text-primary-75 text-xs uppercase tracking-wide">
                            {result.categoryTitle}
                          </span>
                          <span className="font-bold text-grey-15 text-sm leading-snug sm:text-base">
                            {result.question.q}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-grey-35 leading-relaxed">
                        {result.question.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="py-20 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-grey-15 bg-light-95">
                    <Search className="h-8 w-8 text-grey-40" />
                  </div>
                  <h3 className="mb-3 font-black font-vietnam text-2xl text-grey-15">
                    No results found
                  </h3>
                  <p className="mx-auto mb-6 max-w-md text-grey-40">
                    We couldn&apos;t find any questions matching &ldquo;
                    {searchTerm}&rdquo;. Try a different search term.
                  </p>
                  <button
                    className="inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 px-6 py-3 font-bold text-grey-15 transition-colors hover:bg-primary-90"
                    onClick={() => setSearchTerm("")}
                    type="button"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl border-2 border-grey-15 bg-grey-15 px-6 py-12 text-center sm:px-12 sm:py-16">
            <h2 className="font-black font-vietnam text-2xl text-white sm:text-3xl">
              Still have questions?
            </h2>
            <p className="max-w-md text-grey-70">
              Can&apos;t find what you&apos;re looking for? Our team is here to
              help you.
            </p>
            <a
              className="inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 px-8 py-3.5 font-bold text-grey-15 transition-colors hover:bg-primary-90"
              href="/contact"
            >
              <MessageCircle className="h-5 w-5" />
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
