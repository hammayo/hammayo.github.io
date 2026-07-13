import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/features/shared/container';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { PageHeader } from '@/features/shared/page-header';
import { PageViewEvent } from '@/features/shared/analytics-event';
import { getAllPostsMeta } from '@/features/blogs/pipeline';
import { glowCard, accentTag, gradientText, ctaButton } from '@/design/variants';
import { SOCIAL } from '@/lib/constants';
import { createPageMetadata } from '@/lib/metadata';
import { series } from '../../../content/series';

export const metadata: Metadata = createPageMetadata('series', '/series');

export default function SeriesPage() {
  const parts = getAllPostsMeta()
    .filter(p => p.series?.name === series.name)
    .sort((a, b) => (a.series!.part) - (b.series!.part));

  return (
    <PageTransitionWrapper>
      <PageViewEvent page="series" />
      <Container className="py-8">
        <PageHeader title={series.title} subtitle={series.tagline} />

        <div className="space-y-3">
          {series.description.map((paragraph, i) => (
            <p key={i} className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {parts.map(post => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className={glowCard({ variant: 'default' }) + ' block p-5'}
            >
              <div className="flex items-start gap-4">
                <span className={accentTag({ variant: 'scheme' })}>
                  {`Part ${post.series!.part}`}
                </span>
                <div className="flex-1">
                  <h2 className="font-semibold text-foreground">{post.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{post.summary}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <section
          className={
            glowCard({ variant: 'featured' }) +
            ' mt-12 flex flex-col items-center gap-4 p-6 text-center md:p-8'
          }
        >
          <h2 className={gradientText({ size: 'heading' })}>This series is becoming a course</h2>
          <p className="max-w-lg text-sm text-muted-foreground md:text-base">
            Spec-Driven is being turned into a full course. Email me to join the waitlist and
            hear when it launches.
          </p>
          <a
            href={`mailto:${SOCIAL.email}?subject=Course%20waitlist`}
            className={ctaButton({ variant: 'gradient' })}
          >
            Join the waitlist
          </a>
        </section>
      </Container>
    </PageTransitionWrapper>
  );
}
