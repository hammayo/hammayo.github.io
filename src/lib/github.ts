import { logger } from './logger';
import { API } from './constants';
import { env } from './env';

interface PinnedRepoNode {
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  primaryLanguage: { name: string } | null;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  repositoryTopics: { nodes: Array<{ topic: { name: string } }> };
  isPrivate: boolean;
  isArchived: boolean;
  isFork: boolean;
}

interface GraphQLPinnedResponse {
  data: { user: { pinnedItems: { nodes: PinnedRepoNode[] } } };
  errors?: Array<{ message: string }>;
}

export interface GitHubRepository {
  id: string | number;
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

export class GitHubApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'GitHubApiError';
    this.statusCode = statusCode;
  }
}

export interface FetchRepositoriesOptions {
  username?: string;
  sort?: 'updated' | 'created' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
  perPage?: number;
  maxRepos?: number;
  includeForked?: boolean;
}

function getGitHubHeaders(includeAuth = false) {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (includeAuth && env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${env.GITHUB_TOKEN}`;
  }
  return headers;
}

export async function fetchGitHubOverview(username?: string): Promise<GitHubOverview | null> {
  const githubUser = username ?? env.GITHUB_USERNAME;
  if (!githubUser) {
    logger.error('GitHub username not provided and not found in environment variables');
    return null;
  }

  try {
    logger.info(`Fetching GitHub overview for user: ${githubUser}`);

    const url = new URL(`/users/${githubUser}`, API.github);
    const response = await fetch(url.toString(), {
      headers: getGitHubHeaders(),
      next: { revalidate: 3600 },
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
    logger.error('Error fetching GitHub overview:', error instanceof Error ? error : undefined);
    return null;
  }
}

export async function fetchPinnedRepositories(username?: string): Promise<GitHubRepository[]> {
  const githubUser = username ?? env.GITHUB_USERNAME;
  if (!githubUser || !env.GITHUB_TOKEN) {
    logger.info('GitHub username or token not configured — skipping pinned repos fetch');
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
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new GitHubApiError(
        `GitHub GraphQL API error: ${response.status}`,
        response.status
      );
    }

    const data = await response.json() as GraphQLPinnedResponse;
    if (env.NODE_ENV === 'development') {
      logger.debug('GitHub Pinned Repositories API Response:', JSON.stringify(data, null, 2));
    }

    if (data.errors) {
      throw new GitHubApiError(
        `GitHub GraphQL API error: ${data.errors[0].message}`,
        500
      );
    }

    return data.data.user.pinnedItems.nodes.map((repo) => ({
      id:               repo.id,
      name:             repo.name,
      description:      repo.description,
      html_url:         repo.url,
      homepage:         repo.homepageUrl,
      language:         repo.primaryLanguage?.name ?? null,
      stargazers_count: repo.stargazerCount,
      forks_count:      repo.forkCount,
      updated_at:       repo.updatedAt,
      topics:           repo.repositoryTopics.nodes.map(t => t.topic.name),
      private:          repo.isPrivate,
      archived:         repo.isArchived,
      fork:             repo.isFork,
      pinned:           true,
    }));
  } catch (error) {
    logger.error('Error fetching pinned repositories:', error instanceof Error ? error : undefined);
    return [];
  }
}

export async function fetchAllRepositories({
  username,
  sort = 'updated',
  direction = 'desc',
  perPage = 100,
  maxRepos = 8,
  includeForked = false,
}: FetchRepositoriesOptions = {}): Promise<GitHubRepository[]> {
  const githubUser = username ?? env.GITHUB_USERNAME;
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
      next: { revalidate: 3600 },
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
    logger.error('Error fetching GitHub repositories:', error instanceof Error ? error : undefined);
    return [];
  }
}

export async function fetchGitHubData(options: FetchRepositoriesOptions = {}): Promise<{
  overview: GitHubOverview | null;
  pinnedRepos: GitHubRepository[];
  otherRepos: GitHubRepository[];
}> {
  const [overview, pinnedRepos, allRepos] = await Promise.all([
    fetchGitHubOverview(options.username),
    fetchPinnedRepositories(options.username),
    fetchAllRepositories(options),
  ]);

  const otherRepos = allRepos.filter(
    repo => !pinnedRepos.some(pinned => pinned.name === repo.name)
  );

  return { overview, pinnedRepos, otherRepos };
}
