# context.md

> Living context document for AI agents and developers working on this repo.
> Read this first to ramp up fast. Keep it updated when you make non-obvious decisions or changes.
> Last updated: 2026-06-22 (initial authoring after full codebase read).

---

## 1. What this is

A personal website / portfolio for **Fabian Ashton** (a UPenn CS student, engineer & entrepreneur).
It's a single-screen "home" landing page plus two secondary routes (Projects, Writing). The README
explicitly offers the site as a reusable template.

Live persona content lives in components and `src/data` — there is no CMS or backend. Blog posts are
local markdown files.

## 2. Tech stack

- **Next.js 15** (App Router, `src/app`) — `next@^15.2.4`
- **React 19**
- **TypeScript** (strict, path alias `@/*` → `src/*` via `tsconfig.json`)
- **Tailwind CSS 3** (`tailwind.config.ts`, theme tokens are CSS vars defined in `globals.css`)
- **cmdk** — command palette (Cmd/Ctrl+K)
- **@radix-ui/react-dialog** — dialog primitive under the command palette
- **lucide-react** — icons
- **framer-motion** — only used by the (currently unmounted) `Toast` component
- **gray-matter + remark + remark-html** — markdown → HTML for blog posts
- **clsx + tailwind-merge** — `cn()` helper in `src/lib/utils.ts`

Scripts: `npm run dev` / `build` / `start` / `lint`. Deploys to **Vercel** (note commit
`0b1115d "track posts directory for Vercel builds"`).

## 3. Routes / pages

| Route | File | Rendering | Notes |
|-------|------|-----------|-------|
| `/` | `src/app/page.tsx` → `SiteShell` | client | Single-screen landing. Sections: Header, Projects (CTA card), Socials, Footer. |
| `/projects` | `src/app/projects/page.tsx` | client | Horizontal infinite-loop carousel of project cards. |
| `/writing` | `src/app/writing/page.tsx` | server | Lists blog posts (from `posts/*.md`). |
| `/writing/[slug]` | `src/app/writing/[slug]/page.tsx` | server, `generateStaticParams` | Renders a single post's HTML. |

Each route has a `loading.tsx` skeleton. `layout.tsx` wraps everything and mounts the global
`<HeaderControls />` (fixed top-right search/theme/menu cluster) and `<GlobalCommand />` (command
palette) on every page. (The old `<BottomNav />` was removed 2026-06-22.)

## 4. Architecture & key concepts

### Layout shell
`src/app/layout.tsx` loads Google fonts (Manrope = sans, IBM Plex Mono = mono) as CSS vars, sets
global metadata, runs the no-flash theme script, and always renders `HeaderControls` + `GlobalCommand`.
The page background (CSS dotted pattern) and design tokens are set in `globals.css` `:root` / `body`.

### Home page sections (`src/components/sections/`)
- `header-section.tsx` — the main bio/hero. **Exports `siteEmail` (the `EMAIL` const) and `headerSectionMeta`.** Hardcoded email here is `fashton502@gmail.com`. Contains inline `<style jsx>` and inline color styles (`#ff66c4` pink accents).
- `projects-section.tsx` — just a CTA card linking to `/projects` (not the actual project list). Exports `projectsSectionMeta`.
- `socials-section.tsx` — social icons that expand on hover. **Exports `socialLinks` + `socialsSectionMeta`,** both consumed by the command palette.
- `footer-section.tsx` — static footer. Exports `footerSectionMeta`.
- `work-section.tsx` — **NOT mounted anywhere** (dead/placeholder). Contains template `workUpdates` data (Wait/Omega/Theta — fake). Safe to delete or repurpose.

**Pattern:** each section co-locates a `<name>SectionMeta = { id, title }` export. These metas + `socialLinks` are imported by `global-command.tsx` to build command-palette entries, so section `id`s double as scroll anchors. Keep `id`s in sync.

### Command palette (Cmd/Ctrl+K)
- `global-command.tsx` (mounted in layout) builds the `CommandActionItem[]` list from section metas, hardcoded route items, and `socialLinks`, then handles selection (`scroll` / `route` / `link` / `copy-email`). It also prefetches `/projects` and `/writing`, and listens for a custom `"open-command-palette"` window event (dispatched by `cmd-k-button.tsx`).
- `command-palette.tsx` — the presentational dialog: preview header, search input, Navigation + Links groups, footer. Uses `ui/command.tsx` (cmdk wrappers) inside `ui/dialog.tsx` (radix wrappers).
- Keyboard: `Cmd/Ctrl+K` toggles the palette (in `global-command`); pressing **`C`** anywhere (not in an input) copies the email (in `site-shell.tsx`).

### Projects carousel (`src/app/projects/page.tsx`)
Custom infinite horizontal carousel — **no library**. Renders 3 copies (`SETS = 3`) of `projects` and
on `scrollend` silently jumps `scrollLeft` back into the middle set to fake an infinite loop. Cards scale
& fade based on distance from container center (`updateScales`). Clicking the centered card opens its
`href`; clicking a non-centered card scrolls it to center. Vertical wheel is converted to horizontal
scroll. Card dimensions (320/380px) are hardcoded and must match the spacer widths and `oneSetWidth` math.

### Data
- `src/data/projects.ts` — `ProjectItem[]` (DeepShield, Horizon, The Codepreneur Network). Images live in `public/placeholders/`.
- `src/types/site.ts` — shared interfaces (`ProjectItem`, `WorkUpdateItem`, `SocialLinkItem`, `CommandActionItem`).

### Blog (`src/lib/posts.ts`)
Reads `posts/*.md` at request/build time. `getAllPostsMeta` (sorted newest-first by `date` string),
`getAllPostSlugs` (for `generateStaticParams`), `getPostBySlug` (remark → HTML). Frontmatter keys:
`title`, `date` (ISO `YYYY-MM-DD`), `summary`, `image` (optional). Currently one post:
`posts/lessons-2025.md` (titled "What Must Be Done"). Blog content styled by `.prose` rules in `globals.css`.

### Styling system
Design tokens are CSS custom properties in `globals.css` `:root`, surfaced to Tailwind as named colors
(`bg`, `panel`, `panel2`, `text`, `muted`, `accent`, `border`) in `tailwind.config.ts`. Recurring
"frosted pill / card" look is a long hardcoded `shadow-[...]` string repeated across `bottom-nav`,
`cmd-k-button`, `project-card`, `projects-section`, `dialog`, `toast`. The signature dark gradient
background is on `body`. `prefers-reduced-motion` is respected globally.

## 5. Known rough edges / gotchas (verify before relying on these)

- **`work-section.tsx` is unused** and full of placeholder/fake data.
- **`Toast` + `IOSpinner`** (`components/toast.tsx`, `components/spinner.tsx`) exist but `Toast` is **not mounted anywhere**. Leftover UI kit pieces.
- **Placeholder social `value`s**: in `socials-section.tsx` the `value` fields are stale template text (`@jacob`, `@jv`, `/in/jacobvos`) even though the `href`s are correct (Fabian's real X/GitHub/LinkedIn). The command palette shows these `value`s as descriptions — worth fixing.
- **Two email constants**: `EMAIL` in `header-section.tsx` and `social-email` in `socials-section.tsx` both hardcode `fashton502@gmail.com`. Keep in sync if changed.
- **`projectsSectionMeta`** is exported but the home page uses a single CTA card, not a scrollable projects section; `global-command` builds its own hardcoded route item for `/projects` instead of using this meta.
- **README to-do**: "Fix mobile projects section" and "Update Blog elements" are open.
- **Carousel magic numbers**: card widths (320/380) and gap (20) are duplicated across `page.tsx` and `project-card.tsx`. Changing one requires changing all.
- `.dist/`, `.next/`, `node_modules/`, `tsconfig.tsbuildinfo` are build artifacts (gitignore covers `.next`, `out`, `*.tsbuildinfo`, but not `.dist`).

## 6. Conventions

- Server components by default; add `"use client"` only when needed (interactivity, hooks, browser APIs).
- Import via `@/` alias, never long relative paths.
- Co-locate section metadata exports next to section components.
- Tailwind utility classes inline; shared tokens via CSS vars, not magic hex (except the established accent hexes like `#ff66c4` and the shadow string).
- Icons from `lucide-react`.

## 7. Decision / change log

> Append an entry whenever you make a non-obvious change. Format: `YYYY-MM-DD — what & why`.

- **2026-06-22** — **Critical mobile perf fix** on the Cinematic Reel. Symptom: tapping the menu-curtain → "Projects" froze the curtain mid-slide for 3–4s, mobile only. Root cause: the ambient bloom was a full-viewport `next/image` with `scale-150 ... blur-[90px]`, rendered for all 3 scroll-snap panels at once — three full-screen 90px blur rasterizations stalled mobile GPUs/compositor, which blocked the framer-motion curtain exit (a main-thread rAF transform) from running. Fix: replaced the blurred-image bloom with a **GPU-cheap `radial-gradient` glow in each project's `accent` color** (no image decode, no filter), keeping the same cinematic look. Also moved `priority` from the (now-removed) bloom image to the first panel's hero image for LCP. Lesson: avoid large `blur()`/`backdrop-blur` filters on full-screen, always-mounted elements — they're fine on desktop but murder mobile.
- **2026-06-22** — Per-project **button accent** on the Cinematic Reel. Added optional `accent?: string` (hex) to `ProjectItem`; the "View project" button now derives its gradient/shadow from `project.accent` via inline style + `color-mix` (top = accent mixed 82% with white). Set DeepShield `#38b6ff` (blue), Horizon `#ff7a18` (orange), Codepreneur `#ffffff` (white). NOTE: Codepreneur (`project-5`) has no `href`, so its (white) button does not render until a link is added to `data/projects.ts`.
- **2026-06-22** — **Projects section redesigned → "Cinematic Reel"** (chosen via a Lavish design-review artifact at `.lavish/projects-redesign.html`, now gitignored). Replaced the horizontal infinite carousel in `src/app/projects/page.tsx` with a full-viewport vertical **scroll-snap reel**: one project per `h-dvh snap-start` panel inside a `snap-y snap-mandatory` scroll container. Per panel: an **ambient bloom** (an oversized `blur-[90px]` copy of the project's own image) + radial vignette, then a 2-col (lg) / stacked (mobile) layout with the image in a frosted-shadow frame and copy (badge, big title, summary, tags, **"View project ↗"** gradient CTA). Nav: clickable **dot rail** (right), **↑/↓ keyboard** keys, native swipe/scroll, and a bounce **scroll hint** on panel 0; active panel tracked via `IntersectionObserver`. **No index numbering** (user opted out). Content fades/translates in per active panel via transitions; `goTo()` and the global reduced-motion CSS rule respect `prefers-reduced-motion`. Added optional `badge?: string` to `ProjectItem` (`types/site.ts`) + values in `data/projects.ts` (edit these to set each project's status/year label). Deleted the now-unused `src/components/project-card.tsx`; rewrote `projects/loading.tsx` skeleton to match. Reused the signature frosted shadow via a `FROST` constant. (Note: §4 "Projects carousel" description above is now historical.)
- **2026-06-22** — Mobile fixes. (1) **Background gaps:** the dotted background is now painted by a `body::before { position: fixed; inset: 0; z-index: -1 }` layer instead of `background-image` + `background-attachment: fixed` on `<body>`. `background-attachment: fixed` was unreliable on mobile (URL-bar show/hide left solid black/white gaps); a fixed full-viewport pseudo-element always covers the dynamic viewport. `<body>` keeps `background-color: var(--color-bg)` as a fallback. (2) **Project cards clipped on mobile:** capped card height to the dynamic viewport so the carousel's `overflow-hidden` no longer clips card tops on short screens — `h-[420px] sm:h-[480px]` → `h-[min(420px,72dvh)] sm:h-[min(480px,80dvh)]` in `project-card.tsx` (and the matching skeleton in `projects/loading.tsx`). Desktop is unchanged because `min()` resolves to the fixed px there. The carousel JS (`updateScales`) only uses card *width* (320/380), so height changes don't affect its math.
- **2026-06-22** — Removed the bottom floating nav. Deleted `src/components/bottom-nav.tsx` and its `<BottomNav />` render + import in `layout.tsx`. Navigation is now handled by the top-right menu curtain (`MenuCurtain`) in `HeaderControls`. (Note: §3 "Layout shell" and §4 still mention BottomNav — historical; it no longer exists.)
- **2026-06-22** — Blog **post-page header** redesign + per-post icon. Added two optional frontmatter fields, parsed in `src/lib/posts.ts` (`PostMeta`/`Post`): `icon` (path under `/public`, e.g. `/penn.png`) and `iconSize` (px, default 56). On the post page (`src/app/writing/[slug]/page.tsx`) the header is now centered (`flex flex-col items-center text-center`), the title enlarged (`text-3xl sm:text-4xl`), and the `icon` renders via `next/image` above the title at `iconSize` (coerced with `Number(...) || 56`). Demoed by adding `icon: "/penn.png"` + `iconSize: 64` to `posts/lessons-2025.md`. Icons are NOT shown on the `/writing` list yet — easy follow-up if wanted. To add an icon to a post: drop the image in `public/` and set `icon`/`iconSize` in the post's frontmatter.
- **2026-06-22** — Made the top-right controls (search / theme / menu) **global across all routes**. Extracted them into `src/components/header-controls.tsx` and render `<HeaderControls />` once in `layout.tsx`; removed the inline copy (and its imports) from `header-section.tsx`. `HeaderControls` is a `position: fixed` cluster (`z-40`) aligned to the content column (`max-w-[780px]` + same page padding as the home `<main>`) with `pointer-events-none` on the wrapper / `pointer-events-auto` on the buttons so it doesn't block the page. Chose this over putting raw buttons in layout to avoid home-page duplication and keep alignment consistent with content. Trade-off: framer-motion (via `MenuCurtain`) now ships on every route.
- **2026-06-22** — Trimmed the Cmd+K palette: removed the "Go to Socials" and "Go to Footer" entries. In `global-command.tsx`, `baseSections` is now just `[headerSectionMeta]` (only "Go to Home" remains under Navigation); dropped the now-unused `socialsSectionMeta`/`footerSectionMeta` imports and their `sectionMeta` records. `socialLinks` is still imported (used for the Links group).
- **2026-06-22** — Added a **menu curtain**. New `src/components/menu-curtain.tsx` renders a `Menu` (lucide) pill button — placed in `header-section.tsx` next to the search + theme buttons — that opens a full-screen overlay (`z-[60]`) sliding down from the top (framer-motion). The pane uses the *opposite* color of the current theme via new tokens `--curtain-bg`/`--curtain-text` in `globals.css` (dark site → white pane, light site → near-black pane) and contains staggered Home / Projects / Writing `next/link`s that route and close the curtain. Closes on link click, the X button, or Escape.
- **2026-06-22** — Implemented **light mode**. (1) Added `:root[data-theme="light"]` token overrides in `globals.css` plus new page-text tokens `--text-body`, `--text-soft`, `--text-kbd`, `--underline` (defined for both themes so dark mode is unchanged). (2) New `src/components/theme-toggle.tsx` (lucide `Sun`/`Moon`) persists the choice to `localStorage` and sets `data-theme` on `<html>`; placed next to the search bar in `header-section.tsx`. (3) No-flash inline script added to `<head>` in `layout.tsx` (reads `localStorage.theme`, defaults dark; `<html suppressHydrationWarning>`). (4) Tokenized previously-hardcoded text/underline colors (header bio grays + underlines, socials icons, projects/writing/post page back-links & headings, `.prose`, `.section-label`) so text stays readable on a light background. **Design note:** the floating dark-glass UI (cmd-k button, theme toggle, bottom nav, project cards, command palette dialog) intentionally stays dark in both themes. Theme = `dark` (default) | `light`, stored under `localStorage` key `theme`, applied as `<html data-theme>`. Build verified green.
- **2026-06-22** — Replaced the `public/gradient.jpg` image background (+ its dimming `linear-gradient` overlay) on `body` with a pure-CSS dotted pattern (`radial-gradient` dots) in `globals.css`. Added `--dot-color` (`#1c2029`) and `--dot-size` (`22px`) tokens in `:root` and switched `body` to `var(--color-bg)`. **Why:** prep for a light mode that toggles colors via tokens (override `--color-bg`/`--color-text`/`--dot-color`) instead of swapping a background image, avoiding the extra image load. `gradient.jpg` is now unused but kept in `public/`.
- **2026-06-22** — Created this `context.md` after a full read-through of the codebase. No code changes; documentation only. Recorded architecture, the command-palette/section-meta pattern, the custom infinite carousel, the markdown blog pipeline, and the list of dead/placeholder code (`work-section`, `Toast`, stale social `value`s).
