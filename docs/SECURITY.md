# Lead-Form Security

How the anti-spam/anti-bot layer works, what to configure, and how to test it.
No secrets are documented here — only variable names. See `.env.example`.

## What's protected

Six public forms, five API endpoints, all going through the same pipeline:

| Form | Endpoint | Notes |
|---|---|---|
| `CourseLeadForm` (every `/courses/[slug]` page) | `/api/linkedin-lead` | Also fires LinkedIn + OpenAI Ads conversions |
| `PopupForm` | `/api/contact-form` | Fires LinkedIn conversion |
| `ContactUs` | `/api/contact-form` | |
| `AWSEnquiryForm` | `/api/aws-enquiry` | |
| `QuizPage` | `/api/quiz-lead` | |
| `ResourceGateForm` | `/api/lead-magnet` | Also sends a Resend email |
| `PaymentForm` (post-payment record only) | `/api/contact-form` | Fires after a real Razorpay payment succeeds; not a public spam target in the same sense, hardened anyway |

Every route follows the same shape: **parse → validate → security checks →
rate limit → persist lead → conversion tracking → response.** Conversion
tracking (OpenAI Pixel/CAPI, LinkedIn) only fires after the lead is
successfully persisted and passes every check above it.

## The pipeline, in order

1. **`parseJsonBody`** (`src/lib/security/guard.ts`) — rejects wrong
   `Content-Type`, oversized bodies (>10KB), and malformed JSON before
   anything else touches the request.
2. **Zod validation** (`src/lib/security/validation.ts`) — the actual
   server-side security boundary. Name/email/mobile/consent are validated
   here regardless of what the client sent; this is independent of and
   does not trust the react-hook-form validation in the browser.
3. **`checkBotSignals`** — in order:
   - **Honeypot** (`honeypot.ts`) — an off-screen field named
     `company_url` (not "honeypot"). If filled, the response is a
     generic success with nothing persisted and no conversions fired, so
     a bot never learns what tripped it.
   - **Origin check** (`origin-check.ts`) — soft same-origin check. Easy
     to spoof deliberately; filters naive cross-origin scripts only.
   - **Form token** (`form-token.ts`) — HMAC-signed, server-issued via
     `GET /api/form-token`, embeds an issued-at time. Rejects missing/
     invalid/expired tokens *when `ANTI_SPAM_SECRET` is set* (see
     "Fail-open" below). Also produces a `tooFast` timing signal (< 1.5s
     between issue and submit) — currently logged, not itself a hard
     reject.
   - **Turnstile** (`turnstile.ts`) — server verifies the widget's token
     against Cloudflare when `TURNSTILE_SECRET_KEY` is set.
4. **`checkLeadRateLimits`** (`rate-limit.ts`, Upstash-backed) — per-IP
   (20 requests / 10 min per route), per-normalized-email and
   per-normalized-mobile (5 / 24h each), active when Upstash env vars are
   set.
5. **`recordLead`** (`src/lib/leads.ts`) — persists to the source's own
   Google Sheets tab. Every cell is passed through
   `sanitizeSheetCell` first (formula-injection guard, see below).
   Returns two independent signals:
   - `duplicateSource` — the existing 24h **cross-sheet** business-level
     duplicate check (unchanged). A person submitting the contact form
     today and a course form tomorrow still gets recorded and flagged,
     not blocked.
   - `isReplay` — a new, narrower **same-sheet**, same-mobile match
     within 5 minutes. Used only to suppress a second ad conversion on a
     retry/double-click; never affects what gets written to Sheets.
6. **Conversion tracking** — only reached if the lead was actually
   persisted and `isReplay` is false. A `crypto.randomUUID()` event_id is
   generated server-side, sent to OpenAI's Conversions API, and returned
   to the browser as `event_id` in the JSON response. The browser only
   fires `oaiq("measure", "lead_created", ...)` and the LinkedIn
   `lintrk` call when `event_id` is present in the response — never on
   button click, never before the server confirms success.

## Fail-open, by design

**None of `ANTI_SPAM_SECRET`, `TURNSTILE_SECRET_KEY`, or the Upstash
`UPSTASH_REDIS_REST_*` variables are set in production yet.** Every check
above that depends on one of them is written to skip itself and log a
warning when its variable is absent, rather than reject the request. This
is deliberate: it's a revenue site, and a missing env var must never take
lead capture down. As each variable is configured, that layer activates
automatically — no code change needed.

Until configured:
- Turnstile widget renders using Cloudflare's public **test** sitekey
  (`1x00000000000000000000AA`, "always passes") — functional UI, zero
  actual bot-blocking.
- The form-token is a naive-bot filter at best even when configured
  (`GET /api/form-token` mints freely to anyone); it stops scripts that
  POST straight to a lead endpoint with no prior request, which is most
  drive-by spam, but is not a hard guarantee.
- Rate limiting is inactive until Upstash is provisioned.

## Formula-injection protection (Google Sheets)

`sanitizeSheetCell` (`src/lib/security/sanitize-sheets.ts`) prefixes any
string cell starting with `=`, `+`, `-`, or `@` with a leading `'`,
forcing spreadsheet software to render it as literal text instead of
evaluating it as a formula. Applied to every cell `recordLead` writes.
This closes a real vulnerability that existed before this work:
`contact-form` and `aws-enquiry` previously had **zero** server-side
validation, so a value like `=HYPERLINK("http://evil","click")` in a name
field would have landed in the sheet as a live formula.

## Rate-limit strategy

Distributed (Upstash Redis), not in-memory — this app runs serverless on
Vercel across multiple instances, where an in-memory `Map` would only
ever see a fraction of the real traffic and give a false sense of
protection. Layered:

- 20 requests / 10 min per IP per route (burst protection)
- 5 / 24h per normalized email
- 5 / 24h per normalized mobile

**Provision Upstash before relying on this in production.** Either the
Vercel Marketplace Upstash integration (auto-populates the env vars) or
upstash.com directly. Also configure **Vercel's own Firewall/WAF** at the
platform level (Project Settings → Firewall) as the authoritative,
infra-level layer — this is zero-code and should be the primary defense
against volumetric abuse; the application-level limiter here is a
secondary, opportunistic layer.

## Cloudflare / edge protection

The domain (`eduwise.solutions`) is served directly by Vercel — confirmed
via response headers (`server: Vercel`, no `cf-ray`). It is **not**
currently behind Cloudflare's proxy/CDN. Recommended production setup,
if/when adopted:
- Cloudflare in proxy mode (orange-cloud) in front of Vercel
- WAF: managed ruleset on, no custom country/ASN blocking (the business
  has legitimate international leads — do not geo-block)
- Rate limiting rules on `/api/*` POST routes as a second layer above
  the application-level limiter
- Bot Fight Mode or Super Bot Fight Mode (available tier permitting)
- Turnstile is already integrated at the application level and works
  independently of whether Cloudflare proxies the domain

If Cloudflare proxying is adopted, `getClientIp` in
`src/lib/security/guard.ts` (reads `x-forwarded-for`) should be revisited
to prefer `CF-Connecting-IP`, which Cloudflare guarantees; `x-forwarded-for`
alone is not trustworthy unless the platform guarantees it (Vercel does,
for the immediate connecting client).

## Testing

Unit tests: `pnpm test` — covers `openai-conversions.ts` (source_url
sanitization, CAPI client with mocked `fetch`). The security lib
(`validation.ts`, `honeypot.ts`, `form-token.ts`, `sanitize-sheets.ts`) is
pure and straightforward to unit test the same way if/when deeper
coverage is wanted; not all of it has dedicated tests yet.

Manual testing, no live OpenAI/Turnstile calls required:

```bash
# Missing required fields -> 400, generic error, nothing in Sheets
curl -X POST http://localhost:3000/api/contact-form \
  -H "Content-Type: application/json" -d '{}'

# Formula-injection attempt -> should land in Sheets prefixed with a
# leading single quote, not as a live formula
curl -X POST http://localhost:3000/api/contact-form \
  -H "Content-Type: application/json" \
  -d '{"firstName":"=cmd|xyz","lastName":"Test","email":"a@example.com","mobile":"9876543210","subject":"Test"}'

# Honeypot filled -> generic success response, nothing persisted
curl -X POST http://localhost:3000/api/contact-form \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Bot","lastName":"Test","email":"a@example.com","mobile":"9876543210","subject":"Test","company_url":"http://spam.example"}'

# Oversized payload -> 413
curl -X POST http://localhost:3000/api/contact-form \
  -H "Content-Type: application/json" \
  -d "{\"firstName\":\"$(python3 -c 'print("A"*20000)')\"}"

# Wrong Content-Type -> 415
curl -X POST http://localhost:3000/api/contact-form \
  -H "Content-Type: text/plain" -d '{}'
```

For a full happy-path test, submit a real course lead form in the browser
and confirm: a row appears in the "LinkedIn" Google Sheet tab, the
response includes `event_id`, the LinkedIn `lintrk` and OpenAI `oaiq`
calls fire (check the Network tab), and re-submitting the same form
within 5 minutes does **not** produce a second `event_id`/conversion but
still records a row.

## Inspecting rejected submissions

Every rejection is logged server-side (Vercel function logs / your log
aggregator) with a reason tag and no PII beyond masked email/phone:

```
[contact-form] Rejected silently: honeypot
[linkedin-lead] Rejected: form-token:expired
[aws-enquiry] Rate limited: rate-limit:email:j***@gmail.com
```

The client never sees these reasons — only a generic error message — so
that a bot iterating against the endpoint can't learn which specific
check it failed.

## Rotating secrets

- `ANTI_SPAM_SECRET`: generate a new value (`openssl rand -base64 32`),
  update in Vercel env vars, redeploy. Old form-tokens issued before
  rotation simply fail verification (fail-closed only once the secret
  *is* set) and those in-flight submissions get treated as failed
  form-token checks — acceptable, users just resubmit.
- `TURNSTILE_SECRET_KEY` / `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: rotate from
  the Cloudflare Turnstile dashboard; update both together (a mismatched
  pair fails every verification).
- `UPSTASH_REDIS_REST_TOKEN`: rotate from the Upstash console.
- `OPENAI_CONVERSIONS_API_KEY`: must be generated from **OpenAI Ads
  Manager → Conversions tab**, not the general platform API keys page —
  a general platform key lacks the `ads.third_party_events.write` scope
  and returns 401.

## Production checklist

- [x] All public forms/endpoints inventoried and hardened
- [x] Server-side validation (Zod) on all 5 lead routes
- [x] Honeypot on all 6 forms
- [x] Signed form token (naive-bot filter, documented as such)
- [x] Timing signal (via form-token issued-at)
- [x] Rate limiting (Upstash-backed, fails open until configured)
- [x] Idempotency / duplicate-vs-replay separation for conversions
- [x] Turnstile architecture (test key active, real keys needed for
      actual blocking)
- [x] Soft origin check
- [x] Payload size / Content-Type / malformed-JSON limits
- [x] Email/mobile normalization
- [x] Spreadsheet formula-injection protection
- [x] PII-safe security logging
- [x] Security headers incl. CSP (Report-Only)
- [x] `.env.example` documents every new variable, no secrets committed
- [x] OpenAI/LinkedIn conversions gated on trusted, persisted leads
- [x] Existing Google Sheets/LinkedIn/course-form behavior preserved
- [ ] `ANTI_SPAM_SECRET` set in Vercel — **not done, your action**
- [ ] Upstash provisioned and env vars set — **not done, your action**
- [ ] Real Turnstile site/secret keys — **not done, your action**
- [ ] Vercel Firewall / Cloudflare configured at the platform level —
      **not done, your action**

## Known limitations

- The form-token is issued freely by `GET /api/form-token` to any
  caller — it proves "a client hit our server first," not "a human is
  present." It is one signal among several, not a CAPTCHA replacement.
- Rate limiting and Turnstile verification are inert (fail open) until
  their env vars are set — read as "architecture ready," not "active in
  production," until you configure them.
- No spam-scoring/threshold system was added beyond hard honeypot/token/
  rate-limit rejections — the codebase didn't have existing spam-rate
  data to calibrate a scoring model against, and a miscalibrated score
  risks rejecting real students, which this task explicitly prioritizes
  avoiding.
- `/api/chat` (the chatbot) and the Razorpay `create-order`/
  `verify-payment` routes were **not** touched — out of scope for "lead/
  contact/course forms," and payment security is a different risk domain
  that deserves its own dedicated review.
