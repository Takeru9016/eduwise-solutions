import { CTASection, DSPage, Footer, Navbar } from "@/components";

export default function DataScience() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <DSPage />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
