'use client';

import { SCHEMES, SCHEME_ORDER, type SchemeName } from '@/design/schemes';
import { useScheme } from '@/providers/scheme-provider';
import { cn } from '@/lib/utils';

const SCHEME_LABELS: Record<SchemeName, string> = {
  silver: 'Silver — morning',
  glass: 'Glass — afternoon',
  'deep-purple': 'Deep Purple — evening',
  'violet-blue': 'Violet Blue — night',
};

export function SchemeSelector() {
  const { schemeName, pinnedScheme, setPinnedScheme } = useScheme();

  return (
    <div className="flex items-center gap-1.5" aria-label="Colour scheme selector">
      {SCHEME_ORDER.map((name) => {
        const scheme = SCHEMES[name];
        const isActive = schemeName === name;
        const isPinned = pinnedScheme === name;

        return (
          <button
            key={name}
            onClick={() => setPinnedScheme(isPinned ? null : name)}
            title={
              isPinned
                ? `${SCHEME_LABELS[name]} (pinned — click to reset to auto)`
                : `${SCHEME_LABELS[name]}${isActive ? ' (current)' : ''}`
            }
            aria-pressed={isPinned}
            className={cn(
              'relative h-[14px] w-[14px] rounded-full transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background',
              isActive
                ? 'scale-110 ring-2 ring-offset-[1.5px] ring-offset-background ring-[var(--scheme-accent)]'
                : 'opacity-50 hover:opacity-90 hover:scale-110',
            )}
            style={{
              background: `linear-gradient(135deg, ${scheme.from}, ${scheme.via}, ${scheme.to})`,
            }}
          >
            <span className="sr-only">{SCHEME_LABELS[name]}</span>
          </button>
        );
      })}
      {!pinnedScheme && (
        <span
          className="ml-0.5 text-[10px] leading-none text-muted-foreground/50 select-none"
          title="Scheme is set automatically by time of day"
        >
          auto
        </span>
      )}
    </div>
  );
}
