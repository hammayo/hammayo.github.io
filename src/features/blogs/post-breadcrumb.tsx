import Link from 'next/link';

interface PostBreadcrumbProps {
  title: string;
}

export function PostBreadcrumb({ title }: PostBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Link href="/" className="hover:text-[var(--scheme-accent-text)] transition-colors">
        Home
      </Link>
      <span aria-hidden="true">/</span>
      <Link href="/blogs" className="hover:text-[var(--scheme-accent-text)] transition-colors">
        Writing
      </Link>
      <span aria-hidden="true">/</span>
      <span className="truncate max-w-[200px] sm:max-w-xs text-foreground" aria-current="page">
        {title}
      </span>
    </nav>
  );
}
