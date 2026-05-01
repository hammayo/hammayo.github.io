# Development & CI/CD

> Part of the `_notes/` technical reference. See also: [Architecture](architecture.md) · [Design system](design-system.md) · [Blog engine & SEO](blog-engine.md)

---

## Build Pipeline

I designed `bun run build` as three steps in sequence — order matters:

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

I gitignore both `public/blog-assets/` and `out/`. Neither is committed.

## Local Development Modes

| Mode | Command | Navigation | Search | Use case |
|---|---|---|---|---|
| **Dev** | `bun dev` | ✅ Full client-side routing | ❌ Unavailable | Feature development |
| **Static export** | `bun run serve` | ⚠️ Direct URLs only | ✅ Works | Testing search, pre-deployment |

**Why `bun run serve` breaks client-side navigation:**

My static export produces pre-rendered HTML files plus RSC payload files (`.txt` files in `out/`). Client-side navigation issues `?_rsc=` requests that require Next.js server handling — a static file server can't handle these. This is expected behaviour, not a bug. It doesn't affect GitHub Pages, where visitors arrive via direct URLs and get the pre-rendered HTML.

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

Every push to `main` triggers my `.github/workflows/deploy.yml` pipeline:

```
push to main
  │
  ├─ 1. Gitleaks secret scan
  │       scans committed files and git history for credentials
  │       blocks the deploy if anything is found
  │
  ├─ 2. node scripts/copy-blog-assets.mjs
  │
  ├─ 3. bunx --bun next build  →  out/
  │
  ├─ 4. bunx pagefind --site out  →  out/pagefind/
  │
  └─ 5. Deploy out/ to GitHub Pages  →  hammayo.co.uk
```

End-to-end the deploy takes approximately 2 minutes.

## Version Workflow

On every PR merge to `main`, `.github/workflows/version-increment.yml` runs:

1. Reads the latest git tag (e.g. `v.1.0.9`)
2. Bumps the patch number and pushes a new tag (e.g. `v.1.0.10`) — no file changes, no commits
3. Creates a GitHub Release with auto-generated release notes

I keep `package.json` version intentionally static. The git tag is authoritative. This avoids CI-to-branch write-back and the merge conflicts it causes.

## Quality Gates

I don't have an automated test suite. My bar before merging:

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
