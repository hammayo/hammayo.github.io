import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getAllPostsMeta } from '@/features/blogs/pipeline';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsMeta();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url:             SITE_URL,
      lastModified:    new Date('2024-01-01'),
      changeFrequency: 'monthly',
      priority:        1,
    },
    {
      url:             `${SITE_URL}/about`,
      lastModified:    new Date('2024-01-01'),
      changeFrequency: 'monthly',
      priority:        0.8,
    },
    {
      url:             `${SITE_URL}/projects`,
      lastModified:    new Date('2025-06-01'),
      changeFrequency: 'monthly',
      priority:        0.8,
    },
    {
      url:             `${SITE_URL}/blogs`,
      lastModified:    new Date(posts[0]?.date ?? '2024-01-01'),
      changeFrequency: 'weekly',
      priority:        0.8,
    },
    {
      url:             `${SITE_URL}/cv`,
      lastModified:    new Date('2024-01-01'),
      changeFrequency: 'monthly',
      priority:        0.6,
    },
    {
      url:             `${SITE_URL}/contact`,
      lastModified:    new Date('2024-01-01'),
      changeFrequency: 'monthly',
      priority:        0.5,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map(post => ({
    url:             `${SITE_URL}/blogs/${post.slug}`,
    lastModified:    new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority:        0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
