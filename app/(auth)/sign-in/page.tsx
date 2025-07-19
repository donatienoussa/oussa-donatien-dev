'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod/v4'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { account } from '@/lib/appwrite'
import { authSchema } from '@/lib/validation'
import { useUser } from '@/context/UserContext'
import { redirect } from 'next/navigation'

type FormData = z.infer<typeof authSchema>

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) => {
    return <div className={cn('flex w-full flex-col space-y-2', className)}>{children}</div>
}

const BottomGradient = () => (
    <>
        <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
        <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
)

export default function LoginPage() {
    const { user } = useUser()
    

    if (user) {
        redirect('/admin')
    }

    const [error, setError] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(authSchema),
    })

    const onSubmit = async (data: FormData) => {
        setError('')
        try {
            await account.createEmailPasswordSession(data.email, data.password)
            redirect('/admin')
        } catch (err: unknown) {
            console.error(err)
            if (err instanceof Error)
                setError(err.message)
            else
                setError("Une erreur est survenue.");     
        }
    }


    return (
        <div className="w-full max-w-md space-y-6 rounded-2xl bg-zinc-900 p-6 shadow-lg md:p-8">
            <div>
                <h2 className="text-2xl font-bold text-white">Se connecter</h2>
                <p className="mt-2 text-sm text-neutral-400">
                    Connexion à l&apos;espace personnel.
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <LabelInputContainer>
                    <label htmlFor="email" className="text-neutral-300 text-sm font-medium">
                        Adresse email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="donatien@exemple.com"
                        className="w-full rounded-md bg-zinc-800 px-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        {...register('email')}
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </LabelInputContainer>

                <LabelInputContainer>
                    <label htmlFor="password" className="text-neutral-300 text-sm font-medium">
                        Mot de passe
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full rounded-md bg-zinc-800 px-4 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...register('password')}
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </LabelInputContainer>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-cyan-600 to-indigo-600 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Connexion...' : 'Se connecter →'}
                    <BottomGradient />
                </button>
            </form>
        </div>
    )
}