# Copy Rewrite — Changes

Branch: `copy-rewrite` (not merged to `main`). Sanity edits saved to **drafts only** — not published.

## Scope

Rewrote homepage, About, Pricing, FAQ, and course listing/detail copy to remove AI-generated
writing patterns and strengthen it as a lead magnet, per the brief. Legal pages (privacy/terms/refund
policy text) were left alone by design. Layout, components, routing, and schema *structure* were not
touched — only copy field values and hardcoded strings.

---

## Files changed (hardcoded copy)

| File | What changed |
|---|---|
| `src/components/HeroSection.tsx` | Rewrote the "17+ courses" stat line to name the real domain count instead of "fast-track your career." |
| `src/components/common/BenefitSection.tsx` | Rewrote all 6 benefit cards. Replaced the banned headers "One-Stop Solution" and "Trusted Partners" (explicitly called out in the brief) and two other vague cards, with copy tied to real proof points (17+ programs/6 domains, career-path mapping, the quiz, the 5-step model, live mentorship, AWS partnership). |
| `src/components/common/FAQs.tsx` | Rewrote 2 of 5 homepage FAQ answers (what-is-Eduwise, earn-while-learning). Left the job-placement-guarantee Q&A untouched — see flags below. |
| `src/components/common/FeaturedPress.tsx` | "Featured On Leading Media Platforms" → "As Seen In"; tightened the mention-count line. |
| `src/components/ui/testimonials-three.tsx` | Tightened the testimonials section subhead (cut "real X, real Y... everything in between" filler). |
| `src/components/common/CTASection.tsx` | This component is dead code (exported, never rendered on any page). Fixed anyway since found: removed "Unlock a world of opportunities," "cutting-edge," "rapidly evolving job market," "Transform Your Potential," and a **fabricated stat** ("10,000+ professionals" — not a real proof point; replaced with the real 2,000+ figure). |
| `src/components/AboutUs.tsx` | Rewrote the mission paragraph (was a banned "in today's competitive job market" hit), the "Our Story" second paragraph, the mission-statement quote card (banned "result-driven," unverifiable "most trusted... platform" claim), and the "Your success is our priority" tagline. Left the "100% job placement" pipeline subhead and "Guaranteed Job Opportunities" badge untouched — see flags below. |
| `src/components/common/Footer.tsx` | Rewrote the footer CTA banner: "Ready to transform your career?" (banned phrase) → copy that reflects the actual two-button choice (explore programs vs. talk to a counselor), and grounded "dream career" filler in the real 2,000+-placed stat. Left the "100% placement assurance" brand line untouched — see flags below. |
| `src/components/courses/CourseTemplate.tsx` | Rewrote "Best value in the market with everything you need to succeed" (unverifiable superlative) and trimmed a throat-clearing "We're here to help!" Left the "Job Guarantee Track" section (header, subhead, 3 milestone cards) untouched — see flags below. |

## Files NOT changed but reviewed and confirmed clean

`DomainsShowcase.tsx`, `HowItWorks.tsx`, `ProgramSection.tsx`, `PricingPage.tsx`, `OurCourse.tsx` (aside from the flagged badge), `CourseLeadForm.tsx`, `FAQsClient.tsx`, `FAQsPage.tsx` — already specific, no banned patterns found.

## Dead code found with AI-slop copy, not fixed (not user-facing)

- `src/components/common/ComingSoon.tsx` — "Revolutionizing education through innovative technology..." Not imported anywhere.
- `src/components/common/PartnersLogo.tsx` — "OUR TRUSTED PARTNERS" (banned phrase). Not imported anywhere.
- `src/data/courses.ts` `COURSES` array — a full legacy duplicate of course data (title/subtitle/description/price for ~19 courses, including stale/nonexistent ones like "Nanotechnology"). Only `.length` is ever read from it (for program-count badges); no text field is rendered. Contains "robust enterprise applications" and "cutting-edge nanotechnology" but none of it reaches a user. Recommend deleting this dead array in a follow-up cleanup pass — out of scope here since it's not copy a visitor sees.

---

## Sanity edits (saved as drafts — not published)

Dataset: `production` (project `te2qx3yb`), confirmed as the only dataset and the one the live site reads from.

### `faq-category-1` ("About Eduwise Solutions")

| Question | Before | After |
|---|---|---|
| What is Eduwise Solutions? | "Eduwise Solutions is a career guidance and student placement platform that helps learners choose the right skill-based programs, job-guaranteed training, and professional courses. We specialize in supporting final-year students and fresh graduates in securing entry-level jobs across top companies." | "Eduwise Solutions is a Bengaluru-based career training platform. We run skill-based programs, job-guaranteed training, and professional courses, and specialize in helping final-year students and fresh graduates land entry-level jobs." |
| What makes Eduwise different? | "We go beyond selling courses. We offer: personalized counseling, handpicked course guidance, exclusive course discounts, and job placement support with real MNC connections." | "We're not just a course marketplace. Every student gets one-on-one counseling before enrolling, and placement support backed by our network of 150+ hiring partners." |
| Where is Eduwise based? | "Eduwise Solutions is an India-based company. We serve students and job seekers from all over the country, regardless of your city or state." | "Eduwise Solutions is based in Indira Nagar, Bengaluru, and works with students across India, no matter which city or state you're in." |

### `faq-category-3` ("Program Structure & Delivery")

| Question | Before | After |
|---|---|---|
| How are classes conducted? | "All classes are delivered live by industry experts, ensuring an interactive and engaging learning experience. In addition, learners receive access to session recordings, hands-on real-world projects, and weekly doubt clearing session to reinforce learning and drive consistent progress." | "Classes are live, not pre-recorded. You get session recordings afterward, hands-on projects, and a weekly doubt-clearing session with your instructor." |
| Main mode of communication? | "We maintain seamless communication through WhatsApp and Email for regular updates, live video sessions for instruction and interaction, and scheduled follow-up calls by our dedicated counselor team to ensure continuous support and progress tracking." | "WhatsApp and email for updates, live video sessions for classes, and scheduled calls with your counselor to track progress." |

**Not touched:** `faq-category-3` / "Can I continue my job or studies while doing this course?" — see Needs Human Review below, this one has its own factual conflict.

**Not touched at all:** `faq-category-2` ("Job-Guaranteed Program", all 5 Q&As) and `faq-category-5` ("Support & Career Services", all 4 Q&As) — guarantee-entangled, see below.

### Course documents (`course` type)

Queried all 17 live course documents' `subtitle`/`description`/`seoTitle`/`seoDescription`. Found them already specific and factual (real curriculum topic lists, not hype). **No edits made** — the one banned-word hit ("robust enterprise applications," Java Backend Development) and the guarantee-language hits (Placement Accelerator, DevOps) are covered below. Editing 17 courses' curriculum copy without course-specific input risked either leaving it unchanged (safe) or inventing specifics I don't have — chose the former per the conservative-default rule.

---

## Needs human review

### 1. Placement-guarantee language — left exactly as written everywhere it appears

Per instruction, none of this was touched or resolved. Every location found:

| Location | Exact text |
|---|---|
| `src/components/common/Footer.tsx:159` | "Empowering careers through industry-aligned education with 100% placement assurance and live mentorship." |
| `src/components/courses/OurCourse.tsx:147` | Badge: "100% Placement" (shown on every course card, all categories) |
| `src/components/courses/OurCourse.tsx:250` | "...master new skills, advance your career, and achieve your goals with 100% placement assurance." (courses listing hero) |
| `src/components/common/RefundHighlight.tsx:40` | "100% Placement Guarantee" (shown only on the DevOps course page) |
| `src/components/legal/RefundPage.tsx:197,228` | "Money-Back Guarantee" / "Money-Back Guarantee Conditions" |
| `src/components/legal/RefundPage.tsx:549` | "DevOps - 100% Fee Refund Guarantee" |
| `src/components/courses/CertificationPage.tsx:118` | Badge: "100% Job Guarantee" |
| `src/components/courses/CertificationPage.tsx:311,313` | "100% placement assistance with our network of partner companies" / "Job Guarantee" |
| `src/components/courses/CourseTemplate.tsx:158,166,173,186-187,555-558` | Whole "Job Guarantee Track" section: milestones, "To become eligible for our Job Guarantee Program...", "Your path from graduation to a confirmed offer letter." |
| `src/components/pricing/PricingPage.tsx:102-105` | Badge: "Job Guarantee Program" (shown when `isJobGuaranteeProgram` is true) |
| `src/components/AboutUs.tsx` (pipeline subhead) | "A 15-day intensive program, three steps, one outcome: 100% job placement." — **also factually stale**: no current program is 15 days (real durations run 8 weeks–6 months per the newer FAQ content and Sanity course data). This may describe a discontinued offering. |
| `src/components/AboutUs.tsx` (benefits list) | Badge: "Guaranteed Job Opportunities" |
| `src/components/common/FAQs.tsx` (homepage FAQ, q2) | Q: "Do you provide job placement guaranteed?" A: "Yes, our in-house course has job-guaranteed courses include placement guaranteed. For other courses, we offer career counseling and networking opportunities." (Also grammatically broken as-is — flagging that separately from the guarantee-scope question.) |
| `src/data/courses.ts:425,440` (dead/unused data, not rendered) | "Get a 100% job guarantee with our comprehensive programme!" / subtitle "100% Job Guarantee" |
| Sanity `course` doc "Placement Accelerator" | subtitle: "100% Job Guarantee"; description: "Get a 100% job guarantee with our comprehensive programme!..." |
| Sanity `course` doc "Master DevOps with Gen AI" | subtitle: "Become a DevOps Engineer with 100% Placement Assurance"; seoDescription: "...100% Placement Assurance. Enroll now..." |
| Sanity `faqCategory-2` (all 5 Q&As, live) | Most direct: "Yes. If you complete the 15-day program and meet the eligibility criteria, we guarantee interview opportunities and offer full placement support till 4 months or else your money refund." |
| Sanity `faq-category-5` / q4 (live) | "...If you're not placed within 6 months, you're eligible for a 100% refund, subject to our Terms & Conditions." |

### 2. Direct contradiction, same live FAQ page — this is the big one

Sanity category **`faq-category-2`** ("Job-Guaranteed Program," old content, order 2) says outright: *"Yes. If you complete the 15-day program... we guarantee interview opportunities... or else your money refund."*

Sanity category **`faqCategory-placement-careers`** ("Placement & Careers," newer content, order 3) says outright: *"No. We do not offer job guarantees, and we are sceptical of institutes that do... We don't guarantee employment — we guarantee the process."*

These are both live on `/faq` right now and directly contradict each other on whether Eduwise guarantees jobs. The older category also describes a "15-Day" program, which doesn't match any current course duration (8 weeks–6 months) or the Sanity "Placement Accelerator" course (1.5 months / "100% Job Guarantee" subtitle) — it may be describing a discontinued or renamed offering. This needs a scoping decision (which claim is current, should the old category be retired/merged) before anyone touches the copy — exactly the kind of call the brief said not to make automatically.

### 3. Secondary factual conflict, not guarantee-related

`faq-category-3` / "Can I continue my current job or studies while doing this course?" says programs offer *"recorded sessions and adaptable schedules... learn at your own pace."*

`faqCategory-courses-curriculum` / faq-cc-01 says *"We do not sell pre-recorded courses — every cohort follows a fixed batch schedule with live interaction."*

Self-paced/recorded vs. fixed-schedule/live-only — can't tell which is accurate, so left both untouched rather than guess.

### 4. Redundant FAQ coverage

"How do I enroll?" is answered twice with different levels of detail: `faq-category-6`/q2 (old, terse) and `faqCategory-enrollment-process`/faq-ep-01 (newer, detailed). Not a contradiction, just duplication — flagging in case the older category is meant to be retired.

### 5. Unverified numbers carried over as-is (not fabricated by this pass, not removed either)

`AboutUs.tsx` stats "8+ years of experience" and "150+ hiring partners" aren't in the proof-point list provided, but they're pre-existing published claims (150+ hiring partners also appears in the newer, careful `faqCategory-placement-careers` FAQ content, so it's at least internally consistent). Left as-is rather than removing established site content on my own judgment.

---

## Verification

`pnpm typecheck`, `pnpm lint`, `pnpm build` all pass clean after changes (316 pre-existing warnings, 0 errors — baseline unchanged). Ran `pnpm format` as part of verification, which normalized em-dashes to hyphens repo-wide per the project's existing Biome/ultracite rule — cosmetic only, touched a few files outside this pass's direct edits (code comments, an unrelated schema description string), no content or schema changes.
