import { BarChart3, Brain, CalendarDays, LayoutDashboard, ListChecks, LogOut, Moon, Sparkles, Sun } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import { NavLink } from "react-router-dom"


const MobileNav = () => {

    const { user, logout } = useAuth()
    const { theme, toggle } = useTheme()

    const navItems = [
        { to: "/dashboard", label: "Home", icon: LayoutDashboard },
        { to: "/habits", label: "Habits", icon: ListChecks },
        { to: "/weekly", label: "Weekly", icon: CalendarDays },
        { to: "/insights", label: "Insights", icon: Brain },
        { to: "/stats", label: "Stats", icon: BarChart3 },
    ]

    return (
        <div>
            <div className="md:hidden sticky top-0 z-20 glass border-b divider px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 shrink-0 rounded-lg bg-linear-to-br from-brand-700 to-brand-700 text-white flex items-center justify-center shadow-md shadow-brand-500/30">
                        <Sparkles size={16} />
                    </div>
                    <div className="font-semibold truncate">AI Habit Tracker</div>
                </div>
                
                <div className="flex shrink-0 items-center gap-2">
                    <button onClick={toggle} className="p-2 rounded-lg text-soft transition-colors hover:bg-[var(--surface-hover)] cursor-pointer" aria-label='Toggle theme'>
                        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-brand-500 to-brand-700 text-white text-sm font-semibold flex items-center justify-center">
                        {user?.avatar || user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <button onClick={logout} className="p-2 rounded-lg text-soft transition-colors hover:bg-[var(--surface-hover)] cursor-pointer"><LogOut size={16} /></button>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav
                aria-label="Mobile navigation"
                className="fixed inset-x-0 bottom-0 z-30 border-t divider glass md:hidden"
            >
                <div className="flex items-stretch justify-around px-1 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
                    {navItems.map(({ to, label, icon: Icon }) => (
                        <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg px-1 py-1.5 text-xs transition-colors ${
                            isActive
                                ? "font-semibold text-brand-700 dark:text-brand-300"
                                : "text-faint hover:text-soft"
                            }`
                        }
                        >
                        {({ isActive }) => (
                            <>
                            <Icon
                                size={20}
                                strokeWidth={isActive ? 2.4 : 1.8}
                            />
                            <span className="truncate">{label}</span>
                            </>
                        )}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </div>
    )
}

export default MobileNav