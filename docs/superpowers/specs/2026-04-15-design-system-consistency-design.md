# Design System Consistency Refactor

**Date:** 2026-04-15
**Branch:** feature/phase-3-add-blogs
**Scope:** Scheme-awareness, border/hover consistency, light mode correctness, search palette cleanup

---

## Problem Statement

The site has a well-structured scheme system (time-of-day colour switching via CSS custom properties) but several components ignore it — using hardcoded purple/violet values that never shift with the active scheme. Additionally, some components have broken light mode styles and inconsistent border syntax.

### Key Issues Found

| Issue | Location | Impact |
|---|---|---|
| Hardcoded `rgba(124,58,237)` glow | `card-effects.tsx` | Never shifts with scheme |
| Hardcoded `violet-600/purple-600/indigo-600` | `ctaButton` CVA variant | Button always violet regardless of scheme |
| Hardcoded `border-purple-300/50` hover border | `card-effects.tsx` | Border ignores scheme |
| Hardcoded `from-violet-500 via-cyan-400 to-green-400` | `scroll-progress.tsx` | Progress bar ignores scheme |
| Hardcoded `group-hover:text-purple-900/90` | `contact-card.tsx` | Hover ignores scheme |
| `border-[var(--scheme-border)]` vs `scheme-border` | Multiple files | Inconsistent syntax, same output |
| `bg-white/5`, `border-white/[0.06]`, `text-white/60` | `mdx-components.tsx` | Invisible/broken in light mode |
| Inline hardcoded RGB values | `search-palette.tsx` | Bypasses design token system |

---

## Approach

**Extend the scheme system with button gradient vars**, then fix all hardcoded values to use scheme-aware CSS custom properties. No new abstraction layers — this is the natural evolution of the existing scheme system.

---

## Section 1: Scheme System Extension

### `src/design/schemes.ts`

Add `buttonFrom`, `buttonVia`, `buttonTo` to each scheme's color definition. Slightly darker/more saturated than the main gradient for button text contrast:

| Scheme | buttonFrom | buttonVia | buttonTo |
|---|---|---|---|
| violet-blue | `#7c3aed` | `#9333ea` | `#2563eb` |
| deep-purple | `#a855f7` | `#d946ef` | `#7c3aed` |
| silver | `#71717a` | `#94a3b8` | `#52525b` |
| glass | `#0d9488` | `#0891b2` | `#0284c7` |

### `src/providers/scheme-provider.tsx`

Inject three new CSS custom properties alongside existing ones:
- `--scheme-button-from`
- `--scheme-button-via`
- `--scheme-button-to`

### `src/app/globals.css`

Add one new utility class:

```css
.scheme-button-gradient {
  background: linear-gradient(to right, var(--scheme-button-from), var(--scheme-button-via), var(--scheme-button-to));
}
```

---

## Section 2: Component Fixes

### `src/design/variants.ts` — `ctaButton`

- `gradient` variant: Replace `from-violet-600 via-purple-600 to-indigo-600` with `scheme-button-gradient` + `hover:opacity-90` (Tailwind can't animate arbitrary CSS vars via gradient utilities, so opacity hover instead)
- `ghost` variant: Replace `hover:border-violet-400 hover:text-violet-400 hover:bg-violet-500/10` with `hover:border-[var(--scheme-accent)] hover:text-[var(--scheme-accent)] hover:bg-[var(--scheme-accent)]/10`

### `src/features/shared/ui/card-effects.tsx`

- Glow: `rgba(124,58,237,0.1)` / `rgba(124,58,237,0.08)` → `var(--scheme-glow)`
- Hover border: `border-purple-300/50 dark:border-purple-500/20` → `scheme-border` utility
- Ring: `ring-purple-300/40 dark:ring-purple-500/10` → `ring-[var(--scheme-border)]`
- Hover background: `bg-purple-50/30 dark:bg-black/20` → `bg-[var(--scheme-accent)]/5`

### `src/features/blogs/scroll-progress.tsx`

- Replace `from-violet-500 via-cyan-400 to-green-400` with `scheme-button-gradient` utility

### `src/features/contact/contact-card.tsx`

- Replace `group-hover:text-purple-900/90 dark:group-hover:text-zinc-300` with `group-hover:text-[var(--scheme-accent)]`

### Border syntax standardisation

All `border-[var(--scheme-border)]` → `scheme-border` utility class (no visual change, consistency only).

---

## Section 3: Light Mode Fixes

### `src/features/blogs/mdx-components.tsx`

Code blocks use hardcoded white opacity values invisible in light mode. Replace with shadcn/ui semantic tokens:

| Current | Replacement | Rationale |
|---|---|---|
| `border-white/[0.06]` | `border-border` | Semantic border colour, light + dark |
| `bg-white/5` | `bg-muted/50` | Muted surface, light + dark |
| `border-white/10` | `border-border` | Semantic border colour |
| `text-white/60` | `text-muted-foreground` | Semantic muted text |

Syntax highlighting (Shiki/rehype-highlight) is unaffected — it manages its own token colours.

---

## Section 4: Search Palette Cleanup

### `src/features/blogs/search-palette.tsx`

Replace the `palette` object of hardcoded inline RGB values with Tailwind classes using shadcn/ui semantic tokens. These resolve correctly via `:root` CSS custom properties which cascade to all elements including Radix portals.

| Role | Current | Replacement |
|---|---|---|
| Background | inline RGB | `bg-background` |
| Border | inline RGB | `border-border` |
| Input/title text | inline RGB | `text-foreground` |
| Placeholder/body text | inline RGB | `text-muted-foreground` |
| Hover background | inline RGB | `hover:bg-muted` |
| Code background | inline RGB | `bg-muted` |
| Code text | inline RGB | `text-muted-foreground` |

**Risk mitigation:** If the Radix portal does not inherit `:root` vars (e.g. portal escapes `html` class scope), the fallback is passing resolved token values via a `data-theme` attribute — keeping logic clean rather than raw RGB strings.

---

## Files Changed

| File | Change Type |
|---|---|
| `src/design/schemes.ts` | Add `buttonFrom/Via/To` to each scheme |
| `src/providers/scheme-provider.tsx` | Inject `--scheme-button-from/via/to` |
| `src/app/globals.css` | Add `.scheme-button-gradient` utility |
| `src/design/variants.ts` | Update `ctaButton` to use scheme vars |
| `src/features/shared/ui/card-effects.tsx` | Replace hardcoded purples with scheme vars |
| `src/features/blogs/scroll-progress.tsx` | Replace hardcoded gradient |
| `src/features/contact/contact-card.tsx` | Replace hardcoded hover colour |
| `src/features/blogs/mdx-components.tsx` | Fix light mode code block styles |
| `src/features/blogs/search-palette.tsx` | Replace inline RGB with semantic tokens |

---

## Success Criteria

- Site scheme changes (time-of-day or forced) propagate to buttons, card hovers, scroll progress, and contact hover
- No hardcoded purple/violet/indigo in any component file
- Code blocks readable in both light and dark mode
- Search palette visually identical to current behaviour but using semantic tokens
- `bun run type-check` and `bun run lint:strict` pass
- No visual regressions in either theme
