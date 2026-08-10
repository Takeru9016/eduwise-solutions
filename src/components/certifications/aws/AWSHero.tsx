import { ArrowRight } from "lucide-react";
import AWSEnquiryForm from "@/components/certifications/AWSEnquiryForm";

const TRUST_SIGNALS = [
  "12 Certification Paths",
  "Globally Recognized",
  "Expert Guidance",
];

export default function AWSHero() {
  return (
    <section
      aria-label="AWS Certifications Hero"
      className="relative overflow-hidden bg-grey-15"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative z-10 grid items-center gap-10 py-20 sm:py-24 lg:grid-cols-[1fr_460px] lg:gap-14 lg:py-28">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-4 py-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="AWS Logo"
              className="h-4 brightness-0 invert"
              src="/logos/aws-wordmark.svg"
            />
            <span className="font-bold text-primary-90 text-xs uppercase tracking-widest">
              Official Partner
            </span>
          </div>

          <h1 className="mb-6 font-black font-vietnam text-4xl text-white leading-tight sm:text-5xl lg:text-6xl">
            AWS Certification{" "}
            <span className="text-primary-90">Exam Vouchers</span>
          </h1>

          <p className="mb-8 max-w-xl text-grey-70 text-lg leading-relaxed sm:text-xl">
            A complete guide to AWS Certifications and Cloud Career Growth.
            Validate your expertise with globally recognized cloud credentials,
            backed by Eduwise Solutions.
          </p>

          <div className="flex flex-wrap gap-3">
            {TRUST_SIGNALS.map((item) => (
              <span
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-4 py-2 font-bold text-primary-90 text-sm"
                key={item}
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-90" />
                {item}
              </span>
            ))}
          </div>

          <a
            className="mt-10 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 px-6 py-3 font-bold text-grey-15 transition-colors hover:bg-primary-90"
            href="#certifications"
          >
            Explore Certifications
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div id="enquiry-form-section">
          <AWSEnquiryForm />
        </div>
      </div>
    </section>
  );
}
