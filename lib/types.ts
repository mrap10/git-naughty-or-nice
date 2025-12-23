export interface UserStats {
    username: string;
    totalCommits: number;
    topLanguage: string;
    longestStreak: number;
    isNaughty: boolean;
    verdictReason: string;
    grade: string;
}