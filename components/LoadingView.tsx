import { motion } from "motion/react";

export default function LoadingView() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-6"
    >
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-red-500 border-r-emerald-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 text-3xl flex items-center justify-center font-mono animate-pulse">
          🎅
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className="font-jetbrains text-emerald-500 dark:text-emerald-400 animate-pulse text-xl">
          Contacting North Pole API...
        </p>
        <p className="text-sm text-slate-500 font-jetbrains">
          Scanning for `console.log` leftovers...
        </p>
      </div>
    </motion.div>
  );
}
