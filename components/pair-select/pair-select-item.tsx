import { Pair } from "./types"

export function PairSelectItem({ pair }: { pair: Pair }) {
    return (
        <div className="flex flex-col">
            <span className="text-sm font-medium">{pair.name}</span>
            {pair.description && (
                <span className="text-xs text-muted-foreground">
                    {pair.description}
                </span>
            )}
        </div>
    )
}
