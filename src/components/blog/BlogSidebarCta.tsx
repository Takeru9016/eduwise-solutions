import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export interface BlogCtaCourse {
  slug: string;
  title: string;
}

export function BlogSidebarCta({ course }: { course: BlogCtaCourse | null }) {
  return (
    <div className="rounded-3xl border-2 border-grey-15 bg-gold-90 p-6 shadow-[4px_4px_0_0_var(--color-grey-15)]">
      <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border-2 border-grey-15 bg-white px-3 py-1 font-bold text-grey-15 text-xs">
        <MessageCircle className="h-3 w-3" />
        Free counselling
      </span>
      <p className="font-black font-vietnam text-grey-15 text-xl leading-snug">
        {course ? "Turn this into a career" : "Ready to build this skill?"}
      </p>
      <p className="mt-2 line-clamp-3 text-grey-35 text-sm leading-relaxed">
        {course
          ? course.title
          : "Explore hands-on programs designed to take you from fundamentals to job-ready."}
      </p>
      <Link
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 px-5 font-bold text-grey-15 text-sm transition-transform hover:-translate-y-0.5 hover:bg-primary-90 active:scale-[0.97]"
        href={course ? `/courses/${course.slug}` : "/courses"}
      >
        {course ? "View Program" : "Explore Courses"}
        <ArrowRight className="h-4 w-4" />
      </Link>
      <Link
        className="mt-3 block text-center font-bold text-grey-15 text-sm underline-offset-4 hover:underline"
        href="/contact"
      >
        Talk to a Counselor
      </Link>
    </div>
  );
}
