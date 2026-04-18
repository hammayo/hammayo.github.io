'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { MDXComponents } from 'mdx/types';

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="absolute right-3 top-3 rounded-md border border-border bg-muted/50 px-2 py-1 text-[10px] text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
      aria-label="Copy code"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function CodeBlock({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const codeEl = (children as React.ReactElement<{ children?: string }>)?.props;
  const code   = typeof codeEl?.children === 'string' ? codeEl.children : '';
  return (
    <div className="relative my-6 group">
      <pre
        {...props}
        className="overflow-x-auto rounded-xl border border-border bg-zinc-900 dark:bg-zinc-950 p-4 text-sm leading-relaxed"
      >
        {children}
      </pre>
      {code && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <CopyButton code={code.trimEnd()} />
        </div>
      )}
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  // Code blocks — rehype-pretty-code wraps in <pre><code>
  pre: CodeBlock,

  // Images — global imageLoader in next.config.ts handles basePath automatically
  img: ({ src, alt, ...props }) => (
    <span className="block my-6">
      <Image
        src={src ?? ''}
        alt={alt ?? ''}
        width={800}
        height={450}
        className="rounded-xl w-full h-auto border border-border"
        {...(props as object)}
      />
    </span>
  ),

  // Links — accent colour, external links open in new tab, PDFs as download pill
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http');
    const isPdf      = href?.endsWith('.pdf');

    if (isPdf) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border scheme-border px-3 py-0.5 text-xs font-medium text-[var(--scheme-accent-text)] hover:bg-[var(--scheme-accent)]/10 transition-colors no-underline"
          {...props}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          {children} ↓
        </a>
      );
    }

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--scheme-accent-text)] underline underline-offset-2 hover:no-underline"
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href ?? '/'}
        className="text-[var(--scheme-accent-text)] underline underline-offset-2 hover:no-underline"
        {...props}
      >
        {children}
      </Link>
    );
  },

  h2: ({ children, ...props }) => (
    <h2 className="mt-10 mb-4 text-xl font-semibold text-foreground border-b border-border pb-2" {...props}>
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3 className="mt-8 mb-3 text-lg font-semibold text-foreground" {...props}>
      {children}
    </h3>
  ),

  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 border-l-2 border-[var(--scheme-border)] pl-4 text-muted-foreground italic"
      {...props}
    >
      {children}
    </blockquote>
  ),
};
