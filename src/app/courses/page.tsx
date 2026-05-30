import { Footer, Navbar, OurCourse } from "@/components";
import type { SanityCourseListItem } from "@/components/courses/OurCourse";

import { client } from "@/sanity/lib/client";
import { COURSES_LIST_QUERY } from "@/sanity/lib/queries";

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
