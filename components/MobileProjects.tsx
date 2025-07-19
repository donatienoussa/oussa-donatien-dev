'use client'

import React from 'react'
import { FaLocationArrow } from 'react-icons/fa6'
import { useAppwrite } from '@/hooks/useAppwrite'
import { fetchProjects } from '@/lib/actions/projects'


export function MobileProjects() {

    const { data: projects, loading: projectsLoading } = useAppwrite({
        fn: fetchProjects,
        params: { type: 'mobile' },
    })
    
    if (projectsLoading) return <p className="text-center text-white">Chargement...</p>
    
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
                    {/* Image - Smartphone style */}
                    <div className="relative w-[280px] md:w-[300px] lg:w-[340px] aspect-[9/18] rounded-[2rem] border border-gray-700 shadow-xl bg-gradient-to-br from-zinc-900 to-black p-2">
                        <img
                            src={img}
                            alt={title}
                            className="object-cover rounded-[1.8rem] border-[6px] border-black"
                        />
                    </div>

                    {/* Détails projet */}
                    <div className="sm:px-5 flex-1 space-y-4 max-w-xl">
                        <h1 className="font-bold text-2xl lg:text-3xl line-clamp-1">{title}</h1>
                        <p className="text-sm lg:text-base">{description}</p>

                        <h5 className="font-bold text-2xl">Fonctionnalités</h5>
                        <ol className="list-disc list-inside space-y-1">
                            {features.map((feature: string, index: number) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ol>

                        <div className="flex items-center justify-between mt-6">
                            {/* Icônes technologies */}
                            {/* <div className="flex items-center">
                                {techs.map((url: string, index: number) => (
                                    <div
                                        key={index}
                                        className="border-2 border-white/[0.2] rounded-full bg-white dark:bg-black w-10 h-10 flex justify-center items-center -ml-2 first:ml-0"
                                    >
                                        <Image
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
                            {link !== null && (
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 hover:text-purple-400 transition"
                                >
                                    <p className="text-sm lg:text-base">Télécharger</p>
                                    <FaLocationArrow size={18} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
