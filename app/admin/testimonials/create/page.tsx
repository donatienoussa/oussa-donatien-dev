'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { addTestimonial } from '@/lib/actions/testimonials'; // À créer
import { testimonialSchema } from '@/lib/validation'; // À créer

type TestimonialFormData = z.infer<typeof testimonialSchema>;

function AddTestimonial() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TestimonialFormData>({
        resolver: zodResolver(testimonialSchema),
    });

    const onSubmit = async (data: TestimonialFormData) => {
        try {
            await addTestimonial(data);
            alert("Témoignage ajouté avec succès !");
            reset();
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error);
            alert("Erreur lors de l'ajout du témoignage.");
        }
    };

    return (
        <div className="min-h-screen text-white flex items-center justify-center p-8">
            <div className="w-full max-w-2xl p-6 rounded-2xl shadow-xl border border-zinc-800">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Ajouter un témoignage
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Citation</label>
                        <textarea
                            {...register('quote')}
                            rows={4}
                            className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.quote && <p className="text-red-500 text-sm">{errors.quote.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Nom</label>
                        <input
                            {...register('name')}
                            className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Poste / Titre</label>
                        <input
                            {...register('title')}
                            className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition shadow-md"
                    >
                        {isSubmitting ? 'Ajout en cours...' : 'Ajouter le témoignage'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddTestimonial;
