export interface UserStats {
    username: string;
    totalCommits: number;
    topLanguage: string;
    longestStreak: number;
    isNaughty: boolean;
    verdictReason: string;
    grade: string;
    commitText: string;
    languageText: string;
    prCount: number;
    prText: string;
}

export type AppState = "LANDING" | "LOADING" | "STORY" | "RESULT";