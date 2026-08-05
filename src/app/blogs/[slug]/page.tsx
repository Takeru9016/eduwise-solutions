import type { SanityImageSource } from "@sanity/image-url";
import { ArrowLeft } from "lucide-react";
import { draftMode } from "next/headers";
import Link from "next/link";
import { PortableText } from "next-sanity";

import { Footer, Navbar } from "@/components";
import { portableTextComponents } from "@/components/portable-text-components";
import { PreviewBanner } from "@/components/preview-banner";
import { PreviewProvider } from "@/components/preview-provider";
import { Badge } from "@/components/ui/badge";
import { client } from "@/sanity/lib/client";
import { POST_BY_SLUG_QUERY } from "@/sanity/lib/queries";

interface Category {
  _id: string;
  slug?: { current: string };
  title: string;
}
interface Author {
  _id: string;
  image?: SanityImageSource;
  name: string;
}
type SanityImageWithAlt = SanityImageSource & { alt?: string };
interface TypedObject {
  _type: string;
  [key: string]: unknown;
}
interface Post {
  _id: string;
  author?: Author;
  body?: TypedObject[];
  categories?: Category[];
  mainImage?: SanityImageWithAlt;
  publishedAt?: string;
  slug: { current: string };
  title: string;
}

export const revalidate = 10; // Revalidate every 10 seconds

function BlogPostContent({ post }: { post: Post }) {
  return (
    <article className="container mx-auto max-w-3xl px-4 py-12">
      <div className="mb-6">
        <Link
          aria-label="Back to blogs"
          className="inline-flex items-center gap-2 text-slate-600 text-sm hover:text-primary-75"
          href="/blogs"
        >
          <ArrowLeft size={16} />
          Back to Blogs
        </Link>
      </div>
      <h1 className="font-bold text-3xl text-slate-900 md:text-4xl">
        {post.title}
      </h1>
      {post.publishedAt && (
        <p className="mt-2 text-slate-500 text-sm">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {post.categories?.map((category) => (
          <Badge key={category._id} variant="secondary">
            {category.title}
          </Badge>
        ))}
      </div>

      <div className="prose prose-slate mt-10 max-w-none">
        <PortableText
          components={portableTextComponents}
          value={post.body ?? ([] as TypedObject[])}
        />
      </div>
    </article>
  );
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = await params;
  const isDraftMode = (await draftMode()).isEnabled;

  const post = await client.fetch<Post>(POST_BY_SLUG_QUERY, {
    slug,
  });

  if (!post) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {isDraftMode ? (
          <>
            <PreviewProvider<Post>
              initial={post}
              params={{ slug }}
              query={POST_BY_SLUG_QUERY}
            >
              {(data) => <BlogPostContent post={data} />}
            </PreviewProvider>
            <PreviewBanner />
          </>
        ) : (
          <BlogPostContent post={post} />
        )}
      </main>
      <Footer />
    </>
  );
}
