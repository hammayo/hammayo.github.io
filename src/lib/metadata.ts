import type { Metadata } from 'next';
import { PAGE_META, SITE_URL } from './constants';

type PageKey = keyof typeof PAGE_META;

export function createPageMetadata(key: PageKey, urlPath: string): Metadata {
  const meta = PAGE_META[key];
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}${urlPath}`,
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    },
  };
}
