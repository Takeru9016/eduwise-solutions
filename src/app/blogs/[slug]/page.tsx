import type { SanityImageSource } from "@sanity/image-url";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { PortableText } from "next-sanity";
import type { Post as ListPost } from "@/app/blogs/BlogsClient";
import { PostCard } from "@/app/blogs/BlogsClient";
import { Footer, Navbar } from "@/components";
import { BlogHero } from "@/components/blog/BlogHero";
import type { BlogCtaCourse } from "@/components/blog/BlogSidebarCta";
import { BlogSidebarCta } from "@/components/blog/BlogSidebarCta";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { StickyApplyBar } from "@/components/courses/StickyApplyBar";
import { portableTextComponents } from "@/components/portable-text-components";
import { PreviewBanner } from "@/components/preview-banner";
import { PreviewProvider } from "@/components/preview-provider";
import { Button } from "@/components/ui/button";
import { extractToc } from "@/lib/blog-toc";
import {
  absoluteUrl,
  articleJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
} from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  BLOG_CTA_COURSE_QUERY,
  POST_BY_SLUG_QUERY,
  RELATED_POSTS_QUERY,
} from "@/sanity/lib/queries";

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
  _updatedAt?: string;
  author?: Author;
  body?: TypedObject[];
  canonicalUrl?: string;
  categories?: Category[];
  faq?: { answer: string; question: string }[];
  h1?: string;
  mainImage?: SanityImageWithAlt;
  noIndex?: boolean;
  publishedAt?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  seoTitle?: string;
  slug: { current: string };
  socialImage?: SanityImageSource;
  title: string;
}

function getPostDescription(post: Post) {
  if (post.seoDescription) {
    return post.seoDescription;
  }
  return post.categories?.length
    ? `${post.title} - ${post.categories.map((c) => c.title).join(", ")} | Eduwise Solutions`
    : post.title;
}

function getShareImageUrl(post: Post) {
  if (post.socialImage) {
    return urlFor(post.socialImage).width(1200).height(630).fit("crop").url();
  }
  return post.mainImage ? urlFor(post.mainImage).url() : null;
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

  const description = getPostDescription(post);
  const metaTitle = post.seoTitle || post.title;

  return {
    alternates: {
      canonical: post.canonicalUrl || absoluteUrl(`/blogs/${slug}`),
    },
    description,
    keywords: post.seoKeywords?.length ? post.seoKeywords : undefined,
    openGraph: {
      description,
      images: getShareImageUrl(post)
        ? [{ url: getShareImageUrl(post) as string }]
        : [],
      title: metaTitle,
      type: "article",
    },
    robots: post.noIndex
      ? { follow: true, index: false }
      : { follow: true, index: true },
    title: post.seoTitle ? { absolute: post.seoTitle } : post.title,
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
  ctaCourse,
  post,
  relatedPosts,
}: {
  ctaCourse: BlogCtaCourse | null;
  post: Post;
  relatedPosts: ListPost[];
}) {
  const date = formatDate(post.publishedAt);
  const readTime = estimateReadTime(post.body);
  const tocItems = extractToc(post.body);

  return (
    <main className="min-h-screen bg-white pb-20 lg:pb-0">
      <BlogHero
        author={post.author}
        categories={post.categories}
        date={date}
        heading={post.h1 || post.title}
        image={post.mainImage}
        readTime={readTime}
      />

      <article className="py-8 sm:py-12">
        <div className="container">
          <div className="mx-auto max-w-3xl lg:hidden">
            <TableOfContents items={tocItems} variant="inline" />
          </div>
        </div>

        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[208px_minmax(0,1fr)_272px]">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <TableOfContents items={tocItems} variant="sidebar" />
              </div>
            </aside>

            <div className="min-w-0">
              <div className="mx-auto max-w-3xl">
                <PortableText
                  components={portableTextComponents}
                  value={post.body ?? ([] as TypedObject[])}
                />
              </div>

              <div className="mx-auto mt-14 max-w-3xl" id="blog-end-cta">
                <div className="flex flex-col items-center gap-6 rounded-3xl border-2 border-grey-15 bg-grey-15 px-6 py-12 text-center sm:px-12">
                  <h2 className="font-black font-vietnam text-2xl text-white sm:text-3xl">
                    Ready to build this skill?
                  </h2>
                  <p className="max-w-xl text-white/70">
                    Explore hands-on programs designed to take you from
                    fundamentals to job-ready.
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

            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <BlogSidebarCta course={ctaCourse} />
              </div>
            </aside>
          </div>
        </div>
      </article>

      <StickyApplyBar
        courseTitle={ctaCourse?.title ?? "Start your tech career"}
        href={ctaCourse ? `/courses/${ctaCourse.slug}` : "/courses"}
        label={ctaCourse ? "View Course" : "Explore"}
        targetId="blog-end-cta"
      />

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

  const ctaCourse = categoryIds.length
    ? await client.fetch<BlogCtaCourse | null>(BLOG_CTA_COURSE_QUERY, {
        categoryIds,
      })
    : null;

  const jsonLd = [
    articleJsonLd({
      authorName: post.author?.name,
      dateModified: post._updatedAt,
      datePublished: post.publishedAt,
      description: getPostDescription(post),
      imageUrl: getShareImageUrl(post),
      slug,
      title: post.h1 || post.title,
    }),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blogs", path: "/blogs" },
      { name: post.title, path: `/blogs/${slug}` },
    ]),
    ...(post.faq?.length ? [faqPageJsonLd(post.faq)] : []),
  ];

  return (
    <>
      {jsonLd.map((schema) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          key={schema["@type"]}
          type="application/ld+json"
        />
      ))}
      <Navbar />
      {isDraftMode ? (
        <>
          <PreviewProvider<Post>
            initial={post}
            params={{ slug }}
            query={POST_BY_SLUG_QUERY}
          >
            {(data) => (
              <BlogPostContent
                ctaCourse={ctaCourse}
                post={data}
                relatedPosts={relatedPosts}
              />
            )}
          </PreviewProvider>
          <PreviewBanner />
        </>
      ) : (
        <BlogPostContent
          ctaCourse={ctaCourse}
          post={post}
          relatedPosts={relatedPosts}
        />
      )}
      <Footer />
    </>
  );
}
