import { Code2, GitCommit, GithubIcon, Terminal } from "lucide-react";
import Searchbar from "./Searchbar";

export default function LandingView() {
    return (
        <div className="w-full max-w-md text-center space-y-8">
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
            
            <Searchbar />

            <div className="flex justify-center gap-4 text-sm text-slate-400 font-mono">
                <span className="flex items-center gap-1"><Terminal size={12}/> Public Repos</span>
                <span className="flex items-center gap-1"><GitCommit size={12}/> Commit Quality</span>
                <span className="flex items-center gap-1"><Code2 size={12}/> Tech Stack</span>
            </div>
        </div>
    )
}