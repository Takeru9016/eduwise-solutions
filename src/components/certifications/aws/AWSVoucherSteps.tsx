import { VOUCHER_STEPS } from "./aws-data";

export default function AWSVoucherSteps() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* ── Text side ── */}
          <div>
            <span className="mb-3 inline-block font-semibold text-emerald-600 text-sm uppercase tracking-widest">
              Get Started
            </span>
            <h2 className="mb-4 font-extrabold text-3xl text-gray-900 sm:text-4xl">
              How to Get an AWS Exam Voucher?
            </h2>
            <p className="mb-8 text-gray-500 leading-relaxed">
              AWS Certification Exam Vouchers help learners take the next step
              toward earning globally recognized AWS Certifications. At Eduwise
              Solutions, we guide you through every step of the process.
            </p>

            <div className="space-y-5">
              {VOUCHER_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div className="group flex gap-4" key={i}>
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 transition-colors duration-200 group-hover:bg-emerald-600">
                        <Icon
                          aria-hidden="true"
                          className="h-5 w-5 text-emerald-700 transition-colors group-hover:text-white"
                        />
                      </div>
                      {i < VOUCHER_STEPS.length - 1 && (
                        <div className="my-2 w-px flex-1 bg-emerald-100" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="mb-1 font-bold text-gray-900">
                        Step {i + 1}: {step.label}
                      </p>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Visual side ── */}
          <div className="hidden justify-center lg:flex">
            <div className="relative w-72">
              {/* Background decorative card */}
              <div className="absolute inset-0 rotate-3 scale-105 rounded-3xl bg-gradient-to-br from-emerald-400/20 to-teal-600/10" />
              <div className="relative rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white shadow-2xl">
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="AWS"
                      className="h-8 brightness-0 invert"
                      src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
                    />
                  </div>
                  <h3 className="font-extrabold text-lg">
                    Your Voucher Journey
                  </h3>
                  <p className="mt-1 text-emerald-100 text-sm">
                    5 simple steps to certification
                  </p>
                </div>

                <div className="space-y-3">
                  {VOUCHER_STEPS.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div
                        className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3"
                        key={i}
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/20">
                          <Icon
                            aria-hidden="true"
                            className="h-4 w-4 text-white"
                          />
                        </div>
                        <span className="font-medium text-sm text-white/90">
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <a
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-bold text-emerald-700 text-sm transition-colors hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-white"
                  href="#enquiry-form-section"
                >
                  Start Your Journey
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
