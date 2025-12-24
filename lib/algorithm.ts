import { UserStats } from "./types";

export function calculateStats(data: any): UserStats {
    const { user, repos, contributionStats } = data;
    const totalCommits = contributionStats.totalCommits;
    const prCount = contributionStats.totalPullRequests;
    const longestStreak = contributionStats.longestStreak;
    
    let topLanguage = "None";
    let maxCount = 0;
    if (repos.languages) {
        for (const [lang, count] of Object.entries(repos.languages)) {
            if ((count as number) > maxCount) {
                maxCount = count as number;
                topLanguage = lang;
            }
        }
    }

    const commitText = getCommitText(totalCommits);
    const languageText = getLanguageText(topLanguage);
    const prText = getPrText(prCount);

    // Simple scoring: Commits (1x) + PRs (5x) + Stars (2x)
    const score = (totalCommits * 1) + (prCount * 5) + (repos.stars * 2);
    const isNaughty = score < 200; // Threshold
    
    let grade = "C";
    if (score > 1000) grade = "S";
    else if (score > 500) grade = "A";
    else if (score > 200) grade = "B";
    else grade = "D";

    let verdictReason = "You've been doing okay.";
    if (grade === "S") verdictReason = "You're a coding machine! Santa is proud.";
    else if (grade === "A") verdictReason = "Great work this year! Santa approves.";
    else if (grade === "B") verdictReason = "Solid effort, but there's room for more.";
    else verdictReason = "Someone's been slacking off... Coal for you!";

    return {
        username: user.login || user.name || "Developer",
        totalCommits,
        topLanguage,
        longestStreak,
        isNaughty,
        verdictReason,
        grade,
        commitText,
        languageText,
        prCount,
        prText,
        stars: repos.stars
    };
}

function getCommitText(commits: number): string {
    if (commits > 1000) return "Your keyboard must be on fire!";
    if (commits > 500) return "Consistency is key, and you found it.";
    if (commits > 100) return "Getting into the groove.";
    return "A quiet year, perhaps?";
}

function getLanguageText(language: string): string {
    const texts: Record<string, string> = {
        "TypeScript": "Type safety is your middle name.",
        "JavaScript": "Living life on the edge, are we?",
        "Python": "Clean code, clear mind.",
        "Rust": "Blazingly fast!",
        "Go": "Simple, reliable, efficient.",
        "Java": "Enterprise grade engineering.",
        "C++": "Power and complexity.",
        "HTML": "Structuring the web.",
        "CSS": "Making things pretty.",
        "PHP": "Keeping the web alive.",
        "C#": "Microsoft's finest.",
        "Swift": "Building for the Apple ecosystem.",
        "Kotlin": "Modern Android development.",
        "Ruby": "Developer happiness optimized.",
    };
    return texts[language] || `You speak ${language} fluently.`;
}

function getPrText(prs: number): string {
    if (prs > 50) return "Open source hero!";
    if (prs > 20) return "Team player extraordinaire.";
    if (prs > 0) return "Contributing to the greater good.";
    return "Coding solo this year?";
}