"use client";

import { useState } from "react";

export default function Searchbar() {
    const [username, setUsername] = useState("");
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()) return;
    }
    return (
        <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-emerald-600 blur opacity-25 group-hover:opacity-50 transition duration-700"></div>
            <div className="relative p-3 flex justify-between items-center bg-black rounded-lg border border-slate-800">
                <div className="flex gap-2 items-center font-mono">
                    <p className="text-slate-500 select-none">github.com/</p>
                    <input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username"
                        autoFocus
                        className="flex-1 border-none outline-none bg-transparent text-white px-3 py-2 placeholder:text-slate-700"
                    />
                </div>
                <button
                    type="submit"
                    disabled={!username.trim()}
                    className="bg-slate-100 hover:bg-slate-200 text-black cursor-pointer font-bold py-2 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Analyze
                </button>
            </div>
        </form>
    )
}