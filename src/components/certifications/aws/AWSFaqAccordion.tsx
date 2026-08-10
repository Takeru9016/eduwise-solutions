import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "./aws-data";

export default function AWSFaqAccordion() {
  return (
    <section className="bg-light-97 py-16 sm:py-20">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-bold text-grey-15 text-sm">
            Have Questions?
          </div>
          <h2 className="mb-4 font-black font-vietnam text-3xl text-grey-15 lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-grey-35 text-lg">
            Everything you need to know about AWS Certifications and exam
            vouchers.
          </p>
        </div>

        <Accordion className="space-y-3" collapsible type="single">
          {FAQS.map((faq, i) => (
            <AccordionItem
              className="overflow-hidden rounded-2xl border-2 border-grey-15 bg-white px-6 shadow-[3px_3px_0_0_var(--color-grey-15)]"
              key={faq.q}
              value={`faq-${i}`}
            >
              <AccordionTrigger className="py-5 hover:no-underline [&>svg]:text-grey-15">
                <div className="flex items-center gap-4 text-left">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90 font-bold text-grey-15 text-xs">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-bold text-grey-15 text-sm leading-snug sm:text-base">
                    {faq.q}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pl-11 text-grey-35 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
