'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, MoreVertical, Eye, Pencil, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppwrite } from '@/hooks/useAppwrite';
import { fetchServices, deleteService } from '@/lib/actions/services';
import Loader from '@/components/ui/Loader';
import { Service } from '@/types';


export default function ServicesList() {
  const { data: initialServices, loading, refetch } = useAppwrite({
    fn: fetchServices, 
  });

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) return;
    setDeletingId(id);
    try {
      await deleteService(id);
      await refetch();
    } catch (err) {
      console.error('Erreur lors de la suppression :', err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 dark:bg-zinc-900 transition-colors">
        <Loader />
      </div>
    );
  }

  if (!initialServices || initialServices.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 dark:bg-zinc-900 transition-colors">
        <span className="text-gray-500 dark:text-gray-400">Aucun service disponible.</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-zinc-900 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Services ({initialServices.length})
        </h1>
        <Link
          href="/admin/services/create"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Plus className="mr-2 w-4 h-4" />
          Ajouter
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-zinc-700">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-200 dark:bg-zinc-800">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-400 w-1/12">
                #
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-400 w-3/12">
                Titre
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-400 w-2/12">
                Type
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-400 w-2/12">
                Statut
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-400 w-2/12">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {initialServices.map((service: Service, index: number) => (
              <tr
                key={service.id}
                className="border-t border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-900 transition"
              >
                <td className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">
                  {index + 1}
                </td>
                <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                  {service.title}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {service.type}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${service.show
                        ? 'bg-green-700 text-green-100'
                        : 'bg-red-700 text-red-100'
                      }`}
                  >
                    {service.show ? 'En vente' : 'Hors vente'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 transition">
                        <MoreVertical className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 bg-white dark:bg-zinc-900 ring-1 ring-black ring-opacity-10 dark:ring-opacity-50">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/services/${service.id}`} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800">
                          <Eye className="w-4 h-4" />
                          <span>Lire</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/services/${service.id}/edit`} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800">
                          <Pencil className="w-4 h-4" />
                          <span>Modifier</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(service.id)}
                        disabled={deletingId === service.id}
                        className="text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-700 px-4 py-2 flex items-center gap-2"
                      >
                        <Trash className="w-4 h-4" />
                        <span>{deletingId === service.id ? 'Suppression...' : 'Supprimer'}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
