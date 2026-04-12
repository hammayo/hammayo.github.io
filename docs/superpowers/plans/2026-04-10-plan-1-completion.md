# Phase 1: Foundation — Consolidated Summary

**Branch:** `feature/plan-1-foundation` → merged to `develop` → merged to `main` via PR #12  
**Date completed:** 2026-04-10  
**Status:** ✅ Complete and merged  
**Detailed plan steps:** `docs/superpowers/plans/2026-04-10-plan-1-foundation.md`  
**Design spec:** `docs/superpowers/specs/2026-04-10-website-revamp-design.md`

> This is the single reference document for all Phase 1 changes. The foundation plan file (`plan-1-foundation.md`) contains the step-by-step task breakdown; this doc summarises what was actually delivered, deviations, and the commit log.

---

## What Was Delivered

### Dependency Upgrades

| Package | From | To | Notes |
|---|---|---|---|
| Tailwind CSS | v3 | v4 | CSS-first config via `@theme {}` in `globals.css` |
| `@tailwindcss/postcss` | — | added | Replaces `tailwindcss` + `autoprefixer` in PostCSS |
| `tw-animate-css` | — | added | v4-compatible replacement for `tailwindcss-animate` |
| `tailwind-merge` | v2 | v3 | Required for Tailwind v4 class name support |
| Next.js | v15 | v16 | App Router, static export preserved |
| Zod | v3 | v4 | Schema updated in `src/lib/env.ts` |
| Lucide React | v0 | v1 | Icon imports audited and verified |
| Octokit | v4 | v5 | `src/lib/github.ts` updated |
| Framer Motion | v12.5 | v12.38 | No breaking changes |
| React | 19.2.4 | 19.2.5 | Patch only |
| shadcn/ui | v3 compat | v4 compat | Re-added via `bunx shadcn@latest add` |

### Architecture Restructure

- `src/components/` fully removed
- All shared components moved to `src/features/shared/`
- Feature domains created: `home/`, `projects/`, `contact/`, `shared/`
- `src/design/schemes.ts` — scheme registry with 4 named schemes
- `src/design/variants.ts` — CVA variant configs
- `src/providers/scheme-provider.tsx` — time-of-day scheme resolution, CSS var injection, reduced-motion support

### CI/CD Hardening

- **Gitleaks** secret scanning job added to `deploy.yml` — blocks `build` job on any detected secret
- `.gitleaks.toml` added to repo root for false-positive allowlisting
- Cache key extended to include `content/**/*.mdx` (prevents stale blog content on new posts)
- `version-increment.yml` migrated from `npm ci` to `bun install` for toolchain consistency

### Layout & UX Fixes (delivered during QA)

These were not in the original plan spec but required to ship a working foundation:

| Issue | Fix |
|---|---|
| Browser-level scrollbar on all pages | `h-dvh overflow-hidden` on root + `overflow-y-auto` on `main` — content scrolls inside frame |
| `PageTransitionWrapper` forcing `min-h-screen` | Replaced with `flex-1 flex flex-col` — removed `pt-28 pb-20` |
| Page headings invisible | `animated-background` (`fixed z-0`) painted above `main` — fixed with `relative z-[1]` on `main` and `footer` |
| Content bleeding through header while scrolling | Header opacity `bg-white/10` → `bg-white/80` / `dark:bg-zinc-950/80` |
| Route progress bar misaligned | `top-[64px]` → `top-[45px]` to match compact header height |
| Header and footer too tall | `py-4` → `py-2`, logo 38px → 28px; footer single-row with `py-2` |
| Home page overflowing viewport | `min-h-[calc(100vh-144px)]` → `flex-1 flex flex-col items-center justify-center` |
| `next lint` removed in Next.js 16 | `"lint": "next lint"` → `"lint": "eslint src"`, added `.eslintrc.js` with `root: true` |
| GitHub token error log in dev | Downgraded from `error` to `info` in `src/lib/github.ts` |

### Visual Polish (delivered during QA)

| Change | Detail |
|---|---|
| Hero gradient — wider colour range | 6-stop gradient: `#a855f7, #818cf8, #38bdf8, #34d399, #f472b6, #a855f7` with `background-size: 400%` |
| Nav logo name — animated gradient | Same 6-stop gradient applied to "Hammayo" / "Hammy" spans in header |
| Hero mobile nickname | Desktop shows `HAMMAYO`, mobile shows `HAMMY` — CSS-only via two `hidden md:inline` / `md:hidden` spans (no JS state, no hydration flash) |

---

## Files Changed from Plan (deviations)

| Deviation | Reason |
|---|---|
| `tailwind.config.ts` not deleted (kept as empty shim) | Next.js 16 still resolves the file — safe to delete in Plan 2 cleanup |
| `src/app/blogs/page.tsx` kept unchanged | Redirect to `/blog` is a Plan 2 deliverable |
| Nav links for Blog/CV/About added but pages don't exist yet | Placeholder links for visual QA; 404 until Plan 2/3 deliver the pages |
| `.eslintrc.json` → `.eslintrc.js` | `next lint` removal forced migration; `root: true` added to prevent worktree config leak |

---

## Commits (oldest → newest)

```
4f5ea81 chore: upgrade tailwind v3→v4, replace autoprefixer with @tailwindcss/postcss
b0bf2b2 chore: migrate globals.css to Tailwind v4, move keyframes and @theme, add scheme CSS vars
c9a3cb6 chore: re-add shadcn/ui components for Tailwind v4 compatibility, update components.json
8687bcd chore: upgrade Next.js v15→v16, fix React imports for react-jsx transform, remove legacy pages/ dir
02df937 chore: upgrade zod v4, lucide v1, octokit v5, framer-motion v12, react 19
41ba11f feat: add design/schemes.ts and design/variants.ts — scheme registry and CVA variants
a4e9ff4 feat: add SchemeProvider — time-of-day scheme resolution, CSS var injection, reduced-motion support
5791671 feat: add SITE_URL, Blog/CV/About nav items, expand SITE description in constants
27ae833 feat: add Inter via next/font, wrap app with SchemeProvider, update metadata to use SITE_URL
dbb8958 refactor: create src/features/ directories, move components, add hero.tsx with useScheme
8d37fe9 refactor: update all imports to src/features/, delete src/components/
c477f08 chore: foundation build verified — all pages load, scheme system active, lint script fixed for Next.js 16
a8df401 ci: add Gitleaks secret scanning and MDX cache key
8994fd4 ci: replace npm with bun in version-increment workflow
892ed04 fix: update lint tooling for Next.js 16
b273958 fix: remove horizontal scrollbar and fix layout height
5771e0f fix: eliminate scrollbar and silence GitHub dev warning
f498fca fix: compact home page to fit viewport without scrolling
dabf99a fix: eliminate browser scrollbar with contained scroll layout
e8f430e style: compact header and footer to maximise content area
7a46964 fix: page headings now visible below fixed header
d4ebb39 fix: page headings now visible — animated background z-index conflict resolved
978d24d fix: header opacity, progress bar position, and content gap
c525fac style: richer animated gradient on hero HAMMAYO title
0155532 style: apply same animated gradient to nav logo name
853693f fix: CSS-only responsive hero text — HAMMY on mobile, HAMMAYO on desktop
```

---

## Phase Progression

| Phase | Description | Status |
|---|---|---|
| **Phase 1** | Foundation — this document | ✅ Merged to `main` (PR #12) |
| **Phase 2** | Pages & Navigation | ✅ Complete — `feature/phase-2-nav-expansion` |
| **Phase 3** | Blog & MDX pipeline | ⏳ Pending |

Phase 2 summary: `docs/superpowers/plans/2026-04-11-phase-2-nav-expansion.md`

### Phase 1 constraints superseded by Phase 2

| Original Phase 1 value | Replaced in Phase 2 | Why |
|---|---|---|
| Header `bg-white/80 dark:bg-zinc-950/80` | `bg-background/95 backdrop-blur-md` | Better contrast; `/80` let animated bg bleed through |
| Progress bar at `top-[45px]` (fixed) | `absolute bottom-0` inside `<Header>` | Hardcoded value misaligned on mobile |
| `ctaButton` using `gradient-bg` scheme vars | Hardcoded `from-violet-600 via-purple-600 to-indigo-600` | Scheme vars produced washed-out colours in morning/silver scheme |
