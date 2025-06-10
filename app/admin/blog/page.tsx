'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MoreHorizontal } from 'lucide-react';
import { fetchPosts } from '@/lib/actions/posts';
import { useAppwrite } from '@/hooks/useAppwrite';
import { FaPlus } from 'react-icons/fa6';
import { formatDateToColumn } from '@/lib/utils';


const ActionMenu: React.FC = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Ferme le dropdown si on clique en dehors
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        if (typeof document !== 'undefined') {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
        
    }, []);

    return (
        <div ref={menuRef} className="relative inline-block text-left">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="p-2 rounded-full hover:bg-gray-700 transition"
                aria-label="Actions"
            >
                <MoreHorizontal className="w-5 h-5 text-gray-200" />
            </button>

            {open && (
                <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-50 z-10">
                    <div className="py-1">
                        <Link
                            href="#"
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                        >
                            Lire
                        </Link>
                        <Link
                            href="#"
                            className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                        >
                            Éditer
                        </Link>
                        <button className="w-full text-left block px-4 py-2 text-sm text-white hover:bg-gray-800">
                            Supprimer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


const PostsList = () => {
    
    const { data: latestPosts, loading } = useAppwrite({
        fn: fetchPosts,
    })
  
    if (loading) {
        return (
            <div className="min-h-screen p-6 bg-black-100 text-white flex items-center justify-center">
                <span>Chargement des articles…</span>
            </div>
        );
    }

   
    return (
        <div className="min-h-screen p-6 bg-black-100 text-white">
            <h1 className="text-3xl font-bold mb-6">Liste des Posts</h1>
            <Link
                href="/admin/blog/create"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md transition">
                <FaPlus className="w-4 h-4" />
                Ajouter un post
            </Link>

            {(latestPosts  === null || latestPosts?.length === 0)  ? (
                <p className="text-gray-400 mt-4">Aucun article pour le moment.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr>
                                    <th className="text-left text-sm font-semibold text-gray-400 pb-2 border-b border-gray-700 w-1/4">
                                        Date
                                    </th>
                                    <th className="text-left text-sm font-semibold text-gray-400 pb-2 border-b border-gray-700">
                                        Titre
                                    </th>
                                    <th className="text-left text-sm font-semibold text-gray-400 pb-2 border-b border-gray-700 w-1/6">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {latestPosts.map((post, idx) => (
                                    <tr
                                        key={idx}
                                        className="hover:bg-gray-900 transition-colors duration-200"
                                    >
                                        <td className="py-3 px-2 text-sm text-gray-200">
                                            {formatDateToColumn(post.postedAt)}
                                        </td>
                                        <td className="py-3 px-2 text-sm text-white">
                                            {post.title}
                                            {post.isDraft && (
                                                <span className="ml-2 text-xs text-yellow-400">(Brouillon)</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-2 text-sm">
                                            <ActionMenu />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>   
            )}


          
        </div>
    );
};

export default PostsList;
