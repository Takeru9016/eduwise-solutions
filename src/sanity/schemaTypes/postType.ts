import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  fields: [
    defineField({
      group: "content",
      name: "title",
      type: "string",
    }),
    defineField({
      group: "content",
      name: "slug",
      options: {
        source: "title",
      },
      type: "slug",
    }),
    defineField({
      group: "content",
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
      group: "content",
      name: "mainImage",
      options: {
        hotspot: true,
      },
      type: "image",
    }),
    defineField({
      group: "content",
      name: "categories",
      of: [defineArrayMember({ to: { type: "category" }, type: "reference" })],
      type: "array",
    }),
    defineField({
      group: "content",
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      group: "content",
      name: "body",
      type: "blockContent",
    }),
    defineField({
      description:
        "Overrides the <title> tag. Aim for 50-60 chars. Falls back to Title. Rendered as-is (no brand suffix added).",
      group: "seo",
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      validation: (Rule) => Rule.max(70).warning("Keep under ~60 chars"),
    }),
    defineField({
      description:
        "On-page H1 heading. Use this to make the H1 differ from the SEO Title. Falls back to Title.",
      group: "seo",
      name: "h1",
      title: "H1 Heading",
      type: "string",
    }),
    defineField({
      description: "Meta description, 140-160 chars.",
      group: "seo",
      name: "seoDescription",
      rows: 3,
      title: "Meta Description",
      type: "text",
      validation: (Rule) => Rule.max(200).warning("Keep under ~160 chars"),
    }),
    defineField({
      description:
        "Meta keywords tag. No effect on Google ranking; kept for checklist compliance.",
      group: "seo",
      name: "seoKeywords",
      of: [{ type: "string" }],
      title: "Keywords",
      type: "array",
    }),
    defineField({
      description:
        "Optional override. Leave empty to use https://eduwise.solutions/blogs/<slug>.",
      group: "seo",
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      description: "Tick to add robots noindex. Default is index, follow.",
      group: "seo",
      initialValue: false,
      name: "noIndex",
      title: "Hide from search engines (noindex)",
      type: "boolean",
    }),
    defineField({
      description: "Optional. Filled entries add FAQPage schema to the post.",
      group: "seo",
      name: "faq",
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
              rows: 3,
              title: "Answer",
              type: "text",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "question" } },
          type: "object",
        }),
      ],
      title: "FAQ (schema)",
      type: "array",
    }),
  ],
  groups: [
    { default: true, name: "content", title: "Content" },
    { name: "seo", title: "SEO" },
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
