import { useEffect, useState } from "react"
import api from "../api/axios"
import { format, subDays } from "date-fns"


const Habits = () => {

  const [habits, setHabits] = useState([])
  const [logsByHabit, setLogsByHabit] = useState({})
  const [loading, setLoading] = useState(true)

  const [showArchived, setShowArchived] = useState(false)
  const [query, setQuery] = useState({})
  const [category, setCategory] = useState('All')

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [suggestOpen, setSuggestOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const load = async () => {
    setLoading(true)
    try{
      const [habitsRes, rangeRes] = await Promise.all([
        api.get('/habits', {params:{includeArchived: 'true'}}),
        api.get('/logs/range', {
          params:{
            start: format(subDays(new Date(), 89), 'yyyy-MM-dd'),
            end: format(new Date(), 'yyyy-MM-dd'),
          }
        })
      ])
      console.log( `habitsRes=${habitsRes.data}, rangeRes=${rangeRes.data}`)
      setHabits(habitsRes.data)
      const byId = {}
      for(const h of habitsRes.data) byId[h._id] = []
      for(const l of rangeRes.data) {
        if(!byId[l.habitId]) byId[l.habitId] = []
        byId[l.habitId].push(l.completedDate)
      }
      for(const k of Object.keys(byId)) byId[k]=byId[k].sort().reverse()
      setLogsByHabit(byId)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    load()
  },[])

  return (
    <div>Habits</div>
  )
}

export default Habits