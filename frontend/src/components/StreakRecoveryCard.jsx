import { useState } from "react";
import api from "../api/axios";
import { Heart, RefreshCw, X } from "lucide-react";
import Markdown from "./Markdown";

export default function StreakRecoveryCard({ habit, onDismiss}){
    const [ content, setContent] = useState('')
    const [loading, setLoading] = useState(false)

    const generate = async ()=>{
        setLoading(true)
        try{
            const res = await api.post('/ai/recovery-plan', {habitId: habit._id})
            setContent(res.data.content)
        }finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative rounded-2xl p-5 glass overflow-hidden animate-slide-up">
            <div
                className="absolute inset-0 pointer-events-none opacity-60"
                style={{
                    background: "radial-gradient(circle at 0% 0%, rgba(244,114,182,0.22), transparent 55%), radial-gradient(circle at 100% 100%, rgba(239,68,68,0.15), transparent 55%)",
                }}
            ></div>

            <button onClick={onDismiss} className="absolute top-3 right-3 text-soft hover:text-[var(--text)] z-10" aria-label="Dismiss">
                <X size={16} />
            </button>

            <div className="flex items-start gap-3 pr-6 relative">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-brand-400 to-brand-800 text-white flex items-center justify-center shrink-0 shadow-lg shadow-rose-500/50">
                    <Heart size={18} />
                </div>
                <div className="flex-1">
                    <div className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-300">
                        Streak paused · {habit.name}
                    </div>
                    <div className="mt-1 text-sm text-soft">
                        You had a great run. Broken streaks are part of the journey — let's get back on track.
                    </div>

                    {!content ? (
                        <button onClick={generate} disabled={loading} className="mt-3 btn-primary">
                            {loading ? (
                                <>
                                    <RefreshCw size={14} className="animate-spin" />
                                    Building you plan...
                                </>
                            ):("Get back on track")}
                        </button>
                    ):(
                        <Markdown className="mt-3 glass rounded-xl p-4 text-sm">
                            {content}
                        </Markdown>
                    )}
                </div>
            </div>
        </div>
    )
}