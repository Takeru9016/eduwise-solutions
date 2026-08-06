import type { Metadata } from "next";

import { AboutUs, Footer, Navbar } from "@/components";

export const metadata: Metadata = {
  description:
    "Learn how Eduwise Solutions helps students and professionals become job-ready through industry-aligned courses, mentorship, and placement support.",
  title: "About Us",
};

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <AboutUs />
      </main>
      <Footer />
    </>
  );
}
