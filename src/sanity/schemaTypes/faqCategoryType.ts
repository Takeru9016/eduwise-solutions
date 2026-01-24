import { defineArrayMember, defineField, defineType } from "sanity";

export const faqCategoryType = defineType({
  name: "faqCategory",
  title: "FAQ Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon (Emoji)",
      type: "string",
      description: "Emoji icon for the category, e.g., 🚀",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
    defineField({
      name: "questions",
      title: "Questions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqQuestion",
          title: "FAQ Question",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "question",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      icon: "icon",
      questions: "questions",
    },
    prepare({ title, icon, questions }) {
      const questionCount = questions?.length || 0;
      return {
        title: `${icon || ""} ${title}`,
        subtitle: `${questionCount} question${questionCount !== 1 ? "s" : ""}`,
      };
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
