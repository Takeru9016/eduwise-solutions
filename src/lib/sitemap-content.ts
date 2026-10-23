// Published document types that can change content rendered on public pages.
export const SITEMAP_DOCUMENT_TYPES = [
  "course",
  "post",
  "leadMagnet",
  "homePage",
  "awsPage",
  "awsCertification",
  "author",
  "category",
  "faqCategory",
  "devopsFAQ",
  "placedStudent",
  "googleReview",
  "testimonial",
  "pressFeature",
] as const;

export const PAGE_CONTENT_TYPES: Record<string, readonly string[]> = {
  "/": ["homePage", "course", "testimonial", "pressFeature"],
  "/about": ["course"],
  "/blogs": ["post", "category", "author"],
  "/certifications/aws": ["awsPage", "awsCertification"],
  "/courses": ["course"],
  "/faq": ["faqCategory"],
  "/press": ["pressFeature"],
  "/pricing": ["course"],
  "/resources": ["leadMagnet"],
  "/testimonials": ["testimonial"],
};
