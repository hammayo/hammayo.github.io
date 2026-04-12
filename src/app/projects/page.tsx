import { Container } from "@/features/shared/container";
import { PageTransitionWrapper } from "@/features/shared/page-transition-wrapper";
import { ProjectCard } from "@/features/projects/project-card";
import { fetchGitHubData } from "@/lib/github";
import type { Metadata } from "next";
import { PageViewEvent } from "@/features/shared/analytics-event";
import { PAGE_META, SITE_URL } from "@/lib/constants";
import { gradientText } from "@/design/variants";

export const metadata: Metadata = {
  title: PAGE_META.projects.title,
  description: PAGE_META.projects.description,
  openGraph: {
    title: PAGE_META.projects.title,
    description: PAGE_META.projects.description,
    url: `${SITE_URL}/projects`,
  },
  twitter: {
    title: PAGE_META.projects.title,
    description: PAGE_META.projects.description,
  },
};

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
        <div className="mb-6">
          <h1 className={gradientText({ size: 'heading' })}>Projects</h1>
          <p className="text-muted-foreground">Explore my most recent projects and open source contributions.</p>
        </div>

        {pinnedRepos.length === 0 && otherRepos.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-lg text-muted-foreground">
              Unable to fetch GitHub repositories at the moment. Please check back later.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Recent Pinned Projects Section */}
            {recentPinnedRepos.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-zinc-200">Featured Projects</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {recentPinnedRepos.map((project, index) => (
                    <ProjectCard 
                      key={project.id} 
                      repo={project} 
                      index={index}
                      featured={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Other Pinned Projects Section */}
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

            {/* Other Projects Section */}
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
