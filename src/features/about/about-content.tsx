'use client';

import Image from 'next/image';
import { accentTag } from '@/design/variants';
import imageLoader from '@/lib/imageLoader';
import type { about as AboutType } from '../../../content/about';
import { basePath } from '@/lib/env';
import { TimelineSection } from './timeline-section';
import { PageHeader } from '@/features/shared/page-header';

interface AboutContentProps {
  about: typeof AboutType;
}

export function AboutContent({ about }: AboutContentProps) {
  const fallbackSrc = `${basePath}/images/_hb-logo.png`;

  return (
    <div className="space-y-8">
      {/* Page title row: title/tagline left, avatar + name right */}
      <div className="flex items-start justify-between gap-6">
        <PageHeader title="About" subtitle={about.tagline} className="mb-0" />
        <div className="flex items-center gap-3 flex-shrink-0">
          <p className="text-sm font-semibold text-right hidden sm:block">
            <span className="animate-gradient gradient-text"></span>
          </p>
          <Image
            loader={imageLoader}
            src={about.avatarPath}
            alt={about.name}
            width={72}
            height={72}
            className="rounded-full ring-2 ring-[var(--scheme-border)]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = fallbackSrc;
            }}
            unoptimized
          />
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
      <div className="max-w-2xl">
        <TimelineSection timeline={about.careerTimeline} />
      </div>

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
