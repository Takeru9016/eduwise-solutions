import { CTASection, Footer, Navbar, OurCourse } from "@/components";

export default function CoursePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <OurCourse />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
