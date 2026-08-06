import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface FAQ {
  answer: string;
  question: string;
}

// Reusable components
const SectionBadge = ({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) => (
  <div className="inline-flex items-center gap-2 rounded-full bg-primary-99 px-4 py-2 font-medium text-primary-75 text-sm">
    <Icon className="text-primary-75" size={16} />
    {text}
  </div>
);

const FAQItem = ({ faq, index }: { faq: FAQ; index: number }) => (
  <AccordionItem
    className="rounded-xl border border-light-90 bg-light-97 transition-all duration-200 data-[state=open]:border-primary-95 data-[state=open]:bg-white"
    value={`item-${index + 1}`}
  >
    <AccordionTrigger className="group px-6 py-4 text-left font-medium font-vietnam text-grey-20 text-lg hover:text-primary-75 hover:no-underline [&[data-state=open]>div]:text-primary-75">
      <div className="transition-colors group-hover:text-primary-75">
        {faq.question}
      </div>
    </AccordionTrigger>
    <AccordionContent className="px-6 pb-6 text-grey-35 leading-relaxed">
      {faq.answer}
    </AccordionContent>
  </AccordionItem>
);

const SupportCard = () => (
  <div className="rounded-xl border border-primary-95 bg-linear-to-br from-primary-99 to-light-97 p-8">
    <div className="flex items-start gap-4">
      <div className="shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-95">
          <MessageCircle className="h-6 w-6 text-primary-75" />
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="font-semibold font-vietnam text-grey-20 text-xl">
          Need More Help?
        </h3>
        <p className="text-grey-35">
          Can&apos;t find what you&apos;re looking for? Our support team is here
          to assist you.
        </p>
        <div className="pt-2">
          <Button
            asChild
            className="bg-primary-75 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-70"
            variant="default"
          >
            <Link className="flex items-center gap-2" href="/faq">
              View All FAQs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default function FAQsSection() {
  const homepageFaqs: FAQ[] = [
    {
      answer:
        "Eduwise Solutions is a platform that connects learners with the best educational opportunities in the ed-tech world. We offer counseling services and discounts on a variety of professional courses.",
      question: "What is Eduwise Solutions?",
    },
    {
      answer:
        "Yes, our in-house course has job-guaranteed courses include placement guaranteed. For other courses, we offer career counseling and networking opportunities.",
      question: "Do you provide job placement guaranteed?",
    },
    {
      answer:
        "Absolutely! Our professional programs are designed to let you balance work and studies.",
      question: "Can I earn while learning?",
    },
    {
      answer:
        "We offer a wide range of programs, including Skill Development courses, Job Guaranteed courses, and more.",
      question: "What types of courses are available?",
    },
    {
      answer:
        "Yes, many courses offer flexible payment plans. We can guide you through available options during counseling.",
      question: "Do you offer payment plans?",
    },
  ];

  return (
    <section className="relative bg-linear-to-b from-white to-light-97 py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-primary-95 opacity-20 blur-3xl" />
        <div className="absolute right-20 bottom-20 h-96 w-96 rounded-full bg-primary-97 opacity-20 blur-3xl" />
      </div>

      <div className="container relative mx-auto">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left Column - Main Content */}
          <div className="lg:sticky lg:top-24">
            <div className="space-y-6">
              {/* Badge */}
              <SectionBadge icon={Sparkles} text="Get Quick Answers" />

              {/* Main Heading */}
              <h2 className="font-bold font-vietnam text-3xl text-grey-15 md:text-4xl lg:text-5xl">
                Common Questions
              </h2>

              {/* Description */}
              <p className="text-grey-35 text-lg leading-relaxed">
                Get quick answers to frequently asked questions about our
                programs and services. We&apos;re here to help you understand
                our offerings better.
              </p>

              {/* Help Card */}
              <div className="mt-8 grid gap-6">
                <SupportCard />
              </div>
            </div>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div className="rounded-2xl border border-light-90 bg-white p-8 shadow-lg">
            <Accordion className="w-full space-y-4" collapsible type="single">
              {homepageFaqs.map((faq, index) => (
                <FAQItem faq={faq} index={index} key={faq.question} />
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
