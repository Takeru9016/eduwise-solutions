import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export const googleReviewType = defineType({
  name: "googleReview",
  title: "Google Review",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "reviewerName",
      title: "Reviewer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "reviewerImage",
      title: "Reviewer Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Profile picture of the reviewer (optional)",
    }),
    defineField({
      name: "reviewText",
      title: "Review Text",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(20).max(500),
      description: "The review content (20-500 characters)",
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      options: {
        list: [
          { title: "1 Star", value: 1 },
          { title: "2 Stars", value: 2 },
          { title: "3 Stars", value: 3 },
          { title: "4 Stars", value: 4 },
          { title: "5 Stars", value: 5 },
        ],
      },
      initialValue: 5,
    }),
    defineField({
      name: "isVerified",
      title: "Verified Learner",
      type: "boolean",
      initialValue: true,
      description: "Show verified learner badge",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
      description: "Which course/category this review belongs to",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "reviewerName",
      subtitle: "rating",
      media: "reviewerImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `${"★".repeat(subtitle as number)}${"☆".repeat(5 - (subtitle as number))}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Rating, High to Low",
      name: "ratingDesc",
      by: [{ field: "rating", direction: "desc" }],
    },
  ],
});
