import { CTASection, Footer, Navbar, ProfessionalPage } from "@/components";

export default function ProfessionalProgram() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <ProfessionalPage />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
