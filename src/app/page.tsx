import {
  FAQs,
  Footer,
  HeroSection,
  Navbar,
  BenefitSection,
  ProgramSection,
  Testimonials,
  DomainsShowcase,
  // LearningJourney,
} from "@/components";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <DomainsShowcase />
        <ProgramSection />
        <BenefitSection />
        {/* <LearningJourney /> */}
        <Testimonials />
        <FAQs />
      </main>
      <Footer />
    </>
  );
}
