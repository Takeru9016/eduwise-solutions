import type { Metadata } from "next";
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
import { absoluteUrl, faqPageJsonLd } from "@/lib/seo";
import { client } from "@/sanity/lib/client";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";
import type { HomePageContent } from "@/types/pages";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const home = await client.fetch<HomePageContent | null>(HOME_PAGE_QUERY);
  const seo = home?.seo;

  return {
    alternates: { canonical: absoluteUrl("/") },
    ...(seo?.description ? { description: seo.description } : {}),
    ...(seo?.keywords?.length ? { keywords: seo.keywords } : {}),
    ...(seo?.title ? { title: { absolute: seo.title } } : {}),
  };
}

export default async function Home() {
  const home = await client.fetch<HomePageContent | null>(HOME_PAGE_QUERY);

  if (!home) {
    throw new Error("Home Page document is missing in Sanity");
  }

  const faqItems = home.faq?.items ?? [];

  return (
    <>
      {home.faq?.enabled !== false && faqItems.length > 0 && (
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static, code-generated JSON-LD, not user input
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageJsonLd(faqItems)),
          }}
          type="application/ld+json"
        />
      )}
      <Navbar />
      <main className="min-h-screen">
        {home.hero && <HeroSection hero={home.hero} />}
        {home.domains && home.domains.enabled !== false && (
          <DomainsShowcase content={home.domains} />
        )}
        {home.howItWorks && home.howItWorks.enabled !== false && (
          <HowItWorks content={home.howItWorks} />
        )}
        {home.press && home.press.enabled !== false && (
          <FeaturedPress content={home.press} />
        )}
        {home.programs && home.programs.enabled !== false && (
          <ProgramSection heading={home.programs.heading} />
        )}
        {home.benefits && home.benefits.enabled !== false && (
          <BenefitSection content={home.benefits} />
        )}
        {home.testimonials && home.testimonials.enabled !== false && (
          <Testimonials
            heading={home.testimonials.heading}
            subheading={home.testimonials.subheading}
          />
        )}
        {home.faq && home.faq.enabled !== false && <FAQs content={home.faq} />}
      </main>
      <Footer />
    </>
  );
}
