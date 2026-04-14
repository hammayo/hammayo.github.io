import Link from 'next/link';
import { Container } from '@/features/shared/container';
import { gradientText } from '@/design/variants';

export default function BlogNotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center gap-4">
        <h1 className={gradientText({ size: 'heading' })}>Post not found</h1>
        <p className="text-muted-foreground max-w-sm">
          This post doesn&apos;t exist or may have been moved.
        </p>
        <Link
          href="/blogs"
          className="text-sm text-[var(--scheme-accent)] hover:underline"
        >
          ← Back to writing
        </Link>
      </div>
    </Container>
  );
}
