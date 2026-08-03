import Image from "next/image";
import Link from "next/link";
import type { PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { Flowchart } from "./flowchart";

interface TableRow {
  _key?: string;
  cells?: string[];
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-primary-75 border-l-4 bg-slate-50 py-4 pr-4 pl-6 text-slate-700 italic">
        {children}
      </blockquote>
    ),
    // Headings
    h1: ({ children }) => (
      <h1 className="mt-12 mb-6 font-bold text-4xl text-slate-900 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 mb-5 font-bold text-3xl text-slate-900 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-4 font-semibold text-2xl text-slate-900 first:mt-0">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-3 font-semibold text-slate-900 text-xl first:mt-0">
        {children}
      </h4>
    ),
    // Normal paragraph
    normal: ({ children }) => (
      <p className="mb-4 text-base text-slate-700 leading-relaxed">
        {children}
      </p>
    ),
  },

  list: {
    // Bullet list
    bullet: ({ children }) => (
      <ul className="mb-6 ml-6 list-outside list-disc space-y-2 text-slate-700">
        {children}
      </ul>
    ),
    // Numbered list
    number: ({ children }) => (
      <ol className="mb-6 ml-6 list-outside list-decimal space-y-2 text-slate-700">
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
      <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-primary-75 text-sm">
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
          className="text-primary-75 underline decoration-primary-75/30 transition-colors hover:text-primary-100 hover:decoration-primary-100"
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
      <span className="text-slate-500 line-through">{children}</span>
    ),
    // Strong (bold)
    strong: ({ children }) => (
      <strong className="font-bold text-slate-900">{children}</strong>
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

      // Get alignment from value (defaults to center)
      const alignment =
        (value.alignment as "left" | "center" | "right") || "center";

      // Map alignment to Tailwind classes
      const alignmentClasses: Record<string, string> = {
        center: "mx-auto",
        left: "mr-auto",
        right: "ml-auto",
      };

      return (
        <figure className={`my-8 ${alignmentClasses[alignment]}`}>
          <div className="relative w-full overflow-hidden rounded-lg">
            <Image
              alt={value.alt || "Blog image"}
              className="h-auto w-full"
              height={600}
              sizes="(max-width: 768px) 100vw, 800px"
              src={urlFor(value).url()}
              width={800}
            />
          </div>
          {value.alt && (
            <figcaption className="mt-2 text-center text-slate-600 text-sm italic">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },

    // Table
    table: ({ value }) => {
      if (!value?.rows) {
        return null;
      }

      return (
        <div className="my-8 overflow-x-auto">
          <table className="min-w-full border-collapse border border-slate-300">
            <tbody>
              {value.rows.map((row: TableRow, rowIndex: number) => (
                <tr
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  key={rowIndex}
                >
                  {row.cells?.map((cell: string, cellIndex: number) => (
                    <td
                      className="border border-slate-300 px-4 py-3 text-slate-700 text-sm"
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
