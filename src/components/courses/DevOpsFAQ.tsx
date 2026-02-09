import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

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
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <HelpCircle size={16} />
            FAQ
          </div>
          <h2 className="text-3xl lg:text-5xl font-vietnam font-bold text-grey-15 mb-6">
            {faqData.title}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqData.questions.map((item) => (
              <AccordionItem key={item._key} value={item._key}>
                <AccordionTrigger className="text-left font-vietnam font-semibold text-grey-15 hover:text-primary-75">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-grey-35 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
