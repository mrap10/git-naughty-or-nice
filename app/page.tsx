"use client";

import LandingView from "@/components/LandingView";
import LoadingView from "@/components/LoadingView";
import ResultView from "@/components/ResultView";
import StoryView from "@/components/StoryView";
import { AppState, UserStats } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [currentView, setCurrentView] = useState<AppState>("LANDING");
  const [username, setUsername] = useState<string>("");

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    setCurrentView("LOADING");

    try {
      const response = await fetch(`/api/analyze/${username.trim()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze profile");
      }

      setStats(data);
      setCurrentView("STORY");
    } catch (err) {
      console.error("Error fetching analysis:", err);
      setCurrentView("LANDING");
      // todo: better error handling through loadingView (?)
      alert("Failed to analyze profile. Please check the username.");
    }
  }

  const handleReset = () => {
    setCurrentView("LANDING");
    setUsername("");
    setStats(null);
  }

  return (
    <div className="min-h-screen bg-black text-slate-200 selection:bg-red-500/30 overflow-hidden relative">
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        {currentView === "LANDING" && (
          <LandingView key="landing" username={username} setUsername={setUsername} handleSubmit={handleAnalyze} />
        )}
        {currentView === "LOADING" && (
          <LoadingView key="loading" />
        )}
        {currentView === "STORY" && stats && (
          <StoryView key="story" stats={stats} onComplete={() => setCurrentView("RESULT")} />
        )}
        {currentView === "RESULT" && stats && (
          <ResultView key="result" stats={stats} onReset={handleReset} />
        )}
      </main>

      <footer>
        <div className="w-full max-w-md text-center space-y-4 mx-auto py-6">
          <p className="text-slate-500 font-mono">
            Made with ❤️ by <Link href="https://github.com/mrap10" className="text-red-500">mrap10</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
