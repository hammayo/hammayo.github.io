# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev                   # start dev server (Turbopack, 0.0.0.0)
bun build                 # full build: copy-blog-assets → next build → pagefind
bun run lint              # eslint src (warnings allowed)
bun run lint:strict       # eslint src --max-warnings=0
bun run lint:fix          # eslint + prettier fix
bun run type-check        # tsc --noEmit
bun run serve             # serve out/ locally after build (no client-side nav*)
```

**Dev vs Serve:**
- `bun dev` — full client-side navigation, dev features, but search unavailable
- `bun run serve` — search works, but link clicks don't navigate (use direct URLs like `/about/`). This is a static export limitation; GitHub Pages deployment unaffected.

There are no automated tests — `bun run type-check` and `bun run lint:strict` are the quality gates.

The build runs three steps in order:
1. `node scripts/copy-blog-assets.mjs` — copies `content/blogs/*/assets/` → `public/blog-assets/[slug]/`
2. `bunx --bun next build` — static export to `out/`
3. `bunx pagefind --site out` — writes search index to `out/pagefind/`

`public/blog-assets/` and `out/` are gitignored. In `next dev` neither the asset copy nor Pagefind runs.

## Architecture

### Static export on GitHub Pages

`next.config.ts` sets `output: 'export'` always. `distDir` is `out` in production and `.next` in dev. `trailingSlash: true`. No server-side rendering — everything is pre-rendered at build time.

`basePath` is set from `NEXT_PUBLIC_BASE_PATH` locally or `/${GITHUB_REPOSITORY}` in CI. All image `src` paths must go through the global image loader (`src/lib/imageLoader.ts`), which is registered in `next.config.ts` as `loaderFile`. **Never pass a `loader` prop directly to `<Image>` inside a Server Component** — it crosses the RSC serialisation boundary and throws.

**Why client-side navigation doesn't work in `bun run serve`:**

Static exports create pre-rendered HTML files + RSC payload files (`.txt` files in `out/`). Client-side navigation requires the Next.js server to handle RSC requests (`/about/?_rsc=...`). A static file server like `serve` just serves files — it can't transform or stream RSC payloads. This is expected behavior, not a bug. It doesn't affect GitHub Pages because users access pages via direct URLs (`/about/` → loads prerendered HTML), not client-side link clicks.

### Colour scheme system

`SchemeProvider` (`src/providers/scheme-provider.tsx`) resolves a scheme from visitor local time and injects CSS custom properties onto `:root`. Components never hardcode colours — they reference these vars.

| Variable | Source | Notes |
|---|---|---|
| `--scheme-from/via/to` | `schemes.ts` | Gradient stop hex values |
| `--scheme-accent` | `schemes.ts` | Raw accent hex — use for backgrounds, borders |
| `--scheme-accent-text` | `globals.css` | Text-safe accent — darkened in light mode (`color-mix(… 60%, #000)`), full accent in dark mode. **Always use this for text/links, never `--scheme-accent` directly** |
| `--scheme-glow` | `schemes.ts` | rgba for box-shadow |
| `--scheme-border` | `schemes.ts` | rgba for borders |
| `--scheme-button-from/via/to` | `schemes.ts` | Darker gradient for CTA buttons |
| `--scheme-transition` | `schemes.ts` | Crossfade duration ms |

Time-of-day mapping: `silver` 06–11, `glass` 12–17, `nebula` 18–21, `violet-blue` 22–05.

To change the active scheme mode (time-of-day / fixed / cycling), edit `SCHEME_MODE` in `src/design/schemes.ts` — no component changes needed.

### Tailwind v4 + utility classes

Tailwind is configured CSS-first via `@import "tailwindcss"` and `@theme inline {}` in `globals.css`. There is no `tailwind.config.ts` with actual content. Design tokens are CSS custom properties.

Four custom utility classes are defined in `globals.css` and used throughout:
- `gradient-text` — applies scheme gradient as text fill (use with `gradientText` CVA variant from `src/design/variants.ts`)
- `gradient-bg` — scheme gradient as background
- `scheme-glow` — box-shadow using `--scheme-glow`
- `scheme-border` — border using `--scheme-border`

CVA variants in `src/design/variants.ts`: `gradientText`, `glowCard`, `accentTag`, `ctaButton`. Use these for consistent styled elements.

### Blog pipeline

Posts live in `content/blogs/YYYY-MM-DD-slug/index.mdx`. The slug is the folder name with the date prefix stripped. An optional `assets/` subfolder holds images and other media.

`src/features/blogs/pipeline.ts` exports three functions used at build time (server only):
- `getAllPostsMeta()` — parses all posts, validates frontmatter with Zod, filters drafts in production, returns sorted `PostMeta[]`
- `getAllSlugs()` — used by `generateStaticParams`
- `getPostBySlug(slug)` — compiles full MDX via `next-mdx-remote/rsc`, returns `Post` with React content

Frontmatter schema is in `src/features/blogs/schema.ts`. Invalid frontmatter on a published post **throws** at build time. `published: false` posts are included in dev, excluded in production.

Asset paths in MDX (`./assets/filename`) are rewritten to `/blog-assets/[slug]/filename` at parse time. The assets must be copied first by `copy-blog-assets.mjs`.

**Hero image:** If `assets/hero.{png,jpg,jpeg,webp}` exists in a post folder, `PostHeader` renders a full photo header with a dark overlay. Without it, a scheme-gradient fallback header renders instead.

### `next/og` (Satori) constraints

Satori (used by `opengraph-image.tsx` files) requires:
- Every `<div>` with multiple children must have explicit `display: flex`
- No adjacent text nodes — use template literals instead of `{expr} · string` or `&&` expressions inside JSX
- Use `x ? <div>{x}</div> : null`, not `x && <div>{x}</div>`

### Theme vs colour scheme

There are two independent styling layers:

- **`ThemeProvider`** (`src/providers/theme-provider.tsx`) — wraps `next-themes`, controls light/dark mode. Toggled by `ThemeToggle` in the header; persisted to `localStorage`.
- **`SchemeProvider`** (`src/providers/scheme-provider.tsx`) — time-of-day gradient/accent system. Injects CSS custom properties onto `:root`. Operates independently of light/dark mode.

Both providers are mounted in `src/app/layout.tsx`.

### Projects page — GitHub API

The projects page (`src/app/projects/`) fetches live data from GitHub at build time via `src/lib/github.ts`:
- `fetchPinnedRepositories()` — GraphQL API, fetches up to 6 pinned repos (requires `GITHUB_TOKEN`)
- `fetchAllRepositories()` — REST API, falls back when token absent
- `fetchGitHubData()` — parallel wrapper combining both

Without `GITHUB_TOKEN` and `GITHUB_USERNAME`, the projects page builds but shows no repositories. Set both in `.env.local` for local development.

### Key files

| File | Purpose |
|---|---|
| `src/lib/constants.ts` | `SITE`, `SOCIAL`, `SITE_URL`, `PAGE_META` — import from here for all site-wide strings |
| `src/lib/env.ts` | Zod-validated env, exports `basePath`, `assetPrefix`, `isGithubActions` |
| `src/lib/github.ts` | GitHub API client — REST + GraphQL; used by the projects page at build time |
| `src/design/schemes.ts` | Colour scheme definitions and `SCHEME_MODE` toggle |
| `src/design/variants.ts` | CVA variants used site-wide |
| `src/features/shared/` | Header, footer, animated background, analytics, error boundary |
| `src/features/blogs/pipeline.ts` | All blog data access — the only place that reads `content/blogs/` |
| `src/features/blogs/mdx-components.tsx` | Custom MDX renderers: `CodeBlock` (copy-to-clipboard on hover), images, links, headings, tables |
| `content/about.ts` | About-page and homepage bio content — edit here, not in components |
| `content/blogs.ts` | Blog config: `pinnedTags` order for filter chips |
| `content/contact.ts` | Contact page copy and availability data |
| `content/cv.ts` | CV page data: skills, roles, education |

### ESLint config

- `@typescript-eslint/no-explicit-any` is **off** — `any` is allowed where necessary
- Unused vars trigger a warning (not error); prefix with `_` to suppress
- `lint:strict` (zero warnings) is the standard before merging
