'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';
import { deletePost, fetchPosts } from '@/lib/actions/posts';
import { useAppwrite } from '@/hooks/useAppwrite';
import { FaPlus } from 'react-icons/fa6';
import { formatDateToColumn } from '@/lib/utils';

const ActionMenu = ({
    id,
    onDelete,
}: {
    id: string;
    onDelete: (id: string) => void;
}) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={menuRef} className="relative inline-block text-left">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
                aria-label="Actions"
            >
                <MoreHorizontal className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            {open && (
                <div className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white dark:bg-zinc-900 ring-1 ring-black ring-opacity-10 dark:ring-opacity-50 z-10 animate-fadeIn">
                    <div className="py-1 text-sm text-gray-700 dark:text-white">
                        <Link
                            href={`/admin/blog/${id}`}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                        >
                            Lire
                        </Link>
                        <Link
                            href={`/admin/blog/${id}/edit`}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
                        >
                            Éditer
                        </Link>
                        <button
                            onClick={async () => {
                                const confirmDelete = confirm('Confirmer la suppression ?');
                                if (confirmDelete) {
                                    await deletePost(id);
                                    onDelete(id);
                                }
                            }}
                            className="w-full text-left block px-4 py-2 hover:bg-red-100 dark:hover:bg-red-700 text-red-600 dark:text-red-400 transition"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const PostsList = () => {
    const { data: initialPosts, loading } = useAppwrite({
        fn: fetchPosts,
    });

    const [posts, setPosts] = useState(initialPosts || []);

    useEffect(() => {
        if (initialPosts) {
            setPosts(initialPosts);
        }
    }, [initialPosts]);

    const handleDelete = (id: string) => {
        setPosts((prev) => prev.filter((post) => post.id !== id));
    };

    if (loading) {
        return (
            <div className="min-h-screen p-6 bg-gray-100 dark:bg-zinc-900 flex items-center justify-center transition-colors duration-300">
                <span className="text-gray-600 dark:text-gray-300">Chargement des articles…</span>
            </div>
        );
    }

    if (!posts || posts.length === 0) {
        return (
            <div className="min-h-screen p-6 bg-gray-100 dark:bg-zinc-900 flex items-center justify-center transition-colors duration-300">
                <span className="text-gray-500 dark:text-gray-400">Aucun article trouvé.</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 bg-gray-100 dark:bg-zinc-900 transition-colors duration-300">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Articles ({posts.length})
                </h1>
                <Link
                    href="/admin/blog/create"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                    <FaPlus className="mr-2" />
                    Ajouter
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-zinc-700">
                <table className="w-full h-screen table-auto text-sm">
                    <thead className="bg-gray-200 dark:bg-zinc-800">
                        <tr>
                            <th className="text-left px-4 py-2 text-gray-700 dark:text-gray-400 font-semibold w-1/4">
                                Date
                            </th>
                            <th className="text-left px-4 py-2 text-gray-700 dark:text-gray-400 font-semibold">
                                Titre
                            </th>
                            <th className="text-left px-4 py-2 text-gray-700 dark:text-gray-400 font-semibold">
                                Résumé
                            </th>
                            <th className="text-left px-4 py-2 text-gray-700 dark:text-gray-400 font-semibold w-1/6">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr
                                key={post.id}
                                className="border-t border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-900 transition"
                            >
                                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                    {formatDateToColumn(post.postedAt)}
                                </td>
                                <td className="px-4 py-3 text-gray-900 dark:text-white">
                                    {post.title}
                                    {post.isDraft && (
                                        <span className="ml-2 text-xs text-yellow-500 dark:text-yellow-400">(Brouillon)</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                    {post.excerpt}
                                </td>
                                <td className="px-4 py-3">
                                    <ActionMenu id={post.id} onDelete={handleDelete} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PostsList;
