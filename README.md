# 🎄 Git $\color{red}{\textsf{Naughty}}$ or $\color{#10b981}{\textsf{Nice}}$ ?

> **Are you on Santa's Naughty or Nice list this year?**  
> Analyze your GitHub profile to find out if you deserve coal or code!

🔗 [gitkarma.vercel.app](https://gitkarma.vercel.app)

## About

**Git Naughty or Nice** is a festive web application that analyzes a developer's GitHub activity over the past year. It calculates a "Naughty" or "Nice" score based on commits, pull requests, stars, and consistency.

The app features a smooth, story-like presentation of your year in code, complete with snowfall animations and a final verdict card you can share.

## Features

- **GitHub Analysis**: Fetches public profile data, repositories, and contribution history.
- **Scoring Algorithm**: Calculates a score based on:
  - Total Commits
  - Pull Requests (weighted higher for community contribution)
  - Repository Stars
  - Longest Streak
- **Interactive UI**:
  - Smooth transitions with `motion` (Framer Motion).
  - Atmospheric snowfall effect.
  - "Story" mode revealing stats one by one.
- **Rate Limiting**: Protected against API abuse using Upstash Redis.
- **Responsive Design**: Works beautifully on mobile and desktop.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API Integration**: [Octokit](https://github.com/octokit/octokit.js) (GitHub API)
- **Rate Limiting**: [Upstash](https://upstash.com/) (Redis & Ratelimit)

## Getting Started

### Prerequisites

- Node.js 18+
- A GitHub Personal Access Token
- An Upstash Redis database (for rate limiting)

### Installation

1. **Clone the repository**

    ```bash
    git clone git@github.com:mrap10/naughty-or-nice.git
    cd naughty-or-nice
    ```

2. **Install dependencies**

    ```bash
    bun install
    ```

3. **Set up Environment Variables**

    Create a `.env` file in the root directory based on `.env.example`:

    ```env
    # Your GitHub Personal Access Token (no scopes needed for public data)
    GITHUB_TOKEN=

    # Upstash Redis Credentials (for rate limiting)
    UPSTASH_REDIS_REST_URL=
    UPSTASH_REDIS_REST_TOKEN=
    ```

4. **Run the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How it Works

The application fetches data from the GitHub API and calculates a score:

- **Commits**: 1 point each
- **Stars**: 2 points each
- **Pull Requests**: 5 points each

**Verdict Thresholds:**

- **S Tier (>1000 points)**
- **A Tier (>500 points)**
- **B Tier (>200 points)**
- **C/D Tier (<200 points)**

Based on the final score, users receive a personalized message and a festive card indicating whether they are on the "Naughty" or "Nice" list.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Credits

Built with holiday cheer by [mrap10](https://github.com/mrap10).
