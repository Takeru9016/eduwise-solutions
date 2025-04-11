import { Footer, Navbar, ProfessionalPage } from "@/components";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <ProfessionalPage />
        {/* <FAQs /> */}
      </main>
      <Footer />
    </>
  );
}
