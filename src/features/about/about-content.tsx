'use client';

import Image from 'next/image';
import { gradientText, accentTag } from '@/design/variants';
import { basePath } from '@/lib/env';
import imageLoader from '@/lib/imageLoader';
import type { about as AboutType } from '../../../content/about';

interface AboutContentProps {
  about: typeof AboutType;
}

export function AboutContent({ about }: AboutContentProps) {
  const avatarSrc = `${basePath}${about.avatarPath}`;
  const fallbackSrc = `${basePath}/_hb-logo.png`;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Hero row: avatar + name + tagline */}
      <div className="flex items-start gap-5">
        <div className="relative flex-shrink-0">
          <Image
            loader={imageLoader}
            src={avatarSrc}
            alt={about.name}
            width={80}
            height={80}
            className="rounded-full ring-2 ring-[var(--scheme-border)] scheme-glow"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = fallbackSrc;
            }}
            unoptimized
          />
        </div>
        <div>
          <h1 className={gradientText({ size: 'heading' })}>
            <span className="hidden md:inline animate-gradient"
              style={{ backgroundImage: 'linear-gradient(to right, #a855f7, #818cf8, #38bdf8, #34d399, #f472b6, #a855f7)', backgroundSize: '400%' }}
            >{about.name}</span>
            <span className="md:hidden animate-gradient"
              style={{ backgroundImage: 'linear-gradient(to right, #a855f7, #818cf8, #38bdf8, #34d399, #f472b6, #a855f7)', backgroundSize: '400%' }}
            >{about.shortName}</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{about.tagline}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{about.bio}</p>

      {/* Sectors */}
      <div className="space-y-2">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground">Sectors & Domains</h2>
        <div className="flex flex-wrap gap-2">
          {about.sectors.map((sector) => (
            <span key={sector} className={accentTag()}>
              {sector}
            </span>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div className="border-l-2 border-[var(--scheme-border)] pl-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Philosophy</p>
        <p className="text-sm md:text-base italic text-foreground/80">&ldquo;{about.philosophy}&rdquo;</p>
      </div>
    </div>
  );
}
