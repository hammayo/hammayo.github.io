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
  /** Hex colour for --scheme-button-from CSS variable (button gradient start, darker than from) */
  buttonFrom: string;
  /** Hex colour for --scheme-button-via CSS variable (button gradient mid) */
  buttonVia: string;
  /** Hex colour for --scheme-button-to CSS variable (button gradient end) */
  buttonTo: string;
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
    buttonFrom: '#7c3aed',
    buttonVia: '#9333ea',
    buttonTo: '#2563eb',
    accent: '#8b5cf6',
    border: 'rgba(139, 92, 246, 0.3)',
    transitionMs: 2000,
  },
  'nebula': {
    name: 'Nebula',
    gradient: 'from-cyan-400 via-fuchsia-500 to-orange-400',
    darkGradient: 'from-cyan-400 via-fuchsia-500 to-orange-400',
    glow: 'rgba(0, 220, 255, 0.28)',
    from: '#00dcff',
    via: '#e040fb',
    to: '#ff6d00',
    buttonFrom: '#0099bb',
    buttonVia: '#aa00cc',
    buttonTo: '#cc4400',
    accent: '#00dcff',
    border: 'rgba(0, 220, 255, 0.32)',
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
    buttonFrom: '#71717a',
    buttonVia: '#64748b',
    buttonTo: '#52525b',
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
    buttonFrom: '#0d9488',
    buttonVia: '#0891b2',
    buttonTo: '#0284c7',
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
 *   12:00–17:59 → glass (afternoon)
 *   18:00–21:59 → nebula (evening)
 *   22:00–05:59 → violet-blue (night)
 *
 * 'config'      — always uses SCHEME_DEFAULT
 * 'cycle'       — rotates SCHEME_ORDER at CYCLE_SPEED
 */
export const SCHEME_MODE: 'time-of-day' | 'config' | 'cycle' = 'time-of-day';

/** Used when SCHEME_MODE is 'config', or as SSR default before hydration */
export const SCHEME_DEFAULT: SchemeName = 'violet-blue';

/** Used when SCHEME_MODE is 'cycle' */
export const SCHEME_ORDER: SchemeName[] = ['silver', 'glass', 'nebula', 'violet-blue'];

/**
 * Cycle speed when SCHEME_MODE is 'cycle'.
 * 'slow' = 30 000ms, 'medium' = 15 000ms
 */
export const CYCLE_SPEED: 'slow' | 'medium' = 'slow';

export const CYCLE_SPEED_MS: Record<'slow' | 'medium', number> = {
  slow: 30_000,
  medium: 15_000,
};

/** Resolve scheme name from visitor's local hour */
export function resolveTimeOfDayScheme(): SchemeName {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'silver';
  if (hour >= 12 && hour < 18) return 'glass';
  if (hour >= 18 && hour < 22) return 'nebula';
  return 'violet-blue';
}
