import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface SanityPressFeature {
  _id: string;
  articleUrl: string;
  description: string;
  featured?: boolean;
  headline: string;
  order: number;
  publicationLogoUrl: string;
  publicationName: string;
  publishedAt?: string;
}

export function PressCard({ feature }: { feature: SanityPressFeature }) {
  return (
    <Link
      className="group relative flex h-full flex-col justify-between rounded-3xl border-2 border-grey-15 bg-white p-6 shadow-[4px_4px_0_0_var(--color-grey-15)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-grey-15)] sm:p-7"
      href={feature.articleUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="flex items-start justify-between">
        <div className="relative h-10 w-auto max-w-36">
          <Image
            alt={`${feature.publicationName} logo`}
            className="h-10 w-auto object-contain object-left"
            height={40}
            src={feature.publicationLogoUrl}
            width={144}
          />
        </div>
        <ArrowUpRight className="h-5 w-5 text-grey-40 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-grey-15" />
      </div>

      <div className="mt-6">
        <h3 className="mb-2 line-clamp-2 font-bold font-vietnam text-grey-15 text-lg leading-snug">
          {feature.headline}
        </h3>
        <p className="line-clamp-3 text-grey-40 text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>

      {feature.featured && (
        <span className="absolute -top-2 -left-2 rounded-full border-2 border-grey-15 bg-gold px-2.5 py-0.5 font-semibold text-[10px] text-grey-15 uppercase tracking-wide">
          Featured
        </span>
      )}
    </Link>
  );
}
