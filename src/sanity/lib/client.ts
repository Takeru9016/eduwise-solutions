import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false, // Disabling CDN to allow ISR to fetch fresh data from Sanity
});
