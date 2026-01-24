"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Sparkles,
  GraduationCap,
  CreditCard,
  Users,
  Building2,
  BookOpen,
} from "lucide-react";

import { cn } from "@/lib/utils";
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

interface FAQsClientProps {
  categories: Category[];
}

// Icon mapping for categories
const categoryIcons: Record<string, React.ReactNode> = {
  "🚀": <Sparkles className="w-5 h-5" />,
  "🏆": <GraduationCap className="w-5 h-5" />,
  "📚": <BookOpen className="w-5 h-5" />,
  "💳": <CreditCard className="w-5 h-5" />,
  "🤝": <Users className="w-5 h-5" />,
  "💼": <Building2 className="w-5 h-5" />,
};

// Individual FAQ Item with smooth animation
const FAQItem = ({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, duration: 0.3 }}
    className="group"
  >
    <button
      onClick={onToggle}
      className={cn(
        "w-full text-left p-5 rounded-2xl transition-all duration-300",
        "border border-transparent",
        "hover:border-primary/20",
        isOpen && "border-primary/20",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "text-base md:text-lg font-medium transition-colors duration-200",
            isOpen ? "text-primary" : "text-grey-15 group-hover:text-grey-10",
          )}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300",
            isOpen ?
              "bg-primary text-white"
            : "bg-light-95 text-grey-40 group-hover:text-primary",
          )}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </div>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-grey-40 leading-relaxed text-sm md:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  </motion.div>
);

// Category section
const CategorySection = ({
  category,
  categoryIndex,
  openItems,
  toggleItem,
}: {
  category: Category;
  categoryIndex: number;
  openItems: Set<string>;
  toggleItem: (key: string) => void;
}) => {
  const icon = categoryIcons[category.icon] || (
    <HelpCircle className="w-5 h-5" />
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
      className="relative"
    >
      {/* Category header */}
      <div className="sticky top-20 z-10 bg-light-97/80 backdrop-blur-xl py-4 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-70 text-white flex items-center justify-center shadow-lg shadow-primary/20">
            {icon}
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-grey-10">
              {category.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-2 pl-0 md:pl-13">
        {category.questions.map((item, idx) => {
          const key = `${categoryIndex}-${idx}`;
          return (
            <FAQItem
              key={key}
              question={item.q}
              answer={item.a}
              isOpen={openItems.has(key)}
              onToggle={() => toggleItem(key)}
              index={idx}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

// Search results view
const SearchResults = ({
  results,
  searchTerm,
  openItems,
  toggleItem,
}: {
  results: { categoryTitle: string; question: Question; key: string }[];
  searchTerm: string;
  openItems: Set<string>;
  toggleItem: (key: string) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-4"
  >
    <div className="flex items-center gap-2 text-grey-40 mb-6">
      <Search className="w-4 h-4" />
      <span className="text-sm">
        Found{" "}
        <span className="font-semibold text-grey-20">{results.length}</span>{" "}
        result
        {results.length !== 1 ? "s" : ""} for &ldquo;{searchTerm}&rdquo;
      </span>
    </div>
    <div className="space-y-2">
      {results.map((result, idx) => (
        <div key={result.key}>
          <div className="flex items-center gap-2 mb-1 px-5">
            <span className="text-xs text-primary font-medium uppercase tracking-wide">
              {result.categoryTitle}
            </span>
          </div>
          <FAQItem
            question={result.question.q}
            answer={result.question.a}
            isOpen={openItems.has(result.key)}
            onToggle={() => toggleItem(result.key)}
            index={idx}
          />
        </div>
      ))}
    </div>
  </motion.div>
);

// Main component
export default function FAQsClient({ categories }: FAQsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // Flat search results
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return null;

    const results: {
      categoryTitle: string;
      question: Question;
      key: string;
    }[] = [];
    categories.forEach((category, catIdx) => {
      category.questions.forEach((q, qIdx) => {
        if (
          q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.a.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          results.push({
            categoryTitle: category.title,
            question: q,
            key: `search-${catIdx}-${qIdx}`,
          });
        }
      });
    });
    return results;
  }, [searchTerm, categories]);

  return (
    <div className="min-h-screen bg-light-97">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-70 to-primary-80" />

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[500px] h-[500px] rounded-full bg-primary-50/10 blur-3xl" />
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 right-[15%] w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
          />
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-32 left-[10%] w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
          />
        </div>

        {/* Content */}
        <div className="relative container mx-auto py-16 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-6"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Got questions? We&apos;ve got answers</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl font-vietnam font-bold text-white mb-6"
            >
              How can we help
              <span className="block mt-2">you today?</span>
            </motion.h1>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative max-w-xl mx-auto"
            >
              <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl shadow-black/10" />
              <div className="relative flex items-center">
                <Search className="absolute left-5 w-5 h-5 text-grey-40" />
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  className="w-full h-14 pl-14 pr-6 text-base border-0 rounded-2xl bg-transparent focus-visible:ring-2 focus-visible:ring-primary/50 placeholder:text-grey-40"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0 100V60C240 20 480 0 720 20C960 40 1200 80 1440 60V100H0Z"
              fill="hsl(var(--light-97))"
            />
          </svg>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              {searchResults !== null ?
                searchResults.length > 0 ?
                  <SearchResults
                    key="search-results"
                    results={searchResults}
                    searchTerm={searchTerm}
                    openItems={openItems}
                    toggleItem={toggleItem}
                  />
                : <motion.div
                    key="no-results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-light-95 flex items-center justify-center">
                      <Search className="w-8 h-8 text-grey-40" />
                    </div>
                    <h3 className="text-2xl font-vietnam font-bold text-grey-15 mb-3">
                      No results found
                    </h3>
                    <p className="text-grey-40 mb-6 max-w-md mx-auto">
                      We couldn&apos;t find any questions matching &ldquo;
                      {searchTerm}&rdquo;. Try a different search term.
                    </p>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-70 transition-colors shadow-lg shadow-primary/25"
                    >
                      Clear search
                    </button>
                  </motion.div>

              : <motion.div
                  key="categories"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-12"
                >
                  {categories.map((category, idx) => (
                    <CategorySection
                      key={idx}
                      category={category}
                      categoryIndex={idx}
                      openItems={openItems}
                      toggleItem={toggleItem}
                    />
                  ))}
                </motion.div>
              }
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="pb-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-70 to-primary-80 p-8 md:p-12">
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-50/20 rounded-full blur-3xl" />

              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-vietnam font-bold text-white mb-3">
                    Still have questions?
                  </h3>
                  <p className="text-white/80 max-w-md">
                    Can&apos;t find what you&apos;re looking for? Our team is
                    here to help you 24/7.
                  </p>
                </div>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-semibold hover:bg-light-95 transition-colors shadow-xl"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact Support
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
