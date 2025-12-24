export default function Snowfall() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute text-slate-700/30 text-xs animate-pulse"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        fontSize: `${Math.random() * 20 + 10}px`
                    }}
                >
                    ❄
                </div>
            ))}
        </div>
    )
}