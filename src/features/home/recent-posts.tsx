import Link from 'next/link';
import { format } from 'date-fns';
import type { PostMeta } from '@/features/blogs/schema';

interface RecentPostsProps {
  posts: PostMeta[];
}

export function RecentPosts({ posts }: RecentPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto text-left">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Recent Writing
        </h2>
        <Link
          href="/blogs"
          className="text-xs text-[var(--scheme-accent-text)] hover:underline underline-offset-2 transition-colors"
        >
          {'All posts →'}
        </Link>
      </div>
      <ul className="space-y-0">
        {posts.map(post => (
          <li key={post.slug}>
            <Link
              href={`/blogs/${post.slug}`}
              className="group flex items-center justify-between gap-4 py-2.5 border-b border-[var(--scheme-border)] hover:border-[var(--scheme-accent)] transition-colors"
            >
              <span className="text-sm text-foreground group-hover:text-[var(--scheme-accent-text)] transition-colors line-clamp-1 flex-1">
                {post.title}
              </span>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {format(new Date(post.date), 'MMM yyyy')}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
