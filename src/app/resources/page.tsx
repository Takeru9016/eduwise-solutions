import type { Metadata } from "next";

import { Footer, Navbar } from "@/components";
import ResourcesPage, {
  type Resource,
} from "@/components/resources/ResourcesPage";
import { client } from "@/sanity/lib/client";
import { LEAD_MAGNETS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  description:
    "Free, practical guides on careers, courses, and job-readiness from Eduwise Solutions. Download instantly.",
  title: "Free Career Guides & Resources",
};

export const revalidate = 60;

export default async function Resources() {
  let resources: Resource[] = [];

  try {
    resources = await client.fetch<Resource[]>(LEAD_MAGNETS_QUERY);
  } catch (err) {
    console.error(
      "[ResourcesPage] Failed to fetch resources from Sanity:",
      err
    );
  }

  return (
    <>
      <Navbar />
      <ResourcesPage resources={resources} />
      <Footer />
    </>
  );
}
