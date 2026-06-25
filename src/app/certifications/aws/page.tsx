import type { Metadata } from "next";

import {
  Footer,
  Navbar,
  AWSHero,
  AWSStatsBar,
  AWSCertGrid,
  AWSCategories,
  AWSCareerTable,
  AWSVoucherSteps,
  AWSScheduleSteps,
  AWSFaqAccordion,
  AWSConclusion,
} from "@/components";

export const metadata: Metadata = {
  title:
    "AWS Certification Exam Vouchers – A Complete Guide | Eduwise Solutions",
  description:
    "Get AWS Certification Exam Vouchers for Cloud Practitioner, AI Practitioner, Solutions Architect, Developer, SysOps, Data Engineer, and Machine Learning Engineer certifications. Expert guidance from Eduwise Solutions.",
};

export default function AWSCertificationsPage() {
  return (
    <>
      <Navbar />
      <main role="main">
        <AWSHero />
        <AWSStatsBar />
        <AWSCertGrid />
        <AWSCategories />
        <AWSCareerTable />
        <AWSVoucherSteps />
        <AWSScheduleSteps />
        <AWSFaqAccordion />
        <AWSConclusion />
      </main>
      <Footer />
    </>
  );
}
