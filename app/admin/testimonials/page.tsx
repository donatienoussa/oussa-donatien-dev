'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useAppwrite } from '@/hooks/useAppwrite';
import fetchTestimonials from "@/lib/actions/testimonials";


export default function ListOfTestimonals() {
    const { data: testimonials } = useAppwrite({ fn: fetchTestimonials });

    // if (loading) return <Loader />;
    if (!testimonials || testimonials.length === 0) {
        return <p className="text-white text-center">Aucun témoignage pour l’instant.</p>;
    }

    return (
        <div className="min-h-screen p-6 text-white">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold mb-6">Témoignages</h1>
                <Link
                    href="/admin/testimonials/create"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-md transition">
                    <Plus className="w-4 h-4" />
                    Ajouter un témoignage
                </Link>
            </div>
            
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
                    <thead>
                        <tr className="bg-gray-800 text-left text-sm text-gray-300 uppercase tracking-wider">
                            <th className="px-6 py-4">Citation</th>
                            <th className="px-6 py-4">Nom</th>
                            <th className="px-6 py-4">Poste</th>
                            <th className="px-6 py-4">Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials.map((testimonial, index) => (
                            <tr
                                key={index}
                                className="border-t border-gray-700 hover:bg-gray-800 transition"
                            >
                                <td className="px-6 py-4 text-gray-100">{testimonial.quote}</td>
                                <td className="px-6 py-4 font-semibold text-blue-400">{testimonial.name}</td>
                                <td className="px-6 py-4 text-gray-300">{testimonial.title}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => alert(`Supprimer témoignage #${index + 1}`)}
                                        className="flex items-center gap-1 text-red-400 hover:text-red-500 transition text-sm"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
