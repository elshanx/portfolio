# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Gatsby 2 site with a Next.js one-pager, three case studies, a filterable timeline and a printable CV, styled after the Figma "Home — Desktop (Light)" frame.

**Architecture:** Next.js 16 App Router, every route prerendered at build. Content is typed data in `content/`, pure logic in `lib/` (unit-tested with Node's built-in test runner), UI in `components/` with CSS Modules and one global token sheet. Client JS only for theme toggle, local clock, timeline filter and Lenis.

**Tech Stack:** Next.js 16, React 19, TypeScript, pnpm, Lenis (`lenis/react`), ESLint (`eslint-config-next`), `node --test`, `agent-browser` for browser checks.

**Spec:** `docs/superpowers/specs/2026-11-19-portfolio-redesign-design.md` (read it first; tokens, type scale, section order and timeline entries are there).

## Global Constraints

- Work on branch `redesign`; never commit to `master`. Push after each task (`git push`).
- Runtime deps: `next`, `react`, `react-dom`, `lenis` only. Dev deps: `typescript`, `@types/*`, `eslint`, `eslint-config-next`. Anything else needs a written reason in the commit that adds it.
- TypeScript with explicit types, no `any`. ES modules only. Destructured imports.
- No code comments. Every source file under 150 lines (blank lines excluded); split when larger.
- Code used in two places is extracted once (e.g. `Badge`, `LinkRow`, `Reveal` class, `site` data).
- Files in `lib/` and `content/` import each other with relative paths and explicit `.ts` extensions (Node runs the tests with type stripping). Components may use the `@/` alias.
- Commit messages: short, lowercase, imperative, no body (e.g. `add timeline filter`).
- Fonts: `Geist` and `Geist_Mono` from `next/font/google` (self-hosted at build, no extra dep).
- Colors only through CSS custom properties from `app/globals.css`; no raw hex in component CSS.
- Contact links: email, GitHub, LinkedIn, Telegram. No Twitter, no Instagram.
- Do not link fll.az or its dashboard. Never describe internal Pasha Bank work.
- Unconfirmed facts (surname, Pasha Bank title, email) live only in `content/site.ts` so one edit changes them everywhere.
- Browser checks use `agent-browser` (run `agent-browser skills get core` once first). Screenshots only for visual checks.

## Review Focus

1. **No JavaScript / before hydration:** all hero text, all 10 timeline entries, all contact links and the menu are in the server HTML; the theme follows the OS. Test: `curl` the built page and grep (Task 6, Task 7).
2. **Reduced motion:** no Lenis (`html` has no `lenis` class), marquee does not move, no reveal transforms. Test: `agent-browser set media light reduced-motion` + `eval` (Task 3, Task 10).
3. **Unknown case-study slug:** `/work/nope` returns the 404 page with status 404, not a crash. Test: `curl -o /dev/null -w '%{http_code}'` (Task 8).
4. **Narrow screens and long strings:** at 320px wide the email row and the 446px name do not cause horizontal scroll. Test: `eval "document.documentElement.scrollWidth <= innerWidth"` at 320, 375, 768, 1440 (Task 10).
5. **Visitor in another time zone:** the clock always shows Baku time. Test: `formatClock` unit test with a UTC date (Task 2).

---

### Task 1: Replace Gatsby with a Next.js skeleton

**Files:**
- Delete: `gatsby-browser.js`, `gatsby-config.js`, `gatsby-node.js`, `gatsby-ssr.js`, `jsconfig.json`, `yarn.lock`, `powered-by-vercel.svg`, `src/`, `static/`
- Create: `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `app/layout.tsx`, `app/page.tsx`
- Modify: `.gitignore` (add `.next/`, `next-env.d.ts`, `*.tsbuildinfo`, `.vercel`), `README.md` (3 lines: what it is, `pnpm dev`, `pnpm test`)
- Keep: `LICENSE.md`, `docs/`

**Interfaces:**
- Produces: scripts `dev`, `build`, `start`, `lint` (`eslint .`), `test` (`node --test "lib/**/*.test.ts" "content/**/*.test.ts"`); `"type": "module"`; tsconfig `"allowImportingTsExtensions": true` and `@/*` alias to repo root.

- [ ] **Step 1:** Delete the Gatsby files listed above with `git rm -r`.
- [ ] **Step 2:** Scaffold in the scratchpad: `pnpm dlx create-next-app@latest <scratch>/next-skel --ts --eslint --app --no-tailwind --no-src-dir --import-alias "@/*" --use-pnpm --yes`. Copy `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs` into the repo. Do not copy boilerplate images or CSS.
- [ ] **Step 3:** Set `"name": "portfolio"`, `"type": "module"`, the scripts above, and add `lenis`. Add `"allowImportingTsExtensions": true` to tsconfig. Run `pnpm install`.
- [ ] **Step 4:** Write a minimal `app/layout.tsx` (`<html lang="en">`) and `app/page.tsx` rendering `<main><h1>Elshan</h1></main>`.
- [ ] **Step 5:** Run `pnpm build && pnpm lint`. Expected: both succeed; build output lists `/` as static (○).
- [ ] **Step 6:** Commit `replace gatsby with next.js` and push.

---

### Task 2: Content model and pure helpers

**Files:**
- Create: `lib/types.ts`, `lib/time.ts`, `lib/timeline.ts`, `lib/projects.ts`, `content/site.ts`, `content/projects.ts`, `content/timeline.ts`
- Test: `lib/time.test.ts`, `lib/timeline.test.ts`, `lib/projects.test.ts`, `content/content.test.ts`

**Interfaces:**
- Produces (`lib/types.ts`):
  - `type TimelineTag = 'career' | 'shipped' | 'craft'`; `type TimelineFilter = 'all' | TimelineTag`
  - `interface TimelineEntry { period: string; title: string; description: string; tags: TimelineTag[]; inProgress: boolean; href?: string }`
  - `interface ExternalLink { label: string; href: string; display: string }`
  - `type MediaTone = 'surface' | 'surface-strong' | 'inverse'`
  - `interface CaseSection { heading: string; paragraphs: string[] }`
  - `interface Project { slug: string; index: string; title: string; period: string; role: string; summary: string; stack: string[]; inProgress: boolean; media: { tone: MediaTone; label: string; src?: string; width?: number; height?: number }; links: ExternalLink[]; sections: CaseSection[] }`
  - `interface Site { name: string; fullName: string; role: string; location: string; timeZone: string; utcOffsetLabel: string; employer: string; employerRole: string; availability: string; email: string; links: ExternalLink[]; about: string[] }`
- Produces (`lib/time.ts`): `formatClock(date: Date, timeZone: string): string` returns `HH:MM`, 24-hour.
- Produces (`lib/timeline.ts`): `TIMELINE_FILTERS: readonly TimelineFilter[]` = `['all', 'career', 'shipped', 'craft']`; `filterTimeline(entries: TimelineEntry[], filter: TimelineFilter): TimelineEntry[]`; `filterLabel(filter: TimelineFilter): string` (`'All'`, `'Career'`, …).
- Produces (`lib/projects.ts`): `getProject(slug: string): Project | undefined`; `projectSlugs(): string[]`; `nextProject(slug: string): Project` (wraps to first).
- Produces (`content/*`): `site: Site`, `projects: Project[]` (order dayaq, frontpage, qaqash), `timeline: TimelineEntry[]` (10 entries in spec order).

- [ ] **Step 1: Write failing tests**

```ts
// lib/time.test.ts
test('shows Baku time for a UTC instant', () => {
  assert.equal(formatClock(new Date('2026-11-25T10:32:00Z'), 'Asia/Baku'), '14:32')
})
test('pads hours and minutes', () => {
  assert.equal(formatClock(new Date('2026-11-25T20:05:00Z'), 'Asia/Baku'), '00:05')
})
```

```ts
// lib/timeline.test.ts  (uses a 3-entry fixture: career-only, shipped+career, craft)
test('all returns every entry in order', ...)            // length 3, same order
test('career keeps entries tagged career', ...)          // titles ['A', 'B']
test('craft keeps only craft entries', ...)              // titles ['C']
test('filterLabel capitalises', ...)                     // filterLabel('shipped') === 'Shipped'
```

```ts
// lib/projects.test.ts
test('getProject finds by slug', ...)                    // getProject('frontpage')?.title === 'frontpage'
test('getProject returns undefined for unknown slug', ...)
test('nextProject wraps from last to first', ...)        // nextProject('qaqash').slug === 'dayaq'
test('projectSlugs keeps content order', ...)            // ['dayaq', 'frontpage', 'qaqash']
```

```ts
// content/content.test.ts
test('timeline has 10 entries and qaqash, budget-tracker, gamelog are in progress', ...)
test('every timeline entry has at least one tag', ...)
test('only qaqash project is in progress', ...)
test('site links are email, GitHub, LinkedIn, Telegram in that order', ...)
test('no link points to fll.az', ...)                    // over site.links and every project's links
```

- [ ] **Step 2:** Run `pnpm test`. Expected: FAIL (modules not found).
- [ ] **Step 3:** Implement `lib/types.ts`, `lib/time.ts` (`Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })`), `lib/timeline.ts`, `lib/projects.ts`.
- [ ] **Step 4:** Write `content/site.ts`: name `Elshan`, fullName `Elshan Akbarov`, role `Front-end engineer`, location `Baku, AZ`, timeZone `Asia/Baku`, utcOffsetLabel `GMT+4`, employer `Pasha Bank`, employerRole `Front-end engineer`, availability `Open to freelance`, email `elshanxakbarov@gmail.com`. Links: Email `mailto:` + address; GitHub `https://github.com/elshanx` (`@elshanx`); LinkedIn `https://www.linkedin.com/in/elshanx/` (`in/elshanx`); Telegram `https://t.me/ElshanAkbarov` (`@ElshanAkbarov`). `about`: the two paragraphs from the Figma About block.
- [ ] **Step 5:** Write `content/timeline.ts` with the 10 entries from the spec. Copy for descriptions is in the Figma timeline. Tags: dayaq `['shipped','career']`; frontpage `['shipped']`; qaqash, devclean, budget-tracker, gamelog, Frontend Mentor, apartment bot `['craft']`; Pasha Bank `['career']`; first portfolio `['shipped']`. Set `href` to `/work/<slug>` for the three case studies.
- [ ] **Step 6:** Write `content/projects.ts`. Card text (summary, stack, period, media label) comes from the Figma cards. Case-study `sections` are drafted from each project's README: `~/dev/pet-projects/frontpage/README.md`, `~/dev/pet-projects/qaqash/README.md`, and `gh api repos/elshanx/dayag/readme --jq .content | base64 -d`. Sections, in this order: `Overview`, `My role`, `Key decisions` (3 short paragraphs), `Status`. Links: dayaq → `https://dayag.az` (check `curl -sI` returns 200; else use `https://dayaq.vercel.app`); frontpage → `https://frontpage-delta.vercel.app` and its GitHub repo; qaqash → its GitHub repo. Media tones: dayaq `surface`, frontpage `surface-strong`, qaqash `inverse`. If a file grows past 150 lines, split per project into `content/projects/<slug>.ts` and re-export.
- [ ] **Step 7:** Run `pnpm test`. Expected: all PASS. Run `pnpm lint`. Expected: clean.
- [ ] **Step 8:** Commit `add content and helpers` and push.

---

### Task 3: Global styles, theme and smooth scroll

**Files:**
- Create: `app/globals.css`, `components/theme/theme-script.ts`, `components/theme/ThemeToggle.tsx`, `components/theme/ThemeToggle.module.css`, `components/smooth-scroll/SmoothScroll.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: CSS custom properties `--bg --surface --surface-strong --text --muted --line --inverse-bg --inverse-text --accent --on-accent`, `--font-sans --font-mono`, `--gutter` (`clamp(20px, 3.4vw, 48px)`); utility classes `.visually-hidden`, `.mono-label` (Label/Mono style), `.reveal`.
- Produces: `THEME_SCRIPT: string` (inline, runs before paint); `<ThemeToggle />` (client); `<SmoothScroll />` (client, renders `<ReactLenis root options={{ anchors: true }} />` only when `matchMedia('(prefers-reduced-motion: reduce)')` does not match).
- Theme contract: `html[data-theme="light" | "dark"]`; storage key `theme` in `localStorage`; with no stored value and no JS, `@media (prefers-color-scheme: dark)` applies dark tokens to `:root:not([data-theme="light"])`.

- [ ] **Step 1:** Write `globals.css`: tokens from the spec (light on `:root`, dark under `[data-theme="dark"]` and the media query above), minimal reset, `body { background: var(--bg); color: var(--text); font-family: var(--font-sans) }`, visible `:focus-visible` outline (2px `--text`, offset 3px), `overflow-wrap: anywhere` on `a`, `.reveal` using `animation-timeline: view()` with `animation-range: entry 0% entry 60%` (from `opacity: 0; translate: 0 32px`), wrapped in `@supports (animation-timeline: view())` and `@media (prefers-reduced-motion: no-preference)`. Import `lenis/dist/lenis.css`.
- [ ] **Step 2:** `layout.tsx`: load `Geist` and `Geist_Mono` as CSS variables; `<html lang="en" suppressHydrationWarning>`; inject `THEME_SCRIPT` with `<script dangerouslySetInnerHTML>` in `<head>`; skip link `<a href="#main" class="visually-hidden-focusable">Skip to content</a>`; render `<SmoothScroll />`. Default `metadata` title template `%s — Elshan`.
- [ ] **Step 3:** `ThemeToggle`: a `<button>` with `aria-label="Switch to dark theme"` / `"Switch to light theme"` reflecting the current theme; on click flips `data-theme` and writes `localStorage`. Read the initial theme from `document.documentElement.dataset.theme` in an effect (no hydration mismatch). Icon: half-filled circle SVG from Figma, `aria-hidden`.
- [ ] **Step 4:** Put the toggle temporarily on `app/page.tsx`. Run `pnpm dev`.
- [ ] **Step 5: Verify with agent-browser**
  - `open http://localhost:3000`, `click` the toggle, `reload`, then `get attr html data-theme`. Expected: `dark`.
  - `set media dark`, clear storage (`eval "localStorage.clear()"`), `reload`, `eval "getComputedStyle(document.body).backgroundColor"`. Expected: `rgb(15, 15, 14)`.
  - `set media light reduced-motion`, `reload`, `eval "document.documentElement.classList.contains('lenis')"`. Expected: `false`. Without reduced-motion: `true`.
- [ ] **Step 6:** `pnpm build && pnpm lint`. Commit `add theme and smooth scroll` and push.

---

### Task 4: Nav, menu and footer

**Files:**
- Create: `components/nav/Nav.tsx`, `components/nav/Nav.module.css`, `components/nav/Menu.tsx`, `components/nav/Menu.module.css`, `components/footer/Footer.tsx`, `components/footer/Footer.module.css`
- Modify: `app/layout.tsx` (render `Nav` above and `Footer` below `{children}`)

**Interfaces:**
- Consumes: `site` (Task 2), `ThemeToggle` (Task 3).
- Produces: `<Nav />` (server component), `<Footer />` (server component). Section anchors used by the menu: `#work`, `#timeline`, `#about`, `#contact`, plus `/cv`.

- [ ] **Step 1:** `Nav`: logo link `elshan®` to `/`, role line `Front-end engineer — Baku, AZ` (hidden under 768px), `ThemeToggle`, and the black `Menu` pill.
- [ ] **Step 2:** `Menu`: native popover, no JS: `<button popovertarget="site-menu">Menu</button>` and `<nav id="site-menu" popover aria-label="Site">` with links to `/#work`, `/#timeline`, `/#about`, `/#contact`, `/cv`. Style it as a full-height panel with large Heading/H2 links.
- [ ] **Step 3:** `Footer`: top-ruled meta row (`© 2026 Elshan`, `Built with Next.js · Hosted on Vercel`, `Back to top ↑` linking `#main`) and the oversized `elshan®` wordmark (`font-size: clamp(88px, 23vw, 330px)`, `aria-hidden`, clipped at the bottom).
- [ ] **Step 4: Verify with agent-browser:** `click` Menu, `snapshot` shows the 5 links; `press Escape`; `is visible #site-menu`. Expected: `false`. Tab from page start: the first focus is the skip link, the second is the logo.
- [ ] **Step 5:** `pnpm build && pnpm lint`. Commit `add nav, menu and footer` and push.

---

### Task 5: Hero, status strip and marquee

**Files:**
- Create: `components/hero/Hero.tsx`, `components/hero/Hero.module.css`, `components/hero/StatusStrip.tsx`, `components/hero/LocalTime.tsx`, `components/marquee/Marquee.tsx`, `components/marquee/Marquee.module.css`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `site`, `formatClock` (Task 2).
- Produces: `<Hero />`, `<Marquee text: string />`, `<LocalTime timeZone: string />` (client; renders `--:--` on the server, then `formatClock(new Date(), timeZone)` and updates every 30 s).

- [ ] **Step 1:** `Hero`: `<h1>` with `site.name`, `font-size: clamp(110px, 31vw, 446px)`, line-height .82, tracking -0.06em; intro paragraph (Body/L, max 560px); `Scroll ↓` mono hint (hidden under 768px). No entrance animation.
- [ ] **Step 2:** `StatusStrip`: `<dl>` with 4 cells (`Local time`, `Status`, `Now`, `Get in touch`). 4 columns from 768px, stacked rows below. Status has the accent dot. `Get in touch` holds `Email ↗` (mailto) and `CV ↗` (`/cv`).
- [ ] **Step 3:** `Marquee`: visually-hidden `<h2 id="work-heading">Selected work</h2>` plus an `aria-hidden` element with CSS module class `track` containing the phrase and accent dots twice, animated with `@keyframes` `translate: -50%` over 30 s linear infinite; `animation: none` under reduced motion.
- [ ] **Step 4:** Compose `/`: `Hero`, `Marquee text="Selected work"`.
- [ ] **Step 5: Verify:** `pnpm build && pnpm start`, then `curl -s localhost:3000 | grep -c "Open to freelance"`. Expected: `1` or more. agent-browser at 1440×900: `screenshot` and compare with the Figma hero (name spans the content width, status strip under the intro). At 375: `eval "document.documentElement.scrollWidth <= innerWidth"`. Expected: `true`.
- [ ] **Step 6:** `pnpm lint`. Commit `add hero and marquee` and push.

---

### Task 6: Selected work grid

**Files:**
- Create: `components/work/WorkGrid.tsx`, `components/work/WorkGrid.module.css`, `components/work/ProjectCard.tsx`, `components/work/ProjectCard.module.css`, `components/work/ProjectMedia.tsx`, `components/badge/Badge.tsx`, `components/badge/Badge.module.css`
- Create (assets): `public/work/dayaq.webp`, `public/work/frontpage.webp`, `public/work/qaqash.gif` (if found)
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `projects`, `Project`, `MediaTone` (Task 2).
- Produces: `<Badge>{children}</Badge>` (accent pill, mono), used again in Tasks 7 and 8; `<ProjectMedia media: Project['media'] priority?: boolean />` used again in Task 8.

- [ ] **Step 1:** Capture screenshots: `agent-browser set viewport 1440 1000`, `open` each live URL, `screenshot <scratch>/<slug>.png`; convert to WebP with `sips -s format webp` (or keep PNG if `sips` lacks WebP). Copy the qaqash demo GIF from `~/dev/pet-projects/qaqash` (find it with the README's image path). Set `media.src`, `width`, `height` in `content/projects.ts`.
- [ ] **Step 2:** `ProjectMedia`: `next/image` when `src` exists (`sizes="(min-width: 768px) 50vw, 100vw"`, `unoptimized` for the GIF), otherwise a tone-filled block with the mono label. Radius 20px (14px under 768px).
- [ ] **Step 3:** `ProjectCard`: the whole card is one link to `/work/<slug>`; title row = index, `<h3>` title, `Badge` when `inProgress`, period on the right; summary (muted); stack joined with ` · ` (mono). Card has class `reveal`.
- [ ] **Step 4:** `WorkGrid`: `<section id="work" aria-labelledby="work-heading">`, two columns from 768px with 96px gap; left = projects 1 and 3, right = project 2 then the "More in the timeline" note, right column `padding-top: 240px`. One column below 768px in content order.
- [ ] **Step 5: Verify:** `curl -s localhost:3000 | grep -o 'href="/work/[a-z]*"' | sort -u`. Expected: three hrefs. agent-browser screenshot at 1440 matches the Figma grid offset.
- [ ] **Step 6:** `pnpm build && pnpm lint`. Commit `add selected work grid` and push.

---

### Task 7: Timeline, about and contact

**Files:**
- Create: `components/timeline/Timeline.tsx` (client), `components/timeline/Timeline.module.css`, `components/timeline/TimelineRow.tsx`, `components/link-row/LinkRow.tsx`, `components/link-row/LinkRow.module.css`, `components/about/AboutContact.tsx`, `components/about/AboutContact.module.css`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `timeline`, `filterTimeline`, `TIMELINE_FILTERS`, `filterLabel`, `site`, `Badge`.
- Produces: `<LinkRow link: ExternalLink />` (label left, display + arrow right, bottom rule), reused in Task 9.

- [ ] **Step 1:** `Timeline`: `<section id="timeline">` with mono count line (`2020 — 2026 · N entries`, N follows the filter), `<h2>Timeline</h2>`, filter group `<div role="group" aria-label="Filter timeline">` of `<button aria-pressed>` chips, and an `<ol>` of `TimelineRow`. A visually-hidden `aria-live="polite"` region announces `Showing N entries`. Default filter `all`, so the server HTML has all 10 rows.
- [ ] **Step 2:** `TimelineRow`: grid `180px 1fr auto` from 768px (year / title + description / tags + optional `Badge`), stacked below. Title links to `href` when present. Row has class `reveal`.
- [ ] **Step 3:** `AboutContact`: two columns from 768px. Left: `<h2 id="about" class="mono-label">About</h2>` and `site.about` paragraphs. Right: `<h2 id="contact" class="mono-label">Contact</h2>`, the line `Let’s build something.` (Display/M size, not a heading), `site.links` as `LinkRow`s plus a `CV` row to `/cv`.
- [ ] **Step 4: Verify (no JS):** each row `<li>` carries `data-timeline-entry`. `curl -s localhost:3000 | grep -o 'data-timeline-entry' | wc -l`. Expected: `10`. agent-browser: `click` the `Craft` chip, `eval "document.querySelectorAll('[data-timeline-entry]').length"`. Expected: `6`. `get attr` on the chip `aria-pressed`. Expected: `true`. Tab to the chips and press Enter on `Career`. Expected: `2` rows (dayaq, Pasha Bank).
- [ ] **Step 5:** `pnpm build && pnpm lint`. Commit `add timeline and contact` and push.

---

### Task 8: Case study pages

**Files:**
- Create: `app/work/[slug]/page.tsx`, `app/work/[slug]/page.module.css`, `components/case-study/CaseMeta.tsx`, `components/case-study/NextProject.tsx`, `app/not-found.tsx`

**Interfaces:**
- Consumes: `getProject`, `projectSlugs`, `nextProject`, `ProjectMedia`, `Badge`.
- Produces: route `/work/[slug]` with `generateStaticParams()` from `projectSlugs()`, `export const dynamicParams = false`, and `generateMetadata()` (title = project title, description = summary).

- [ ] **Step 1:** Page layout: back link `← All work` (`/#work`); `<h1>` title at Display/L size with `Badge` when in progress; `CaseMeta` `<dl>` with Role / Period / Stack / Status (`Live` or `In progress`); `ProjectMedia` with `priority`; each `CaseSection` as `<h2>` + paragraphs in a 720px column; external links as buttons-styled anchors with `rel="noopener"`; `NextProject` linking to `nextProject(slug)` with its title at Display/M size.
- [ ] **Step 2:** `not-found.tsx`: `404` at Display/L, one line, link home.
- [ ] **Step 3: Verify:** `pnpm build` lists `/work/dayaq`, `/work/frontpage`, `/work/qaqash` as SSG (●). With `pnpm start`: `curl -s -o /dev/null -w '%{http_code}' localhost:3000/work/nope`. Expected: `404`. agent-browser: open `/work/qaqash`, `get text h1` contains `qaqash`, the page shows `In progress`; the next-project link points to `/work/dayaq`.
- [ ] **Step 4:** `pnpm lint`. Commit `add case study pages` and push.

---

### Task 9: CV page and PDF

**Files:**
- Create: `app/cv/page.tsx`, `app/cv/page.module.css`, `components/cv/PrintButton.tsx` (client), `public/cv.pdf`

**Interfaces:**
- Consumes: `site`, `timeline`, `projects`, `LinkRow`.

- [ ] **Step 1:** `/cv`: name (`site.fullName`), role, location, contact links; `Experience` (Pasha Bank entry + dayaq freelance); `Selected projects` (3 projects: title, one-line summary, stack); `Skills` (from the union of project stacks, de-duplicated with `new Set`). Buttons: `Download PDF` (`/cv.pdf`, `download`) and `PrintButton` (`window.print()`). `metadata.title = 'CV'`.
- [ ] **Step 2:** Print CSS in the page module: `@media print` hides nav, footer, buttons, smooth-scroll styles; black on white; A4 margins 16mm; fits one page.
- [ ] **Step 3:** Generate the PDF: `pnpm build && pnpm start`, `agent-browser open localhost:3000/cv`, `agent-browser pdf public/cv.pdf`. Open it and check it is one page with no nav or buttons.
- [ ] **Step 4:** `pnpm lint`. Commit `add cv page and pdf` and push.

---

### Task 10: Metadata, motion and acceptance pass

**Files:**
- Create: `app/opengraph-image.tsx`, `app/work/[slug]/opengraph-image.tsx`, `components/og/og-frame.tsx` (shared JSX for both images), `app/sitemap.ts`, `app/robots.ts`, `app/icon.svg`, `lib/site-url.ts`
- Test: `lib/site-url.test.ts`
- Modify: `app/layout.tsx` (`metadataBase`, default description), CSS files where checks fail

**Interfaces:**
- Produces: `siteUrl(env: Record<string, string | undefined>): string` returns `https://${VERCEL_PROJECT_PRODUCTION_URL}` when set, else `http://localhost:3000`.

- [ ] **Step 1: Failing test:** `siteUrl({ VERCEL_PROJECT_PRODUCTION_URL: 'elshanx.vercel.app' }) === 'https://elshanx.vercel.app'` and `siteUrl({}) === 'http://localhost:3000'`. Run `pnpm test`. Expected: FAIL.
- [ ] **Step 2:** Implement `siteUrl`; use `siteUrl(process.env)` for `metadataBase`, sitemap and robots. Run `pnpm test`. Expected: PASS.
- [ ] **Step 3:** OG images 1200×630 via `ImageResponse`: bg `#E9E9E6`, big name or project title in bold, mono role line, accent dot. Sitemap lists `/`, `/cv` and the three case studies; robots allows all and points to the sitemap. `icon.svg`: lowercase `e` in black on the accent color.
- [ ] **Step 4: Acceptance checks** against `pnpm build && pnpm start`:
  - No horizontal scroll: `agent-browser set viewport W 900` for W in 320, 375, 768, 1440, on `/`, `/work/dayaq`, `/cv`; `eval "document.documentElement.scrollWidth <= innerWidth"`. Expected: `true` every time.
  - Reduced motion: `set media light reduced-motion`; `eval "getComputedStyle(document.querySelector('[class*=track]')).animationName"`. Expected: `none`. `.reveal` elements have `opacity: 1`.
  - Lighthouse mobile on `/` and `/work/dayaq` (chrome-devtools MCP `lighthouse_audit`, or `pnpm dlx lighthouse <url> --preset=perf --form-factor=mobile` with Elshan's OK for the download). Expected: Performance, Accessibility, Best Practices, SEO all ≥ 95, and no failed audits in the Accessibility category (these are axe-core rules, which covers the spec's "no axe violations"). Fix and re-run until they pass.
  - Keyboard: Tab through `/` from the top. Every link, chip, menu and toggle gets a visible focus ring, in a logical order.
  - `curl -s localhost:3000/sitemap.xml` lists 5 URLs; `curl -sI localhost:3000/opengraph-image` returns `image/png`.
  - `git ls-files | grep -i gatsby` prints nothing.
- [ ] **Step 5:** `pnpm lint && pnpm test && pnpm build`. Commit `add metadata and pass acceptance checks` and push.
- [ ] **Step 6: Hand over to Elshan** (not code): import the repo in Vercel (this creates an account resource, so Elshan does it); every push to `redesign` then gets a preview URL. Then list the open items from the spec that are still placeholders in `content/site.ts`. Merge to `master` and retire Netlify only when Elshan says so.
