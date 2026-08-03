import { StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const googleReviewType = defineType({
  fields: [
    defineField({
      name: "reviewerName",
      title: "Reviewer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      description: "Profile picture of the reviewer (optional)",
      name: "reviewerImage",
      options: {
        hotspot: true,
      },
      title: "Reviewer Image",
      type: "image",
    }),
    defineField({
      description: "The review content (20-500 characters)",
      name: "reviewText",
      rows: 4,
      title: "Review Text",
      type: "text",
      validation: (Rule) => Rule.required().min(20).max(500),
    }),
    defineField({
      initialValue: 5,
      name: "rating",
      options: {
        list: [
          { title: "1 Star", value: 1 },
          { title: "2 Stars", value: 2 },
          { title: "3 Stars", value: 3 },
          { title: "4 Stars", value: 4 },
          { title: "5 Stars", value: 5 },
        ],
      },
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      description: "Show verified learner badge",
      initialValue: true,
      name: "isVerified",
      title: "Verified Learner",
      type: "boolean",
    }),
    defineField({
      description: "Which course/category this review belongs to",
      name: "category",
      title: "Category",
      to: [{ type: "category" }],
      type: "reference",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      initialValue: () => new Date().toISOString(),
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
  ],
  icon: StarIcon,
  name: "googleReview",
  orderings: [
    {
      by: [{ direction: "desc", field: "publishedAt" }],
      name: "publishedAtDesc",
      title: "Published Date, New",
    },
    {
      by: [{ direction: "desc", field: "rating" }],
      name: "ratingDesc",
      title: "Rating, High to Low",
    },
  ],
  preview: {
    prepare({ title, subtitle, media }) {
      return {
        media,
        subtitle: `${"★".repeat(subtitle as number)}${"☆".repeat(5 - (subtitle as number))}`,
        title,
      };
    },
    select: {
      media: "reviewerImage",
      subtitle: "rating",
      title: "reviewerName",
    },
  },
  title: "Google Review",
  type: "document",
});
