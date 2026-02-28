import { Metadata } from "next";
import { notFound } from "next/navigation";

import { client } from "@/sanity/lib/client";
import {
  COURSE_BY_SLUG_QUERY,
  ALL_COURSE_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { Navbar, Footer } from "@/components";
import CourseTemplate from "@/components/courses/CourseTemplate";
import type { CourseContent } from "@/types/course";

export const revalidate = 60; // revalidate every 60 seconds

interface PageProps {
  params: Promise<{ slug: string }>;
}

// SSG: Generate all course pages at build time
export async function generateStaticParams() {
  const courses = await client.fetch<{ slug: string }[]>(
    ALL_COURSE_SLUGS_QUERY,
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
    { slug },
  );

  if (!course) {
    return { title: "Course Not Found | Eduwise Solutions" };
  }

  return {
    title: course.seoTitle || `${course.title} | Eduwise Solutions`,
    description:
      course.seoDescription ||
      course.description ||
      `Learn ${course.title} with Eduwise Solutions. ${course.subtitle}`,
    openGraph: {
      title: course.seoTitle || course.title,
      description: course.seoDescription || course.description,
      images: course.heroImageUrl ? [{ url: course.heroImageUrl }] : [],
    },
  };
}

// Page Component
export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = await client.fetch<CourseContent | null>(
    COURSE_BY_SLUG_QUERY,
    { slug },
  );

  if (!course) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <CourseTemplate course={course} />
      <Footer />
    </>
  );
}
