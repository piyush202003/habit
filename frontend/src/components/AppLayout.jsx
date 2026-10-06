import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"



const AppLayout = () => {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="md:ml-64 px-4 md:px-8 py-6 md:py-8 pb-24md:pb-10 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout