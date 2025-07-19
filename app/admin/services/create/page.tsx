'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { addService } from '@/lib/actions/services'
import { serviceFormSchema } from '@/lib/validation'
import { toast } from 'sonner'


type ServiceFormData = z.infer<typeof serviceFormSchema>

function AddService() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ServiceFormData>({
        resolver: zodResolver(serviceFormSchema),
    })

    const onSubmit = async (data: ServiceFormData) => {
        try {
            
            await addService({
                ...data, 
                listOfSubServices:
                    data
                        .listOfSubServices
                        .split(',')
                        .map(subService => subService.trim()),
            })
            toast.success('Service ajouté avec succès')
            reset()
        } catch (error) {
            console.error('Erreur:', error)
            toast.error("Échec de l'ajout du service")
        }
    }

    return (
        <div className="min-h-screen  flex items-center justify-center p-8">
            <div className="w-full max-w-2xl p-6 ">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Ajouter un service
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Titre</label>
                        <input
                            {...register('title')}
                            className="w-full p-2 border-b-2 outline-0"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="mt-5">
                        <label className="block mb-1 text-sm font-medium">
                            Description courte
                        </label>
                        <textarea
                            {...register('shortDescription')}
                            rows={3}
                            className="w-full p-2 border-2 border-black-900 rounded-lg outline-0"
                        />
                        {errors.shortDescription && (
                            <p className="text-red-500 text-sm">
                                {errors.shortDescription.message}
                            </p>
                        )}
                    </div>

                    <div className="mt-5">
                        <label className="block mb-1 text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            {...register('description')}
                            rows={6}
                            className="w-full p-2 border-2 border-black-900 rounded-lg outline-0"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">
                                {errors.description.message}
                            </p>
                        )}
                    </div>


                    <div>
                        <label className="block mb-1 text-sm font-medium">
                            Sous-services (séparés par des virgules[ , ])
                        </label>
                        <input
                            {...register('listOfSubServices')}
                            placeholder="UI Design, Développement mobile, Référencement..."
                            className="w-full p-2 border-b-2 border-black-900 rounded-lg outline-0"
                        />
                        {errors.listOfSubServices && (
                            <p className="text-red-500 text-sm">
                                {errors.listOfSubServices.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Type</label>
                        <input
                            {...register('type')}
                            placeholder="IA ou Web3 ou Mobile"
                            className="w-full p-2 border-b-2 border-black-900 rounded-lg outline-0"
                        />
                        {errors.type && (
                            <p className="text-red-500 text-sm">{errors.type.message}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            {...register('show')}
                            className="accent-blue-600"
                        />
                        <label className="text-sm">Afficher ce service publiquement ?</label>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition shadow-md"
                    >
                        {isSubmitting ? 'Ajout en cours...' : 'Ajouter le service'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddService
