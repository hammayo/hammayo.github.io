import type { Metadata } from 'next';
import { Container } from '@/features/shared/container';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { AboutContent } from '@/features/about/about-content';
import { createPageMetadata } from '@/lib/metadata';
import { about } from '../../../content/about';

export const metadata: Metadata = createPageMetadata('about', '/about');

export default function AboutPage() {
  return (
    <PageTransitionWrapper>
      <Container className="py-8">
        <AboutContent about={about} />
      </Container>
    </PageTransitionWrapper>
  );
}
