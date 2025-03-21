import { logger } from './logger';
import { API } from './constants';
import { env } from './env';

// GitHub repository interface
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
  pinned?: boolean;
}

// GitHub user overview interface
export interface GitHubOverview {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  avatar_url: string;
}

// GitHub API error
export class GitHubApiError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'GitHubApiError';
    this.statusCode = statusCode;
  }
}

// Configuration options for repository fetching
export interface FetchRepositoriesOptions {
  username?: string;
  sort?: 'updated' | 'created' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
  perPage?: number;
  maxRepos?: number;
  includeForked?: boolean;
}

// Helper function to get GitHub headers
function getGitHubHeaders(includeAuth: boolean = false) {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (includeAuth && env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${env.GITHUB_TOKEN}`;
  }

  return headers;
}

// Fetch GitHub user overview with caching
export async function fetchGitHubOverview(username?: string): Promise<GitHubOverview | null> {
  const githubUser = username || env.GITHUB_USERNAME;
  if (!githubUser) {
    logger.error('GitHub username not provided and not found in environment variables');
    return null;
  }

  try {
    logger.info(`Fetching GitHub overview for user: ${githubUser}`);
    
    const url = new URL(`/users/${githubUser}`, API.github);
    const response = await fetch(url.toString(), {
      headers: getGitHubHeaders(),
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new GitHubApiError(
        `GitHub API error: ${response.status} ${response.statusText}`,
        response.status
      );
    }

    const data = await response.json();
    if (env.NODE_ENV === 'development') {
      logger.debug('GitHub Overview API Response:', JSON.stringify(data, null, 2));
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error fetching GitHub overview:', error);
    } else {
      logger.error('Unknown error fetching GitHub overview');
    }
    return null;
  }
}

// Fetch first 2pinned repositories using GraphQL API with caching
export async function fetchPinnedRepositories(username?: string): Promise<GitHubRepository[]> {
  const githubUser = username || env.GITHUB_USERNAME;
  if (!githubUser || !env.GITHUB_TOKEN) {
    logger.error('GitHub username or token not found in environment variables');
    return [];
  }

  try {
    logger.info(`Fetching pinned repositories for user: ${githubUser}`);
    
    const query = `
      query {
        user(login: "${githubUser}") {
          pinnedItems(first: 2, types: REPOSITORY) {
            nodes {
              ... on Repository {
                id
                name
                description
                url
                homepageUrl
                primaryLanguage {
                  name
                }
                stargazerCount
                forkCount
                updatedAt
                repositoryTopics(first: 10) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
                isPrivate
                isArchived
                isFork
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: getGitHubHeaders(true),
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new GitHubApiError(
        `GitHub GraphQL API error: ${response.status}`,
        response.status
      );
    }

    const data = await response.json();
    if (env.NODE_ENV === 'development') {
      logger.debug('GitHub Pinned Repositories API Response:', JSON.stringify(data, null, 2));
    }

    if (data.errors) {
      throw new GitHubApiError(
        `GitHub GraphQL API error: ${data.errors[0].message}`,
        500
      );
    }

    return data.data.user.pinnedItems.nodes.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.url,
      homepage: repo.homepageUrl,
      language: repo.primaryLanguage?.name || null,
      stargazers_count: repo.stargazerCount,
      forks_count: repo.forkCount,
      updated_at: repo.updatedAt,
      topics: repo.repositoryTopics.nodes.map((topic: any) => topic.topic.name),
      private: repo.isPrivate,
      archived: repo.isArchived,
      fork: repo.isFork,
      pinned: true
    }));
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error fetching pinned repositories:', error);
    } else {
      logger.error('Unknown error fetching pinned repositories');
    }
    return [];
  }
}

// Fetch all repositories with options
export async function fetchAllRepositories({
  username,
  sort = 'updated',
  direction = 'desc',
  perPage = 100,
  maxRepos = 8,
  includeForked = false
}: FetchRepositoriesOptions = {}): Promise<GitHubRepository[]> {
  const githubUser = username || env.GITHUB_USERNAME;
  if (!githubUser) {
    logger.error('GitHub username not provided and not found in environment variables');
    return [];
  }

  try {
    logger.info(`Fetching GitHub repositories for user: ${githubUser}`);
    
    const url = new URL(`/users/${githubUser}/repos`, API.github);
    url.searchParams.append('sort', sort);
    url.searchParams.append('direction', direction);
    url.searchParams.append('per_page', perPage.toString());
    
    const response = await fetch(url.toString(), {
      headers: getGitHubHeaders(true),
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new GitHubApiError(
        `GitHub API error: ${response.status} ${response.statusText}`,
        response.status
      );
    }

    const repositories = await response.json();
    if (env.NODE_ENV === 'development') {
      logger.debug('GitHub Repositories API Response:', JSON.stringify(repositories, null, 2));
    }

    return repositories
      .filter((repo: GitHubRepository) => {
        if (repo.private || repo.archived) return false;
        if (!includeForked && repo.fork) return false;
        return true;
      })
      .sort((a: GitHubRepository, b: GitHubRepository) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      .slice(0, maxRepos);
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error fetching GitHub repositories:', error);
    } else {
      logger.error('Unknown error fetching GitHub repositories');
    }
    return [];
  }
}

// Main function to fetch all GitHub data
export async function fetchGitHubData(options: FetchRepositoriesOptions = {}): Promise<{
  overview: GitHubOverview | null;
  pinnedRepos: GitHubRepository[];
  otherRepos: GitHubRepository[];
}> {
  const [overview, pinnedRepos, allRepos] = await Promise.all([
    fetchGitHubOverview(options.username),
    fetchPinnedRepositories(options.username),
    fetchAllRepositories(options)
  ]);

  // Filter out pinned repos from all repos
  const otherRepos = allRepos.filter(repo => 
    !pinnedRepos.some(pinnedRepo => pinnedRepo.name === repo.name)
  );

  return {
    overview,
    pinnedRepos,
    otherRepos
  };
}
