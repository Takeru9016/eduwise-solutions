import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Navbar } from "@/components";
import CourseTemplate from "@/components/courses/CourseTemplate";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  courseJsonLd,
  faqPageJsonLd,
  localBusinessJsonLd,
} from "@/lib/seo";
import { client } from "@/sanity/lib/client";
import {
  ALL_COURSE_SLUGS_QUERY,
  COURSE_BY_SLUG_QUERY,
} from "@/sanity/lib/queries";
import type { CourseContent } from "@/types/course";

export const revalidate = 60; // revalidate every 60 seconds

interface PageProps {
  params: Promise<{ slug: string }>;
}

// SSG: Generate all course pages at build time
export async function generateStaticParams() {
  const courses = await client.fetch<{ slug: string }[]>(
    ALL_COURSE_SLUGS_QUERY
  );
  return courses.map((course) => ({ slug: course.slug }));
}

// SEO: Dynamic meta per course
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await client.fetch<CourseContent | null>(
    COURSE_BY_SLUG_QUERY,
    { slug }
  );

  if (!course) {
    return { title: "Course Not Found" };
  }

  return {
    alternates: {
      canonical: absoluteUrl(`/courses/${slug}`),
    },
    description:
      course.seoDescription ||
      course.description ||
      `Learn ${course.title} with Eduwise Solutions. ${course.subtitle}`,
    keywords: course.seoKeywords?.length ? course.seoKeywords : undefined,
    openGraph: {
      description: course.seoDescription || course.description,
      images: course.heroImageUrl ? [{ url: course.heroImageUrl }] : [],
      title: course.seoTitle || course.title,
    },
    robots: { follow: true, index: true },
    title: course.seoTitle || course.title,
  };
}

// Page Component
export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = await client.fetch<CourseContent | null>(
    COURSE_BY_SLUG_QUERY,
    { slug }
  );

  if (!course) {
    notFound();
  }

  return (
    <>
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, code-generated JSON-LD, not user input
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            courseJsonLd({
              description: course.description,
              modules: course.modules,
              price: course.price,
              seoDescription: course.seoDescription,
              slug: course.slug.current,
              subtitle: course.subtitle,
              title: course.title,
            })
          ),
        }}
        type="application/ld+json"
      />
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, code-generated JSON-LD, not user input
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd()),
        }}
        type="application/ld+json"
      />
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, code-generated JSON-LD, not user input
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Courses", path: "/courses" },
              { name: course.title, path: `/courses/${slug}` },
            ])
          ),
        }}
        type="application/ld+json"
      />
      {course.faq && course.faq.length > 0 && (
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static, code-generated JSON-LD, not user input
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageJsonLd(course.faq)),
          }}
          type="application/ld+json"
        />
      )}
      <Navbar />
      <CourseTemplate course={course} />
      <Footer />
    </>
  );
}
