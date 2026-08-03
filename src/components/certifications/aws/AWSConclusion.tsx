export default function AWSConclusion() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Decorative background blob */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 right-0 h-[500px] w-[500px] rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="absolute -bottom-20 left-0 h-[400px] w-[400px] rounded-full bg-teal-100/40 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
        <span className="mb-4 inline-block font-semibold text-emerald-600 text-sm uppercase tracking-widest">
          Your Next Step
        </span>

        <h2 className="mb-6 font-extrabold text-4xl text-gray-900 leading-tight sm:text-5xl">
          Start Learning.{" "}
          <span className="bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            Start Building.
          </span>{" "}
          Start Certifying.
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-gray-600 text-lg leading-relaxed">
          Cloud Computing continues to reshape the modern technology landscape,
          and AWS remains one of the most widely adopted cloud platforms
          worldwide. AWS Certifications provide a structured pathway for
          validating cloud expertise and demonstrating practical knowledge.
        </p>

        <p className="mx-auto mb-10 max-w-2xl text-base text-gray-500 leading-relaxed">
          At Eduwise Solutions, we are committed to helping learners build
          practical cloud skills through industry-focused training, hands-on
          projects, expert mentorship, and certification-oriented preparation.
        </p>

        {/* Dual CTA */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-8 py-4 font-bold text-base text-white shadow-emerald-200 shadow-lg transition-colors duration-200 hover:bg-emerald-700 hover:shadow-emerald-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:w-auto"
            href="#enquiry-form-section"
          >
            Enquire Now
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M17 8l4 4m0 0l-4 4m4-4H3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </a>

          <a
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-gray-200 bg-white px-8 py-4 font-bold text-base text-gray-800 transition-colors duration-200 hover:border-emerald-300 hover:bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:w-auto"
            href="#certifications"
          >
            Browse Certifications
          </a>
        </div>
      </div>
    </section>
  );
}
