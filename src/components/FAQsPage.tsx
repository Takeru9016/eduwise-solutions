"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const categories = [
  {
    title: "Getting Started",
    icon: "🚀",
    questions: [
      {
        q: "What is Eduwise Solutions?",
        a: "Eduwise Solutions is a platform that connects learners with the best educational opportunities in the ed-tech world. We offer counseling services and discounts on a variety of professional courses, including Online Masters, Skill Development, MBA programs, and more.",
      },
      {
        q: "How does Eduwise Solutions work?",
        a: "We act as a bridge between learners and leading educational providers. By understanding your goals, we guide you to the right courses and ensure you get the best value through discounts and expert counseling.",
      },
      {
        q: "How do I enroll in a course?",
        a: "Simply browse our course catalog, select your preferred course, and our team will assist you with the enrollment process.",
      },
    ],
  },
  {
    title: "Courses & Programs",
    icon: "📚",
    questions: [
      {
        q: "What types of courses are available?",
        a: "We offer a wide range of programs, including Online Masters, Skill Development courses, Job Guaranteed courses, MBA programs, UPSC preparation, and more.",
      },
      {
        q: "Are the courses self-paced?",
        a: "It depends on the course provider. We offer both self-paced courses and those with fixed schedules. Our counselors can help you choose based on your preferences.",
      },
      {
        q: "Do you provide certifications?",
        a: "Yes, most courses offer certifications upon completion, which are recognized by universities or industry leaders.",
      },
    ],
  },
  {
    title: "Payments & Fees",
    icon: "💳",
    questions: [
      {
        q: "What are the course fees?",
        a: "Course fees vary depending on the program and provider. Contact our team for a detailed fee structure and exclusive discounts.",
      },
      {
        q: "Do you offer payment plans?",
        a: "Yes, many courses offer flexible payment plans. We can guide you through available options during counseling.",
      },
      {
        q: "What payment methods are accepted?",
        a: "We accept payments via credit/debit cards, net banking, UPI, and other secure online payment methods.",
      },
    ],
  },
  {
    title: "Support & Resources",
    icon: "🤝",
    questions: [
      {
        q: "Will I receive support during my course?",
        a: "Yes, most courses include access to instructors, mentorship, and peer support. Additional guidance is available from our team.",
      },
      {
        q: "How do I get technical support?",
        a: "For course-related issues, contact the course provider. For website or enrollment issues, our support team is always available.",
      },
    ],
  },
  {
    title: "Career & Placement",
    icon: "💼",
    questions: [
      {
        q: "Do you provide job placement?",
        a: "Yes, our in-house course has job-guaranteed courses include placement guaranteed. For other courses, we offer career counseling and networking opportunities.",
      },
      {
        q: "Can I earn while learning?",
        a: "Absolutely! Our Online Masters and select professional programs are designed to let you balance work and studies.",
      },
    ],
  },
];

interface Category {
  title: string;
  icon: string;
  questions: { q: string; a: string }[];
}

const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">{category.icon}</span>
          <h2 className="text-xl font-semibold text-grey-15">
            {category.title}
          </h2>
        </div>
        <Accordion type="single" collapsible className="space-y-2">
          {category.questions.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border-b border-light-90 last:border-0 px-0"
            >
              <AccordionTrigger className="hover:no-underline text-left py-4">
                <span className="text-lg font-medium text-grey-20">
                  {item.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-grey-35">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default function FAQsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (item) =>
          item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.a.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-light-97">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-70 to-primary-80 text-white py-16 md:py-24">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-vietnam font-bold mb-6">
              How can we help you?
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Find answers to all your questions about Eduwise Solutions
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Search your question..."
                className="w-full px-6 py-4 text-grey-20 bg-white rounded-lg pl-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-grey-40"
                size={20}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {filteredCategories.map((category, idx) => (
              <CategoryCard key={idx} category={category} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
