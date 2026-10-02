import type { CertLevel } from "@/types/pages";

export const CERT_LEVELS: CertLevel[] = [
  "Foundational",
  "Associate",
  "Professional",
  "Specialty",
];

export const CATEGORY_STYLES: Record<
  CertLevel,
  { bg: string; text: string; border: string }
> = {
  Associate: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
  },
  Foundational: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
  },
  Professional: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
  },
  Specialty: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
  },
};
