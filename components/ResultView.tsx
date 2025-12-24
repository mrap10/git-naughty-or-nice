import { UserStats } from "@/lib/types"

interface ResultViewProps {
    stats: UserStats;
    onReset: () => void;
}

export default function ResultView({ stats, onReset }: ResultViewProps) {
    return (
        <div>
            <div>
                reset button <button onClick={onReset}>Reset</button>
            </div>
            <div>
                certificate comprising user results {stats.username}
            </div>
        </div>
    )
}