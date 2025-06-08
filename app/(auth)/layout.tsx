import Image from 'next/image'
import React, { ReactNode } from 'react'

const AuthLayout = async ({ children }: { children: ReactNode }) => {


    return (
        <main className="flex h-screen">
            {/* Section formulaire (gauche) */}
            <section className="w-full md:w-1/2 flex items-center justify-center bg-zinc-900 px-6 py-10">
                <div className="w-full max-w-md space-y-10">
                    {/* Logo + titre */}
                    <div className="flex items-center gap-3">
                        <Image src="/logo.svg" alt="logo" width={37} height={37} />
                        <h1 className="text-2xl font-semibold text-white">OUSSA Donatien</h1>
                    </div>

                    {/* Formulaire */}
                    <div>{children}</div>
                </div>
            </section>

            {/* Section illustration (droite) */}
            <section className="hidden md:block w-1/2">
                <Image
                    src="/profile.jpg"
                    alt="auth illustration"
                    className="w-full h-full object-cover"
                />
            </section>
        </main>
    )
}

export default AuthLayout
