"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { GitHubRepository } from "@/lib/github";
import { CalendarDays, Star, GitFork } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "@/lib/utils";

interface ProjectCardProps {
  repo: GitHubRepository;
  index: number;
}

export function ProjectCard({ repo, index }: ProjectCardProps) {
  // Format dates to show "X days/months/years ago"
  const updatedAt = formatDistanceToNow(new Date(repo.updated_at));

  const languages: Record<string, string> = {
    JavaScript: "bg-yellow-500",
    TypeScript: "bg-blue-500",
    Python: "bg-green-500",
    Java: "bg-red-500",
    "C#": "bg-purple-500",
    CSS: "bg-pink-500",
    HTML: "bg-orange-500",
    Go: "bg-cyan-500",
    Rust: "bg-amber-600",
    Ruby: "bg-red-600",
    // Add more languages as needed
  };

  const languageColor = repo.language ? languages[repo.language] || "bg-gray-500" : "bg-gray-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full outline-none focus:ring-2 focus:ring-purple-500 rounded-xl"
      >
        <Card className="overflow-hidden relative h-full duration-700 border group hover:border-purple-400/50 border-zinc-700 bg-black/30 backdrop-blur-sm hover:bg-zinc-800/30">
          {/* Glassmorphic gradient effect */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br opacity-0 via-purple-500/10 transition duration-1000 group-hover:opacity-100"
              style={{ maskImage: "radial-gradient(180px at 0px 0px, white, transparent)", WebkitMaskImage: "radial-gradient(180px at 0px 0px, white, transparent)" }} />

          <div className="p-6 flex flex-col h-full relative z-20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-medium text-zinc-200 group-hover:text-white duration-150">
                {repo.name}
              </h3>
              <div className="flex items-center gap-3 text-zinc-400 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>{repo.stargazers_count}</span>
                </div>
                {/* Remove fork check as it's handled in the GitHub API fetch */}
              </div>
            </div>

            {repo.description && (
              <p className="text-zinc-400 group-hover:text-zinc-300 duration-150 mb-4 flex-grow">
                {repo.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mt-2 mb-4">
              {repo.topics && repo.topics.slice(0, 3).map(topic => (
                <span key={topic} className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {topic}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mt-auto text-sm">
              <div className="flex items-center gap-1 text-zinc-400">
                <CalendarDays className="w-4 h-4" />
                <span>Updated {updatedAt}</span>
              </div>

              {repo.language && (
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${languageColor}`}></div>
                  <span className="text-zinc-400">{repo.language}</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </a>
    </motion.div>
  );
}
