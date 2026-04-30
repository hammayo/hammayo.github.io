import { SITE_URL, SITE, SOCIAL } from '@/lib/constants';

export function StructuredData() {
  const personEntity = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
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

  const person = {
    '@context': 'https://schema.org',
    ...personEntity,
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE_URL,
    name: SITE.name,
  };

  const profilePage = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url:          `${SITE_URL}/about/`,
    dateCreated:  '2024-01-01',
    dateModified: '2026-04-29',
    mainEntity:   personEntity,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage) }}
      />
    </>
  );
}

