"use client";

/**
 * Skeleton loading state for /courses/[slug].
 * Renders animated placeholders for every major section of the course page,
 * giving users instant visual feedback while Next.js streams the real content.
 */

function Pulse({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-200 rounded ${className}`} />;
}

export default function CourseLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Navbar skeleton ── */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Pulse className="w-32 h-8 rounded-lg" />
          <div className="hidden md:flex items-center gap-6">
            <Pulse className="w-16 h-4" />
            <Pulse className="w-16 h-4" />
            <Pulse className="w-16 h-4" />
            <Pulse className="w-16 h-4" />
          </div>
          <Pulse className="w-28 h-10 rounded-full" />
        </div>
      </header>

      {/* ── 1. Hero section skeleton ── */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text side */}
            <div className="text-center lg:text-left order-2 lg:order-1 space-y-6">
              <Pulse className="w-40 h-8 rounded-full mx-auto lg:mx-0" />
              <Pulse className="w-full h-12 rounded-xl" />
              <Pulse className="w-3/4 h-10 rounded-xl" />
              <Pulse className="w-full h-6 rounded" />
              <Pulse className="w-5/6 h-6 rounded" />
              <div className="flex gap-4 justify-center lg:justify-start pt-4">
                <Pulse className="w-36 h-12 rounded-full" />
                <Pulse className="w-36 h-12 rounded-full" />
              </div>
            </div>
            {/* Image side */}
            <div className="order-1 lg:order-2 flex justify-center">
              <Pulse className="w-[340px] h-[340px] lg:w-[460px] lg:h-[460px] rounded-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Stats bar skeleton ── */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-6 text-center space-y-3"
              >
                <Pulse className="w-10 h-10 rounded-full mx-auto" />
                <Pulse className="w-16 h-8 mx-auto rounded" />
                <Pulse className="w-24 h-4 mx-auto rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Program Highlights (Bento Grid) skeleton ── */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <Pulse className="w-40 h-8 rounded-full mx-auto" />
            <Pulse className="w-64 h-10 mx-auto rounded-xl" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
            <Pulse className="col-span-1 md:col-span-2 md:row-span-2 h-64 md:h-full rounded-2xl" />
            {Array.from({ length: 4 }).map((_, i) => (
              <Pulse key={i} className="h-32 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. What You'll Learn section skeleton ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <Pulse className="w-44 h-8 rounded-full mx-auto" />
            <Pulse className="w-56 h-10 mx-auto rounded-xl" />
            <Pulse className="w-80 h-5 mx-auto rounded" />
          </div>

          {/* Stepper skeleton */}
          <div className="hidden lg:flex items-center justify-center gap-4 mb-12 max-w-4xl mx-auto">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <Pulse className="w-10 h-10 rounded-full" />
                  <Pulse className="w-20 h-3 mt-2 rounded" />
                </div>
                {i < 4 && <Pulse className="w-16 xl:w-24 h-0.5 mt-[-18px]" />}
              </div>
            ))}
          </div>

          {/* Curriculum block skeleton */}
          <div className="max-w-6xl mx-auto space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl overflow-hidden border border-slate-100"
              >
                <Pulse className="h-20 rounded-none" />
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <Pulse key={j} className="h-40 rounded-2xl" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Tools & Technologies skeleton ── */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <Pulse className="w-32 h-8 rounded-full mx-auto" />
            <Pulse className="w-48 h-10 mx-auto rounded-xl" />
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 max-w-4xl mx-auto">
            {Array.from({ length: 16 }).map((_, i) => (
              <Pulse key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Career Opportunities skeleton ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <Pulse className="w-44 h-8 rounded-full mx-auto" />
            <Pulse className="w-60 h-10 mx-auto rounded-xl" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <Pulse key={i} className="h-28 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Pricing skeleton ── */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-6">
              <Pulse className="w-40 h-8 rounded-full" />
              <Pulse className="w-full h-10 rounded-xl" />
              <Pulse className="w-5/6 h-5 rounded" />
              <div className="space-y-3 pt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Pulse key={i} className="w-full h-5 rounded" />
                ))}
              </div>
            </div>
            <Pulse className="h-80 rounded-3xl" />
          </div>
        </div>
      </section>

      {/* ── 8. FAQ skeleton ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12 space-y-4">
            <Pulse className="w-24 h-8 rounded-full mx-auto" />
            <Pulse className="w-64 h-10 mx-auto rounded-xl" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Pulse key={i} className="h-16 rounded-xl" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer skeleton ── */}
      <footer className="bg-slate-900 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="animate-pulse bg-slate-700 w-24 h-5 rounded" />
                <div className="animate-pulse bg-slate-800 w-full h-4 rounded" />
                <div className="animate-pulse bg-slate-800 w-3/4 h-4 rounded" />
                <div className="animate-pulse bg-slate-800 w-5/6 h-4 rounded" />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
