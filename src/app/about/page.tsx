import { AboutUs, Footer, Navbar } from "@/components";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <AboutUs />
      </main>
      <Footer />
    </>
  );
}
