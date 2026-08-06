import type { Metadata } from "next";

import { Footer, Navbar, TestimonialPage } from "@/components";

export const metadata: Metadata = {
  description:
    "Hear from Eduwise Solutions students who transformed their careers through our job-ready training programs.",
  title: "Student Testimonials",
};

export const revalidate = 60;

export default function ProfessionalProgram() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <TestimonialPage />
      </main>
      <Footer />
    </>
  );
}
