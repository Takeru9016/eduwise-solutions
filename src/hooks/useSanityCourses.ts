import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

export interface CourseOption {
  label: string;
  value: string;
}

export function useSanityCourses() {
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const query = `*[_type == "course"] | order(title asc) { "value": slug.current, "label": title }`;
        const data = await client.fetch<CourseOption[]>(query);

        // Add "Other" option at the end
        setCourses([...data, { label: "Other", value: "other" }]);
      } catch (error) {
        console.error("Failed to fetch courses from Sanity:", error);
        // Fallback or empty if something goes wrong
        setCourses([{ label: "Other", value: "other" }]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourses();
  }, []);

  return { courses, isLoading };
}
