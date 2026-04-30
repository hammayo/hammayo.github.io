import type { Metadata } from 'next';
import { Container } from '@/features/shared/container';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { AboutContent } from '@/features/about/about-content';
import { createPageMetadata } from '@/lib/metadata';
import { about } from '../../../content/about';
import { getAllPostsMeta } from '@/features/blogs/pipeline';

export const metadata: Metadata = createPageMetadata('about', '/about');

export default function AboutPage() {
  const recentPosts = getAllPostsMeta().slice(0, 3);

  return (
    <PageTransitionWrapper>
      <Container className="py-8">
        <AboutContent about={about} recentPosts={recentPosts} />
      </Container>
    </PageTransitionWrapper>
  );
}
