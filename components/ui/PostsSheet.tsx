'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Sheet, SheetTrigger, SheetContent,
    SheetHeader, SheetDescription,
    SheetFooter, SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useAppwrite } from '@/hooks/useAppwrite';
import { fetchPosts } from '@/lib/actions/posts';
import { Title } from '@/components/ui/Title';
import Loader from '@/components/ui/Loader';
import { formatDateToColumn } from '@/lib/utils';
import Link from 'next/link';
import { Post } from '@/types';


export function PostsSheet() {
    
    const [open, setOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    const { data: posts, loading, error } = useAppwrite({
        fn: fetchPosts,
        params: { isDraft: false }
    });

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                    Mon Blog
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-screen lg:max-w-[75%] overflow-y-auto p-10 bg-white dark:bg-neutral-950"
            >
                <motion.div
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 80, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 20 }}
                >
                    <SheetHeader>
                        <Title title="Tous mes articles" />
                        <SheetDescription>
                            Retrouvez mes dernières publications, idées, et réflexions.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="w-full py-10">
                        {loading && <Loader />}
                        {error && (
                            <p className="text-center text-red-500 dark:text-red-400 mt-6">{error}</p>
                        )}

                        {!loading && !error && (
                            <>
                                {!posts || posts.length === 0 ? (
                                    <p className="text-center mt-10 text-gray-600 dark:text-gray-300">
                                        Aucun article disponible
                                    </p>
                                ) : (
                                    <section className="max-w-3xl mx-auto space-y-8">
                                        {posts.map((post) => (
                                            <article
                                                key={post.id}
                                                className="md:flex p-6 border-b border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow"
                                            >
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {formatDateToColumn(post.postedAt)}
                                                </p>

                                                <div className="md:ml-6 mt-2 md:mt-0">
                                                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                                        {post.title}
                                                    </h2>

                                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                                        {post.excerpt}
                                                    </p>

                                                    {/* <Link
                                                        href={`/blog/${post.id}`}
                                                        className="inline-block text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                                                    >
                                                        Lire la suite →
                                                    </Link> */}

                                                    <Link
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setSelectedPost(post);
                                                        }}
                                                        className="inline-block text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                                                    >
                                                        Lire la suite →
                                                    </Link>

                                                </div>
                                            </article>
                                        ))}
                                    </section>
                                )}
                            </>
                        )}
                    </div>

                    <SheetFooter className="mt-6">
                        <SheetClose asChild>
                            <motion.div
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Button variant="outline">Fermer</Button>
                            </motion.div>
                        </SheetClose>
                    </SheetFooter>

                    {/* Sheet secondaire pour contenu complet d’un post */}
                    <Sheet open={selectedPost !== null} onOpenChange={() => setSelectedPost(null)}>
                        <SheetContent
                            side="left"
                            className="w-screen lg:max-w-[65%] overflow-y-auto p-10 bg-white dark:bg-neutral-950"
                        >
                            <motion.div
                                initial={{ x: 80, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 80, opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 60, damping: 20 }}
                            >
                                <SheetHeader>
                                    {/* <Title title={selectedPost?.title ?? 'Chargement...'} /> */}
                                    <h3 className="text-blue-600">{selectedPost?.title ?? 'Chargement...'}</h3>
                                    <SheetDescription className="text-sm">
                                        {formatDateToColumn(selectedPost?.postedAt ?? '')}
                                    </SheetDescription>
                                </SheetHeader>

                                <div className="mt-10 space-y-6 max-w-3xl mx-auto">
                                    <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                        {selectedPost?.content ?? 'Chargement du contenu...'}
                                    </p>
                                </div>

                                <SheetFooter className="mt-8">
                                    <SheetClose asChild>
                                        <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.03 }}>
                                            <Button variant="outline">Retour</Button>
                                        </motion.div>
                                    </SheetClose>
                                </SheetFooter>
                            </motion.div>
                        </SheetContent>
                    </Sheet>

                </motion.div>
            </SheetContent>
        </Sheet>
    );
}
