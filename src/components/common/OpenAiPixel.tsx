"use client";

import Script from "next/script";

const OPENAI_PIXEL_ID = "QCitpXBdFMBPkmEeDB4Tvy";

export default function OpenAiPixel() {
  return (
    <Script id="openai-pixel-init" strategy="afterInteractive">
      {`
        (function (w, d, s, u) {
          if (w.oaiq) return;
          var q = function () {
            q.q.push(arguments);
          };
          q.q = [];
          w.oaiq = q;
          var js = d.createElement(s);
          js.async = true;
          js.src = u;
          var f = d.getElementsByTagName(s)[0];
          f.parentNode.insertBefore(js, f);
        })(window, document, "script", "https://bzrcdn.openai.com/sdk/oaiq.min.js");

        oaiq("init", {
          pixelId: "${OPENAI_PIXEL_ID}"
        });
      `}
    </Script>
  );
}
