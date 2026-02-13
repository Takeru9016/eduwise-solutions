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
  FeaturedPress,
} from "@/components";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <DomainsShowcase />
        <HowItWorks />
        <FeaturedPress />
        <ProgramSection />
        <BenefitSection />
        <Testimonials />
        <FAQs />
      </main>
      <Footer />
    </>
  );
}
