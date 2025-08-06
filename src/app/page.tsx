import {
  FAQs,
  Footer,
  HeroSection,
  Navbar,
  BenefitSection,
  ProgramSection,
  Testimonials,
} from "@/components";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <ProgramSection/>
        <BenefitSection />
        <Testimonials />
        <FAQs />
      </main>
      <Footer />
    </>
  );
}
