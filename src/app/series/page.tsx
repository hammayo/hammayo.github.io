import type { Metadata } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import { Container } from '@/features/shared/container';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { PageHeader } from '@/features/shared/page-header';
import { PageViewEvent } from '@/features/shared/analytics-event';
import { getAllSeries, stripPartPrefix } from '@/features/blogs/series';
import { accentTag, glowCard } from '@/design/variants';
import { createPageMetadata } from '@/lib/metadata';
import { series as flagship } from '../../../content/series';

export const metadata: Metadata = createPageMetadata('series', '/series');

const range = (dates: string[]) => {
  const [first, last] = [dates[0], dates[dates.length - 1]].map(d => format(new Date(d), 'MMM yyyy'));
  return first === last ? first : `${first} – ${last}`;
};

export default function SeriesPage() {
  const all = getAllSeries();

  return (
    <PageTransitionWrapper>
      <PageViewEvent page="series" />
      <Container className="py-8">
        <PageHeader title="Series" subtitle="Multi-part writing, in reading order." />

        <div className="grid gap-4 md:grid-cols-2">
          {all.map(({ slug, name, posts }) => {
            const isFlagship = name === flagship.name;
            const dates = posts.map(p => p.date).sort();
            return (
              <Link
                key={slug}
                href={`/series/${slug}`}
                className={glowCard({ variant: isFlagship ? 'featured' : 'default' }) + ' block p-5 space-y-2'}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold text-foreground">{isFlagship ? flagship.title : name}</h2>
                  {isFlagship ? <span className={accentTag()}>Flagship</span> : null}
                </div>
                <p className="text-xs text-muted-foreground">
                  {`${posts.length} ${posts.length === 1 ? 'part' : 'parts'} · ${range(dates)}`}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isFlagship ? flagship.tagline : `Starts with: ${stripPartPrefix(posts[0].title)}`}
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </PageTransitionWrapper>
  );
}
