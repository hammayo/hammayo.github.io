import type { ReactElement } from 'react';

interface PostBodyProps {
  content: ReactElement;
}

export function PostBody({ content }: PostBodyProps) {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none
      prose-headings:font-semibold
      prose-p:text-muted-foreground prose-p:leading-relaxed
      prose-li:text-muted-foreground
      prose-strong:text-foreground
      prose-code:text-[var(--scheme-accent)] prose-code:bg-muted prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
    ">
      {content}
    </article>
  );
}
