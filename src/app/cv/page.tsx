import type { Metadata } from 'next';
import { Container } from '@/features/shared/container';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { PageViewEvent } from '@/features/shared/analytics-event';
import { createPageMetadata } from '@/lib/metadata';
import { gradientText } from '@/design/variants';
import { cv } from '../../../content/cv';

export const metadata: Metadata = createPageMetadata('cv', '/cv');

export default function CVPage() {
  return (
    <PageTransitionWrapper>
      <PageViewEvent page="cv" />
      <Container className="py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <h1 className={gradientText({ size: 'heading' })}>CV</h1>
            <span className="text-xs px-3 py-1 rounded-full border border-[var(--scheme-border)] text-[var(--scheme-accent-text)]">
              Coming soon
            </span>
          </div>
          <div className="h-0.5 w-10 rounded-full gradient-bg scheme-glow mt-2" />
          <p className="text-muted-foreground mt-2">{cv.placeholderText}</p>
        </div>
        <a
          href={cv.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[var(--scheme-accent-text)] hover:underline"
        >
          {'View LinkedIn Profile →'}
        </a>
      </Container>
    </PageTransitionWrapper>
  );
}
