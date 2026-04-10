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

export const CYCLE_SPEED_MS: Record<'slow' | 'medium', number> = {
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
