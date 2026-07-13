import type { Metadata } from 'next';
import { Container } from '@/features/shared/container';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { PageHeader } from '@/features/shared/page-header';
import { PageViewEvent } from '@/features/shared/analytics-event';
import { glowCard, accentTag, ctaButton } from '@/design/variants';
import { SOCIAL } from '@/lib/constants';
import { createPageMetadata } from '@/lib/metadata';
import { services } from '../../../content/services';

export const metadata: Metadata = createPageMetadata('services', '/services');

export default function ServicesPage() {
  return (
    <PageTransitionWrapper>
      <PageViewEvent page="services" />
      <Container className="py-8">
        <PageHeader title="Services" subtitle="Built properly. Looked after." />

        <div className="space-y-3">
          {services.intro.map((paragraph, i) => (
            <p key={i} className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {services.offers.map(offer => (
            <div key={offer.title} className={glowCard({ variant: 'default' }) + ' flex flex-col p-6'}>
              <span className={accentTag({ variant: 'scheme' })}>{offer.price}</span>
              <h2 className="mt-3 font-semibold text-foreground">{offer.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{offer.blurb}</p>
              <ul className="mt-4 flex-1 space-y-2">
                {offer.bullets.map(bullet => (
                  <li key={bullet} className="text-sm text-muted-foreground leading-relaxed">
                    <span className="text-[var(--scheme-accent-text)]">— </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href={`mailto:${SOCIAL.email}?subject=Project%20enquiry`}
            className={ctaButton({ variant: 'gradient' })}
          >
            Email me about a project
          </a>
          <p className="max-w-md text-center text-sm text-muted-foreground">{services.note}</p>
        </div>
      </Container>
    </PageTransitionWrapper>
  );
}
