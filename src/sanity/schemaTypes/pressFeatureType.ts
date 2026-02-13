import { defineField, defineType } from "sanity";

export const pressFeatureType = defineType({
  name: "pressFeature",
  title: "Press Feature",
  type: "document",
  fields: [
    defineField({
      name: "publicationName",
      title: "Publication Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Name of the news platform (e.g., Daily Hunt, Medium)",
    }),
    defineField({
      name: "publicationLogo",
      title: "Publication Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: "Upload the publication logo",
    }),
    defineField({
      name: "headline",
      title: "Article Headline",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
      description: "Main headline or title of the article",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().max(200),
      description: "Brief description or excerpt from the article",
    }),
    defineField({
      name: "articleUrl",
      title: "Article URL",
      type: "url",
      validation: (Rule) => Rule.required(),
      description: "Link to the full article",
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "date",
      description: "When the article was published",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Mark as featured/highlighted",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "publicationName",
      subtitle: "headline",
      media: "publicationLogo",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
