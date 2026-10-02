"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  MessageCircle,
  MessageCircleQuestion,
  Minus,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/utils";
import type { HomePageContent } from "@/types/pages";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FAQsSection({
  content,
}: {
  content: NonNullable<HomePageContent["faq"]>;
}) {
  const faqs = content.items ?? [];
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemRefs.current.filter(Boolean);
    if (!(section && items.length) || prefersReducedMotion()) {
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
              <MessageCircleQuestion className="h-4 w-4" />
              {content.eyebrow}
            </div>
            <h2 className="mb-4 font-black font-vietnam text-3xl text-grey-15 tracking-tight md:text-4xl">
              {content.heading}
            </h2>
            <p className="mb-8 text-grey-40 text-lg leading-relaxed">
              {content.subheading}
            </p>

            <div className="rounded-3xl border-2 border-grey-15 bg-primary-75 p-8 shadow-[4px_4px_0_0_var(--color-grey-15)]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-grey-15 bg-white">
                <MessageCircle className="h-6 w-6 text-grey-15" />
              </div>
              <h3 className="mb-2 font-bold font-vietnam text-grey-15 text-xl">
                {content.helpTitle}
              </h3>
              <p className="mb-6 text-grey-20 leading-relaxed">
                {content.helpBody}
              </p>
              <Link
                className="group inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-6 py-3 font-bold text-grey-15 transition-transform hover:-translate-y-0.5 active:scale-[0.97]"
                href="/contact"
              >
                {content.helpCta}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>

          <AccordionPrimitive.Root
            className="flex flex-col gap-4"
            collapsible
            type="single"
          >
            {faqs.map((faq, index) => (
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
                <AccordionPrimitive.Content className="grid transition-[grid-template-rows] duration-200 ease-out data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]">
                  <p className="min-h-0 overflow-hidden px-6 pb-6 pl-17 text-grey-70 leading-relaxed sm:pl-20">
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
