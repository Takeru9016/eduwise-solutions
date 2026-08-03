import { CATEGORIES } from "@/data/courses";
import { client } from "@/sanity/lib/client";
import { COURSES_NAV_QUERY } from "@/sanity/lib/queries";
import Navbar from "./Navbar";

export interface SanityCourseNav {
  _id: string;
  category: string;
  emoji: string | null;
  slug: string;
  title: string;
}

// Build the same shape getCategoriesWithCourses() returned, but from Sanity data
// IMPORTANT: Do NOT include Lucide icon components — they cannot cross the server→client boundary
function buildCategoriesWithCourses(courses: SanityCourseNav[]) {
  return CATEGORIES.map((cat) => ({
    courses: courses
      .filter((c) => c.category === cat.id)
      .map((c) => ({
        emoji: c.emoji ?? "📚",
        id: c._id,
        slug: `/courses/${c.slug}`,
        title: c.title,
      })),
    emoji: cat.emoji,
    id: cat.id,
    label: cat.label,
  })).filter((cat) => cat.courses.length > 0);
}

export default async function NavbarServer() {
  let categoriesWithCourses: ReturnType<typeof buildCategoriesWithCourses> = [];

  try {
    const courses = await client.fetch<SanityCourseNav[]>(
      COURSES_NAV_QUERY,
      {},
      { next: { revalidate: 60 } } // Revalidate every 60 seconds
    );
    categoriesWithCourses = buildCategoriesWithCourses(courses);
  } catch (err) {
    console.error("[NavbarServer] Failed to fetch courses from Sanity:", err);
  }

  return <Navbar categoriesWithCourses={categoriesWithCourses} />;
}
