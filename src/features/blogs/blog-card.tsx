import Link from 'next/link';
import { CardContent } from '@/features/shared/ui/card';
import { CardEffects, cardBaseClasses } from '@/features/shared/ui/card-effects';
import { gradientText, accentTag } from '@/design/variants';
import { format } from 'date-fns';
import type { PostMeta } from './schema';

interface BlogCardProps {
  post: PostMeta;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <Link href={`/blogs/${post.slug}`} className="block h-full">
      <CardEffects
        className={`animate-in fade-in-50 duration-500 delay-${Math.min(index * 100, 500)}`}
      >
        <CardContent className={`${cardBaseClasses.contentWrapper} min-h-[14rem] flex flex-col`}>
          <div className="flex-1 flex flex-col">
            {/* Date + reading time */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <span>{format(new Date(post.date), 'MMM d, yyyy')}</span>
              <span>·</span>
              <span>{post.readingTime} min read</span>
            </div>

            {/* Title */}
            <h2 className={gradientText({ size: 'body' }) + ' text-lg font-semibold mb-2 line-clamp-2'}>
              {post.title}
            </h2>

            {/* Summary */}
            <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
              {post.summary}
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
