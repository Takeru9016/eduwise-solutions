"use client";

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
    <LiveQueryProvider client={clientWithToken}>{children}</LiveQueryProvider>
  );
}
