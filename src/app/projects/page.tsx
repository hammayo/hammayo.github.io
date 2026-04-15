import type { Metadata } from 'next';
import { Container } from '@/features/shared/container';
import { PageTransitionWrapper } from '@/features/shared/page-transition-wrapper';
import { PageHeader } from '@/features/shared/page-header';
import { ProjectCard } from '@/features/projects/project-card';
import { fetchGitHubData } from '@/lib/github';
import { PageViewEvent } from '@/features/shared/analytics-event';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata('projects', '/projects');

// This ensures the page revalidates every 1 hour
export const revalidate = 3600;

export default async function ProjectsPage() {
  const { pinnedRepos, otherRepos } = await fetchGitHubData({
    username: 'hammayo',
    maxRepos: 5,
    includeForked: true
  });

  // Get the two most recent pinned repos
  const recentPinnedRepos = pinnedRepos
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 2);

  // Get remaining pinned repos
  const remainingPinnedRepos = pinnedRepos
    .filter(repo => !recentPinnedRepos.some(r => r.name === repo.name));

  return (
    <PageTransitionWrapper>
      <PageViewEvent page="projects" />
      <Container>
        <PageHeader
          title="Projects"
          subtitle="Explore my most recent projects and open source contributions."
        />

        {pinnedRepos.length === 0 && otherRepos.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-lg text-muted-foreground">
              Unable to fetch GitHub repositories at the moment. Please check back later.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {recentPinnedRepos.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-zinc-200">Featured Projects</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {recentPinnedRepos.map((project, index) => (
                    <ProjectCard key={project.id} repo={project} index={index} featured />
                  ))}
                </div>
              </div>
            )}

            {remainingPinnedRepos.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-zinc-200">Other Pinned Projects</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {remainingPinnedRepos.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      repo={project}
                      index={index + recentPinnedRepos.length}
                    />
                  ))}
                </div>
              </div>
            )}

            {otherRepos.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-zinc-200">Other Projects</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {otherRepos.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      repo={project}
                      index={index + recentPinnedRepos.length + remainingPinnedRepos.length}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </PageTransitionWrapper>
  );
}
