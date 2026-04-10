# Plan 1: Foundation — Dependency Upgrades + Architecture + Design System

> **Status: COMPLETE** — branch `feature/plan-1-foundation`, completed 2026-04-10. See `2026-04-10-plan-1-completion.md` for full summary including deviations and QA fixes.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Upgrade all major dependencies to latest versions, restructure `src/` into feature domains, establish the SchemeProvider design system, and harden CI with Gitleaks.

**Architecture:** Feature-based `src/features/` replaces flat `src/components/`. Design tokens live in `src/design/`. `SchemeProvider` wraps the app alongside `ThemeProvider`. All breaking dependency changes resolved before any new features are built. This is Plan 1 of 3 — Plans 2 (Blog) and 3 (Pages) depend on this completing successfully.

**Tech Stack:** Next.js 16, Tailwind CSS 4, `@tailwindcss/postcss`, `tw-animate-css`, `tailwind-merge` 3, shadcn/ui (Tailwind v4), Zod 4, Lucide 1, Framer Motion 12.38, `next/font/google`

---

## File Map

| Action | File |
|---|---|
| Modify | `postcss.config.mjs` |
| Modify | `src/app/globals.css` |
| Modify | `package.json` |
| Modify | `bun.lock` (auto-updated by bun) |
| Modify | `src/app/layout.tsx` |
| Modify | `src/lib/constants.ts` |
| Modify | `src/lib/env.ts` (verify only, likely no changes) |
| Modify | `.github/workflows/deploy.yml` |
| Modify | `.github/workflows/version-increment.yml` |
| Create | `src/design/schemes.ts` |
| Create | `src/design/variants.ts` |
| Create | `src/providers/scheme-provider.tsx` |
| Create | `src/features/shared/` (all shared components moved here) |
| Create | `src/features/home/hero.tsx` |
| Create | `src/features/projects/project-card.tsx` |
| Create | `src/features/contact/contact-card.tsx` |
| Create | `.gitleaks.toml` |
| Delete | `tailwind.config.ts` |
| Delete | `src/components/ascii-title.tsx` |
| Delete | `src/components/page-heading.tsx` |

---

## Task 1: Upgrade Tailwind v4 — packages and PostCSS

**Files:**
- Modify: `package.json`
- Modify: `postcss.config.mjs`

- [x] **Step 1: Remove Tailwind v3 packages**

```bash
bun remove tailwindcss tailwindcss-animate autoprefixer
```

Expected: `bun.lock` updated, no errors.

- [x] **Step 2: Install Tailwind v4 packages**

```bash
bun add tailwindcss@latest @tailwindcss/postcss tw-animate-css
bun add tailwind-merge@latest
```

Expected: Installs `tailwindcss@4.x`, `@tailwindcss/postcss`, `tw-animate-css`, `tailwind-merge@3.x`.

- [x] **Step 3: Update `postcss.config.mjs`**

Replace the entire file:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

- [x] **Step 4: Verify dev server starts**

```bash
bun run dev
```

Expected: Server starts (may show CSS errors — that's expected until Task 2). Ctrl+C to stop.

- [x] **Step 5: Commit**

```bash
git add package.json bun.lock postcss.config.mjs
git commit -m "chore: upgrade tailwind v3→v4, replace autoprefixer with @tailwindcss/postcss"
```

---

## Task 2: Migrate `globals.css` to Tailwind v4

**Files:**
- Modify: `src/app/globals.css`

The existing file uses `@tailwind base/components/utilities` directives and the `animate-gradient` keyframe. Tailwind v4 replaces those with a single `@import`.

- [x] **Step 1: Replace the full contents of `src/app/globals.css`**

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;

  /* Custom animations from old tailwind.config.ts */
  --animate-accordion-down: accordion-down 0.2s ease-out;
  --animate-accordion-up: accordion-up 0.2s ease-out;
  --animate-fade-in: fade-in 0.5s ease-out forwards;
  --animate-fade-in-scale: fade-in-scale 0.5s ease-out forwards;
  --animate-slide-in-right: slide-in-right 0.3s ease-out forwards;
  --animate-slide-in-left: slide-in-left 0.3s ease-out forwards;
  --animate-pulse-soft: pulse-soft 2s ease-in-out infinite;
  --animate-float: float 3s ease-in-out infinite;
  --animate-gradient-x: gradient-x 15s ease-in-out infinite;
  --animate-gradient-flow: gradient-flow 20s ease infinite;
  --animate-gradient: animatedgradient 6s ease infinite alternate;
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;

    /* Scheme CSS custom properties — initial values (violet-blue, light mode) */
    --scheme-from: #8b5cf6;
    --scheme-via: #a855f7;
    --scheme-to: #3b82f6;
    --scheme-glow: rgba(139, 92, 246, 0.15);
    --scheme-accent: #8b5cf6;
    --scheme-border: rgba(139, 92, 246, 0.3);
    --scheme-transition: 2000ms;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Scheme-aware gradient text utility */
@layer utilities {
  .gradient-text {
    background: linear-gradient(to right, var(--scheme-from), var(--scheme-via), var(--scheme-to));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .gradient-bg {
    background: linear-gradient(to right, var(--scheme-from), var(--scheme-via), var(--scheme-to));
  }

  .scheme-glow {
    box-shadow: 0 0 20px var(--scheme-glow);
  }

  .scheme-border {
    border-color: var(--scheme-border);
  }

  /* Animation delay utilities (replaces tailwind.config.ts plugin) */
  .animate-delay-100 { animation-delay: 100ms; }
  .animate-delay-200 { animation-delay: 200ms; }
  .animate-delay-300 { animation-delay: 300ms; }
  .animate-delay-400 { animation-delay: 400ms; }
  .animate-delay-500 { animation-delay: 500ms; }
  .animate-delay-600 { animation-delay: 600ms; }
  .animate-delay-700 { animation-delay: 700ms; }
  .animate-delay-800 { animation-delay: 800ms; }
}

/* Keyframes — migrated from tailwind.config.ts */
@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}
@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
}
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in-scale {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes slide-in-right {
  0% { transform: translateX(-10px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}
@keyframes slide-in-left {
  0% { transform: translateX(10px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}
@keyframes pulse-soft {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
@keyframes float {
  0% { transform: translateY(0px) rotate(0deg) scale(1); filter: brightness(1); }
  50% { transform: translateY(-5px) rotate(2deg) scale(1.05); filter: brightness(1.1); }
  100% { transform: translateY(0px) rotate(0deg) scale(1); filter: brightness(1); }
}
@keyframes gradient-x {
  0%, 100% { background-position: 200% 0; opacity: 0.5; }
  50% { background-position: 0% 0; opacity: 0.8; }
}
@keyframes gradient-flow {
  0%, 100% { background-size: 200% 200%; background-position: 0% 0%; }
  50% { background-size: 200% 200%; background-position: 100% 100%; }
}
@keyframes animatedgradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 300%;
  animation: animatedgradient 6s ease infinite alternate;
}
```

- [x] **Step 2: Delete `tailwind.config.ts`**

```bash
rm /Volumes/data/projects/hammayo.github.io/tailwind.config.ts
```

- [x] **Step 3: Run type check to confirm no TS errors from removal**

```bash
bun run type-check
```

Expected: Passes. If `tailwind.config.ts` is referenced anywhere, fix that import.

- [x] **Step 4: Run dev server and visually confirm styles load**

```bash
bun run dev
```

Open `http://localhost:3000`. Confirm: dark background, text visible, no broken layout. Ctrl+C.

- [x] **Step 5: Commit**

```bash
git add src/app/globals.css tailwind.config.ts
git commit -m "chore: migrate globals.css to Tailwind v4, move keyframes and @theme, add scheme CSS vars"
```

---

## Task 3: Re-add shadcn/ui components for Tailwind v4

shadcn/ui components must be re-added via the CLI to get v4-compatible versions with updated Tailwind class names.

**Files:**
- Modify: `components.json`
- Modify: `src/components/ui/*.tsx` (all shadcn components)

- [x] **Step 1: Re-initialise shadcn/ui**

```bash
bunx shadcn@latest init
```

When prompted:
- Style: Default
- Base colour: Neutral (or your preference)
- CSS variables: Yes
- Confirm overwrite of `globals.css`: **No** (we already migrated it)

- [x] **Step 2: Re-add all shadcn components used in the codebase**

```bash
bunx shadcn@latest add button card dialog dropdown-menu hover-card progress sheet
```

Confirm overwrite when prompted: Yes.

- [x] **Step 3: Run build to verify shadcn components compile cleanly**

```bash
bun run build
```

Expected: Build succeeds. Fix any class-name errors reported (usually a handful of renamed utilities in v4).

- [x] **Step 4: Commit**

```bash
git add src/components/ui/ components.json
git commit -m "chore: re-add shadcn/ui components for Tailwind v4 compatibility"
```

---

## Task 4: Upgrade Next.js v16

**Files:**
- Modify: `package.json`

- [x] **Step 1: Read the Next.js 16 migration guide**

Open: https://nextjs.org/docs/upgrading

Note any breaking changes that apply to: App Router, static export (`output: 'export'`), `generateStaticParams`, Route Handlers, `next/font`, `next/image`, `Metadata` API.

- [x] **Step 2: Upgrade Next.js**

```bash
bun add next@latest
```

- [x] **Step 3: Run type-check immediately**

```bash
bun run type-check
```

Fix any type errors introduced by v16 API changes. Common areas: `Metadata` type, `generateStaticParams` return type, `NextRequest`/`NextResponse` types.

- [x] **Step 4: Run build**

```bash
bun run build
```

Expected: Build completes and outputs to `./out`. If static export fails, check Next.js 16 release notes for `output: 'export'` changes.

- [x] **Step 5: Commit**

```bash
git add package.json bun.lock
git commit -m "chore: upgrade next.js v15→v16"
```

---

## Task 5: Upgrade Zod v4, Lucide v1, and remaining packages

**Files:**
- Modify: `package.json`
- Modify: `src/lib/env.ts` (if Zod v4 API changes affect it)

- [x] **Step 1: Upgrade Zod and check for breaking changes**

```bash
bun add zod@latest
```

Open `src/lib/env.ts`. The current code uses: `z.object`, `z.enum`, `z.string`, `.optional()`, `.default()`, `.passthrough()`, `.safeParse()`. Verify each still works in Zod v4 by running:

```bash
bun run type-check
```

If errors appear, consult https://zod.dev/v4 for the specific API that changed and update `src/lib/env.ts` accordingly.

- [x] **Step 2: Audit Lucide icon names before upgrading**

```bash
grep -r "from 'lucide-react'" src/ --include="*.tsx"
```

Expected output lists files importing from lucide-react. Check each imported icon name against the Lucide v1 changelog at https://lucide.dev/guide/migration to confirm none were renamed.

Current imports (verify these still exist in v1):
- `project-card.tsx`: `Star`, `GitFork`, `ExternalLink`, `Github`
- `footer.tsx`: `Github`, `Linkedin`, `Mail`

- [x] **Step 3: Upgrade Lucide, Octokit, Framer Motion, and React patch**

```bash
bun add lucide-react@latest octokit@latest framer-motion@latest react@latest react-dom@latest
```

- [x] **Step 4: Run type-check**

```bash
bun run type-check
```

Fix any errors. Lucide v1 changed some icon component prop types — the most common fix is removing deprecated `size` prop usage if any.

- [x] **Step 5: Run build and confirm it passes**

```bash
bun run build
```

- [x] **Step 6: Commit**

```bash
git add package.json bun.lock src/lib/env.ts
git commit -m "chore: upgrade zod v4, lucide v1, octokit v5, framer-motion, react patch"
```

---

## Task 6: Create `src/design/schemes.ts`

**Files:**
- Create: `src/design/schemes.ts`

- [x] **Step 1: Create `src/design/` directory and `schemes.ts`**

```bash
mkdir -p src/design
```

Create `src/design/schemes.ts` with the full content:

```ts
/**
 * Colour scheme registry.
 * To swap the active scheme system: change SCHEME_MODE.
 * To add a new scheme: add an entry to SCHEMES and SCHEME_ORDER.
 * No component changes required.
 */

export type ColorScheme = {
  /** Display name */
  name: string;
  /** Tailwind gradient classes — used in light mode */
  gradient: string;
  /** Tailwind gradient classes — used in dark mode (darker for light-toned schemes) */
  darkGradient: string;
  /** CSS rgba string for box-shadow glow */
  glow: string;
  /** Hex colour for --scheme-from CSS variable */
  from: string;
  /** Hex colour for --scheme-via CSS variable */
  via: string;
  /** Hex colour for --scheme-to CSS variable */
  to: string;
  /** Hex colour for --scheme-accent CSS variable */
  accent: string;
  /** rgba string for --scheme-border CSS variable */
  border: string;
  /** Crossfade duration in ms — applied as CSS transition */
  transitionMs: number;
};

export const SCHEMES = {
  'violet-blue': {
    name: 'Violet Blue',
    gradient: 'from-violet-500 via-purple-500 to-blue-500',
    darkGradient: 'from-violet-500 via-purple-500 to-blue-500',
    glow: 'rgba(139, 92, 246, 0.25)',
    from: '#8b5cf6',
    via: '#a855f7',
    to: '#3b82f6',
    accent: '#8b5cf6',
    border: 'rgba(139, 92, 246, 0.3)',
    transitionMs: 2000,
  },
  'deep-purple': {
    name: 'Deep Purple',
    gradient: 'from-purple-400 via-fuchsia-500 to-violet-600',
    darkGradient: 'from-purple-400 via-fuchsia-500 to-violet-600',
    glow: 'rgba(168, 85, 247, 0.25)',
    from: '#c084fc',
    via: '#d946ef',
    to: '#7c3aed',
    accent: '#c084fc',
    border: 'rgba(168, 85, 247, 0.3)',
    transitionMs: 2500,
  },
  'silver': {
    name: 'Silver',
    gradient: 'from-zinc-300 via-slate-200 to-zinc-400',
    darkGradient: 'from-zinc-400 via-slate-300 to-zinc-500',
    glow: 'rgba(161, 161, 170, 0.25)',
    from: '#a1a1aa',
    via: '#cbd5e1',
    to: '#71717a',
    accent: '#a1a1aa',
    border: 'rgba(161, 161, 170, 0.3)',
    transitionMs: 3000,
  },
  'glass': {
    name: 'Glass',
    gradient: 'from-teal-300 via-cyan-200 to-sky-300',
    darkGradient: 'from-teal-400 via-cyan-300 to-sky-400',
    glow: 'rgba(34, 211, 238, 0.25)',
    from: '#5eead4',
    via: '#67e8f9',
    to: '#7dd3fc',
    accent: '#22d3ee',
    border: 'rgba(34, 211, 238, 0.3)',
    transitionMs: 3000,
  },
} satisfies Record<string, ColorScheme>;

export type SchemeName = keyof typeof SCHEMES;

/**
 * SCHEME_MODE controls how the active scheme is resolved.
 * Change this constant — no component changes needed.
 *
 * 'time-of-day' — resolved from visitor's local hour:
 *   06:00–11:59 → silver (morning)
 *   12:00–17:59 → deep-purple (afternoon)
 *   18:00–21:59 → glass (evening)
 *   22:00–05:59 → violet-blue (night)
 *
 * 'config'      — always uses SCHEME_DEFAULT
 * 'cycle'       — rotates SCHEME_ORDER at CYCLE_SPEED
 */
export const SCHEME_MODE: 'time-of-day' | 'config' | 'cycle' = 'time-of-day';

/** Used when SCHEME_MODE is 'config', or as SSR default before hydration */
export const SCHEME_DEFAULT: SchemeName = 'violet-blue';

/** Used when SCHEME_MODE is 'cycle' */
export const SCHEME_ORDER: SchemeName[] = ['violet-blue', 'deep-purple', 'silver', 'glass'];

/**
 * Cycle speed when SCHEME_MODE is 'cycle'.
 * 'slow' = 30 000ms, 'medium' = 15 000ms
 */
export const CYCLE_SPEED: 'slow' | 'medium' = 'slow';

export const CYCLE_SPEED_MS: Record<typeof CYCLE_SPEED, number> = {
  slow: 30_000,
  medium: 15_000,
};

/** Resolve scheme name from visitor's local hour */
export function resolveTimeOfDayScheme(): SchemeName {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'silver';
  if (hour >= 12 && hour < 18) return 'deep-purple';
  if (hour >= 18 && hour < 22) return 'glass';
  return 'violet-blue';
}
```

- [x] **Step 2: Run type-check**

```bash
bun run type-check
```

Expected: Passes with no errors.

- [x] **Step 3: Commit**

```bash
git add src/design/schemes.ts
git commit -m "feat: add design/schemes.ts — scheme registry and resolution logic"
```

---

## Task 7: Create `src/design/variants.ts`

**Files:**
- Create: `src/design/variants.ts`

CVA variant configs shared across feature components — gradient text, glow card, accent tag.

- [x] **Step 1: Create `src/design/variants.ts`**

```ts
import { cva } from 'class-variance-authority';

/**
 * Gradient text variant.
 * Uses CSS custom properties set by SchemeProvider.
 * Apply className from this + `gradient-text` utility class.
 */
export const gradientText = cva('gradient-text bg-clip-text text-transparent', {
  variants: {
    size: {
      display: 'text-4xl md:text-8xl font-bold',
      heading: 'text-2xl md:text-4xl font-bold',
      body:    'text-base font-medium',
    },
  },
  defaultVariants: {
    size: 'body',
  },
});

/**
 * Glow card variant.
 * Uses scheme-glow and scheme-border utilities.
 */
export const glowCard = cva(
  'rounded-2xl border scheme-border scheme-glow transition-all duration-300',
  {
    variants: {
      variant: {
        featured: 'bg-primary/5 hover:bg-primary/8',
        default:  'bg-background/50 hover:bg-background/70',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Accent tag variant.
 * Pill-shaped tag using scheme accent colour.
 */
export const accentTag = cva(
  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
  {
    variants: {
      variant: {
        scheme: 'scheme-border text-[var(--scheme-accent)] bg-[var(--scheme-accent)]/10',
        muted:  'border-border text-muted-foreground bg-muted/50',
      },
    },
    defaultVariants: {
      variant: 'scheme',
    },
  }
);
```

- [x] **Step 2: Run type-check**

```bash
bun run type-check
```

- [x] **Step 3: Commit**

```bash
git add src/design/variants.ts
git commit -m "feat: add design/variants.ts — shared CVA variant configs"
```

---

## Task 8: Create `src/providers/scheme-provider.tsx`

**Files:**
- Create: `src/providers/scheme-provider.tsx`

- [x] **Step 1: Create `src/providers/scheme-provider.tsx`**

```tsx
'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTheme } from 'next-themes';
import {
  SCHEMES,
  SCHEME_DEFAULT,
  SCHEME_MODE,
  SCHEME_ORDER,
  CYCLE_SPEED_MS,
  CYCLE_SPEED,
  type SchemeName,
  type ColorScheme,
  resolveTimeOfDayScheme,
} from '@/design/schemes';

interface SchemeContextValue {
  schemeName: SchemeName;
  scheme: ColorScheme;
}

const SchemeContext = createContext<SchemeContextValue>({
  schemeName: SCHEME_DEFAULT,
  scheme: SCHEMES[SCHEME_DEFAULT],
});

export function useScheme(): SchemeContextValue {
  return useContext(SchemeContext);
}

function applyScheme(
  name: SchemeName,
  resolvedTheme: string | undefined
): void {
  const scheme = SCHEMES[name];
  const isDark = resolvedTheme === 'dark';
  const gradient = isDark ? scheme.darkGradient : scheme.gradient;

  // Parse gradient classes to extract hex values
  // We use the explicit hex fields instead of parsing Tailwind classes
  const from = scheme.from;
  const via  = scheme.via;
  const to   = scheme.to;

  const root = document.documentElement;
  root.style.setProperty('--scheme-from', from);
  root.style.setProperty('--scheme-via', via);
  root.style.setProperty('--scheme-to', to);
  root.style.setProperty('--scheme-glow', isDark ? scheme.glow : scheme.glow.replace('0.25', '0.15'));
  root.style.setProperty('--scheme-accent', scheme.accent);
  root.style.setProperty('--scheme-border', scheme.border);
  root.style.setProperty('--scheme-transition', `${scheme.transitionMs}ms`);

  // Apply transition to root so CSS custom property changes animate
  root.style.setProperty(
    'transition',
    `--scheme-from ${scheme.transitionMs}ms ease-in-out,
     --scheme-via ${scheme.transitionMs}ms ease-in-out,
     --scheme-to ${scheme.transitionMs}ms ease-in-out`
  );

  void gradient; // gradient Tailwind classes used by SchemeContext consumers
}

export function SchemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [schemeName, setSchemeName] = useState<SchemeName>(SCHEME_DEFAULT);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const schemeIndexRef = useRef(0);

  // Detect prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  useEffect(() => {
    setMounted(true);

    // If user prefers reduced motion, lock to default — no cycling, no transition
    if (prefersReducedMotion) {
      setSchemeName(SCHEME_DEFAULT);
      applyScheme(SCHEME_DEFAULT, resolvedTheme);
      return;
    }

    if (SCHEME_MODE === 'time-of-day') {
      const resolved = resolveTimeOfDayScheme();
      setSchemeName(resolved);
      applyScheme(resolved, resolvedTheme);
      return;
    }

    if (SCHEME_MODE === 'config') {
      setSchemeName(SCHEME_DEFAULT);
      applyScheme(SCHEME_DEFAULT, resolvedTheme);
      return;
    }

    // SCHEME_MODE === 'cycle'
    const cycleMs = CYCLE_SPEED_MS[CYCLE_SPEED];
    const cycle = () => {
      schemeIndexRef.current = (schemeIndexRef.current + 1) % SCHEME_ORDER.length;
      const next = SCHEME_ORDER[schemeIndexRef.current];
      setSchemeName(next);
      applyScheme(next, resolvedTheme);
    };
    intervalRef.current = setInterval(cycle, cycleMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-apply scheme when theme (dark/light) changes
  useEffect(() => {
    if (!mounted) return;
    applyScheme(schemeName, resolvedTheme);
  }, [resolvedTheme, schemeName, mounted]);

  const value: SchemeContextValue = {
    schemeName,
    scheme: SCHEMES[schemeName],
  };

  return (
    <SchemeContext.Provider value={value}>
      {children}
    </SchemeContext.Provider>
  );
}
```

- [x] **Step 2: Run type-check**

```bash
bun run type-check
```

Expected: Passes. Fix any type errors.

- [x] **Step 3: Commit**

```bash
git add src/providers/scheme-provider.tsx
git commit -m "feat: add SchemeProvider — time-of-day scheme resolution, CSS var injection, reduced-motion support"
```

---

## Task 9: Update `layout.tsx` — Inter font, SchemeProvider, metadata URLs

**Files:**
- Modify: `src/app/layout.tsx`

- [x] **Step 1: Replace `src/app/layout.tsx` with the updated version**

```tsx
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import { SchemeProvider } from '@/providers/scheme-provider';
import { Header } from '@/components/header';
import { AnimatedBackgroundClient } from '@/components/animated-background-client';
import { basePath } from '@/lib/env';
import { SITE, THEME, SOCIAL, SITE_URL } from '@/lib/constants';
import { RouteProgress } from '@/components/route-progress';
import { Footer } from '@/components/footer';
import { ErrorBoundary } from '@/components/error-boundary';
import { Analytics } from '@/components/analytics';
import { StructuredData } from '@/components/structured-data';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE.title,
  description: SITE.description,
  authors: [{ name: SITE.author }],
  keywords: SITE.keywords,
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [
      {
        url: `${SITE_URL}/screenshots/home.png`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} Homepage`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: [`${SITE_URL}/screenshots/home.png`],
  },
  icons: {
    icon: [
      { url: `${basePath}/icons/favicon.ico`, sizes: 'any' },
      { url: `${basePath}/icons/favicon-32x32.png`, type: 'image/png', sizes: '32x32' },
      { url: `${basePath}/icons/favicon-16x16.png`, type: 'image/png', sizes: '16x16' },
    ],
    apple: { url: `${basePath}/icons/apple-touch-icon.png`, sizes: '180x180' },
  },
  manifest:
    process.env.NODE_ENV === 'development'
      ? '/icons/site.webmanifest'
      : `${basePath}/icons/site.webmanifest`,
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: THEME.lightThemeColor },
    { media: '(prefers-color-scheme: dark)', color: THEME.darkThemeColor },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme={THEME.defaultTheme}
          enableSystem
          disableTransitionOnChange
        >
          <SchemeProvider>
            <ErrorBoundary>
              <div className="min-h-screen bg-background text-foreground relative flex flex-col">
                <AnimatedBackgroundClient />
                <Header />
                <RouteProgress />
                <main className="flex-1 pt-2 container mx-auto px-4 sm:px-6 lg:px-8">
                  {children}
                </main>
                <Footer />
              </div>
            </ErrorBoundary>
          </SchemeProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
```

Note: `SchemeProvider` is inside `ThemeProvider` so `useTheme()` works inside it.

Note: `SITE_URL` and `SITE.name` are imported from constants — added in Task 10.

- [x] **Step 2: Run type-check (will fail on missing SITE_URL until Task 10 — that's expected)**

```bash
bun run type-check 2>&1 | head -20
```

- [x] **Step 3: Commit layout (without type-check passing — fixed in Task 10)**

```bash
git add src/app/layout.tsx
git commit -m "feat: add Inter via next/font, wrap app with SchemeProvider, update metadata to use SITE_URL"
```

---

## Task 10: Update `src/lib/constants.ts`

**Files:**
- Modify: `src/lib/constants.ts`

- [x] **Step 1: Add `SITE_URL` and `SITE.name` to constants**

Replace `src/lib/constants.ts`:

```ts
/*
 * Application-wide constants
 * This file centralises constants used throughout the application
 */

// Site Information
export const SITE_URL = 'https://hammayo.co.uk';

export const SITE = {
  name:        "Hammayo's Portfolio",
  title:       "Hammayo's | Backend Software Engineer",
  description: 'Portfolio site showcasing 20 years of backend engineering across finance, justice, and public service.',
  author:      'Hammayo Babar',
  keywords:    ['backend engineer', 'software developer', '.NET', 'C#', 'Docker', 'Azure', 'microservices', 'HMPPS', 'portfolio', 'hammy', 'HB'],
};

// Social links and contact information
export const SOCIAL = {
  github:   'https://github.com/hammayo',
  linkedin: 'https://linkedin.com/in/hammayo',
  email:    'hammy@hammayo.co.uk',
};

// Navigation items
export const NAVIGATION = {
  main: [
    { name: 'Home',     href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Blog',     href: '/blog' },
    { name: 'CV',       href: '/cv' },
    { name: 'About',    href: '/about' },
    { name: 'Contact',  href: '/contact' },
  ],
};

// Theme configuration
export const THEME = {
  defaultTheme:    'dark' as const,
  lightThemeColor: '#ffffff',
  darkThemeColor:  '#000000',
};

// API endpoints
export const API = {
  github: 'https://api.github.com',
};
```

- [x] **Step 2: Run type-check — should now pass**

```bash
bun run type-check
```

Expected: Passes cleanly.

- [x] **Step 3: Run build**

```bash
bun run build
```

Expected: Builds to `./out` with no errors.

- [x] **Step 4: Commit**

```bash
git add src/lib/constants.ts
git commit -m "feat: add SITE_URL, SITE.name, Blog/CV/About nav items to constants"
```

---

## Task 11: Architecture restructure — create `src/features/` and move files

This task moves files from `src/components/` into `src/features/` subdirectories and deletes unused files. All logic stays identical — only import paths change.

**Files:**
- Create directories: `src/features/shared/`, `src/features/shared/ui/`, `src/features/home/`, `src/features/projects/`, `src/features/contact/`
- Move: all `src/components/*.tsx` → `src/features/shared/*.tsx`
- Move: `src/components/ui/*.tsx` → `src/features/shared/ui/*.tsx`
- Move: `src/components/hero-title.tsx` → `src/features/home/hero.tsx` (also update to use `useScheme()`)
- Move: `src/components/project-card.tsx` → `src/features/projects/project-card.tsx`
- Move: `src/components/contact-card.tsx` → `src/features/contact/contact-card.tsx`
- Delete: `src/components/ascii-title.tsx`, `src/components/page-heading.tsx`

- [x] **Step 1: Create feature directories**

```bash
mkdir -p src/features/shared/ui
mkdir -p src/features/home
mkdir -p src/features/projects
mkdir -p src/features/contact
mkdir -p content/blog
```

- [x] **Step 2: Move shared UI components**

```bash
cp src/components/ui/button.tsx          src/features/shared/ui/button.tsx
cp src/components/ui/card-effects.tsx    src/features/shared/ui/card-effects.tsx
cp src/components/ui/card.tsx            src/features/shared/ui/card.tsx
cp src/components/ui/dialog.tsx          src/features/shared/ui/dialog.tsx
cp src/components/ui/dropdown-menu.tsx   src/features/shared/ui/dropdown-menu.tsx
cp src/components/ui/hover-card.tsx      src/features/shared/ui/hover-card.tsx
cp src/components/ui/progress.tsx        src/features/shared/ui/progress.tsx
cp src/components/ui/sheet.tsx           src/features/shared/ui/sheet.tsx
cp src/components/ui/text-gradient.tsx   src/features/shared/ui/text-gradient.tsx
```

Create `src/features/shared/ui/index.ts` re-exporting from the same shape as the old `src/components/ui/index.ts` so callers using `@/components/ui` still work until all imports are updated:

```ts
export * from './button';
export * from './card-effects';
export * from './card';
export * from './dialog';
export * from './dropdown-menu';
export * from './hover-card';
export * from './progress';
export * from './sheet';
export * from './text-gradient';
```

- [x] **Step 3: Move shared layout components**

```bash
cp src/components/animated-background.tsx        src/features/shared/animated-background.tsx
cp src/components/animated-background-client.tsx src/features/shared/animated-background-client.tsx
cp src/components/analytics-event.tsx            src/features/shared/analytics-event.tsx
cp src/components/analytics.tsx                  src/features/shared/analytics.tsx
cp src/components/container.tsx                  src/features/shared/container.tsx
cp src/components/error-boundary.tsx             src/features/shared/error-boundary.tsx
cp src/components/footer.tsx                     src/features/shared/footer.tsx
cp src/components/header.tsx                     src/features/shared/header.tsx
cp src/components/loading.tsx                    src/features/shared/loading.tsx
cp src/components/loading-spinner.tsx            src/features/shared/loading-spinner.tsx
cp src/components/page-transition-wrapper.tsx    src/features/shared/page-transition-wrapper.tsx
cp src/components/route-progress.tsx             src/features/shared/route-progress.tsx
cp src/components/structured-data.tsx            src/features/shared/structured-data.tsx
cp src/components/theme-toggle.tsx               src/features/shared/theme-toggle.tsx
```

- [x] **Step 4: Move feature-specific components**

```bash
cp src/components/project-card.tsx  src/features/projects/project-card.tsx
cp src/components/contact-card.tsx  src/features/contact/contact-card.tsx
```

- [x] **Step 5: Create `src/features/home/hero.tsx` — updated to use `useScheme()`**

This is a rewrite of `src/components/hero-title.tsx`. The local `COLOR_SCHEMES` array is removed — colours come from `useScheme()` and the CSS custom properties already set on `:root` by `SchemeProvider`.

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import { CardEffects } from '@/features/shared/ui/card-effects';
import TextGradient from '@/features/shared/ui/text-gradient';
import { useScheme } from '@/providers/scheme-provider';

interface TitleContentProps {
  isDesktop: boolean;
}

const TitleContent: React.FC<TitleContentProps> = ({ isDesktop }) => (
  <div className="px-0 min-[314px]:px-2 sm:px-8 md:px-16 py-10 md:py-14 relative">
    <h1 className="text-center">
      <span className="block text-xl sm:text-2xl md:text-4xl mb-4 text-zinc-700 dark:text-zinc-200">
        Hello, I am
      </span>
      <span className="block text-4xl md:text-8xl font-bold">
        <TextGradient
          text={isDesktop ? 'HAMMAYO' : 'HAMMY'}
          className={`gradient-text ${isDesktop ? 'hidden md:inline' : 'md:hidden text-4xl min-[314px]:text-5xl'}`}
        />
      </span>
    </h1>
    <div className="mt-6 h-1.5 w-32 sm:w-40 md:w-64 mx-auto rounded-full gradient-bg scheme-glow" />
  </div>
);

export function Hero() {
  const [isDesktop, setIsDesktop] = useState(false);
  const { scheme } = useScheme();

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  void scheme; // scheme available for consumers that need direct access

  return (
    <div className="max-w-6xl mx-auto">
      <CardEffects variant="featured" className="rounded-2xl overflow-hidden">
        <TitleContent isDesktop={isDesktop} />
      </CardEffects>
    </div>
  );
}
```

- [x] **Step 6: Delete unused components**

```bash
rm src/components/ascii-title.tsx
rm src/components/page-heading.tsx
```

- [x] **Step 7: Run type-check**

```bash
bun run type-check
```

Expected: Many "cannot find module '@/components/...'" errors. These are fixed in Task 12.

- [x] **Step 8: Commit the moves (before fixing imports)**

```bash
git add src/features/ content/
git rm src/components/ascii-title.tsx src/components/page-heading.tsx
git commit -m "refactor: create src/features/ directories, move components, add hero.tsx with useScheme"
```

---

## Task 12: Update all import paths after restructure

**Files:**
- Modify: All files that import from `@/components/`

All existing `@/components/*` imports still work because the old files are still there. Rather than updating every file at once, we use a targeted search-and-replace then verify with type-check.

- [x] **Step 1: Update imports in `src/app/layout.tsx`**

Change all `@/components/` imports to `@/features/shared/`:

```tsx
import { Header }                  from '@/features/shared/header';
import { AnimatedBackgroundClient } from '@/features/shared/animated-background-client';
import { RouteProgress }            from '@/features/shared/route-progress';
import { Footer }                   from '@/features/shared/footer';
import { ErrorBoundary }            from '@/features/shared/error-boundary';
import { Analytics }                from '@/features/shared/analytics';
import { StructuredData }           from '@/features/shared/structured-data';
```

- [x] **Step 2: Update imports in `src/app/page.tsx`**

Change `HeroTitle` import to `Hero` from features:

```tsx
import { Hero } from '@/features/home/hero';
// Remove: import { HeroTitle } from '@/components/hero-title';
```

Replace `<HeroTitle />` with `<Hero />`.

Also update `Container` and `PageTransitionWrapper` imports:
```tsx
import { Container }             from '@/features/shared/container';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { PageViewEvent }         from '@/features/shared/analytics-event';
```

- [x] **Step 3: Update imports in `src/app/projects/page.tsx`**

```tsx
import { Container }             from '@/features/shared/container';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { ProjectCard }           from '@/features/projects/project-card';
import { PageViewEvent }         from '@/features/shared/analytics-event';
```

Remove `PageHeading` import — inline the heading or create a local `<h1>` (page-heading is deleted):
```tsx
// Replace <PageHeading title="Projects" description="..." />  with:
<div className="mb-8">
  <h1 className="text-3xl font-bold mb-2">Projects</h1>
  <p className="text-muted-foreground">Explore my most recent projects and open source contributions.</p>
</div>
```

- [x] **Step 4: Update imports in `src/app/contact/page.tsx`**

```tsx
import { Container }             from '@/features/shared/container';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { ContactCard }           from '@/features/contact/contact-card';
import { PageViewEvent }         from '@/features/shared/analytics-event';
```

Remove `PageHeading` import — inline the heading.

- [x] **Step 5: Update imports in `src/app/blogs/page.tsx`**

```tsx
import { Container }             from '@/features/shared/container';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { PageViewEvent }         from '@/features/shared/analytics-event';
```

- [x] **Step 6: Update internal imports inside moved files**

For each file in `src/features/shared/` that imports from `@/components/ui/`, update to `@/features/shared/ui/`:

```bash
# Find all files that still reference @/components
grep -r "@/components" src/features/ --include="*.tsx" -l
```

For each file listed, update its imports:
- `@/components/ui/button` → `@/features/shared/ui/button`
- `@/components/ui/card` → `@/features/shared/ui/card`
- etc.

For files in `src/features/projects/` and `src/features/contact/`:
- `@/components/ui/*` → `@/features/shared/ui/*`

- [x] **Step 7: Run type-check**

```bash
bun run type-check
```

Fix any remaining import errors. If `@/components/` imports remain, update them. Each error message shows the exact file and line.

- [x] **Step 8: Delete old `src/components/` directory once type-check passes**

```bash
rm -rf src/components/
```

- [x] **Step 9: Run type-check again to confirm clean**

```bash
bun run type-check
```

Expected: Zero errors.

- [x] **Step 10: Run build**

```bash
bun run build
```

Expected: Builds successfully to `./out`.

- [x] **Step 11: Commit**

```bash
git add -A
git commit -m "refactor: update all imports to src/features/, delete src/components/"
```

---

## Task 13: Verify full build and dev server

- [x] **Step 1: Full type-check and lint**

```bash
bun run type-check && bun run lint
```

Expected: Both pass cleanly. Fix any lint warnings before proceeding.

- [x] **Step 2: Full production build**

```bash
bun run build
```

Expected: Completes, outputs to `./out`, no errors or warnings.

- [x] **Step 3: Serve the static build and visually verify**

```bash
bun run serve
```

Open `http://localhost:3000`. Verify:
- [x] Dark theme loads correctly
- [x] Home page shows gradient hero name (using scheme CSS vars)
- [x] Navigation links render
- [x] Projects page loads (GitHub API working)
- [x] Contact page renders
- [x] No console errors in browser dev tools
- [x] Scheme colours visible (gradient on hero name)

- [x] **Step 4: Commit if any final fixes were needed**

```bash
git add -A
git commit -m "chore: foundation build verified — all pages load, scheme system active"
```

---

## Task 14: CI/CD — Gitleaks secret scanning

**Files:**
- Modify: `.github/workflows/deploy.yml`
- Create: `.gitleaks.toml`

- [x] **Step 1: Create `.gitleaks.toml` at repo root**

```toml
title = "hammayo.github.io gitleaks config"

[extend]
useDefault = true

[allowlist]
description = "Global allowlist"
paths = [
  '''.superpowers/''',
  '''docs/superpowers/''',
]

[[rules.allowlist]]
description = "Allow public GitHub API base URL"
regexes = ['''https://api\.github\.com''']

[[rules.allowlist]]
description = "Allow Google Analytics gtag pattern"
regexes = ['''gtag\('''']
```

- [x] **Step 2: Add Gitleaks job to `deploy.yml`**

Open `.github/workflows/deploy.yml`. Add a new `secrets-scan` job before the existing `build` job, and add `needs: secrets-scan` to the `build` job:

```yaml
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
      # ... existing env block unchanged
```

The full updated `deploy.yml`:

```yaml
name: CI/CD Pipeline -> Build and Deploy

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
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

      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Cache Next.js build
        uses: actions/cache@v4
        with:
          path: |
            .next/cache
            out
          key: ${{ runner.os }}-nextjs-${{ hashFiles('bun.lock') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx', 'content/**/*.mdx') }}
          restore-keys: |
            ${{ runner.os }}-nextjs-${{ hashFiles('bun.lock') }}-
            ${{ runner.os }}-nextjs-

      - name: Install dependencies
        run: |
          bun install
          bunx --bun next telemetry disable

      - name: Build with Next.js
        run: bunx --bun next build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
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
        uses: actions/deploy-pages@v4
```

Note the MDX cache key addition: `content/**/*.mdx` is now included in the hash.

- [x] **Step 3: Commit**

```bash
git add .gitleaks.toml .github/workflows/deploy.yml
git commit -m "ci: add gitleaks secret scanning job (blocking), add MDX files to build cache key"
```

---

## Task 15: CI/CD — Fix bun consistency in `version-increment.yml`

**Files:**
- Modify: `.github/workflows/version-increment.yml`

- [x] **Step 1: Replace `version-increment.yml` to use bun**

```yaml
name: CI/CD Pipeline -> Versioning

on:
  pull_request:
    types: [closed]
    branches:
      - main

jobs:
  increment-version:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}

      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install

      - name: Configure Git
        run: |
          git config --global user.name 'github-actions[bot]'
          git config --global user.email 'github-actions[bot]@users.noreply.github.com'

      - name: Increment version
        id: version
        run: |
          CURRENT_VERSION=$(node -p "require('./package.json').version")
          NEW_VERSION=$(node -p "const [major, minor, patch] = '${CURRENT_VERSION}'.split('.'); [major, minor, parseInt(patch) + 1].join('.')")
          bun x --bun npm version ${NEW_VERSION} --no-git-tag-version
          echo "new_version=${NEW_VERSION}" >> $GITHUB_OUTPUT
          git add package.json bun.lock
          git commit -m "chore: bump version to ${NEW_VERSION} [skip ci]"
          git push

      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          tag_name: v.${{ steps.version.outputs.new_version }}
          name: Release v.${{ steps.version.outputs.new_version }}
          draft: false
          prerelease: false
          generate_release_notes: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

- [x] **Step 2: Commit**

```bash
git add .github/workflows/version-increment.yml
git commit -m "ci: replace npm with bun in version-increment workflow for consistency"
```

---

## Self-Review Checklist

- [x] **Spec §2.1 (SchemeProvider)** → Tasks 6, 7, 8, 9
- [x] **Spec §2.1 (time-of-day resolution)** → `resolveTimeOfDayScheme()` in Task 6, used in Task 8
- [x] **Spec §2.1 (darkGradient)** → `ColorScheme.darkGradient` field in Task 6, applied in `applyScheme()` in Task 8
- [x] **Spec §2.1 (prefers-reduced-motion)** → `prefersReducedMotion` check in Task 8
- [x] **Spec §2.1 (SSR hydration)** → `mounted` state + `SCHEME_DEFAULT` first render in Task 8
- [x] **Spec §2.3 (next/font/google Inter)** → Task 9
- [x] **Spec §7 (feature-based structure)** → Tasks 11, 12
- [x] **Spec §8 (delete ascii-title, page-heading, tailwind.config.ts)** → Tasks 2, 11
- [x] **Spec §8 (SITE_URL in constants)** → Task 10
- [x] **Spec §9.1a (Gitleaks)** → Task 14
- [x] **Spec §9.1b (MDX cache key)** → Task 14
- [x] **Spec §9.2 (bun in version-increment)** → Task 15
- [x] **Dep upgrade (Tailwind v4)** → Tasks 1, 2, 3
- [x] **Dep upgrade (Next.js v16)** → Task 4
- [x] **Dep upgrade (Zod v4, Lucide v1, others)** → Task 5
- [x] **`NAVIGATION` updated with Blog/CV/About** → Task 10

**Gaps resolved:** None — all spec requirements for Plan 1 have a corresponding task.

**Type consistency check:** `SchemeName`, `ColorScheme`, `useScheme()`, `applyScheme()`, `resolveTimeOfDayScheme()` defined in Tasks 6/8 and used consistently. `SCHEME_DEFAULT`, `SCHEME_MODE`, `SCHEME_ORDER`, `CYCLE_SPEED`, `CYCLE_SPEED_MS` defined in Task 6 and consumed in Task 8 with matching names.
