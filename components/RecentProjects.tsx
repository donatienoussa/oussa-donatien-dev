"use client"

import React from 'react'
import { FaLocationArrow } from 'react-icons/fa6'
import { useAppwrite } from '@/hooks/useAppwrite'
import { fetchProjects } from '@/lib/actions/projects'
import { Title } from './ui/Title'
import { Quote } from './Quote'
import Image from 'next/image'

function RecentProjects() {
    const { data: projects } = useAppwrite({
        fn: fetchProjects
    });

    if (!projects) return <p className="text-center text-white">Pas de projets</p>

    return (
        <div id="projects" className="py-16 text-white">
            <Title title="3. Projets récents" />
             <Quote
                quote={"« Il ne savait pas que c’était impossible, alors il l’a fait. »"}
                author={"— Mark Twain"}
            />

            <div className="flex flex-col gap-16 mt-10">
                {projects.map(({ id, title, description, img, iconLists, features, link }) => (
                    <div
                        key={id}
                        className="flex flex-col lg:flex-row items-center justify-center gap-10"
                    >
                        {/* Image - Smartphone Style */}
                        <div className="relative w-[280px] md:w-[300px] lg:w-[340px] aspect-[9/18] rounded-[2rem] border border-gray-700 shadow-xl bg-gradient-to-br from-zinc-900 to-black p-2">

                            {/* Capture d’écran */}
                            <Image
                                src={img}
                                alt={title}
                                className="w-full h-full object-cover rounded-[1.8rem] border-[6px] border-black"
                            />
                        </div>

                        {/* Détails projet */}
                        <div className="sm:px-5 flex-1 space-y-4 max-w-xl">
                            <h1 className="font-bold text-2xl lg:text-3xl line-clamp-1">{title}</h1>
                            <p className="text-sm lg:text-base text-gray-300">
                                {description}
                            </p>

                            <h5 className="font-bold text-2xl">Fonctionnalités</h5>
                            
                                <ol>
                                    {features.map((feature:string, index:number) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ol>
                            

                            <div className="flex items-center justify-between mt-6">
                                {/* Icônes technologies */}
                                <div className="flex items-center">
                                    {iconLists.map((icon: string, index: number) => (
                                        <div
                                            key={index}
                                            className="border border-white/[0.2] rounded-full bg-black w-10 h-10 flex justify-center items-center -ml-2 first:ml-0"
                                        >
                                            <img src={icon} alt={`icon-${index}`} className="p-2" />
                                        </div>
                                    ))}
                                </div>

                                {/* Lien / Action */}
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-purple-300 hover:text-purple-400 transition"
                                >
                                    <p className="text-sm lg:text-base">Télécharger</p>
                                    <FaLocationArrow size={18} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentProjects
