'use client';

import React, { useEffect } from 'react';
import { z } from 'zod/v4';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { editTestimonial, getTestimonialById } from '@/lib/actions/testimonials';
import { editTestimonialSchema } from '@/lib/validation';
import { useParams, useRouter } from 'next/navigation';
import { useAppwrite } from '@/hooks/useAppwrite';


type TestimonialFormData = z.infer<typeof editTestimonialSchema>;

function EditTestimonial() {

    const router = useRouter();

    const params = useParams(); 
    const {id} = params as { id: string };

     const { data: testimony, loading } = useAppwrite({
        fn: getTestimonialById,
        params: {
            id: id
        },
     });
    
    
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<TestimonialFormData>({
        resolver: zodResolver(editTestimonialSchema),
    });

    const onSubmit = async (data: TestimonialFormData) => {
        try {
            await editTestimonial(id, data);
            router.push("/admin/testimonials");
        } catch (error) {
            console.error("Erreur lors de l'édition du témoignage:", error);
        }
    };

    useEffect(() => {
        if (testimony) {
            setValue('quote', testimony.quote);
            setValue('title', testimony.title);
            setValue('name', testimony.name);
            setValue('draft', testimony.draft);
        }
    }, [testimony, setValue]);

    if (loading) {
        return (
            <div className="min-h-screen text-white flex items-center justify-center p-8">
                <div className="w-full max-w-2xl p-6 rounded-2xl shadow-xl border border-zinc-800">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Chargement...
                    </h2>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center p-8">
            <div className="w-full max-w-2xl p-6 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Editer un témoignage
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
                    <div>
                        <label className="block mb-1 text-sm font-medium">Le témoignage</label>
                        <textarea
                            {...register('quote')}
                            rows={4}
                            className="w-full p-2 rounded-lg"
                        />
                        {errors.quote && <p className="text-red-500 text-sm">{errors.quote.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Nom</label>
                        <input
                            {...register('name')}
                            className="w-full p-2 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Poste / Titre</label>
                        <input
                            {...register('title')}
                            className="w-full p-2 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    {/** Est un brouillon: un checked box */}
                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            <input type="checkbox" className="mr-2" {...register('draft')} />
                            Est un brouillon ?
                        </label>
                        {errors.draft && <p className="text-red-500 text-sm">{errors.draft.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition shadow-md"
                    >
                        {isSubmitting ? 'Modification en cours...' : 'Modifier le témoignage'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditTestimonial;

