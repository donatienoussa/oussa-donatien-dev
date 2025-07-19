"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams} from "next/navigation";
import { getProjectById, updateProject } from "@/lib/actions/projects";
import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "@/components/ui/Loader";
import { EditProjectFormSchema } from "@/lib/validation";
import { useAppwrite } from "@/hooks/useAppwrite";
import {deleteFile, uploadFile} from "@/lib/actions/files"
import { getAllTechs } from "@/lib/actions/tech";
import { toast } from "sonner";
import ImageDropzone from "@/components/ImageDropzone";

type FormData = z.infer<typeof EditProjectFormSchema>;

export default function UpdateProjectPage() {

    const router = useRouter();
    
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const { data: project, loading } = useAppwrite({
        fn: getProjectById,
        params: {
            id: id!
        }
    })

    // Récupération des technologies disponibles
    const { data: availableTechs } = useAppwrite({
        fn: getAllTechs,
    });

    const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

   
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(EditProjectFormSchema),
    });


    // Pré-remplissage du formulaire avec les données du projet 
    useEffect(() => {
        
        if (project) {
            
            setValue("title", project.title);
            setValue("description", project.description);
            setValue("features", project.features.join(", "));
            setValue("techs", project.techs);
            setValue("link", project.link);
            setValue("type", project.type);

            setSelectedTechs(project.techs);
        }

    }, [project, setValue]);


     //Met à jour le champ "techs" dans react-hook-form à chaque sélection
    useEffect(() => {
        setValue('techs', selectedTechs);
    }, [selectedTechs, setValue]);
    
    const toggleTech = (techId: string) => {
        setSelectedTechs((prev) =>
            prev.includes(techId) ? prev.filter((t) => t !== techId) : [...prev, techId]
        );
    };
    
    

    const onSubmit = async (data:{
        title?:string;
        description?: string;
        features?:string;
        img?: File;
        techs?:string[];
        link?:string;
        type?:string;
    }) => {
            try {
                const file = data.img!; 
                let uploadedFile;
                
                // Si une image est envoyé, on supprime d'abord l'ancienne avant d'ajouter le nouveau
                if(file) {
                    await deleteFile(project!.img);
                    
                    uploadedFile = await uploadFile(file);

                    if (!uploadedFile) {
                        console.log("Échec de l'upload de l'image.");
                        return;
                    }
                }

                // Format data before sending to Appwrite
                const formattedData = {
                    title: data.title,
                    description: data.description,
                    features: data.features!.split(',').map((s) => s.trim()), 
                    img: file ? uploadedFile!.$id : "",
                    techs: data.techs,
                    link: data.link,
                    type: data.type,
                    createdAt: new Date().toISOString(),
                };           
    
                const response = await updateProject(id!, formattedData);
                
                if (response) {
                    toast.success('Projet modifié avec succès');
                    router.push('/admin/projects');
                }
                
            } catch (error) {
                console.log("Échec lors du mise à jour du projet.", error);
            }
    };
    

    if (loading) return <Loader />;

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">Modifier un projet</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/** Titre */}
                <div>
                    <label className="block mb-1 font-medium">Titre</label>
                    <input {...register("title")} className="w-full px-4 py-2 border-b-2 outline-0" />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                {/** Description */}
                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea {...register("description")} rows={4} className="w-full px-4 py-2 border-b-2 outline-0" />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                {/* Fonctionnalités */}
                <div>
                    <label className="block mb-1 font-medium">Fonctionnalités</label>
                    <input {...register("features")} className="w-full px-4 py-2 border-b-2 outline-0" placeholder="ex: Authentification, Chat, Paiement..." />
                    {errors.features && <p className="text-red-500 text-sm mt-1">{errors.features.message}</p>}
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

                {/** Type de projet */}
                <div>
                    <label className="block mb-1 font-medium">Type de projet</label>
                    <input {...register("type")} className="w-full px-4 py-2 border-b-2 outline-0" placeholder="ex: Web App, Mobile App" />
                    {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
                </div>

                {/** Lien du projet */}
                <div>
                    <label className="block mb-1 font-medium">Lien du projet</label>
                    <input {...register("link")} className="w-full px-4 py-2 border-b-2 outline-0" placeholder="https://..." />
                    {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link.message}</p>}
                </div>

                {/** Image du projet */}
                <ImageDropzone
                    onImageSelected={
                        (image: File) => setValue('img', image, { shouldValidate: true })
                    }
                />
               

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded font-medium shadow text-white"
                >
                    {isSubmitting ? "Mise à jour..." : "Mettre à jour"}
                </button>
            </form>
        </div>
    );
}
