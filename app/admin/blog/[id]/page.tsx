'use client';

import { useAppwrite } from "@/hooks/useAppwrite";
import { fetchPostById } from "@/lib/actions/posts";
import { formatDateToColumn } from "@/lib/utils";

export type Post = {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    postedAt: string;
    isDraft: boolean;
    createdAt: string;
};

type Props = {
    params: { id: string };
};

export default function ShowPost({ params }: Props) {
    const { id } = params;

    const { data: post, loading } = useAppwrite({
        fn: fetchPostById,
        params: { postId: id },
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-200 flex items-center justify-center p-6 transition-colors duration-300">
                <span className="animate-pulse text-lg">Chargement du post…</span>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-200 flex items-center justify-center p-6 transition-colors duration-300">
                <span className="text-red-600 dark:text-red-400">Aucun post trouvé.</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-200 px-4 py-10 flex items-center justify-center transition-colors duration-300">
            <div className="w-full max-w-3xl bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl border border-gray-300 dark:border-zinc-700 transition-colors">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {post.title}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Publié le {formatDateToColumn(post.postedAt)}
                </p>

                {!post.isDraft ? (
                    <span className="inline-block bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                        Public
                    </span>
                ) : (
                    <span className="inline-block bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                        Brouillon
                    </span>
                )}

                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                    {post.excerpt}
                </p>

                <hr className="border-gray-300 dark:border-zinc-600 mb-6" />

                <div className="prose dark:prose-invert prose-zinc max-w-none">
                    {post.content.split("\n").map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                    ))}
                </div>
            </div>
        </div>
    );
}
