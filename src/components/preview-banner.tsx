import Link from "next/link";

export function PreviewBanner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-yellow-500 text-black px-4 py-2 text-center">
      <p className="text-sm font-medium">
        Preview Mode Enabled{" "}
        <Link
          href="/api/disable-draft"
          className="underline hover:no-underline ml-2"
        >
          Exit Preview
        </Link>
      </p>
    </div>
  );
}
