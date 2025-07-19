import { cn } from "@/lib/utils"
import Link from "next/link"
import { ReactNode } from "react"
import { FiChevronDown } from "react-icons/fi"


export default function DropdownMenu({
    title,
    icon,
    open,
    toggle,
    links,
}: {
    title: string
    icon: ReactNode
    open: boolean
    toggle: () => void
    links: { href: string; label: string }[]
}) {
    return (
        <div>
            <button
                onClick={toggle}
                className="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <span className="flex items-center gap-2">
                    {icon}
                    {title}
                </span>
                <FiChevronDown
                    className={cn('transition-transform', { 'rotate-180': open })}
                />
            </button>
            {open && (
                <div className="ml-6 mt-1 space-y-1">
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="block px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
