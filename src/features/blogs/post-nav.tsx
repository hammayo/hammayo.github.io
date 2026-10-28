import Link from 'next/link';
import type { PostMeta } from './schema';
import { stripPartPrefix } from './series';

interface PostNavProps {
  prev: PostMeta | null;
  next: PostMeta | null;
}

/** Series posts drop the repeated series name ("Part 3: Title"); the title never wraps. */
const navTitle = (post: PostMeta) =>
  post.series ? `Part ${post.series.part}: ${stripPartPrefix(post.title)}` : post.title;

export function PostNav({ prev, next }: PostNavProps) {
  if (!prev && !next) return null;

  return (
    <nav
      className="mt-12 pt-8 border-t border-border grid grid-cols-2 gap-4"
      aria-label="Post navigation"
    >
      <div className="min-w-0">
        {prev && (
          <Link
            href={`/blogs/${prev.slug}`}
            title={prev.title}
            className="group block text-left hover:text-[var(--scheme-accent-text)] transition-colors"
          >
            <span className="block text-xs text-muted-foreground mb-1">← Previous</span>
            <span className="block truncate text-sm font-medium group-hover:text-[var(--scheme-accent-text)]">
              {navTitle(prev)}
            </span>
          </Link>
        )}
      </div>
      <div className="min-w-0 text-right">
        {next && (
          <Link
            href={`/blogs/${next.slug}`}
            title={next.title}
            className="group block hover:text-[var(--scheme-accent-text)] transition-colors"
          >
            <span className="block text-xs text-muted-foreground mb-1">Next →</span>
            <span className="block truncate text-sm font-medium group-hover:text-[var(--scheme-accent-text)]">
              {navTitle(next)}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
