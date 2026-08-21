import { ArrowTopRightIcon } from "@sanity/icons/ArrowTopRight";
import { defineField, defineType } from "sanity";

export const redirectType = defineType({
  fields: [
    defineField({
      description: "The old path, starting with /, e.g. /courses/old-slug",
      name: "source",
      title: "Source Path",
      type: "string",
      validation: (Rule) =>
        Rule.required().custom((value) =>
          value?.startsWith("/") ? true : "Must start with /"
        ),
    }),
    defineField({
      description:
        "Where to send visitors instead - an internal path (/courses/new-slug) or a full external URL.",
      name: "destination",
      title: "Destination",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      description:
        "On - 308 permanent redirect (search engines update their index). Off - 307 temporary.",
      initialValue: true,
      name: "permanent",
      title: "Permanent Redirect?",
      type: "boolean",
    }),
    defineField({
      initialValue: true,
      name: "isActive",
      title: "Active?",
      type: "boolean",
    }),
  ],
  icon: ArrowTopRightIcon,
  name: "redirect",
  preview: {
    prepare: ({ source, subtitle, isActive }) => ({
      subtitle,
      title: `${isActive ? "" : "(inactive) "}${source}`,
    }),
    select: {
      isActive: "isActive",
      source: "source",
      subtitle: "destination",
    },
  },
  title: "Redirect",
  type: "document",
});
