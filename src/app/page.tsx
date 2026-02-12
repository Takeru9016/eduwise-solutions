import {
  FAQs,
  Footer,
  HeroSection,
  Navbar,
  BenefitSection,
  ProgramSection,
  Testimonials,
  DomainsShowcase,
  HowItWorks,
  // LearningJourney,
} from "@/components";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <DomainsShowcase />
        <HowItWorks />
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
