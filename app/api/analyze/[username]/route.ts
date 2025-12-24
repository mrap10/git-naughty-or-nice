import { calculateStats } from "@/lib/algorithm";
import { getLanguageStats, getRepoCommits, getStarsAndForks, getTopRepo, getUser, getUserPublicRepos } from "@/lib/github";

export async function GET(request: Request, { params }: { params: { username: string } }) {
    const { username } = await params;

    if (!username) {
        return new Response(JSON.stringify({ error: "Username is required" }), { status: 400 });
    }

    try {
        const user = await getUser(username);
        const repos = await getUserPublicRepos(username);
        const { stars, forks } = getStarsAndForks(repos);
        const languages = await getLanguageStats(username, repos);
        const topRepo = getTopRepo(repos);
        const commitCount = await getRepoCommits(username);

        const rawData = {
            user,
            repos: {
                public_repos: user.public_repos,
                stars,
                forks,
                topRepo,
                languages,
            },
            commitCount,
        };

        const stats = calculateStats(rawData);

        return new Response(JSON.stringify(stats), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to analyze user" }), { status: 500 });
    }
}