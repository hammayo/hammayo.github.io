import { SITE_URL } from '@/lib/constants';
import type { PostMeta } from './schema';

interface Props {
  post: PostMeta;
  slug: string;
}

export function PostStructuredData({ post, slug }: Props) {
  const postUrl = `${SITE_URL}/blogs/${slug}/`;

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    url: postUrl,
    keywords: post.tags.join(', '),
    author: { '@type': 'Person', name: 'Hammy Babar', url: SITE_URL },
    publisher: { '@type': 'Person', name: 'Hammy Babar', url: SITE_URL },
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Writing', item: `${SITE_URL}/blogs` },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
