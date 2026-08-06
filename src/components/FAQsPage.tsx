import { faqPageJsonLd } from "@/lib/seo";
import { client } from "@/sanity/lib/client";
import { FAQ_CATEGORIES_QUERY } from "@/sanity/lib/queries";
import FAQsClient from "./FAQsClient";

// Sanity FAQ types
interface SanityFAQQuestion {
  _key: string;
  answer: string;
  question: string;
}

interface SanityFAQCategory {
  _id: string;
  icon?: string;
  order?: number;
  questions: SanityFAQQuestion[];
  title: string;
}

// Transform Sanity data to component format
function transformCategories(sanityData: SanityFAQCategory[]) {
  return sanityData.map((category) => ({
    icon: category.icon || "📌",
    questions: category.questions.map((q) => ({
      a: q.answer,
      q: q.question,
    })),
    title: category.title,
  }));
}

export default async function FAQsPage() {
  const faqCategories =
    await client.fetch<SanityFAQCategory[]>(FAQ_CATEGORIES_QUERY);
  const transformedCategories = transformCategories(faqCategories);
  const allQuestions = faqCategories.flatMap((category) =>
    category.questions.map((q) => ({ answer: q.answer, question: q.question }))
  );

  return (
    <>
      {allQuestions.length > 0 && (
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static, code-generated JSON-LD, not user input
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageJsonLd(allQuestions)),
          }}
          type="application/ld+json"
        />
      )}
      <FAQsClient categories={transformedCategories} />
    </>
  );
}
