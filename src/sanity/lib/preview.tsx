"use client";

import type { LiveQueryProviderProps } from "@sanity/preview-kit";
import { LiveQueryProvider } from "@sanity/preview-kit";
import { useMemo } from "react";
import { client } from "./client";

export default function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode;
  token: string;
}) {
  const clientWithToken = useMemo(() => client.withConfig({ token }), [token]);

  return (
    // next-sanity and @sanity/preview-kit resolve different (structurally
    // identical) @sanity/client major versions, so TS treats their
    // SanityClient types as nominally incompatible.
    <LiveQueryProvider
      client={clientWithToken as unknown as LiveQueryProviderProps["client"]}
    >
      {children}
    </LiveQueryProvider>
  );
}
