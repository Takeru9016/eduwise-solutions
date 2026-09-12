"use client";

import Script from "next/script";
import { useEffect, useId, useRef } from "react";

// Cloudflare's official public TEST sitekey ("always passes", visible
// widget) - NOT a real secret, documented at
// developers.cloudflare.com/turnstile/troubleshooting/testing/. The
// widget renders and functions correctly with this key, but it provides
// NO actual bot-blocking until NEXT_PUBLIC_TURNSTILE_SITE_KEY is set to a
// real production sitekey from the Cloudflare dashboard (and the matching
// TURNSTILE_SECRET_KEY is set server-side).
const DEFAULT_TEST_SITE_KEY = "1x00000000000000000000AA";
const POLL_INTERVAL_MS = 200;

interface TurnstileApi {
  remove: (widgetId: string) => void;
  render: (
    container: HTMLElement,
    options: {
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      sitekey: string;
    }
  ) => string;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function TurnstileWidget({
  onVerify,
}: {
  onVerify: (token: string) => void;
}) {
  const containerId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const onVerifyRef = useRef(onVerify);
  onVerifyRef.current = onVerify;

  useEffect(() => {
    const container = containerRef.current;
    // biome-ignore lint/suspicious/noUnnecessaryConditions: containerRef can be null on the very first effect run in some React versions/modes
    if (!container) {
      return;
    }

    let widgetId: string | null = null;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const mount = (api: TurnstileApi) => {
      const siteKey =
        process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || DEFAULT_TEST_SITE_KEY;
      widgetId = api.render(container, {
        callback: (token) => onVerifyRef.current(token),
        "expired-callback": () => onVerifyRef.current(""),
        sitekey: siteKey,
      });
    };

    const existingApi = window.turnstile;
    if (existingApi) {
      mount(existingApi);
    } else {
      intervalId = setInterval(() => {
        const api = window.turnstile;
        if (api) {
          if (intervalId) {
            clearInterval(intervalId);
          }
          mount(api);
        }
      }, POLL_INTERVAL_MS);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      const api = window.turnstile;
      if (widgetId && api) {
        api.remove(widgetId);
      }
    };
  }, []);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <div id={containerId} ref={containerRef} />
    </>
  );
}
