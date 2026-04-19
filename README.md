[![Build](https://github.com/hammayo/hammayo.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/hammayo/hammayo.github.io/actions/workflows/deploy.yml) [![Version](https://img.shields.io/github/package-json/v/hammayo/hammayo.github.io)](https://github.com/hammayo/hammayo.github.io/releases) [![Updated](https://img.shields.io/github/last-commit/hammayo/hammayo.github.io?logo=github&label=last%20update)](https://github.com/hammayo/hammayo.github.io/commits)

# Hammayo

> A portfolio site for a backend software engineer. Next.js 16, MDX blog, static export, GitHub Pages.
>
> https://hammayo.co.uk

## Features

- **Next.js 16** — static export (`output: 'export'`), App Router, deployed to GitHub Pages
- **Blog** — MDX files in-repo, Zod-validated frontmatter, full-text search (Pagefind ⌘K), tag filtering, RSS feed (`/feed.xml`), per-post OG images
- **Colour scheme system** — 4 named schemes driven by time of day, CSS custom properties, smooth crossfades
- **Dark / light mode** — next-themes
- **Syntax highlighting** — rehype-pretty-code + Shiki (tokyo-night), copy-to-clipboard on hover
- **Tailwind CSS v4** — CSS-first config in `globals.css`
- **Type-safe** — TypeScript strict, Zod v4 validation
- **CI/CD** — Gitleaks secret scan, build + Pagefind index, deploy to GitHub Pages

## Getting Started

```bash
git clone https://github.com/hammayo/hammayo.github.io.git
cd hammayo.github.io
bun install
cp .env.local.example .env.local
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** The blog search (⌘K) requires a built Pagefind index and won't work in `bun run dev`. Run `bun run build && bun run serve` to test search locally.

### Local Testing Modes

| Mode | Command | Navigation | Search | Use Case |
|---|---|---|---|---|
| **Dev** | `bun dev` | ✅ Full client-side routing | ❌ Unavailable | Development, testing features |
| **Static export** | `bun run serve` | ⚠️ Direct URLs only* | ✅ Works | Testing search, pre-deployment |

\* In `bun run serve`, clicking links doesn't navigate (limitation of static export). However, direct URL access works fine (`/about/` loads the About page). **This doesn't affect GitHub Pages** — production uses direct URL access.

## Build

```bash
bun run build
```

Runs three steps in sequence:

1. `node scripts/copy-blog-assets.mjs` — copies post images/media to `public/blog-assets/`
2. `next build` — static export to `out/`
3. `pagefind --site out` — generates full-text search index into `out/pagefind/`

## Environment Variables

```bash
# Local basePath override — only needed if testing static export locally with a sub-path.
# In CI, basePath is derived automatically from GITHUB_REPOSITORY (env.ts ignores this var when GITHUB_ACTIONS=true).
NEXT_PUBLIC_BASE_PATH=

# GitHub API — pinned repos on the projects page (optional)
GITHUB_USERNAME=
GITHUB_TOKEN=

# Analytics (optional)
GA_MEASUREMENT_ID=G-xxxxxxxx
```

`SITE_URL` (`https://hammayo.co.uk`) is hardcoded in `src/lib/constants.ts`.

## Project Structure

```
hammayo.github.io/
├── content/
│   ├── blogs/                       # Blog posts
│   │   └── YYYY-MM-DD-slug/
│   │       ├── index.mdx            # Post content + frontmatter
│   │       └── assets/              # Images, PDFs, media (optional)
│   ├── about.ts / cv.ts / blogs.ts / contact.ts  # Page content data
├── scripts/
│   └── copy-blog-assets.mjs         # Prebuild: copies assets to public/
├── src/
│   ├── app/                         # Route shells
│   │   ├── blogs/
│   │   │   ├── page.tsx             # Blog list page
│   │   │   └── [slug]/page.tsx      # Individual post page
│   │   ├── feed.xml/route.ts        # RSS 2.0 feed
│   │   └── sitemap.ts               # Auto-includes blog slugs
│   ├── design/
│   │   ├── schemes.ts               # Colour scheme registry
│   │   └── variants.ts              # CVA variants (gradientText, accentTag, etc.)
│   ├── features/
│   │   ├── blogs/                   # BlogCard, BlogList, SearchPalette,
│   │   │                            # PostHeader, PostBody, PostNav, ScrollProgress,
│   │   │                            # mdx-components, pipeline, schema
│   │   └── shared/                  # Header, footer, layout primitives, Radix UI
│   └── lib/
│       ├── constants.ts             # SITE, SOCIAL, SITE_URL
│       ├── env.ts                   # Zod-validated env
│       └── imageLoader.ts           # GitHub Pages basePath image loader
└── .github/workflows/deploy.yml     # CI: gitleaks → copy assets → build → pagefind → deploy
```

## Colour Scheme System

`SchemeProvider` resolves the active scheme from the visitor's local time and injects CSS custom properties on `:root`. No colour logic lives in individual components.

| Scheme | Hours | Character |
|---|---|---|
| `silver` | 06:00–11:59 | Metallic, refined |
| `deep-purple` | 12:00–17:59 | Saturated, bold |
| `glass` | 18:00–21:59 | Airy, cool |
| `violet-blue` | 22:00–05:59 | Deep, rich |

## Writing a Blog Post

### 1. Create the post folder

Folder name format: `YYYY-MM-DD-your-slug`

```bash
mkdir -p content/blogs/2026-05-01-my-post-title/assets
```

### 2. Create `index.mdx`

```markdown
---
title: "Your post title"
date: "2026-05-01"
summary: "One sentence shown in the post card and RSS feed."
tags: ["architecture", "next.js"]
published: true
---

Your post body in Markdown. MDX is supported — you can use React components inline.

## A section heading

Regular paragraph text. **Bold**, _italic_, `inline code`.

```ts
// Code blocks are syntax-highlighted with a copy button
const example = true;
` ``

![Alt text](./assets/my-image.png)
```

**Frontmatter fields:**

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Post title |
| `date` | Yes | `YYYY-MM-DD` format |
| `summary` | Yes | Shown on list card and in RSS |
| `tags` | No | Lowercase array, e.g. `["next.js", "docker"]` |
| `published` | No | Defaults to `true`. Set `false` to draft |
| `readingTime` | No | Auto-calculated if omitted (200 wpm) |

### 3. Add images or media (optional)

Place files in the `assets/` subfolder. Reference them with relative paths in MDX:

```markdown
![Diagram](./assets/diagram.png)
[Download spec](./assets/spec.pdf)
```

Assets are automatically copied to `public/blog-assets/your-slug/` at build time.

### 4. Preview locally

```bash
bun run dev
```

Open `http://localhost:3000/blogs` — your post appears in the list. The search palette will show "unavailable in development" (expected).

> To preview with full search: `bun run build && bun run serve`

### 5. Publish

```bash
git add content/blogs/2026-05-01-my-post-title/
git commit -m "content: add post — my post title"
git push origin feature/my-post-title
```

Open a PR from your feature branch → `develop`, then merge `develop` → `main`. GitHub Actions picks up the push to `main`, runs the full build pipeline, and deploys to `hammayo.co.uk`. The post goes live in ~2 minutes.

### Drafts

Set `published: false` to keep a post out of production builds, the sitemap, and the RSS feed. It still appears when running `bun run dev` locally.

## Deployment

Two workflows run on `main`:

**`deploy.yml`** — triggered on every push to `main`:

1. **Gitleaks** — secret scan; blocks deploy if any credential is found in committed files or git history
2. **Copy assets** — `node scripts/copy-blog-assets.mjs`
3. **Build** — `bunx --bun next build` → static output in `out/`
4. **Index** — `bunx pagefind --site out` → search index in `out/pagefind/`
5. **Deploy** — `out/` uploaded to GitHub Pages, served at `hammayo.co.uk`

**`version-increment.yml`** — triggered when a PR is merged into `main`:

1. Reads the current `version` from `package.json`
2. Bumps the patch version (`1.0.x → 1.0.x+1`) and commits `[skip ci]`
3. Creates a GitHub Release with auto-generated release notes

## Customisation

| What | Where |
|---|---|
| Name, title, social links | `src/lib/constants.ts` |
| Colour schemes | `src/design/schemes.ts` |
| Blog tag order | `content/blogs.ts` → `pinnedTags` |
| Navigation links | `src/features/shared/header.tsx` |
| Global CSS, fonts | `src/app/globals.css` |
| MDX element overrides | `src/features/blogs/mdx-components.tsx` |
