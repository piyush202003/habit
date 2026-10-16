import { format, parseISO } from "date-fns";
import { useMemo } from "react";

const levelColor = (count, max) => {
    if (!count) return "var(--heat-0)";
    const ratio = count / Math.max(1, max);
    if (ratio < 0.25) return "var(--heat-1)";
    if (ratio < 0.5) return "var(--heat-2)";
    if (ratio < 0.85) return "var(--heat-3)";
    return "var(--heat-4)";
};

export default function HeatmapChart({ data=[] }){
    const { cols, max} = useMemo(()=>{
        if (!data.length) return {cols:[], max:0}
        const max = Math.max(...data.map((d)=>d.count))
        const cols = []
        let col = []
        data.forEach((d, i)=>{
            const dow = new Date(d.date).getDay()
            const shifted = (dow + 6)%7
            if(i===0) for (let j=0; j< shifted; j++) col.push(null)
            col.push(d)
            if (shifted === 6){
                cols.push(col)
                col=[]
            }
        })

        if(col.length){
            while(col.length < 7) col.push(null)
            cols.push(col)
        }
        return {cols, max}
    }, [data])

    const totalCount = data.reduce((s,d)=>s+d.count, 0)

    return (
        <div className="card p-5 min-w-0 w-full">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="text-sm font-medium">Consistency</div>
                    <div className="text-xs text-muted">
                        {totalCount} completions 
                        <br />in the last 90 days
                    </div>
                </div>
                <div className="flex shrink-0 items-center gap-1 text-xs text-muted">
                    Less
                    {[0,0.2,0.5,0.8,1].map((r,i)=>(
                        <span
                            key={i}
                            className="w-3 h-3 rounded-sm"
                            style={{background: levelColor(r*(max || 1), max || 1)}}
                        ></span>
                    ))}
                    More
                </div>
            </div>

            <div
                className="grid w-full"
                style={{
                    gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))`,
                    gap: "3px",
                }}
            >
                {cols.map((col, ci) => (
                    <div key={ci} className="grid min-w-0 gap-[3px]">
                    {col.map((d, ri) =>
                        d ? (
                        <div
                            key={ri}
                            className="aspect-square w-full min-w-0 rounded-sm transition-colors"
                            style={{ background: levelColor(d.count, max || 1) }}
                            title={`${format(parseISO(d.date), "MMM d, yyyy")} — ${
                            d.count
                            } completion${d.count === 1 ? "" : "s"}`}
                        />
                        ) : (
                        <div key={ri} className="aspect-square w-full min-w-0" />
                        )
                    )}
                    </div>
                ))}
            </div>
        </div>
    )
}