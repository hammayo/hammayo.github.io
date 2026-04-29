import { notFound } from 'next/navigation';
import { Container } from '@/features/shared/container';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { PageViewEvent } from '@/features/shared/analytics-event';
import { PostHeader } from '@/features/blogs/post-header';
import { PostBody } from '@/features/blogs/post-body';
import { PostNav } from '@/features/blogs/post-nav';
import { PostStructuredData } from '@/features/blogs/post-structured-data';
import { ScrollProgress } from '@/features/blogs/scroll-progress';
import { getAllSlugs, getPostBySlug, getAllPostsMeta } from '@/features/blogs/pipeline';
import { SITE_URL } from '@/lib/constants';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title:       `${post.title} | Hammayo's Portfolio`,
    description: post.summary,
    authors:     [{ name: 'Hammy Babar', url: SITE_URL }],
    alternates:  { canonical: `${SITE_URL}/blogs/${slug}/` },
    openGraph: {
      title:         post.title,
      description:   post.summary,
      url:           `${SITE_URL}/blogs/${slug}/`,
      type:          'article',
      publishedTime: post.date,
      modifiedTime:  post.date,
      tags:          post.tags,
    },
    twitter: {
      title:       post.title,
      description: post.summary,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPostsMeta();
  const idx  = allPosts.findIndex(p => p.slug === slug);
  const prev = idx < allPosts.length - 1 ? allPosts[idx + 1] : null;
  const next = idx > 0                   ? allPosts[idx - 1] : null;

  return (
    <PageTransitionWrapper>
      <PostStructuredData post={post} slug={slug} />
      <PageViewEvent page="blog-post" />
      <ScrollProgress />
      <Container>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-[var(--scheme-accent-text)] transition-colors mb-6"
        >
          ← Back to writing
        </Link>
        <PostHeader post={post} />
        <PostBody content={post.content} />
        <PostNav prev={prev} next={next} />
      </Container>
    </PageTransitionWrapper>
  );
}
