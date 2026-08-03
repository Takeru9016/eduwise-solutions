import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      options: {
        source: "title",
      },
      type: "slug",
    }),
    defineField({
      name: "author",
      to: { type: "author" },
      type: "reference",
    }),
    defineField({
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
      name: "mainImage",
      options: {
        hotspot: true,
      },
      type: "image",
    }),
    defineField({
      name: "categories",
      of: [defineArrayMember({ to: { type: "category" }, type: "reference" })],
      type: "array",
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
  ],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: DocumentTextIcon as any,
  name: "post",
  preview: {
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
    select: {
      author: "author.name",
      media: "mainImage",
      title: "title",
    },
  },
  title: "Post",
  type: "document",
});
