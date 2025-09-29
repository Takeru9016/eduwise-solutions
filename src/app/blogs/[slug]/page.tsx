import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { ArrowLeft } from "lucide-react";

import { Navbar, Footer } from "@/components";
import { Badge } from "@/components/ui/badge";
import { client } from "@/sanity/lib/client";
import { POST_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

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

type Props = { params: { slug: string } };

export const revalidate = 60;

export default async function BlogPostPage({ params }: Props) {
  const post = await client.fetch<Post>(POST_BY_SLUG_QUERY, {
    slug: params.slug,
  });

  if (!post) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
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

          {post.mainImage && (
            <div className="relative w-full aspect-[16/9] mt-8 rounded-lg overflow-hidden">
              <Image
                src={urlFor(post.mainImage).width(1200).height(675).url()}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          )}

          <div className="prose prose-slate max-w-none mt-10">
            <PortableText value={(post.body ?? ([] as TypedObject[]))} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
