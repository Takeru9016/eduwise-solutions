import { ArrowRight, Newspaper } from "lucide-react";
import Link from "next/link";
import type { Post } from "@/app/blogs/BlogsClient";
import { PostCard } from "@/app/blogs/BlogsClient";

export default function CourseBlogPreview({
  courseTitle,
  posts,
}: {
  courseTitle: string;
  posts: Post[];
}) {
  return (
    <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-black font-vietnam text-2xl text-grey-15 sm:text-3xl">
          Learn More: Latest Articles
        </h2>
        {posts.length > 0 && (
          <Link
            className="inline-flex items-center gap-2 font-bold text-grey-15 text-sm hover:underline"
            href="/blogs"
          >
            View all articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {posts.map((post, index) => (
            <PostCard index={index} key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-3xl border-2 border-grey-15 bg-primary-99 px-6 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-grey-15 bg-white">
            <Newspaper className="h-7 w-7 text-grey-15" />
          </div>
          <div>
            <h3 className="font-bold font-vietnam text-grey-15 text-lg">
              Articles for {courseTitle} are coming soon
            </h3>
            <p className="mt-1 text-grey-40 text-sm">
              Meanwhile, explore guides and career advice across all our topics.
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-primary-75 px-6 py-3 font-bold text-grey-15 text-sm transition-colors hover:bg-primary-90"
            href="/blogs"
          >
            Browse all articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </section>
  );
}
