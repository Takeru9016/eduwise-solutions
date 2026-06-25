import { VOUCHER_STEPS } from "./aws-data";

export default function AWSVoucherSteps() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── Text side ── */}
          <div>
            <span className="inline-block text-emerald-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              How to Get an AWS Exam Voucher?
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              AWS Certification Exam Vouchers help learners take the next step
              toward earning globally recognized AWS Certifications. At Eduwise
              Solutions, we guide you through every step of the process.
            </p>

            <div className="space-y-5">
              {VOUCHER_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 group-hover:bg-emerald-600 flex items-center justify-center shrink-0 transition-colors duration-200">
                        <Icon
                          className="w-5 h-5 text-emerald-700 group-hover:text-white transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                      {i < VOUCHER_STEPS.length - 1 && (
                        <div className="w-px flex-1 bg-emerald-100 my-2" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="font-bold text-gray-900 mb-1">
                        Step {i + 1}: {step.label}
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Visual side ── */}
          <div className="hidden lg:flex justify-center">
            <div className="relative w-72">
              {/* Background decorative card */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-600/10 rounded-3xl rotate-3 scale-105" />
              <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-2xl">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
                      alt="AWS"
                      className="h-8 brightness-0 invert"
                    />
                  </div>
                  <h3 className="font-extrabold text-lg">
                    Your Voucher Journey
                  </h3>
                  <p className="text-emerald-100 text-sm mt-1">
                    5 simple steps to certification
                  </p>
                </div>

                <div className="space-y-3">
                  {VOUCHER_STEPS.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3"
                      >
                        <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                          <Icon
                            className="w-4 h-4 text-white"
                            aria-hidden="true"
                          />
                        </div>
                        <span className="text-sm font-medium text-white/90">
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <a
                  href="#enquiry-form-section"
                  className="mt-6 flex items-center justify-center gap-2 w-full bg-white text-emerald-700 font-bold py-3 rounded-xl text-sm hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Start Your Journey
                  <svg
                    className="w-4 h-4"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
