import { defineArrayMember, defineField, defineType } from "sanity";

export const faqCategoryType = defineType({
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      description: "Emoji icon for the category, e.g., 🚀",
      name: "icon",
      title: "Icon (Emoji)",
      type: "string",
    }),
    defineField({
      description: "Lower numbers appear first",
      name: "order",
      title: "Display Order",
      type: "number",
    }),
    defineField({
      name: "questions",
      of: [
        defineArrayMember({
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
          name: "faqQuestion",
          preview: {
            select: {
              title: "question",
            },
          },
          title: "FAQ Question",
          type: "object",
        }),
      ],
      title: "Questions",
      type: "array",
    }),
  ],
  name: "faqCategory",
  orderings: [
    {
      by: [{ direction: "asc", field: "order" }],
      name: "orderAsc",
      title: "Display Order",
    },
  ],
  preview: {
    prepare({ title, icon, questions }) {
      const questionCount = questions?.length || 0;
      return {
        subtitle: `${questionCount} question${questionCount === 1 ? "" : "s"}`,
        title: `${icon || ""} ${title}`,
      };
    },
    select: {
      icon: "icon",
      questions: "questions",
      title: "title",
    },
  },
  title: "FAQ Category",
  type: "document",
});
