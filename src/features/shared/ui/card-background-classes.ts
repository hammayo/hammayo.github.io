/**
 * Shared Tailwind class strings for the card background layers.
 * Used by CardEffects (hover state) and PostHeader (fallback background).
 * Change here to update both.
 */
export const cardBgBase =
  'bg-gradient-to-br from-white via-zinc-50/50 to-zinc-100/30 dark:from-zinc-900/60 dark:via-zinc-900/40 dark:to-zinc-800/50';

export const cardBgOverlay1 =
  'bg-gradient-to-br from-purple-200/20 via-cyan-200/15 to-pink-200/20 dark:from-purple-500/[0.05] dark:via-cyan-500/[0.05] dark:to-pink-500/[0.05]';

export const cardBgOverlay2 =
  'bg-gradient-to-tl from-green-200/15 via-blue-200/15 to-purple-200/20 dark:from-green-500/[0.03] dark:via-blue-500/[0.04] dark:to-purple-500/[0.05]';
