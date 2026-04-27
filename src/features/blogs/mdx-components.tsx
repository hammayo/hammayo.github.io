import Image from 'next/image';
import Link from 'next/link';
import type { MDXComponents } from 'mdx/types';
import { CopyButton } from './copy-button';

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node != null && typeof node === 'object' && 'props' in (node as object)) {
    return extractText((node as React.ReactElement<{ children?: React.ReactNode }>).props.children);
  }
  return '';
}

function CodeBlock({
  children,
  style: shikiStyle,
  'data-language': language,
  ...props
}: React.HTMLAttributes<HTMLPreElement> & { 'data-language'?: string }) {
  const code = extractText(children).trimEnd();
  return (
    <div
      className="not-prose my-6 rounded-xl overflow-hidden"
      style={{
        background: 'var(--code-bg)',
        border: '1px solid var(--scheme-border)',
      }}
    >
      {/* Terminal chrome header */}
      <div
        className="flex items-center justify-between px-4 py-1.5"
        style={{
          background: 'var(--code-header-bg)',
          backgroundImage: 'linear-gradient(105deg, color-mix(in srgb, var(--scheme-from) 18%, transparent) 0%, color-mix(in srgb, var(--scheme-via) 12%, transparent) 50%, color-mix(in srgb, var(--scheme-to) 8%, transparent) 100%)',
          borderBottom: '1px solid var(--code-header-border)',
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
          <span className="w-2 h-2 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex items-center gap-2">
          {language && (
            <span
              className="text-[10px] font-mono uppercase tracking-widest select-none"
              style={{ color: 'var(--scheme-accent-text)' }}
            >
              {language}
            </span>
          )}
          {code && <CopyButton code={code} />}
        </div>
      </div>

      {/* Code body — merge shikiStyle so --shiki-light/dark defaults on <pre> are preserved */}
      <pre
        {...props}
        className="overflow-x-auto p-5 text-[0.8rem] leading-relaxed m-0 rounded-none"
        style={{ ...shikiStyle, background: 'var(--code-bg)' }}
      >
        {children}
      </pre>
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
    <h2 className="mt-10 mb-4 text-xl font-semibold gradient-text border-b border-[var(--scheme-border)] pb-2" {...props}>
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3 className="mt-8 mb-3 text-lg font-semibold text-[var(--scheme-accent-text)]" {...props}>
      {children}
    </h3>
  ),

  h4: ({ children, ...props }) => (
    <h4 className="mt-6 mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground" {...props}>
      {children}
    </h4>
  ),

  // Lists — scheme-coloured markers, prose handles spacing/indent
  ul: ({ children, ...props }) => (
    <ul className="marker:text-[var(--scheme-accent)]" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol className="marker:text-[var(--scheme-accent-text)]" {...props}>
      {children}
    </ol>
  ),

  // Horizontal rule — thin gradient bar
  hr: () => (
    <div className="my-8 h-px gradient-bg opacity-30 rounded-full" />
  ),

  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-6 border-l-2 border-[var(--scheme-border)] pl-4 text-muted-foreground italic"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Tables — escape prose styles, apply scheme borders
  table: ({ children, ...props }) => (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-[var(--scheme-border)]">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),

  thead: ({ children, ...props }) => (
    <thead className="bg-[var(--scheme-accent)]/[0.07] border-b border-[var(--scheme-border)]" {...props}>
      {children}
    </thead>
  ),

  tr: ({ children, ...props }) => (
    <tr className="border-b border-border last:border-0 transition-colors hover:bg-[var(--scheme-accent)]/[0.03]" {...props}>
      {children}
    </tr>
  ),

  th: ({ children, ...props }) => (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--scheme-accent-text)]" {...props}>
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td className="px-4 py-3 text-sm text-muted-foreground" {...props}>
      {children}
    </td>
  ),
};
