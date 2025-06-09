"use client"

import { useUser } from "@/context/UserContext"
import { redirect } from "next/navigation"
import Loader from "@/components/ui/Loader"
import NavLink from "@/components/ui/NavLink"
import { ReactNode } from "react"

export default function AdminLayout({children}:{children: ReactNode}) {
  
  const { user, loading } = useUser()

  if (loading) return <Loader />

  if (!loading && !user) redirect("/sign-in")

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="p-6 font-bold text-xl border-b dark:border-gray-700">@ODB@</div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink link="/" label="Tableau de bord" />
          <NavLink link="/admin/projects" label="Projets" />
          <NavLink link="/admin/blog" label="Blog" />
          <NavLink link="/admin/testimonials" label="Témoignages" />
        </nav>
        <div className="p-4 border-t text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
          Connecté en tant que {user?.email}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Bienvenue, {user?.email}</h1>

        {children}
      </main>
    </div>
  )
}



// function StatCard({ title, count }: { title: string; count: number }) {
//   return (
//     <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
//       <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">{title}</h2>
//       <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{count}</p>
//     </div>
//   )
// }

// function Section({ title }: { title: string }) {
//   return (
//     <div className="mb-10">
//       <div className="flex justify-between items-center mb-3">
//         <h3 className="text-xl font-semibold">{title}</h3>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
//           Ajouter
//         </button>
//       </div>
//       <div className="border dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 p-4 text-gray-500 dark:text-gray-400 italic text-sm">
//         Aucun contenu pour le moment.
//       </div>
//     </div>
//   )
// }