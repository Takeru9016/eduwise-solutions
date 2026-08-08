import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AWSPartnerBanner() {
  return (
    <Link
      className="group flex items-center justify-center gap-2 border-grey-15 border-b-2 bg-grey-15 px-4 py-2.5 text-center transition-colors hover:bg-grey-20 sm:gap-3"
      href="/certifications/aws"
    >
      <Image
        alt="AWS"
        className="shrink-0 object-contain brightness-0 invert"
        height={20}
        src="/partners/aws.svg"
        width={36}
      />
      <span className="min-w-0 truncate font-medium text-xs sm:text-sm">
        <span className="font-bold text-gold">Official AWS Partner</span>
        <span className="mx-2 hidden text-white/30 sm:inline">•</span>
        <span className="hidden text-white/80 sm:inline">
          Cloud-powered training &amp; certifications
        </span>
      </span>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-gold transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </Link>
  );
}
