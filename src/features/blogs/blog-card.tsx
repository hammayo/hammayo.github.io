'use client';

import Link from 'next/link';
import { CardContent } from '@/features/shared/ui/card';
import { CardEffects, cardBaseClasses } from '@/features/shared/ui/card-effects';
import { gradientText, accentTag } from '@/design/variants';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Highlight } from './highlight';
import type { PostMeta } from './schema';

interface BlogCardProps {
  post: PostMeta;
  index: number;
  /** Search words to highlight in the title and summary. */
  query?: string;
}

export function BlogCard({ post, index, query = '' }: Readonly<BlogCardProps>) {
  // Lift the line clamps while searching so a match is never hidden in the clipped text.
  const searching = query.trim() !== '';
  return (
    <Link href={`/blogs/${post.slug}`} className="block h-full">
      <CardEffects delay={Math.min(index * 0.1, 0.5)} bordered>
        <CardContent className={cn(cardBaseClasses.contentWrapper, 'min-h-[14rem] flex flex-col')}>
          <div className="flex-1 flex flex-col">
            {/* Date + reading time */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
              <span>·</span>
              <span>{post.readingTime} min read</span>
            </div>

            {/* Title */}
            <h2 className={cn(gradientText({ size: 'body' }), 'text-lg font-semibold mb-2', !searching && 'line-clamp-2')}>
              <Highlight text={post.title} query={query} />
            </h2>

            {/* Summary */}
            <p className={cn('text-sm text-muted-foreground flex-1', !searching && 'line-clamp-3')}>
              <Highlight text={post.summary} query={query} />
            </p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {post.tags.map(tag => (
                  <span key={tag} className={accentTag()}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </CardEffects>
    </Link>
  );
}
