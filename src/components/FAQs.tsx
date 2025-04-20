import Link from "next/link";
import { ArrowRight, Sparkles, MessageCircle } from "lucide-react";

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

// Types
interface FAQ {
  question: string;
  answer: string;
}

// Reusable components
const SectionBadge = ({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) => (
  <div className="inline-flex items-center gap-2 bg-primary-99 text-primary-75 px-4 py-2 rounded-full text-sm font-medium">
    <Icon size={16} className="text-primary-75" />
    {text}
  </div>
);

// const FAQItem = ({ faq, index }: { faq: FAQ; index: number }) => (
//   <AccordionItem
//     value={`item-${index + 1}`}
//     className="bg-light-97 rounded-xl border border-light-90 data-[state=open]:bg-white data-[state=open]:border-primary-95 transition-all duration-200"
//   >
//     <AccordionTrigger className="px-6 text-left font-vietnam font-medium text-grey-20 text-lg py-4 hover:text-primary-75 [&[data-state=open]>div]:text-primary-75 hover:no-underline group">
//       <div className="group-hover:text-primary-75 transition-colors">
//         {faq.question}
//       </div>
//     </AccordionTrigger>
//     <AccordionContent className="text-grey-35 leading-relaxed px-6 pb-6">
//       {faq.answer}
//     </AccordionContent>
//   </AccordionItem>
// );

const SupportCard = () => (
  <div className="bg-gradient-to-br from-primary-99 to-light-97 rounded-xl p-8 border border-primary-95">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-primary-95 flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-primary-75" />
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="font-vietnam font-semibold text-grey-20 text-xl">
          Need More Help?
        </h3>
        <p className="text-grey-35">
          Can&apos;t find what you&apos;re looking for? Our support team is here
          to assist you.
        </p>
        <div className="pt-2">
          <Button
            asChild
            variant="default"
            className="bg-primary-75 hover:bg-primary-70 transition-all duration-200 hover:translate-y-[-2px]"
          >
            <Link href="/faq" className="flex items-center gap-2">
              View All FAQs
              <ArrowRight className="w-4 h-4" />
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

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-white to-light-97">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-95 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-97 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Main Content */}
          <div className="lg:sticky lg:top-24">
            <div className="space-y-6">
              {/* Badge */}
              <SectionBadge icon={Sparkles} text="Get Quick Answers" />

              {/* Main Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-vietnam font-bold text-grey-15">
                Common Questions
              </h2>

              {/* Description */}
              <p className="text-grey-35 text-lg leading-relaxed">
                Get quick answers to frequently asked questions about our
                programs and services. We&apos;re here to help you understand
                our offerings better.
              </p>

              {/* Help Card */}
              {/* <div className="grid gap-6 mt-8">
                <SupportCard />
              </div> */}
            </div>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-light-90">
          <SupportCard />
            {/* <Accordion type="single" collapsible className="w-full space-y-4">
              {homepageFaqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} index={index} />
              ))}
            </Accordion> */}
          </div>
        </div>
      </div>
    </section>
  );
}
