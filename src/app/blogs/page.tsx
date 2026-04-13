import { Container } from '@/features/shared/container';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { PageViewEvent } from '@/features/shared/analytics-event';
import { PAGE_META, SITE_URL } from '@/lib/constants';
import { gradientText } from '@/design/variants';
import { getAllPostsMeta } from '@/features/blogs/pipeline';
import { BlogList } from '@/features/blogs/blog-list';
import { blogsConfig } from '../../../content/blogs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: PAGE_META.blogs.title,
  description: PAGE_META.blogs.description,
  openGraph: {
    title: PAGE_META.blogs.title,
    description: PAGE_META.blogs.description,
    url: `${SITE_URL}/blogs`,
  },
  twitter: {
    title: PAGE_META.blogs.title,
    description: PAGE_META.blogs.description,
  },
};

export default function BlogsPage() {
  const posts = getAllPostsMeta();

  return (
    <PageTransitionWrapper>
      <PageViewEvent page="blogs" />
      <Container>
        <div className="mb-8">
          <h1 className={gradientText({ size: 'heading' })}>Writing</h1>
          <p className="text-muted-foreground mt-1">
            {posts.length > 0
              ? `${posts.length} post${posts.length === 1 ? '' : 's'} on backend engineering, architecture, and the craft.`
              : 'Technical writing on backend systems, architecture, and engineering craft.'}
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8">
            No posts yet — check back soon.
          </p>
        ) : (
          <BlogList posts={posts} pinnedTags={blogsConfig.pinnedTags} />
        )}
      </Container>
    </PageTransitionWrapper>
  );
}
