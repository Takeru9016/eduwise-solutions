import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Footer, Navbar } from "@/components";
import ResourceGateForm from "@/components/resources/ResourceGateForm";
import { client } from "@/sanity/lib/client";
import { LEAD_MAGNET_BY_SLUG_QUERY } from "@/sanity/lib/queries";

interface Resource {
  category: string;
  coverImageUrl: string | null;
  description: string;
  slug: { current: string };
  title: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = await client.fetch<Resource | null>(
    LEAD_MAGNET_BY_SLUG_QUERY,
    { slug }
  );

  if (!resource) {
    return { title: "Resource Not Found" };
  }

  return {
    description: resource.description,
    title: resource.title,
  };
}

export const revalidate = 60;

export default async function ResourceDetail({ params }: PageProps) {
  const { slug } = await params;
  const resource = await client.fetch<Resource | null>(
    LEAD_MAGNET_BY_SLUG_QUERY,
    { slug }
  );

  if (!resource) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-linear-to-b from-primary-99 to-white">
        <section className="container mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2">
          <div>
            {resource.coverImageUrl && (
              <div className="relative mb-6 aspect-video overflow-hidden rounded-2xl shadow-lg">
                <Image
                  alt={resource.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  src={resource.coverImageUrl}
                />
              </div>
            )}
            <h1 className="mb-4 font-bold font-vietnam text-3xl text-grey-15 leading-tight sm:text-4xl">
              {resource.title}
            </h1>
            <p className="text-grey-40 text-lg">{resource.description}</p>
          </div>

          <ResourceGateForm
            resourceSlug={resource.slug.current}
            resourceTitle={resource.title}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
