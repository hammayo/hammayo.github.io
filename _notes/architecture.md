# Architecture & Configuration

> Part of the `_notes/` technical reference. See also: [Design system](design-system.md) · [Blog engine & SEO](blog-engine.md) · [Development & CI/CD](development.md)

---

## Why Static Export

I chose `output: 'export'` in `next.config.ts` for two reasons: GitHub Pages serves static files only (no Node.js runtime), and I wanted zero infrastructure cost. Every page is pre-rendered at build time into `out/`.

The trade-off is no server-side rendering and no RSC streaming in local `serve` mode. Client-side navigation doesn't work in `bun run serve` because a static file server can't handle the `?_rsc=` requests Next.js issues during client-side route transitions. This is expected — it doesn't affect GitHub Pages, where visitors access pages via direct URLs.

## App Structure

```
┌─────────────────────────────────────────────────────────────┐
│  hammayo.github.io — Static Architecture                    │
├───────────────┬─────────────────────────────────────────────┤
│  content/     │  MDX posts, page data (about/cv/contact)    │
│  src/app/     │  Route shells, OG images, feed, sitemap     │
│  src/features/│  Blog, shared UI, contact, home, projects   │
│  src/design/  │  Colour schemes, CVA variants               │
│  src/lib/     │  Constants, env, imageLoader, GitHub API    │
│  scripts/     │  copy-blog-assets.mjs (prebuild)            │
│  out/         │  Static export (gitignored)                 │
└───────────────┴─────────────────────────────────────────────┘
```

All page content lives in `content/` TypeScript files — not inside components. I edit `content/about.ts`, `content/contact.ts`, `content/cv.ts`, and `content/blogs.ts` for copy changes; components import and render.

## Core Configuration

`src/lib/constants.ts` is the single source of truth for site-wide strings: `SITE`, `SOCIAL`, `SITE_URL`, `PAGE_META`. Nothing hardcodes these values in components — everything imports from here.

## Environment Variables

`src/lib/env.ts` validates all environment variables at startup using Zod. Missing or malformed values log clearly rather than throwing cryptically at runtime.

| Variable | Required locally | Purpose |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | No | Override basePath for local static export sub-path testing |
| `GITHUB_USERNAME` | For projects page | GitHub username for API calls |
| `GITHUB_TOKEN` | For projects page | GitHub PAT — enables pinned repos via GraphQL |
| `GA_MEASUREMENT_ID` | No | Google Analytics — omit to disable |

In CI, `basePath` is derived from `GITHUB_REPOSITORY` automatically. `env.ts` ignores `NEXT_PUBLIC_BASE_PATH` when `GITHUB_ACTIONS=true`.

## Image Loader

`src/lib/imageLoader.ts` is registered globally in `next.config.ts` as `loaderFile`. GitHub Pages serves this site under a sub-path (`/hammayo.github.io/`), so every image `src` must be prefixed with `basePath`. The global loader handles this transparently.

**Never pass a `loader` prop directly to `<Image>` inside a Server Component.** The prop crosses the RSC serialisation boundary and throws. The global loader is the only supported path.

## GitHub API — Projects Page

`src/lib/github.ts` fetches data at build time:

- `fetchPinnedRepositories()` — GitHub GraphQL API, up to 6 pinned repos (requires `GITHUB_TOKEN`)
- `fetchAllRepositories()` — GitHub REST API, fallback when no pinned repos or token
- `fetchGitHubData()` — parallel wrapper combining both

Without `GITHUB_TOKEN` and `GITHUB_USERNAME` in `.env.local`, the projects page builds successfully but renders no repositories. This is graceful degradation by design — the page won't fail the build.

---

→ [Design system](design-system.md) · [Blog engine & SEO](blog-engine.md) · [Development & CI/CD](development.md)
