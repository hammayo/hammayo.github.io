"use client";

import React from "react";
import { CardContent } from "@/components/ui/card";
import type { GitHubRepository } from "@/lib/github";
import { Star } from "lucide-react";
import { CardEffects, cardBaseClasses } from "@/components/ui/card-effects";

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
        {/* Top section with badges */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start">
            {featured && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-600/70 dark:text-amber-400/60" fill="currentColor" />
                <span className="text-xs font-medium text-amber-700/70 dark:text-amber-400/60">Featured Project</span>
              </div>
            )}
            {/* Language Badge */}
            {repo.language && (
              <div className="self-end">
                <span className={`${cardBaseClasses.badge} bg-${repo.language.toLowerCase()}-200 bg-opacity-70 text-zinc-700 dark:bg-opacity-20 dark:text-white/80`}>
                  {repo.language}
                </span>
              </div>
            )}
          </div>

          {/* Project Info */}
          <div className={`${featured ? 'mt-4' : 'mt-2'}`}>
            <h3 className={`${cardBaseClasses.title} ${featured ? 'text-2xl' : 'text-lg'}`}>
              {repo.name}
            </h3>
            <p className={`${cardBaseClasses.description} ${featured ? 'line-clamp-3' : 'line-clamp-2'}`}>
              {repo.description || "No description provided"}
            </p>
          </div>

          {/* Topics */}
          {repo.topics && repo.topics.length > 0 && (
            <div className={`flex flex-wrap gap-2 ${featured ? 'mt-4' : 'mt-2'}`}>
              {repo.topics.slice(0, featured ? 3 : 2).map((topic) => (
                <span
                  key={topic}
                  className={cardBaseClasses.tag}
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Section with Stats and Button - Fixed at bottom */}
        <div className={`mt-auto ${featured ? 'pt-6' : 'pt-4'} border-t border-zinc-100 dark:border-zinc-800`}>
          {/* Repository Stats */}
          <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
              </svg>
              <span>{repo.forks_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M1.643 3.143L.427 1.927A.25.25 0 000 2.104V5.75c0 .138.112.25.25.25h3.646a.25.25 0 00.177-.427L2.715 4.215a6.5 6.5 0 11-1.18 4.458.75.75 0 10-1.493.154 8.001 8.001 0 101.6-5.684zM7.75 4a.75.75 0 01.75.75v2.992l2.028.812a.75.75 0 01-.557 1.392l-2.5-1A.75.75 0 017 8.25v-3.5A.75.75 0 017.75 4z"></path>
              </svg>
              <span>
                {new Date(repo.updated_at).toLocaleDateString('en-US', { 
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  timeZone: 'UTC'
                })}
              </span>
            </div>
          </div>

          {/* View Project Button */}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cardBaseClasses.button} ${featured ? cardBaseClasses.buttonGradient.featured : cardBaseClasses.buttonGradient.default}`}
          >
            View Project
          </a>
        </div>
      </CardContent>
    </CardEffects>
  );
}
