import type { Metadata } from "next";

import { Footer, Navbar } from "@/components";
import {
  PressCard,
  type SanityPressFeature,
} from "@/components/press/PressCard";
import { client } from "@/sanity/lib/client";
import { PRESS_FEATURES_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  description:
    "Eduwise Solutions in the news — browse every feature, mention, and article across India's leading media platforms.",
  title: "Press Coverage",
};

export const revalidate = 60;

export default async function PressPage() {
  let pressFeatures: SanityPressFeature[] = [];

  try {
    pressFeatures =
      (await client.fetch<SanityPressFeature[]>(PRESS_FEATURES_QUERY)) || [];
  } catch (err) {
    console.error(
      "[PressPage] Failed to fetch press features from Sanity:",
      err
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-light-97 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center md:mb-16">
            <h1 className="mb-4 font-black font-vietnam text-4xl text-grey-15 tracking-tight md:text-5xl">
              Press Coverage
            </h1>
            <p className="mx-auto max-w-2xl text-grey-40 text-lg">
              {pressFeatures.length}+ features and mentions across India&apos;s
              leading media platforms
            </p>
          </div>

          {pressFeatures.length === 0 ? (
            <p className="text-center text-grey-40">
              Press coverage will be showcased here soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pressFeatures.map((feature) => (
                <PressCard feature={feature} key={feature._id} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
