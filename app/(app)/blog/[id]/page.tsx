"use client";

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
    params: {id:string}
}

export default function ShowPost({ params }: Props) {
    
    const { id } = params;

    const { data: post, loading } = useAppwrite({
        fn: fetchPostById,
        params: {
            postId: id,
        },
    });

    console.log("Post data:", post);

    if (loading) {
        return (
            <div className="min-h-screen bg-black-100 text-white flex items-center justify-center p-6">
                <span className="animate-pulse text-lg">Chargement du post…</span>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-black-100 text-white flex items-center justify-center p-6">
                <span className="text-red-400">Aucun post trouvé.</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 py-10 flex items-center justify-center">
            <div className="w-full max-w-3xl p-8">
                <h1 className="text-4xl text-blue-700 font-bold mb-4">
                    {post.title}
                </h1>
                <p className="mb-6 text-sm">
                    Publié le {formatDateToColumn(post.postedAt)}
                </p>

                <h3 className="font-bold text-2xl">Résumé</h3>
                <p className="text-lg font-light leading-relaxed mb-6 italic">{post.excerpt}</p>

                <hr className="border-zinc-700 mb-6" />

                <div className="prose prose-invert prose-zinc max-w-none mb-6">
                    {post.content.split("\n").map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                    ))}
                </div>

                <hr className="border-zinc-700 mb-6" />

            </div>
        </div>
    );
}
