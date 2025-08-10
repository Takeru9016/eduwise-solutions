import { CTASection, DevOpsPage, Footer, Navbar } from "@/components";

export default function DevOps() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <DevOpsPage />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}


