import Link from "next/link";

export function PreviewBanner() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 bg-yellow-500 px-4 py-2 text-center text-black">
      <p className="font-medium text-sm">
        Preview Mode Enabled{" "}
        <Link
          className="ml-2 underline hover:no-underline"
          href="/api/disable-draft"
        >
          Exit Preview
        </Link>
      </p>
    </div>
  );
}
