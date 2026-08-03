import { Footer, Navbar, TestimonialPage } from "@/components";

export const revalidate = 60;

export default function ProfessionalProgram() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <TestimonialPage />
      </main>
      <Footer />
    </>
  );
}
