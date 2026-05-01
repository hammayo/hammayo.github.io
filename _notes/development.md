# Development & CI/CD

> Part of the `_notes/` technical reference. See also: [Architecture](architecture.md) · [Design system](design-system.md) · [Blog engine & SEO](blog-engine.md)

---

## Build Pipeline

I designed `bun run build` as three steps in sequence — order matters, and here's why:

```
bun run build
  │
  ├─ 1. node scripts/copy-blog-assets.mjs
  │       copies content/blogs/*/assets/ → public/blog-assets/[slug]/
  │       must run before next build — images referenced in MDX won't resolve otherwise
  │
  ├─ 2. bunx --bun next build
  │       static export → out/
  │
  └─ 3. bunx pagefind --site out
          full-text search index → out/pagefind/
          must index the built output — cannot run before step 2
```

Assets have to exist before Next.js processes the MDX that references them. Pagefind indexes the built output, not the source — so it can't run before step 2. I gitignore both `public/blog-assets/` and `out/`; neither gets committed.

## Local Development Modes

| Mode | Command | Navigation | Search | Use case |
|---|---|---|---|---|
| **Dev** | `bun dev` | ✅ Full client-side routing | ❌ Unavailable | Feature development |
| **Static export** | `bun run serve` | ⚠️ Direct URLs only | ✅ Works | Testing search, pre-deployment |

**Why `bun run serve` breaks client-side navigation:**

My static export produces pre-rendered HTML files plus RSC payload files (`.txt` files in `out/`). When Next.js does client-side navigation it fetches these payloads via `?_rsc=` requests — a static file server just returns 404 for those. The first time this happens it looks like a bug; it isn't. GitHub Pages is unaffected because visitors load pages via direct URLs and get the pre-rendered HTML.

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in what you need — I've kept all vars optional except where noted:

| Variable | Required locally | CI behaviour | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | No | Ignored (derived from `GITHUB_REPOSITORY`) | Override basePath for local static export sub-path testing |
| `GITHUB_USERNAME` | For projects page | Set via repo secret | GitHub username for API calls |
| `GITHUB_TOKEN` | For projects page | Set via repo secret | GitHub PAT — enables pinned repos via GraphQL |
| `GA_MEASUREMENT_ID` | No | Set via repo secret | Google Analytics — omit to disable |

I hardcode `SITE_URL` (`https://hammayo.co.uk`) in `src/lib/constants.ts` — it's not an env var.

## CI/CD Pipeline

Every push to `main` triggers `.github/workflows/deploy.yml`. Here's what actually runs:

```yaml
name: CI/CD Pipeline -> Build and Deploy

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: write
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  secrets-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  build:
    needs: secrets-scan
    runs-on: ubuntu-latest
    env:
      NODE_ENV: production
      NEXT_PUBLIC_BASE_PATH: ${{ github.event.repository.name }}
      GITHUB_USERNAME: ${{ secrets.GITHUB_USERNAME }}
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Cache Next.js build
        uses: actions/cache@v4
        with:
          path: .next/cache
          key: ${{ runner.os }}-nextjs-${{ hashFiles('bun.lock') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx', 'content/**/*') }}
          restore-keys: |
            ${{ runner.os }}-nextjs-${{ hashFiles('bun.lock') }}-
            ${{ runner.os }}-nextjs-
      - name: Install dependencies
        run: |
          bun install
          bunx --bun next telemetry disable
      - name: Copy blog assets
        run: node scripts/copy-blog-assets.mjs
      - name: Build with Next.js
        run: bunx --bun next build
      - name: Index with Pagefind
        run: bunx pagefind --site out --output-subdir pagefind
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v5
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

A few things worth noting: the secrets scan runs first and blocks everything if Gitleaks finds credentials anywhere in the git history — not just the diff. The build caches `.next/cache` keyed on lockfile and source changes, which keeps subsequent deploys fast. End-to-end the pipeline takes about 2 minutes.

## Version Workflow

On every PR merge to `main`, `.github/workflows/version-increment.yml` runs:

1. Reads the latest git tag (e.g. `v.1.0.9`)
2. Bumps the patch number and pushes a new tag (e.g. `v.1.0.10`) — no file changes, no commits
3. Creates a GitHub Release with auto-generated release notes

I keep `package.json` version intentionally static because the alternative is CI writing a file and committing it, which triggers another CI run. I've seen that loop go wrong enough times. The git tag is authoritative — it's what the version badge in the README pulls from.

## Quality Gates

I don't have an automated test suite — a personal portfolio doesn't need one. What I do care about: clean TypeScript and a happy linter. My bar before merging:

```bash
bun run type-check   # tsc --noEmit — zero type errors required
bun run lint:strict  # eslint --max-warnings=0 — zero warnings required
bun run build        # full three-step build must succeed end-to-end
```

ESLint notes:
- `@typescript-eslint/no-explicit-any` is **off** — `any` is permitted where necessary
- Unused vars are a warning; prefix with `_` to suppress
- Use `lint` (warnings allowed) during development; `lint:strict` before merging

---

→ [Architecture](architecture.md) · [Design system](design-system.md) · [Blog engine & SEO](blog-engine.md)
