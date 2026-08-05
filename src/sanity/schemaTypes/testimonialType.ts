import { CommentIcon } from "@sanity/icons/Comment";
import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role/Position",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Testimonial Content",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      description:
        "Profile photo of the person. Leave empty to use public folder path.",
      name: "avatar",
      options: {
        hotspot: true,
      },
      title: "Avatar Image",
      type: "image",
    }),
    defineField({
      description:
        "Path to avatar in public folder, e.g., /testimonials/john.jpeg",
      name: "avatarPath",
      title: "Avatar Path (Public Folder)",
      type: "string",
    }),
    defineField({
      initialValue: 5,
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      description: "Lower numbers appear first",
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  icon: CommentIcon,
  name: "testimonial",
  orderings: [
    {
      by: [{ direction: "asc", field: "order" }],
      name: "orderAsc",
      title: "Display Order",
    },
  ],
  preview: {
    select: {
      media: "avatar",
      subtitle: "company",
      title: "name",
    },
  },
  title: "Testimonial",
  type: "document",
});
