import { BarChart3, Brain, CalendarDays, LayoutDashboard, ListChecks, Moon, Sparkles, Sun } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import { useState } from "react"
import api from "../api/axios"
import { NavLink } from "react-router-dom"

const nav = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/habits', label: 'Habits', icon: ListChecks},
    { to: '/weekly', label: 'Weekly', icon: CalendarDays},
    { to: '/insights', label: 'Insights', icon: Brain},
    { to: '/stats', label: 'Statistics', icon: BarChart3},
]

const Sidebar = () => {
    const { user, logout, updateUser } = useAuth()
    const { theme, toggle } = useTheme()
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [morning, setMorning] = useState(user?.morningMotivation || false)
    const [name, setName] = useState(user?.name || '')
    const [saving, setSaving] = useState(false)

    const save = async () =>{
        setSaving(true)
        try{
            const res = await api.put('/auth/profile', {
                name, morningMotivation: morning
            })
            updateUser(res.data.user)
            setSettingsOpen(false)
        }finally{
            setSaving(false)
        }
    }

    return (
        <aside className="hidden md:flex md:flex-col w-64 fixed inset-y-0 left-0 z-30 glass border-r">
            <div className="px-6 py-5 border-b divider">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white flex items-center justify-center shadow-lg shadow-brand-500/30">
                        <Sparkles size={18} />
                    </div>
                    <div className="font-semibold text-lg tracking-tight">AI Habit Tracker</div>
                </div>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
                {nav.map(({to, label, icon:Icon})=>(
                    <NavLink key={to} to={to} className={({ isActive })=>{
                        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition
                        ${isActive ? 'bg-gradient-to-r from-brand-500/15 to-brand-500/5 text-brand-700 dark:text-brand-300 ring-1 ring-brand-500/20': 'text-soft hover:bg-[var(--surface-hover)]'}`
                    }}>
                        <Icon size={18} /> {label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-3 border-t divider space-y-1">
                <button onClick={toggle} className='w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-soft hover:bg-[var(--surface-hover)] transition'>
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18}/>}
                    {theme === 'dark' ? 'Light mode' : 'Dark modes'}
                </button>

            </div>
        </aside>
    )
}

export default Sidebar