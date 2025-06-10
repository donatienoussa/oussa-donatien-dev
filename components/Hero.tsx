import React from 'react'
import { Spotlight } from './ui/Spotlight'
import { cn } from '@/lib/utils'
import { TextGenerateEffect } from './ui/TextGenerateEffect'
import { MagicButton } from './ui/MagicButton'
import Link from 'next/link'
import { FaLocationArrow } from 'react-icons/fa6'

function Hero() {
  
    return (
        <div className='pb-20 pt-0 b'>
            <div>
                <Spotlight
                    className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
                    fill='white'
                />
                <Spotlight
                    className="top-10 left-full h-[80vh] w-[50vw]"
                    fill='purple'
                />
                <Spotlight
                    className="top-28 left-80 h-[80vh] w-[50vw]"
                    fill='blue'
                />
            </div>
            
            <div className="absolute top-0 left-0 flex h-screen w-full items-center justify-center bg-white dark:bg-black">
                <div
                    className={cn(
                        "absolute inset-0",
                        "[background-size:80px_100px]",
                        "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
                        "dark:[background-image:linear-gradient(to_right,#141111FF_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
                    )}
                />
                {/* Radial gradient for the container to give a faded look */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
            </div>
            
            <div className="flex justify-center relative my-20 z-10">
                <div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center'>
                    <h2 className='uppercase tracking-widest text-xs text-center text-blue-50 max-w-80'>
                        Créatif, Technique, Fiable, Innovant
                    </h2>

                    <TextGenerateEffect
                        words="Transformez vos idées en Apps mobile performantes"
                        className="text-center text-[40px] md:text-5xl lg:text-6xl font-semibold"
                    />

                    <p className='text-center  md:tracking-wider mb-4 text-sm  md:text-lg lg-text-2xl text-white'>
                        Je conçois des applications mobiles intelligentes pour les startups et PME du secteur FinTech et IA
                    </p>


                    {/** Call to actions */}
                    <div className="flex flex-col md:flex-row justify-center items-center  gap-5">
                        <Link href="https://wa.me/+2290162140234" className='rounded-2xl'>
                            <MagicButton
                                title="Discutons de votre projet"
                                position='right'
                                icon={<FaLocationArrow />}
                            />
                        </Link>

                        <Link href="#projects" className='rounded-2xl'>
                            <MagicButton
                                title="Voir mes projets"
                                position='right'
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