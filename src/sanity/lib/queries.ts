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
