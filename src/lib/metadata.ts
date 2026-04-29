import type { Metadata } from 'next';
import { PAGE_META, SITE_URL } from './constants';

type PageKey = keyof typeof PAGE_META;

export function createPageMetadata(key: PageKey, urlPath: string): Metadata {
  const meta = PAGE_META[key];
  const path = urlPath.endsWith('/') ? urlPath : `${urlPath}/`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${SITE_URL}${path}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}${path}`,
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    },
  };
}
