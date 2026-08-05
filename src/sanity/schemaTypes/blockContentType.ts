import { ImageIcon } from "@sanity/icons/Image";
import { defineArrayMember, defineType } from "sanity";

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export const blockContentType = defineType({
  name: "blockContent",
  of: [
    defineArrayMember({
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            fields: [
              {
                name: "href",
                title: "URL",
                type: "url",
              },
            ],
            name: "link",
            title: "URL",
            type: "object",
          },
        ],
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
          { title: "Underline", value: "underline" },
          { title: "Strike", value: "strike-through" },
        ],
      },
      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      type: "block",
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      fields: [
        {
          name: "alt",
          title: "Alternative Text",
          type: "string",
        },
      ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon: ImageIcon as any,
      options: { hotspot: true },
      type: "image",
    }),
    // Table support
    defineArrayMember({
      title: "Table",
      type: "table",
    }),
    // Flowchart support
    defineArrayMember({
      title: "Flowchart",
      type: "flowchart",
    }),
  ],
  title: "Block Content",
  type: "array",
});
