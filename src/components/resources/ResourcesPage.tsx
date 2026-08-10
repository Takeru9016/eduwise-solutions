import { DownloadCloud, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CATEGORIES } from "@/data/courses";

export interface Resource {
  _id: string;
  category: string;
  coverImageUrl: string | null;
  description: string;
  slug: { current: string };
  title: string;
}

interface ResourcesPageProps {
  resources: Resource[];
}

const CARD_TINTS = [
  "bg-primary-99",
  "bg-gold-90",
  "bg-white",
  "bg-primary-90",
  "bg-light-95",
  "bg-primary-95",
] as const;

export default function ResourcesPage({ resources }: ResourcesPageProps) {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-light-97 py-16 sm:py-20 lg:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-bold text-grey-15 text-sm sm:mb-8">
              <Sparkles className="h-4 w-4" />
              Free Resources
            </div>

            <h1 className="mb-4 font-black font-vietnam text-3xl text-grey-15 tracking-tight sm:mb-6 sm:text-4xl md:text-5xl">
              Free Guides to Kickstart Your Career
            </h1>

            <p className="mx-auto max-w-2xl px-2 text-grey-40 text-lg leading-relaxed">
              Download our free, practical guides — no strings attached beyond
              your email.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          {resources.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource, index) => {
                const category = CATEGORIES.find(
                  (c) => c.id === resource.category
                );
                const tint = CARD_TINTS[index % CARD_TINTS.length];
                return (
                  <Link
                    className={`group flex flex-col overflow-hidden rounded-2xl border-2 border-grey-15 shadow-[4px_4px_0_0_var(--color-grey-15)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-grey-15)] ${tint}`}
                    href={`/resources/${resource.slug.current}`}
                    key={resource._id}
                  >
                    {resource.coverImageUrl && (
                      <div className="relative h-44 overflow-hidden border-grey-15/10 border-b bg-white/60">
                        <Image
                          alt={resource.title}
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          src={resource.coverImageUrl}
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      {category && (
                        <span className="mb-2 font-bold text-grey-40 text-xs uppercase tracking-wider">
                          {category.label}
                        </span>
                      )}
                      <h3 className="mb-2 font-bold font-vietnam text-grey-15 text-lg">
                        {resource.title}
                      </h3>
                      <p className="mb-4 flex-1 text-grey-35 text-sm">
                        {resource.description}
                      </p>
                      <span className="inline-flex items-center gap-2 self-start rounded-full border-2 border-grey-15 bg-white px-4 py-2 font-bold text-grey-15 text-sm">
                        <DownloadCloud className="h-4 w-4" />
                        Get Free Guide
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-grey-15 bg-light-97 py-16 text-center">
              <p className="text-grey-40 text-lg">
                New guides are on the way — check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
