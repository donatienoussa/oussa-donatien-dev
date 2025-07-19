'use client';

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
    postedAt: z.string().optional(),
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
            await createPost({ ...data, postedAt: new Date().toISOString() });
            alert('Post ajouté avec succès !');
            reset();
        } catch (error) {
            console.error('Erreur lors de la création du post :', error);
            alert('Erreur lors de la création du post.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-xl border border-gray-300 dark:border-zinc-700">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                    <Plus className="w-5 h-5" />
                    Créer un nouveau post
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                            Titre
                        </label>
                        <input
                            {...register('title')}
                            className="w-full p-2 rounded-lg bg-gray-100 dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
                        />
                        {errors.title && (
                            <p className="text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                            Extrait
                        </label>
                        <textarea
                            {...register('excerpt')}
                            rows={2}
                            className="w-full p-2 rounded-lg bg-gray-100 dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
                        />
                        {errors.excerpt && (
                            <p className="text-sm text-red-600 dark:text-red-400">{errors.excerpt.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-200">
                            Contenu
                        </label>
                        <textarea
                            {...register('content')}
                            rows={6}
                            className="w-full p-2 rounded-lg bg-gray-100 dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
                        />
                        {errors.content && (
                            <p className="text-sm text-red-600 dark:text-red-400">{errors.content.message}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            {...register('isDraft')}
                            id="isDraft"
                            className="w-4 h-4 accent-blue-600 dark:accent-blue-400"
                        />
                        <label htmlFor="isDraft" className="text-sm font-medium text-gray-800 dark:text-gray-200">
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
