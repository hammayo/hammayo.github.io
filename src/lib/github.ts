// Update GitHub fetching functionality
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
  fork?: boolean; // Add optional fork property
}

export async function fetchGitHubRepositories(username: string): Promise<GitHubRepository[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github.mercy-preview+json', // For topics
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repositories = await response.json();

    // Filter out repositories, sort by most recently updated
    return repositories
      .filter((repo: GitHubRepository) => (!repo.fork || repo.fork)) // Simplified filter
      .sort((a: GitHubRepository, b: GitHubRepository) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      .slice(0, 10); // Get top 10 repositories
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}
