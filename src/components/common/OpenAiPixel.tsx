"use client";

import Script from "next/script";

const OPENAI_PIXEL_ID = "QCitpXBdFMBPkmEeDB4Tvy";

export default function OpenAiPixel() {
  return (
    <>
      <Script id="openai-pixel-init" strategy="afterInteractive">
        {`
          window.oaiq = window.oaiq || function () {
            (window.oaiq.q = window.oaiq.q || []).push(arguments);
          };

          oaiq("init", {
            pixelId: "${OPENAI_PIXEL_ID}"
          });
        `}
      </Script>
      <Script
        src="https://bzrcdn.openai.com/sdk/oaiq.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}
