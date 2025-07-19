"use client"

import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { EditTechFormSchema } from "@/lib/validation"
import { getTechnologyById, updateTech } from "@/lib/actions/tech"
import { toast } from "sonner"
import { useAppwrite } from "@/hooks/useAppwrite"
import { useParams, useRouter } from "next/navigation"

type FormValuesType = z.infer<typeof EditTechFormSchema>



export default function EditTechnologyPage() {
    
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [iconPreview, setIconPreview] = useState("")
    const router = useRouter();

    const params = useParams()
    const id = params?.id as string
    
    const { data: tech, loading } = useAppwrite({
        fn: getTechnologyById,
        params: {
            id: id
        },
    });

   
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValuesType>({
        resolver: zodResolver(EditTechFormSchema),
    })


    useEffect(() => {
        if (tech) {
            setValue('title', tech.title);
            setValue('description', tech.description);
            
            setIconPreview(tech.icon);
        }
    }, [tech, setValue]);
    
    
    const onSubmit = async (data: FormValuesType) => {
        
        setIsSubmitting(true);

        try {    
            
            const response = await updateTech(id!, data);

            if (response.success) {
                router.push('/admin/technologies');
                toast.success(response.message)
            }else {
                toast.error(response.message)
            }
                 
        } catch (error) {
            console.log("Échec de l'ajout du projet.", error);
            toast.error("Échec de l'ajout du projet.");
        }finally{
            setIsSubmitting(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-8">
            <div className="w-full max-w-2xl p-6 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Modifier une technologie
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom</label>
                        <input
                            {...register("title")}
                            className="w-full p-2 border-b rounded-md dark:bg-neutral-700 dark:text-white"
                        />
                        {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Icône</label>
                        <input
                            type="file"
                            accept="image/*"                           
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    setValue("icon", file);
                                    const reader = new FileReader()
                                    reader.onloadend = () => setIconPreview(reader.result as string)
                                    reader.readAsDataURL(file)
                                }
                            }}
                        />
                        {iconPreview && (
                            <img src={iconPreview} alt="Icône" className="mt-3 w-full h-full object-cover rounded-md border" />
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea
                            {...register("description")}
                            rows={5}
                            className="w-full p-2 border rounded-md dark:bg-neutral-700 dark:text-white"
                        />
                        {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
                    </div>

                    <div className="flex justify-between items-center">
                        <Link href="/admin/technologies" className="text-sm text-blue-600 hover:underline">
                            Annuler
                        </Link>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-70"
                        >
                            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                            Mettre à jour
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
