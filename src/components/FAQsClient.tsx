"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Building2,
  ChevronDown,
  CreditCard,
  GraduationCap,
  HelpCircle,
  MessageCircle,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Types
interface Question {
  a: string;
  q: string;
}

interface Category {
  icon: string;
  questions: Question[];
  title: string;
}

interface FAQsClientProps {
  categories: Category[];
}

// Icon mapping for categories
const categoryIcons: Record<string, React.ReactNode> = {
  "🏆": <GraduationCap className="h-5 w-5" />,
  "💳": <CreditCard className="h-5 w-5" />,
  "💼": <Building2 className="h-5 w-5" />,
  "📚": <BookOpen className="h-5 w-5" />,
  "🚀": <Sparkles className="h-5 w-5" />,
  "🤝": <Users className="h-5 w-5" />,
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
    animate={{ opacity: 1, y: 0 }}
    className="group"
    initial={{ opacity: 0, y: 10 }}
    transition={{ delay: index * 0.05, duration: 0.3 }}
  >
    <button
      className={cn(
        "w-full rounded-2xl p-5 text-left transition-all duration-300",
        "border border-transparent",
        "hover:border-primary/20",
        isOpen && "border-primary/20"
      )}
      onClick={onToggle}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "font-medium text-base transition-colors duration-200 md:text-lg",
            isOpen ? "text-primary" : "text-grey-15 group-hover:text-grey-10"
          )}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
            isOpen
              ? "bg-primary text-white"
              : "bg-light-95 text-grey-40 group-hover:text-primary"
          )}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </div>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="pt-4 text-grey-40 text-sm leading-relaxed md:text-base">
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
    <HelpCircle className="h-5 w-5" />
  );

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
      viewport={{ margin: "-50px", once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {/* Category header */}
      <div className="sticky top-20 z-10 mb-2 bg-light-97/80 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary-70 text-white shadow-lg shadow-primary/20">
            {icon}
          </div>
          <div>
            <h2 className="font-bold text-grey-10 text-lg md:text-xl">
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
              answer={item.a}
              index={idx}
              isOpen={openItems.has(key)}
              key={key}
              onToggle={() => toggleItem(key)}
              question={item.q}
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
    animate={{ opacity: 1, y: 0 }}
    className="space-y-4"
    initial={{ opacity: 0, y: 20 }}
  >
    <div className="mb-6 flex items-center gap-2 text-grey-40">
      <Search className="h-4 w-4" />
      <span className="text-sm">
        Found{" "}
        <span className="font-semibold text-grey-20">{results.length}</span>{" "}
        result
        {results.length === 1 ? "" : "s"} for &ldquo;{searchTerm}&rdquo;
      </span>
    </div>
    <div className="space-y-2">
      {results.map((result, idx) => (
        <div key={result.key}>
          <div className="mb-1 flex items-center gap-2 px-5">
            <span className="font-medium text-primary text-xs uppercase tracking-wide">
              {result.categoryTitle}
            </span>
          </div>
          <FAQItem
            answer={result.question.a}
            index={idx}
            isOpen={openItems.has(result.key)}
            onToggle={() => toggleItem(result.key)}
            question={result.question.q}
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
    if (!searchTerm.trim()) {
      return null;
    }

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
            key: `search-${catIdx}-${qIdx}`,
            question: q,
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
        <div className="absolute inset-0 bg-linear-to-br from-primary via-primary-70 to-primary-80" />

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 h-[600px] w-[600px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 h-[500px] w-[500px] rounded-full bg-primary-50/10 blur-3xl" />
          <motion.div
            animate={{
              rotate: [0, 5, 0],
              y: [0, -20, 0],
            }}
            className="absolute top-20 right-[15%] h-16 w-16 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xs"
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
          <motion.div
            animate={{
              rotate: [0, -5, 0],
              y: [0, 15, 0],
            }}
            className="absolute bottom-32 left-[10%] h-12 w-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-xs"
            transition={{
              delay: 1,
              duration: 5,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        </div>

        {/* Content */}
        <div className="container relative mx-auto py-16 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-xs"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Got questions? We&apos;ve got answers</span>
            </motion.div>

            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 font-bold font-vietnam text-4xl text-white md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              How can we help
              <span className="mt-2 block">you today?</span>
            </motion.h1>

            {/* Search bar */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="relative mx-auto max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-white shadow-2xl shadow-black/10" />
              <div className="relative flex items-center">
                <Search className="absolute left-5 h-5 w-5 text-grey-40" />
                <Input
                  className="h-14 w-full rounded-2xl border-0 bg-transparent pr-6 pl-14 text-base placeholder:text-grey-40 focus-visible:ring-2 focus-visible:ring-primary/50"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for answers..."
                  type="text"
                  value={searchTerm}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute right-0 bottom-0 left-0">
          <svg
            className="h-auto w-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 1440 100"
            xmlns="http://www.w3.org/2000/svg"
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
          <div className="mx-auto max-w-4xl">
            <AnimatePresence mode="wait">
              {searchResults === null ? (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="space-y-12"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  key="categories"
                >
                  {categories.map((category, idx) => (
                    <CategorySection
                      category={category}
                      categoryIndex={idx}
                      key={idx}
                      openItems={openItems}
                      toggleItem={toggleItem}
                    />
                  ))}
                </motion.div>
              ) : searchResults.length > 0 ? (
                <SearchResults
                  key="search-results"
                  openItems={openItems}
                  results={searchResults}
                  searchTerm={searchTerm}
                  toggleItem={toggleItem}
                />
              ) : (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="py-20 text-center"
                  exit={{ opacity: 0, y: -20 }}
                  initial={{ opacity: 0, y: 20 }}
                  key="no-results"
                >
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-light-95">
                    <Search className="h-8 w-8 text-grey-40" />
                  </div>
                  <h3 className="mb-3 font-bold font-vietnam text-2xl text-grey-15">
                    No results found
                  </h3>
                  <p className="mx-auto mb-6 max-w-md text-grey-40">
                    We couldn&apos;t find any questions matching &ldquo;
                    {searchTerm}&rdquo;. Try a different search term.
                  </p>
                  <button
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-medium text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary-70"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear search
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="pb-20">
        <div className="container mx-auto">
          <motion.div
            className="mx-auto max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-primary-70 to-primary-80 p-8 md:p-12">
              {/* Decorative */}
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-primary-50/20 blur-3xl" />

              <div className="relative flex flex-col items-center justify-between gap-8 md:flex-row">
                <div className="text-center md:text-left">
                  <h3 className="mb-3 font-bold font-vietnam text-2xl text-white md:text-3xl">
                    Still have questions?
                  </h3>
                  <p className="max-w-md text-white/80">
                    Can&apos;t find what you&apos;re looking for? Our team is
                    here to help you 24/7.
                  </p>
                </div>
                <a
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-primary shadow-xl transition-colors hover:bg-light-95"
                  href="/contact"
                >
                  <MessageCircle className="h-5 w-5" />
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
