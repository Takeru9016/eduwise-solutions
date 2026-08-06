import type { Metadata } from "next";

import { Footer, Navbar } from "@/components";
import PricingPage, {
  type PricingCourse,
} from "@/components/pricing/PricingPage";
import { client } from "@/sanity/lib/client";
import { PRICING_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  description:
    "Transparent, upfront pricing for every Eduwise Solutions program. Compare course fees, EMI options, and what's included before you enroll.",
  title: "Pricing",
};

export const revalidate = 60;

export default async function Pricing() {
  let courses: PricingCourse[] = [];

  try {
    courses = await client.fetch<PricingCourse[]>(PRICING_QUERY);
  } catch (err) {
    console.error("[PricingPage] Failed to fetch courses from Sanity:", err);
  }

  return (
    <>
      <Navbar />
      <PricingPage courses={courses} />
      <Footer />
    </>
  );
}
