export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://eduwise.solutions";

export const SITE_NAME = "Eduwise Solutions";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      streetAddress:
        "235, Binnamangala, 2nd Floor, 13th Cross Road, Indira Nagar",
    },
    email: "contact@eduwise.solutions",
    logo: absoluteUrl("/favicon/android-chrome-512x512.png"),
    name: SITE_NAME,
    sameAs: [
      "https://www.linkedin.com/company/eduwisesolutions/",
      "https://www.facebook.com/share/1GfVBLdak6/",
      "https://www.instagram.com/eduwise_insta/",
    ],
    url: SITE_URL,
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      streetAddress:
        "235, Binnamangala, 2nd Floor, 13th Cross Road, Indira Nagar",
    },
    description:
      "Explore IT courses in Development, AI & Data Science, Cloud, DevOps, AutoCAD Design, Business & Finance from industry mentors & placement support.",
    email: "contact@eduwise.solutions",
    image: absoluteUrl("/favicon/android-chrome-512x512.png"),
    name: SITE_NAME,
    priceRange: "₹30,000 - ₹50,000",
    url: SITE_URL,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      item: absoluteUrl(item.path),
      name: item.name,
      position: index + 1,
    })),
  };
}

export function courseJsonLd(course: {
  description?: string | null;
  modules?: { description?: string | null; title: string }[];
  price?: number | null;
  seoDescription?: string | null;
  slug: string;
  subtitle?: string | null;
  title: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    description:
      course.seoDescription ||
      course.description ||
      course.subtitle ||
      course.title,
    educationalLevel: "Professional",
    inLanguage: "en-IN",
    name: course.title,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    ...(course.modules?.length
      ? { teaches: course.modules.map((mod) => mod.title) }
      : {}),
    ...(course.modules?.length
      ? {
          syllabusSections: course.modules.map((mod) => ({
            "@type": "Syllabus",
            description: mod.description ?? undefined,
            name: mod.title,
          })),
        }
      : {}),
    ...(typeof course.price === "number"
      ? {
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            price: course.price,
            priceCurrency: "INR",
            url: absoluteUrl(`/courses/${course.slug}`),
          },
        }
      : {}),
  };
}

export function faqPageJsonLd(
  questions: { answer: string; question: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
      name: q.question,
    })),
  };
}
