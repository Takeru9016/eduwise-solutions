import { Be_Vietnam_Pro } from "next/font/google";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import { Toaster } from "sonner";
import { PopupForm, MetaPixel, Chatbot } from "@/components";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-vietnam",
});

export const metadata: Metadata = {
  title: "Eduwise Solutions - Your Path to Success",
  description: "Whether you're interested in IT Jobs or professional courses that get you job-ready, we're here to support you every step of the way!",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png" }],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${beVietnamPro.variable} font-vietnam antialiased`}>
        <MetaPixel />
        {children}
        <PopupForm />
        <Toaster
          richColors
          position="top-center"
          toastOptions={{
            classNames: {
              toast:
                "group toast group flex w-full items-center border-l-4 border-green-500 p-4 pr-10 shadow-lg",
              title: "font-medium text-gray-900",
              description: "text-sm text-gray-600 mt-1",
              actionButton:
                "bg-gray-900 text-white px-3 py-1 rounded-md text-sm",
              cancelButton:
                "bg-gray-200 text-gray-800 px-3 py-1 rounded-md ml-2 text-sm",
              error: "border-l-4 border-red-500",
              success: "border-l-4 border-green-500",
            },
          }}
        />
        <SpeedInsights />
        <Analytics />
        <Chatbot />
      </body>
    </html>
  );
}
