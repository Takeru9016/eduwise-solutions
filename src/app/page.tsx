import {
  BenefitSection,
  FAQs,
  Footer,
  Navbar,
  ProfessionalPage,
} from "@/components";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <ProfessionalPage />
        <BenefitSection />
        <FAQs />
      </main>
      <Footer />
    </>
  );
}
