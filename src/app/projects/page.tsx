import { Container } from "@/components/container";
import { Card } from "@/components/ui/card";
import { PageHeading } from "@/components/page-heading";
import { PageTransitionWrapper } from "@/components/page-transition-wrapper";
import Link from "next/link";
import type { Metadata } from "next";
import { fetchGitHubRepositories, type GitHubRepository } from "@/lib/github";

export const metadata: Metadata = {
  title: "Projects | Hammayo's Portfolio",
  description: "Explore my latest projects and open source contributions on GitHub.",
};

// This ensures the page revalidates every 1 hour
export const revalidate = 3600;

export default async function ProjectsPage() {
  // Fetch projects from GitHub
  const projects = await fetchGitHubRepositories({
    username: 'hammayo',
    maxRepos: 10,
    includeForked: false
  });

  const getLanguageColor = (language: string | null) => {
    if (!language) return {
      bg: "bg-gradient-to-r from-gray-500/10 to-slate-500/10",
      text: "text-gray-500",
      border: "border-gray-500/20"
    };

    const colors: Record<string, { bg: string, text: string, border: string }> = {
      JavaScript: {
        bg: "bg-gradient-to-r from-yellow-500/10 to-amber-500/10",
        text: "text-yellow-500",
        border: "border-yellow-500/20"
      },
      TypeScript: {
        bg: "bg-gradient-to-r from-blue-500/10 to-cyan-500/10",
        text: "text-blue-500",
        border: "border-blue-500/20"
      },
      Python: {
        bg: "bg-gradient-to-r from-green-500/10 to-emerald-500/10",
        text: "text-green-500",
        border: "border-green-500/20"
      },
      "C#": {
        bg: "bg-gradient-to-r from-purple-500/10 to-violet-500/10",
        text: "text-purple-500",
        border: "border-purple-500/20"
      },
      HTML: {
        bg: "bg-gradient-to-r from-orange-500/10 to-red-500/10",
        text: "text-orange-500",
        border: "border-orange-500/20"
      },
      CSS: {
        bg: "bg-gradient-to-r from-blue-400/10 to-indigo-400/10",
        text: "text-blue-400",
        border: "border-blue-400/20"
      },
      PHP: {
        bg: "bg-gradient-to-r from-indigo-600/10 to-purple-600/10",
        text: "text-indigo-500",
        border: "border-indigo-500/20"
      },
      Java: {
        bg: "bg-gradient-to-r from-red-700/10 to-orange-700/10",
        text: "text-red-600",
        border: "border-red-600/20"
      },
      Ruby: {
        bg: "bg-gradient-to-r from-red-500/10 to-pink-500/10",
        text: "text-red-500",
        border: "border-red-500/20"
      },
      Go: {
        bg: "bg-gradient-to-r from-blue-500/10 to-teal-500/10",
        text: "text-blue-500",
        border: "border-blue-500/20"
      },
      Rust: {
        bg: "bg-gradient-to-r from-orange-700/10 to-amber-700/10",
        text: "text-orange-700",
        border: "border-orange-700/20"
      },
      Kotlin: {
        bg: "bg-gradient-to-r from-purple-500/10 to-indigo-500/10",
        text: "text-purple-500",
        border: "border-purple-500/20"
      },
      Swift: {
        bg: "bg-gradient-to-r from-orange-500/10 to-red-500/10",
        text: "text-orange-500",
        border: "border-orange-500/20"
      },
      Shell: {
        bg: "bg-gradient-to-r from-green-700/10 to-emerald-700/10",
        text: "text-green-700",
        border: "border-green-700/20"
      }
    };

    return colors[language] || {
      bg: "bg-gradient-to-r from-gray-500/10 to-slate-500/10",
      text: "text-gray-500",
      border: "border-gray-500/20"
    };
  };

  // Function to format repository name for display
  const formatRepoName = (name: string) => {
    return name
      .replace(/-/g, ' ')
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <PageTransitionWrapper>
      <Container>
        <PageHeading
          title="Projects"
          description="My latest GitHub projects and open source contributions."
        />

        {projects.length === 0 ? (
          <div className="text-center p-8 border dark:border-zinc-800/50 border-zinc-200/50 dark:bg-black/20 bg-white/20 backdrop-blur-lg rounded-xl">
            <p className="text-lg text-muted-foreground">
              Unable to fetch GitHub repositories at the moment. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((project) => {
              const langColors = getLanguageColor(project.language);
              return (
                <Card
                  key={project.id}
                  className="overflow-hidden relative h-full backdrop-blur-lg border dark:border-zinc-800/50 border-zinc-200/50 dark:bg-black/20 bg-white/20 hover:shadow-lg hover:shadow-purple-500/5 dark:hover:shadow-purple-500/10 transition-all duration-300 group hover:border-purple-500/30"
                >
                  {/* Glassmorphic gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 from-purple-500/20 via-cyan-500/10 transition-opacity duration-700 group-hover:opacity-100 -z-10"
                       style={{ maskImage: "radial-gradient(180px at 0px 0px, white, transparent)", WebkitMaskImage: "radial-gradient(180px at 0px 0px, white, transparent)" }} />

                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-medium dark:text-zinc-200 text-zinc-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:via-cyan-500 group-hover:to-green-500 transition-all duration-300 tracking-tight">
                        {formatRepoName(project.name)}
                      </h3>
                      {project.language && (
                        <div className={`px-3 py-1 text-xs rounded-full ${langColors.bg} ${langColors.text} ${langColors.border} border tracking-tight`}>
                          {project.language}
                        </div>
                      )}
                    </div>

                    <p className="dark:text-zinc-400 text-zinc-600 mb-6 flex-grow tracking-tight">
                      {project.description || `A ${project.language || 'code'} repository for ${formatRepoName(project.name)}.`}
                    </p>

                    {project.topics && project.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.topics.slice(0, 3).map((topic, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 rounded-full dark:bg-zinc-800/50 bg-zinc-200/50 dark:text-zinc-300 text-zinc-700 tracking-tight"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-auto">
                      <Link
                        href={project.html_url}
                        target="_blank"
                        className="self-start px-5 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 hover:from-purple-600 hover:via-cyan-600 hover:to-green-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 tracking-tight">
                        View Project
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Container>
    </PageTransitionWrapper>
  );
}
