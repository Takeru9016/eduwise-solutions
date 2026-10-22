# Sitemap updates

`/sitemap.xml` combines site-code routes from `src/lib/static-sitemap-routes.ts`
with published courses, indexable blog posts, and active lead magnets from
Sanity. `src/lib/static-sitemap-routes.test.ts` checks that every static App
Router page appears once in the route registry; dynamic detail routes are
covered by their Sanity queries instead.

The sitemap is cached for five minutes as a fallback. Sanity changes to
`course`, `post`, and `leadMagnet` documents can invalidate it immediately
through `POST /api/revalidate-sitemap` after a signed webhook request. If a
Sanity query fails, sitemap generation fails rather than replacing a previous
valid sitemap with one missing all CMS entries. Next.js keeps the last good
ISR response and retries on a later request.

## Configure the Sanity webhook

1. Create a random webhook secret and save it as `SANITY_WEBHOOK_SECRET` in the
   production deployment's environment settings. Keep the value private.
2. In Sanity project settings, create a webhook for the production dataset.
   Set its URL to `https://eduwise.solutions/api/revalidate-sitemap`, method to
   `POST`, and include create, update, and delete events.
3. Filter the webhook to `_type in ["course", "post", "leadMagnet"]`. Use a
   compact projection such as `{"_id": _id, "_type": _type}` so delete events
   still provide the document type and requests stay small.
4. Set the webhook's secret to the same value as `SANITY_WEBHOOK_SECRET` and
   enable Sanity's signed webhook requests. The endpoint verifies the original
   raw body with `@sanity/webhook`; it never trusts a document type from an
   unsigned request.
5. Send a test event, then confirm the endpoint returns `{ "revalidated": true
   }` for a sitemap-backed document. An unrelated document type returns a
   successful skipped response.

The secret must be configured before enabling the webhook. Without it, the
endpoint returns HTTP 503. Invalid signatures return HTTP 401. Do not put the
secret in this file, source code, or chat.

## When site routes change

Add or remove fixed route metadata in `src/lib/static-sitemap-routes.ts` when
adding or removing a static page. The route-registry test runs with `pnpm test`
and fails if a static App Router page is missing or listed more than once.
Course, blog, and resource detail URLs are read from Sanity and should not be
added to the static registry. `src/app/robots.ts` already advertises
`https://eduwise.solutions/sitemap.xml`.
