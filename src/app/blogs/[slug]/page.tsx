import Link from "next/link";
import { PortableText } from "next-sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ArrowLeft } from "lucide-react";
import { draftMode } from "next/headers";

import { Navbar, Footer } from "@/components";
import { Badge } from "@/components/ui/badge";
import { portableTextComponents } from "@/components/portable-text-components";
import { client } from "@/sanity/lib/client";
import { POST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { PreviewProvider } from "@/components/preview-provider";
import { PreviewBanner } from "@/components/preview-banner";

type Category = { _id: string; title: string; slug?: { current: string } };
type Author = { _id: string; name: string; image?: SanityImageSource };
type SanityImageWithAlt = SanityImageSource & { alt?: string };
type TypedObject = { _type: string; [key: string]: unknown };
type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  mainImage?: SanityImageWithAlt;
  body?: TypedObject[];
  categories?: Category[];
  author?: Author;
};

export const revalidate = 10; // Revalidate every 10 seconds

function BlogPostContent({ post }: { post: Post }) {
  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-6">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary-75"
          aria-label="Back to blogs"
        >
          <ArrowLeft size={16} />
          Back to Blogs
        </Link>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
        {post.title}
      </h1>
      {post.publishedAt && (
        <p className="text-sm text-slate-500 mt-2">
          {new Date(post.publishedAt).toLocaleDateString()}
        </p>
      )}

      <div className="flex items-center gap-2 flex-wrap mt-4">
        {post.categories?.map((category) => (
          <Badge key={category._id} variant="secondary">
            {category.title}
          </Badge>
        ))}
      </div>

      <div className="prose prose-slate max-w-none mt-10">
        <PortableText
          value={post.body ?? ([] as TypedObject[])}
          components={portableTextComponents}
        />
      </div>
    </article>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
              query={POST_BY_SLUG_QUERY}
              params={{ slug }}
              initial={post}
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
