'use client';

import React from 'react';
import { FaLocationArrow } from 'react-icons/fa6';
import { useAppwrite } from '@/hooks/useAppwrite';
import { fetchProjects } from '@/lib/actions/projects';
import { DeviceFrame } from './DeviceFrame';



export function MobileProjects({ limit }: { limit?: number }) {
    const { data: projects, loading: projectsLoading } = useAppwrite({
        fn: fetchProjects,
        params: {
            type: 'mobile', 
            limit
        },
    });

    if (projectsLoading) {
        return <p className="text-center text-white">Chargement...</p>;
    }

    if (!projects || projects.length === 0) {
        return <p className="text-center text-white">Aucun projet trouvé.</p>;
    }

    return (
        <div className="flex flex-col gap-16 mt-10">
            {projects.map(({ id, title, description, poster, video, features, link }) => (
                <div
                    key={id}
                    className="flex flex-col lg:flex-row items-center justify-center gap-10 animate-in fade-in-up duration-700 ease-out"
                >
                    {/* Vidéo intégrée dans cadre smartphone */}
                    <DeviceFrame>
                        <video
                            loop
                            controls
                            poster={poster}
                            className="w-full h-full object-cover rounded-[2rem]"
                            preload="metadata"
                        >
                            <source src={video} type="video/mp4" />
                            Votre navigateur ne supporte pas la lecture de vidéos.
                        </video>
                    </DeviceFrame>

                    {/* Détails du projet */}
                    <div className="sm:px-5 flex-1 space-y-4 max-w-xl">
                        <h1 className="font-bold text-2xl lg:text-3xl line-clamp-1">{title}</h1>
                        <p className="text-sm lg:text-base">{description}</p>

                        <h5 className="font-bold text-2xl">Fonctionnalités</h5>
                        <ol className="list-disc list-inside space-y-1">
                            {features.map((feature: string, index: number) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ol>

                        {/* Lien de téléchargement */}
                        {link && (
                            <div className="flex items-center justify-end mt-6">
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 hover:text-purple-400 transition"
                                >
                                    <p className="text-sm lg:text-base">Télécharger</p>
                                    <FaLocationArrow size={18} />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
