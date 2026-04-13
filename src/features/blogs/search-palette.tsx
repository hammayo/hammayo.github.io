'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/features/shared/ui/dialog';
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
        '/_pagefind/pagefind.js'
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
    // Pagefind returns paths like /blogs/my-slug/ — strip trailing slash
    return url.replace(/\/$/, '') || '/';
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 border-[var(--scheme-border)] bg-background/95 backdrop-blur-md">
        <DialogTitle className="sr-only">Search posts</DialogTitle>

        {/* Input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <svg className="w-4 h-4 text-muted-foreground shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={IS_DEV ? 'Search unavailable in development' : 'Search posts…'}
            disabled={IS_DEV}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground">
              ✕
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto p-2">
          {IS_DEV && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              Search is unavailable in development.<br />
              Run <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">bun run build</code> to generate the Pagefind index.
            </p>
          )}

          {!IS_DEV && !query && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              Start typing to search all posts…
            </p>
          )}

          {!IS_DEV && query && loading && (
            <p className="px-3 py-4 text-center text-sm text-muted-foreground">Searching…</p>
          )}

          {!IS_DEV && query && !loading && results.length === 0 && (
            <p className="px-3 py-4 text-center text-sm text-muted-foreground">
              No results for &ldquo;{query}&rdquo;
            </p>
          )}

          {results.map((result, i) => (
            <Link
              key={i}
              href={toRoute(result.url)}
              onClick={() => onOpenChange(false)}
              className={cn(
                'block rounded-lg px-3 py-2.5 hover:bg-[var(--scheme-accent)]/10 transition-colors',
                'group'
              )}
            >
              <p className="text-sm font-medium text-foreground group-hover:text-[var(--scheme-accent)] mb-1">
                {result.meta.title ?? 'Untitled'}
              </p>
              <p
                className="text-xs text-muted-foreground line-clamp-2 [&_mark]:bg-[var(--scheme-accent)]/20 [&_mark]:text-[var(--scheme-accent)] [&_mark]:rounded-sm [&_mark]:px-0.5"
                dangerouslySetInnerHTML={{ __html: result.excerpt }}
              />
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-2 flex items-center gap-3 text-[10px] text-muted-foreground">
          <span><kbd className="font-mono">↵</kbd> select</span>
          <span><kbd className="font-mono">ESC</kbd> close</span>
          <span className="ml-auto">powered by Pagefind</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
