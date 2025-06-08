"use client"

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { addProject } from '@/lib/actions/projects';
import { useForm } from 'react-hook-form';
import { uploadFile } from '@/lib/actions/files';
import { projectSchema } from '@/lib/validation';


type ProjectFormData = z.infer<typeof projectSchema>;

function CreateProject() {
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
    });

    const onSubmit = async (data: ProjectFormData) => {
        try {
            const file = data.img?.[0];
            if (!file) {
                alert("Veuillez sélectionner une image.");
                return;
            }

            console.log(data);

            // Call an appwrite function to upload the file
            const uploadedFile = await uploadFile(file);

            if (!uploadedFile) {
                alert("Échec de l'upload de l'image.");
                return;
            }

            const formattedData = {
                title: data.title,
                description: data.description,
                img: uploadedFile.$id,
                iconLists: data.iconLists.split(',').map((s) => s.trim()),
                link: data.link,
            };           

            await addProject(formattedData);

            alert('Projet ajouté avec succès');
            reset();
        } catch (error) {
            //console.error('Erreur lors de l’ajout du projet :', error);
            console.log('ERREUR', error);
            alert("Échec de l'ajout du projet.");
        }
    };
    
    
    return (
        <div className="min-h-screen text-white flex items-center justify-center p-8">
            <div className="w-full max-w-2xl p-6 rounded-2xl shadow-xl border border-zinc-800">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Ajouter un nouveau projet
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Titre</label>
                        <input
                            {...register('title')}
                            className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Description</label>
                        <textarea
                            {...register('description')}
                            rows={4}
                            className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Image (URL)</label>
                        <input
                            type="file"
                            {...register('img')}
                            className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.img && <p className="text-red-500 text-sm">{String(errors.img.message)}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Icônes (URLs séparés par virgule)</label>
                        <input
                            {...register('iconLists')}
                            placeholder="/re.svg, /ts.svg"
                            className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.iconLists && <p className="text-red-500 text-sm">{errors.iconLists.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Lien du projet</label>
                        <input
                            {...register('link')}
                            className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
                    </div>

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
