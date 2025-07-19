'use client';

import React, { useState, useEffect } from 'react';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { addProject } from '@/lib/actions/projects';
import { useForm } from 'react-hook-form';
import { CreateProjectFormSchema } from '@/lib/validation';
import { toast } from 'sonner';
import { getAllTechs } from '@/lib/actions/tech';
import { useAppwrite } from '@/hooks/useAppwrite';
import { useRouter } from 'next/navigation';

type ProjectFormData = z.infer<typeof CreateProjectFormSchema>;


function CreateProject() {

    const router = useRouter();
    const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

    // Récupération des technologies disponibles
    const { data: availableTechs} = useAppwrite({
        fn: getAllTechs, 
    });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(CreateProjectFormSchema),
    });


    //Met à jour le champ "techs" dans react-hook-form à chaque sélection
    useEffect(() => {
        setValue('techs', selectedTechs);
    }, [selectedTechs, setValue]);

    const toggleTech = (techId: string) => {
        setSelectedTechs((prev) =>
            prev.includes(techId) ? prev.filter((t) => t !== techId) : [...prev, techId]
        );
    };

    const onSubmit = async (data: ProjectFormData) => {

        try {    
            const formattedData = {
                title: data.title,
                description: data.description,
                features: data.features.split(',').map((s) => s.trim()),
                img: data.img,
                techs: data.techs,
                link: data.link,
                type: data.type,
                createdAt: new Date().toISOString(),           
            };

            await addProject(formattedData);
            toast.success('Projet ajouté avec succès');
            router.push('/admin/projects');
        } catch (error) {
            console.log("Erreur lors de l'ajout du projet.", error);
            toast.error('Échec de l\'ajout du projet.Une erreur est survenue');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-200 flex items-center justify-center p-8 transition-colors duration-300">
            <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-xl border border-gray-300 dark:border-zinc-700">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                    <Plus className="w-5 h-5" />
                    Ajouter un nouveau projet
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                   
                    {/* Titre */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Titre</label>
                        <input
                            {...register('title')}
                            placeholder="Ex: Application de gestion"
                            className="w-full p-2 rounded-lg bg-gray-100 dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white"
                        />
                        {errors.title && <p className="text-red-600 dark:text-red-400 text-sm">{errors.title.message}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Description</label>
                        <textarea
                            {...register('description')}
                            rows={4}
                            placeholder="Décrivez le projet"
                            className="w-full p-2 bg-gray-100 dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white"
                        />
                        {errors.description && <p className="text-red-600 dark:text-red-400 text-sm">{errors.description.message}</p>}
                    </div>

                    {/* Fonctionnalités */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Fonctionnalités (séparées par virgule)</label>
                        <textarea
                            {...register('features')}
                            rows={2}
                            className="w-full p-2 bg-gray-100 dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white"
                        />
                        {errors.features && <p className="text-red-600 dark:text-red-400 text-sm">{errors.features.message}</p>}
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setValue('img', file, { shouldValidate: true });
                                }
                            }}
                            className="w-full p-2 rounded-lg bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-white border border-gray-300 dark:border-zinc-600"
                        />

                        {errors.img && <p className="text-red-600 dark:text-red-400 text-sm">{String(errors.img.message)}</p>}

                        {watch('img') && (
                            <img
                                src={URL.createObjectURL(watch('img'))}
                                alt="Aperçu"
                                className="mt-4 w-full h-64 object-cover rounded-lg"
                            />
                        )}
                    </div>


                    {/* Type */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Type (web ou mobile)</label>
                        <input
                            {...register('type')}
                            placeholder="web ou mobile"
                            className="w-full p-2 bg-gray-100 dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white"
                        />
                        {errors.type && <p className="text-red-600 dark:text-red-400 text-sm">{errors.type.message}</p>}
                    </div>

                    {/* Lien */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">Lien du projet</label>
                        <input
                            {...register('link')}
                            placeholder="https://monprojet.com"
                            className="w-full p-2 bg-gray-100 dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white"
                        />
                        {errors.link && <p className="text-red-600 dark:text-red-400 text-sm">{errors.link.message}</p>}
                    </div>

                    {/* Technologies en relation */}
                    <div>
                        <label className="block mb-2 text-sm font-medium">Technologies utilisées</label>
                        <div className="flex flex-wrap gap-4">
                            {availableTechs?.map((tech) => (
                                <label key={tech.id} className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        value={tech.id}
                                        checked={selectedTechs.includes(tech.id)}
                                        onChange={() => toggleTech(tech.id)}
                                        className="accent-blue-600 dark:accent-blue-400"
                                    />
                                    {tech.title}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Bouton */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition shadow-md"
                    >
                        {isSubmitting ? 'Ajout en cours...' : 'Ajouter le projet'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateProject;
