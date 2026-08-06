import type { Metadata } from "next";

import { Footer, Navbar, RefundPage } from "@/components";

export const metadata: Metadata = {
  description: "Eduwise Solutions' refund policy for course enrollments.",
  title: "Refund Policy",
};

export default function ProfessionalProgram() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <RefundPage />
      </main>
      <Footer />
    </>
  );
}
