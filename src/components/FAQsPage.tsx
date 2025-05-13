"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Types
interface Question {
  q: string;
  a: string;
}

interface Category {
  title: string;
  icon: string;
  questions: Question[];
}

// Reusable components
const CategoryCard = ({ category }: { category: Category }) => (
  <Card className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{category.icon}</span>
        <h2 className="text-xl font-semibold text-grey-15">{category.title}</h2>
      </div>
      <Accordion type="single" collapsible className="space-y-2">
        {category.questions.map((item, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="border-b border-light-90 last:border-0 px-0"
          >
            <AccordionTrigger className="hover:no-underline text-left py-4">
              <span className="text-lg font-medium text-grey-20">{item.q}</span>
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

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="relative max-w-2xl mx-auto">
    <Input
      type="text"
      placeholder="Search your question..."
      className="w-full px-6 py-4 text-grey-20 bg-white rounded-lg pl-12"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <Search
      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-grey-40"
      size={20}
    />
  </div>
);

export default function FAQsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // FAQ categories data
  const categories = useMemo<Category[]>(
    () => [
      {
        title: "About Eduwise Solutions",
        icon: "🚀",
        questions: [
          {
            q: "What is Eduwise Solutions?",
            a: "Eduwise Solutions is a career guidance and student placement platform that helps learners choose the right skill-based programs, job-guaranteed training, and professional courses. We specialize in supporting final-year students and fresh graduates in securing entry-level jobs across top companies.",
          },
          {
            q: "What makes Eduwise Solutions different from others?",
            a: "We go beyond selling courses. We offer: personalized counseling, handpicked course guidance, exclusive course discounts, and job placement support with real MNC connections.",
          },
          {
            q: "Where is Eduwise Solutions based, and do you support students from across India?",
            a: "Eduwise Solutions is an India-based company. We serve students and job seekers from all over the country, regardless of your city or state.",
          },
        ],
      },
      {
        title: "Job-Guaranteed Program",
        icon: "🏆",
        questions: [
          {
            q: "What is the 15-Day 100% Job-Guaranteed Program?",
            a: "Our 15-day flagship training program is designed to make you job-ready. It includes training in resume building, business communication, LinkedIn optimization, Excel, interview preparation, hiring techniques, and job-specific skills.",
          },
          {
            q: "What kind of job roles can I expect after completing the program?",
            a: "Upon successful completion, learners can apply for roles such as: Business Development Executive, Customer Support Analyst, HR Executive, Operations Associate, Finance Executive, Data Associate, and Process Specialist.",
          },
          {
            q: "Do you really guarantee a job?",
            a: "Yes. If you complete the 15-day program and meet the eligibility criteria, we guarantee interview opportunities and offer full placement support till 4 months or else your money refund.",
          },
          {
            q: "Who is eligible for the Job-Guaranteed Program?",
            a: "This program is ideal for: final-year students, fresh graduates, job seekers seeking a career restart, and individuals looking to switch into entry-level corporate roles.",
          },
          {
            q: "Can I apply even if I have no prior experience or technical background?",
            a: "Absolutely. Our programs are designed for beginners and are suitable for anyone looking to build a strong foundation for an entry-level job.",
          },
        ],
      },
      {
        title: "Program Structure & Delivery",
        icon: "📚",
        questions: [
          {
            q: "How are the classes conducted?",
            a: "All sessions are conducted live by industry experts. You will also have access to recorded sessions, hands-on live projects, and weekly mock interviews for consistent progress.",
          },
          {
            q: "Can I continue my current job or studies while doing this course?",
            a: "Yes! Our sessions are flexible and come with recordings. You can learn at your own pace and balance your current work or academic schedule.",
          },
          {
            q: "What is the main mode of communication during the program?",
            a: "We communicate through: WhatsApp, Email, Video call sessions, and regular follow-up calls by our counselor team.",
          },
        ],
      },
      {
        title: "Payments & Fees",
        icon: "💳",
        questions: [
          {
            q: "How much does the program cost?",
            a: "We offer two simple payment options: ₹5,000 upfront & ₹20,000 Pay After Placement (zero risk if you're not placed).",
          },
          {
            q: "Is your counseling really free?",
            a: "Yes. All career counseling sessions and guidance are completely free of charge. You only pay if you choose to enroll in a program.",
          },
          {
            q: "What if I don't get placed even after completing the course?",
            a: "If you actively participate in the program, follow all guidelines, and still don't get placed within 6 months, we provide a 100% refund as per our refund policy outlined in the Terms & Conditions.",
          },
        ],
      },
      {
        title: "Support & Career Services",
        icon: "🤝",
        questions: [
          {
            q: "Do you provide one-on-one counseling?",
            a: "Yes! Our career counselors offer personalized guidance to help you identify the right course or training program aligned with your goals.",
          },
          {
            q: "Do you help with resume and LinkedIn optimization?",
            a: "Yes, we provide: ATS-optimized resume building, keyword enhancement for visibility, LinkedIn profile makeover, and portfolio & cover letter support.",
          },
          {
            q: "What kind of support is offered during and after the program?",
            a: "We provide: live instructor-led sessions, real-time projects, one-on-one doubt-clearing sessions, interview prep and mock rounds, and dedicated placement support.",
          },
          {
            q: "How long will it take to get placed, and how long does placement support last?",
            a: "Most learners are placed within 30 to 60 days of completing the program. Placement assistance continues for up to 6 months. If you're not placed within 6 months, you're eligible for a 100% refund, subject to our Terms & Conditions.",
          },
        ],
      },
      {
        title: "Industries & Placement",
        icon: "💼",
        questions: [
          {
            q: "What industries do your hiring partners come from?",
            a: "Our hiring partners span multiple industries, including: Information Technology (IT), E-commerce, Customer Service, Finance, Business Development, Human Resources & Operations.",
          },
          {
            q: "How do I enroll in a program?",
            a: "Simply visit www.Eduwise Solutions, fill out the contact form, or reach out via WhatsApp. Our team will guide you through the next steps.",
          },
        ],
      },
    ],
    []
  );

  // Memoize filtered categories to avoid unnecessary recalculations
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories;

    return categories
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (item) =>
            item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.a.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((category) => category.questions.length > 0);
  }, [searchTerm, categories]);

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
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
        </div>
      </section>

      {/* FAQ Categories Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto">
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {filteredCategories.map((category, idx) => (
                <CategoryCard key={idx} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-vietnam font-semibold text-grey-20 mb-4">
                No results found
              </h3>
              <p className="text-grey-35">
                Try different keywords or browse all categories by clearing your
                search.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-6 px-6 py-2 bg-primary-75 text-white rounded-lg hover:bg-primary-70 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}