"use client";

import { useEffect, useState } from "react";

/**
 * Fetches a server-issued, signed anti-spam token on mount and refreshes
 * it periodically so a long-open form (e.g. the delayed PopupForm) never
 * submits with an expired token. Returns "" until the first token
 * arrives - callers should treat an empty token as "not ready yet" rather
 * than blocking submission on it, since the server fails open when
 * ANTI_SPAM_SECRET isn't configured.
 */
const REFRESH_INTERVAL_MS = 20 * 60 * 1000;

export function useFormToken(): string {
  const [token, setToken] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchToken() {
      try {
        const res = await fetch("/api/form-token", { cache: "no-store" });
        if (!res.ok) {
          return;
        }
        const data = await res.json();
        if (!cancelled && typeof data.token === "string") {
          setToken(data.token);
        }
      } catch {
        // Non-fatal - form still submits, just without a fresh token.
      }
    }

    fetchToken();
    const interval = setInterval(fetchToken, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return token;
}
