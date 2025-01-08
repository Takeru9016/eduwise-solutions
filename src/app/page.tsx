import {
  BenefitSection,
  FAQs,
  Footer,
  HeroSection,
  Navbar,
  ProgramSection,
  Testimonials,
} from "@/components";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <BenefitSection />
        <ProgramSection />
        <Testimonials />
        <FAQs />
      </main>
      <Footer />
    </>
  );
}
