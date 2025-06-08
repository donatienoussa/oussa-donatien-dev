'use client'

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { createPost } from '@/lib/actions/posts';

const postSchema = z.object({
    title: z.string().min(3, 'Le titre est requis'),
    excerpt: z.string().min(10, "L'extrait est requis"),
    content: z.string().min(20, 'Le contenu est requis'),
    postedAt: z.string(),
    isDraft: z.boolean(),
});

type PostFormData = z.infer<typeof postSchema>;

export default function CreatePost() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PostFormData>({
        resolver: zodResolver(postSchema),
    });

    const onSubmit = async (data: PostFormData) => {
        try {
            await createPost(data)
            console.log('Post soumis :', data);
            alert('Post ajouté avec succès !');
            reset();
        } catch (error) {
            console.error('Erreur lors de la création du post :', error);
            alert('Erreur lors de la création du post.');
        }
    };

    return (
        <div className="min-h-screen text-white flex items-center justify-center p-8">
            <div className="w-full max-w-2xl p-6 rounded-2xl shadow-xl border border-zinc-800">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Créer un nouveau post
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
                        <label className="block mb-1 text-sm font-medium">Extrait</label>
                        <textarea
                            {...register('excerpt')}
                            rows={2}
                            className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.excerpt && <p className="text-red-500 text-sm">{errors.excerpt.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Contenu</label>
                        <textarea
                            {...register('content')}
                            rows={6}
                            className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Date de publication</label>
                        <input
                            type="datetime-local"
                            {...register('postedAt')}
                            className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {errors.postedAt && <p className="text-red-500 text-sm">{errors.postedAt.message}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            {...register('isDraft')}
                            id="isDraft"
                            className="w-4 h-4"
                        />
                        <label htmlFor="isDraft" className="text-sm font-medium">
                            Enregistrer comme brouillon
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition shadow-md"
                    >
                        {isSubmitting ? 'Création en cours...' : 'Créer le post'}
                    </button>
                </form>
            </div>
        </div>
    );
}
