"use client";

import { UserStats } from "@/lib/types";
import { Code2, Flame, GitCommit, GitPullRequest } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface StoryViewProps {
    stats: UserStats;
    onComplete: () => void;
}

export default function StoryView({ stats, onComplete }: StoryViewProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            bg: "bg-gray-950",
            content: (
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-32 h-32 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-4 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                        <GitCommit size={48} className="text-emerald-400" />
                    </div>
                    <h1 className="text-3xl font-bold">The Grind</h1>
                    <div className="space-y-1">
                        <p className="text-5xl font-black text-emerald-500 font-mono tracking-tighter">
                            {stats.totalCommits}
                        </p>
                        <p className="text-slate-400 uppercase tracking-widest">Commits in 2025</p>
                        <p className="text-slate-400 font-mono text-xs tracking-wide">(Public Repos)</p>
                    </div>
                    <p className="text-slate-300 italic max-w-[250px]">
                        {stats.commitText}
                    </p>
                </div>
            )
        }, {
            bg: "bg-gray-950",
            content: (
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-32 h-32 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-4 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                        <Code2 size={48} className="text-blue-400" />
                    </div>
                    <h1 className="text-3xl font-bold">The Tongue</h1>
                    <div className="space-y-1">
                        <p className="text-5xl font-black text-blue-500 font-mono tracking-tighter">
                            {stats.topLanguage}
                        </p>
                        <p className="text-slate-400 uppercase tracking-widest">Most Used</p>
                    </div>
                    <p className="text-slate-300 italic max-w-[250px]">
                        {stats.languageText}
                    </p>
                </div>
            )
        }, {
            bg: "bg-gray-950",
            content: (
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-32 h-32 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-4 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                        <GitPullRequest size={48} className="text-purple-400" />
                    </div>
                    <h1 className="text-3xl font-bold">The Collaboration</h1>
                    <div className="space-y-1">
                        <p className="text-5xl font-black text-purple-500 font-mono tracking-tighter">
                            {stats.prCount}
                        </p>
                        <p className="text-slate-400 uppercase tracking-widest">PRs Merged</p>
                    </div>
                    <p className="text-slate-300 italic max-w-[250px]">
                        {stats.prText}
                    </p>
                </div>
            )
        }, {
            bg: "bg-gray-950",
            content: (
                <div className="flex flex-col items-center text-center space-y-8">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-red-500/20 blur-xl rounded-full animate-pulse"/>
                        <Flame size={64} className="text-red-400 relative z-10" />
                    </div>
                    <h1 className="text-4xl font-bold uppercase tracking-widest">The Verdict</h1>
                    <p className="text-slate-400 font-mono text-sm">
                        Calculating your naughty or nice status...
                    </p>
                </div>
            )
        }
    ]

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentSlide < slides.length - 1) {
                setCurrentSlide(currentSlide + 1);
            } else {
                onComplete();
            }
        }, 4000);
        return () => clearTimeout(timer);
    }, [currentSlide, onComplete, slides.length]);
    
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col"
        >
            <div className="absolute top-0 left-0 right-0 p-2 z-20 flex gap-1">
                {slides.map((_, index) => (
                    <div key={index} className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: index < currentSlide ? "100%" : index === currentSlide ? "100%" : "0%" }}
                            transition={{ duration: index === currentSlide ? 4 : 0, ease: "linear" }}
                            className="h-full bg-white"
                        />
                    </div>
                ))}
            </div>

            <div className="absolute inset-0 z-10 flex">
                <div className="w-1/3 h-full" onClick={() => setCurrentSlide(c => Math.max(0, c - 1))} />
                <div className="w-2/3 h-full" onClick={() => setCurrentSlide(c => Math.min(slides.length - 1, c + 1))} />
            </div>

            <div className="flex-1 flex items-center justify-center p-6 relative z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 1.1, rotate: 2 }}
                        transition={{ type: "spring", bounce: 0.4 }}
                        className="w-full"
                    >
                        {slides[currentSlide].content}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute bottom-6 w-full text-center text-xs font-mono text-slate-600">
                NAUGHTY OR NICE 2025
            </div>
        </motion.div>
    )
}