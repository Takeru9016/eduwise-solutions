import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Navbar } from "@/components";
import CourseTemplate from "@/components/courses/CourseTemplate";
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
    return { title: "Course Not Found | Eduwise Solutions" };
  }

  return {
    description:
      course.seoDescription ||
      course.description ||
      `Learn ${course.title} with Eduwise Solutions. ${course.subtitle}`,
    openGraph: {
      description: course.seoDescription || course.description,
      images: course.heroImageUrl ? [{ url: course.heroImageUrl }] : [],
      title: course.seoTitle || course.title,
    },
    title: course.seoTitle || `${course.title} | Eduwise Solutions`,
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
      <Navbar />
      <CourseTemplate course={course} />
      <Footer />
    </>
  );
}
