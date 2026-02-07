export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Hammayo Babar',
    jobTitle: 'Backend Software Engineer',
    url: 'https://hammayo.github.io',
    sameAs: [
      'https://github.com/hammayo',
      'https://linkedin.com/in/hammayo',
    ],
    knowsAbout: ['Software Engineering', 'Backend Development', 'Microservices'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

