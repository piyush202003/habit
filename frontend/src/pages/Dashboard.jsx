import { use, useEffect, useMemo, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { streakFromKeys, weekKeys } from "../utils/dateHelpers"
import api from "../api/axios"
import { Plus, Sparkles } from "lucide-react"
import MorningMotivation from "../components/MorningMotivation"


const Dashboard = () => {
 
  const { user } = useAuth()

  const [habits, setHabits] = useState([])
  const [todayLogs, setTodayLogs] = useState([])
  const [weekLogs, setWeekLogs] = useState([])
  const [headmap, setHeatmap] = useState([])
  const [allLogsByHabit, setAllLogsByHabit] = useState([])
  const [loading, setLoading] = useState(true)

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const [suggestOpen, setSuggestOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [recoveryHabit, setRecoveryHabit] = useState(null)

  const loadAll = async()=>{
    setLoading(true)
    try{
      const week = weekKeys()
      const start = week[0].key
      const end = week[week.length - 1].key

      const [habitsRes, todayRes, rangeRes, heatRes] = await Promise.all([
        api.get('/habits'),
        api.get('/logs/today'),
        api.get('/logs/range', {params:{start,end}}),
        api.get('/logs/heatmap'),
      ])

      setHabits(habitsRes.data)
      setTodayLogs(todayRes.data)
      setWeekLogs(rangeRes.data)
      setHeatmap(heatRes.data)

      const byId = {}
      const start90 = new Date()
      start90.setDate(start90.getDate()-89)
      const s90 = start90.toISOString().slice(0, 10)
      const e90 = new Date().toISOString().slice(0, 10)
      const allRange = await api.get('/logs/range', {
        params: {start: s90, end:e90}
      })
      for (const h of habitsRes.data) byId[h._id] = []
      for (const l of allRange.data) {
        if(!byId[l.habitId]) byId[l.habitId] = []
        byId[l.habitId].push(l.completedDate)
      }
      for(const k of Object.keys(byId)) byId[k] = byId[k].sort().reverse()
      setAllLogsByHabit(byId)
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    loadAll()
  },[])

  const completedTOday = useMemo(()=> new Set(todayLogs.map((l)=>String(l.habitId))),[todayLogs])

  const weekLogsByHabit = useMemo(()=>{
    const out = {}
    for(const l of weekLogs){
      if (!out[l.habitId]) out[l.habitId]=[]
      out[l.habitId].push(l.completedDate)
    }
    return out
  },[weekLogs])

  const streaksById = useMemo(()=>{
    const out = {}
    for(const h of habits){
      out[h._id] = streakFromKeys(allLogsByHabit[h._id] || [])
    }
    return out
  },[habits, allLogsByHabit])

  return (
    <div className="spacey-y-6 animate-fade-in">
      <div className="flex items-center justify-between gap-3">
        
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Hey {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-muted mt-0 5">
            {new Date().toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'long',
              day:'numeric',
            })}
          </p>
        </div>

        <div className="flex items-center gap-2">
            <button onClick={()=>setSuggestOpen(true)} className="btn-secondary">
              <Sparkles size={14} />
              <span className="hidden sm:inline">Suggest a habit</span>
            </button>
            <button onClick={()=>{setEditing(null);setFormOpen(true);}} className="btn-primary">
              <Plus size={14} />
              New Habit
            </button>
        </div>
      </div>

      <MorningMotivation />

      
    </div>
  )
}

export default Dashboard