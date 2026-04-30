'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function PostAuthor() {
  const [open, setOpen]   = useState(false);
  const closeTimer        = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  const active = open;

  return (
    <div
      className="relative flex-shrink-0"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Avatar — scale + ring + glow all fire together */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="About the author"
        aria-expanded={open}
        className={[
          'block rounded-full ring-2 transition-all duration-300 ease-out',
          'focus-visible:outline-none',
          active
            ? 'ring-[var(--scheme-accent)] scale-110 shadow-[0_0_18px_var(--scheme-glow)]'
            : 'ring-[var(--scheme-border)] hover:ring-[var(--scheme-accent)] hover:scale-110 hover:shadow-[0_0_18px_var(--scheme-glow)]',
        ].join(' ')}
      >
        <Image
          src="/images/_hb-logo.png"
          alt="Hammy Babar"
          width={36}
          height={36}
          className="rounded-full"
          unoptimized
        />
      </button>

      {/* Invisible bridge — fills the gap so mouse travel into popup doesn't flicker */}
      <div className="absolute right-0 top-full h-3 w-full" />

      {/* Popup — scales from top-right origin toward the avatar */}
      <div
        role="tooltip"
        className={[
          'absolute right-0 top-full pt-3 w-52 z-50',
          'transition-all duration-150 ease-out origin-top-right',
          open
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none',
        ].join(' ')}
      >
        <div
          className="rounded-xl border border-[var(--scheme-border)] p-4"
          style={{
            /* --muted is the only token that is visually elevated above --background
               in both light (95.9% lightness) and dark (15.9% lightness) themes.
               Solid — no backdrop-blur — so it never blends with the hero behind it. */
            background: 'hsl(var(--muted))',
            boxShadow:  '0 8px 32px var(--scheme-glow), 0 2px 12px rgba(0,0,0,0.18)',
          }}
        >
          {/* Identity */}
          <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-[var(--scheme-border)]">
            <Image
              src="/images/_hb-logo.png"
              alt=""
              aria-hidden="true"
              width={38}
              height={38}
              className="rounded-full ring-1 ring-[var(--scheme-border)] flex-shrink-0"
              unoptimized
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground leading-tight">
                Hammy Babar
              </p>
              <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                Backend Software Engineer
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <Link
              href="/about"
              className="text-xs text-[var(--scheme-accent-text)] hover:underline underline-offset-2 transition-colors"
            >
              {'About me →'}
            </Link>
            <Link
              href="/contact"
              className="text-xs text-[var(--scheme-accent-text)] hover:underline underline-offset-2 transition-colors"
            >
              {'Get in touch →'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
