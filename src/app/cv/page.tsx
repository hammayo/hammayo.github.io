import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/features/shared/container';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { PageViewEvent } from '@/features/shared/analytics-event';
import { createPageMetadata } from '@/lib/metadata';
import { accentTag, ctaButton, glowCard, gradientText } from '@/design/variants';
import { cn } from '@/lib/utils';
import { cv } from '../../../content/cv';

export const metadata: Metadata = createPageMetadata('cv', '/cv');

const sectionLabel = 'text-xs uppercase tracking-widest text-muted-foreground';

export default function CVPage() {
  const open     = cv.selectedWork.filter((w) => w.kind === 'open');
  const employer = cv.selectedWork.filter((w) => w.kind === 'employer');

  return (
    <PageTransitionWrapper>
      <PageViewEvent page="cv" />
      <Container className="py-8 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <h1 className={gradientText({ size: 'heading' })}>CV</h1>
          <div className="h-0.5 w-10 rounded-full gradient-bg scheme-glow" />
          <p className="text-base md:text-lg text-foreground/90">{cv.headline}</p>
          <ul className="flex flex-wrap gap-2">
            {cv.facts.map((fact) => (
              <li key={fact} className={accentTag({ variant: 'muted' })}>{fact}</li>
            ))}
          </ul>
        </div>

        {/* Stack */}
        <section className="space-y-3">
          <h2 className={sectionLabel}>Stack</h2>
          <div className="space-y-3">
            {cv.skillGroups.map((group) => (
              <div key={group.label} className="space-y-1.5">
                <p className="text-sm font-medium text-foreground">{group.label}</p>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className={accentTag()}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Selected work */}
        <section className="space-y-4">
          <h2 className={sectionLabel}>Selected work</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {open.map((work) => (
              <article key={work.title} className={cn(glowCard({ variant: 'featured' }), 'p-5 space-y-3')}>
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold text-foreground">{work.title}</h3>
                  <span className="text-xs text-muted-foreground">Personal, open</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{work.summary}</p>
                <ul className="flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <li key={tag} className={accentTag({ variant: 'muted' })}>{tag}</li>
                  ))}
                </ul>
                {work.href ? (
                  <Link href={work.href} className="inline-block text-sm text-[var(--scheme-accent-text)] hover:underline underline-offset-2">
                    {`${work.hrefLabel} →`}
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {employer.map((work) => (
              <article key={work.title} className={cn(glowCard(), 'p-5 space-y-2')}>
                <h3 className="text-sm font-semibold text-foreground">{work.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{work.summary}</p>
                <ul className="flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <li key={tag} className={accentTag({ variant: 'muted' })}>{tag}</li>
                  ))}
                </ul>
                {work.href ? (
                  <Link href={work.href} className="inline-block text-sm text-[var(--scheme-accent-text)] hover:underline underline-offset-2">
                    {`${work.hrefLabel} →`}
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        {/* How I work */}
        <section className="space-y-3">
          <h2 className={sectionLabel}>How I work</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {cv.principles.map((p) => (
              <li key={p.title} className="border-l-2 border-[var(--scheme-border)] pl-4">
                <p className="text-sm font-semibold text-foreground">{p.title}</p>
                <p className="text-sm text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Employers */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className={sectionLabel}>Employers</h2>
            <Link href="/about#career" className="text-xs text-[var(--scheme-accent-text)] hover:underline underline-offset-2">
              {'Full career →'}
            </Link>
          </div>
          <ul>
            {cv.employers.map((e) => (
              <li key={e.company} className="flex flex-wrap items-baseline justify-between gap-x-4 py-2 border-b border-[var(--scheme-border)]">
                <span className="text-sm text-foreground">
                  {e.company} <span className="text-muted-foreground">· {e.role}</span>
                </span>
                <span className="text-xs text-muted-foreground">{e.period}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground">{cv.education}</p>
        </section>

        {/* CTA */}
        <section className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <a href={cv.requestCv.mailto} className={ctaButton({ variant: 'gradient' })}>
              {cv.requestCv.label}
            </a>
            <a href={cv.linkedIn} target="_blank" rel="noopener noreferrer" className={ctaButton({ variant: 'ghost' })}>
              LinkedIn
            </a>
            <a href={cv.github} target="_blank" rel="noopener noreferrer" className={ctaButton({ variant: 'ghost' })}>
              GitHub
            </a>
          </div>
          <p className="text-xs text-muted-foreground max-w-xl">{cv.requestCv.note}</p>
        </section>
      </Container>
    </PageTransitionWrapper>
  );
}
