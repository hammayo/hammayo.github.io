[![Build](https://github.com/hammayo/hammayo.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/hammayo/hammayo.github.io/actions/workflows/deploy.yml) [![Version](https://img.shields.io/github/package-json/v/hammayo/hammayo.github.io)](https://github.com/hammayo/hammayo.github.io/releases) [![Updated](https://img.shields.io/github/last-commit/hammayo/hammayo.github.io?logo=github&label=last%20update)](https://github.com/hammayo/hammayo.github.io/commits)

# Hammayo

>
> A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.
>
> https://hammayo.co.uk
>

## Features

- Built with Next.js 16 (static export, App Router)
- Tailwind CSS v4 — CSS-first config via `@theme {}` in `globals.css`
- Time-of-day colour scheme system (`SchemeProvider`) — 4 named schemes, smooth crossfades, reduced-motion safe
- Animated gradient design language across hero, nav, and UI elements
- Dark and light mode (next-themes)
- Fully responsive — compact fixed chrome, content scrolls within frame
- SEO optimised — Open Graph, Twitter Card, structured data (JSON-LD), sitemap, robots.txt
- Type-safe with TypeScript and Zod v4 environment validation
- Gitleaks secret scanning in CI — blocks deployment on any detected secret
- Google Analytics via `next/script` (afterInteractive)
- Error boundary for graceful error handling
- Bun as primary package manager and runtime

## Getting Started

### Prerequisites

- Git
- [Bun](https://bun.sh) (preferred) or Node.js 18+

### Installation

```bash
git clone https://github.com/hammayo/hammayo.github.io.git
cd hammayo.github.io
bun install
```

Copy the environment template and fill in your values:

```bash
cp .env.local.example .env.local
```

### Development

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
bun run build
```

Static output is written to `out/` — this is what GitHub Pages deploys.

### Lint / Type-check

```bash
bun run lint
bun run type-check
```

## Project Structure

```
hammayo.github.io/
├── .github/
│   └── workflows/
│       ├── deploy.yml           # Build + Gitleaks scan → GitHub Pages
│       └── version-increment.yml
├── content/                     # Blog MDX files (future), CV and uses data
├── docs/
│   └── superpowers/
│       ├── specs/               # Design specs
│       └── plans/               # Implementation plans + completion summaries
├── public/
│   ├── icons/                   # Favicon, apple-touch-icon, webmanifest
│   ├── images/                  # Logo and static images
│   └── screenshots/             # OG and README screenshots
├── src/
│   ├── app/                     # Next.js App Router — thin route shells
│   │   ├── page.tsx             # Home
│   │   ├── projects/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── blogs/page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css          # Tailwind v4 @theme, CSS vars, keyframes
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── design/
│   │   ├── schemes.ts           # Colour scheme registry (4 named schemes)
│   │   └── variants.ts          # CVA variant configs shared across features
│   ├── features/
│   │   ├── home/                # Hero component
│   │   ├── projects/            # ProjectCard, GitHub fetch
│   │   ├── contact/             # ContactCard
│   │   └── shared/              # Header, footer, animated background,
│   │       │                    # page transitions, route progress, error boundary
│   │       └── ui/              # shadcn/Radix UI components
│   ├── lib/
│   │   ├── constants.ts         # SITE, SOCIAL, THEME, SITE_URL
│   │   ├── env.ts               # Zod-validated environment variables
│   │   ├── github.ts            # GitHub API (Octokit v5)
│   │   ├── logger.ts            # Structured logger
│   │   └── utils.ts             # cn() and general utilities
│   └── providers/
│       ├── theme-provider.tsx   # next-themes dark/light
│       └── scheme-provider.tsx  # Time-of-day colour scheme + CSS vars
├── .eslintrc.js
├── .gitleaks.toml               # Gitleaks allowlist for known false positives
├── bun.lock
├── components.json              # shadcn/ui configuration
├── next.config.ts               # Static export, basePath, image loader
├── postcss.config.mjs           # @tailwindcss/postcss (Tailwind v4)
└── tsconfig.json
```

## Colour Scheme System

`SchemeProvider` resolves the active scheme from the visitor's local time and injects CSS custom properties on `:root`. All gradient, glow, and accent colours across the site derive from these variables — no colour logic in individual components.

| Scheme | Active hours | Character |
|---|---|---|
| `silver` | 06:00–11:59 | Metallic, refined |
| `deep-purple` | 12:00–17:59 | Saturated, bold |
| `glass` | 18:00–21:59 | Airy, cool |
| `violet-blue` | 22:00–05:59 | Deep, rich (default) |

Scheme cycling is disabled automatically when `prefers-reduced-motion: reduce` is detected (WCAG 2.1 AA).

## Environment Variables

```bash
# GitHub Pages routing (set automatically by deploy.yml)
NEXT_PUBLIC_BASE_PATH=

# GitHub API — for pinned repos on the projects page (optional)
GITHUB_USERNAME=
GITHUB_TOKEN=

# Analytics (optional)
GA_MEASUREMENT_ID=G-xxxxxxxx
```

`SITE_URL` (`https://hammayo.co.uk`) is hardcoded in `src/lib/constants.ts` — no env var needed.

## Deployment

Push to `main` triggers the `deploy.yml` workflow:

1. **Gitleaks** secret scan — blocks build if any secret is detected in committed files or git history
2. **Build** — `bun run build` produces static output in `out/`
3. **Deploy** — GitHub Actions uploads `out/` to GitHub Pages

The site is served via a custom domain (`hammayo.co.uk`) configured in `CNAME`.

## Customisation

| What | Where |
|---|---|
| Name, title, description, social links | `src/lib/constants.ts` |
| Colour schemes | `src/design/schemes.ts` |
| Active scheme mode (time-of-day / config / cycle) | `src/design/schemes.ts` → `SCHEME_MODE` |
| Hero gradient colours | `src/features/home/hero.tsx` |
| Navigation links | `src/features/shared/header.tsx` |
| Global CSS, fonts, keyframes | `src/app/globals.css` |
| Structured data (JSON-LD) | `src/features/shared/structured-data.tsx` |

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/)
- [Bun](https://bun.sh)
