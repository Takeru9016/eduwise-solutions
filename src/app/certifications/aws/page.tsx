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

export const metadata: Metadata = {
  description:
    "Get AWS Certification Exam Vouchers for Cloud Practitioner, AI Practitioner, Solutions Architect, Developer, SysOps, Data Engineer, and Machine Learning Engineer certifications. Expert guidance from Eduwise Solutions.",
  title:
    "AWS Certification Exam Vouchers – A Complete Guide | Eduwise Solutions",
};

export default function AWSCertificationsPage() {
  return (
    <>
      <Navbar />
      <main>
        <AWSHero />
        <AWSStatsBar />
        <AWSCertGrid />
        <AWSCertSyllabus />
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
