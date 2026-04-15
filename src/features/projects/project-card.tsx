'use client';

import { CardContent } from '@/features/shared/ui/card';
import type { GitHubRepository } from '@/lib/github';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { CardEffects, cardBaseClasses } from '@/features/shared/ui/card-effects';
import { Button } from '@/features/shared/ui/button';
import { GithubIcon } from '@/features/shared/icons';
import { accentTag } from '@/design/variants';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface ProjectCardProps {
  repo: GitHubRepository;
  index: number;
  featured?: boolean;
}

export function ProjectCard({ repo, index, featured = false }: ProjectCardProps) {
  return (
    <CardEffects
      variant={featured ? 'featured' : 'default'}
      delay={Math.min(index * 0.1, 0.5)}
    >
      <CardContent className={cn(cardBaseClasses.contentWrapper, featured ? 'min-h-[18rem]' : 'min-h-[16rem]', 'flex flex-col')}>
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
