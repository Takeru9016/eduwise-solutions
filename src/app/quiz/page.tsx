import type { Metadata } from "next";

import { Footer, Navbar } from "@/components";
import QuizPage, { type QuizCourse } from "@/components/quiz/QuizPage";
import { client } from "@/sanity/lib/client";
import { PRICING_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  description:
    "Answer a few quick questions and get matched with the Eduwise Solutions program that fits your goals, background, and timeline.",
  title: "Find Your Course",
};

export const revalidate = 60;

export default async function Quiz() {
  let courses: QuizCourse[] = [];

  try {
    courses = await client.fetch<QuizCourse[]>(PRICING_QUERY);
  } catch (err) {
    console.error("[QuizPage] Failed to fetch courses from Sanity:", err);
  }

  return (
    <>
      <Navbar />
      <QuizPage courses={courses} />
      <Footer />
    </>
  );
}
