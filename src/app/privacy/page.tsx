import { Footer, Navbar, PrivacyPolicy } from "@/components";

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
