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
  stars: number;
}

export type AppState = "LANDING" | "LOADING" | "STORY" | "RESULT";

export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GithubRepo {
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  name: string;
  html_url: string;
  description: string | null;
}

export interface ContributionStats {
  totalCommits: number;
  totalPullRequests: number;
  longestStreak: number;
}

export interface RepoStats {
  public_repos: number;
  stars: number;
  forks: number;
  topRepo: GithubRepo | null;
  languages: Record<string, number>;
}

export interface AnalysisData {
  user: GithubUser;
  repos: RepoStats;
  contributionStats: ContributionStats;
}
