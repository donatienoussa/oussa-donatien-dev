'use client'

import { useUser } from '@/context/UserContext'
import { redirect } from 'next/navigation'
import Loader from '@/components/ui/Loader'
import NavLink from '@/components/ui/NavLink'
import { ReactNode, useState } from 'react'
import {
  FiGrid,
  FiMenu,
  FiX,
} from 'react-icons/fi'
import { cn } from '@/lib/utils'
import { dashbordMenuItems } from '@/data'
import DropdownMenu from '@/components/DropdownMenu'


export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useUser()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  const [showSidebar, setShowSidebar] = useState(false)

  if (loading) return <Loader />
  if (!loading && !user) redirect('/sign-in')

  const toggleMenu = (key: string) => {
    setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Mobile Trigger */}
      <div className="md:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => setShowSidebar(prev => !prev)}
          className="p-2 rounded bg-white dark:bg-gray-800 shadow-md"
        >
          {showSidebar ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed md:static top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col transition-transform z-40',
          {
            '-translate-x-full': !showSidebar,
            'translate-x-0': showSidebar,
            'md:translate-x-0': true,
          }
        )}
      >
        <div className="p-6 font-bold text-xl border-b dark:border-gray-700">@ODB@</div>

        <nav className="flex-1 p-4 space-y-2 text-sm">
          <NavLink link="/admin" label="Tableau de bord" icon={<FiGrid />} />

          {dashbordMenuItems.map(item => (
            <DropdownMenu
              key={item.key}
              title={item.title}
              icon={item.icon}
              open={openMenus[item.key]}
              toggle={() => toggleMenu(item.key)}
              links={item.links}
            />
          ))}
        </nav>

        <div className="p-4 border-t text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
          Connecté en tant que {user?.email}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto ml-0">
        <h1 className="text-2xl font-bold mb-6">Bienvenue, {user?.email}</h1>
        {children}
      </main>
    </div>
  )
}
