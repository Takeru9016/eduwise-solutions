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


