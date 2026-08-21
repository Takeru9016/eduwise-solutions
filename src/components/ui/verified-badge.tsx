import { BadgeCheck } from "lucide-react";

/**
 * Renders only when a verifiable identity signal is passed in - never
 * accepts a plain boolean, so it can't be added to unverified content.
 */
export function VerifiedBadge({
  linkedinUrl,
}: {
  linkedinUrl?: string | null;
}) {
  if (!linkedinUrl) {
    return null;
  }

  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded-full border-2 border-grey-15 bg-primary-90 px-2 py-0.5 font-bold text-[10px] text-grey-15 uppercase tracking-wide"
      title="Verified via LinkedIn"
    >
      <BadgeCheck className="h-3 w-3" />
      Verified
    </span>
  );
}
