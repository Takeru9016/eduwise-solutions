import type { Metadata } from "next";

import { Footer, Navbar, TermsOfService } from "@/components";

export const metadata: Metadata = {
  description:
    "Terms of Service for using Eduwise Solutions' website and programs.",
  title: "Terms of Service",
};

export default function ProfessionalProgram() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <TermsOfService />
      </main>
      <Footer />
    </>
  );
}
