import Link from "next/link";
import Image from "next/image";

import { Navbar, Footer } from "@/components";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY } from "@/sanity/lib/queries";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { urlFor } from "@/sanity/lib/image";

type Category = { _id: string; title: string; slug?: { current: string } };
type Author = { _id: string; name: string; image?: any };
type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  mainImage?: any;
  categories?: Category[];
  author?: Author;
};

export const revalidate = 60;

export default async function BlogsPage() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY);

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <section className="container mx-auto px-4 py-12">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Blogs</h1>
            <p className="text-slate-600 mt-2">Latest updates, guides and insights.</p>
          </div>

          {posts.length === 0 ? (
            <p className="text-slate-600">No posts yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post._id} href={`/blogs/${post.slug.current}`}>
                  <Card className="h-full hover:shadow-md transition-shadow">
                    {post.mainImage && (
                      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-lg">
                        <Image
                          src={urlFor(post.mainImage).width(800).height(500).url()}
                          alt={post.mainImage.alt || post.title}
                          fill
                          className="object-cover"
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


