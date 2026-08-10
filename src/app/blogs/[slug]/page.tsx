import type { SanityImageSource } from "@sanity/image-url";
import { ArrowLeft, Calendar, Clock, Newspaper } from "lucide-react";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import type { Post as ListPost } from "@/app/blogs/BlogsClient";
import { AuthorAvatar, PostCard } from "@/app/blogs/BlogsClient";
import { Footer, Navbar } from "@/components";
import { portableTextComponents } from "@/components/portable-text-components";
import { PreviewBanner } from "@/components/preview-banner";
import { PreviewProvider } from "@/components/preview-provider";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { POST_BY_SLUG_QUERY, RELATED_POSTS_QUERY } from "@/sanity/lib/queries";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<Post | null>(POST_BY_SLUG_QUERY, { slug });

  if (!post) {
    return { title: "Post Not Found" };
  }

  const description = post.categories?.length
    ? `${post.title} - ${post.categories.map((c) => c.title).join(", ")} | Eduwise Solutions`
    : post.title;

  return {
    description,
    openGraph: {
      description,
      images: post.mainImage ? [{ url: urlFor(post.mainImage).url() }] : [],
      title: post.title,
      type: "article",
    },
    title: post.title,
  };
}

function estimateReadTime(body?: TypedObject[]) {
  if (!body?.length) {
    return 1;
  }
  const wordCount = body.reduce((total, block) => {
    const children = block.children;
    if (!Array.isArray(children)) {
      return total;
    }
    const text = children
      .map((child) =>
        typeof child === "object" && child && "text" in child
          ? String((child as { text?: unknown }).text ?? "")
          : ""
      )
      .join(" ");
    return total + text.split(/\s+/).filter(Boolean).length;
  }, 0);
  return Math.max(1, Math.round(wordCount / 200));
}

function BlogPostContent({
  post,
  relatedPosts,
}: {
  post: Post;
  relatedPosts: ListPost[];
}) {
  const date = formatDate(post.publishedAt);
  const readTime = estimateReadTime(post.body);

  return (
    <main className="min-h-screen bg-white">
      <article className="py-10 sm:py-14">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <Link
              aria-label="Back to blogs"
              className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-white px-4 py-2 font-bold text-grey-15 text-sm transition-colors hover:bg-primary-99"
              href="/blogs"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </Link>

            {post.categories && post.categories.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <span
                    className="inline-flex items-center rounded-full border-2 border-grey-15 bg-primary-90 px-3 py-1 font-bold text-grey-15 text-xs"
                    key={category._id}
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            <h1 className="mb-6 font-black font-vietnam text-3xl text-grey-15 leading-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>

            <div className="mb-8 flex flex-wrap items-center gap-5 border-grey-15/15 border-y py-4">
              <div className="flex items-center gap-2.5">
                <AuthorAvatar author={post.author} />
                <span className="font-bold text-grey-15 text-sm">
                  {post.author?.name ?? "Eduwise Team"}
                </span>
              </div>
              {date && (
                <span className="flex items-center gap-1.5 text-grey-40 text-sm">
                  <Calendar className="h-4 w-4" />
                  {date}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-grey-40 text-sm">
                <Clock className="h-4 w-4" />
                {readTime} min read
              </span>
            </div>
          </div>

          {post.mainImage ? (
            <div className="relative mx-auto mb-10 h-64 w-full max-w-4xl overflow-hidden rounded-3xl border-2 border-grey-15 bg-light-95 sm:h-128">
              <Image
                alt={(post.mainImage as SanityImageWithAlt).alt ?? post.title}
                className="object-fill"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                src={urlFor(post.mainImage).url()}
              />
            </div>
          ) : (
            <div className="mx-auto mb-10 flex h-64 w-full max-w-4xl items-center justify-center rounded-3xl border-2 border-grey-15 bg-primary-99 sm:h-96">
              <Newspaper className="h-14 w-14 text-grey-40" />
            </div>
          )}

          <div className="mx-auto max-w-3xl">
            <PortableText
              components={portableTextComponents}
              value={post.body ?? ([] as TypedObject[])}
            />
          </div>

          <div className="mx-auto mt-14 max-w-3xl">
            <div className="flex flex-col items-center gap-6 rounded-3xl border-2 border-grey-15 bg-grey-15 px-6 py-12 text-center sm:px-12">
              <h2 className="font-black font-vietnam text-2xl text-white sm:text-3xl">
                Ready to build this skill?
              </h2>
              <p className="max-w-xl text-white/70">
                Explore hands-on programs designed to take you from fundamentals
                to job-ready.
              </p>
              <Button
                asChild
                className="rounded-full border-2 border-grey-15 bg-primary-75 px-8 font-bold text-grey-15 shadow-none hover:bg-primary-90"
                size="lg"
              >
                <Link href="/courses">Explore Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="border-grey-15/10 border-t py-12 sm:py-16">
          <div className="container">
            <h2 className="mb-8 text-center font-black font-vietnam text-2xl text-grey-15 sm:text-3xl">
              More from the Blog
            </h2>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
              {relatedPosts.map((related, index) => (
                <PostCard index={index} key={related._id} post={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
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

  const categoryIds = post.categories?.map((c) => c._id) ?? [];
  const relatedPosts = categoryIds.length
    ? await client.fetch<ListPost[]>(RELATED_POSTS_QUERY, {
        categoryIds,
        slug,
      })
    : [];

  return (
    <>
      <Navbar />
      {isDraftMode ? (
        <>
          <PreviewProvider<Post>
            initial={post}
            params={{ slug }}
            query={POST_BY_SLUG_QUERY}
          >
            {(data) => (
              <BlogPostContent post={data} relatedPosts={relatedPosts} />
            )}
          </PreviewProvider>
          <PreviewBanner />
        </>
      ) : (
        <BlogPostContent post={post} relatedPosts={relatedPosts} />
      )}
      <Footer />
    </>
  );
}
