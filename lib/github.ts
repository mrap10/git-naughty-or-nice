import { Octokit } from "octokit";

export const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
})

export async function getUser(username: string) {
    const { data } = await octokit.request('GET /users/{username}', {
        username
    });

    return {
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

export async function getLanguageStats(username:string, repos: any[]) {
    const languages: Record<string, number> = {};

    const promises = repos.map(async (repo) => {
        if (!repo.languages_url) return;

        try {
            const { data } = await octokit.request(repo.languages_url);

            for (const [lang, bytes] of Object.entries(data)) {
                languages[lang] = (languages[lang] || 0) + (bytes as number);
            }
        } catch (error) {
            console.error(`Error fetching languages for ${repo.name}:`, error);
        }
    });

    await Promise.all(promises);

    return languages;
}

export function getTopRepo(repos: any[]) {
    if (repos.length === 0) return null;

    return repos.reduce((topRepo, currentRepo) => {
        return currentRepo.stargazers_count > topRepo.stargazers_count ? currentRepo : topRepo
    })
}

export async function getRepoCommits(username: string) {
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
                        totalContributions
                        weeks {
                            contributionDays {
                                date
                                contributionCount
                            }
                        }
                    }
                }
            }
        }
    `;

    const response: any = await octokit.graphql(query, { username, from, to });
    return response.user.contributionsCollection;
}