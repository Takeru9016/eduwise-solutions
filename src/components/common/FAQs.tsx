"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  MessageCircle,
  Minus,
  Plus,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FAQ {
  answer: string;
  question: string;
}

const HOMEPAGE_FAQS: FAQ[] = [
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

export default function FAQsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemRefs.current.filter(Boolean);
    if (!(section && items.length)) {
      return;
    }

    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: 20 },
      {
        duration: 0.5,
        ease: "power2.out",
        opacity: 1,
        scrollTrigger: { start: "top 80%", trigger: section },
        stagger: 0.08,
        y: 0,
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="bg-white py-16 md:py-24" ref={sectionRef}>
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-24">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-semibold text-grey-15 text-sm">
              <Sparkles className="h-4 w-4" />
              Get Quick Answers
            </div>
            <h2 className="mb-4 font-black font-vietnam text-3xl text-grey-15 tracking-tight md:text-4xl">
              Common Questions
            </h2>
            <p className="mb-8 text-grey-40 text-lg leading-relaxed">
              Get quick answers to frequently asked questions about our programs
              and services.
            </p>

            <div className="rounded-3xl border-2 border-grey-15 bg-primary-75 p-8 shadow-[4px_4px_0_0_var(--color-grey-15)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-grey-15 bg-white">
                <MessageCircle className="h-6 w-6 text-grey-15" />
              </div>
              <h3 className="mb-2 font-bold font-vietnam text-grey-15 text-xl">
                Still Have Questions?
              </h3>
              <p className="mb-6 text-grey-20 leading-relaxed">
                Can&apos;t find what you&apos;re looking for? Our team is here
                to help.
              </p>
              <Link
                className="group inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-6 py-3 font-bold text-grey-15 transition-transform hover:-translate-y-0.5"
                href="/contact"
              >
                Talk to Our Team
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>

          <AccordionPrimitive.Root
            className="flex flex-col gap-4"
            collapsible
            type="single"
          >
            {HOMEPAGE_FAQS.map((faq, index) => (
              <AccordionPrimitive.Item
                className="overflow-hidden rounded-3xl border-2 border-grey-15 bg-white shadow-[4px_4px_0_0_var(--color-grey-15)] transition-colors duration-300 data-[state=open]:bg-grey-15"
                key={faq.question}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                value={`item-${index + 1}`}
              >
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger className="group flex w-full items-center gap-4 p-6 text-left sm:gap-5">
                    <span className="font-black font-vietnam text-2xl text-grey-60 tabular-nums transition-colors group-data-[state=open]:text-white sm:text-3xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-bold font-vietnam text-base text-grey-15 transition-colors group-data-[state=open]:text-white sm:text-lg">
                      {faq.question}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-white">
                      <Plus className="h-4 w-4 text-grey-15 group-data-[state=open]:hidden" />
                      <Minus className="hidden h-4 w-4 text-grey-15 group-data-[state=open]:block" />
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="px-6 pb-6 pl-17 text-grey-70 leading-relaxed sm:pl-20">
                    {faq.answer}
                  </p>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </div>
      </div>
    </section>
  );
}
