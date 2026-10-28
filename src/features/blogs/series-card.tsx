'use client';

import Link from 'next/link';
import { CardContent } from '@/features/shared/ui/card';
import { CardEffects, cardBaseClasses } from '@/features/shared/ui/card-effects';
import { gradientText, accentTag } from '@/design/variants';
import { cn } from '@/lib/utils';

interface SeriesCardProps {
  slug:       string;
  title:      string;
  meta:       string;
  blurb:      string;
  index:      number;
  featured?:  boolean;
}

export function SeriesCard({ slug, title, meta, blurb, index, featured = false }: SeriesCardProps) {
  return (
    <Link href={`/series/${slug}`} className="block h-full">
      <CardEffects
        variant={featured ? 'featured' : 'default'}
        delay={Math.min(index * 0.1, 0.5)}
        bordered={!featured}
      >
        <CardContent className={cn(cardBaseClasses.contentWrapper, 'min-h-[14rem] flex flex-col')}>
          <div className="flex-1 flex flex-col">
            <p className="text-xs text-muted-foreground mb-2">{meta}</p>
            <h2 className={cn(gradientText({ size: 'body' }), 'text-lg font-semibold mb-2 line-clamp-2')}>{title}</h2>
            <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{blurb}</p>
            {featured ? (
              <div className="flex flex-wrap gap-1.5 mt-3"><span className={accentTag()}>Flagship</span></div>
            ) : null}
          </div>
        </CardContent>
      </CardEffects>
    </Link>
  );
}
