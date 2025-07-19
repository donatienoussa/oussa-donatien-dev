import React from 'react'
import { MagicButton } from './ui/MagicButton';
import { FaLocationArrow } from 'react-icons/fa6';
import { socialMedia } from '@/data';
import Image from 'next/image';
import CustomLink from './Link';

function Footer() {
  
    return (
        <footer id="contact" className="relative z-0 w-full md:pt-5 pt-70 pb-2">
            {/* <div className="w-full h-30 relative left-0">
                <Image 
                    src="/footer-grid.svg"
                    alt="footer-grid"
                    width="1200"
                    height="1200"
                    className="opocity-50"
                />
            </div> */}

            <div className='z-10 flex flex-col items-center justify-center '>
                <h1 className="heading lg:max-w-[45vw]">
                    Prêt à faire passer {``}  
                    <span className="text-purple-600">votre</span> présence numérique au niveau supérieur ?
                </h1>
                <p className="text-white-200 md:mt-10 my-5 text-center">
                    Contactez-moi dès aujourd’hui et discutons de la façon dont je peux vous aider à atteindre vos objectifs ! 
                </p>
                <div className="flex flex-wrap justify-center items-center gap-5">
                    <CustomLink
                        href="mailto:donatienoussaodb@gmail.com"
                        className="sm:mb-5"
                    >
                        <MagicButton
                            title="Écrivez-moi sur Gmail"
                            icon={<FaLocationArrow />}
                            position="right"
                        />
                    </CustomLink>

                    <CustomLink
                        href="https://wa.me/+2290162140234"
                        className="sm:mb-5"
                    >
                        <MagicButton
                            title="Ecrivez-moi sur whatsapp"
                            icon={<FaLocationArrow />}
                            position="right"
                        />
                    </CustomLink>
                </div>
                
            </div>

            <div className='flex justify-between items-center mt-16'>
                <p className='md:text-base text-sm md:font-normal font-light'>
                    Copyright © 2025, Donatien OUSSA
                </p>

                <div className="flex items-center md:gap-3 gap-6  md:mr-35">
                    {socialMedia.map((profile) => (
                        <div
                            key={profile.id}
                            className='bg-black rounded-full h-10 w-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-80 bg-black-200 border border-black-300'
                        >
                            <CustomLink href={profile.link} target="_blank">
                                <Image
                                    src={profile.img}
                                    alt={profile.img}
                                    width="20"
                                    height="20"
                                />
                            </CustomLink>
                        </div>
                    ))}
                </div>
            </div>          
        </footer>
    );
}

export default Footer
