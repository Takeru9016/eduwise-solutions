import { defineArrayMember, defineField, defineType } from "sanity";

export const flowchart = defineType({
  fields: [
    defineField({
      description: "Optional title for the flowchart",
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      initialValue: "vertical",
      name: "direction",
      options: {
        layout: "radio",
        list: [
          { title: "Vertical (↓)", value: "vertical" },
          { title: "Horizontal (→)", value: "horizontal" },
        ],
      },
      title: "Direction",
      type: "string",
    }),
    defineField({
      description: "Add steps in order from start to finish",
      name: "steps",
      of: [
        defineArrayMember({
          fields: [
            defineField({
              description: "Main text for this step",
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              description: "Optional additional details",
              name: "description",
              rows: 2,
              title: "Description",
              type: "text",
            }),
            defineField({
              initialValue: "default",
              name: "color",
              options: {
                layout: "radio",
                list: [
                  { title: "Default (White)", value: "default" },
                  { title: "Primary (Brand Color)", value: "primary" },
                  { title: "Secondary (Blue)", value: "secondary" },
                  { title: "Success (Green)", value: "success" },
                ],
              },
              title: "Color Theme",
              type: "string",
            }),
          ],
          preview: {
            prepare({ title, subtitle, color }) {
              return {
                subtitle: subtitle || `Color: ${color || "default"}`,
                title: title || "Untitled Step",
              };
            },
            select: {
              color: "color",
              subtitle: "description",
              title: "label",
            },
          },
          title: "Step",
          type: "object",
        }),
      ],
      title: "Steps",
      type: "array",
      validation: (Rule) => Rule.required().min(2).max(20),
    }),
  ],
  name: "flowchart",
  preview: {
    prepare({ title, steps }) {
      return {
        subtitle: `${steps?.length || 0} steps`,
        title: title || "Flowchart",
      };
    },
    select: {
      steps: "steps",
      title: "title",
    },
  },
  title: "Flowchart",
  type: "object",
});
