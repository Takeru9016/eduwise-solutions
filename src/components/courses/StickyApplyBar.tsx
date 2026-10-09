"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function StickyApplyBar({
  courseTitle,
  href,
  label = "Apply Now",
  targetId,
}: {
  courseTitle: string;
  href?: string;
  label?: string;
  targetId: string;
}) {
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setFormInView(entry.isIntersecting);
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <div
      aria-hidden={formInView}
      className={`fixed inset-x-0 bottom-0 z-40 border-grey-15 border-t-2 bg-white py-3 pr-24 pl-4 transition-transform duration-200 ease-out lg:hidden ${
        formInView ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center gap-3">
        <p className="line-clamp-2 min-w-0 flex-1 font-bold font-vietnam text-grey-15 text-sm leading-snug">
          {courseTitle}
        </p>
        <Link
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 px-5 font-bold text-grey-15 text-sm transition-transform active:scale-[0.97]"
          href={href ?? `#${targetId}`}
          tabIndex={formInView ? -1 : 0}
        >
          {label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
