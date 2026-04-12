"use client";

import { CardContent } from "@/features/shared/ui/card";
import type { GitHubRepository } from "@/lib/github";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { CardEffects, cardBaseClasses } from "@/features/shared/ui/card-effects";
import { Button } from "@/features/shared/ui/button";
import { accentTag } from "@/design/variants";
import { format } from "date-fns";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

interface ProjectCardProps {
  repo: GitHubRepository;
  index: number;
  featured?: boolean;
}

export function ProjectCard({ repo, index, featured = false }: ProjectCardProps) {
  return (
    <CardEffects
      variant={featured ? "featured" : "default"}
      className={`animate-in fade-in-50 duration-500 delay-${index * 100}`}
    >
      <CardContent className={`${cardBaseClasses.contentWrapper} ${
        featured ? 'min-h-[18rem]' : 'min-h-[16rem]'
      } flex flex-col`}>
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              {featured && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-600/70 dark:text-amber-400/60" fill="currentColor" />
                  <span className="text-xs font-medium text-amber-700/70 dark:text-amber-400/60">Featured</span>
                </div>
              )}
              <h3 className="text-lg font-semibold">{repo.name}</h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {repo.stargazers_count}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                {repo.forks_count}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4">{repo.description}</p>

          {/* Topics — scheme-aware accent tags */}
          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {repo.topics.map((topic) => (
                <span key={topic} className={accentTag()}>
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              {repo.language && (
                <span className="text-sm text-muted-foreground">{repo.language}</span>
              )}
              <span className="text-sm text-muted-foreground">
                Updated {format(new Date(repo.updated_at), 'MMM d, yyyy')}
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" asChild>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="w-4 h-4 mr-1" />
                  Code
                </a>
              </Button>
              {repo.homepage && (
                <Button variant="ghost" size="sm" asChild>
                  <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </CardEffects>
  );
}
