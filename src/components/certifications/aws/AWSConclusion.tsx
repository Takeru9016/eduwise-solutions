export default function AWSConclusion() {
  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Decorative background blob */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-emerald-100/60 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-0 w-[400px] h-[400px] bg-teal-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-4xl text-center">
        <span className="inline-block text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-4">
          Your Next Step
        </span>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Start Learning.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
            Start Building.
          </span>{" "}
          Start Certifying.
        </h2>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Cloud Computing continues to reshape the modern technology landscape,
          and AWS remains one of the most widely adopted cloud platforms
          worldwide. AWS Certifications provide a structured pathway for
          validating cloud expertise and demonstrating practical knowledge.
        </p>

        <p className="text-base text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          At Eduwise Solutions, we are committed to helping learners build
          practical cloud skills through industry-focused training, hands-on
          projects, expert mentorship, and certification-oriented preparation.
        </p>

        {/* Dual CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#enquiry-form-section"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-2xl text-base transition-colors duration-200 shadow-lg shadow-emerald-200 hover:shadow-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 w-full sm:w-auto"
          >
            Enquire Now
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>

          <a
            href="#certifications"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-bold px-8 py-4 rounded-2xl text-base border-2 border-gray-200 hover:border-emerald-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 w-full sm:w-auto"
          >
            Browse Certifications
          </a>
        </div>
      </div>
    </section>
  );
}
