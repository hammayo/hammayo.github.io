'use client';

import Image from 'next/image';
import { accentTag, GRADIENT_GLASS } from '@/design/variants';
import imageLoader from '@/lib/imageLoader';
import type { about as AboutType } from '../../../content/about';
import { basePath } from '@/lib/env';
import { TimelineSection } from './timeline-section';

interface AboutContentProps {
  about: typeof AboutType;
}

export function AboutContent({ about }: AboutContentProps) {
  const fallbackSrc = `${basePath}/images/_hb-logo.png`;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Avatar + name row */}
      <div className="flex items-center gap-5">
        <div className="relative flex-shrink-0">
          <Image
            loader={imageLoader}
            src={about.avatarPath}
            alt={about.name}
            width={80}
            height={80}
            className="rounded-full ring-2 ring-[var(--scheme-border)]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = fallbackSrc;
            }}
            unoptimized
          />
        </div>
        <div>
          <p className="text-lg font-semibold">
            <span
              className="hidden md:inline animate-gradient text-transparent bg-clip-text"
              style={{ backgroundImage: GRADIENT_GLASS, backgroundSize: '400%' }}
            >{about.name}</span>
            <span
              className="md:hidden animate-gradient text-transparent bg-clip-text"
              style={{ backgroundImage: GRADIENT_GLASS, backgroundSize: '400%' }}
            >{about.shortName}</span>
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-4">
        {about.bio.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Career Timeline */}
      <TimelineSection timeline={about.careerTimeline} />

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
