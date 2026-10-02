import { defineArrayMember, defineField, defineType } from "sanity";
import { ICON_NAMES } from "../../lib/icon-map";

export const pageSeoType = defineType({
  fields: [
    defineField({
      description:
        "The <title> tag. 50-60 characters. Used exactly as typed, no brand suffix is added.",
      name: "title",
      title: "SEO Title",
      type: "string",
      validation: (Rule) => Rule.max(70).warning("Keep under ~60 characters"),
    }),
    defineField({
      description: "Meta description, 140-160 characters.",
      name: "description",
      rows: 3,
      title: "Meta Description",
      type: "text",
      validation: (Rule) => Rule.max(200).warning("Keep under ~160 characters"),
    }),
    defineField({
      description:
        "Meta keywords tag. No effect on Google ranking; kept for checklist compliance.",
      name: "keywords",
      of: [{ type: "string" }],
      title: "Keywords",
      type: "array",
    }),
  ],
  name: "pageSeo",
  title: "Page SEO",
  type: "object",
});

export function iconField(name = "icon", title = "Icon") {
  return defineField({
    name,
    options: {
      list: ICON_NAMES.map((value) => ({ title: value, value })),
    },
    title,
    type: "string",
  });
}

export function textField(
  name: string,
  title: string,
  options: { description?: string; rows?: number } = {}
) {
  return options.rows
    ? defineField({
        description: options.description,
        name,
        rows: options.rows,
        title,
        type: "text",
      })
    : defineField({
        description: options.description,
        name,
        title,
        type: "string",
      });
}

export function stringList(name: string, title: string, description?: string) {
  return defineField({
    description,
    name,
    of: [{ type: "string" }],
    title,
    type: "array",
  });
}

export function objectList(
  name: string,
  title: string,
  fields: ReturnType<typeof defineField>[],
  previewTitle: string,
  previewSubtitle?: string
) {
  return defineField({
    name,
    of: [
      defineArrayMember({
        fields,
        preview: {
          select: {
            title: previewTitle,
            ...(previewSubtitle ? { subtitle: previewSubtitle } : {}),
          },
        },
        type: "object",
      }),
    ],
    title,
    type: "array",
  });
}

export function section({
  name,
  title,
  description,
  heading = true,
  fields = [],
}: {
  description?: string;
  fields?: ReturnType<typeof defineField>[];
  heading?: boolean;
  name: string;
  title: string;
}) {
  return defineField({
    description,
    fields: [
      defineField({
        description: "Untick to hide this whole section on the page.",
        initialValue: true,
        name: "enabled",
        title: "Show this section",
        type: "boolean",
      }),
      ...(heading
        ? [
            textField("eyebrow", "Small label (pill above heading)"),
            textField("heading", "Heading"),
            textField("subheading", "Sub-heading", { rows: 3 }),
          ]
        : []),
      ...fields,
    ],
    name,
    options: { collapsed: true, collapsible: true },
    title,
    type: "object",
  });
}
