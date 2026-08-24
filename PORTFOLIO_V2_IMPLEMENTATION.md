# Portfolio V2 — Implementation Log

Working branch: `portfolio-v2` (off `main`, not deployed, not merged).
Full plan: see the approved plan in this conversation / `PORTFOLIO_AUDIT_DANDY_ALEXANDRE.md` for the audit that motivated it.

No secrets are recorded in this file.

---

## FASE 0 — Safety baseline ✅

- Verified `main` was clean before branching; created `portfolio-v2` from it.
- Verified IronMind's claimed features against its real code (`prisma/schema.prisma`, `src/lib/auth.ts`, `src/app/sitemap.ts`/`robots.ts`) — all confirmed real.
- Mapped 11/12 `projects.ts` entries to local folders + GitHub remotes (all under `DandyXandy`, confirmed public by Dandy). `cafe-productions` has no local repo found on this machine — pending.
- Confirmed with Dandy: Café Productions' real stack is **React (frontend) + Java Spring Boot (backend)** — the `Next.js/Framer Motion` tags in `projects.ts` were wrong and will be corrected in Fase 3.
- Found the real, current CV already exported at `C:\Users\paomo\Downloads\CV Dandy_Abadie_Atoche.pdf` (matches this session's generated CV content) — copied to `public/cv/dandy-abadie-cv.pdf`.
- Diagnosed the `www.portfoliodandy.com` SSL issue via DNS lookup: DNS is correctly configured on both `portfoliodandy.com` and `www` (both point to Vercel). The TLS cert served for `www` only has `portfoliodandy.com` in its SAN — this is a Vercel *dashboard* domain-provisioning issue, not DNS, not code. **Manual fix needed from Dandy** — see "Open items" below.
- No ESLint installed/configured at all; Next 16 docs specify flat config (`eslint.config.mjs` + `eslint-config-next`) — will be set up in Fase 8.

## FASE 1 — Critical fixes ✅

- **`src/data/profile.ts`** created as the single source of truth for name, email, WhatsApp, LinkedIn, GitHub, university/degree/cycle, languages, CV path. Exports `whatsappLink()` / `mailtoLink()` helpers.
- Replaced duplicated `WHATSAPP_NUMBER`/`EMAIL`/`LINKEDIN_URL`/`GITHUB_URL` constants in `Footer.tsx`, `Contact.tsx`, `FloatingWhatsApp.tsx`, `projeto/[token]/page.tsx`, and (found during the sweep, not in the original audit) `continue-project/SuccessScreen.tsx`.
- Old email `dandyabadie12@gmail.com` fully swept from the codebase (components, `README.md`, `.env.example`). **Your real `.env` and the Vercel project's env vars still use the old address for `NOTIFICATION_EMAIL` — update those yourself whenever you're ready; I didn't touch live env values.**
- Accessibility:
  - `Navbar.tsx` mobile menu button: touch target now 44×44px (`h-11 w-11`), icon unchanged visually.
  - Global `:focus-visible` outline added in `globals.css` for all interactive elements (violet ring, keyboard-only).
  - `text-mist/40` bumped to `text-mist/60` everywhere it carried real text (About stats, Contact labels, Skills terminal header, Plans/planos price labels, Footer copyright, wizard "empty" states). Left as-is only on the decorative `ExternalLink` icon in `ProjectCard.tsx` (icon, not text — different WCAG threshold).
  - `prefers-reduced-motion` now respected: CSS-level animation kill-switch in `globals.css`, Hero's infinite blob/chevron motion gated via Framer Motion's `useReducedMotion()`, AOS disabled via `matchMedia` check in `AosInit.tsx`, Lenis skipped entirely in `SmoothScroll.tsx` when reduced motion is on.
- **Verified**: `npm run build` — compiles clean, TypeScript strict passes, all 5 pages + 2 API routes still build.

## FASE 2 — Positioning ✅

- **Hero** (`Hero.tsx` + `messages/{pt,es,en}.json → hero`): dropped the "Olá, eu sou" greeting prefix, name (`Dandy Abadie`) now stands alone as H1. New `tagline` states student status + 7th cycle + value prop in one sentence. New `availability` line (with a small violet status dot) states open-to-internships/junior/freelance. CTA hierarchy is now 3-tier: `ctaPrimary` (Ver projetos, solid gradient) → `ctaSecondary` (Baixar CV, outline, opens `profile.cvUrl` in a new tab) → `ctaTertiary` (Falar comigo, quiet text link). GitHub/LinkedIn added as small quiet icon links below the CTA row. Tech badges row kept as-is (still useful proof-of-stack signal).
- **About** (`About.tsx` + `messages/*.json → about`): fully restructured. Old 2-paragraph bio + 3-stat sidebar replaced with: 1 short paragraph (not repeating Hero) + a centered 5-item fact grid (University, Cycle, Location, Languages, Focus) + a soft-skills pill row (fast learner / teamwork / communication). Title is now "Student, builder, engineer." (ties back to the brief's positioning pillar without restating the Hero).
- **New `Currently.tsx` component** (`messages/*.json → currently`): minimal 3-line "what I'm doing now" list (7th semester, building full-stack products, open to opportunities) plus **ExitoCoach relocated here**, rendered at roughly half its previous visual weight (smaller logo box, smaller card, quieter copy) — no longer a full-width section between Hero and Skills.
- **Home reorder** (`page.tsx`): `Hero → Projects → About → Skills → Currently → Plans → RequestProjectCta → Contact → Footer`. Projects now sits right after the Hero — recruiter sees proof before anything else. Commercial section (Plans/wizard CTAs) now sits after all the proof/positioning content, right before Contact. **Note**: this phase does not yet split Projects into "Featured" vs "Other" (that's Fase 3, which needs the data-model changes) — for now the single existing Projects section serves as the "proof" block in its current form.
- **Navbar** (`Navbar.tsx`): links reordered to match (`Projetos, Sobre, Skills, Serviços, Contato` — renamed "Planos" label to "Serviços"/"Servicios"/"Services" in nav only). Added GitHub icon + a CV button (outline style) to both desktop and mobile nav.
- Removed `Venture.tsx` (dead code — its rendering now lives inside `Currently.tsx`, nothing was dropped, just de-duplicated).
- **Verified**: `npm run build` clean (TypeScript strict passes); ran the actual dev server and inspected the rendered DOM for `/pt`, `/es`, `/en` — correct copy, correct order, no missing-translation errors, no console errors from the app itself (the two WebSocket HMR warnings seen are a limitation of this sandboxed preview proxy, not an app issue — confirmed zero server-side errors in the dev server's own logs). Checked mobile (375px): no horizontal overflow, mobile menu shows the new CV/GitHub links, 44×44 touch target holds.

## FASE 3 — Project system ✅

- **`src/data/projects.ts`** extended: `Project` type now has `year`, `caseStudy?`, `github?` (was: `id`, `url`, `tags`, `featured?`). Added `featuredProjects`/`otherProjects` derived exports (filtered by `.featured`).
- **GitHub links populated** for the 11 confirmed-public repos (mapped in Fase 0). `cafe-productions` and `dandy-portfolio` (the site itself) are left without a `github` field — no repo found locally for Café, and `MeuPortfolio` wasn't part of the batch Dandy explicitly confirmed as public, so it's not linked yet (pending confirmation, tracked below).
- **Café Productions tags corrected**: `['React', 'Java', 'Spring Boot']`, replacing the wrong `['Next.js', 'Framer Motion', 'Community']` — matches Dandy's confirmation (and his CV).
- **New self-referential project**: `dandy-portfolio` added to `projects.ts` (`url: portfoliodandy.com`), marked `featured`. It's the site itself, used as a case study.
- **`year`** populated for all 12 pre-existing projects from each local repo's real first-commit date (`git log --reverse`) — genuinely verified data, not guessed. Café Productions keeps `2025` from the CV (no local repo to check).
- **Featured vs. Other split**: `Projects.tsx` now renders `featuredProjects` (IronMind, Café Productions, Dandy Portfolio — 3 cards) through a new, richer `FeaturedProjectCard.tsx` (case study link, live + GitHub icon actions, year, `next/image`-optimized screenshot), and `otherProjects` (the remaining 10) through the existing `ProjectCard.tsx`, now showing a GitHub icon when `project.github` is set (restructured to a stretched-link pattern so the card link and the GitHub icon-link don't nest invalidly).
- **`next.config.js`**: added `images.remotePatterns` for `api.microlink.io`, so featured cards can use `next/image` (optimized) while the "Other Projects" grid keeps the existing plain `<img>` Microlink fallback, as scoped.
- **Case study system**: `src/app/[locale]/projects/[slug]/page.tsx`, statically generated for all 3 slugs × 3 locales via `generateStaticParams`. Content lives entirely in `messages/{pt,es,en}.json` under two new namespaces — `caseStudy` (generic section labels/buttons, shared by all case studies) and `caseStudies.<slug>` (the actual prose: overview, problem, solution, responsibilities, architecture, keyFeatures[], engineeringDecisions[]) — following the same "facts in `.ts`, prose in `.json`" pattern already used for `projects.items`. This is a small deviation from the original plan (which sketched separate `src/data/case-studies/*.ts` files) — going through `messages/*.json` avoids a parallel, duplicate content system and reuses the project's existing i18n architecture directly.
  - `challenges` and `whatLearned` render as an explicit "still writing this up" pending state (not fabricated) for all 3 case studies — flagged below for Dandy to fill in with real specifics whenever he has them.
  - Café Productions' `engineeringDecisions` is an empty array (nothing beyond what's already confirmed) — the page hides that section entirely when empty rather than showing a blank heading.
- **Verified**: `npm run build` clean; ran the dev server and inspected `/pt/projects/ironmind`, `/en/projects/dandy-portfolio`, `/es/projects/cafe-productions` directly — correct content, correct conditional hiding (no GitHub button/section where there's no data), correct year/tags. Confirmed via `next/image` request inspection that featured cards route through Next's image optimizer (`/_next/image?url=...microlink...`) while the 10 "other" cards still hit Microlink directly, as intended. Counted DOM elements to confirm exactly 3 "View case study" links and 11 GitHub icon buttons render (1 featured + 10 others — matches the data).

## FASE 4 — Professional proof ✅

Most of this phase was already covered incidentally by Fase 2 (`About.tsx`'s fact grid already surfaces University/Cycle/Location/Languages, and `Currently.tsx` already covers the "currently building / open to opportunities" block, and the CV button was already wired in the Hero/Navbar). The only real gap was **courses/certifications**, which didn't appear anywhere on the site yet.

- **`About.tsx`**: added a compact "Courses" pill row (same visual pattern as the soft-skills pills) right below soft skills — the 2 confirmed Udemy Java courses, shortened to fit a pill (`Java (POO) — Udemy`, `Java (Do Zero ao Profissional) — Udemy`), with a small uppercase caption above. Deliberately not a new full section — keeps the "not a CV rendered as a website" instruction intact.
- **Verified**: `npm run build` clean; confirmed both course pills render correctly on `/pt`; confirmed no mobile overflow at 375px.

## FASE 5–9

Not started yet — picking up next.

---

## Decisions resolved by Dandy
- **Café Productions GitHub link**: intentionally omitted — the repo is private (client project for a company), so the case study only ever shows the live-site link. No code change needed, this was already the state; `data/projects.ts` comment updated to reflect the real reason instead of "not found."
- **`dandy-portfolio`'s own GitHub link**: intentionally omitted — Dandy's call, doesn't want to expose the portfolio's own code even though the repo exists. Same as above, comment updated.

## Open items for Dandy (updated)
1. **Domain SSL** (Vercel dashboard, manual) — unchanged from Fase 0, still pending.
2. **`challenges` / `whatLearned`** for all 3 case studies are placeholder ("still writing this up") — send me real specifics whenever you have them and I'll drop them in.
3. `NOTIFICATION_EMAIL` in your real `.env`/Vercel — unchanged from Fase 0/1, still pending on your side if you want it too.

---

## Open items for Dandy (tracked, not blocking further work)
1. **Domain SSL** (Vercel dashboard, manual): Settings → Domains → find `www.portfoliodandy.com` → if it shows an error/pending state, remove and re-add it as a redirect to `portfoliodandy.com` so Vercel reissues a correctly-scoped cert.
2. Locate/share the Café Productions repo if you want a GitHub link on that case study later.
3. Update `NOTIFICATION_EMAIL` in your real `.env` / Vercel env vars to `dandyalexandre7@gmail.com` if you want notification emails to move too (display-facing email is already updated everywhere in code).
