import { CubeIcon } from "@sanity/icons/Cube";
import { defineArrayMember, defineField, defineType } from "sanity";

export const awsCertificationType = defineType({
  fields: [
    defineField({
      group: "details",
      name: "title",
      title: "Certification Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      description: "Exam code, e.g. CLF-C02. Must be unique.",
      group: "details",
      name: "code",
      title: "Exam Code",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: "details",
      name: "level",
      options: {
        list: ["Foundational", "Associate", "Professional", "Specialty"],
      },
      title: "Level",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      group: "details",
      name: "description",
      rows: 3,
      title: "Short Description (shown on the card)",
      type: "text",
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      description: "Upload the badge. If empty, the badge path below is used.",
      group: "details",
      name: "badgeImage",
      options: { hotspot: true },
      title: "Badge Image",
      type: "image",
    }),
    defineField({
      description:
        "Path to a badge in the site's public folder, e.g. /logos/aws-badges/CLF-C02.png. Used when no image is uploaded.",
      group: "details",
      name: "badgeImagePath",
      title: "Badge Image Path (public folder)",
      type: "string",
    }),
    defineField({
      description:
        "Optional, e.g. USD 100 or ₹8,000. Shown on the card only when filled.",
      group: "details",
      name: "examFee",
      title: "Exam Fee",
      type: "string",
    }),
    defineField({
      description: "Lower numbers appear first inside their level.",
      group: "details",
      name: "order",
      title: "Display Order",
      type: "number",
    }),
    defineField({
      description: 'E.g. "4-6". Shown as "4-6 weeks study".',
      group: "syllabus",
      name: "studyWeeks",
      title: "Study Time (weeks)",
      type: "string",
    }),
    defineField({
      description:
        "Exam domains and their weighting. Percentages should total 100.",
      group: "syllabus",
      name: "domains",
      of: [
        defineArrayMember({
          fields: [
            defineField({ name: "name", title: "Domain", type: "string" }),
            defineField({
              name: "percent",
              title: "Weight (%)",
              type: "number",
            }),
            defineField({
              name: "keyTopics",
              rows: 3,
              title: "Key Topics",
              type: "text",
            }),
          ],
          preview: { select: { subtitle: "percent", title: "name" } },
          type: "object",
        }),
      ],
      title: "Exam Domains",
      type: "array",
    }),
    defineField({
      group: "syllabus",
      name: "studyTips",
      of: [{ type: "string" }],
      title: "Study Tips",
      type: "array",
    }),
    defineField({
      group: "syllabus",
      name: "resources",
      of: [{ type: "string" }],
      title: "Recommended Resources",
      type: "array",
    }),
    defineField({
      group: "qa",
      name: "sampleQA",
      of: [
        defineArrayMember({
          fields: [
            defineField({
              name: "question",
              rows: 3,
              title: "Question",
              type: "text",
            }),
            defineField({
              name: "options",
              of: [{ type: "string" }],
              title: "Options (in order A, B, C, D)",
              type: "array",
            }),
            defineField({
              description: "The correct option text, exactly as in the list.",
              name: "answer",
              title: "Correct Answer",
              type: "string",
            }),
            defineField({
              initialValue: false,
              name: "multiSelect",
              title: "Select-multiple question",
              type: "boolean",
            }),
            defineField({ name: "domain", title: "Domain", type: "string" }),
            defineField({
              name: "explanation",
              rows: 4,
              title: "Explanation",
              type: "text",
            }),
          ],
          preview: { select: { subtitle: "domain", title: "question" } },
          type: "object",
        }),
      ],
      title: "Sample Questions",
      type: "array",
    }),
  ],
  groups: [
    { default: true, name: "details", title: "Details" },
    { name: "syllabus", title: "Syllabus" },
    { name: "qa", title: "Sample Q&A" },
  ],
  icon: CubeIcon,
  name: "awsCertification",
  orderings: [
    {
      by: [
        { direction: "asc", field: "level" },
        { direction: "asc", field: "order" },
      ],
      name: "levelOrder",
      title: "Level, then Display Order",
    },
  ],
  preview: {
    select: { media: "badgeImage", subtitle: "code", title: "title" },
  },
  title: "AWS Certification",
  type: "document",
});
