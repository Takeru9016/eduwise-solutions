import { Footer, Navbar, TermsOfService } from "@/components";

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
