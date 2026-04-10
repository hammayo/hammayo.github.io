# Phase 2: Nav Expansion & Pages — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver all navigable pages and full navigation structure — mobile nav, homepage expansion, /about, /blogs placeholder, /cv placeholder, /projects and /contact redesign, dynamic footer year.

**Architecture:** Sequential tasks; earlier tasks unblock later ones. Content data files created before any UI that reads them. All new components use `useScheme()` + CSS vars (`--scheme-from/via/to`, `--scheme-glow`, `--scheme-accent`). `gradientText`, `glowCard`, `accentTag` CVA variants from `src/design/variants.ts` used throughout — no ad-hoc colour classes. Every new page shell wraps content in `PageTransitionWrapper` with `flex-1 flex flex-col` — never `min-h-screen` or custom overflow. Header is already `'use client'` with `usePathname` — update directly.

**Tech Stack:** Next.js 16, Tailwind v4, Framer Motion, Radix Sheet (already in `src/features/shared/ui/sheet.tsx`), `class-variance-authority`, `next/image` with `imageLoader`

---

## Codebase Facts (read before starting)

- CSS scheme vars: `--scheme-from`, `--scheme-via`, `--scheme-to`, `--scheme-glow`, `--scheme-accent`, `--scheme-border`
- `gradient-text` utility: sets background gradient from the three scheme vars, clips to text
- `gradient-bg` utility: same gradient as background fill
- `scheme-glow` utility: `box-shadow: 0 0 20px var(--scheme-glow)`
- `scheme-border` utility: `border-color: var(--scheme-border)`
- `animate-gradient` class: `background-size: 300%; animation: animatedgradient 6s ease infinite alternate`
- `useScheme()` from `@/providers/scheme-provider` returns `{ schemeName, scheme }` where `scheme` has `.from`, `.via`, `.to`, `.glow`, `.accent`, `.border`
- `CardEffects` from `@/features/shared/ui/card-effects` — existing glow card wrapper with Framer Motion
- `accentTag`, `glowCard`, `gradientText` CVA already in `src/design/variants.ts`
- `SOCIAL.linkedin` = `'https://linkedin.com/in/hammayo'` in `src/lib/constants.ts`
- `basePath` from `@/lib/env` — prepend to image paths (e.g. `${basePath}/images/avatar.jpg`)
- `imageLoader` from `@/lib/imageLoader` — required for `next/image` on GitHub Pages static export
- Root layout: `h-dvh flex flex-col overflow-hidden` > `main` with `flex-1 flex flex-col overflow-y-auto pt-16 pb-4 relative z-[1]`
- Footer: `relative z-[1]` — do not change this

---

## Task 1: Foundation — constants, variants, delete tailwind shim

**Files:**
- Modify: `src/lib/constants.ts`
- Modify: `src/design/variants.ts`
- Delete: `tailwind.config.ts`

- [ ] **Step 1: Add `SITE_LAUNCH_YEAR` and `PAGE_META` to constants.ts**

Replace the end of `src/lib/constants.ts` (after the existing `API` export) with:

```ts
// Site launch year — used by footer copyright range
export const SITE_LAUNCH_YEAR = 2024;

// Per-page SEO metadata — all page metadata exports import from here
export const PAGE_META = {
  home: {
    title: "Hammayo's | Backend Software Engineer",
    description: 'Portfolio site showcasing 20+ years of backend engineering across finance, justice, and public service.',
  },
  about: {
    title: "About | Hammayo's Portfolio",
    description: 'Senior backend engineer with 20+ years building distributed systems across finance, justice, and public service.',
  },
  blogs: {
    title: "Blogs | Hammayo's Portfolio",
    description: 'Technical writing on backend systems, architecture, and engineering craft.',
  },
  cv: {
    title: "CV | Hammayo's Portfolio",
    description: "Hammy Babar's professional CV and experience.",
  },
  projects: {
    title: "Projects | Hammayo's Portfolio",
    description: 'Explore my latest projects and open source contributions on GitHub.',
  },
  contact: {
    title: "Contact | Hammayo's Portfolio",
    description: 'Get in touch via GitHub, LinkedIn, or email.',
  },
};
```

- [ ] **Step 2: Add `ctaButton` CVA variant to `src/design/variants.ts`**

Append to the end of `src/design/variants.ts`:

```ts
/**
 * CTA button variant.
 * Primary uses the scheme gradient background.
 * Ghost uses a transparent background with border.
 */
export const ctaButton = cva(
  'inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        gradient: 'gradient-bg text-white shadow-sm hover:opacity-90 focus-visible:ring-[var(--scheme-from)]',
        ghost:    'border border-border text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-border',
      },
    },
    defaultVariants: {
      variant: 'gradient',
    },
  }
);
```

- [ ] **Step 3: Delete the tailwind.config.ts shim**

```bash
rm tailwind.config.ts
```

Run `bun run build` to confirm the build still passes without the shim.

Expected: Build succeeds. If it fails with a Tailwind config resolution error, check `postcss.config.mjs` — it should only reference `@tailwindcss/postcss`.

- [ ] **Step 4: Commit**

```bash
git add src/lib/constants.ts src/design/variants.ts
git rm tailwind.config.ts
git commit -m "feat: add PAGE_META + SITE_LAUNCH_YEAR to constants, add ctaButton CVA variant, delete tailwind shim"
```

---

## Task 2: Content data files

**Files:**
- Create: `content/cv.ts`
- Create: `content/about.ts`
- Create: `content/blogs.ts`

- [ ] **Step 1: Create `content/cv.ts`**

```ts
// content/cv.ts
// Single source of truth for CV data.
// Phase 2: skills filled in, roles/education scaffolded with placeholders.
// Phase 3+: expand roles and education with real entries.
import { SOCIAL } from '@/lib/constants';

export const cv = {
  linkedIn: SOCIAL.linkedin,
  placeholderText: 'Full CV coming soon — view my LinkedIn profile in the meantime.',

  skills: {
    languages: ['Go', 'C#', '.NET', 'TypeScript', 'SQL', 'Python'],
    platforms: ['Azure', 'Kubernetes', 'Docker', 'GitHub Actions', 'AWS'],
    tools:     ['Kafka', 'Redis', 'PostgreSQL', 'Terraform', 'Grafana'],
  },

  roles: [
    {
      title:   'Senior Backend Engineer', // TODO: replace with real role
      company: 'HMPPS / MoJ',            // TODO: replace with real company
      period:  '2020 – present',          // TODO: replace with real period
      summary: 'Platform infrastructure and microservices.',
      tags:    ['Go', 'Kubernetes', 'Azure'],
    },
  ],

  education: [
    {
      institution:   'TODO: University name',  // TODO: replace
      qualification: 'TODO: Degree',           // TODO: replace
      year:          2004,                     // TODO: replace
    },
  ],
};
```

- [ ] **Step 2: Create `content/about.ts`**

```ts
// content/about.ts
// All about-page and homepage bio content.
// Replace every TODO comment before merging to main.

export const about = {
  name:            'Hammayo Babar',     // Full name — desktop
  shortName:       'Hammy Babar',       // Short name — mobile (below md breakpoint)
  tagline:         'Senior Backend Engineer',
  careerStartYear: 2004,                // Years of experience = currentYear - careerStartYear

  // Homepage bio — first paragraph uses {stardate} and {years} tokens.
  // {stardate} = YYYYMM.DD computed client-side daily.
  // {years}    = currentYear - careerStartYear, updates each Jan 1.
  homepageBioTemplate: "Captain's log, stardate {stardate}: For last {years} years, I've boldly navigated the digital frontier, charting solutions across uncharted sectors—finance's nebulae, justice's asteroid belts, and the bureaucratic wormholes of public service.",

  // Additional static paragraphs shown below the template paragraph on the homepage.
  homepageBioExtra: [
    "Armed with a tricorder of Microsoft tech and a starship engineered from micro-services and Docker containers at warp speed, I've allied with Starfleet's HMPPS to dismantle legacy system Borgs and assimilate innovation. My crew? A cross-functional away team, trained in the Vulcan discipline of clean code and the Klingon art of relentless problem-solving.",
    'Mission priority: To seek out new patterns, elevate civilizations with scalable tech, and ensure no enterprise is left stranded in the alpha quadrant of obsolescence. Engage at will — let\'s pioneer the final frontier of software, where no challenge has gone before. 🖖',
  ],

  // /about page — longer professional bio. Replace TODO before merging.
  bio: 'TODO: Replace with your professional bio. A few sentences about your background, the domains you have worked in, and what drives you.',

  sectors:   ['Distributed Systems', 'Platform Engineering', 'FinTech', 'Justice & Public Service', 'Microservices'],
  philosophy: 'Build for the next engineer, not just the next deadline.',

  // next/image src — prepend basePath in the component.
  // Falls back to /_hb-logo.png if avatar.jpg is absent.
  avatarPath: '/images/avatar.jpg',
};
```

- [ ] **Step 3: Create `content/blogs.ts`**

```ts
// content/blogs.ts
// Phase 2: placeholder config only.
// Phase 3 adds posts-per-page, tag config, and the MDX pipeline.

export const blogs = {
  placeholderTitle:       'Blogs',
  placeholderDescription: 'Technical writing on backend systems, architecture, and engineering craft.',
  comingSoonMessage:      'Posts coming soon — check back later.',
  backLinkText:           '← Back to home',
};
```

- [ ] **Step 4: Commit**

```bash
git add content/cv.ts content/about.ts content/blogs.ts
git commit -m "feat: scaffold content/cv.ts, content/about.ts, content/blogs.ts"
```

---

## Task 3: Navigation + footer

**Files:**
- Modify: `src/features/shared/header.tsx`
- Create: `src/features/shared/copyright-year.tsx`
- Modify: `src/features/shared/footer.tsx`

- [ ] **Step 1: Update `src/features/shared/header.tsx`**

Replace the entire file. Key changes: add About + Blogs links (order: About · Projects · Blogs · Contact), add mobile hamburger + Sheet nav, preserve logo responsive text and gradient.

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Container } from "./container";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "@/lib/utils";
import { basePath } from "@/lib/env";

const NAV_LINKS = [
  { href: "/about",    label: "About"    },
  { href: "/projects", label: "Projects" },
  { href: "/blogs",    label: "Blogs"    },
  { href: "/contact",  label: "Contact"  },
] as const;

const gradientClasses =
  "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 font-medium";
const inactiveClasses =
  "dark:text-zinc-400 text-zinc-600 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-500 hover:via-cyan-500 hover:to-green-500";

function NavLink({ href, label, pathname, onClick }: {
  href: string;
  label: string;
  pathname: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      prefetch
      onClick={onClick}
      className={cn(
        "duration-300 transition-all tracking-tight",
        pathname === href ? gradientClasses : inactiveClasses
      )}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const pathname  = usePathname();
  const logoPath  = `${basePath}/images/_hb-logo.png`;
  const [open, setOpen] = useState(false);

  return (
    <header
      role="banner"
      className="fixed top-0 left-0 right-0 z-50 dark:bg-zinc-950/80 bg-white/80 backdrop-blur-xl border-b dark:border-zinc-800/50 border-zinc-200/50"
    >
      <Container>
        <nav role="navigation" aria-label="Main navigation">
          <div className="flex items-center justify-between py-2">
            {/* Logo */}
            <Link
              href="/"
              prefetch
              className="text-base font-semibold tracking-tighter flex items-center gap-2 transition-transform"
            >
              <Image
                src={logoPath}
                alt="HB"
                width={28}
                height={28}
                priority
                unoptimized
                className="animate-float"
              />
              <span
                className="md:inline hidden animate-gradient text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(to right, #a855f7, #818cf8, #38bdf8, #34d399, #f472b6, #a855f7)', backgroundSize: '400%' }}
              >Hammayo</span>
              <span
                className="md:hidden animate-gradient text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(to right, #a855f7, #818cf8, #38bdf8, #34d399, #f472b6, #a855f7)', backgroundSize: '400%' }}
              >Hammy</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ href, label }) => (
                <NavLink key={href} href={href} label={label} pathname={pathname} />
              ))}
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <button
                    aria-label="Open navigation"
                    className="p-2 rounded-md dark:text-zinc-400 text-zinc-600 hover:text-foreground transition-colors"
                  >
                    <Menu className="h-5 w-5" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64 pt-12">
                  <nav aria-label="Mobile navigation" className="flex flex-col gap-6 mt-4">
                    {NAV_LINKS.map(({ href, label }) => (
                      <NavLink
                        key={href}
                        href={href}
                        label={label}
                        pathname={pathname}
                        onClick={() => setOpen(false)}
                      />
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
}
```

- [ ] **Step 2: Verify Sheet import path**

Check `src/features/shared/ui/sheet.tsx` exists and exports `Sheet`, `SheetContent`, `SheetTrigger`. If the import path differs, adjust the import in the header.

```bash
grep -n "export" src/features/shared/ui/sheet.tsx | head -10
```

Expected: Lines containing `export { Sheet`, `SheetContent`, `SheetTrigger`.

- [ ] **Step 3: Create `src/features/shared/copyright-year.tsx`**

```tsx
'use client';

import { useState, useEffect } from 'react';

interface CopyrightYearProps {
  launchYear: number;
}

export function CopyrightYear({ launchYear }: CopyrightYearProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = new Date().getFullYear();

  if (!mounted) {
    return <span>{launchYear}</span>;
  }

  return (
    <span>{launchYear === current ? current : `${launchYear}–${current}`}</span>
  );
}
```

- [ ] **Step 4: Update `src/features/shared/footer.tsx`**

Replace the copyright line only — swap `{new Date().getUTCFullYear()}` for `<CopyrightYear />`:

```tsx
import { SITE, SOCIAL, SITE_LAUNCH_YEAR } from "@/lib/constants";
import { Button } from "@/features/shared/ui/button";
import { Mail } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { CopyrightYear } from "./copyright-year";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={`w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60${className ? ` ${className}` : ''}`}>
      <div className="container flex items-center justify-between gap-4 py-2">
        <div className="flex items-center">
          <p className="text-xs text-muted-foreground">
            Built by{' '}
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              {SITE.author}
            </a>
            {' '}&copy; <CopyrightYear launchYear={SITE_LAUNCH_YEAR} />
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedinIcon className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={`mailto:${SOCIAL.email}`}>
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </a>
          </Button>
          <div className="ml-2 border-l border-border/40 pl-4">
            <ThemeToggle aria-label="Toggle color theme" />
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Start dev server and verify nav**

```bash
bun run dev
```

Open http://localhost:3000. Check:
- Desktop: About · Projects · Blogs · Contact links visible; active link shows gradient text
- Mobile (<768px): only hamburger visible; clicking opens Sheet with all 4 links
- Logo: "Hammayo" on desktop, "Hammy" on mobile
- Footer: copyright year renders (e.g. `© 2024–2026` or `© 2026` if launch year = current year)

- [ ] **Step 6: Commit**

```bash
git add src/features/shared/header.tsx src/features/shared/copyright-year.tsx src/features/shared/footer.tsx
git commit -m "feat: add mobile sheet nav, About/Blogs links, active link gradient, dynamic copyright year"
```

---

## Task 4: Homepage expansion

**Files:**
- Create: `src/features/home/homepage-bio.tsx`
- Create: `src/features/home/skills-strip.tsx`
- Create: `src/features/home/cta.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/features/home/homepage-bio.tsx`**

```tsx
'use client';

import { useState, useEffect } from 'react';

interface HomepageBioProps {
  template:        string;
  extra:           string[];
  careerStartYear: number;
}

function formatStardate(d: Date): string {
  const year  = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day   = String(d.getDate()).padStart(2, '0');
  return `${year}${month}.${day}`;
}

function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    key in values ? String(values[key]) : `{${key}}`
  );
}

export function HomepageBio({ template, extra, careerStartYear }: HomepageBioProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stardate = mounted ? formatStardate(new Date()) : '......';
  const years    = mounted ? new Date().getFullYear() - careerStartYear : '..';

  const firstPara = interpolate(template, { stardate, years });

  return (
    <div className="text-sm md:text-base text-muted-foreground leading-relaxed tracking-tight space-y-3">
      <p>{firstPara}</p>
      {extra.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/features/home/skills-strip.tsx`**

```tsx
import { accentTag } from '@/design/variants';

interface SkillsStripProps {
  skills: {
    languages: string[];
    platforms: string[];
    tools:     string[];
  };
}

export function SkillsStrip({ skills }: SkillsStripProps) {
  const all = [...skills.languages, ...skills.platforms, ...skills.tools];

  if (all.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {all.map((skill) => (
        <span key={skill} className={accentTag()}>
          {skill}
        </span>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/features/home/cta.tsx`**

```tsx
import Link from 'next/link';
import { ctaButton } from '@/design/variants';

export function CTARow() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Link href="/projects" className={ctaButton({ variant: 'gradient' })}>
        View Projects
      </Link>
      <Link href="/contact" className={ctaButton({ variant: 'ghost' })}>
        Get in Touch
      </Link>
    </div>
  );
}
```

- [ ] **Step 4: Update `src/app/page.tsx`**

Replace the entire file. Removes the old `generateStardate` server function and hardcoded bio string. All content from data files.

```tsx
import { Container } from "@/features/shared/container";
import { Hero } from "@/features/home/hero";
import { HomepageBio } from "@/features/home/homepage-bio";
import { SkillsStrip } from "@/features/home/skills-strip";
import { CTARow } from "@/features/home/cta";
import { PageTransitionWrapper } from "@/features/shared/page-transition-wrapper";
import { PageViewEvent } from "@/features/shared/analytics-event";
import { about } from "../../content/about";
import { cv } from "../../content/cv";

export default function HomePage() {
  return (
    <PageTransitionWrapper>
      <PageViewEvent page="home" />
      <div className="flex-1 flex flex-col items-center justify-center">
        <Container className="text-center space-y-8">
          <div className="opacity-0 animate-fade-in animate-delay-500">
            <Hero />
          </div>
          <div className="opacity-0 animate-fade-in animate-delay-200">
            <HomepageBio
              template={about.homepageBioTemplate}
              extra={about.homepageBioExtra}
              careerStartYear={about.careerStartYear}
            />
          </div>
          <div className="opacity-0 animate-fade-in animate-delay-300">
            <SkillsStrip skills={cv.skills} />
          </div>
          <div className="opacity-0 animate-fade-in animate-delay-400">
            <CTARow />
          </div>
        </Container>
      </div>
    </PageTransitionWrapper>
  );
}
```

- [ ] **Step 5: Verify homepage in dev**

Open http://localhost:3000. Check:
- Bio shows the Star Trek text with live stardate (today's date in YYYYMM.DD format) and computed years
- Skills tags render with accent-border style
- "View Projects" and "Get in Touch" CTA buttons present and link correctly
- No layout overflow or scrollbar appears

- [ ] **Step 6: Commit**

```bash
git add src/features/home/homepage-bio.tsx src/features/home/skills-strip.tsx src/features/home/cta.tsx src/app/page.tsx
git commit -m "feat: homepage expansion — dynamic bio, skills strip, CTA row"
```

---

## Task 5: /about page

**Files:**
- Create: `src/features/about/about-content.tsx`
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Create `src/features/about/about-content.tsx`**

```tsx
import Image from 'next/image';
import { gradientText, accentTag } from '@/design/variants';
import { basePath } from '@/lib/env';
import imageLoader from '@/lib/imageLoader';
import type { about as AboutType } from '../../../content/about';

interface AboutContentProps {
  about: typeof AboutType;
}

export function AboutContent({ about }: AboutContentProps) {
  const avatarSrc = `${basePath}${about.avatarPath}`;
  const fallbackSrc = `${basePath}/_hb-logo.png`;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Hero row: avatar + name + tagline */}
      <div className="flex items-start gap-5">
        <div className="relative flex-shrink-0">
          <Image
            loader={imageLoader}
            src={avatarSrc}
            alt={about.name}
            width={80}
            height={80}
            className="rounded-full ring-2 ring-[var(--scheme-border)] scheme-glow"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = fallbackSrc;
            }}
            unoptimized
          />
        </div>
        <div>
          <h1 className={gradientText({ size: 'heading' })}>
            <span className="hidden md:inline animate-gradient"
              style={{ backgroundImage: 'linear-gradient(to right, #a855f7, #818cf8, #38bdf8, #34d399, #f472b6, #a855f7)', backgroundSize: '400%' }}
            >{about.name}</span>
            <span className="md:hidden animate-gradient"
              style={{ backgroundImage: 'linear-gradient(to right, #a855f7, #818cf8, #38bdf8, #34d399, #f472b6, #a855f7)', backgroundSize: '400%' }}
            >{about.shortName}</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{about.tagline}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{about.bio}</p>

      {/* Sectors */}
      <div className="space-y-2">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground">Sectors & Domains</h2>
        <div className="flex flex-wrap gap-2">
          {about.sectors.map((sector) => (
            <span key={sector} className={accentTag()}>
              {sector}
            </span>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div className="border-l-2 border-[var(--scheme-border)] pl-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Philosophy</p>
        <p className="text-sm md:text-base italic text-foreground/80">&ldquo;{about.philosophy}&rdquo;</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/app/about/page.tsx`**

```tsx
import { Container } from "@/features/shared/container";
import { PageTransitionWrapper } from "@/features/shared/page-transition-wrapper";
import { AboutContent } from "@/features/about/about-content";
import { PageViewEvent } from "@/features/shared/analytics-event";
import { PAGE_META, SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";
import { about } from "../../../content/about";

export const metadata: Metadata = {
  title: PAGE_META.about.title,
  description: PAGE_META.about.description,
  openGraph: {
    title: PAGE_META.about.title,
    description: PAGE_META.about.description,
    url: `${SITE_URL}/about`,
  },
  twitter: {
    title: PAGE_META.about.title,
    description: PAGE_META.about.description,
  },
};

export default function AboutPage() {
  return (
    <PageTransitionWrapper>
      <PageViewEvent page="about" />
      <Container>
        <AboutContent about={about} />
      </Container>
    </PageTransitionWrapper>
  );
}
```

- [ ] **Step 3: Verify /about in dev**

Open http://localhost:3000/about. Check:
- Name shows "Hammayo Babar" on desktop, "Hammy Babar" on mobile
- Avatar renders (shows logo fallback if `public/images/avatar.jpg` absent — that is expected)
- Sectors chips show accent border style
- Philosophy quote renders with left border accent
- No layout overflow

- [ ] **Step 4: Commit**

```bash
git add src/features/about/about-content.tsx src/app/about/page.tsx
git commit -m "feat: /about page — compact hero layout, sectors, philosophy, responsive name"
```

---

## Task 6: /blogs placeholder

**Files:**
- Modify: `src/app/blogs/page.tsx`

- [ ] **Step 1: Rewrite `src/app/blogs/page.tsx`**

Replace the entire file:

```tsx
import { Container } from "@/features/shared/container";
import { PageTransitionWrapper } from "@/features/shared/page-transition-wrapper";
import { PageViewEvent } from "@/features/shared/analytics-event";
import { PAGE_META, SITE_URL } from "@/lib/constants";
import { gradientText } from "@/design/variants";
import Link from "next/link";
import type { Metadata } from "next";
import { blogs } from "../../../content/blogs";

export const metadata: Metadata = {
  title: PAGE_META.blogs.title,
  description: PAGE_META.blogs.description,
  openGraph: {
    title: PAGE_META.blogs.title,
    description: PAGE_META.blogs.description,
    url: `${SITE_URL}/blogs`,
  },
  twitter: {
    title: PAGE_META.blogs.title,
    description: PAGE_META.blogs.description,
  },
};

export default function BlogsPage() {
  return (
    <PageTransitionWrapper>
      <PageViewEvent page="blogs" />
      <Container>
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-16">
          <div className="flex items-center gap-3">
            <h1 className={gradientText({ size: 'heading' })}>{blogs.placeholderTitle}</h1>
            <span className="text-xs px-3 py-1 rounded-full border border-[var(--scheme-border)] text-[var(--scheme-accent)]">
              Coming soon
            </span>
          </div>
          <p className="text-muted-foreground max-w-md">{blogs.placeholderDescription}</p>
          <p className="text-sm text-muted-foreground">{blogs.comingSoonMessage}</p>
          <Link href="/" className="text-sm text-[var(--scheme-accent)] hover:underline">
            {blogs.backLinkText}
          </Link>
        </div>
      </Container>
    </PageTransitionWrapper>
  );
}
```

- [ ] **Step 2: Verify /blogs in dev**

Open http://localhost:3000/blogs. Check:
- "Blogs" heading renders in gradient text
- "Coming soon" badge visible
- Description and back link present
- No WIP text from old file remains

- [ ] **Step 3: Commit**

```bash
git add src/app/blogs/page.tsx
git commit -m "feat: /blogs styled placeholder — data-driven from content/blogs.ts"
```

---

## Task 7: /cv placeholder

**Files:**
- Create: `src/app/cv/page.tsx`

- [ ] **Step 1: Create `src/app/cv/page.tsx`**

```tsx
import { Container } from "@/features/shared/container";
import { PageTransitionWrapper } from "@/features/shared/page-transition-wrapper";
import { PageViewEvent } from "@/features/shared/analytics-event";
import { PAGE_META, SITE_URL } from "@/lib/constants";
import { gradientText } from "@/design/variants";
import type { Metadata } from "next";
import { cv } from "../../../content/cv";

export const metadata: Metadata = {
  title: PAGE_META.cv.title,
  description: PAGE_META.cv.description,
  openGraph: {
    title: PAGE_META.cv.title,
    description: PAGE_META.cv.description,
    url: `${SITE_URL}/cv`,
  },
  twitter: {
    title: PAGE_META.cv.title,
    description: PAGE_META.cv.description,
  },
};

export default function CVPage() {
  return (
    <PageTransitionWrapper>
      <PageViewEvent page="cv" />
      <Container>
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-16">
          <div className="flex items-center gap-3">
            <h1 className={gradientText({ size: 'heading' })}>CV</h1>
            <span className="text-xs px-3 py-1 rounded-full border border-[var(--scheme-border)] text-[var(--scheme-accent)]">
              Coming soon
            </span>
          </div>
          <p className="text-muted-foreground max-w-md">{cv.placeholderText}</p>
          <a
            href={cv.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--scheme-accent)] hover:underline"
          >
            View LinkedIn Profile →
          </a>
        </div>
      </Container>
    </PageTransitionWrapper>
  );
}
```

- [ ] **Step 2: Verify /cv in dev**

Open http://localhost:3000/cv. Check:
- "CV" heading in gradient text with "Coming soon" badge
- Placeholder text from `content/cv.ts`
- LinkedIn link opens in new tab with `noopener noreferrer`

- [ ] **Step 3: Commit**

```bash
git add src/app/cv/page.tsx
git commit -m "feat: /cv styled placeholder — LinkedIn link, data-driven from content/cv.ts"
```

---

## Task 8: /projects redesign

**Files:**
- Modify: `src/features/projects/project-card.tsx`
- Modify: `src/app/projects/page.tsx`

- [ ] **Step 1: Update `src/features/projects/project-card.tsx`**

Replace topic tag `className` (line 65–71) to use `accentTag` CVA variant. Add `rel="noopener noreferrer"` to external links. No other structural changes.

```tsx
"use client";

import { CardContent } from "@/features/shared/ui/card";
import type { GitHubRepository } from "@/lib/github";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { CardEffects, cardBaseClasses } from "@/features/shared/ui/card-effects";
import { Button } from "@/features/shared/ui/button";
import { accentTag } from "@/design/variants";
import { format } from "date-fns";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

interface ProjectCardProps {
  repo: GitHubRepository;
  index: number;
  featured?: boolean;
}

export function ProjectCard({ repo, index, featured = false }: ProjectCardProps) {
  return (
    <CardEffects
      variant={featured ? "featured" : "default"}
      className={`animate-in fade-in-50 duration-500 delay-${index * 100}`}
    >
      <CardContent className={`${cardBaseClasses.contentWrapper} ${
        featured ? 'min-h-[18rem]' : 'min-h-[16rem]'
      } flex flex-col`}>
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              {featured && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-600/70 dark:text-amber-400/60" fill="currentColor" />
                  <span className="text-xs font-medium text-amber-700/70 dark:text-amber-400/60">Featured</span>
                </div>
              )}
              <h3 className="text-lg font-semibold">{repo.name}</h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                {repo.forks_count}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4">{repo.description}</p>

          {/* Topics — scheme-aware accent tags */}
          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {repo.topics.map((topic) => (
                <span key={topic} className={accentTag()}>
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              {repo.language && (
                <span className="text-sm text-muted-foreground">{repo.language}</span>
              )}
              <span className="text-sm text-muted-foreground">
                Updated {format(new Date(repo.updated_at), 'MMM d, yyyy')}
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="w-4 h-4 mr-1" />
                  Code
                </a>
              </Button>
              {repo.homepage && (
                <Button variant="ghost" size="sm" asChild>
                  <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </CardEffects>
  );
}
```

- [ ] **Step 2: Update `src/app/projects/page.tsx` — metadata + gradient heading**

Change the `metadata` export and `h1` heading:

```tsx
// Replace the existing metadata export:
export const metadata: Metadata = {
  title: PAGE_META.projects.title,
  description: PAGE_META.projects.description,
  openGraph: {
    title: PAGE_META.projects.title,
    description: PAGE_META.projects.description,
    url: `${SITE_URL}/projects`,
  },
  twitter: {
    title: PAGE_META.projects.title,
    description: PAGE_META.projects.description,
  },
};
```

Add imports at the top:
```tsx
import { PAGE_META, SITE_URL } from "@/lib/constants";
import { gradientText } from "@/design/variants";
```

Replace the heading block:
```tsx
<div className="mb-6">
  <h1 className={gradientText({ size: 'heading' })}>Projects</h1>
  <p className="text-muted-foreground mt-2">Explore my most recent projects and open source contributions.</p>
</div>
```

- [ ] **Step 3: Verify /projects in dev**

Open http://localhost:3000/projects. Check:
- "Projects" heading in gradient text
- Project topic tags use scheme accent colour (purple/cyan depending on time of day)
- Cards retain glow effect on hover
- External links open in new tab

- [ ] **Step 4: Commit**

```bash
git add src/features/projects/project-card.tsx src/app/projects/page.tsx
git commit -m "feat: /projects — scheme-aware topic tags, gradient heading, updated metadata"
```

---

## Task 9: /contact redesign

**Files:**
- Modify: `src/features/contact/contact-card.tsx`
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 1: Update `src/features/contact/contact-card.tsx`**

Replace hardcoded per-variant colour maps with scheme-aware CSS vars. The title gradient and button gradient now use `gradient-text` and `gradient-bg` utilities.

```tsx
"use client";

import { type ReactNode } from "react";
import { CardEffects, cardBaseClasses } from "@/features/shared/ui/card-effects";

interface ContactCardProps {
  icon:     ReactNode;
  title:    string;
  subtitle: string;
  link:     string;
  linkText: string;
}

export function ContactCard({ icon, title, subtitle, link, linkText }: ContactCardProps) {
  const isExternal = !link.startsWith("mailto:");

  return (
    <CardEffects>
      <div className="flex flex-col items-center gap-4 p-8">
        <div className="w-16 h-16 flex items-center justify-center border rounded-full dark:bg-black/30 bg-white/30 backdrop-blur-md transition-all duration-300 scheme-border group-hover:scheme-glow">
          {icon}
        </div>
        <div className="flex flex-col items-center mt-2">
          <h3 className="gradient-text text-xl font-medium tracking-tight transition-all duration-300 opacity-80 group-hover:opacity-100">
            {title}
          </h3>
          <span className={`mt-4 text-sm text-center ${cardBaseClasses.description}`}>
            {subtitle}
          </span>
        </div>
        <a
          href={link}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={`${cardBaseClasses.button} gradient-bg mt-6 text-white`}
        >
          {linkText}
        </a>
      </div>
    </CardEffects>
  );
}
```

- [ ] **Step 2: Update `src/app/contact/page.tsx`** — remove `variant` prop, update metadata, gradient heading

Update the imports:
```tsx
import { PAGE_META, SITE_URL } from "@/lib/constants";
import { gradientText } from "@/design/variants";
```

Replace the `metadata` export:
```tsx
export const metadata: Metadata = {
  title: PAGE_META.contact.title,
  description: PAGE_META.contact.description,
  openGraph: {
    title: PAGE_META.contact.title,
    description: PAGE_META.contact.description,
    url: `${SITE_URL}/contact`,
  },
  twitter: {
    title: PAGE_META.contact.title,
    description: PAGE_META.contact.description,
  },
};
```

Replace heading and remove `variant` prop from all three `<ContactCard>` calls:
```tsx
<div className="mb-6">
  <h1 className={gradientText({ size: 'heading' })}>Contact</h1>
  <p className="text-muted-foreground mt-2">Feel free to reach out through any of these platforms.</p>
</div>
```

```tsx
// GitHub card — remove variant="github"
<ContactCard
  icon={/* existing SVG */}
  title="hammayo"
  subtitle="GitHub"
  link={SOCIAL.github}
  linkText="View Profile"
/>

// LinkedIn card — remove variant="linkedin"
<ContactCard
  icon={/* existing SVG */}
  title="hammayo"
  subtitle="LinkedIn"
  link={SOCIAL.linkedin}
  linkText="View Profile"
/>

// Email card — remove variant="email"
<ContactCard
  icon={/* existing SVG */}
  title={SOCIAL.email}
  subtitle="Email"
  link={`mailto:${SOCIAL.email}`}
  linkText="Send Email"
/>
```

- [ ] **Step 3: Verify /contact in dev**

Open http://localhost:3000/contact. Check:
- "Contact" heading in gradient text
- All three cards use scheme gradient (not hardcoded purple/blue/cyan)
- Card icon border uses scheme border on hover
- Buttons use gradient background
- LinkedIn and GitHub links open in new tab with correct rel attributes

- [ ] **Step 4: Commit**

```bash
git add src/features/contact/contact-card.tsx src/app/contact/page.tsx
git commit -m "feat: /contact — scheme-aware ContactCard, gradient heading, updated metadata"
```

---

## Task 10: SEO, sitemap, final checks

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `docs/superpowers/specs/2026-04-10-website-revamp-design.md`

- [ ] **Step 1: Update `src/app/sitemap.ts`**

Replace the entire file — use `SITE_URL` from constants and add `/about`, `/blogs`, `/cv`:

```ts
import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/cv`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
```

- [ ] **Step 2: Run full build to confirm static export passes**

```bash
bun run build
```

Expected: Build succeeds with no errors. All routes appear in the build output: `/`, `/about`, `/blogs`, `/cv`, `/projects`, `/contact`.

If `tailwind.config.ts` deletion (Task 1) caused issues, check `postcss.config.mjs` still reads:
```js
export default { plugins: { '@tailwindcss/postcss': {} } };
```

- [ ] **Step 3: Run lint**

```bash
bun run lint
```

Expected: No errors. Fix any TypeScript or ESLint issues before committing.

- [ ] **Step 4: Update master spec status line**

In `docs/superpowers/specs/2026-04-10-website-revamp-design.md`, update the status line:

```
**Status:** Phase 1 complete (merged to `develop`) — Phase 2 complete (`feature/phase-2-nav-expansion`) — Phase 3 pending
```

- [ ] **Step 5: Commit**

```bash
git add src/app/sitemap.ts docs/superpowers/specs/2026-04-10-website-revamp-design.md
git commit -m "feat: update sitemap with all Phase 2 routes using SITE_URL; mark Phase 2 complete in master spec"
```

- [ ] **Step 6: Start dev server for final preview**

```bash
bun run dev
```

Walk through each route:
- `/` — hero, bio with live stardate, skills strip, CTA buttons
- `/about` — avatar (or logo fallback), responsive name, sectors, philosophy
- `/blogs` — styled placeholder, coming soon badge
- `/cv` — styled placeholder, LinkedIn link
- `/projects` — scheme-aware topic tags, gradient heading
- `/contact` — scheme-aware cards

Verify in both **light** and **dark** mode. Verify at mobile width (< 768px) — hamburger nav, Hammy/HAMMY text.
