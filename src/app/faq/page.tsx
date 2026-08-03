import { FAQsPage, Footer, Navbar } from "@/components";

export const revalidate = 60;

export default function MastersProgram() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <FAQsPage />
      </main>
      <Footer />
    </>
  );
}
