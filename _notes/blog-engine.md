# Blog Engine & SEO

> Part of the `_notes/` technical reference. See also: [Architecture](architecture.md) · [Design system](design-system.md) · [Development & CI/CD](development.md)

---

## Pipeline Overview

```
content/blogs/YYYY-MM-DD-slug/
├── index.mdx          ← post content + Zod-validated frontmatter
└── assets/            ← images, PDFs, media (optional)
        │
        ▼  scripts/copy-blog-assets.mjs  (prebuild — step 1 of bun run build)
public/blog-assets/slug/
        │
        ▼  src/features/blogs/pipeline.ts  (build time — Next.js static generation)
        │    getAllPostsMeta()  →  blog list page
        │    getAllSlugs()      →  generateStaticParams
        │    getPostBySlug()   →  individual post page (compiles MDX via next-mdx-remote/rsc)
        ▼
src/app/blogs/[slug]/page.tsx
```

I keep `pipeline.ts` as the only place in the codebase that reads `content/blogs/`. All blog data access goes through its three exported functions.

## Frontmatter Schema

I validate frontmatter with Zod in `src/features/blogs/schema.ts`. Invalid frontmatter on a published post throws at build time — it won't silently produce broken output.

| Field | Required | Default | Notes |
|---|---|---|---|
| `title` | Yes | — | Post title |
| `date` | Yes | — | `YYYY-MM-DD` format |
| `summary` | Yes | — | Shown on list card and in RSS feed |
| `tags` | No | `[]` | Lowercase array, e.g. `["next.js", "docker"]` |
| `published` | No | `true` | Set `false` to draft — excluded from production builds, sitemap, and RSS |
| `readingTime` | No | auto | Auto-calculated at 200 wpm if omitted |

`published: false` posts appear in `bun dev` but are filtered out in production builds.

## Asset Handling

`scripts/copy-blog-assets.mjs` runs as step 1 of `bun run build` and copies `content/blogs/*/assets/` → `public/blog-assets/[slug]/`.

Asset paths in MDX use relative references (`./assets/filename`). I rewrite these to `/blog-assets/[slug]/filename` at parse time — no need to hardcode the public path in posts.

**Hero image:** If `assets/hero.{png,jpg,jpeg,webp}` exists in the post folder, `PostHeader` renders a full photo header with a dark overlay. Without it, a scheme-gradient fallback header renders instead. Detection is automatic — no frontmatter field needed.

## Pagefind

I use Pagefind for full-text search. It runs as step 3 of `bun run build`, indexes the `out/` directory, and writes the search index to `out/pagefind/`.

Search is triggered via ⌘K in the UI (`SearchPalette`). It's unavailable in `bun dev` — only works after a full build. I use `bun run build && bun run serve` to test it locally.

See [development.md](development.md) for the full build sequence.

## SEO Layer

### Structured Data

I use `src/features/shared/structured-data.tsx` to inject two JSON-LD scripts into `<head>` via `src/app/layout.tsx`:

- `Person` — name, job title, location, `sameAs` links (GitHub, LinkedIn), `knowsAbout` skills
- `WebSite` — URL and site name

These are static — they don't change per page, and I render them once in the root layout.

### Dynamic Metadata

I use `createPageMetadata()` in `src/lib/metadata.ts` to generate per-page metadata from `PAGE_META` entries in `src/lib/constants.ts`. Each call produces `title`, `description`, `canonical`, `openGraph`, and `twitter` fields. Blog posts extend this with post-specific titles and descriptions.

### OG Images

Every route has its own `opengraph-image.tsx` file using `next/og` (Satori) — I generate per-page social preview images at build time.

Satori constraints — violating them produces broken or empty images:

- Every `<div>` with multiple children must have explicit `display: "flex"`
- No adjacent text nodes — use template literals instead of `{expr} · string` or `&&` in JSX
- Use `x ? <div>{x}</div> : null`, not `x && <div>{x}</div>`

### RSS Feed

I auto-generate the RSS feed at `/feed.xml` from `src/app/feed.xml/route.ts`. It includes all published posts with title, summary, date, and canonical URL.

### Sitemap

My `src/app/sitemap.ts` auto-includes all published blog slugs alongside static page URLs. Canonical URLs use `SITE_URL` from `src/lib/constants.ts`.

## Writing a Post

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

### 3. Add images or media (optional)

Place files in the `assets/` subfolder. Reference them with relative paths:

```markdown
![Diagram](./assets/diagram.png)
[Download spec](./assets/spec.pdf)
```

### 4. Preview locally

```bash
bun dev
```

Open `http://localhost:3000/blogs`. The search palette shows "unavailable in development" — expected.

> For full search: `bun run build && bun run serve`

### 5. Publish

```bash
git add content/blogs/2026-05-01-my-post-title/
git commit -m "content: add post — my post title"
git push origin feature/my-post-title
```

Open a PR → `develop`, merge `develop` → `main`. The post goes live in ~2 minutes.

### Drafts

Set `published: false` in frontmatter. Excluded from production builds, sitemap, and RSS feed. Still appears in `bun dev`.

---

→ [Architecture](architecture.md) · [Design system](design-system.md) · [Development & CI/CD](development.md)
