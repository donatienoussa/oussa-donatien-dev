'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export default function NavLink({
    label,
    link,
    icon,
}: {
    label: string
    link: string
    icon?: ReactNode
}) {
    const pathname = usePathname()
    const isActive = pathname === link

    return (
        <Link
            href={link}
            className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
                isActive
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
        >
            {icon && <span className="text-lg">{icon}</span>}
            <span>{label}</span>
        </Link>
    )
}
