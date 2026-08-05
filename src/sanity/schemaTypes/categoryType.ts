import { TagIcon } from "@sanity/icons/Tag";
import { defineField, defineType } from "sanity";

export const categoryType = defineType({
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
      name: "description",
      type: "text",
    }),
  ],
  icon: TagIcon,
  name: "category",
  preview: {
    select: {
      subtitle: "description",
      title: "title",
    },
  },
  title: "Category",
  type: "document",
});
