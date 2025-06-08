"use client";

import { useParams } from "next/navigation";
import { useAppwrite } from "@/hooks/useAppwrite";
import { getProjectById } from "@/lib/actions/projects";
import { FaProjectDiagram } from "react-icons/fa";
import Image from "next/image";

export default function ProjectDetails() {
    const params = useParams();
    const id = params.id as string;

    const { data: project, error, loading } = useAppwrite({
        fn: getProjectById,
        params: {
            projectId: id,
        },
    });

    if (loading) {
        return <p className="text-white text-center mt-10">Chargement...</p>;
    }

    if (error || !project) {
        return <p className="text-red-500 text-center mt-10">Projet introuvable ou une erreur est survenue.</p>;
    }

    return (
        <div className="min-h-screen text-white flex items-center justify-center p-8">
            <div className="w-full max-w-2xl p-6 rounded-2xl shadow-xl border border-zinc-800 bg-zinc-900 space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <FaProjectDiagram className="w-6 h-6 text-purple-400" />
                    {project.title}
                </h2>

                <Image
                    src={project.img}
                    alt={project.title}
                    width={800}
                    height={400}
                    className="rounded-xl object-cover w-full h-auto"
                />

                <p className="text-zinc-300">{project.description}</p>

                <div>
                    <h3 className="font-semibold text-lg mb-2">Fonctionnalités</h3>
                    <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                        {project.features.map((feat, index) => (
                            <li key={index}>{feat}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-2">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.iconLists.map((tech, index) => (
                            <span
                                key={index}
                                className="bg-zinc-800 text-xs px-3 py-1 rounded-full border border-zinc-700"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 transition rounded-md text-sm"
                >
                    Voir le projet
                </a>
            </div>
        </div>
    );
}
