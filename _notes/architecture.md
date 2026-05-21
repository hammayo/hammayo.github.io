# Architecture & Configuration

> Part of the `_notes/` technical reference. See also: [Design system](design-system.md) · [Blog engine & SEO](blog-engine.md) · [Development & CI/CD](development.md)

---

## Why Static Export

Going fully static was an easy call. GitHub Pages doesn't run Node.js — it just serves files — and I had no intention of paying for a server to host my personal portfolio. Setting `output: 'export'` in `next.config.ts` means every page pre-renders at build time and lands in `out/`.

One thing worth knowing: client-side navigation doesn't work in `bun run serve`. Static exports produce pre-rendered HTML plus RSC payload files that Next.js fetches client-side via `?_rsc=` requests — a plain static file server can't handle those. It catches people out the first time. It doesn't affect GitHub Pages because visitors hit pages via direct URLs; it's purely a local testing quirk.

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

I keep all page copy in `content/` TypeScript files rather than inside components. If I want to change my bio, update my availability, or reword something on the contact page, I edit `content/about.ts`, `content/contact.ts`, or `content/cv.ts` — I don't go hunting through JSX. Components just import and render.

## Core Configuration

Everything that could be a magic string in a component lives in `src/lib/constants.ts` instead — `SITE`, `SOCIAL`, `SITE_URL`, `PAGE_META`. It's the kind of thing that feels like overkill until you have to change your URL and it takes 30 seconds instead of a grep-and-pray.

## Environment Variables

`src/lib/env.ts` validates all environment variables with Zod at startup. Missing or malformed values log clearly rather than surfacing as a cryptic runtime crash three steps into a build.

| Variable | Required locally | Purpose |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | No | Override basePath for local static export sub-path testing |
| `GITHUB_USERNAME` | For projects page | GitHub username for API calls |
| `GITHUB_TOKEN` | For projects page | GitHub PAT — enables pinned repos via GraphQL |
| `GA_MEASUREMENT_ID` | No | Google Analytics — omit to disable |

In CI, `basePath` is derived from `GITHUB_REPOSITORY` automatically. `env.ts` ignores `NEXT_PUBLIC_BASE_PATH` when `GITHUB_ACTIONS=true`.

## Image Loader

GitHub Pages serves this site under a sub-path (`/hammayo.github.io/`), which means every image `src` needs that prefix or they 404. I handle this globally via `src/lib/imageLoader.ts`, registered in `next.config.ts` as `loaderFile`. The loader runs on every `<Image>` automatically — nothing else needs to know it exists.

One sharp edge: never pass a `loader` prop directly to `<Image>` inside a Server Component. It tries to serialise the function across the RSC boundary and throws. The global loader is the only supported path.

## GitHub API — Projects Page

The projects page fetches my GitHub data at build time — pinned repos via GraphQL, everything else via REST, both in parallel. `src/lib/github.ts` handles the calls.

If `GITHUB_TOKEN` or `GITHUB_USERNAME` aren't set locally, the page builds fine and just shows no repositories. That's intentional — I didn't want a missing API key to blow up the build. On GitHub Actions the credentials come from repo secrets.

---

→ [Design system](design-system.md) · [Blog engine & SEO](blog-engine.md) · [Development & CI/CD](development.md)
