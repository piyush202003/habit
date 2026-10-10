import { useState } from "react"
import { CATEGORIES, COLORS, ICONS } from "../utils/constants"

const HabitForm = ({ initial, onSubmit, onCancel, submitting}) => {

    const [form, setForm] = useState({
        name:initial?.name || '',
        description: initial?.description || "",
        category: initial?.category || "Health",
        frequency: initial?.frequency || "daily",
        targetDays: initial?.targetDays || 7,
        color: initial?.color || COLORS[0],
        icon: initial?.icon || ICONS[0],
    })

    const set = (k) => (e) =>{
        setForm((f)=>({...f, [k]:e.target ? e.target.value : e}))
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(!form.name.trim()) return
        onSubmit({...form, targetDays:Number(form.targetDays)})
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="label">Habit name`</label>
                <input type="text" className="input" value={form.name} onChange={set('name')} required autoFocus placeholder="e.g. Drink 2L of water" />
            </div>
            <div>
                <label className="label">Description</label>
                <textarea rows={2} value={form.description} onChange={set('description')} placeholder="Why does this habit matter to you?" className="input resize-none"></textarea>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="label">Category</label>
                    <select value={form.category} onChange={set('category')} className="input">
                        {CATEGORIES.map((c)=>(
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="label">Frequency</label>
                    <select value={form.frequency} onChange={set('frequency')} className="input">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="label">
                    Target days per week:{' '}
                    <span className="font-semibold">{form.targetDays}</span>
                </label>
                <input type="range" min={1} max={7} value={form.targetDays} onChange={set('targetDays')} className="w-full accent-brand-600" />
            </div>

            <div>
                <label className="label">Icon</label>
                <div className="flex flex-wrap gap-2">
                    {ICONS.map((i)=>(
                        <button
                            type="button"
                            key={i}
                            onClick={()=>set('icon')(i)}
                            className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition ${form.icon === i
                                ? 'ring-2 ring-brand-500 bg-brand-500/15'
                                : 'glass hover:bg-[var(--surface-hover)]'
                            }`}
                        >
                            {i}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="label">Color</label>
                <div className="flex gap-2">
                    {COLORS.map((c)=>(
                        <button
                            type="button"
                            key={c}
                            onClick={()=>set('color')(c)}
                            className={`w-8 h-8 rounded-full transition ${form.color === c
                                ? 'ring-4 ring-offset-2 ring-offset-[var(--bg-base)]'
                                : ''
                            }`}
                            style={{ background: c }}
                            aria-label={`Select color ${c}`}
                        ></button>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={onCancel} className="btn-secondary">
                    Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                    {submitting ? 'Saving...' : initial ? 'Save changes' : 'Create habit'}
                </button>
            </div>
        </form>
    )
}

export default HabitForm