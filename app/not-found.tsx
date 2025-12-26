"use client";

import Snowfall from "@/components/Snowfall";
import { FileQuestion, GitPullRequestClosed, Home } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white text-slate-900 dark:bg-black dark:text-slate-200 font-sans selection:bg-red-500/30 overflow-hidden relative flex flex-col items-center justify-center p-4">         
            <Snowfall />

            <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 text-center space-y-8 max-w-lg"
            >
                <div className="relative inline-block">
                    <h1 className="text-[120px] md:text-[150px] font-black leading-none font-grotesk tracking-tighter dark:text-slate-700 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <GitPullRequestClosed size={80} className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                        </motion.div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold font-grotesk text-black dark:text-white">
                        <span className="text-emerald-500">HEAD</span> detached from origin?
                    </h2>
                    
                    <p className="text-slate-400 font-jetbrains text-sm md:text-base">
                        The route you are looking for has been buried in snow or gitignored by the elves.
                    </p>
                </div>

                <div className="pt-4">
                    <Link href="/" className="group relative inline-flex items-center gap-3 px-8 py-4 dark:bg-slate-100 bg-slate-600 hover:bg-slate-400 dark:hover:bg-white text-white dark:text-black rounded-lg font-grotesk font-bold text-sm uppercase tracking-wider transition-all hover:scale-105 active:scale-95">
                        <Home size={18} className="group-hover:-translate-y-1 transition-transform duration-300" />
                        <span>Return to Workshop</span>
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-emerald-600 dark:from-red-500 dark:to-emerald-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500 -z-10"></div>
                    </Link>
                </div>

                <div className="pt-12 text-xs font-jetbrains text-slate-500 flex justify-center items-center gap-2">
                    <FileQuestion size={12} />
                    <span>ERROR_CODE: COAL_RECEIVED</span>
                </div>
            </motion.div>
        </div>
    )
}