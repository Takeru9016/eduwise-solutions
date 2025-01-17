// components/FAQs.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const homepageFaqs = [
  {
    question: "What is Eduwise Solutions?",
    answer:
      "Eduwise Solutions is a platform that connects learners with the best educational opportunities in the ed-tech world. We offer counseling services and discounts on a variety of professional courses.",
  },
  {
    question: "Do you provide job placement guaranteed?",
    answer:
      "Yes, our in-house course has job-guaranteed courses include placement guaranteed. For other courses, we offer career counseling and networking opportunities.",
  },
  {
    question: "Can I earn while learning?",
    answer:
      "Absolutely! Our Online Masters and select professional programs are designed to let you balance work and studies.",
  },
  {
    question: "What types of courses are available?",
    answer:
      "We offer a wide range of programs, including Online Masters, Skill Development courses, Job Guaranteed courses, MBA programs, and more.",
  },
  {
    question: "Do you offer payment plans?",
    answer:
      "Yes, many courses offer flexible payment plans. We can guide you through available options during counseling.",
  },
];

export default function FAQs() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Main Content */}
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-primary-75" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-vietnam font-bold text-grey-15">
                Common Questions
              </h2>
            </div>
            <p className="text-grey-35 text-lg mb-8 leading-relaxed">
              Get quick answers to frequently asked questions about our programs
              and services. We&apos;re here to help you understand our offerings
              better.
            </p>
            <div className="bg-light-97 rounded-xl p-6 md:p-8">
              <h3 className="font-vietnam font-semibold text-grey-20 text-xl mb-4">
                Need More Help?
              </h3>
              <p className="text-grey-35 mb-6">
                Can&apos;t find what you&apos;re looking for? Our support team
                is here to assist you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  variant="default"
                  className="bg-primary-75 hover:bg-primary-70"
                >
                  <Link href="/faq" className="flex items-center gap-2">
                    View All FAQs
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div className="bg-light-97 rounded-2xl p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {homepageFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index + 1}`}
                  className="bg-white rounded-xl border border-light-90 hover:border-primary-75 transition-all duration-200"
                >
                  <AccordionTrigger className="px-6 text-left font-vietnam font-medium text-grey-20 text-base md:text-lg py-4 hover:text-primary-75 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-grey-35 text-base leading-relaxed px-6 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
