import { logger } from './logger';
import { API } from './constants';

/**
 * GitHub repository interface
 */
export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  fork?: boolean;
  private: boolean;
  archived: boolean;
}

/**
 * GitHub API error
 */
export class GitHubApiError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'GitHubApiError';
    this.statusCode = statusCode;
  }
}

/**
 * Configuration options for repository fetching
 */
export interface FetchRepositoriesOptions {
  username: string;
  sort?: 'updated' | 'created' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
  perPage?: number;
  maxRepos?: number;
  includeForked?: boolean;
}

/**
 * Fetch repositories from GitHub API
 */
export async function fetchGitHubRepositories({
  username,
  sort = 'updated',
  direction = 'desc',
  perPage = 100,
  maxRepos = 10,
  includeForked = false
}: FetchRepositoriesOptions): Promise<GitHubRepository[]> {
  try {
    logger.info(`Fetching GitHub repositories for user: ${username}`);
    
    const url = new URL(`/users/${username}/repos`, API.github);
    url.searchParams.append('sort', sort);
    url.searchParams.append('direction', direction);
    url.searchParams.append('per_page', perPage.toString());
    
    const response = await fetch(url.toString(), {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json', // For topics
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      const error = new GitHubApiError(
        `GitHub API error: ${response.status} ${response.statusText}`,
        response.status
      );
      throw error;
    }

    const repositories = await response.json();

    // Filter and process repositories
    const filteredRepos = repositories
      .filter((repo: GitHubRepository) => {
        // Filter out private and archived repos
        if (repo.private || repo.archived) return false;
        
        // Optionally filter out forks
        if (!includeForked && repo.fork) return false;
        
        return true;
      })
      .sort((a: GitHubRepository, b: GitHubRepository) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      .slice(0, maxRepos);
    
    logger.info(`Successfully fetched ${filteredRepos.length} repositories for ${username}`);
    return filteredRepos;
  } catch (error) {
    if (error instanceof GitHubApiError) {
      logger.error(`GitHub API Error: ${error.message}`, error);
    } else {
      logger.error('Error fetching GitHub repositories:', error instanceof Error ? error : new Error(String(error)));
    }
    return [];
  }
}
