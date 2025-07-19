'use client'

import React from 'react'
import { FaLocationArrow } from 'react-icons/fa6'
import { useAppwrite } from '@/hooks/useAppwrite'
import { fetchProjects } from '@/lib/actions/projects'


export function WebProjects() {

     const { data: projects, loading:projectsLoading } = useAppwrite({
        fn: fetchProjects,
         params: {
            type: 'web', 
            limit : 3
         },
     })
    
    
    if (projectsLoading)
        return <p className="text-center text-white">Chargement...</p>
    
    if (!projects || projects.length === 0) {
        return <p className="text-center text-white">Aucun projet trouvé.</p>
    }

    return (
        <div className="flex flex-col gap-16 mt-10">
            {projects.map(({ id, title, description, img, features, link }) => (
                <div
                    key={id}
                    className="flex flex-col lg:flex-row items-center justify-center gap-10"
                >
                    {/* Image - Style écran desktop */}
                    <div className="relative w-full max-w-2xl aspect-video rounded-2xl border border-gray-700 shadow-xl bg-zinc-900 overflow-hidden">
                        <img
                            src={img}
                            alt={title}
                            className="object-cover w-full h-full rounded-2xl border-t border-zinc-800"
                        />
                    </div>

                    {/* Détails projet */}
                    <div className="sm:px-5 flex-1 space-y-4 max-w-xl">
                        <h2 className="font-bold text-2xl lg:text-3xl">{title}</h2>
                        <p>{description}</p>

                        <h5 className="font-bold text-2xl">Fonctionnalités</h5>
                        <ol className="list-disc list-inside space-y-1">
                            {features.map((feature: string, index: number) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ol>

                        <div className="flex items-center justify-between mt-6">
                            {/* Icônes technologies */}
                            {/* <div className="flex items-center flex-wrap gap-2">
                                { techs.map((url: string, index: number) => (
                                    <div
                                        key={index}
                                        className="border-2 border-white/[0.2] rounded-full bg-white dark:bg-black w-10 h-10 flex justify-center items-center"
                                    >
                                        <img
                                            src={url}
                                            alt={`icon-${index}`}
                                            className="p-2"
                                            width={70}
                                            height={70}
                                        />
                                    </div>
                                ))}
                            </div> */}

                            {/* Lien */}
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 hover:text-purple-400 transition"
                            >
                                <p className="text-sm lg:text-base">Voir le site</p>
                                <FaLocationArrow size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
