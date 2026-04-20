'use client';

import { useState, useMemo } from 'react';
import { BlogCard } from './blog-card';
import { SearchPalette } from './search-palette';
import { accentTag } from '@/design/variants';
import { cn } from '@/lib/utils';
import type { PostMeta } from './schema';

interface BlogListProps {
  posts: PostMeta[];
  pinnedTags: string[];
}

export function BlogList({ posts, pinnedTags }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Collect all unique tags; pinned tags come first, rest alphabetically
  const allTags = useMemo(() => {
    const tagSet = new Set(posts.flatMap(p => p.tags));
    const pinned = pinnedTags.filter(t => tagSet.has(t));
    const rest   = [...tagSet].filter(t => !pinnedTags.includes(t)).sort();
    return [...pinned, ...rest];
  }, [posts, pinnedTags]);

  const filtered = activeTag
    ? posts.filter(p => p.tags.includes(activeTag))
    : posts;

  const POSTS_PER_PAGE = 6;
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div>
      {/* Search row — right-aligned above pills */}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--scheme-border)] text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Search posts"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Search</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Tag filter chips */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          onClick={() => { setActiveTag(null); setCurrentPage(1); }}
          className={cn(
            accentTag(),
            'cursor-pointer transition-opacity',
            activeTag !== null && 'opacity-40'
          )}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => { setActiveTag(activeTag === tag ? null : tag); setCurrentPage(1); }}
            className={cn(
              accentTag(),
              'cursor-pointer transition-opacity',
              activeTag !== null && activeTag !== tag && 'opacity-40'
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Post grid */}
      {paginated.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">
          No posts{activeTag ? ` tagged "${activeTag}"` : ''}.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {paginated.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
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
  const btnBase = 'px-3 py-1.5 rounded-lg border border-[var(--scheme-border)] text-sm transition-colors';
  const btnActive = cn(accentTag(), 'cursor-pointer');
  const btnInactive = cn(btnBase, 'text-muted-foreground hover:text-foreground cursor-pointer');
  const btnDisabled = cn(btnBase, 'text-muted-foreground opacity-40 cursor-not-allowed pointer-events-none');

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
