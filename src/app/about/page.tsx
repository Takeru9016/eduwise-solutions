import type { Metadata } from "next";

import { AboutUs, Footer, Navbar } from "@/components";
import { client } from "@/sanity/lib/client";
import { COURSE_CATEGORIES_QUERY } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  description:
    "Learn how Eduwise Solutions helps students and professionals become job-ready through industry-aligned courses, mentorship, and placement support.",
  title: "About Us",
};

export default async function AboutUsPage() {
  const courseCategories = await client.fetch<string[]>(
    COURSE_CATEGORIES_QUERY
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <AboutUs
          domainCount={new Set(courseCategories).size}
          programCount={courseCategories.length}
        />
      </main>
      <Footer />
    </>
  );
}
