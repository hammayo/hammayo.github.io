'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface PagefindResult {
  url: string;
  meta: { title?: string };
  excerpt: string;
}

interface SearchPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const IS_DEV = process.env.NODE_ENV === 'development';

export function SearchPalette({ open, onOpenChange }: SearchPaletteProps) {
  const [query, setQuery]     = useState('');
  const [results, setResults] = useState<PagefindResult[]>([]);
  const [loading, setLoading] = useState(false);
  const pagefindRef           = useRef<Record<string, unknown> | null>(null);
  const inputRef              = useRef<HTMLInputElement>(null);

  // Register ⌘K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(true);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenChange]);

  // Focus input when palette opens
  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Load Pagefind once
  const loadPagefind = useCallback(async () => {
    if (pagefindRef.current || IS_DEV) return;
    try {
      // webpackIgnore: file generated at build time, not bundled
      const pf = await import(
        /* webpackIgnore: true */
        // @ts-expect-error Pagefind is generated post-build
        '/pagefind/pagefind.js'
      );
      await (pf as { init: () => Promise<void> }).init();
      pagefindRef.current = pf as Record<string, unknown>;
    } catch {
      // Pagefind index not available (e.g. first build)
      console.warn('[search] Pagefind index not found');
    }
  }, []);

  useEffect(() => {
    if (open) loadPagefind();
  }, [open, loadPagefind]);

  // Search on query change
  useEffect(() => {
    if (!query.trim() || !pagefindRef.current) {
      setResults([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    const pf = pagefindRef.current as { search: (q: string) => Promise<{ results: Array<{ data: () => Promise<PagefindResult> }> }> };
    pf.search(query).then((res) => {
      if (cancelled) return;
      Promise.all(res.results.slice(0, 8).map((r) => r.data())).then(data => {
        if (!cancelled) {
          setResults(data);
          setLoading(false);
        }
      });
    });
    return () => { cancelled = true; };
  }, [query]);

  // Normalise Pagefind URL to Next.js route
  function toRoute(url: string): string {
    return url.replace(/\/$/, '') || '/';
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/20 dark:bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content
          className={cn(
            'fixed left-1/2 z-50 -translate-x-1/2',
            'top-20 w-[calc(100%-2rem)]',
            'sm:top-1/2 sm:-translate-y-1/2 sm:max-w-[600px]',
            'bg-background dark:bg-background/90 dark:backdrop-blur-2xl border border-border/50 rounded-xl shadow-2xl',
            'flex flex-col overflow-hidden',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          )}
        >
          <DialogPrimitive.Title className="sr-only">Search posts</DialogPrimitive.Title>

          {/* Input row */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
            <svg
              className="w-4 h-4 shrink-0 text-muted-foreground"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={IS_DEV ? 'Search unavailable in development' : 'Search posts…'}
              disabled={IS_DEV}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none disabled:opacity-50"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-muted-foreground transition-opacity hover:opacity-70"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Results */}
          <div className="max-h-[40dvh] sm:max-h-[400px] overflow-y-auto">
            {IS_DEV && (
              <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                Search is unavailable in development.<br />
                Run{' '}
                <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                  bun run build
                </code>{' '}
                to generate the Pagefind index.
              </p>
            )}

            {!IS_DEV && !query && (
              <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                Start typing to search all posts…
              </p>
            )}

            {!IS_DEV && query && loading && (
              <p className="px-4 py-4 text-center text-sm text-muted-foreground">Searching…</p>
            )}

            {!IS_DEV && query && !loading && results.length === 0 && (
              <p className="px-4 py-4 text-center text-sm text-muted-foreground">
                No results for &ldquo;{query}&rdquo;
              </p>
            )}

            {results.length > 0 && (
              <ul className="p-2">
                {results.map((result, i) => (
                  <li key={i}>
                    <Link
                      href={toRoute(result.url)}
                      onClick={() => onOpenChange(false)}
                      className="group block rounded-lg px-3 py-3 transition-colors hover:bg-muted"
                    >
                      <p className="text-sm font-semibold mb-1 text-foreground transition-colors group-hover:text-[var(--scheme-accent-text)]">
                        {result.meta.title ?? 'Untitled'}
                      </p>
                      <p
                        className={cn(
                          'text-xs line-clamp-2 text-muted-foreground',
                          '[&_mark]:bg-[var(--scheme-accent)]/20 [&_mark]:text-[var(--scheme-accent-text)]',
                          '[&_mark]:font-semibold [&_mark]:not-italic [&_mark]:rounded-sm [&_mark]:px-0.5',
                        )}
                        dangerouslySetInnerHTML={{ __html: result.excerpt }}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 flex items-center gap-3 text-[10px] text-muted-foreground border-t border-border/50">
            <span className="hidden sm:inline"><kbd className="font-mono">↵</kbd> select</span>
            <span className="hidden sm:inline"><kbd className="font-mono">ESC</kbd> close</span>
            <span className="sm:ml-auto">powered by Pagefind</span>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
