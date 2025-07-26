import { CTASection, Footer, FullStackPage, Navbar } from "@/components";

export default function FullStack() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <FullStackPage />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
