"use client"

import { useEffect, useState } from "react"
import { getAllTechs, deleteTech } from "@/lib/actions/tech"
import { Pencil, Trash, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAppwrite } from "@/hooks/useAppwrite"
import { Tech } from "@/types"
import clsx from "clsx"

export default function ListTechnologiesPage() {
    const [technologies, setTechnologies] = useState<Tech[]>([])
    const [deletingId, setDeletingId] = useState<string | null>(null)
    
    const { data: techs, loading } = useAppwrite({ fn: getAllTechs })

    useEffect(() => {
        if (techs) {
            setTechnologies(techs)
        }
    }, [techs])

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm("Confirmer la suppression ?")
        if (!confirmed) return

        try {
            setDeletingId(id)
            await deleteTech(id)
            setTechnologies((prev) => prev.filter((tech) => tech.id !== id))
        } catch (err) {
            console.error("Erreur suppression :", err)
        } finally {
            setDeletingId(null)
        }
    }

    return (
        <div className="min-h-screen p-8 bg-gray-50 dark:bg-neutral-900">
            <div className="w-full max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Liste des technologies</h2>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
                    </div>
                ) : technologies.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">Aucune technologie trouvée.</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {technologies.map((tech) => (
                            <div
                                key={tech.id}
                                className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-4 shadow-sm flex flex-col items-center text-center"
                            >
                                {tech.icon ? (
                                    <img
                                        src={tech.icon}
                                        alt={tech.title}
                                        width={64}
                                        height={64}
                                        className="rounded-md object-contain mb-4"
                                    />
                                ) : (
                                    <div className="w-16 h-16 bg-gray-200 rounded mb-4" />
                                )}

                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{tech.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tech.description || "—"}</p>

                                <div className="flex gap-2 mt-auto">
                                    <Link
                                        href={`/admin/technologies/${tech.id}/edit`}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                                    >
                                        <Pencil className="w-4 h-4" />
                                        Éditer
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(tech.id)}
                                        disabled={deletingId === tech.id}
                                        className={clsx(
                                            "inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-md text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800 transition",
                                            deletingId === tech.id && "opacity-50 cursor-not-allowed"
                                        )}
                                    >
                                        <Trash className="w-4 h-4" />
                                        {deletingId === tech.id ? "Suppression…" : "Supprimer"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
