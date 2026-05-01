[![Build](https://github.com/hammayo/hammayo.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/hammayo/hammayo.github.io/actions/workflows/deploy.yml) [![Version](https://img.shields.io/github/v/tag/hammayo/hammayo.github.io?label=version)](https://github.com/hammayo/hammayo.github.io/releases) [![Updated](https://img.shields.io/github/last-commit/hammayo/hammayo.github.io?logo=github&label=last%20update)](https://github.com/hammayo/hammayo.github.io/commits)

# Hammayo

My first production system processed payments. My second ran inside a prison.
After twenty years across justice, finance, and retail infrastructure, I
started writing things down.

This is that site. MDX blog, full-text search, CI/CD to GitHub Pages. The
colour scheme changes based on the time of day — because why not. 🖖

**Stack:** Next.js 16 · TypeScript · MDX · Tailwind v4 · Pagefind · GitHub Pages

## Quick Start

```bash
git clone https://github.com/hammayo/hammayo.github.io.git
cd hammayo.github.io
bun install
cp .env.local.example .env.local
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** Blog search (⌘K) requires a built Pagefind index and won't work in `bun run dev`. Run `bun run build && bun run serve` to test search locally.

## Local Testing Modes

| Mode | Command | Navigation | Search | Use Case |
|---|---|---|---|---|
| **Dev** | `bun dev` | ✅ Full client-side routing | ❌ Unavailable | Development, testing features |
| **Static export** | `bun run serve` | ⚠️ Direct URLs only* | ✅ Works | Testing search, pre-deployment |

\* In `bun run serve`, clicking links doesn't navigate (static export limitation). Direct URL access works fine (`/about/` loads the About page). This doesn't affect GitHub Pages — production uses direct URL access.

## Technical Notes

| Topic | Notes |
|---|---|
| Architecture & configuration | [_notes/architecture.md](_notes/architecture.md) |
| Design system | [_notes/design-system.md](_notes/design-system.md) |
| Blog engine & SEO | [_notes/blog-engine.md](_notes/blog-engine.md) |
| Development & CI/CD | [_notes/development.md](_notes/development.md) |

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

> For pipeline internals see [_notes/blog-engine.md](_notes/blog-engine.md).

## Customisation

| What | Where |
|---|---|
| Name, title, social links | `src/lib/constants.ts` |
| Colour schemes | `src/design/schemes.ts` |
| Blog tag order | `content/blogs.ts` → `pinnedTags` |
| Navigation links | `src/features/shared/header.tsx` |
| Global CSS, fonts | `src/app/globals.css` |
| MDX element overrides | `src/features/blogs/mdx-components.tsx` |
