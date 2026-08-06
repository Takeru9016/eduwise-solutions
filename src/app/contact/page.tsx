import type { Metadata } from "next";

import { ContactUs, Footer, Navbar } from "@/components";

export const metadata: Metadata = {
  description:
    "Get in touch with Eduwise Solutions for course enquiries, admissions, or support. We're based in Bengaluru and here to help.",
  title: "Contact Us",
};

export default function ContactUsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <ContactUs />
      </main>
      <Footer />
    </>
  );
}
