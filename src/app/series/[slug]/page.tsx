import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/features/shared/container';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { PageHeader } from '@/features/shared/page-header';
import { PageViewEvent } from '@/features/shared/analytics-event';
import { BlogCard } from '@/features/blogs/blog-card';
import { getAllSeries, getSeriesBySlug } from '@/features/blogs/series';
import { glowCard, gradientText, ctaButton } from '@/design/variants';
import { SITE_URL, SOCIAL } from '@/lib/constants';
import { series as flagship } from '../../../../content/series';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSeries().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const group = getSeriesBySlug((await params).slug);
  if (!group) return {};
  const title       = `${group.name === flagship.name ? flagship.title : group.name} | Hammayo's Portfolio`;
  const description = group.name === flagship.name
    ? flagship.description[0]
    : `${group.posts.length} parts. Starts with: ${group.posts[0].title}.`;
  const url = `${SITE_URL}/series/${group.slug}/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph:  { title, description, url },
    twitter:    { title, description },
  };
}

export default async function SeriesDetailPage({ params }: Props) {
  const group = getSeriesBySlug((await params).slug);
  if (!group) notFound();

  const isFlagship = group.name === flagship.name;

  return (
    <PageTransitionWrapper>
      <PageViewEvent page="series" />
      <Container className="py-8">
        <PageHeader
          title={isFlagship ? flagship.title : group.name}
          subtitle={isFlagship ? flagship.tagline : `${group.posts.length} parts, in reading order.`}
          className="mb-4"
        />

        {isFlagship ? (
          <div className="space-y-3">
            {flagship.description.map((paragraph, i) => (
              <p key={i} className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {group.posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>

        {isFlagship ? (
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
        ) : null}
      </Container>
    </PageTransitionWrapper>
  );
}
