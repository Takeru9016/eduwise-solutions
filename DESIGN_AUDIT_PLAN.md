# Design Audit & Improvement Plan

**Pass 2 — full-depth audit.** Every skill run to its fullest: Impeccable's 7 reference docs read in full and checked line-by-line against the codebase; UI/UX Pro Max's actual `search.py` CLI run (`--design-system` + `ux`/`color` domain queries); design-taste-frontend's complete Section 14 pre-flight checklist (~60 items) run against the live site plus its Section 11.B redesign audit; Emil's full animation review table applied to every `gsap`/motion call in the codebase. Findings only — nothing implemented. Supersedes the pass-1 plan; all pass-1 findings are folded in below, several sharpened or corrected with new evidence.

Order run: **Impeccable → UI/UX Pro Max → Taste (design-taste-frontend) → Frontend Design → Emil's (emil-design-eng)**.

---

## Section 11.B — Redesign Audit Baseline (Taste protocol)

Documented before any further findings, per Taste's mandatory "audit before touching" step.

**Brand tokens (current):**
- Primary/accent color: `--primary-75: #10B981` — this is **Tailwind's stock `emerald-500`, unmodified**. The entire primary scale (`primary-50` through `primary-99`) is Tailwind's default emerald ramp converted to HSL, not a custom brand hue.
- Secondary accent: gold (`#F0C333`), custom, not a stock Tailwind value.
- Neutrals: two disconnected systems — `grey-10` through `grey-60` are **pure achromatic gray** (`0 0% X%`, zero chroma); `grey-70`/`light-95`/`border`/`input` carry a cool blue-ish tint (hue ~220) instead. Neither is tinted toward the actual brand hue (~156-162, the emerald).
- Type: Be Vietnam Pro, single family, both display and body, 147 explicit uses of `font-vietnam` plus the body default.
- Radius/shadow system ("sticker" identity): `border-2 border-grey-15`, offset shadow `shadow-[Npx_Npx_0_0_var(--color-grey-15)]`, `rounded-2xl`/`rounded-3xl`. Applied consistently across every page redesigned this session.
- Logo: `/home/eduwise.png`, used consistently.

**IA (route tree, 18 top-level pages):** `/`, `/about`, `/blogs`, `/blogs/[slug]`, `/certifications/aws`, `/contact`, `/courses`, `/courses/[slug]`, `/faq`, `/press`, `/pricing`, `/privacy`, `/quiz`, `/refund`, `/resources`, `/resources/[slug]`, `/studio/[[...tool]]`, `/terms`, `/testimonials`. Flat, no deep nesting, no orphaned routes found.

**Patterns to preserve:** the sticker border+offset-shadow system, the numbered-timeline curriculum accordion (already a good long-list pattern per Taste's own rules), the real-photo testimonial cards, the alternating `bg-white`/`bg-light-97` section rhythm.

**Patterns to retire:** the pill-badge eyebrow (see #1 below), the dead pre-redesign components carrying old gradient/glass aesthetics (`ComingSoon`, `PartnersLogo`, `CTASection`, `LearningJourney`, `WebinarBanner`), `not-found.tsx`.

**Dial reading of current site:** `DESIGN_VARIANCE ≈ 5` (consistent grid, mild asymmetry via the `[1fr_1.4fr]`-style two-column sections, no real overlap/diagonal/masonry), `MOTION_INTENSITY ≈ 4` (fade+translateY scroll reveals only, no scroll-hijack, no springs, no gestures), `VISUAL_DENSITY ≈ 4` (standard `py-16` to `py-24` section spacing, card-grid heavy but not cockpit-dense). This is the honest starting point for any future visual work, not the 8/6/4 baseline Taste defaults to for greenfield builds.

**SEO baseline:** `sitemap.ts` and `robots.ts` both present. Every route has explicit `metadata` except homepage (correctly inherits a real, specific title/description from `layout.tsx` — not a gap) and the Studio route (correctly excluded, it's the CMS admin, presumably disallowed in `robots.ts`).

---

## P0 — Fix First (live, high-visibility, cheap)

### 1. `not-found.tsx` is a different website — and fails Taste's Section 14 checklist on multiple independent axes, not just "looks off-brand"
Confirmed against the full pre-flight checklist, not just a vibe check:
- **Color Consistency Lock: FAIL.** Uses slate/purple/pink/cyan/emerald/blue/red across one screen; the rest of the site uses exactly two accents (primary emerald, gold).
- **Shape Consistency Lock: FAIL.** `rounded-lg` here vs. `rounded-2xl`/`rounded-3xl` everywhere else.
- **Gradient text ban: FAIL.** `bg-clip-text` + blue→purple→pink.
- **Continuous/decorative animation ban: FAIL**, independently confirmed by UI/UX Pro Max's own `ux` domain database (`animate-bounce on icons` is its own listed "Bad" example, unprompted — this project's `not-found.tsx` uses `animate-bounce`, `animate-ping`, and `animate-spin` on purely decorative shapes, exactly the cited anti-pattern).
- **Likely hydration-mismatch bug**, not just style: `Math.random()` for 20 particle positions runs inline during render, so SSR output and client hydration output differ.
- **No `prefers-reduced-motion` handling** (see #2 below — same root cause, this file is the worst single offender).
- **Fix:** rebuild on the sticker system. Cheapest, highest-visibility item in the whole plan — one file, and it's the one page every mistyped-URL visitor lands on.
- Flagged by: Impeccable, UI/UX Pro Max (tool-verified), Taste, Emil's.

### 2. Zero `prefers-reduced-motion` support, anywhere, on any animation
```
grep -rn "prefers-reduced-motion\|useReducedMotion" src/ → 0 results
```
9 live components run GSAP `ScrollTrigger`-driven fade+translateY reveals (`HeroSection` via bottom-row stats, `AboutUs`, `BenefitSection`, `HowItWorks`, `FAQs`, `CourseTemplate`, `OurCourse`, `PricingPage`, `testimonials-three`) — **none of them check for reduced-motion.** Impeccable calls this "not optional," Taste's Section 6.B calls it "mandatory, non-negotiable" for anything above `MOTION_INTENSITY 3`, and UI/UX Pro Max lists `reduced-motion` under its CRITICAL-priority Accessibility category. This is the single most consistent, cross-skill-corroborated finding in the entire audit.
- **Fix:** one shared check (`window.matchMedia('(prefers-reduced-motion: reduce)')`, or wrap the shared `gsap.registerPlugin` bootstrap) gates all 9 call sites. Small, mechanical, high-value — arguably higher priority than #1 since it affects every page, not just the 404.
- Flagged by: Impeccable, UI/UX Pro Max, Taste.

### 3. No button press feedback anywhere (`src/components/ui/button.tsx`)
Base `Button` has `transition-colors` and focus states, zero `:active` press feedback (`active:scale-*`). Every CTA site-wide inherits from this one file. The many hand-rolled `<Link className="...">` pseudo-buttons (Hero, Footer, BenefitSection, etc.) have `hover:-translate-y-0.5` but no press state either — confirmed on a second pass, this is systemic, not a one-off.
- **Fix:** `active:scale-[0.97] transition-transform` in the base Button; same pattern on the hand-rolled Link-buttons. One file + a find-and-apply pass.
- Flagged by: Emil's.

### 4. `border-l-4` accent stripes — the most recognizable AI-dashboard tell, confirmed live in 2 places
- `src/components/portable-text-components.tsx:16` — blockquote `border-l-4 border-primary-75`, renders in every blog post / course-FAQ blockquote.
- `src/app/layout.tsx:88-92` — Sonner toast success/error: `border-l-4 border-red-500` / `border-green-500`, fires on every form submit site-wide (contact, AWS enquiry, lead magnet, quiz).
- **Fix:** restructure, don't reskin. Blockquote: full border + tint or a leading glyph. Toasts: full-border card + leading check/alert icon (icon already carries the semantic meaning; the color stripe is redundant with it).
- Flagged by: Impeccable.

### 5. No skip-to-content link
```
grep -rn "skip to\|#main-content" → 0 results
```
Every page runs the full mega-menu Navbar (desktop) or drawer (mobile) before `<main>`. WCAG 2.4.1 Bypass Blocks. Cheapest real accessibility fix available: one `<a href="#main-content" class="sr-only focus:not-sr-only ...">Skip to main content</a>` plus an `id="main-content"` on each page's `<main>`.
- Flagged by: Impeccable, UI/UX Pro Max.

### 6. Testimonial quotes are unclamped, can run to full-paragraph length
`src/components/ui/testimonials-three.tsx` renders `{t.content}` with no `line-clamp`. Sanity testimonial content includes multi-sentence quotes (confirmed: "My journey with Eduwise has been truly life-changing. The mentors not only taught me with clarity but also guided me with constant support until I got placed..." — 3+ sentences, well past Taste's "quotes ≤ 3 lines, it's a snippet not a full review" rule) sitting in a `columns-*` masonry grid where uneven card heights already look accidental rather than designed.
- **Fix:** `line-clamp-3` on the quote paragraph (content itself lives in Sanity and can be shortened there too, but the display-layer clamp is the safety net regardless of what an editor pastes in later).
- Flagged by: Taste.

---

## P1 — Structural (real design-system decisions, not mechanical fixes)

### 7. The eyebrow pill-badge is on nearly every section, everywhere — Taste's own "#1 violated rule in production tests," confirmed exactly
The `<Sparkles /> + label` pill (`inline-flex items-center gap-2 rounded-full border-2 border-grey-15 bg-*-99 px-4 py-2`) appears in **25 files**. On the homepage alone: DomainsShowcase, ProgramSection, BenefitSection, FAQs, testimonials-three — 5 of 8 sections. Taste's rule: max 1 eyebrow per 3 sections; a page with 9 sections may use at most 3. This site runs at roughly double that ceiling on the homepage and repeats the exact same badge shape on About, Pricing, FAQ, Quiz, Resources, every AWS cert section, course template (×2), and even the legal pages.
- **This is a decision, not a patch.** The badge is currently load-bearing as a recognizable signature. Recommend: keep it for 1-2 sections per page max (hero-adjacent + one priority CTA section), drop it everywhere else, let the headline alone carry the section.
- Flagged by: Taste.

### 8. Four of eight homepage sections share the identical two-column shell — a softer, structural cousin of the eyebrow finding
Hero, HowItWorks, BenefitSection, and FAQs all use the same `grid ... lg:grid-cols-[Xfr_Yfr]` asymmetric two-column shell: headline + copy + CTA on the left, a different content type (photo collage / timeline / card grid / accordion) on the right. The *content* inside each is genuinely different, but the *composition* repeats 4 times in an 8-section page. Taste's Section-Layout-Repetition rule wants at least 4 distinct layout families across 8 sections — this page technically has more than 4 families if you count by content type, but reads as more repetitive than that count suggests because the outer shell is identical every time.
- **Not urgent, but worth a conscious look** the next time any of these four sections gets touched: break at least one out of the shared shell (e.g., a full-width treatment for BenefitSection or FAQs) to break the rhythm.
- Flagged by: Taste (new finding this pass, not caught in pass 1).

### 9. One font family, no display/body pairing — **nuanced from pass 1, not simply "wrong"**
Impeccable's own typography reference (read in full this pass) directly contradicts the blanket "must pair two fonts" framing from pass 1: *"You often don't need a second font. One well-chosen font family in multiple weights creates cleaner hierarchy than two competing typefaces."* Be Vietnam Pro is already a good, non-cliché choice (not on the reflex-font ban list). The real question isn't "one font vs. two," it's whether the **single font is doing enough hierarchy work** — and on that count, the site actually checks out reasonably well: heading sizes step consistently (`text-3xl → sm:text-4xl → lg:text-5xl` pattern repeated correctly across components, not muddy), `tracking-tight`/`tracking-tighter` applied 27 times for optical correction, weight contrast (`font-black` headlines vs `font-bold` subheads vs regular body) is used throughout.
- **Revised recommendation:** no urgent action. If this is revisited, frame it as "should we add a second font for genuine contrast" (a real creative decision) rather than "we're missing a pairing" (implies a defect that isn't actually there).
- Flagged by: Impeccable (corrected from pass 1 after reading the full reference doc).

### 10. Color tokens: HSL not OKLCH, AND untinted/mismatched neutrals, AND the brand color is stock Tailwind emerald
Three separate, compounding findings from the same section of `globals.css`:
- **HSL, not OKLCH** (pass-1 finding, confirmed): the full palette is defined as `H S% L%` triples. Perceptually non-uniform lightness steps.
- **NEW — neutrals are inconsistent with each other, not just untinted:** `grey-10` through `grey-60` are pure achromatic gray (`0 0% X%`, literally zero chroma). But `grey-70`, `light-95`, `border`, and `input` carry a cool hue-220 (blue-ish) tint instead — neither matches the actual brand hue (~156-162, emerald). So it's not "neutrals aren't tinted," it's "some neutrals are pure gray and others are tinted toward a color that isn't the brand's."
- **NEW — the primary color is unmodified stock Tailwind emerald.** `--primary-75: 162 83% 39%` converts exactly to `#10B981`, which is Tailwind's default `emerald-500` hex value, unedited. The entire `primary-50` through `primary-99` ramp is Tailwind's stock emerald scale. This isn't wrong (emerald is a fine, distinctive-enough choice for this brand versus the blue-purple default everyone else reaches for) but it means there is currently no actual custom brand-hue decision anywhere in the palette — just an unmodified framework default plus a hand-picked gold.
- **Fix (scoped, non-visual if done right):** convert the palette to OKLCH, re-tint all neutrals consistently toward the emerald hue (0.005-0.015 chroma, per Impeccable's guidance), and make a deliberate call on whether stock emerald stays as-is or gets nudged into something less identical to Tailwind's default. Good candidate for a dedicated pass with before/after screenshots since it's easy to accidentally shift perceived contrast.
- Flagged by: Impeccable.

### 11. Dead theming infrastructure: `next-themes` installed, full `.dark` CSS block defined, effectively unused
`package.json` depends on `next-themes`. `globals.css` defines a complete `.dark { ... }` variable block (adjusted primary shades, background/foreground inversions, the works). But `layout.tsx` has no `ThemeProvider`, and the entire `src/` tree has exactly **2** stray `dark:` variant class usages in 217 files. This is either an abandoned feature or leftover shadcn scaffolding that was never wired up.
- **Decision needed:** finish it (real dark mode, real toggle, real testing in both modes per Taste's 8.D) or remove the dead weight (`next-themes` dependency, the `.dark` block, and confirm the 2 stray `dark:` usages don't silently break anything if removed). Given this is a B2C research/decision-making site typically browsed during the day (matches Impeccable's own theme-selection guidance — "consumed during a decision, not late at night" leans light-only), removal is the more defensible default unless there's a concrete reason to finish it.
- Flagged by: Taste, Impeccable (new finding this pass).

### 12. Accordion height animation (Radix/tailwindcss-animate default)
`--animate-accordion-down/up` in `globals.css` animates `height` directly (via `--radix-accordion-content-height`), not `transform`/`grid-template-rows`. Both Impeccable and Emil's flag animating `height` as a layout-thrashing anti-pattern. This is a Radix/tailwindcss-animate library default shared by a huge fraction of shadcn-based sites, not something authored in this codebase — worth a real Performance-panel profile on a large FAQ accordion before deciding whether the `grid-template-rows` swap is worth the custom-CSS maintenance cost.
- Flagged by: Impeccable, UI/UX Pro Max.

---

## P2 — Worth doing, lower urgency

### 13. Terminology inconsistency across live copy — three separate instances, one is a bug this session introduced
- **"counsellors" (British spelling) vs. "counselor" (American) — a real spelling bug.** Site-wide convention is American ("counselor": 3 live uses, e.g. Footer "Talk to Counselor," Pricing "Talk to a Counselor"). One outlier: `src/components/AboutUs.tsx:205`, "Our **counsellors** sit with every learner..." — introduced during this session's earlier copy-rewrite pass. One-word fix.
- **"program(s)" (91 uses) vs. "course(s)" (277 uses)** — both refer to the same offering, used interchangeably across nav ("Courses" in the URL/nav) vs. marketing copy ("Featured Programs," "Program Investment," "Choose Your Area of Interest"). Not necessarily wrong (English tolerates synonym variety) but worth a conscious terminology decision given the route itself is `/courses`.
- **"enroll"/"enrollment" (~19 combined) vs. "register"/"registration" (~16 combined)** — both used for the same signup action in different components. Not flagged as urgent, just inconsistent.
- Flagged by: Impeccable (ux-writing reference).

### 14. Pricing/stat numbers don't use tabular figures
`tabular-nums` is used in exactly 5 places (accordion step numbers, a chart component, a sidebar badge) — never on the actual currency amounts. `PricingPage.tsx` and `CourseTemplate.tsx` render `₹{price.toLocaleString("en-IN")}` with no `tabular-nums`, so prices in a card grid can visually mis-align as digit counts vary (₹15,000 vs ₹1,20,000).
- **Fix:** add `tabular-nums` (or `font-variant-numeric: tabular-nums`) to the price/stat number spans in `PricingPage.tsx` and `CourseTemplate.tsx`.
- Flagged by: Impeccable (typography reference).

### 15. `transition-all` used 79 times
Emil's first explicit review rule: specify exact properties (`transition: transform 200ms ease-out`), not `transition-all`. 79 instances is too many to hand-triage in one pass — some are probably fine (a card legitimately transitioning color + shadow + transform together), some are lazy defaults. Recommend a scoped grep-and-triage pass, or a lint rule, rather than a manual sweep.
- Flagged by: Emil's.

### 16. Dead components carrying real, off-brand design debt
`ComingSoon.tsx`, `PartnersLogo.tsx`, `CTASection.tsx`, `LearningJourney.tsx`, `WebinarBanner.tsx` — none rendered on any route, none touched in the sticker-system redesign, all still carry the pre-redesign gradient/glassmorphism aesthetic (confirmed: gradient text, `cyan-400` accents, backdrop-blur decoration). Not urgent since nothing renders them, but a trap for future reactivation.
- **Fix:** delete (git history preserves them) or move to an explicit `_archive/` directory so nobody casually remounts 2023-era design next to the current sticker system.
- Flagged by: Impeccable, Taste.

---

## P3 — Verified clean (no action needed) or explicitly out of scope

Positive findings matter as much as negative ones for calibrating how urgent the rest of this list actually is:

- **Live GSAP motion system is genuinely well-executed.** Every live scroll-reveal animation (9 components, excluding the 2 dead Motion-library files) consistently uses `power2.out` easing at 0.5-0.7s durations for fade+translateY entrances. Zero `ease-in` in live code. Zero bounce/elastic. Zero `scale(0)` entrances (everything starts from `opacity: 0, y: 20-28`, which is exactly Emil's "never animate from nothing" guidance). This is a real, consistent motion language — the only gap is #2 (reduced-motion), not the easing/timing choices themselves.
- **Forms are built correctly.** `ContactUs.tsx` and siblings use real `FormLabel` + `placeholder` as a hint (not placeholder-as-label), matching both Impeccable's and UI/UX Pro Max's form guidance exactly.
- **No focus-ring stripping found anywhere** (`outline-none` without a `focus-visible` replacement — zero instances).
- **z-index scale is disciplined**: almost entirely `z-10`/`z-20`/`z-50`/`z-100`, no arbitrary `z-[9999]`-style values (2 stray `z-1` instances, worth a five-minute cleanup, not a real finding).
- **Curriculum/module lists already use the right pattern** — Taste explicitly bans flat `border-b`-per-row spec tables; `CourseTemplate.tsx`'s curriculum section instead uses a numbered-timeline + accordion, which is one of Taste's own recommended alternatives.
- **Press logo wall uses real logo images** from Sanity (`PressLogoMarquee`), not plain-text wordmarks — passes Taste's logo-wall rule without any fix needed.
- **Marquee count: 1 per page** (`PressLogoMarquee`, homepage only) — compliant with Taste's max-one-marquee rule, at least on the pages checked this pass.
- **Cursor-pointer / clickable-div discipline is fine** — spot-checked for `<div onClick>` patterns without `cursor-pointer`; found only 1 low-confidence hit (a modal backdrop, where it's arguably correct not to look like a button).
- **Nav height (~80px) is right at Taste's cap**, not over it.
- **Split-header pattern (giant headline + small floating explainer paragraph) was checked and not found** — the site's two-column sections pair a headline+CTA column with a genuinely different content type (photo, timeline, card grid, accordion) on the other side, not a stray paragraph.
- **SEO baseline is solid**: `sitemap.ts` and `robots.ts` present, every route has real per-page metadata, homepage correctly inherits a specific (not generic) title/description from the root layout.
- **UI/UX Pro Max's `--design-system` recommendation for this brief (dark-mode OLED, Anton/Epilogue "brutal Gen-Z" typography, navy/orange palette) was queried and explicitly rejected as a direction** — its keyword-matching is approximate and doesn't fit an already-established, functioning brand identity. Logged here for transparency (the tool was run in full per the request), not adopted.
- **Out of scope for this pass, flagged not audited:** a full Lighthouse/Core Web Vitals pass (LCP/INP/CLS), a formal axe/contrast-checker sweep (spot-checks came back clean but weren't automated), real-device touch/gesture testing, and a page-by-page repeat of the full Section 14 checklist beyond the homepage/About/Pricing/course-template sample checked here.

---

## Summary table

| # | Finding | Severity | Effort | Skills that flagged it |
|---|---|---|---|---|
| 1 | `not-found.tsx` fails Color/Shape Consistency Lock, gradient-text ban, decorative-bounce ban, likely hydration bug | P0 | Low | Impeccable, UX Pro Max, Taste, Emil's |
| 2 | Zero `prefers-reduced-motion` support across all 9 live animated components | P0 | Low | Impeccable, UX Pro Max, Taste |
| 3 | No button press feedback anywhere (`ui/button.tsx` + hand-rolled CTAs) | P0 | Very low | Emil's |
| 4 | `border-l-4` stripes on live blockquotes + every toast | P0 | Low-med | Impeccable |
| 5 | No skip-to-content link | P0 | Very low | Impeccable, UX Pro Max |
| 6 | Testimonial quotes unclamped, can run full-paragraph | P0 | Very low | Taste |
| 7 | Eyebrow badge on ~every section, 25 files | P1 | Decision + med | Taste |
| 8 | 4/8 homepage sections share identical two-column shell | P1 | Decision, low urgency | Taste |
| 9 | Single font family — revised: not actually a defect, hierarchy already works | P1→informational | None required | Impeccable (corrected) |
| 10 | HSL not OKLCH + mismatched neutral tints + stock Tailwind emerald as "brand" color | P1 | Med (token migration) | Impeccable |
| 11 | Dead `next-themes`/`.dark` theming infrastructure | P1 | Decision + low | Taste, Impeccable |
| 12 | Accordion height-animation (Radix default) | P1 | Low (investigate first) | Impeccable, UX Pro Max |
| 13 | Terminology inconsistency (counsellor/counselor bug, program/course, enroll/register) | P2 | Very low-med | Impeccable |
| 14 | Prices/stats missing `tabular-nums` | P2 | Very low | Impeccable |
| 15 | `transition-all` × 79 | P2 | Med (triage) | Emil's |
| 16 | 5 dead, off-brand components | P2 | Low (delete/archive) | Impeccable, Taste |
| - | Motion timing/easing, forms, focus rings, z-index, curriculum UI, logo wall, marquee count, SEO baseline | P3 — clean | None | All (positive findings) |

**Recommended starting order:** #2 and #5 first (both mechanical, both site-wide, both genuinely load-bearing accessibility gaps, not aesthetic opinions). Then #1, #3, #6, #4 (all cheap, all live, all high-visibility). Hold a decision conversation on #7, #9(closed, no action), #10, and #11 before touching any of those — all four are brand-identity or infrastructure calls, not mechanical fixes.
