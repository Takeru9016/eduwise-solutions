import { ArrowUpRight, Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-light-97 px-4 py-16">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-black font-vietnam text-8xl text-grey-15 tracking-tight md:text-9xl">
          404
        </p>

        <h1 className="mt-4 font-black font-vietnam text-2xl text-grey-15 md:text-3xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mx-auto mt-3 max-w-md text-grey-40 text-lg leading-relaxed">
          The link may be broken, or the page may have moved. Let&apos;s get you
          back on track.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 px-6 py-3 font-bold text-grey-15 text-sm transition-transform hover:-translate-y-0.5 active:scale-[0.97]"
            href="/"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-white px-6 py-3 font-bold text-grey-15 text-sm transition-transform hover:-translate-y-0.5 active:scale-[0.97]"
            href="/courses"
          >
            <Search className="h-4 w-4" />
            Browse Courses
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
