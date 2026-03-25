export default function ChartBars() {
    const data = [38, 55, 42, 72, 48, 88, 62, 95, 57, 80, 71, 100]

    return (
        <div
            className="flex w-full items-end justify-between gap-1.5"
            style={{ height: 88 }}
        >
            {data.map((h, i) => (
                <div
                    key={i}
                    className="flex flex-1 flex-col items-center gap-0.5"
                >
                    <div
                        className="w-px bg-black/30 dark:bg-white/30"
                        style={{
                            height: `${h * 0.18}px`,
                        }}
                    />
                    <div
                        className="w-full rounded-sm bg-black dark:bg-white"
                        style={{
                            height: `${h * 0.72}px`,
                            opacity: 0.45 + (i / data.length) * 0.55,
                        }}
                    />
                </div>
            ))}
        </div>
    )
}
