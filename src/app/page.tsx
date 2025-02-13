import {
  BenefitSection,
  CTASection,
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
        <ProgramSection />
        <BenefitSection />
        <Testimonials />
        <FAQs />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
