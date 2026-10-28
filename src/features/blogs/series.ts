// src/features/blogs/series.ts
// Derives series groups from post frontmatter (server only). Series name is the key;
// the URL slug is the slugified name, so a new series needs no config.
import { getAllPostsMeta } from './pipeline';
import type { PostMeta } from './schema';
import { featuredSeries } from '../../../content/series';

export type SeriesGroup = { slug: string; name: string; posts: PostMeta[] };

export const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Published series, featured first, then most recently updated first. */
export function getAllSeries(): SeriesGroup[] {
  const byName = new Map<string, PostMeta[]>();
  for (const post of getAllPostsMeta()) {
    if (!post.published || !post.series) continue;
    byName.set(post.series.name, [...(byName.get(post.series.name) ?? []), post]);
  }

  const groups = [...byName].map(([name, posts]) => ({
    slug:  slugify(name),
    name,
    posts: posts.toSorted((a, b) => a.series!.part - b.series!.part),
  }));

  const latest = (g: SeriesGroup) => Math.max(...g.posts.map(p => +new Date(p.date)));
  const rank   = (g: SeriesGroup) => { const i = featuredSeries.indexOf(g.name); return i < 0 ? Infinity : i; };
  return groups.sort((a, b) => (rank(a) - rank(b) || 0) || latest(b) - latest(a));
}

export function getSeriesBySlug(slug: string): SeriesGroup | undefined {
  return getAllSeries().find(g => g.slug === slug);
}

/** "Name, Part 3: The Title" -> "The Title". */
export const stripPartPrefix = (title: string) => title.replace(/^.*?Part \d+:\s*/, '');
