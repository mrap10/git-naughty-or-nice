"use client";

import { UserStats } from "@/lib/types";
import { Download, RefreshCcw, Share2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import * as htmlToImage from "html-to-image";
import Toast from "./Toast";

interface ResultViewProps {
  stats: UserStats;
  onReset: () => void;
}

export default function ResultView({ stats, onReset }: ResultViewProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  const [id] = useState(() => Math.floor(Math.random() * 900000 + 100000));

  const handleDownload = () => {
    if (!certificateRef.current) return;

    htmlToImage
      .toPng(certificateRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `naughty-or-nice-certificate-${stats.username}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        setError("Failed to download certificate. Please try again.");
      });
  };

  const handleShare = async () => {
    if (!certificateRef.current || !navigator.share) {
      alert("Sharing is not supported on this browser.");
      return;
    }
    try {
      const dataUrl = await htmlToImage.toPng(certificateRef.current);
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], `naughty-or-nice-certificate-${stats.username}.png`, {
        type: blob.type,
      });
      await navigator.share({
        title: "My Naughty or Nice Certificate",
        text: `I just found out I'm ${stats.isNaughty ? "NAUGHTY" : "NICE"} on GitHub!`,
        files: [file],
      });
    } catch (err) {
      setError("Failed to share certificate. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center max-w-md w-full px-4 gap-4 my-2"
    >
      <AnimatePresence>
        {error && <Toast message={error} onClose={() => setError(null)} />}
      </AnimatePresence>
      <div className="w-full flex items-center justify-between text-slate-400 font-mono">
        <button
          onClick={onReset}
          className="flex items-center gap-2 font-jetbrains hover:text-white cursor-pointer transition-colors text-xs"
        >
          <RefreshCcw size={14} /> Try Another
        </button>
        <span className="text-xs border border-slate-800 font-jetbrains px-2 py-1 rounded bg-slate-900/50">
          Found a bug? Report{" "}
          <Link
            href={"https://github.com/mrap10/naughty-or-nice/issues"}
            className="underline cursor-pointer text-red-500"
          >
            here
          </Link>
        </span>
      </div>

      <div
        ref={certificateRef}
        className="w-full bg-stone-100 text-slate-900 p-6 rounded-sm relative overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
      >
        <div className="absolute inset-0 bg-[url('/public/paper.png')] opacity-20 pointer-events-none" />

        <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-start">
          <div>
            <h1 className="font-grotesk font-black text-2xl uppercase tracking-tighter">
              North Pole
            </h1>
            <p className="font-jetbrains text-xs text-slate-600">Department of Code & Conduct</p>
          </div>
          <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center text-white font-serif font-bold text-xs shadow-sm border-2 border-red-800">
            2025
          </div>
        </div>

        <div className="space-y-6 font-jetbrains text-sm relative z-10">
          <div className="flex items-end justify-between border-b border-slate-300 pb-1">
            <span className="text-slate-500 text-sm uppercase font-medium font-grotesk">
              Developer
            </span>
            <span className="font-bold text-lg">@{stats.username}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-100 p-3 border border-slate-200">
              <span className="text-slate-500 text-sm block mb-1 font-grotesk">
                Commits (Public)
              </span>
              <span className="font-bold text-xl">{stats.totalCommits}</span>
            </div>
            <div className="bg-slate-100 p-3 border border-slate-200">
              <span className="text-slate-500 text-sm block mb-1 font-grotesk">Top Tech</span>
              <span className="font-bold text-xl">{stats.topLanguage}</span>
            </div>
            <div className="bg-slate-100 p-3 border border-slate-200">
              <span className="text-slate-500 text-sm block mb-1 font-grotesk">Longest Streak</span>
              <span className="font-bold text-xl">{stats.longestStreak} days</span>
            </div>
            {stats.stars > 0 && (
              <div className="bg-slate-100 p-3 border border-slate-200">
                <span className="text-slate-500 text-sm block mb-1 font-grotesk">
                  Stars Received
                </span>
                <span className="font-bold text-xl">{stats.stars}</span>
              </div>
            )}
          </div>

          <div className="py-4 text-center relative">
            <span className="text-slate-500 text-xs uppercase tracking-widest mb-2 block font-grotesk">
              Official Status
            </span>
            <div
              className={`inline-block px-8 py-2 font-black text-3xl uppercase tracking-widest transform -rotate-12 mask-stamp border rounded-lg ${stats.isNaughty ? "border-red-600 text-red-600" : "border-emerald-700 text-emerald-700"}`}
            >
              {stats.isNaughty ? "NAUGHTY" : "NICE"}
            </div>
          </div>

          <p className="text-center italic font-serif text-slate-600">
            &quot;{stats.verdictReason}&quot;
          </p>
        </div>

        <div className="mt-8 pt-4 border-t-2 border-slate-900 flex justify-between items-center opacity-70">
          <div className="text-[10px] leading-tight font-jetbrains">
            AUTH: S.CLAUS <br />
            ID: NP-{id}
          </div>
          <div className="font-cursive text-2xl rotate-[-13deg]">SantaClaus</div>
        </div>
      </div>

      <div className="flex gap-4 w-full">
        <button
          onClick={handleDownload}
          className="flex-1 bg-white hover:bg-slate-200 text-slate-900 font-grotesk cursor-pointer font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Download size={18} /> Download
        </button>

        <button
          onClick={handleShare}
          className="flex-1 bg-sky-500 hover:bg-sky-600 text-white font-grotesk cursor-pointer font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Share2 size={18} /> Share
        </button>
      </div>
    </motion.div>
  );
}
