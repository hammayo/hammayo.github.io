'use client';

import { useState, useMemo } from 'react';
import { BlogCard } from './blog-card';
import { SearchPalette } from './search-palette';
import { TagFilter } from './tag-filter';
import { searchWords } from './highlight';
import { cn } from '@/lib/utils';
import type { PostMeta } from './schema';

interface BlogListProps {
  posts: PostMeta[];
  pinnedTags: string[];
  postCount?: string | null;
}

export function BlogList({ posts, pinnedTags, postCount }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Collect all unique tags; pinned tags come first, rest alphabetically
  const allTags = useMemo(() => {
    const tagSet = new Set(posts.flatMap(p => p.tags));
    const pinned = pinnedTags.filter(t => tagSet.has(t));
    const rest   = [...tagSet].filter(t => !pinnedTags.includes(t)).sort();
    return [...pinned, ...rest];
  }, [posts, pinnedTags]);

  const words = searchWords(query);
  const filtered = posts.filter(p => {
    if (activeTag && !p.tags.includes(activeTag)) return false;
    const haystack = `${p.title} ${p.summary} ${p.tags.join(' ')}`.toLowerCase();
    return words.every(w => haystack.includes(w));
  });
  const countLabel = filtered.length === posts.length
    ? postCount
    : `${filtered.length} of ${posts.length} posts`;

  const POSTS_PER_PAGE = 6;
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div>
      {/* Count + search row */}
      <div className="flex items-center justify-between gap-3 mb-3">
        {countLabel ? (
          <p className="text-xs text-muted-foreground">{countLabel}</p>
        ) : (
          <span />
        )}
        <div className="flex w-full max-w-xs items-center gap-2 rounded-lg border border-[var(--scheme-border)] px-3 py-1.5 text-sm text-muted-foreground focus-within:text-foreground">
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search posts…"
            aria-label="Search posts"
            className="min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Full-text search"
            title="Full-text search"
            className="hidden sm:inline-flex items-center rounded border border-border px-1.5 py-0.5 text-[10px] font-mono hover:text-foreground"
          >
            ⌘K
          </button>
        </div>
      </div>

      {/* Tag filter */}
      <div className="mb-6">
        <TagFilter
          pinned={pinnedTags.filter(t => allTags.includes(t))}
          allTags={allTags}
          active={activeTag}
          onSelect={tag => { setActiveTag(tag); setCurrentPage(1); }}
        />
      </div>

      {/* Post grid */}
      {paginated.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">
          No posts{activeTag ? ` tagged "${activeTag}"` : ''}{query.trim() ? ` matching "${query.trim()}"` : ''}.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {paginated.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} query={query} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Search palette */}
      <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}

function getPageWindow(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set<number>([1, total, current]);
  if (current > 1) pages.add(current - 1);
  if (current < total) pages.add(current + 1);

  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | '...')[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('...');
    result.push(sorted[i]);
  }
  return result;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pageItems = getPageWindow(currentPage, totalPages);
  const btnBase = 'inline-flex items-center justify-center min-w-[2rem] h-8 px-3 rounded-lg border text-sm transition-colors';
  const btnActive = cn(btnBase, 'border-[var(--scheme-accent)] bg-[var(--scheme-accent)]/10 text-[var(--scheme-accent-text)] font-medium cursor-pointer');
  const btnInactive = cn(btnBase, 'border-[var(--scheme-border)] text-muted-foreground hover:text-foreground hover:border-[var(--scheme-border)] cursor-pointer');
  const btnDisabled = cn(btnBase, 'border-[var(--scheme-border)] text-muted-foreground opacity-40 cursor-not-allowed pointer-events-none');

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className={currentPage === 1 ? btnDisabled : btnInactive}
        aria-label="Previous page"
      >
        ←
      </button>

      {pageItems.map((item, i) =>
        item === '...' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-sm text-muted-foreground">…</span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={item === currentPage ? btnActive : btnInactive}
            aria-label={`Page ${item}`}
            aria-current={item === currentPage ? 'page' : undefined}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        className={currentPage === totalPages ? btnDisabled : btnInactive}
        aria-label="Next page"
      >
        →
      </button>
    </div>
  );
}
