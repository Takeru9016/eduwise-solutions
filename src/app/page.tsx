import {
  BenefitSection,
  DomainsShowcase,
  FAQs,
  FeaturedPress,
  Footer,
  HeroSection,
  HowItWorks,
  Navbar,
  ProgramSection,
  Testimonials,
} from "@/components";

export const revalidate = 60;

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
