"use client";

import type { SanityImageSource } from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  mainImage?: SanityImageWithAlt;
  publishedAt?: string;
  slug: { current: string };
  title: string;
}

interface BlogsClientProps {
  categories: Category[];
  posts: Post[];
}

export default function BlogsClient({ posts, categories }: BlogsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) =>
          post.categories?.some((cat) => cat._id === selectedCategory)
        );

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="font-bold text-3xl text-slate-900 md:text-4xl">Blogs</h1>
        <p className="mt-2 text-slate-600">
          Latest updates, guides and insights.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex min-w-max gap-2 pb-2">
          <button
            className={`rounded-lg px-4 py-2 font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-primary-75 text-white shadow-md"
                : "bg-primary-99 text-primary-75 hover:bg-primary-95"
            }`}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              className={`whitespace-nowrap rounded-lg px-4 py-2 font-medium transition-all ${
                selectedCategory === category._id
                  ? "bg-primary-75 text-white shadow-md"
                  : "bg-primary-99 text-primary-75 hover:bg-primary-95"
              }`}
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-slate-600">
          No posts found
          {selectedCategory !== "all" && " in this category"}.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link href={`/blogs/${post.slug.current}`} key={post._id}>
              <Card className="h-full transition-shadow hover:shadow-md">
                {post.mainImage && (
                  <div className="relative aspect-16/10 w-full overflow-hidden rounded-t-lg">
                    <Image
                      alt={
                        (post.mainImage as SanityImageWithAlt).alt || post.title
                      }
                      className="object-contain"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={urlFor(post.mainImage).url()}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-2">
                    {post.categories?.map((cat) => (
                      <Badge key={cat._id} variant="secondary">
                        {cat.title}
                      </Badge>
                    ))}
                  </div>
                  {post.publishedAt && (
                    <p className="mt-3 text-slate-500 text-xs">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
