import LandingView from "@/components/LandingView";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-slate-200 selection:bg-red-500/30 overflow-hidden relative">
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <LandingView />
      </main>

      <footer>
        <div className="w-full max-w-md text-center space-y-4 mx-auto py-6">
          <p className="text-slate-500 font-mono">
            Made with ❤️ by <Link href="https://github.com/mrap10" className="text-red-500">mrap10</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
