"use client";

import { useEffect, useState } from "react";

export default function Snowfall() {
    const [snowflakes, setSnowflakes] = useState<Array<{ left: string, top: string, animationDelay: string, fontSize: string }>>([]);

    useEffect(() => {
        const flakes = [...Array(20)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${Math.random() * 20 + 10}px`
        }));
        setSnowflakes(flakes);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            {snowflakes.map((flake, i) => (
                <div
                    key={i}
                    className="absolute text-slate-700/20 text-xs animate-pulse"
                    style={flake}
                >
                    ❄
                </div>
            ))}
        </div>
    )
}