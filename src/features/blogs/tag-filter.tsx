'use client';

import { useEffect, useRef, useState } from 'react';
import { accentTag } from '@/design/variants';
import { cn } from '@/lib/utils';

interface TagFilterProps {
  /** Tags always shown as chips, in order. */
  pinned:   string[];
  /** Every tag, pinned first. */
  allTags:  string[];
  active:   string | null;
  onSelect: (tag: string | null) => void;
}

const chip = 'cursor-pointer transition-opacity';

export function TagFilter({ pinned, allTags, active, onSelect }: TagFilterProps) {
  const [open, setOpen]   = useState(false);
  const [filter, setFilter] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);

  // Visible chips: pinned tags, plus the active tag when it lives in the popover.
  const visible = active && !pinned.includes(active) ? [...pinned, active] : pinned;
  const hidden  = allTags.filter(t => !visible.includes(t));
  const shown   = hidden.filter(t => t.includes(filter.trim().toLowerCase()));

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', close); };
  }, [open]);

  const pick = (tag: string | null) => { onSelect(tag); setOpen(false); setFilter(''); };

  return (
    <div ref={rootRef} className="relative flex flex-wrap items-center gap-2">
      <button onClick={() => pick(null)} className={cn(accentTag(), chip, active !== null && 'opacity-40')}>All</button>
      {visible.map(tag => (
        <button
          key={tag}
          onClick={() => pick(active === tag ? null : tag)}
          className={cn(accentTag(), chip, active !== null && active !== tag && 'opacity-40')}
        >
          {tag}
        </button>
      ))}
      {hidden.length > 0 && (
        <button
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          className={cn(accentTag({ variant: 'muted' }), chip, 'border-dashed')}
        >
          {`+${hidden.length} more ${open ? '▴' : '▾'}`}
        </button>
      )}

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-full max-w-xl rounded-xl border border-[var(--scheme-border)] bg-white p-3 shadow-[0_8px_40px_-4px_rgba(0,0,0,0.15)] dark:bg-zinc-900 dark:shadow-2xl">
          <input
            autoFocus
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Find a tag…"
            className="mb-3 w-full rounded-lg border border-border bg-transparent px-3 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-[var(--scheme-accent)] focus-visible:outline-none"
          />
          <div className="flex max-h-56 flex-wrap gap-2 overflow-y-auto">
            {shown.length === 0 ? (
              <p className="text-sm text-muted-foreground">No tags match.</p>
            ) : shown.map(tag => (
              <button key={tag} onClick={() => pick(tag)} className={cn(accentTag(), chip)}>{tag}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
