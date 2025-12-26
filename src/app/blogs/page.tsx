"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { Navbar, Footer } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

type Category = { _id: string; title: string; slug?: { current: string } };
type Author = { _id: string; name: string; image?: SanityImageSource };
type SanityImageWithAlt = SanityImageSource & { alt?: string };
type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  mainImage?: SanityImageWithAlt;
  categories?: Category[];
  author?: Author;
};

export default function BlogsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsData, categoriesData] = await Promise.all([
          client.fetch<Post[]>(POSTS_QUERY),
          client.fetch<Category[]>(CATEGORIES_QUERY),
        ]);
        setPosts(postsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    // Initial fetch
    fetchData();

    // Set up polling to refetch every 10 seconds (matching previous revalidate setting)
    const interval = setInterval(fetchData, 10000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) =>
          post.categories?.some((cat) => cat._id === selectedCategory)
        );

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="container mx-auto px-4 py-12">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Blogs
            </h1>
            <p className="text-slate-600 mt-2">
              Latest updates, guides and insights.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex gap-2 min-w-max pb-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-primary-75 text-white shadow-md"
                    : "bg-primary-99 text-primary-75 hover:bg-primary-95"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category._id
                      ? "bg-primary-75 text-white shadow-md"
                      : "bg-primary-99 text-primary-75 hover:bg-primary-95"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <p className="text-slate-600">Loading posts...</p>
          ) : filteredPosts.length === 0 ? (
            <p className="text-slate-600">
              No posts found
              {selectedCategory !== "all" && " in this category"}.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link key={post._id} href={`/blogs/${post.slug.current}`}>
                  <Card className="h-full hover:shadow-md transition-shadow">
                    {post.mainImage && (
                      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-lg">
                        <Image
                          src={urlFor(post.mainImage).url()}
                          alt={post.mainImage.alt || post.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 flex-wrap">
                        {post.categories?.map((cat) => (
                          <Badge key={cat._id} variant="secondary">
                            {cat.title}
                          </Badge>
                        ))}
                      </div>
                      {post.publishedAt && (
                        <p className="text-xs text-slate-500 mt-3">
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
      </main>
      <Footer />
    </>
  );
}
