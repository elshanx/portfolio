# Portfolio redesign — design

Status: draft, awaiting approval. Date: 2026-11-19.

## Intent

Replace the 2020 Gatsby 2 portfolio (a public starter template with stock illustrations and an auto-pulled GitHub star grid) with a personal site that shows who Elshan is and what Elshan ships, and that meets 2026 standards for performance, accessibility and craft.

Three audiences, in this order of attention:

1. **Recruiter** (30-second skim): who, what, where, how to reach, CV.
2. **Client** (proof of shipping): live work, real constraints, outcomes.
3. **Engineer** (taste and craft): decisions, stack choices, the quality of the site itself.

## Goals

- First screen answers "who is this, what do they do, how do I contact them" with no scrolling and no waiting on an animation.
- Three hand-picked case studies: **dayaq**, **frontpage**, **qaqash**.
- One chronological timeline (2021 to now) with Career / Shipped / Craft filters.
- The site is itself evidence of craft: fast, accessible, responsive, tasteful motion.
- Content lives in typed data files, edited by hand, no CMS.

## Non-goals

- No blog or writing section (nothing written yet; add when it exists).
- No contact form or backend (mailto and links only).
- No GitHub API fetching, no tokens, no build-time network calls.
- No three separate timelines; one timeline with filters.
- No i18n, no analytics beyond what the host provides, no CMS, no database.

## Anti-goals (failure even if it technically works)

- A preloader or intro animation that hides content (the reference site, Zain's, shows a blank grey screen for several seconds).
- Case studies that pad thin projects. Unfinished work is labeled "in progress" or left to the timeline.
- Generic template look. Copy and structure must be specific to Elshan.

## Approaches considered

- **A. Lean one-pager + three case studies + one filterable timeline. (Chosen.)** Matches the real inventory of finished work; fast to read; extensible later.
- B. Three parallel timelines. Rejected: each track would have 3-4 entries, looks padded, buries contact details.
- C. Zain-style motion-heavy gallery. Rejected: unfinished projects look weak at gallery scale; style over substance.

## Decisions

Decided by Elshan:
- Approach A.
- Look and feel follows https://muhammad-zain-cyan.vercel.app: large bold grotesque headlines, light grey background, black pill "MENU", scrolling marquee headline, staggered two-column project grid, smooth scroll.
- Smooth scroll via the Lenis library.
- Case study projects: dayaq (ongoing freelance, live at dayag.az), frontpage (live), qaqash (unfinished, good).
- Employer: Pasha Bank, 2023 to now. Only role and dates are shown, never internal work.
- Do not link or feature fll.az (client sites removed).

Builder's calls (Elshan can override):
- Next.js (App Router), TypeScript, pnpm, per Elshan's usual stack; static output.
- Native CSS scroll-driven animations (`animation-timeline`) for reveals; Lenis only for smooth scroll; no GSAP/Framer Motion unless a specific effect cannot be done natively.
- Motion respects `prefers-reduced-motion` (Lenis disabled, reveals become instant).
- Light and dark themes via `prefers-color-scheme` with a manual toggle; no flash on load.
- Contact: email link, GitHub, LinkedIn, Telegram. Twitter/Instagram dropped unless Elshan confirms they are live.
- Host on Vercel (recent projects already are); old Netlify site retired after cutover.
- Rewrite in place in this repo: delete the Gatsby files (`gatsby-*`, `src/`, `yarn.lock`, `static/`, legacy icons), keep `LICENSE.md`, `.gitignore`.
- Cutover: build on a `redesign` branch, never on `master`. Vercel preview deploys are the review surface. Merge to `master` only at cutover, then retire Netlify. Reason: the live site is `elshanx.netlify.app`; if Netlify auto-builds `master`, a half-built Next.js app or the removed GitHub token would break the live portfolio. The Netlify wiring cannot be verified from the repo.
- Frontpage is presented as built from a Frontend Mentor brief, extended into a full product (auth, database, keyboard-first reader). This is the builder's reading of "it's a fem project"; the README describes an original product, so Elshan should confirm the framing.
- Qaqash is unfinished: its card and case-study page carry an "in progress" status, consistent with the anti-goal above.
- Fonts: self-hosted variable grotesque (builder picks a free one close to the reference), `font-display: swap`, preloaded.

## Content inventory

- **Hero:** name, one-line positioning (front-end engineer; builder drafts, Elshan edits), status strip (Baku local time, availability, CV link, email).
- **Selected work (3):**
  - dayaq: marketing site and admin for a home-care service in Azerbaijan. Next.js 16, trilingual (az/ru/en), Tiptap admin, SEO (hreflang, JSON-LD, sitemap), Prisma/Postgres, Playwright tests. Freelance, ongoing.
  - frontpage: RSS/Atom aggregator with reader, search, ranked digest, keyboard control, guest-to-account linking. Next.js 16, Prisma 7, Better Auth, Tailwind 4.
  - qaqash: macOS notch companion for Claude Code and music; Allow/Deny from the notch, sessions on hover, local-only. Swift 6, iPhone app in progress. Uses its README demo GIF.
- **Timeline** (one list, entries tagged Career / Shipped / Craft; an entry may carry several tags): Pasha Bank (2023–now), the three case studies, devclean (Rust CLI), in-progress items (budget-tracker, gamelog, qaqash iPhone app) marked "in progress", plus older repos Elshan chooses to keep. Dates come from GitHub; Elshan curates.
- **About:** short paragraph, builder drafts from this doc.
- **CV:** `/cv` printable page plus a downloadable PDF.

## Page structure

```
/                hero + status strip
                 marquee "Selected work" → 3 cards (staggered grid)
                 timeline with filter chips
                 about + contact
/work/[slug]     case study: summary, role, key decisions, stack, outcome/status, links
/cv              printable CV
```

## Constraints

- Repo rules from Elshan's setup: TypeScript with explicit types, no `any`; ES modules; no code comments; every source file under 150 lines (split into components, hooks, helpers); code used in two places is extracted once and shared.
- No new dependencies beyond Next.js, React, TypeScript, Lenis, and a linter/formatter; justify any other.
- Commit messages: short, lowercase, imperative.

## Acceptance

- `pnpm build` and `pnpm lint` pass.
- Lighthouse (mobile) at least 95 for Performance, Accessibility, Best Practices, SEO on `/` and one case study.
- Keyboard-only navigation works everywhere; visible focus; filters usable without a mouse; no axe violations on `/`.
- Layout correct at 375, 768 and 1440 px; no horizontal scroll.
- With `prefers-reduced-motion`, no smooth scroll and no animated reveals.
- First meaningful content visible without waiting on any animation.
- Per-page titles, descriptions and generated Open Graph images; `sitemap.xml` and `robots.txt`.
- Old Gatsby code and dependencies fully removed.

## Left to the builder

Layout details, exact type scale, colors, spacing, animation timing, component split, copy drafts (always flagged for Elshan's edit), choice of free font, OG image design.

## Open items (need Elshan's input before launch, not before building)

- Display name: config says "Elshan Akbarov", GitHub says "Elshan Alkhabaz". Placeholder until confirmed.
- Exact role title at Pasha Bank.
- Permission from the dayaq client to show the project and its numbers.
- Photo or no photo; CV source (existing PDF or built from the timeline).
- Production domain: keep elshanx.netlify.app or move to a custom domain.
- Whether Elshan is currently job-hunting (drives the "available" status wording).
- Contact email: the current one contains "akbarov", so it depends on the name question.
- Whether Netlify auto-deploys `master` (see Cutover).
