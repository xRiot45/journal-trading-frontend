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
                        className="w-px opacity-30"
                        style={{
                            height: `${h * 0.18}px`,
                            background: "rgba(147,197,253,1)",
                        }}
                    />
                    <div
                        className="w-full rounded-sm"
                        style={{
                            height: `${h * 0.72}px`,
                            background:
                                i % 4 === 0
                                    ? "rgba(34,211,238,0.75)"
                                    : i % 3 === 0
                                      ? "rgba(52,211,153,0.65)"
                                      : "rgba(96,165,250,0.65)",
                            opacity: 0.45 + (i / data.length) * 0.55,
                        }}
                    />
                </div>
            ))}
        </div>
    )
}
