import { Footer, Navbar, ContactUs } from "@/components";

export default function ContactUsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <ContactUs />
      </main>
      <Footer />
    </>
  );
}
