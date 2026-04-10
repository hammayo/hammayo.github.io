Th# Phase 2: Nav Expansion & Pages — Design Spec

**Date:** 2026-04-10
**Branch:** `feature/phase-2-nav-expansion` (from `develop`)
**Status:** Spec approved — implementation plan pending
**Phase order:** Phase 2 of 3 — Pages & Navigation (was Plan 3 in original spec; swapped with Blog pipeline to deliver visible pages sooner)
**Depends on:** Phase 1 complete (`feature/phase-1-foundation-upgrade` merged to `develop`)

---

## 1. Goals

Deliver all navigable pages and the full navigation structure. After this phase, the site has a complete shell: every route in the nav exists and is polished. Blog content pipeline (Phase 3) fills in the remaining placeholder.

---

## 2. Phase Order Change

The original `2026-04-10-website-revamp-design.md` had:
- Plan 2 = Blog & MDX pipeline
- Plan 3 = Pages & Navigation

**This is now reversed:**
- **Phase 2 = Pages & Navigation** (this spec)
- **Phase 3 = Blog & MDX pipeline**

Rationale: pages are independently deliverable without the blog pipeline. Getting the full nav and all pages live first gives a complete, shippable site sooner.

The master spec (`docs/superpowers/specs/2026-04-10-website-revamp-design.md`) status line should be updated to reflect this.

---

## 3. Navigation

### 3.1 Nav items

| Label | Route | Type |
|---|---|---|
| About | `/about` | Internal |
| Projects | `/projects` | Internal |
| Blogs | `/blogs` | Internal |
| Contact | `/contact` | Internal |

No CV link in nav. No Uses page. CV is a standalone placeholder route only (linked from elsewhere if needed).

### 3.2 Desktop nav

Existing inline nav in `src/features/shared/header.tsx` — link order updated to: About · Projects · Blogs · Contact. No structural changes.

### 3.3 Mobile nav

Below `md` breakpoint: hamburger icon (Lucide `Menu`) replaces inline links. Opens a Radix `Sheet` (already available in `src/features/shared/ui/`) sliding from the right, containing the same 4 links.

**Accessibility requirements:**
- Hamburger `<button>` must have `aria-label="Open navigation"`
- Sheet close button must have `aria-label="Close navigation"`
- Radix `Sheet` handles focus trap and keyboard navigation automatically

No new dependencies required.

### 3.4 `/blogs` as canonical route

`/blogs` (plural) is the canonical blog entry point — consistent with `/projects` (plural). `src/app/blogs/page.tsx` is rewritten as a styled placeholder (not deleted, not a redirect). There is no `/blog` route.

---

## 4. Homepage Expansion

Sections in order — all content from data files, no hardcoded strings in the component:

1. **Hero** — exists from Phase 1 (`src/features/home/hero.tsx`)
2. **Bio** — Star Trek bio rendered by `<HomepageBio />` (client component) — see dynamic token spec below
3. **Skills strip** — `{cv.skills}` from `content/cv.ts` — accent-border tags via `useScheme()`; renders nothing if skills array is empty (no broken layout)
4. **CTA row** — "View Projects" (gradient button → `/projects`) + "Get in Touch" (ghost button → `/contact`)

### 4.1 `<HomepageBio />` — dynamic Star Trek bio

The bio contains two client-side dynamic values:

- **Stardate** — computed from `new Date()` on the client, formatted as `YYYYMM.DD` (e.g. `202602.07`). Changes each day automatically.
- **Years of experience** — `new Date().getFullYear() - about.careerStartYear`. Updates automatically on 1 Jan each year without any content edit.

`content/about.ts` stores the bio as a **template string** with named tokens:

```ts
homepageBioTemplate: "Captain's log, stardate {stardate}: For last {years} years..."
```

The `<HomepageBio />` component replaces `{stardate}` and `{years}` at render time. It is a `'use client'` component using the `mounted` guard pattern (same as `SchemeProvider`) to prevent SSR/hydration mismatches — on the server pass, tokens are rendered as empty strings or a neutral fallback; after mount, the real values hydrate in.

```tsx
// src/features/home/homepage-bio.tsx
'use client'
export function HomepageBio({ template, careerStartYear }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const stardate = mounted ? formatStardate(new Date()) : '......';
  const years    = mounted ? new Date().getFullYear() - careerStartYear : '..';

  return <p>{interpolate(template, { stardate, years })}</p>;
}
```

`formatStardate` and `interpolate` are pure functions — unit-testable, no side effects.

No blog preview section — deferred to Phase 3 when the content pipeline exists.

---

## 5. Content Data Files

All page content lives in typed TypeScript files under `content/`. Pages are pure renderers — no hardcoded strings. Author edits the data file; the page, metadata, and OG tags update everywhere.

### `content/about.ts`

```ts
export const about = {
  name: string,                    // "Hammy Babar"
  tagline: string,                 // "Senior Backend Engineer"
  careerStartYear: number,         // e.g. 2004 — years of experience auto-computed from this
  homepageBioTemplate: string,     // "Captain's log, stardate {stardate}: For last {years} years..."
                                   // {stardate} = YYYYMM.DD (client-side, updates daily)
                                   // {years}    = currentYear - careerStartYear (updates each Jan 1)
  bio: string,                     // Longer professional bio — shown on /about
  sectors: string[],               // ["Distributed Systems", "Platform Eng", "FinTech", ...]
  philosophy: string,              // Quoted philosophy line
  avatarPath: string,              // "/images/avatar.jpg" — falls back to "/_hb-logo.png"
};
```

`linkedIn` is not duplicated here — import from `content/cv.ts` wherever a LinkedIn URL is needed. Single source of truth.

**`tagline` no longer hardcodes years** — e.g. `"Senior Backend Engineer"` not `"Senior Backend Engineer · 20 years"`. The years figure is computed dynamically by `<HomepageBio />` from `careerStartYear`.

Scaffold with clearly marked `// TODO: replace` placeholders so the page renders on first deploy without exposing bare placeholder text publicly. Author replaces before merging to main.

### `content/cv.ts`

```ts
export const cv = {
  linkedIn: string,           // Full LinkedIn profile URL (used by /cv placeholder)
  placeholderText: string,    // "Full CV coming soon — view my LinkedIn in the meantime."
  skills: {
    languages: string[],
    platforms: string[],
    tools: string[],
  },
  roles: Array<{
    title: string,
    company: string,
    period: string,
    summary: string,
    tags: string[],
  }>,
  education: Array<{
    institution: string,
    qualification: string,
    year: number,
  }>,
};
```

`roles` and `education` are scaffolded with placeholder entries for Phase 2. The skills arrays are filled in — they power the homepage skills strip.

### `content/blogs.ts`

```ts
export const blogs = {
  placeholderTitle: string,    // "Blog"
  placeholderDescription: string, // "Technical writing on backend systems..."
  comingSoonMessage: string,   // "Posts coming soon — check back later."
};
```

Phase 3 extends this file with pipeline config (posts-per-page, tag list, etc.).

### `src/lib/constants.ts` — page metadata config

Per-page SEO metadata added alongside the existing `SITE_URL`:

```ts
export const PAGE_META = {
  home:     { title: '...', description: '...' },
  about:    { title: '...', description: '...' },
  blogs:    { title: '...', description: '...' },
  cv:       { title: '...', description: '...' },
  projects: { title: '...', description: '...' },
  contact:  { title: '...', description: '...' },
};
```

All `export const metadata` in page files import from `PAGE_META` — no hardcoded title strings in page components.

---

## 6. Pages

### 6.1 `/about`

**Layout:** Compact hero — avatar + name + tagline at top, sector chips below, philosophy as a quoted callout (`border-left` accent).

**Avatar:** `next/image` with the existing `imageLoader` (required for GitHub Pages static export). `src={about.avatarPath}` with `onError` fallback to `/_hb-logo.png`.

**Data:** `content/about.ts`

**Files:**
- `src/app/about/page.tsx` — thin shell, `metadata` from `PAGE_META.about`
- `src/features/about/about-content.tsx` — layout component, receives `about` as prop

### 6.2 `/blogs`

**Type:** Styled placeholder

**Content:** All text from `content/blogs.ts` — title, description, coming-soon message, back link text.

**Style:** Matches site design — gradient title, "Coming soon" badge, short description, back-to-home link.

**File:** `src/app/blogs/page.tsx` — rewritten from old redirect stub. Inline component (no feature directory needed for a placeholder).

### 6.3 `/cv`

**Type:** Styled placeholder with LinkedIn link

**Content:** All text from `content/cv.ts` — `placeholderText`, `linkedIn` URL.

**External link:** `target="_blank" rel="noopener noreferrer"` on the LinkedIn anchor (enforced as a rule for all external links site-wide).

**File:** `src/app/cv/page.tsx` — new, inline component.

### 6.4 `/projects` (redesigned)

Same GitHub API data source. `ProjectCard` updated to scheme-aware glow card (`box-shadow` from `useScheme().glow`). No data model changes.

**Files:**
- `src/features/projects/project-card.tsx` — glow card treatment
- `src/app/projects/page.tsx` — `metadata` from `PAGE_META.projects`

### 6.5 `/contact` (redesigned)

Same data. `ContactCard` updated to scheme-aware glow card. No data model changes.

**Files:**
- `src/features/contact/contact-card.tsx` — glow card treatment
- `src/app/contact/page.tsx` — `metadata` from `PAGE_META.contact`

---

## 7. SEO

### 7.1 Metadata

All pages export `metadata` sourced from `PAGE_META` in `constants.ts`. No hardcoded title strings in page files. Includes `title`, `description`, `openGraph`, and `twitter` fields. OG images point to the existing default — no per-page OG image generation in Phase 2 (Phase 3 scope for blog posts).

### 7.2 Sitemap

`src/app/sitemap.ts` updated to include `/about`, `/blogs`, `/cv`. All routes are statically exportable — no `generateStaticParams` required (no dynamic segments in Phase 2).

### 7.3 robots.txt

No changes — all new pages are public.

---

## 8. External Links

All `target="_blank"` links (LinkedIn, any external href) must include `rel="noopener noreferrer"`. This is a site-wide rule, not component-specific. Applies to: `/cv` placeholder LinkedIn link, `/about` LinkedIn link if shown, any project links in project cards.

---

## 9. File Map

| Action | File | Notes |
|---|---|---|
| Modify | `src/features/shared/header.tsx` | Mobile hamburger + Sheet nav, updated link order |
| Modify | `src/app/page.tsx` | Wire homepage sections |
| Modify | `src/features/home/hero.tsx` | Unchanged structurally — verify scheme wiring |
| Create | `src/features/home/homepage-bio.tsx` | Client component — dynamic stardate + years |
| Create | `src/features/home/skills-strip.tsx` | Reads `content/cv.ts`, scheme-aware tags |
| Create | `src/features/home/cta.tsx` | "View Projects" + "Get in Touch" |
| Create | `content/cv.ts` | Typed CV data — skills filled, roles scaffolded |
| Create | `content/about.ts` | Bio, homepageBio, sectors, philosophy, avatarPath, linkedIn |
| Create | `content/blogs.ts` | Placeholder config |
| Modify | `src/lib/constants.ts` | Add `PAGE_META` per-page metadata config |
| Create | `src/app/about/page.tsx` | Thin shell with metadata |
| Create | `src/features/about/about-content.tsx` | Compact hero layout |
| Modify | `src/app/blogs/page.tsx` | Rewrite as styled placeholder |
| Create | `src/app/cv/page.tsx` | Styled placeholder + LinkedIn link |
| Modify | `src/features/projects/project-card.tsx` | Scheme-aware glow card |
| Modify | `src/app/projects/page.tsx` | Update metadata |
| Modify | `src/features/contact/contact-card.tsx` | Scheme-aware glow card |
| Modify | `src/app/contact/page.tsx` | Update metadata |
| Modify | `src/app/sitemap.ts` | Add `/about`, `/blogs`, `/cv` |
| Modify | `docs/superpowers/specs/2026-04-10-website-revamp-design.md` | Update status + phase order |

---

## 10. Implementation Order

Tasks run sequentially within the plan:

1. **Nav** — header mobile sheet + link order (unblocks all visual QA)
2. **Homepage expansion** — skills strip + CTA (requires `content/cv.ts`)
3. **Content scaffolds** — `content/cv.ts`, `content/about.ts`, `content/blogs.ts`, `PAGE_META`
4. **`/about` page** — shell + feature component
5. **`/blogs` + `/cv` placeholders** — styled, data-driven
6. **`/projects` + `/contact` redesign** — glow card treatment
7. **SEO** — sitemap, metadata review pass
8. **Master spec update** — reflect phase reorder

---

## 11. Out of Scope

- Blog MDX pipeline, post rendering, tag filtering (Phase 3)
- Full CV timeline page (future — beyond Phase 3)
- `/uses` page (removed entirely)
- OG image generation (Phase 3)
- RSS feed, sitemap blog slug extension (Phase 3)
- New dependencies beyond Phase 1 stack
- Test infrastructure