import Image from "next/image";
import Link from "next/link";
import { PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

export const portableTextComponents: PortableTextComponents = {
  block: {
    // Headings
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-slate-900 mt-12 mb-6 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-slate-900 mt-10 mb-5 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-slate-900 mt-8 mb-4 first:mt-0">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold text-slate-900 mt-6 mb-3 first:mt-0">
        {children}
      </h4>
    ),
    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary-75 bg-slate-50 pl-6 pr-4 py-4 my-6 italic text-slate-700">
        {children}
      </blockquote>
    ),
    // Normal paragraph
    normal: ({ children }) => (
      <p className="text-base text-slate-700 leading-relaxed mb-4">
        {children}
      </p>
    ),
  },

  list: {
    // Bullet list
    bullet: ({ children }) => (
      <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-slate-700">
        {children}
      </ul>
    ),
    // Numbered list
    number: ({ children }) => (
      <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-slate-700">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="text-base leading-relaxed pl-2">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-base leading-relaxed pl-2">{children}</li>
    ),
  },

  marks: {
    // Strong (bold)
    strong: ({ children }) => (
      <strong className="font-bold text-slate-900">{children}</strong>
    ),
    // Emphasis (italic)
    em: ({ children }) => <em className="italic">{children}</em>,
    // Inline code
    code: ({ children }) => (
      <code className="bg-slate-100 text-primary-75 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    // Underline
    underline: ({ children }) => <span className="underline">{children}</span>,
    // Strike-through
    "strike-through": ({ children }) => (
      <span className="line-through text-slate-500">{children}</span>
    ),
    // Link
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");

      return (
        <Link
          href={href}
          className="text-primary-75 hover:text-primary-100 underline decoration-primary-75/30 hover:decoration-primary-100 transition-colors"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </Link>
      );
    },
  },

  types: {
    // Image
    image: ({ value }) => {
      if (!value?.asset) return null;

      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-100">
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt || "Blog image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.alt && (
            <figcaption className="text-sm text-slate-500 text-center mt-3 italic">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },

    // Table
    table: ({ value }) => {
      if (!value?.rows) return null;

      return (
        <div className="my-8 overflow-x-auto">
          <table className="min-w-full border-collapse border border-slate-300">
            <tbody>
              {value.rows.map((row: any, rowIndex: number) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  {row.cells?.map((cell: string, cellIndex: number) => (
                    <td
                      key={cellIndex}
                      className="border border-slate-300 px-4 py-3 text-sm text-slate-700"
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
