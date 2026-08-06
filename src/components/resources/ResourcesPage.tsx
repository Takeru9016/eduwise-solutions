import { DownloadCloud } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
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

export default function ResourcesPage({ resources }: ResourcesPageProps) {
  return (
    <main className="min-h-screen">
      <section className="bg-linear-to-b from-primary-99 to-white px-4 py-16 sm:py-20">
        <div className="container mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            Free Resources
          </Badge>
          <h1 className="mb-4 font-bold font-vietnam text-4xl text-grey-15 leading-tight sm:text-5xl">
            Free Guides to{" "}
            <span className="bg-linear-to-r from-primary-75 to-primary-90 bg-clip-text text-transparent">
              Kickstart Your Career
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-grey-40 text-lg">
            Download our free, practical guides — no strings attached beyond
            your email.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-16">
        <div className="container mx-auto">
          {resources.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => {
                const category = CATEGORIES.find(
                  (c) => c.id === resource.category
                );
                return (
                  <Link
                    className="group flex flex-col overflow-hidden rounded-2xl border border-light-90 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary-90 hover:shadow-2xl"
                    href={`/resources/${resource.slug.current}`}
                    key={resource._id}
                  >
                    {resource.coverImageUrl && (
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          alt={resource.title}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          src={resource.coverImageUrl}
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      {category && (
                        <span className="mb-2 text-grey-40 text-xs uppercase tracking-wider">
                          {category.label}
                        </span>
                      )}
                      <h3 className="mb-2 font-bold font-vietnam text-grey-15 text-lg">
                        {resource.title}
                      </h3>
                      <p className="mb-4 flex-1 text-grey-40 text-sm">
                        {resource.description}
                      </p>
                      <span className="inline-flex items-center gap-2 font-semibold text-primary-75 text-sm">
                        <DownloadCloud className="h-4 w-4" />
                        Get Free Guide
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center">
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
