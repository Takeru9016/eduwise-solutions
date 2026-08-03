"use client";

/**
 * Skeleton loading state for /courses/[slug].
 * Renders animated placeholders for every major section of the course page,
 * giving users instant visual feedback while Next.js streams the real content.
 */

function Pulse({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-slate-200 ${className}`} />;
}

export default function CourseLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Navbar skeleton ── */}
      <header className="sticky top-0 z-50 border-slate-100 border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Pulse className="h-8 w-32 rounded-lg" />
          <div className="hidden items-center gap-6 md:flex">
            <Pulse className="h-4 w-16" />
            <Pulse className="h-4 w-16" />
            <Pulse className="h-4 w-16" />
            <Pulse className="h-4 w-16" />
          </div>
          <Pulse className="h-10 w-28 rounded-full" />
        </div>
      </header>

      {/* ── 1. Hero section skeleton ── */}
      <section className="relative bg-linear-to-b from-slate-50 to-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2">
            {/* Text side */}
            <div className="order-2 space-y-6 text-center lg:order-1 lg:text-left">
              <Pulse className="mx-auto h-8 w-40 rounded-full lg:mx-0" />
              <Pulse className="h-12 w-full rounded-xl" />
              <Pulse className="h-10 w-3/4 rounded-xl" />
              <Pulse className="h-6 w-full rounded" />
              <Pulse className="h-6 w-5/6 rounded" />
              <div className="flex justify-center gap-4 pt-4 lg:justify-start">
                <Pulse className="h-12 w-36 rounded-full" />
                <Pulse className="h-12 w-36 rounded-full" />
              </div>
            </div>
            {/* Image side */}
            <div className="order-1 flex justify-center lg:order-2">
              <Pulse className="h-[340px] w-[340px] rounded-3xl lg:h-[460px] lg:w-[460px]" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Stats bar skeleton ── */}
      <section className="bg-white py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                className="space-y-3 rounded-2xl bg-slate-50 p-6 text-center"
                key={i}
              >
                <Pulse className="mx-auto h-10 w-10 rounded-full" />
                <Pulse className="mx-auto h-8 w-16 rounded" />
                <Pulse className="mx-auto h-4 w-24 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Program Highlights (Bento Grid) skeleton ── */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-4 text-center">
            <Pulse className="mx-auto h-8 w-40 rounded-full" />
            <Pulse className="mx-auto h-10 w-64 rounded-xl" />
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
            <Pulse className="col-span-1 h-64 rounded-2xl md:col-span-2 md:row-span-2 md:h-full" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Pulse className="h-32 rounded-2xl" key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. What You'll Learn section skeleton ── */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-4 text-center">
            <Pulse className="mx-auto h-8 w-44 rounded-full" />
            <Pulse className="mx-auto h-10 w-56 rounded-xl" />
            <Pulse className="mx-auto h-5 w-80 rounded" />
          </div>

          {/* Stepper skeleton */}
          <div className="mx-auto mb-12 hidden max-w-4xl items-center justify-center gap-4 lg:flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <div className="flex items-center gap-4" key={i}>
                <div className="flex flex-col items-center">
                  <Pulse className="h-10 w-10 rounded-full" />
                  <Pulse className="mt-2 h-3 w-20 rounded" />
                </div>
                {i < 4 && <Pulse className="mt-[-18px] h-0.5 w-16 xl:w-24" />}
              </div>
            ))}
          </div>

          {/* Curriculum block skeleton */}
          <div className="mx-auto max-w-6xl space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                className="overflow-hidden rounded-3xl border border-slate-100"
                key={i}
              >
                <Pulse className="h-20 rounded-none" />
                <div className="space-y-4 p-6 sm:p-8">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <Pulse className="h-40 rounded-2xl" key={j} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Tools & Technologies skeleton ── */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-4 text-center">
            <Pulse className="mx-auto h-8 w-32 rounded-full" />
            <Pulse className="mx-auto h-10 w-48 rounded-xl" />
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
            {Array.from({ length: 16 }).map((_, i) => (
              <Pulse className="h-16 rounded-xl" key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Career Opportunities skeleton ── */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-4 text-center">
            <Pulse className="mx-auto h-8 w-44 rounded-full" />
            <Pulse className="mx-auto h-10 w-60 rounded-xl" />
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Pulse className="h-28 rounded-2xl" key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Pricing skeleton ── */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <Pulse className="h-8 w-40 rounded-full" />
              <Pulse className="h-10 w-full rounded-xl" />
              <Pulse className="h-5 w-5/6 rounded" />
              <div className="space-y-3 pt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Pulse className="h-5 w-full rounded" key={i} />
                ))}
              </div>
            </div>
            <Pulse className="h-80 rounded-3xl" />
          </div>
        </div>
      </section>

      {/* ── 8. FAQ skeleton ── */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-4 text-center">
            <Pulse className="mx-auto h-8 w-24 rounded-full" />
            <Pulse className="mx-auto h-10 w-64 rounded-xl" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Pulse className="h-16 rounded-xl" key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer skeleton ── */}
      <footer className="bg-slate-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div className="space-y-4" key={i}>
                <div className="h-5 w-24 animate-pulse rounded bg-slate-700" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-800" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-800" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-slate-800" />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
