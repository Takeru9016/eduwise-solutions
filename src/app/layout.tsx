import { Be_Vietnam_Pro } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-vietnam",
});

export const metadata: Metadata = {
  title: "Eduwise Solutions - Your Path to Success",
  description:
    "Whether you're interested in IT Jobs, MBA programs or professional courses that get you job-ready, we're here to support you every step of the way!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${beVietnamPro.variable} font-vietnam antialiased`}>
        {children}
      </body>
    </html>
  );
}
