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

  return (
    <div>
      {/* Toolbar: search button + tag chips */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {/* Search trigger */}
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

        {/* Tag filter chips */}
        <button
          onClick={() => setActiveTag(null)}
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
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
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
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">
          No posts{activeTag ? ` tagged "${activeTag}"` : ''}.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}

      {/* Search palette */}
      <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}
