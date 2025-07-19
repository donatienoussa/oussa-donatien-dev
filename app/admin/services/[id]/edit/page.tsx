"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchSingleService, updateService } from "@/lib/actions/services";
import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "@/components/ui/Loader";
import { EditServiceFormSchema } from "@/lib/validation";


type FormData = z.infer<typeof EditServiceFormSchema>;
type Props = {
    params: { id: string };
}

function EditService({params}: Props) {
    const { id } = params;
    const router = useRouter();
    const [loading, setLoading] = useState(true); 
   

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(EditServiceFormSchema),
        
    });

    useEffect(() => {
        const loadService = async () => {
            if (!id) return;
            setLoading(true);
            const service = await fetchSingleService({ id });
            if (service) {
                setValue("title", service.title);
                setValue("type", service.type);
                setValue("shortDescription", service.shortDescription);
                setValue("description", service.description);
                setValue("listOfSubServices", service.listOfSubServices);
                setValue("show", service.show);
            }
            setLoading(false);
        };

        loadService();
    }, [id, setValue]);

    const onSubmit = async (data: FormData) => {
        if (!id) return;
       
        await updateService(id,
            {
                ...data, 
                listOfSubServices: data.listOfSubServices ?
                    data.listOfSubServices
                        .split(",")
                        .map((subService) => subService.trim())
                    : undefined,
                
            });
        router.push("/admin/services");
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-6">Modifier un service</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block mb-1 font-medium">Titre</label>
                    <input
                        {...register("title")}
                        className="w-full px-4 py-2 border-b-2 outline-0"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Type</label>
                    <input
                        {...register("type")}
                        className="w-full px-4 py-2 border-b-2 outline-0"
                    />
                    {errors.type && (
                        <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description courte</label>
                    <textarea
                        {...register("shortDescription")}
                        rows={3}
                        className="w-full px-4 py-2 border-b-2 outline-0"
                    />
                    {errors.shortDescription && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.shortDescription.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        {...register("description")}
                        rows={6}
                        className="w-full px-4 py-2 border-b-2 outline-0"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Liste des sous-services</label>
                    <input
                        {...register("listOfSubServices")}
                        className="w-full px-4 py-2 border-b-2 outline-0"
                        placeholder="ex: Création de site , SEO , Maintenance"
                    />
                    {errors.listOfSubServices && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.listOfSubServices.message}
                        </p>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        {...register("show")}
                        className="w-5 h-5 accent-blue-600"
                    />
                    <label className="text-sm">Afficher ce service sur la page d’accueil</label>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded font-medium shadow"
                >
                    {isSubmitting ? "Modification..." : "Mettre à jour"}
                </button>
            </form>
        </div>
    );
}

export default EditService;
