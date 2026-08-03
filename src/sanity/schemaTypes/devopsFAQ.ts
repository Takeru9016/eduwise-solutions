import { HelpCircle } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const devopsFAQType = defineType({
  fields: [
    defineField({
      initialValue: "Frequently Asked Questions",
      name: "title",
      title: "Section Title",
      type: "string",
      validation: (Rule) => Rule.required(),
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
              rows: 4,
              title: "Answer",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
          ],
          name: "question",
          preview: {
            select: {
              subtitle: "answer",
              title: "question",
            },
          },
          title: "Question",
          type: "object",
        }),
      ],
      title: "Questions",
      type: "array",
    }),
  ],
  icon: HelpCircle,
  name: "devopsFAQ",
  preview: {
    prepare({ title, questions }) {
      const count = questions?.length || 0;
      return {
        subtitle: `${count} question${count === 1 ? "" : "s"}`,
        title: title || "DevOps FAQ",
      };
    },
    select: {
      questions: "questions",
      title: "title",
    },
  },
  title: "DevOps FAQ",
  type: "document",
});
