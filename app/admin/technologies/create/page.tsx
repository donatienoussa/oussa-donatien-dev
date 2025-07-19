"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Loader2 } from "lucide-react"
import Link from "next/link"

import { CreateTechFormSchema } from "@/lib/validation"
import { createTech } from "@/lib/actions/tech"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type FormValuesType = z.infer<typeof CreateTechFormSchema>


export default function CreateTechnologyForm() {
    
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [iconPreview, setIconPreview] = useState("")
    const router = useRouter(); 

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValuesType>({
        resolver: zodResolver(CreateTechFormSchema),
    })

    const onSubmit = async (data: FormValuesType) => {
        
        setIsSubmitting(true);
        try {

            const response = await createTech(data); 

            if(response.success) {
                toast.success(response.message)
                router.push('/admin/technologies');
            }
            else {
                toast.error(response.message)
            }
            
        } catch (error) {
            console.error("Erreur création:", error)
            toast.error("Erreur serveur.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-xl rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
                    <Plus className="w-5 h-5" />
                    Créer une nouvelle technologie
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Nom</label>
                        <input
                            {...register("title")}
                            placeholder="Ex: React Native"
                            className="w-full p-2 border-b-2 rounded-md outline-none dark:bg-neutral-700 dark:text-white"
                        />
                        {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Icône (image)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    setValue("icon", file)
                                    const reader = new FileReader()
                                    reader.onloadend = () => setIconPreview(reader.result as string)
                                    reader.readAsDataURL(file)
                                }
                            }}
                        />
                        {errors.icon && <p className="text-sm text-red-500 mt-1">{String(errors.icon.message)}</p>}

                        {iconPreview && (
                            <div className="mt-3">
                                <img src={iconPreview} alt="Aperçu" className="w-full h-1/2 rounded-md border object-cover" />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
                        <textarea
                            {...register("description")}
                            placeholder="Ex: Librairie JS pour créer des interfaces mobiles avec React"
                            rows={5}
                            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none dark:bg-neutral-700 dark:text-white"
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
                            Enregistrer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
