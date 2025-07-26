import { CTASection, CyberSecPage, Footer, Navbar } from "@/components";

export default function CyberSec() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <CyberSecPage />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
