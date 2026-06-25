import AWSEnquiryForm from "@/components/certifications/AWSEnquiryForm";

export default function AWSHero() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(16,185,129,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 60%, rgba(6,182,212,0.12) 0%, transparent 55%), linear-gradient(135deg, #0a1628 0%, #0d2137 35%, #0a1628 65%, #071320 100%)",
      }}
      aria-label="AWS Certifications Hero"
    >
      {/* Subtle dot-grid texture overlay — circuit-board atmosphere */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Glow orb top-left */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      {/* Glow orb bottom-right */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 max-w-7xl pt-28 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ── Left: Headline & copy ── */}
          <div className="flex-1 text-white">
            {/* AWS Partnership Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
                alt="AWS Logo"
                className="h-4 brightness-0 invert"
              />
              <span className="text-sm font-semibold text-emerald-300 tracking-wide uppercase">
                Official Partner
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              AWS Certification{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Exam Vouchers
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-xl">
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
                  key={item}
                  className="flex items-center gap-2 text-sm text-emerald-300 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  {item}
                </div>
              ))}
            </div>

            {/* Scroll CTA */}
            <div className="mt-10 hidden lg:block">
              <a
                href="#certifications"
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
              >
                <span>Explore Certifications</span>
                <svg
                  className="w-4 h-4 animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Right: Enquiry Form ── */}
          <div
            id="enquiry-form-section"
            className="w-full lg:w-auto lg:min-w-[380px] xl:min-w-[420px]"
          >
            {/* Glassmorphism card wrapper */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400/30 to-teal-600/20 rounded-2xl blur-md" />
              <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
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
