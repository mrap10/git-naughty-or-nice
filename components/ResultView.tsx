import { UserStats } from "@/lib/types"

interface ResultViewProps {
    stats: UserStats;
    onReset: () => void;
}

export default function ResultView({ stats, onReset }: ResultViewProps) {
    return (
        <div className="flex flex-col items-center space-y-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition" onClick={onReset}>Try another</button>
            <div className="w-60 h-60 p-2 bg-slate-900 text-white flex flex-col items-center justify-center text-center">
                certificate comprising user results
                <span className="mt-4 font-mono text-sm text-red-500">
                    {stats.username}
                </span>
            </div>
        </div>
    )
}