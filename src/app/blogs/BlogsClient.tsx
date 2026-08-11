"use client";

import type { SanityImageSource } from "@sanity/image-url";
import { gsap } from "gsap";
import { ArrowRight, Newspaper, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { formatDate, prefersReducedMotion } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

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
export interface Post {
  _id: string;
  author?: Author;
  categories?: Category[];
  excerpt?: string | null;
  mainImage?: SanityImageWithAlt;
  publishedAt?: string;
  slug: { current: string };
  title: string;
}

interface BlogsClientProps {
  categories: Category[];
  posts: Post[];
}

export const CARD_TINTS = [
  "bg-primary-99",
  "bg-gold-90",
  "bg-white",
  "bg-primary-90",
  "bg-light-95",
  "bg-primary-95",
] as const;

export function AuthorAvatar({ author }: { author?: Author }) {
  if (author?.image) {
    return (
      <Image
        alt={author.name}
        className="h-8 w-8 shrink-0 rounded-full border-2 border-grey-15 object-cover"
        height={32}
        src={urlFor(author.image).width(64).height(64).url()}
        width={32}
      />
    );
  }
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-grey-15 bg-primary-90 font-bold text-grey-15 text-xs">
      {author?.name?.charAt(0) ?? "E"}
    </div>
  );
}

function FeaturedPost({ post }: { post: Post }) {
  const date = formatDate(post.publishedAt);

  return (
    <Link
      className="group grid overflow-hidden rounded-3xl border-2 border-grey-15 bg-white shadow-[6px_6px_0_0_var(--color-grey-15)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_var(--color-grey-15)] md:grid-cols-2"
      href={`/blogs/${post.slug.current}`}
    >
      <div className="relative h-56 w-full border-grey-15 border-b-2 md:h-full md:border-r-2 md:border-b-0">
        {post.mainImage ? (
          <Image
            alt={(post.mainImage as SanityImageWithAlt).alt ?? post.title}
            className="object-fill transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            src={urlFor(post.mainImage).url()}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary-99">
            <Newspaper className="h-12 w-12 text-grey-40" />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center gap-4 bg-gold-90 p-6 sm:p-10">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-grey-15 bg-white px-3 py-1 font-bold text-grey-15 text-xs">
          <Sparkles className="h-3 w-3" />
          Latest Article
        </span>

        <h2 className="font-black font-vietnam text-2xl text-grey-15 leading-tight sm:text-3xl">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="line-clamp-2 text-grey-35 text-sm sm:text-base">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-3">
          <AuthorAvatar author={post.author} />
          <div className="min-w-0">
            <p className="truncate font-bold text-grey-15 text-sm">
              {post.author?.name ?? "Eduwise Team"}
            </p>
            {date && <p className="text-grey-40 text-xs">{date}</p>}
          </div>
        </div>

        <span className="inline-flex w-fit items-center gap-2 font-bold text-grey-15 text-sm">
          Read Article
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function PostCard({
  post,
  index,
  cardRef,
}: {
  cardRef?: (el: HTMLDivElement | null) => void;
  index: number;
  post: Post;
}) {
  const date = formatDate(post.publishedAt);
  const tint = CARD_TINTS[index % CARD_TINTS.length];

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-3xl border-2 border-grey-15 bg-white shadow-[4px_4px_0_0_var(--color-grey-15)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-grey-15)]"
      ref={cardRef}
    >
      <Link
        className="relative h-44 w-full border-grey-15 border-b-2 sm:h-52"
        href={`/blogs/${post.slug.current}`}
      >
        {post.mainImage ? (
          <Image
            alt={(post.mainImage as SanityImageWithAlt).alt ?? post.title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={urlFor(post.mainImage).url()}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary-99">
            <Newspaper className="h-10 w-10 text-grey-40" />
          </div>
        )}
      </Link>

      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${tint}`}>
        {post.categories && post.categories.length > 0 && (
          <span className="mb-3 inline-flex w-fit items-center rounded-full border-2 border-grey-15 bg-white px-2.5 py-1 font-bold text-grey-15 text-xs">
            {post.categories[0].title}
          </span>
        )}

        <Link href={`/blogs/${post.slug.current}`}>
          <h3 className="mb-2 line-clamp-2 font-bold font-vietnam text-grey-15 text-lg leading-snug">
            {post.title}
          </h3>
        </Link>

        {post.excerpt && (
          <p className="mb-4 line-clamp-2 text-grey-40 text-sm">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center gap-2.5 border-grey-15/15 border-t pt-4">
          <AuthorAvatar author={post.author} />
          <div className="min-w-0">
            <p className="truncate font-bold text-grey-15 text-xs">
              {post.author?.name ?? "Eduwise Team"}
            </p>
            {date && <p className="text-grey-40 text-xs">{date}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogsClient({ posts, categories }: BlogsClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const featuredPost = posts[0];

  const gridPosts = useMemo(() => {
    if (activeCategory === "all") {
      return posts.slice(1);
    }
    return posts.filter((post) =>
      post.categories?.some((cat) => cat._id === activeCategory)
    );
  }, [posts, activeCategory]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || prefersReducedMotion()) {
      return;
    }
    const targets = hero.querySelectorAll("[data-reveal]");
    gsap.fromTo(
      targets,
      { opacity: 0, y: 20 },
      { duration: 0.6, ease: "power2.out", opacity: 1, stagger: 0.1, y: 0 }
    );
  }, []);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length || prefersReducedMotion()) {
      return;
    }
    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      { duration: 0.5, ease: "power2.out", opacity: 1, stagger: 0.08, y: 0 }
    );
    return () => {
      tween.kill();
    };
  }, [gridPosts]);

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-light-97 py-16 sm:py-20 lg:py-24" ref={heroRef}>
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-99 px-4 py-2 font-semibold text-grey-15 text-sm sm:mb-8"
              data-reveal
            >
              <Newspaper className="h-4 w-4" />
              From the Eduwise Blog
            </div>

            <h1
              className="mb-4 font-black font-vietnam text-3xl text-grey-15 tracking-tight sm:mb-6 sm:text-4xl md:text-5xl"
              data-reveal
            >
              Career Advice & Industry Insights
            </h1>

            <p
              className="mx-auto max-w-2xl px-2 text-base text-grey-40 leading-relaxed sm:text-lg"
              data-reveal
            >
              Guides, trends, and stories on AWS, DevOps, AI, and web
              development - written to help you learn and grow.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container">
          {featuredPost && (
            <div className="mb-10 sm:mb-14">
              <FeaturedPost post={featuredPost} />
            </div>
          )}

          <div className="mb-8 sm:mb-12">
            <div className="scrollbar-hide -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
              <button
                className={`shrink-0 whitespace-nowrap rounded-full border-2 border-grey-15 px-4 py-2 font-bold text-sm transition-all duration-200 sm:px-6 sm:py-2.5 ${
                  activeCategory === "all"
                    ? "bg-primary-75 text-grey-15"
                    : "bg-white text-grey-35 hover:bg-primary-99"
                }`}
                onClick={() => setActiveCategory("all")}
                type="button"
              >
                All Posts
              </button>
              {categories.map((category) => (
                <button
                  className={`shrink-0 whitespace-nowrap rounded-full border-2 border-grey-15 px-4 py-2 font-bold text-sm transition-all duration-200 sm:px-6 sm:py-2.5 ${
                    activeCategory === category._id
                      ? "bg-primary-75 text-grey-15"
                      : "bg-white text-grey-35 hover:bg-primary-99"
                  }`}
                  key={category._id}
                  onClick={() => setActiveCategory(category._id)}
                  type="button"
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {gridPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post, index) => (
                <PostCard
                  cardRef={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  index={index}
                  key={post._id}
                  post={post}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-grey-40 text-lg">
                No posts found
                {activeCategory !== "all" && " in this category"}.
              </p>
              <button
                className="mt-4 font-bold text-grey-15 hover:underline"
                onClick={() => setActiveCategory("all")}
                type="button"
              >
                View all posts
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
