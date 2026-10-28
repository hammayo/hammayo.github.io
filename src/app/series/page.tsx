import type { Metadata } from 'next';
import { format } from 'date-fns';
import { Container } from '@/features/shared/container';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { PageHeader } from '@/features/shared/page-header';
import { PageViewEvent } from '@/features/shared/analytics-event';
import { getAllSeries, stripPartPrefix } from '@/features/blogs/series';
import { SeriesCard } from '@/features/blogs/series-card';
import { createPageMetadata } from '@/lib/metadata';
import { series as flagship, featuredSeries, featuredBlurbs } from '../../../content/series';

export const metadata: Metadata = createPageMetadata('series', '/series');

const range = (dates: string[]) => {
  const [first, last] = [dates[0], dates.at(-1) ?? dates[0]].map(d => format(new Date(d), 'MMM yyyy'));
  return first === last ? first : `${first} – ${last}`;
};

export default function SeriesPage() {
  const all = getAllSeries();

  return (
    <PageTransitionWrapper>
      <PageViewEvent page="series" />
      <Container className="py-8">
        <PageHeader title="Series" subtitle="Multi-part writing, in reading order." className="mb-4" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {all.map(({ slug, name, posts }, i) => {
            const isFeatured = featuredSeries.includes(name);
            const dates = posts.map(p => p.date).toSorted((a, b) => a.localeCompare(b));
            return (
              <SeriesCard
                key={slug}
                slug={slug}
                index={i}
                featured={isFeatured}
                title={name === flagship.name ? flagship.title : name}
                meta={`${posts.length} ${posts.length === 1 ? 'part' : 'parts'} · ${range(dates)}`}
                blurb={name === flagship.name ? flagship.tagline : featuredBlurbs[name] ?? `Starts with: ${stripPartPrefix(posts[0].title)}`}
              />
            );
          })}
        </div>
      </Container>
    </PageTransitionWrapper>
  );
}
