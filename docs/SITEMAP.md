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

## Set up the Sanity webhook secret

The same random value must be saved in the production Vercel project and in
Sanity's webhook configuration. Sanity signs each webhook request with this
secret; the endpoint checks the signature before revalidating the sitemap.

### 1. Generate a secret

Generate a fresh 32-byte value in a trusted terminal:

```sh
openssl rand -hex 32
```

Keep the output private. Do not commit it, paste it into chat, or put it in this
guide. Use the same value in the next two steps.

### 2. Add it to Vercel

1. Open the Eduwise project in Vercel and go to **Settings → Environment
   Variables**.
2. Add a variable named `SANITY_WEBHOOK_SECRET` and paste the generated value
   into its value field.
3. Select **Production**. Add **Preview** only if a separate Sanity webhook
   will target preview deployments.
4. Save the variable and redeploy the production branch so the running
   deployment receives it.

### 3. Create the webhook in Sanity

1. Open the correct Sanity project, then go to **API → Webhooks → Create
   webhook**. Choose the production dataset.
2. Set the webhook name to `Revalidate production sitemap` and the URL to
   `https://eduwise.solutions/api/revalidate-sitemap`.
3. Choose **POST** and select create, update, and delete events.
4. Set the filter to:

   ```groq
   _type in ["course", "post", "leadMagnet"] ||
   (delta::operation() == "delete" &&
     delta::before()._type in ["course", "post", "leadMagnet"])
   ```

5. Set a compact projection. The previous document fallback keeps delete
   events identifiable:

   ```groq
   {
     "_id": _id,
     "_type": coalesce(_type, delta::before()._type)
   }
   ```

6. Paste the same value used in Vercel into Sanity's **Secret** field and save
   the webhook. The secret enables Sanity's `sanity-webhook-signature` header;
   do not replace it with a custom bearer token or add the secret to the JSON
   body.

### 4. Verify delivery

Publish or update a course, post, or active lead magnet in the production
dataset. In Sanity's webhook delivery log, confirm the request to the endpoint
returns HTTP 200 with `{ "revalidated": true }`. Check
`https://eduwise.solutions/sitemap.xml` and confirm the corresponding URL is
present with its latest `lastModified` value. The sitemap is regenerated on
the next request after revalidation.

An unrelated document type returns HTTP 200 with `skipped: true`. HTTP 503
means `SANITY_WEBHOOK_SECRET` is missing from the running deployment; redeploy
after adding it. HTTP 401 means the signature is absent, expired, or does not
match the secret saved in Sanity. HTTP 413 means the webhook projection is too
large; use the compact projection above.

## When site routes change

Add or remove fixed route metadata in `src/lib/static-sitemap-routes.ts` when
adding or removing a static page. The route-registry test runs with `pnpm test`
and fails if a static App Router page is missing or listed more than once.
Course, blog, and resource detail URLs are read from Sanity and should not be
added to the static registry. `src/app/robots.ts` already advertises
`https://eduwise.solutions/sitemap.xml`.
