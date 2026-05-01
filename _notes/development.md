# Development & CI/CD

> Part of the `_notes/` technical reference. See also: [Architecture](architecture.md) · [Design system](design-system.md) · [Blog engine & SEO](blog-engine.md)

---

## Build Pipeline

`bun run build` runs three steps in sequence — order matters:

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

`public/blog-assets/` and `out/` are both gitignored. Neither is committed.

## Local Development Modes

| Mode | Command | Navigation | Search | Use case |
|---|---|---|---|---|
| **Dev** | `bun dev` | ✅ Full client-side routing | ❌ Unavailable | Feature development |
| **Static export** | `bun run serve` | ⚠️ Direct URLs only | ✅ Works | Testing search, pre-deployment |

**Why `bun run serve` breaks client-side navigation:**

Static exports produce pre-rendered HTML files plus RSC payload files (`.txt` files in `out/`). Client-side navigation issues `?_rsc=` requests that require Next.js server handling. A static file server can't handle these — it just serves files. This is expected behaviour, not a bug. It doesn't affect GitHub Pages, where visitors arrive via direct URLs and get the pre-rendered HTML.

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in what you need:

| Variable | Required locally | CI behaviour | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | No | Ignored (derived from `GITHUB_REPOSITORY`) | Override basePath for local static export sub-path testing |
| `GITHUB_USERNAME` | For projects page | Set via repo secret | GitHub username for API calls |
| `GITHUB_TOKEN` | For projects page | Set via repo secret | GitHub PAT — enables pinned repos via GraphQL |
| `GA_MEASUREMENT_ID` | No | Set via repo secret | Google Analytics — omit to disable |

`SITE_URL` (`https://hammayo.co.uk`) is hardcoded in `src/lib/constants.ts` — not an env var.

## CI/CD Pipeline

Triggered on every push to `main` via `.github/workflows/deploy.yml`:

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

Deploy takes approximately 2 minutes end-to-end.

## Version Workflow

Triggered on PR merge to `main` via `.github/workflows/version-increment.yml`:

1. Reads the latest git tag (e.g. `v.1.0.9`)
2. Bumps the patch number and pushes a new tag (e.g. `v.1.0.10`) — no file changes, no commits
3. Creates a GitHub Release with auto-generated release notes

`package.json` version is intentionally static. The authoritative version is the git tag. This avoids CI-to-branch write-back and the merge conflicts it causes.

## Quality Gates

There is no automated test suite. The bar before merging:

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
