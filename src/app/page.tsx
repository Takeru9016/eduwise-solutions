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
  RefundHighlight,
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
        <RefundHighlight />
        {/* <LearningJourney /> */}
        <Testimonials />
        <FAQs />
      </main>
      <Footer />
    </>
  );
}
