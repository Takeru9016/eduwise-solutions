import { AIMLPage, CTASection, Footer, Navbar } from "@/components";

export default function AIML() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <AIMLPage />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
