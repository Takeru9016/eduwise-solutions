import { EarthGlobeIcon } from "@sanity/icons/EarthGlobe";
import { defineField, defineType } from "sanity";

export const pressFeatureType = defineType({
  fields: [
    defineField({
      description: "Name of the news platform (e.g., Daily Hunt, Medium)",
      name: "publicationName",
      title: "Publication Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      description: "Upload the publication logo",
      name: "publicationLogo",
      options: {
        hotspot: true,
      },
      title: "Publication Logo",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      description: "Main headline or title of the article",
      name: "headline",
      title: "Article Headline",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      description: "Brief description or excerpt from the article",
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      description: "Link to the full article",
      name: "articleUrl",
      title: "Article URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      description: "When the article was published",
      name: "publishedAt",
      title: "Published Date",
      type: "date",
    }),
    defineField({
      description: "Lower numbers appear first",
      name: "order",
      title: "Display Order",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      description: "Mark as featured/highlighted",
      initialValue: false,
      name: "featured",
      title: "Featured",
      type: "boolean",
    }),
  ],
  icon: EarthGlobeIcon,
  name: "pressFeature",
  orderings: [
    {
      by: [{ direction: "asc", field: "order" }],
      name: "orderAsc",
      title: "Display Order",
    },
  ],
  preview: {
    select: {
      media: "publicationLogo",
      subtitle: "headline",
      title: "publicationName",
    },
  },
  title: "Press Feature",
  type: "document",
});
