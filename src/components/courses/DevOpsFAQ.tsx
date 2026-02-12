import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Plus } from "lucide-react";

interface DevOpsFAQProps {
  faqData: {
    _id: string;
    title: string;
    questions: {
      _key: string;
      question: string;
      answer: string;
    }[];
  } | null;
}

export default function DevOpsFAQ({ faqData }: DevOpsFAQProps) {
  if (!faqData || !faqData.questions || faqData.questions.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple centered header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-vietnam font-bold text-grey-15 mb-4">
            {faqData.title}
          </h2>
          <p className="text-grey-40 text-lg max-w-2xl mx-auto">
            Everything you need to know about our DevOps course
          </p>
        </div>

        {/* Two-column FAQ layout on desktop */}
        <div className="max-w-6xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <div className="grid md:grid-cols-2 gap-6">
              {faqData.questions.map((item, index) => (
                <AccordionItem
                  key={item._key}
                  value={item._key}
                  className="border-0 bg-grey-99 rounded-2xl p-6 hover:bg-primary-99 transition-all duration-300 hover:shadow-lg"
                >
                  <AccordionTrigger className="text-left font-vietnam font-bold text-lg text-grey-15 hover:text-primary-75 transition-colors hover:no-underline [&[data-state=open]]:text-primary-75 pb-4">
                    <div className="flex items-start gap-3 w-full pr-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-75 text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="flex-1 pt-0.5">{item.question}</span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pt-2 pl-11">
                    <p className="text-grey-35 leading-relaxed">
                      {item.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </div>
          </Accordion>
        </div>

        {/* Simple bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-grey-30 text-lg mb-6">
            Still have questions? We're here to help!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary-75 text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-60 transition-all duration-300 hover:shadow-xl"
          >
            Contact Our Team
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
    </section>
  );
}
