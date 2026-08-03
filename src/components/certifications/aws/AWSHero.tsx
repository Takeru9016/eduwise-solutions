import AWSEnquiryForm from "@/components/certifications/AWSEnquiryForm";

export default function AWSHero() {
  return (
    <section
      aria-label="AWS Certifications Hero"
      className="relative flex min-h-[90vh] items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(16,185,129,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 60%, rgba(6,182,212,0.12) 0%, transparent 55%), linear-gradient(135deg, #0a1628 0%, #0d2137 35%, #0a1628 65%, #071320 100%)",
      }}
    >
      {/* Subtle dot-grid texture overlay — circuit-board atmosphere */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Glow orb top-left */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
      {/* Glow orb bottom-right */}
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-emerald-700/20 blur-3xl" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-20">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* ── Left: Headline & copy ── */}
          <div className="flex-1 text-white">
            {/* AWS Partnership Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="AWS Logo"
                className="h-4 brightness-0 invert"
                src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
              />
              <span className="font-semibold text-emerald-300 text-sm uppercase tracking-wide">
                Official Partner
              </span>
            </div>

            <h1 className="mb-6 font-extrabold text-4xl leading-tight sm:text-5xl lg:text-6xl">
              AWS Certification{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Exam Vouchers
              </span>
            </h1>

            <p className="mb-8 max-w-xl text-lg text-slate-300 leading-relaxed sm:text-xl">
              A complete guide to AWS Certifications and Cloud Career Growth.
              Validate your expertise with globally recognized cloud
              credentials, backed by Eduwise Solutions.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-4">
              {[
                "12 Certifications Available",
                "Globally Recognized",
                "Expert Guidance",
              ].map((item) => (
                <div
                  className="flex items-center gap-2 font-medium text-emerald-300 text-sm"
                  key={item}
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {item}
                </div>
              ))}
            </div>

            {/* Scroll CTA */}
            <div className="mt-10 hidden lg:block">
              <a
                className="inline-flex items-center gap-2 text-slate-400 text-sm transition-colors hover:text-emerald-300"
                href="#certifications"
              >
                <span>Explore Certifications</span>
                <svg
                  className="h-4 w-4 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Right: Enquiry Form ── */}
          <div
            className="w-full lg:w-auto lg:min-w-[380px] xl:min-w-[420px]"
            id="enquiry-form-section"
          >
            {/* Glassmorphism card wrapper */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-emerald-400/30 to-teal-600/20 blur-md" />
              <div className="relative overflow-hidden rounded-2xl bg-white/95 shadow-2xl backdrop-blur-xl">
                <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-teal-500" />
                <div className="p-1">
                  <AWSEnquiryForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
