import { DocumentPdfIcon } from "@sanity/icons/DocumentPdf";
import { defineField, defineType } from "sanity";

export const leadMagnetType = defineType({
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      options: { maxLength: 96, source: "title" },
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      description: "Shown on the resources listing page and gate form.",
      name: "description",
      rows: 3,
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "category",
      options: {
        list: [
          { title: "Development", value: "development" },
          { title: "AI & Data", value: "ai-data" },
          { title: "Cloud, DevOps & Security", value: "cloud-devops-security" },
          { title: "Engineering & Design", value: "engineering" },
          { title: "Business & Finance", value: "business" },
          { title: "Career", value: "career" },
        ],
      },
      title: "Related Category",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      options: { hotspot: true },
      title: "Cover Image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      description:
        "The PDF that gets emailed to the lead after they submit the gate form.",
      name: "pdfFile",
      options: { accept: "application/pdf" },
      title: "PDF File",
      type: "file",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      initialValue: true,
      name: "isActive",
      title: "Active (visible on /resources)?",
      type: "boolean",
    }),
  ],
  icon: DocumentPdfIcon,
  name: "leadMagnet",
  orderings: [
    {
      by: [{ direction: "desc", field: "_createdAt" }],
      name: "newest",
      title: "Newest First",
    },
  ],
  preview: {
    select: {
      media: "coverImage",
      subtitle: "category",
      title: "title",
    },
  },
  title: "Lead Magnet (Free Guide)",
  type: "document",
});
