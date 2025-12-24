import { Octokit } from "octokit";
import { ContributionStats, GithubRepo, GithubUser } from "./types";

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getUser(username: string): Promise<GithubUser> {
  const { data } = await octokit.request("GET /users/{username}", {
    username,
  });

  return {
    login: data.login,
    name: data.name,
    avatar_url: data.avatar_url,
    public_repos: data.public_repos,
    followers: data.followers,
    following: data.following,
    created_at: data.created_at,
  };
}

export async function getUserPublicRepos(username: string): Promise<GithubRepo[]> {
  const { data } = await octokit.request("GET /users/{username}/repos", {
    username,
    per_page: 100,
    sort: "updated",
  });

  return data as unknown as GithubRepo[];
}

export function getStarsAndForks(repos: GithubRepo[]) {
  return repos.reduce(
    (acc, repo) => {
      acc.stars += repo.stargazers_count;
      acc.forks += repo.forks_count;
      return acc;
    },
    { stars: 0, forks: 0 }
  );
}

export async function getLanguageStats(repos: GithubRepo[]) {
  const languages: Record<string, number> = {};

  repos.forEach((repo) => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  return languages;
}

export function getTopRepo(repos: GithubRepo[]) {
  if (repos.length === 0) return null;

  return repos.reduce((topRepo, currentRepo) => {
    return currentRepo.stargazers_count > topRepo.stargazers_count ? currentRepo : topRepo;
  });
}

interface GraphQLResponse {
  user: {
    contributionsCollection: {
      totalCommitContributions: number;
      totalPullRequestContributions: number;
      totalPullRequestReviewContributions: number;
      totalIssueContributions: number;
      contributionCalendar: {
        weeks: {
          contributionDays: {
            contributionCount: number;
          }[];
        }[];
      };
    };
  };
}

export async function getContributionStats(username: string): Promise<ContributionStats> {
  const currentYear = new Date().getFullYear();
  const from = `${currentYear}-01-01T00:00:00Z`;
  const to = `${currentYear}-12-31T23:59:59Z`;

  const query = `
        query($username: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $username) {
                contributionsCollection (
                    from: $from
                    to: $to
                ) {
                    totalCommitContributions
                    totalPullRequestContributions
                    totalPullRequestReviewContributions
                    totalIssueContributions
                    contributionCalendar {
                        weeks {
                            contributionDays {
                                contributionCount
                            }
                        }
                    }
                }
            }
        }
    `;

  try {
    const response = await octokit.graphql<GraphQLResponse>(query, { username, from, to });
    const collection = response.user.contributionsCollection;

    const totalCommits =
      collection.totalCommitContributions +
      collection.totalPullRequestContributions +
      collection.totalPullRequestReviewContributions +
      collection.totalIssueContributions;

    let longestStreak = 0;
    let currentStreak = 0;
    for (const week of collection.contributionCalendar.weeks) {
      for (const day of week.contributionDays) {
        if (day.contributionCount > 0) {
          currentStreak++;
        } else {
          longestStreak = Math.max(longestStreak, currentStreak);
          currentStreak = 0;
        }
      }
    }
    longestStreak = Math.max(longestStreak, currentStreak);

    return {
      totalCommits,
      totalPullRequests: collection.totalPullRequestContributions,
      longestStreak,
    };
  } catch (error) {
    return {
      totalCommits: 0,
      totalPullRequests: 0,
      longestStreak: 0,
    };
  }
}
