export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center space-y-6 h-screen bg-black text-white">
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-center">
        GIT <span className="text-red-500">NAUGHTY</span>
        <br /> OR <span className="text-emerald-500">NICE </span>?
      </h1>
      <p className="text-slate-400 font-mono text-xl">
        Connect your GitHub to see if you deserve coal or code.
      </p>
    </div>
  );
}
