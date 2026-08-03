import { UserIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const authorType = defineType({
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "slug",
      options: {
        source: "name",
      },
      type: "slug",
    }),
    defineField({
      name: "image",
      options: {
        hotspot: true,
      },
      type: "image",
    }),
    defineField({
      name: "bio",
      of: [
        defineArrayMember({
          lists: [],
          styles: [{ title: "Normal", value: "normal" }],
          type: "block",
        }),
      ],
      type: "array",
    }),
  ],
  icon: UserIcon,
  name: "author",
  preview: {
    select: {
      media: "image",
      title: "name",
    },
  },
  title: "Author",
  type: "document",
});
