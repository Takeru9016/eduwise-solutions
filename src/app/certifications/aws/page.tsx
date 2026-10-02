import type { Metadata } from "next";

import {
  AWSCareerTable,
  AWSCategories,
  AWSCertGrid,
  AWSCertSyllabus,
  AWSConclusion,
  AWSFaqAccordion,
  AWSHero,
  AWSScheduleSteps,
  AWSStatsBar,
  AWSVoucherSteps,
  Footer,
  Navbar,
} from "@/components";
import { CERT_LEVELS } from "@/components/certifications/aws/aws-styles";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { client } from "@/sanity/lib/client";
import { AWS_CERTIFICATIONS_QUERY, AWS_PAGE_QUERY } from "@/sanity/lib/queries";
import type {
  AwsCertification,
  AwsPageContent,
  CertSyllabus,
} from "@/types/pages";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<AwsPageContent | null>(AWS_PAGE_QUERY);
  const seo = page?.seo;

  return {
    alternates: { canonical: absoluteUrl("/certifications/aws") },
    ...(seo?.description ? { description: seo.description } : {}),
    ...(seo?.keywords?.length ? { keywords: seo.keywords } : {}),
    ...(seo?.title ? { title: { absolute: seo.title } } : {}),
  };
}

function toSyllabus(cert: AwsCertification): CertSyllabus {
  return {
    code: cert.code,
    domains: cert.domains ?? [],
    level: cert.level,
    resources: cert.resources ?? [],
    sampleQA: cert.sampleQA ?? [],
    studyTips: cert.studyTips ?? [],
    studyWeeks: cert.studyWeeks ?? "",
    title: cert.title,
  };
}

export default async function AWSCertificationsPage() {
  const [page, certifications] = await Promise.all([
    client.fetch<AwsPageContent | null>(AWS_PAGE_QUERY),
    client.fetch<AwsCertification[]>(AWS_CERTIFICATIONS_QUERY),
  ]);

  if (!page) {
    throw new Error("AWS Certification Page document is missing in Sanity");
  }

  const sortedCerts = [...certifications].sort(
    (a, b) =>
      CERT_LEVELS.indexOf(a.level) - CERT_LEVELS.indexOf(b.level) ||
      (a.order ?? 0) - (b.order ?? 0)
  );
  const syllabusCerts = sortedCerts
    .filter((cert) => cert.domains?.length)
    .map(toSyllabus);
  const faqItems = page.faq?.items ?? [];

  return (
    <>
      {page.faq?.enabled !== false && faqItems.length > 0 && (
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static, code-generated JSON-LD, not user input
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageJsonLd(faqItems)),
          }}
          type="application/ld+json"
        />
      )}
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, code-generated JSON-LD, not user input
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "AWS Certifications", path: "/certifications/aws" },
            ])
          ),
        }}
        type="application/ld+json"
      />
      <Navbar />
      <main>
        {page.hero && <AWSHero hero={page.hero} />}
        {page.stats && page.stats.length > 0 && (
          <AWSStatsBar stats={page.stats} />
        )}
        {page.certGrid && page.certGrid.enabled !== false && (
          <AWSCertGrid certifications={sortedCerts} content={page.certGrid} />
        )}
        {page.syllabus &&
          page.syllabus.enabled !== false &&
          syllabusCerts.length > 0 && (
            <AWSCertSyllabus certs={syllabusCerts} content={page.syllabus} />
          )}
        {page.tracks && page.tracks.enabled !== false && (
          <AWSCategories content={page.tracks} />
        )}
        {page.career && page.career.enabled !== false && (
          <AWSCareerTable content={page.career} />
        )}
        {page.voucher && page.voucher.enabled !== false && (
          <AWSVoucherSteps content={page.voucher} />
        )}
        {page.schedule && page.schedule.enabled !== false && (
          <AWSScheduleSteps content={page.schedule} />
        )}
        {page.faq && page.faq.enabled !== false && (
          <AWSFaqAccordion content={page.faq} />
        )}
        {page.conclusion && page.conclusion.enabled !== false && (
          <AWSConclusion content={page.conclusion} />
        )}
      </main>
      <Footer />
    </>
  );
}
