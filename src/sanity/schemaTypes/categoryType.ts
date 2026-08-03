import { TagIcon } from "@sanity/icons";
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
  title: "Category",
  type: "document",
});
