# Design System

> Part of the `_notes/` technical reference. See also: [Architecture](architecture.md) · [Blog engine & SEO](blog-engine.md) · [Development & CI/CD](development.md)

---

## Two Independent Layers

I wanted the colour scheme — the time-of-day gradients — to work independently of light/dark mode. Someone visiting at 9pm in light mode should get the evening gradient in a light context. The two layers never need to know about each other.

```
┌──────────────────────────────────────────────┐
│  ThemeProvider (next-themes)                 │  ← light / dark mode
├──────────────────────────────────────────────┤
│  SchemeProvider (time-of-day gradients)      │  ← silver / glass / nebula / violet-blue
├──────────────────────────────────────────────┤
│  CSS custom properties on :root              │  ← --scheme-accent, --scheme-glow…
├──────────────────────────────────────────────┤
│  Tailwind v4 utility classes                 │  ← gradient-text, scheme-glow…
├──────────────────────────────────────────────┤
│  CVA variants (src/design/variants.ts)       │  ← gradientText, glowCard, ctaButton…
└──────────────────────────────────────────────┘
```

Both providers mount in `src/app/layout.tsx` — nothing else needs to know they exist.

## Colour Schemes

The scheme shifts based on the visitor's local time. I like the idea that the site looks different depending on whether you're reading it with your morning coffee or late at night. No toggle, no configuration — it just changes.

| Scheme | Hours | Character |
|---|---|---|
| `silver` | 06:00–11:59 | Metallic, refined — morning |
| `glass` | 12:00–17:59 | Airy, cool — afternoon |
| `nebula` | 18:00–21:59 | Saturated, bold — evening |
| `violet-blue` | 22:00–05:59 | Deep, rich — night |

Source of truth: `src/design/schemes.ts` → `resolveTimeOfDayScheme()`.

## CSS Custom Properties

All colours are CSS custom properties I inject onto `:root`. Components reference variables, never raw hex values.

| Variable | Source | Notes |
|---|---|---|
| `--scheme-from/via/to` | `schemes.ts` | Gradient stop hex values |
| `--scheme-accent` | `schemes.ts` | Raw accent hex — use for backgrounds and borders only |
| `--scheme-accent-text` | `globals.css` | **Always use this for text and links.** Darkened in light mode (`color-mix(… 60%, #000)`), full accent in dark mode |
| `--scheme-glow` | `schemes.ts` | `rgba` for `box-shadow` |
| `--scheme-border` | `schemes.ts` | `rgba` for borders |
| `--scheme-button-from/via/to` | `schemes.ts` | Darker gradient for CTA buttons |
| `--scheme-transition` | `schemes.ts` | Crossfade duration in ms |

The `--scheme-accent-text` vs `--scheme-accent` distinction catches people out. `--scheme-accent` is the raw hex from the scheme definition — in light mode it's often too light to read as text. `globals.css` derives `--scheme-accent-text` using `color-mix()` to darken it appropriately. Use `--scheme-accent-text` for anything that needs to be readable; `--scheme-accent` for backgrounds, borders, and decoration.

## Tailwind v4

I configure Tailwind CSS-first — no `tailwind.config.ts`. Everything lives in `src/app/globals.css` via `@import "tailwindcss"` and `@theme inline {}`. Design tokens stay as CSS custom properties rather than being duplicated into a JS config file.

I define four custom utility classes in `globals.css`:

| Class | Effect |
|---|---|
| `gradient-text` | Scheme gradient as text fill |
| `gradient-bg` | Scheme gradient as background |
| `scheme-glow` | `box-shadow` using `--scheme-glow` |
| `scheme-border` | Border using `--scheme-border` |

## CVA Variants

I define reusable styled variants in `src/design/variants.ts` using Class Variance Authority. If you're adding a new styled element that uses the scheme gradient or glow, reach for one of these rather than inlining the styles — it keeps things consistent when the scheme changes.

| Variant | Use |
|---|---|
| `gradientText` | Gradient-filled text (pair with `gradient-text` class) |
| `glowCard` | Card with scheme glow shadow |
| `accentTag` | Pill/badge with accent border |
| `ctaButton` | CTA button with button gradient |

## SCHEME_MODE Toggle

To change how the active scheme resolves, edit `SCHEME_MODE` in `src/design/schemes.ts`:

| Mode | Behaviour |
|---|---|
| `'time-of-day'` | Resolves from visitor's local hour (default) |
| `'config'` | Always uses `SCHEME_DEFAULT` |
| `'cycle'` | Rotates through `SCHEME_ORDER` at `CYCLE_SPEED` |

No component changes needed — I designed it so only this one constant controls the behaviour.

---

→ [Architecture](architecture.md) · [Blog engine & SEO](blog-engine.md) · [Development & CI/CD](development.md)
