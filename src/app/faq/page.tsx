import type { Metadata } from "next";

import { FAQsPage, Footer, Navbar } from "@/components";

export const metadata: Metadata = {
  description:
    "Answers to common questions about Eduwise Solutions courses, admissions, fees, placement support, and more.",
  title: "Frequently Asked Questions",
};

export const revalidate = 60;

export default function MastersProgram() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <FAQsPage />
      </main>
      <Footer />
    </>
  );
}
