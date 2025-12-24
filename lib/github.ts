import { Octokit } from "octokit";

export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
})

export async function getUser(username: string) {
    const { data } = await octokit.request('GET /users/{username}', {
        username
    });

    return {
        login: data.login,
        name: data.name,
        avatar_url: data.avatar_url,
        public_repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        created_at: data.created_at,
    }
}

export async function getUserPublicRepos(username: string) {
    const { data } = await octokit.request(
        "GET /users/{username}/repos",
        {
            username,
            per_page: 100,
            sort: "updated",
        }
    );

    return data;
}

export function getStarsAndForks(repos: any[]) {
    return repos.reduce(
        (acc, repo) => {
            acc.stars += repo.stargazers_count;
            acc.forks += repo.forks_count;
            return acc;
        },
        { stars: 0, forks: 0 }
    )
}

export async function getLanguageStats(repos: any[]) {
    const languages: Record<string, number> = {};

    repos.forEach((repo) => {
        if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
    });

    return languages;
}

export function getTopRepo(repos: any[]) {
    if (repos.length === 0) return null;

    return repos.reduce((topRepo, currentRepo) => {
        return currentRepo.stargazers_count > topRepo.stargazers_count ? currentRepo : topRepo
    })
}

export async function getContributionStats(username: string) {
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
        const response: any = await octokit.graphql(query, { username, from, to });
        const collection = response.user.contributionsCollection;

        const totalCommits = collection.totalCommitContributions +
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
            longestStreak
        };
    } catch (error) {
        console.error("Error fetching contributions:", error);
        return {
            totalCommits: 0,
            totalPullRequests: 0,
            longestStreak: 0
        };
    }
}