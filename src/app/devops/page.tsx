import { CTASection, DevOpsPage, Footer, Navbar } from "@/components";

import { client } from "@/sanity/lib/client";
import { DEVOPS_FAQ_QUERY } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

export default async function DevOps() {
  const faqData = await client.fetch(DEVOPS_FAQ_QUERY);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <DevOpsPage faqData={faqData} />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
