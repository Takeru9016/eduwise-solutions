import type { Metadata } from "next";

import { Footer, Navbar, PrivacyPolicy } from "@/components";

export const metadata: Metadata = {
  description: "How Eduwise Solutions collects, uses, and protects your data.",
  title: "Privacy Policy",
};

export default function ProfessionalProgram() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <PrivacyPolicy />
      </main>
      <Footer />
    </>
  );
}
