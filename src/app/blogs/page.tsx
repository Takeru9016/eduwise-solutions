import { Navbar, Footer } from "@/components";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY, CATEGORIES_QUERY } from "@/sanity/lib/queries";
import BlogsClient from "./BlogsClient";
import type { Post } from "./BlogsClient";

type Category = { _id: string; title: string; slug?: { current: string } };

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
        <BlogsClient posts={posts} categories={categories} />
      </main>
      <Footer />
    </>
  );
}
