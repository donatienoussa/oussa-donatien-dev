'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MoreVertical, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { useAppwrite } from '@/hooks/useAppwrite';
import { fetchTestimonials, deleteTestimonial } from '@/lib/actions/testimonials';
import { Testimonial } from '@/types';

function ActionMenu({
    id,
    onDelete,
    deleting,
}: {
    id: string;
    onDelete: (id: string) => void;
    deleting: boolean;
}) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const closeMenu = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', closeMenu);
        return () => document.removeEventListener('mousedown', closeMenu);
    }, []);

    return (
        <div ref={menuRef} className="relative inline-block text-left">
            <button
                onClick={() => setOpen(prev => !prev)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
                aria-label="Actions témoignage"
            >
                <MoreVertical className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-md shadow-lg bg-white dark:bg-zinc-900 ring-1 ring-black ring-opacity-10 dark:ring-opacity-50 z-20 animate-fadeIn">
                    <div className="py-1 text-sm text-gray-700 dark:text-white">
                        <Link
                            href={`/admin/testimonials/edit/${id}`}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                        >
                            Modifier
                        </Link>
                        <button
                            onClick={async () => {
                                if (confirm('Confirmer la suppression ?')) {
                                    onDelete(id);
                                }
                            }}
                            disabled={deleting}
                            className={clsx(
                                'w-full text-left px-4 py-2 hover:bg-red-100 dark:hover:bg-red-700 text-red-600 dark:text-red-400 transition',
                                deleting && 'opacity-50 cursor-not-allowed'
                            )}
                        >
                            {deleting ? 'Suppression…' : 'Supprimer'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ListOfTestimonials() {
    const { data: initialTestimonials, loading } = useAppwrite({ fn: fetchTestimonials });
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        if (initialTestimonials) setTestimonials(initialTestimonials);
    }, [initialTestimonials]);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await deleteTestimonial(id);
            setTestimonials(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error('Erreur lors de la suppression :', err);
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 dark:bg-zinc-900 transition-colors">
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
            </div>
        );
    }

    if (testimonials.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 dark:bg-zinc-900 transition-colors">
                <span className="text-gray-500 dark:text-gray-400">Aucun témoignage pour l’instant.</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-gray-100 dark:bg-zinc-900 transition-colors">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Témoignages ({testimonials.length})
                </h1>
                <Link
                    href="/admin/testimonials/create"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                    Ajouter
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-zinc-700">
                <table className="w-full table-auto text-sm">
                    <thead className="bg-gray-200 dark:bg-zinc-800">
                        <tr>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-400 w-1/4">
                                Témoignage
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-400">
                                Auteur
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-400">
                                Poste
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-400 w-1/6">
                                Brouillon
                            </th>
                            <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-400 w-1/6">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials.map(({ id, quote, name, title, draft }) => (
                            <tr
                                key={id}
                                className="border-t border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-900 transition"
                            >
                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{quote}</td>
                                <td className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">{name}</td>
                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{title}</td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{draft ? 'Oui' : 'Non'}</td>
                                <td className="px-4 py-3">
                                    <ActionMenu id={id} onDelete={handleDelete} deleting={deletingId === id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
