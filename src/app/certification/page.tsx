import { CertificationPage, CTASection, Footer, Navbar } from "@/components";

export default function CertificationProgram() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <CertificationPage />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
