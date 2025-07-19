'use client';

import React, { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';

import { useAppwrite } from '@/hooks/useAppwrite';
import { fetchPostById, updatePost } from '@/lib/actions/posts';

// Schéma Zod pour l'édition
const editPostSchema = z.object({
    title: z.string().min(3, 'Le titre est trop court').optional(),
    excerpt: z.string().min(10, "L'extrait est trop court").optional(),
    content: z.string().min(20, 'Le contenu est trop court').optional(),
    isDraft: z.boolean().optional(),
});

type PostEditFormData = z.infer<typeof editPostSchema>;
type Props = {
    params: { id: string };
};

export default function EditPost({ params }: Props) {
    const { id } = params;

    const { data: post, loading } = useAppwrite({
        fn: fetchPostById,
        params: { postId: id },
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PostEditFormData>({
        resolver: zodResolver(editPostSchema),
    });

    useEffect(() => {
        if (post) {
            reset({
                title: post.title,
                excerpt: post.excerpt,
                content: post.content,
                isDraft: post.isDraft,
            });
        }
    }, [post, reset]);

    const onSubmit = async (data: PostEditFormData) => {
        try {
            await updatePost(id, data);
            alert('Post modifié avec succès !');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du post :', error);
            alert('Erreur lors de la modification.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-200 transition-colors duration-300">
                Chargement du post…
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 text-red-600 dark:text-red-400 transition-colors duration-300">
                Aucun post trouvé.
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-200 p-8 transition-colors duration-300">
            <div className="w-full max-w-2xl bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-xl border border-gray-300 dark:border-zinc-700 transition-colors">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                    <Pencil className="w-5 h-5" />
                    Modifier le post
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
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-xl transition shadow-md"
                    >
                        {isSubmitting ? 'Modification en cours…' : 'Mettre à jour'}
                    </button>
                </form>
            </div>
        </div>
    );
}
