import Link from "next/link";

export default function NavLink({ label, link }: { label: string, link: string }) {
    return (
        <Link
            href={link}
            className="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
            {label}
        </Link>
    )
}  