import { ArrowRight, Tag } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import type { AwsPageContent } from "@/types/pages";

export default function AWSVoucherSteps({
  content,
}: {
  content: NonNullable<AwsPageContent["voucher"]>;
}) {
  const steps = content.steps ?? [];
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-bold text-grey-15 text-sm">
              {content.eyebrow}
            </div>
            <h2 className="mb-4 font-black font-vietnam text-3xl text-grey-15 lg:text-5xl">
              {content.heading}
            </h2>
            <p className="mb-10 max-w-2xl text-grey-35 text-lg leading-relaxed">
              {content.subheading}
            </p>

            <div className="space-y-2">
              {steps.map((step, i) => {
                const Icon = getIcon(step.icon);
                return (
                  <div className="flex gap-4" key={step.label}>
                    <div className="flex flex-col items-center">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90">
                        <Icon
                          aria-hidden="true"
                          className="h-5 w-5 text-grey-15"
                        />
                      </div>
                      {i < steps.length - 1 && (
                        <div className="mt-2 w-0.5 flex-1 bg-grey-15/15" />
                      )}
                    </div>
                    <div className="pb-8">
                      <p className="mb-1 font-bold text-grey-15">
                        Step {i + 1}: {step.label}
                      </p>
                      <p className="text-grey-35 text-sm leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border-2 border-grey-15 bg-grey-15 p-8 text-white shadow-[6px_6px_0_0_var(--color-grey-15)]">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-3 py-1.5 font-bold text-primary-90 text-xs uppercase tracking-widest">
                <Tag className="h-3.5 w-3.5" />
                {content.pricingBadge}
              </div>
              <h3 className="mb-3 font-black font-vietnam text-2xl leading-snug">
                {content.pricingTitle}
              </h3>
              <p className="mb-8 text-grey-70 text-sm leading-relaxed">
                {content.pricingBody}
              </p>
              <a
                className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 py-3 font-bold text-grey-15 text-sm transition-colors hover:bg-primary-90"
                href="#enquiry-form-section"
              >
                {content.pricingCta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
