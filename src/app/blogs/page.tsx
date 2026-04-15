import type { Metadata } from 'next';
import { Container } from '@/features/shared/container';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { PageViewEvent } from '@/features/shared/analytics-event';
import { PageHeader } from '@/features/shared/page-header';
import { createPageMetadata } from '@/lib/metadata';
import { getAllPostsMeta } from '@/features/blogs/pipeline';
import { BlogList } from '@/features/blogs/blog-list';
import { blogsConfig } from '../../../content/blogs';

export const metadata: Metadata = createPageMetadata('blogs', '/blogs');

export default function BlogsPage() {
  const posts = getAllPostsMeta();

  const subtitle = posts.length > 0
    ? `${posts.length} post${posts.length === 1 ? '' : 's'} on backend engineering, architecture, and the craft.`
    : 'Technical writing on backend systems, architecture, and engineering craft.';

  return (
    <PageTransitionWrapper>
      <PageViewEvent page="blogs" />
      <Container>
        <PageHeader title="Writing" subtitle={subtitle} className="mb-8" />

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
