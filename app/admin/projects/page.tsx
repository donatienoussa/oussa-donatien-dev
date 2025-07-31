'use client';

import React, { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useAppwrite } from '@/hooks/useAppwrite';
import { fetchProjects, deleteProject } from '@/lib/actions/projects';
import Loader from '@/components/ui/Loader';
import Link from 'next/link';
import { toast } from 'sonner';
import { Project} from '@/types';


function ProjectsList() {

    const { data: webProjects, refetch: refetchWeb, loading: loadingWeb } = useAppwrite({
        fn: fetchProjects,
        params: { type: 'web' },
    });

    const { data: mobileProjects, refetch: refetchMobile, loading: loadingMobile } = useAppwrite({
        fn: fetchProjects,
        params: { type: 'mobile' },
    });

    const [search, setSearch] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const filteredWebProjects = useMemo(
        () =>
            (webProjects || []).filter((project: Project) =>
                project.title.toLowerCase().includes(search.toLowerCase())
            ),
        [webProjects, search]
    );

    const filteredMobileProjects = useMemo(
        () =>
            (mobileProjects || []).filter((project: Project) =>
                project.title.toLowerCase().includes(search.toLowerCase())
            ),
        [mobileProjects, search]
    );

    const handleDelete = async (id: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
            setDeletingId(id);
            try {
                await deleteProject(id);
                toast.success('Projet supprimé avec succès');
                refetchWeb();
                refetchMobile();
            } catch (error) {
                toast.error('Erreur lors de la suppression du projet');
                console.error('Erreur lors de la suppression du projet:', error);
            } finally {
                setDeletingId(null);
            }
        }
    };

    if (loadingWeb || loadingMobile) return <Loader />;
  
    return (
        <div className="min-h-screen p-6 bg-gray-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mes Projets</h1>
                <Link
                    href="/admin/projects/create"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md transition"
                >
                    <Plus className="w-4 h-4" />
                    Ajouter un projet
                </Link>
            </div>

            <div className="mb-8">
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Rechercher un projet par titre..."
                    className="w-full max-w-md p-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                />
            </div>

            {webProjects!.length > 0 &&
                <ProjectSection
                    title="Projets Web"
                    projects={filteredWebProjects}
                    deletingId={deletingId}
                    handleDelete={handleDelete}
                />
            }
           

            {mobileProjects!.length > 0 &&
                <ProjectSection
                    title="Projets Mobile"
                    projects={filteredMobileProjects}
                    deletingId={deletingId}
                    handleDelete={handleDelete}
                />
            }
           
        </div>
    );
}

const ProjectSection = ({
    title,
    projects,
    deletingId,
    handleDelete
}: {
    title: string;
    projects: Project[];
    deletingId: string | null;
    handleDelete: (id: string) => void;
}) => (
    <>
        <h2 className="text-xl font-semibold mb-4 mt-12">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length === 0 ? (
                <p className="col-span-full text-gray-500 dark:text-gray-400">Aucun projet trouvé.</p>
            ) : (
                projects.map((project: Project) => (
                    <div key={project.id}>
                        <Link href={`/admin/projects/${project.id}`}>
                            <div className="bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col justify-between">
                                
                                {/** Affichage miniature de la vidéo façon téléphone */}
                                <div className="flex justify-center mb-4">
                                    <div className="relative w-[180px] aspect-[9/20] rounded-[2rem] overflow-hidden bg-black shadow-md">
                                        <video
                                            loop
                                            controls
                                            poster={project.poster}
                                            className="w-full h-full object-cover rounded-[2rem]"
                                            preload="metadata"
                                        >
                                            <source src={project.video} type="video/mp4" />
                                            Votre navigateur ne supporte pas la lecture de vidéos.
                                        </video>
                                    </div>
                                </div>


                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        {project.title}
                                    </h2>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                                        {project.description}
                                    </p>
                                   
                                </div>
                            </div>
                        </Link>

                        <div className="flex justify-between mt-2 pt-2 border-t border-gray-200 dark:border-zinc-700">
                            <Link
                                href={`/admin/projects/update?id=${project.id}`}
                                className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 text-sm font-medium transition"
                            >
                                <Pencil className="w-4 h-4" />
                                Modifier
                            </Link>
                            <button
                                className="flex items-center gap-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 text-sm font-medium transition disabled:opacity-50"
                                onClick={() => handleDelete(project.id)}
                                disabled={deletingId === project.id}
                            >
                                <Trash2 className="w-4 h-4" />
                                {deletingId === project.id ? 'Suppression...' : 'Supprimer'}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    </>
);

export default ProjectsList;
