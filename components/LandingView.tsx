import { Code2, GitCommit, GithubIcon, Terminal } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

interface LandingViewProps {
    username: string;
    setUsername: (username: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

export default function LandingView({ username, setUsername, handleSubmit }: LandingViewProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md text-center space-y-8"
        >
            <div className="space-y-2">
                <div className="flex justify-around mb-6">
                    <div className="relative">
                        <GithubIcon size={60} className="text-white relative z-10" />
                        <div className="absolute inset-0 bg-red-500 blur-lg opacity-25 animate-pulse" />
                    </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-center">
                    GIT <span className="text-red-500">NAUGHTY</span>
                    <br /> OR <span className="text-emerald-500">NICE </span>?
                </h1>
                <p className="text-slate-400 font-mono text-sm">
                    Connect your GitHub to see if you deserve coal or code.
                </p>
            </div>
            
            <form onSubmit={handleSubmit} className="relative group w-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-emerald-600 blur opacity-25 group-hover:opacity-50 transition duration-700"></div>
                <div className="relative p-3 flex justify-between items-center bg-black rounded-lg border border-slate-800">
                    <div className="flex gap-2 items-center font-mono w-full">
                        <p className="text-slate-500 select-none hidden sm:block">github.com/</p>
                        <input 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="username"
                            autoFocus
                            className="flex-1 border-none outline-none bg-transparent text-white px-0 sm:px-3 py-2 placeholder:text-slate-700 min-w-0"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!username.trim()}
                        className="bg-slate-100 hover:bg-slate-200 text-black cursor-pointer font-bold py-2 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
                    >
                        Analyze
                    </button>
                </div>
            </form>

            <div className="flex justify-center gap-4 text-sm text-slate-400 font-mono">
                <span className="flex items-center gap-1"><Terminal size={12}/> Public Repos</span>
                <span className="flex items-center gap-1"><GitCommit size={12}/> Commit Quality</span>
                <span className="flex items-center gap-1"><Code2 size={12}/> Tech Stack</span>
            </div>
        </motion.div>
    )
}