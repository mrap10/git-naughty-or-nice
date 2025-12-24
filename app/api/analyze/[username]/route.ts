import { calculateStats } from "@/lib/algorithm";
import {
  getLanguageStats,
  getContributionStats,
  getStarsAndForks,
  getTopRepo,
  getUser,
  getUserPublicRepos,
} from "@/lib/github";

export async function GET(_: Request, { params }: { params: { username: string } }) {
  const { username } = await params;

  if (!username) {
    return new Response(JSON.stringify({ error: "Username is required" }), { status: 400 });
  }

  const usernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
  if (!usernameRegex.test(username)) {
    return new Response(JSON.stringify({ error: "Invalid username format" }), { status: 400 });
  }

  try {
    const user = await getUser(username);
    const repos = await getUserPublicRepos(username);
    const { stars, forks } = getStarsAndForks(repos);
    const languages = await getLanguageStats(repos);
    const topRepo = getTopRepo(repos);
    const contributionStats = await getContributionStats(username);

    const rawData = {
      user,
      repos: {
        public_repos: user.public_repos,
        stars,
        forks,
        topRepo,
        languages,
      },
      contributionStats,
    };

    const stats = calculateStats(rawData);

    return new Response(JSON.stringify(stats), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to analyze user" }), { status: 500 });
  }
}
