"use client";

import { UserStats } from "@/lib/types";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface SearchbarProps {
    onSuccess: (stats: UserStats) => void;
}

export default function Searchbar({ onSuccess }: SearchbarProps) {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()) return;

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`/api/analyze/${username.trim()}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to analyze profile");
            }

            onSuccess(data);
        } catch (err) {
            console.error("Error fetching analysis:", err);
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    }
    return (
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
                        disabled={loading}
                        className="flex-1 border-none outline-none bg-transparent text-white px-0 sm:px-3 py-2 placeholder:text-slate-700 min-w-0"
                    />
                </div>
                <button
                    type="submit"
                    disabled={!username.trim() || loading}
                    className="bg-slate-100 hover:bg-slate-200 text-black cursor-pointer font-bold py-2 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
                >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : "Analyze"}
                </button>
            </div>
            {error && (
                <p className="absolute -bottom-8 left-0 text-red-500 text-xs font-mono">{error}</p>
            )}
        </form>
    )
}