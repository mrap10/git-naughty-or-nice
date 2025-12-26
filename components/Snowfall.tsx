"use client";

import { useState, useEffect } from "react";

export default function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<
    Array<{ left: string; top: string; animationDelay: string; fontSize: string }>
  >([]);

  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setSnowflakes(
      Array.from({ length: 20 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        fontSize: `${Math.random() * 20 + 10}px`,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {snowflakes.map((flake, i) => (
        <div key={i} className="absolute dark:text-slate-700/30 text-slate-400/30 text-xs animate-pulse" style={flake}>
          ❄
        </div>
      ))}
    </div>
  );
}
