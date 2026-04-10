# Website Revamp Design Spec

**Date:** 2026-04-10  
**Status:** Phase 1 complete (merged to `develop`) — Phase 2 in progress (`feature/phase-2-nav-expansion`) — Phase 3 pending
**Phase order (revised 2026-04-10):** Phase 2 = Pages & Navigation | Phase 3 = Blog & MDX pipeline (swapped from original Plan 2/3 order)  
**Site:** hammayo.co.uk (GitHub Pages, Next.js static export)

---

## 1. Goals & Audience

Primary audience: recruiters and hiring managers seeking a senior backend engineer.  
Secondary: thought leadership via blog, personal creative expression.  
Tertiary: freelance/consulting clients.

The site must signal 20 years of backend seniority at a glance, provide a working blog for technical writing, and reflect personality (Star Trek bio stays).

---

## 2. Design Direction

**Bold & Vibrant** — dark-first, purple/cyan gradient palette, taken further and made fully cohesive via a central scheme system.

### 2.1 Colour Scheme System (`src/design/schemes.ts`)

A named scheme registry drives all gradient, glow, accent, and border colours across the entire site. Swapping a scheme or adding a new one is a single edit to `schemes.ts`. There is no user-facing scheme selector — the active scheme is resolved automatically from configuration or environmental conditions.

**The three schemes:**

| Name | Character | Gradient direction |
|---|---|---|
| `violet-blue` | Deep, rich — default/night | `from-violet-500 via-purple-500 to-blue-500` |
| `deep-purple` | Saturated, bold — afternoon | `from-purple-400 via-fuchsia-500 to-violet-600` |
| `silver` | Metallic, refined — morning | `from-zinc-300 via-slate-200 to-zinc-400` |
| `glass` | Airy, cool — evening | `from-teal-300 via-cyan-200 to-sky-300` |

```ts
export type ColorScheme = {
  name:        string;
  gradient:    string;   // Tailwind gradient classes
  glow:        string;   // CSS rgba for box-shadow
  accent:      string;   // Tailwind text colour class
  border:      string;   // Tailwind border colour class
  transitionMs: number;  // Per-scheme crossfade duration
};

export const SCHEMES = {
  'violet-blue':  { name: 'Violet Blue',  transitionMs: 2000, ... },
  'deep-purple':  { name: 'Deep Purple',  transitionMs: 2500, ... },
  'silver':       { name: 'Silver',       transitionMs: 3000, ... },
  'glass':        { name: 'Glass',        transitionMs: 3000, ... },
} satisfies Record<string, ColorScheme>;

// How the active scheme is determined — change this, not the component
export const SCHEME_MODE =
  'time-of-day'  // Resolved from visitor's local hour (default)
  | 'config'     // Always use SCHEME_DEFAULT
  | 'cycle';     // Rotate through SCHEME_ORDER on a slow interval

export const SCHEME_DEFAULT: keyof typeof SCHEMES = 'violet-blue';
export const SCHEME_ORDER:   (keyof typeof SCHEMES)[] = ['violet-blue', 'deep-purple', 'silver', 'glass'];
export const CYCLE_SPEED: 'slow' | 'medium' = 'slow'; // slow = 30s, medium = 15s — no magic numbers in components
```

**`SchemeProvider` (`src/providers/scheme-provider.tsx`)** resolves the active scheme from `SCHEME_MODE` on mount and holds it in context. All components read `useScheme()` — no component owns colour logic.

**Scheme resolution logic:**

```
SCHEME_MODE === 'time-of-day':
  06:00–11:59 → silver      (morning)
  12:00–17:59 → deep-purple (afternoon)
  18:00–21:59 → glass       (evening)
  22:00–05:59 → violet-blue (night)

SCHEME_MODE === 'config':
  Always → SCHEME_DEFAULT

SCHEME_MODE === 'cycle':
  Rotate SCHEME_ORDER at CYCLE_SPEED interval
```

**Smooth transitions:** Scheme colours are written as CSS custom properties on `:root` (`--scheme-gradient-from`, `--scheme-gradient-via`, `--scheme-gradient-to`, `--scheme-glow`, `--scheme-accent`). Components reference these variables. When the scheme changes, `SchemeProvider` applies a CSS `transition` of `transitionMs` duration on the relevant properties — changes crossfade smoothly rather than snapping. The `animate-gradient` keyframe in `globals.css` (background-position animation) remains as a secondary texture layer on top of the scheme colour.

**Accessibility:** `SchemeProvider` checks `prefers-reduced-motion: reduce` on mount. If true, `SCHEME_MODE` is overridden to `'config'` — scheme is locked to `SCHEME_DEFAULT` with no cycling or transitions. Satisfies WCAG 2.1 AA (2.3.3).

**Dark mode variants for light-toned schemes:** `silver` (`zinc-300/slate-200`) and `glass` (`teal-300/cyan-200`) are light-toned gradients that risk poor contrast as text on dark backgrounds. Each scheme defines a `darkGradient` override used when `resolvedTheme === 'dark'`:

```ts
export type ColorScheme = {
  ...
  gradient:     string;  // Used in light mode
  darkGradient: string;  // Used in dark mode (same for dark-native schemes)
};

// Examples:
'silver': {
  gradient:     'from-zinc-300 via-slate-200 to-zinc-400',      // light mode
  darkGradient: 'from-zinc-400 via-slate-300 to-zinc-500',      // darker for dark bg
},
'glass': {
  gradient:     'from-teal-300 via-cyan-200 to-sky-300',        // light mode
  darkGradient: 'from-teal-400 via-cyan-300 to-sky-400',        // darker for dark bg
},
```

`SchemeProvider` selects `gradient` or `darkGradient` based on `resolvedTheme` and writes the result to CSS custom properties. Contrast ratios must be verified across all four schemes in both modes during implementation.

**SSR / hydration — `time-of-day` mode:** The server has no knowledge of the visitor's local time. To avoid hydration mismatches, `SchemeProvider` renders with `SCHEME_DEFAULT` on the first pass (server + initial client render), then resolves the time-of-day scheme after mount in a `useEffect`. Same `mounted` guard pattern used in the existing `HeroTitle`. No flash — the default scheme is visible for one paint cycle before the correct scheme crossfades in.

### 2.2 Reusable Visual Patterns

Three scheme-aware patterns used consistently across all features:

| Pattern | Used in |
|---|---|
| Gradient text | Hero name, nav active link, page headings, blog titles |
| Glow card | Project cards, blog cards, CV role entries |
| Accent border/tag | Skill tags, blog tags, CV timeline nodes |

All three read from `useScheme()`.

### 2.3 Typography

- UI: Inter — migrated from Google Fonts `<link>` tag to `next/font/google`. Serves font from the same origin, eliminates external DNS lookup, prevents FOUT, improves Lighthouse score. Change is in `src/app/layout.tsx` only.
- Code / `/uses`: `font-mono` stack
- Two formalised scale sizes in `tailwind.config.ts`: `display` (hero) and `body` (prose)

---

## 3. Site Structure & Navigation

### 3.1 Pages

| Route | Status | Notes |
|---|---|---|
| `/` | Revamped | Expanded homepage |
| `/projects` | Redesigned | Same GitHub API data, new visual |
| `/contact` | Redesigned | Same data, new visual |
| `/about` | New | Longer bio, sectors, philosophy |
| `/blog` | New | MDX list page with tag filtering |
| `/blog/[slug]` | New | MDX post page |
| `/cv` | New | Interactive timeline + PDF download |
| `/uses` | New | Tools and setup |
| `/blogs` | Redirect stub | Redirects to `/blog` (SEO preservation) |
| `/feed.xml` | New | RSS feed (static Route Handler) |

### 3.2 Mobile Navigation

The existing flat nav cannot accommodate 6+ links on mobile. Solution: use the existing `Sheet` component (`src/components/ui/sheet.tsx`) for a slide-in drawer on mobile (hamburger icon), showing all links. Desktop retains the existing inline nav. No new dependencies required.

### 3.3 `/blogs` → `/blog` Redirect

`src/app/blogs/page.tsx` is kept (not deleted) and converted to a static redirect page using `<meta http-equiv="refresh" content="0;url=/blog">` plus a JS fallback. This preserves any Google-indexed URLs for the old stub page without requiring server-side redirects (incompatible with static export).

---

## 4. Homepage (Expanded)

Sections in order:

1. **Hero card** — animated gradient name (`HAMMAYO` / `HAMMY` on mobile), role subtitle, gradient bar. Scheme-aware.
2. **Star Trek bio** — kept verbatim, personality intact.
3. **Skills strip** — flat list of skill tags. Scheme-aware accent border/colour. Data sourced from `content/cv.ts` (single source of truth — no duplication).
4. **Latest blog post preview** — title, date, reading time, link. Pulled from the blog content pipeline at build time.
5. **CTA row** — "View Projects" (primary, gradient button) + "Download CV" (secondary, ghost button linking to `/cv.pdf` — file lives at `public/cv.pdf`).

---

## 5. Content Model

### 5.1 Blog (MDX)

Files live in `content/blog/` and are committed to the repository.

**Filename convention:** `YYYY-MM-DD-slug.mdx`

**Frontmatter schema** (Zod-validated at build time):

```ts
// src/features/blog/schema.ts
export const PostSchema = z.object({
  title:       z.string(),
  date:        z.string().date(),
  summary:     z.string(),
  tags:        z.array(z.string()).default([]),
  published:   z.boolean().default(true),
  readingTime: z.number().optional(), // auto-computed if absent: Math.ceil(wordCount / 200) minutes
});
```

**Build-time validation:** The content pipeline validates every MDX file against `PostSchema` and fails the build if any published post has invalid frontmatter. An empty `content/blog/` directory emits a build warning (not a failure) — the blog list renders an empty state.

**Draft mode:** Posts with `published: false` are included in development (`NODE_ENV === 'development'`) and excluded from production builds, the sitemap, and the RSS feed.

**MDX rendering:** `next-mdx-remote/rsc` (RSC-compatible import) with a custom component map matching the Bold & Vibrant design system (code blocks, callouts, links).

### 5.2 CV Data (`content/cv.ts`)

Typed TypeScript file — no parsing overhead, full type safety, rich text not needed.

```ts
export const CV = {
  roles: [{ title, company, period, summary, tags }],
  skills: { languages: [], platforms: [], tools: [] },
  education: [{ institution, qualification, year }],
};
```

The homepage skills strip imports from this file. Single source of truth.

**CV PDF:** A manually maintained `public/cv.pdf`. The "Download CV" button links directly to it. Updated by the author when the CV changes — no automated generation.

### 5.3 Uses Data (`content/uses.ts`)

Typed TypeScript file listing hardware, editor, tools, and stack. Rendered as a static page.

### 5.4 About Page Image

The About page requires an avatar/profile photo. Decision: use `public/images/avatar.jpg` (to be provided by the author). The component renders the image via Next.js `<Image>` with the existing `imageLoader` for GitHub Pages compatibility. If `avatar.jpg` is absent at build time, the component falls back to the existing `_hb-logo.png` — no broken layout on first deploy.

### 5.5 CV PDF — first deploy safety

`public/cv.pdf` must exist in the repository before the "Download CV" button is shown. A build-time check in `src/features/home/cta.tsx` (and the CV page) verifies the file exists using `fs.existsSync('public/cv.pdf')` during the server render. If absent, the button is omitted from the rendered output rather than rendered as a 404 link. A placeholder `public/cv.pdf` (single-page blank PDF) is committed with the initial implementation to satisfy this check immediately.

---

## 6. Blog Features

### 6.1 Tag Filtering
Tags from post frontmatter are surfaced as clickable filter chips on `/blog`. Client-side filter — no new routes, no page reload.

### 6.2 OG Image Generation
`src/app/blog/[slug]/opengraph-image.tsx` using `next/og`. Generates a styled image per post with title, date, and tags. Requires `generateStaticParams` (already required for static export).

### 6.5 Blog slug 404 handling
`src/app/blog/[slug]/not-found.tsx` is a required deliverable. When a visitor hits a non-existent slug, Next.js App Router renders this page automatically. It should link back to `/blog` and match the site design. The existing `src/app/not-found.tsx` can be used as a template.

### 6.3 RSS Feed
`src/app/feed.xml/route.ts` with `export const dynamic = 'force-static'`. Generates a valid RSS 2.0 feed from all published posts. Uses `SITE_URL` constant for absolute URLs.

### 6.4 Sitemap Extension
`src/app/sitemap.ts` extended to include all published blog post slugs. Auto-updates when MDX files are added — no manual step.

---

## 7. Architecture: File Structure

```
src/
├── app/                          # Next.js routes — thin shells only
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   ├── [slug]/
│   │   │   ├── page.tsx
│   │   │   ├── not-found.tsx
│   │   │   └── opengraph-image.tsx
│   ├── blogs/page.tsx            # Static redirect → /blog
│   ├── cv/page.tsx
│   ├── contact/page.tsx
│   ├── feed.xml/route.ts         # RSS (force-static)
│   ├── projects/page.tsx
│   ├── uses/page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── robots.ts
│   └── sitemap.ts
│
├── features/
│   ├── home/                     # Hero, skills strip, blog preview, CTAs
│   ├── blog/                     # Content pipeline, post card, post layout, MDX map, schema
│   ├── cv/                       # Timeline component, skills grid, PDF download button
│   ├── about/                    # About page content component
│   ├── uses/                     # Uses page content component
│   ├── projects/                 # ProjectCard, GitHub fetch logic
│   ├── contact/                  # ContactCard
│   └── shared/                   # Header (with mobile sheet nav), footer, theme toggle,
│                                 # page transitions, animated background, error boundary
│       └── ui/                   # shadcn/Radix components (moved from src/components/ui/)
│
├── content/
│   ├── blog/                     # *.mdx files (committed to repo)
│   ├── cv.ts                     # Typed CV data
│   └── uses.ts                   # Typed uses data
│
├── design/
│   ├── schemes.ts                # Scheme registry, SCHEME_ORDER, CYCLE_INTERVAL_MS
│   └── variants.ts               # CVA variant configs shared across features
│
├── providers/
│   ├── theme-provider.tsx        # Existing — unchanged
│   └── scheme-provider.tsx       # New — active scheme context + cycling + reduced-motion
│
└── lib/                          # github.ts, env.ts, utils.ts, logger.ts — unchanged
```

---

## 8. What Gets Kept, Changed, and Deleted

### Kept (no changes)
- `src/lib/github.ts`, `env.ts`, `utils.ts`, `logger.ts`
- `src/providers/theme-provider.tsx`
- All Radix UI / shadcn component logic (moved, not rewritten)
- `next.config.ts`, `tsconfig.json` (minor additions only)

### Restructured (same logic, new location)
- `src/components/` → `src/features/shared/` and respective feature directories
- `src/components/hero-title.tsx` → `src/features/home/hero.tsx` (local COLOR_SCHEMES removed, reads `useScheme()`)
- `src/app/page.tsx` → thin shell, content moves to `src/features/home/`

### Rewritten
- `src/app/globals.css` — design token CSS variables added
- `src/app/layout.tsx` — `SchemeProvider` added alongside `ThemeProvider`; Google Fonts `<link>` replaced with `next/font/google`
- `src/app/sitemap.ts` — extended with blog post slugs
- `src/lib/constants.ts` — `SITE_URL = 'https://hammayo.co.uk'` added

### Deleted
- `src/components/ascii-title.tsx` — unused
- `src/components/page-heading.tsx` — absorbed into feature-level heading components
- `.eslintrc.json` — already removed in git, ESLint config moves to `package.json`
- `tailwind.config.ts` — replaced by `@theme {}` in `globals.css` (Tailwind v4)
- `postcss.config.js` — replaced by simplified `@tailwindcss/postcss` config

### Dependency upgrades

All major version upgrades are part of this revamp. Done as a single coordinated upgrade rather than piecemeal, since several packages have interdependencies (Tailwind v4 + tailwind-merge v3 + shadcn/ui must move together).

**Tailwind CSS v3 → v4 (largest impact)**

v4 is a CSS-first rewrite — `tailwind.config.ts` is replaced by `@theme {}` blocks in `globals.css`. This aligns directly with our scheme system CSS custom properties, meaning there's no duplication between the two systems.

Migration changes:
- `@tailwind base/components/utilities` → `@import "tailwindcss"`
- `tailwind.config.ts` replaced by `@theme {}` in `globals.css` (custom font scale, border radius, etc.)
- PostCSS config simplified: `@tailwindcss/postcss` plugin replaces `tailwindcss` + `autoprefixer` (autoprefixer built into v4)
- `tailwindcss-animate` → `tw-animate-css` (v4-compatible equivalent)
- `tailwind-merge` → v3 (required for v4 class name support)
- shadcn/ui components re-added via `bunx shadcn@latest add` to get v4-compatible versions

**Next.js v15 → v16**

Review the [Next.js 16 migration guide](https://nextjs.org/docs/upgrading) before implementation. Codebase impact is expected to be low given the app already uses App Router, RSC, and `generateStaticParams`. Verify static export (`output: 'export'`) still supported.

**Zod v3 → v4**

Zod 4 has breaking API changes. Two affected areas:
- `src/features/blog/schema.ts` — `PostSchema` (likely minor update)
- `src/lib/env.ts` — environment validation schema

Review [Zod v4 migration guide](https://zod.dev/v4) before implementation.

**Octokit v4 → v5**

`src/lib/github.ts` uses Octokit. Review v5 changelog for breaking changes to the methods used (primarily `request` and pagination). Scope is limited to one file.

**Lucide React v0 → v1**

Lucide v1 may have renamed some icons. Audit all `lucide-react` imports across the codebase before upgrading. Affected files: `project-card.tsx`, `footer.tsx`, and any new feature components.

**Framer Motion v12.5 → v12.38**

Minor — same major version. No migration needed.

**React v19.2.4 → v19.2.5**

Patch — no changes needed.

### New dependencies (additions)
- `next-mdx-remote` — MDX rendering (RSC-compatible)
- `gray-matter` — MDX frontmatter parsing
- `tw-animate-css` — replaces `tailwindcss-animate` for Tailwind v4

---

## 9. CI/CD Changes

### 9.1 `deploy.yml` — three changes

**a) Gitleaks secret scanning job (new, runs before build)**

```yaml
secrets-scan:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
      with:
        fetch-depth: 0
    - uses: gitleaks/gitleaks-action@v2
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

The `build` job gains `needs: secrets-scan` so a secret leak blocks deployment entirely.

A `.gitleaks.toml` config file is added to the repo root for allowlisting known false positives (e.g. public API endpoint strings that pattern-match as secrets).

**b) MDX files added to cache key**

```yaml
key: ${{ runner.os }}-nextjs-${{ hashFiles('bun.lock') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx', 'content/**/*.mdx') }}
```

Without this, adding a new blog post doesn't invalidate the cache and the build may serve stale content.

**c) No `SITE_URL` env var needed**

`SITE_URL` is hardcoded in `src/lib/constants.ts` as `'https://hammayo.co.uk'`. The domain never changes between environments, so injecting it via CI would add complexity with no benefit.

### 9.2 `version-increment.yml` — bun consistency fix

Currently uses `npm ci` while `deploy.yml` uses bun. Changed to use bun for consistency, updating `package.json` and `bun.lock` instead of `package-lock.json`.

### 9.3 Static export constraints (existing, must be respected)

All new routes must be statically exportable:
- Dynamic routes (`/blog/[slug]`) require `generateStaticParams`
- Route Handlers (`/feed.xml`) require `export const dynamic = 'force-static'`
- No server-only runtime features (middleware rewrites, etc.)

---

## 10. SEO & Absolute URLs

`SITE_URL = 'https://hammayo.co.uk'` hardcoded in `src/lib/constants.ts`. Used by:
- RSS feed (item links, channel link)
- OG image URLs in post metadata
- Sitemap (already uses absolute paths)

`NEXT_PUBLIC_BASE_PATH` remains driven by CI for GitHub Pages routing compatibility. Custom domain serves from root so base path resolves to empty string at `hammayo.co.uk`.

---

## 11. Security

### Gitleaks
- Runs as a blocking CI job before every build on `main`
- `.gitleaks.toml` at repo root configures allowlists
- Covers committed files and git history (`fetch-depth: 0`)

### Existing secrets posture (unchanged)
- `GITHUB_TOKEN` — GitHub-managed secret, never in code
- `GITHUB_USERNAME` — GitHub Actions secret
- `GA_MEASUREMENT_ID` — environment variable, not committed

---

## 12. Accessibility

- WCAG 2.1 Level AA target (existing requirement)
- Scheme cycling disabled when `prefers-reduced-motion: reduce` is detected
- Colour contrast verified across all four schemes in both light and dark modes
- Mobile sheet nav is keyboard-navigable (Radix Sheet handles this)
- All existing ARIA labels and semantic HTML preserved

---

## 13. Out of Scope

- Testing infrastructure (no existing tests; not introduced in this revamp)
- Multi-language support
- Comment system
- Newsletter subscription
- Analytics dashboard
- Case studies
