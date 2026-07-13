import Link from 'next/link';
import { glowCard, accentTag } from '@/design/variants';
import { series } from '../../../content/series';

export function SeriesStrip() {
  return (
    <Link href="/series" className={glowCard({ variant: 'featured' }) + ' block px-6 py-4'}>
      <div className="flex flex-col items-center justify-center gap-2 text-sm sm:flex-row sm:gap-3">
        <span className={accentTag({ variant: 'scheme' })}>Series</span>
        <span className="font-semibold gradient-text">{series.title}</span>
        <span className="text-muted-foreground">Read it →</span>
      </div>
    </Link>
  );
}
