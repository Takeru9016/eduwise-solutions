import { client } from "@/sanity/lib/client";
import { FAQ_CATEGORIES_QUERY } from "@/sanity/lib/queries";
import FAQsClient from "./FAQsClient";

// Sanity FAQ types
interface SanityFAQQuestion {
  _key: string;
  question: string;
  answer: string;
}

interface SanityFAQCategory {
  _id: string;
  title: string;
  icon?: string;
  order?: number;
  questions: SanityFAQQuestion[];
}

// Transform Sanity data to component format
function transformCategories(sanityData: SanityFAQCategory[]) {
  return sanityData.map((category) => ({
    title: category.title,
    icon: category.icon || "📌",
    questions: category.questions.map((q) => ({
      q: q.question,
      a: q.answer,
    })),
  }));
}

export default async function FAQsPage() {
  const faqCategories =
    await client.fetch<SanityFAQCategory[]>(FAQ_CATEGORIES_QUERY);
  const transformedCategories = transformCategories(faqCategories);

  return <FAQsClient categories={transformedCategories} />;
}
