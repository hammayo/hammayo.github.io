import { SITE_URL, SITE, SOCIAL } from '@/lib/constants';

export function StructuredData() {
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Hammayo Babar',
    jobTitle: 'Backend Software Engineer',
    description: SITE.description,
    url: SITE_URL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sutton',
      addressRegion: 'London',
      addressCountry: 'GB',
    },
    sameAs: [SOCIAL.github, SOCIAL.linkedin],
    knowsAbout: [
      'C#', '.NET', 'Azure', 'Docker', 'microservices',
      'HMPPS', 'MoJ', 'finance', 'justice', 'CI/CD',
      'backend engineering', 'payment systems',
    ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE_URL,
    name: SITE.name,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

