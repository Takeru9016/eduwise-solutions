import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can I enroll in multiple courses at once?",
    answer:
      "Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.",
  },
  {
    question: "What kind of support can I expect from instructors?",
    answer:
      "Our instructors provide comprehensive support through live sessions, doubt clearing, and personalized feedback throughout your learning journey.",
  },
  {
    question:
      "Are the courses self-paced or do they have specific start and end dates?",
    answer:
      "We offer both self-paced and scheduled courses. Most of our programs provide flexibility to learn at your own pace while maintaining structured milestones.",
  },
  {
    question: "Are there any prerequisites for the courses?",
    answer:
      "Prerequisites vary by course. Each course page clearly lists any required prior knowledge or experience. Many of our beginner courses have no prerequisites.",
  },
  {
    question: "Can I download the course materials for offline access?",
    answer:
      "Yes, most course materials are available for download, allowing you to study offline at your convenience.",
  },
];

export default function FAQs() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-vietnam font-bold text-grey-15 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-grey-40 text-sm md:text-base">
              Still you have any questions? Contact our Team via{" "}
              <span className="text-primary-50 font-black">
                admin@eduwise.solutions
              </span>
            </p>
          </div>

          <div className="bg-light-97 rounded-xl p-4 md:p-6 lg:p-8 mb-8">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index + 1}`}
                  className="bg-white rounded-lg border border-light-90 px-4 md:px-6"
                >
                  <AccordionTrigger className="text-left font-vietnam font-medium text-grey-20 text-sm md:text-base py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-grey-35 text-sm md:text-base pb-4">
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
