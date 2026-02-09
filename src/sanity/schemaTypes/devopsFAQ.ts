import { defineArrayMember, defineField, defineType } from "sanity";
import { HelpCircle } from "lucide-react";

export const devopsFAQType = defineType({
  name: "devopsFAQ",
  title: "DevOps FAQ",
  type: "document",
  icon: HelpCircle,
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Frequently Asked Questions",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "questions",
      title: "Questions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "question",
          title: "Question",
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
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "question",
              subtitle: "answer",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      questions: "questions",
    },
    prepare({ title, questions }) {
      const count = questions?.length || 0;
      return {
        title: title || "DevOps FAQ",
        subtitle: `${count} question${count === 1 ? "" : "s"}`,
      };
    },
  },
});
