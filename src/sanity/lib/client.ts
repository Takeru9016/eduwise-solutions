import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disabling CDN to allow ISR to fetch fresh data from Sanity
});
