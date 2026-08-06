import type { Metadata } from "next";

import { Footer, Navbar, OurCourse } from "@/components";
import type { SanityCourseListItem } from "@/components/courses/OurCourse";

import { client } from "@/sanity/lib/client";
import { COURSES_LIST_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  description:
    "Browse job-ready courses in Development, AI & Data, Cloud & DevOps, Engineering, and Business from Eduwise Solutions.",
  title: "All Courses",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function CoursePage() {
  let courses: SanityCourseListItem[] = [];

  try {
    courses = await client.fetch<SanityCourseListItem[]>(COURSES_LIST_QUERY);
  } catch (err) {
    console.error("[CoursePage] Failed to fetch courses from Sanity:", err);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <OurCourse courses={courses} />
      </main>
      <Footer />
    </>
  );
}
