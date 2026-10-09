import Link from "next/link";
import type { PortableTextComponents } from "next-sanity";
import { BlogImage } from "@/components/blog/BlogImage";
import { headingId } from "@/lib/blog-toc";
import { getImageDimensions, urlFor } from "@/sanity/lib/image";
import { Flowchart } from "./flowchart";

interface TableRow {
  _key?: string;
  cells?: string[];
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="my-6 rounded-2xl border-2 border-grey-15 bg-light-95 p-6 text-grey-35 italic">
        {children}
      </blockquote>
    ),
    // Headings
    h1: ({ children, value }) => (
      <h2
        className="mt-12 mb-6 scroll-mt-28 font-black font-vietnam text-4xl text-grey-15 first:mt-0"
        id={value?._key ? headingId(value._key) : undefined}
      >
        {children}
      </h2>
    ),
    h2: ({ children, value }) => (
      <h2
        className="mt-10 mb-5 scroll-mt-28 font-black font-vietnam text-3xl text-grey-15 first:mt-0"
        id={value?._key ? headingId(value._key) : undefined}
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        className="mt-8 mb-4 scroll-mt-28 font-bold font-vietnam text-2xl text-grey-15 first:mt-0"
        id={value?._key ? headingId(value._key) : undefined}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-3 font-bold font-vietnam text-grey-15 text-xl first:mt-0">
        {children}
      </h4>
    ),
    // Normal paragraph
    normal: ({ children }) => (
      <p className="mb-4 text-base text-grey-35 leading-relaxed">{children}</p>
    ),
  },

  list: {
    // Bullet list
    bullet: ({ children }) => (
      <ul className="mb-6 ml-6 list-outside list-disc space-y-2 text-grey-35">
        {children}
      </ul>
    ),
    // Numbered list
    number: ({ children }) => (
      <ol className="mb-6 ml-6 list-outside list-decimal space-y-2 text-grey-35">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="pl-2 text-base leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="pl-2 text-base leading-relaxed">{children}</li>
    ),
  },

  marks: {
    // Inline code
    code: ({ children }) => (
      <code className="rounded bg-light-95 px-1.5 py-0.5 font-mono text-primary-75 text-sm">
        {children}
      </code>
    ),
    // Emphasis (italic)
    em: ({ children }) => <em className="italic">{children}</em>,
    // Link
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");

      return (
        <Link
          className="text-primary-75 underline decoration-primary-75/30 transition-colors hover:text-primary-50 hover:decoration-primary-50"
          href={href}
          rel={isExternal ? "noopener noreferrer" : undefined}
          target={isExternal ? "_blank" : undefined}
        >
          {children}
        </Link>
      );
    },
    // Strike-through
    "strike-through": ({ children }) => (
      <span className="text-grey-40 line-through">{children}</span>
    ),
    // Strong (bold)
    strong: ({ children }) => (
      <strong className="font-bold text-grey-15">{children}</strong>
    ),
    // Underline
    underline: ({ children }) => <span className="underline">{children}</span>,
  },

  types: {
    // Flowchart
    flowchart: ({ value }) => {
      if (!(value?.steps && Array.isArray(value.steps))) {
        return null;
      }

      return (
        <Flowchart
          direction={value.direction || "vertical"}
          steps={value.steps}
          title={value.title}
        />
      );
    },
    // Image
    image: ({ value }) => {
      if (!value?.asset) {
        return null;
      }

      const dimensions = getImageDimensions(value) ?? {
        height: 675,
        width: 1200,
      };

      return (
        <BlogImage
          alt={value.alt ?? ""}
          caption={value.caption}
          fullSrc={urlFor(value).width(Math.min(2000, dimensions.width)).url()}
          height={dimensions.height}
          src={urlFor(value).width(Math.min(1440, dimensions.width)).url()}
          width={dimensions.width}
        />
      );
    },

    // Table
    table: ({ value }) => {
      if (!value?.rows) {
        return null;
      }

      return (
        <div className="my-8 overflow-x-auto rounded-xl border-2 border-grey-15">
          <table className="min-w-full border-collapse">
            <tbody>
              {value.rows.map((row: TableRow, rowIndex: number) => (
                <tr
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-light-95"}
                  key={rowIndex}
                >
                  {row.cells?.map((cell: string, cellIndex: number) => (
                    <td
                      className="border-grey-15/10 border-t px-4 py-3 text-grey-35 text-sm"
                      key={cellIndex}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
};
