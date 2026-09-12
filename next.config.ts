import type { NextConfig } from "next";

// Report-Only for now, not enforced: this app renders inline scripts for
// GTM/Meta/LinkedIn/OpenAI on statically-generated pages, so a per-request
// nonce isn't available and 'unsafe-inline' is required either way - an
// enforced CSP would add no real XSS protection here without a rendering
// change (moving affected routes to dynamic rendering). Report-Only lets
// violations show up in the browser console for review without risk of
// breaking checkout, tracking, or the Sanity Studio route.
const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://snap.licdn.com https://bzrcdn.openai.com https://challenges.cloudflare.com https://checkout.razorpay.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://cdn.sanity.io https://images.unsplash.com https://i.imgur.com https://d1qnndbrfkpp2h.cloudfront.net https://www.facebook.com https://px.ads.linkedin.com",
  "font-src 'self' data:",
  "connect-src 'self' https://bzr.openai.com https://www.google-analytics.com https://*.google-analytics.com https://challenges.cloudflare.com https://*.sanity.io https://api.razorpay.com https://lumberjack.razorpay.com",
  "frame-src 'self' https://checkout.razorpay.com https://challenges.cloudflare.com https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy-Report-Only", value: CSP_DIRECTIVES },
];

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        headers: SECURITY_HEADERS,
        source: "/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        pathname: "/**",
        protocol: "https",
      },
      {
        hostname: "i.imgur.com",
        pathname: "/**",
        protocol: "https",
      },
      {
        hostname: "cdn.sanity.io",
        pathname: "/**",
        protocol: "https",
      },
      {
        hostname: "d1qnndbrfkpp2h.cloudfront.net",
        pathname: "/**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
