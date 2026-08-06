import type { Metadata } from "next";

import { Footer, Navbar } from "@/components";
import { client } from "@/sanity/lib/client";
import { CATEGORIES_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import type { Post } from "./BlogsClient";
import BlogsClient from "./BlogsClient";

interface Category {
  _id: string;
  slug?: { current: string };
  title: string;
}

export const metadata: Metadata = {
  description:
    "Career advice, industry insights, and guides on AWS, DevOps, AI, web development, and more from the Eduwise Solutions team.",
  title: "Blogs",
};

export const revalidate = 60;

export default async function BlogsPage() {
  let posts: Post[] = [];
  let categories: Category[] = [];

  try {
    [posts, categories] = await Promise.all([
      client.fetch<Post[]>(POSTS_QUERY),
      client.fetch<Category[]>(CATEGORIES_QUERY),
    ]);
  } catch (error) {
    console.error("[BlogsPage] Error fetching data:", error);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <BlogsClient categories={categories} posts={posts} />
      </main>
      <Footer />
    </>
  );
}
