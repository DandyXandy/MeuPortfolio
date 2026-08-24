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

## FASE 2–9

Not started yet — picking up next.

---

## Open items for Dandy (tracked, not blocking further work)
1. **Domain SSL** (Vercel dashboard, manual): Settings → Domains → find `www.portfoliodandy.com` → if it shows an error/pending state, remove and re-add it as a redirect to `portfoliodandy.com` so Vercel reissues a correctly-scoped cert.
2. Locate/share the Café Productions repo if you want a GitHub link on that case study later.
3. Update `NOTIFICATION_EMAIL` in your real `.env` / Vercel env vars to `dandyalexandre7@gmail.com` if you want notification emails to move too (display-facing email is already updated everywhere in code).
