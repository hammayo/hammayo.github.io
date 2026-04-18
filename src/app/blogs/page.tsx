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

  const authoredSubtitle = 'Practical writing on .NET, Docker, CI/CD, and engineering in regulated environments.';
  const postCount = posts.length > 0
    ? `${posts.length} post${posts.length === 1 ? '' : 's'}`
    : null;

  return (
    <PageTransitionWrapper>
      <PageViewEvent page="blogs" />
      <Container className="py-8">
        <PageHeader title="Writing" subtitle={authoredSubtitle} className="mb-2" />
        {postCount && (
          <p className="text-xs text-muted-foreground mb-8">{postCount}</p>
        )}

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
