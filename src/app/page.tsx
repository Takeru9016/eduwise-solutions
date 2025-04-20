import {
  FAQs,
  Footer,
  Navbar,
  ProfessionalPage,
  Testimonials,
} from "@/components";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <ProfessionalPage />
        <Testimonials />
        <FAQs />
      </main>
      <Footer />
    </>
  );
}
