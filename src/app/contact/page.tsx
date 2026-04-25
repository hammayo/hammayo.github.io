import type { Metadata } from 'next';
import { Container } from '@/features/shared/container';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { PageHeader } from '@/features/shared/page-header';
import { ContactCard } from '@/features/contact/contact-card';
import { PageViewEvent } from '@/features/shared/analytics-event';
import { SOCIAL } from '@/lib/constants';
import { createPageMetadata } from '@/lib/metadata';
import { AvailabilityBanner } from '@/features/contact/availability-banner';
import { contact } from '../../../content/contact';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export const metadata: Metadata = createPageMetadata('contact', '/contact');

const CONTACT_LINKS: Array<{
  icon: IconDefinition;
  iconColor: string;
  label: string;
  handle: string;
  link: string;
}> = [
  { icon: faGithub,   iconColor: '#6e5494', label: '', handle: 'hammayo',    link: SOCIAL.github },
  { icon: faLinkedin, iconColor: '#0077b5', label: '', handle: 'hammayo',    link: SOCIAL.linkedin },
  { icon: faEnvelope, iconColor: '#ea4335', label: '', handle: SOCIAL.email, link: `mailto:${SOCIAL.email}` },
];

export default function ContactPage() {
  return (
    <PageTransitionWrapper>
      <PageViewEvent page="contact" />
      <Container className="py-8">
        <PageHeader title="Contact" subtitle="Let's talk." />

        <div className="space-y-8">
          <div className="space-y-3">
            {contact.copy.map((paragraph, i) => (
              <p key={i} className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <AvailabilityBanner availability={contact.availability} />

          <div className="grid grid-cols-3 gap-4">
            {CONTACT_LINKS.map(({ link, ...props }, i) => (
              <ContactCard key={link} link={link} delay={i * 0.08} {...props} />
            ))}
          </div>
        </div>
      </Container>
    </PageTransitionWrapper>
  );
}
