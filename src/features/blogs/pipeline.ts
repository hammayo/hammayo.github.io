// src/features/blogs/pipeline.ts
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import { PostSchema, type PostMeta, type Post } from './schema';
import { mdxComponents } from './mdx-components';
import { basePath } from '@/lib/env';

const BLOGS_DIR = join(process.cwd(), 'content', 'blogs');
const IS_DEV    = process.env.NODE_ENV === 'development';

function folderToSlug(folderName: string): string {
  return folderName.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

function computeReadingTime(source: string): number {
  const withoutFrontmatter = source.replace(/^---[\s\S]*?---/, '');
  const words = withoutFrontmatter.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function rewriteAssetPaths(source: string, slug: string): string {
  const base = basePath || '';
  return source.replace(/\(\.\/assets\//g, `(${base}/blog-assets/${slug}/`);
}

export function getAllPostsMeta(): PostMeta[] {
  if (!existsSync(BLOGS_DIR)) {
    console.warn('[pipeline] content/blogs directory not found — returning empty list');
    return [];
  }

  const folders = readdirSync(BLOGS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  const posts: PostMeta[] = [];

  for (const folder of folders) {
    const mdxPath = join(BLOGS_DIR, folder, 'index.mdx');
    if (!existsSync(mdxPath)) continue;

    const raw  = readFileSync(mdxPath, 'utf-8');
    const slug = folderToSlug(folder);

    let frontmatter: Record<string, unknown>;
    try {
      const parsed = matter(raw);
      frontmatter = parsed.data;
    } catch {
      console.error(`[pipeline] Failed to parse frontmatter in ${folder}/index.mdx — skipping`);
      continue;
    }

    const result = PostSchema.safeParse(frontmatter);
    if (!result.success) {
      const msg = `[pipeline] Invalid frontmatter in ${folder}/index.mdx:\n${JSON.stringify(result.error.flatten(), null, 2)}`;
      if (frontmatter.published !== false) {
        throw new Error(msg);
      }
      console.warn(msg);
      continue;
    }

    const data = result.data;
    if (!IS_DEV && !data.published) continue;

    posts.push({
      ...data,
      slug,
      readingTime: data.readingTime ?? computeReadingTime(raw),
      tags: data.tags.map(t => t.toLowerCase()),
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllSlugs(): string[] {
  return getAllPostsMeta().map(p => p.slug);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!existsSync(BLOGS_DIR)) return null;

  const folders = readdirSync(BLOGS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  const folder = folders.find(f => folderToSlug(f) === slug);
  if (!folder) return null;

  const mdxPath = join(BLOGS_DIR, folder, 'index.mdx');
  if (!existsSync(mdxPath)) return null;

  const raw    = readFileSync(mdxPath, 'utf-8');
  const source = rewriteAssetPaths(raw, slug);

  const { content, frontmatter } = await compileMDX<Record<string, unknown>>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          [rehypePrettyCode, {
            theme: { dark: 'tokyo-night', light: 'github-light' },
            defaultColor: 'light',
          }],
        ],
      },
    },
    components: mdxComponents,
  });

  const result = PostSchema.safeParse(frontmatter);
  if (!result.success) {
    throw new Error(`[pipeline] Invalid frontmatter for slug "${slug}"`);
  }

  const data = result.data;
  if (!IS_DEV && !data.published) return null;

  return {
    ...data,
    slug,
    readingTime: data.readingTime ?? computeReadingTime(raw),
    tags: data.tags.map(t => t.toLowerCase()),
    content,
  };
}
