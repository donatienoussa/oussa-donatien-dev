'use client';

import { useAppwrite } from '@/hooks/useAppwrite';
import { fetchPosts } from '@/lib/actions/posts';
import Link from 'next/link';
import { formatDateToColumn } from '@/lib/utils';

export default function Blog() {
  const { data: posts } = useAppwrite({ fn: fetchPosts });

  if (!posts || posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-gray-500 dark:text-gray-400">Pas de posts disponibles pour l’instant.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-white">
      <h1 className="text-4xl font-bold mb-8">Le Blog de Donatien</h1>

      <section className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="md:flex p-6 border-b border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow"
          >
            <p>{ formatDateToColumn(post.postedAt)}</p>

            <div className="md:ml-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {post.title}
              </h2>

              <p className="text-gray-700 dark:text-gray-300 mb-4">{post.excerpt}</p>

              <Link
                href={`/blog/${post.id}`}
                className="inline-block text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Lire la suite →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
