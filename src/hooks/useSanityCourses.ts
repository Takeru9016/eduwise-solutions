import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";

export interface CourseOption {
  value: string;
  label: string;
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
        setCourses([...data, { value: "other", label: "Other" }]);
      } catch (error) {
        console.error("Failed to fetch courses from Sanity:", error);
        // Fallback or empty if something goes wrong
        setCourses([{ value: "other", label: "Other" }]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourses();
  }, []);

  return { courses, isLoading };
}
