import React from 'react'
import { Spotlight } from './ui/Spotlight'
import { TextGenerateEffect } from './ui/TextGenerateEffect'
import { MagicButton } from './ui/MagicButton'
import Link from 'next/link'
import { FaLocationArrow } from 'react-icons/fa6'

function Hero() {
    return (
        <div className="pb-10 pt-0">


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
                        Développeur mobile freelance, je transforme les idées ambitieuses en applications performantes avec React Native, Nest.js et une approche UX centrée produit.
                    </p>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-5">
                        
                        <Link
                            href="https://docs.google.com/forms/d/e/1FAIpQLSfN_Kd7CYij5Vn7ARpST7-8v7i1k2mdf7SEOEo-aBg-t05kAQ/viewform?usp=sharing&ouid=116568402671934728145"
                            className="rounded-2xl"
                            target="_blank"
                        >
                            <MagicButton
                                title="Discutons de votre projet"
                                position="right"
                                icon={<FaLocationArrow />}
                            />
                        </Link>

                        <a
                            href="#projects"
                            className="rounded-2xl"
                        >
                            <MagicButton
                                title="Projets déjà réalisés"
                                position="right"
                                icon={<FaLocationArrow />}
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
