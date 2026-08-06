import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";

import "./globals.css";
import { Toaster } from "sonner";
import { LinkedInInsight, MetaPixel, PopupForm } from "@/components";
import { organizationJsonLd, SITE_URL } from "@/lib/seo";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  variable: "--font-vietnam",
  weight: ["400", "500", "600", "700"],
});

// Sitewide default for Server Components fetching Sanity data (e.g. Navbar,
// Footer) that don't declare their own revalidate. Matches the 60s interval
// already used on courses/blogs pages.
export const revalidate = 60;

export const metadata: Metadata = {
  description:
    "Whether you're interested in IT Jobs or professional courses that get you job-ready, we're here to support you every step of the way!",
  icons: {
    apple: [{ url: "/favicon/apple-touch-icon.png" }],
    icon: [
      { url: "/favicon/favicon.ico" },
      { sizes: "16x16", type: "image/png", url: "/favicon/favicon-16x16.png" },
      { sizes: "32x32", type: "image/png", url: "/favicon/favicon-32x32.png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    description:
      "Whether you're interested in IT Jobs or professional courses that get you job-ready, we're here to support you every step of the way!",
    siteName: "Eduwise Solutions",
    title: "Eduwise Solutions - Your Path to Success",
    type: "website",
    url: SITE_URL,
  },
  title: {
    default: "Eduwise Solutions - Your Path to Success",
    template: "%s | Eduwise Solutions",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${beVietnamPro.variable} font-vietnam antialiased`}>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static, code-generated JSON-LD, not user input
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
          type="application/ld+json"
        />
        <MetaPixel />
        <LinkedInInsight />
        {children}
        <PopupForm />
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            classNames: {
              actionButton:
                "bg-gray-900 text-white px-3 py-1 rounded-md text-sm",
              cancelButton:
                "bg-gray-200 text-gray-800 px-3 py-1 rounded-md ml-2 text-sm",
              description: "text-sm text-gray-600 mt-1",
              error: "border-l-4 border-red-500",
              success: "border-l-4 border-green-500",
              title: "font-medium text-gray-900",
              toast:
                "group toast group flex w-full items-center border-l-4 border-green-500 p-4 pr-10 shadow-lg",
            },
          }}
        />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
