"use client";

import { useLiveQuery } from "@sanity/preview-kit";
import { type QueryParams } from "next-sanity";

export function PreviewProvider<T>({
  children,
  query,
  params,
  initial,
}: {
  children: (data: T) => React.ReactNode;
  query: string;
  params?: QueryParams;
  initial: T;
}) {
  const [data] = useLiveQuery<T>(initial, query, params);

  return <>{children(data)}</>;
}
