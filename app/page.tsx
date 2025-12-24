"use client";

import LandingView from "@/components/LandingView";
import LoadingView from "@/components/LoadingView";
import ResultView from "@/components/ResultView";
import StoryView from "@/components/StoryView";
import { AppState, UserStats } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Snowfall from "@/components/Snowfall";
import Toast from "@/components/Toast";

export default function Home() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [currentView, setCurrentView] = useState<AppState>("LANDING");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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
      setCurrentView("LANDING");
      setError("Failed to analyze profile. Please check the username.");
    }
  }

  const handleReset = () => {
    setCurrentView("LANDING");
    setUsername("");
    setStats(null);
  }

  return (
    <div className="min-h-screen bg-black text-slate-200 selection:bg-red-500/30 overflow-hidden relative">
      <Snowfall />
      <AnimatePresence>
        {error && <Toast message={error} onClose={() => setError(null)} />}
      </AnimatePresence>
      
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <AnimatePresence mode="wait">
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
        </AnimatePresence>
      </main>
    </div>
  );
}
