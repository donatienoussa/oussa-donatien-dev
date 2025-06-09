"use client"

import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useAppwrite } from '@/hooks/useAppwrite';
import { fetchProjects } from '@/lib/actions/projects';
import Loader from '@/components/ui/Loader';
import Link from 'next/link';


function ProjectsList() {

    const { data: projects, loading } = useAppwrite({
        fn: fetchProjects
    });

    if (loading) return <Loader />

    if(!projects) return <p>Pas de projets</p>

    return (
        <div className="min-h-screen p-6 text-white">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Mes Projets</h1>
                <Link
                    href="/admin/projects/create"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md transition">
                    <Plus className="w-4 h-4" />
                    Ajouter un projet
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <Link key={project.id} href={`/admin/projects/${project.id}`}>
                        <div
                            className="bg-gray-900 border-2 border-gray-800 rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col justify-between"
                        >
                            <img
                                src={project.img}
                                alt={project.title}

                                className="w-full h-40 object-cover rounded-xl mb-4"
                            />
                            <div>
                                <h2 className="text-lg font-semibold text-white mb-2">{project.title}</h2>
                                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.iconLists.map((icon: string, index: string) => (
                                        <img key={index} src={icon} alt="tech icon" className="w-6 h-6" />
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between mt-auto pt-2 border-t border-gray-800">
                                <button className="flex items-center gap-1 text-blue-400 hover:text-blue-500 text-sm font-medium transition">
                                    <Pencil className="w-4 h-4" />
                                    Modifier
                                </button>
                                <button className="flex items-center gap-1 text-red-400 hover:text-red-500 text-sm font-medium transition">
                                    <Trash2 className="w-4 h-4" />
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ProjectsList;
