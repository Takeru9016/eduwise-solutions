import { ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { CourseCategoryId } from "@/data/courses";
import { CATEGORIES } from "@/data/courses";
import { client } from "@/sanity/lib/client";
import { FEATURED_PROGRAMS_QUERY } from "@/sanity/lib/queries";

interface ProgramStat {
  icon?: string;
  label: string;
  value: string;
}

interface SanityFeaturedProgram {
  _id: string;
  category: CourseCategoryId;
  description: string;
  duration: string;
  heroImageUrl: string | null;
  slug: { current: string };
  stats: ProgramStat[];
  subtitle: string;
  title: string;
}

const CARD_TINTS = [
  "bg-primary-99",
  "bg-gold-90",
  "bg-white",
  "bg-primary-90",
  "bg-light-95",
  "bg-primary-95",
] as const;

const ProgramCard = ({
  program,
  index,
}: {
  program: SanityFeaturedProgram;
  index: number;
}) => {
  const tint = CARD_TINTS[index % CARD_TINTS.length];
  const placement = program.stats.find((s) => s.label === "Placement")?.value;
  const CategoryIcon =
    CATEGORIES.find((c) => c.id === program.category)?.icon ?? Sparkles;

  return (
    <Link
      className={`group relative flex flex-col overflow-hidden rounded-3xl border-2 border-grey-15 shadow-[4px_4px_0_0_var(--color-grey-15)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-grey-15)] ${tint}`}
      href={`/courses/${program.slug.current}`}
    >
      <div className="relative h-44 w-full border-grey-15 border-b-2">
        {program.heroImageUrl && (
          <Image
            alt={program.title}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 400px, 100vw"
            src={program.heroImageUrl}
          />
        )}
        <div className="absolute -bottom-6 left-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-grey-15 bg-white">
          <CategoryIcon className="h-6 w-6 text-grey-15" strokeWidth={2} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-9">
        <h3 className="mb-1 font-bold font-vietnam text-grey-15 text-xl">
          {program.title}
        </h3>
        <p className="mb-3 text-grey-40 text-sm">{program.subtitle}</p>
        <p className="mb-5 line-clamp-2 text-grey-40 text-sm leading-relaxed">
          {program.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex gap-2">
            <span className="rounded-full border border-grey-90 bg-white px-2.5 py-1 font-semibold text-grey-35 text-xs">
              {program.duration}
            </span>
            {placement && (
              <span className="rounded-full border border-grey-90 bg-white px-2.5 py-1 font-semibold text-grey-35 text-xs">
                {placement} Placement
              </span>
            )}
          </div>
          <ArrowUpRight className="h-5 w-5 text-grey-40 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-grey-15" />
        </div>
      </div>
    </Link>
  );
};

export default async function Programs() {
  let programs: SanityFeaturedProgram[] = [];

  try {
    programs =
      (await client.fetch<SanityFeaturedProgram[]>(FEATURED_PROGRAMS_QUERY)) ||
      [];
  } catch (error) {
    console.error("Error fetching featured programs:", error);
    programs = [];
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 sm:flex-row md:mb-16">
          <div className="text-center sm:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-semibold text-grey-15 text-sm">
              <Sparkles className="h-4 w-4" />
              Featured Programs
            </div>
            <h2 className="font-black font-vietnam text-3xl text-grey-15 tracking-tight md:text-4xl lg:text-5xl">
              Choose Your Area of Interest
            </h2>
          </div>

          <Link
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-6 py-3 font-bold text-grey-15 transition-transform hover:-translate-y-0.5"
            href="/courses"
          >
            View All Programs
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {programs.length === 0 ? (
          <p className="rounded-lg bg-light-97 py-12 text-center text-grey-40">
            No programs available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <ProgramCard index={index} key={program._id} program={program} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
