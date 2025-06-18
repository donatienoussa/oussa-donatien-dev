import React from 'react'
import { Spotlight } from './ui/Spotlight'
import { cn } from '@/lib/utils'
import { TextGenerateEffect } from './ui/TextGenerateEffect'
import { MagicButton } from './ui/MagicButton'
import Link from 'next/link'
import { FaLocationArrow } from 'react-icons/fa6'

function Hero() {
    return (
        <div className="pb-10 pt-0 border-2 border-amber-300">
            {/** Les lumières */}
            <div>
                <Spotlight
                    className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
                    fill="white"
                />
                <Spotlight
                    className="top-10 left-full h-[80vh] w-[50vw]"
                    fill="purple"
                />
                <Spotlight
                    className="top-28 left-80 h-[80vh] w-[50vw]"
                    fill="blue"
                />
            </div>

            <div className="flex justify-center relative my-20 z-10">
                <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
                    <h2 className="uppercase tracking-widest text-xs text-center text-black dark:text-blue-50 max-w-80">
                        Technique, Fiable et Innovant
                    </h2>

                    <TextGenerateEffect
                        words="Transformez vos idées en Apps performantes"
                        className="text-center text-[40px] md:text-5xl lg:text-6xl font-semibold text-black dark:text-white"
                    />

                    <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg-text-2xl text-black dark:text-white">
                        Spécialiste React Native & Next.js, j'accompagne startups, PME et agences dans la création d'applications web et mobile performantes et scalables.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-5">
                        <Link href="https://wa.me/+2290162140234" className="rounded-2xl">
                            <MagicButton
                                title="Discutons de votre projet"
                                position="right"
                                icon={<FaLocationArrow />}
                            />
                        </Link>

                        <Link href="#projects" className="rounded-2xl">
                            <MagicButton
                                title="Voir mes projets"
                                position="right"
                                icon={<FaLocationArrow />}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
