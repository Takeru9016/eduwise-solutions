export const POSTS_QUERY = `
  *[_type == "post" && defined(slug.current)]|order(publishedAt desc){
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    "categories": categories[]-> { _id, title, slug },
    "author": author-> { _id, name, image }
  }
`;

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    body,
    "categories": categories[]-> { _id, title, slug },
    "author": author-> { _id, name, image }
  }
`;

export const CATEGORIES_QUERY = `
  *[_type == "category"]|order(title asc){
    _id,
    title,
    slug
  }
`;

export const GOOGLE_REVIEWS_QUERY = `
  *[_type == "googleReview"] | order(publishedAt desc) {
    _id,
    reviewerName,
    reviewerImage,
    reviewText,
    rating,
    isVerified,
    "category": category->slug.current,
    publishedAt
  }
`;

export const GOOGLE_REVIEWS_BY_CATEGORY_QUERY = `
  *[_type == "googleReview" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    _id,
    reviewerName,
    reviewerImage,
    reviewText,
    rating,
    isVerified,
    "category": category->slug.current,
    publishedAt
  }
`;

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(order asc) {
    _id,
    name,
    role,
    company,
    content,
    avatar,
    "avatarPath": coalesce(avatarPath, avatar),
    rating,
    linkedinUrl,
    order
  }
`;

export const FAQ_CATEGORIES_QUERY = `
  *[_type == "faqCategory"] | order(order asc) {
    _id,
    title,
    icon,
    order,
    questions[] {
      _key,
      question,
      answer
    }
  }
`;

export const DEVOPS_FAQ_QUERY = `
  *[_type == "devopsFAQ"][0] {
    _id,
    title,
    questions[] {
      _key,
      question,
      answer
    }
  }
`;

export const PRESS_FEATURES_QUERY = `
  *[_type == "pressFeature"] | order(order asc) {
    _id,
    publicationName,
    "publicationLogoUrl": publicationLogo.asset->url,
    headline,
    description,
    articleUrl,
    publishedAt,
    order,
    featured
  }
`;

// Lightweight course list for Navbar mega-menu and Footer links
export const COURSES_NAV_QUERY = `
  *[_type == "course"] | order(category asc, title asc) {
    _id,
    title,
    "slug": slug.current,
    category,
    emoji
  }
`;

// Course Queries
export const COURSE_BY_SLUG_QUERY = `
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    subtitle,
    description,
    category,
    "heroImageUrl": heroImage.asset->url,
    accentColor,
    emoji,
    duration,
    featured,
    stats,
    features,
    highlights,
    modules,
    price,
    originalPrice,
    emiOption,
    whatsIncluded,
    careerPaths,
    targetAudience,
    isJobGuaranteeProgram,
    tools[] {
      name,
      "logoUrl": logo.asset->url
    },
    prtSteps,
    isaSteps,
    careerTrack,
    hiringPartners[] {
      name,
      "logoUrl": logo.asset->url
    },
    careerServiceFee,
    faq,
    batchInfo,
    industryGrowth,
    seoTitle,
    seoDescription
  }
`;

export const ALL_COURSE_SLUGS_QUERY = `
  *[_type == "course" && defined(slug.current)] {
    "slug": slug.current
  }
`;

export const COURSES_LIST_QUERY = `
  *[_type == "course"] | order(category asc, title asc) {
    _id,
    title,
    slug,
    subtitle,
    category,
    "heroImageUrl": heroImage.asset->url,
    emoji,
    duration,
    price,
    originalPrice,
    featured
  }
`;

export const FEATURED_PROGRAMS_QUERY = `
  *[_type == "course" && featured == true] | order(title asc) {
    _id,
    title,
    slug,
    subtitle,
    description,
    category,
    "heroImageUrl": heroImage.asset->url,
    duration,
    stats
  }
`;

export const LEAD_MAGNETS_QUERY = `
  *[_type == "leadMagnet" && isActive == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    category,
    "coverImageUrl": coverImage.asset->url
  }
`;

export const LEAD_MAGNET_BY_SLUG_QUERY = `
  *[_type == "leadMagnet" && slug.current == $slug && isActive == true][0] {
    _id,
    title,
    slug,
    description,
    category,
    "coverImageUrl": coverImage.asset->url,
    "pdfUrl": pdfFile.asset->url,
    "pdfFilename": pdfFile.asset->originalFilename
  }
`;

// Chatbot knowledge base: everything needed to answer prospective-student
// questions, sourced live from Sanity instead of a hand-maintained text file.
export const CHATBOT_KNOWLEDGE_QUERY = `
{
  "courses": *[_type == "course"] | order(category asc, title asc) {
    title,
    subtitle,
    description,
    category,
    duration,
    price,
    originalPrice,
    emiOption,
    whatsIncluded,
    isJobGuaranteeProgram,
    faq
  },
  "faqCategories": *[_type == "faqCategory"] | order(order asc) {
    title,
    questions[] { question, answer }
  },
  "devopsFaq": *[_type == "devopsFAQ"][0] {
    title,
    questions[] { question, answer }
  }
}
`;

export const PRICING_QUERY = `
  *[_type == "course" && defined(price)] | order(category asc, title asc) {
    _id,
    title,
    slug,
    subtitle,
    category,
    emoji,
    duration,
    price,
    originalPrice,
    emiOption,
    whatsIncluded,
    featured,
    isJobGuaranteeProgram
  }
`;
