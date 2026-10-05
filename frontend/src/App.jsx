import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import LoadingSpinner from "./components/LoadingSpinner"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AppLayout from "./components/AppLayout"
import Dashboard from "./pages/Dashboard"
import Habits from "./pages/Habits"
import Weekly from "./pages/Weekly"
import Stats from "./pages/Stats"

function ProtectedRoute({children}){
  const { user, loading } = useAuth()
  const location = useLocation()

  if(loading) return <LoadingSpinner full />
  if (!user){
    return <Navigate to='/login' state={{ from:location.pathname }} replace />
  }
  return children
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />

      <Route element={
        <ProtectedRoute>
          <AppLayout/>
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path='/habits' element={<Habits/>} />
        <Route path='/weekly' element={<Weekly/>} />
        <Route path='/insights' element={<Element/>} />
        <Route path='/stats' element={<Stats/>} />
      </Route>

      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default App
