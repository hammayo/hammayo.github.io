'use client';

import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

/** Fallback background when no hero image is present.
 *  Client component so it reacts to dark/light theme toggles without a flash. */
export function HeroFallbackBackground() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <>
      <div className={cn('absolute inset-0', isDark
        ? 'bg-gradient-to-br from-zinc-900/60 via-zinc-900/40 to-zinc-800/50'
        : 'bg-gradient-to-br from-white via-zinc-50/50 to-zinc-100/30'
      )} />
      <div className={cn('absolute inset-0', isDark
        ? 'bg-gradient-to-br from-purple-500/[0.05] via-cyan-500/[0.05] to-pink-500/[0.05]'
        : 'bg-gradient-to-br from-purple-200/20 via-cyan-200/15 to-pink-200/20'
      )} />
      <div className={cn('absolute inset-0', isDark
        ? 'bg-gradient-to-tl from-green-500/[0.03] via-blue-500/[0.04] to-purple-500/[0.05]'
        : 'bg-gradient-to-tl from-green-200/15 via-blue-200/15 to-purple-200/20'
      )} />
    </>
  );
}
