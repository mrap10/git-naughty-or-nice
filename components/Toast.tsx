import { motion } from "motion/react";
import { X, AlertCircle } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: 20, x: "-50%" }}
      className="fixed bottom-10 left-1/2 z-50 flex items-center gap-3 bg-red-950/70 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl backdrop-blur-md shadow-xl shadow-red-900/20"
    >
      <AlertCircle size={18} className="text-red-500" />
      <span className="text-sm font-medium font-jetbrains">{message}</span>
      <button 
        onClick={onClose} 
        className="ml-2 p-1 hover:bg-red-500/20 rounded-full transition-colors"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}
