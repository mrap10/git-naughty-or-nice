import { useState } from "react";

export default function LoadingView() {
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-red-500 border-r-emerald-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center font-mono text-2xl animate-pulse">
                🎅
            </div>
            </div>
            <div className="text-center space-y-2">
            <p className="font-mono text-emerald-400 animate-pulse">Contacting North Pole API...</p>
            <p className="text-xs text-slate-500 font-mono">Scanning for `console.log` leftovers...</p>
            </div>
        </div>
    )
}