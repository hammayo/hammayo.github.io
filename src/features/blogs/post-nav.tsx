import Link from 'next/link';
import type { PostMeta } from './schema';

interface PostNavProps {
  prev: PostMeta | null;
  next: PostMeta | null;
}

export function PostNav({ prev, next }: PostNavProps) {
  if (!prev && !next) return null;

  return (
    <nav
      className="mt-12 pt-8 border-t border-border grid grid-cols-2 gap-4"
      aria-label="Post navigation"
    >
      <div>
        {prev && (
          <Link
            href={`/blogs/${prev.slug}`}
            className="group flex flex-col gap-1 text-left hover:text-[var(--scheme-accent-text)] transition-colors"
          >
            <span className="text-xs text-muted-foreground">← Previous</span>
            <span className="text-sm font-medium line-clamp-2 group-hover:text-[var(--scheme-accent-text)]">
              {prev.title}
            </span>
          </Link>
        )}
      </div>
      <div className="text-right">
        {next && (
          <Link
            href={`/blogs/${next.slug}`}
            className="group flex flex-col gap-1 items-end hover:text-[var(--scheme-accent-text)] transition-colors"
          >
            <span className="text-xs text-muted-foreground">Next →</span>
            <span className="text-sm font-medium line-clamp-2 group-hover:text-[var(--scheme-accent-text)]">
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
