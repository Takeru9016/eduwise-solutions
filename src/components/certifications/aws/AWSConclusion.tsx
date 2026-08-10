import { ArrowRight } from "lucide-react";

export default function AWSConclusion() {
  return (
    <section className="bg-light-97 py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl rounded-3xl border-2 border-grey-15 bg-grey-15 p-8 text-center text-white shadow-[6px_6px_0_0_var(--color-grey-15)] sm:p-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-4 py-2 font-bold text-primary-90 text-xs uppercase tracking-widest">
            Your Next Step
          </div>

          <h2 className="mb-6 font-black font-vietnam text-3xl leading-tight sm:text-5xl">
            Start Learning. Start Building.{" "}
            <span className="text-primary-90">Start Certifying.</span>
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-grey-70 leading-relaxed">
            At Eduwise Solutions, we help learners build practical cloud skills
            through industry-focused training, hands-on projects, expert
            mentorship, and certification-oriented preparation.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 px-8 py-4 font-bold text-grey-15 transition-colors hover:bg-primary-90 sm:w-auto"
              href="#enquiry-form-section"
            >
              Enquire Now
              <ArrowRight className="h-5 w-5" />
            </a>

            <a
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-transparent px-8 py-4 font-bold text-white transition-colors hover:bg-white/10 sm:w-auto"
              href="#certifications"
            >
              Browse Certifications
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
