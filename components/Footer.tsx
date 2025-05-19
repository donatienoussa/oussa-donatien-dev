import Link from 'next/link';
import React from 'react'
import { MagicButton } from './ui/MagicButton';
import { FaLocationArrow } from 'react-icons/fa6';
import { socialMedia } from '@/data';
import Image from 'next/image';

function Footer() {
  
    return (
        <footer id="contact" className="w-full pt-20 pb-10 text-white">
            {/* <div className="w-full h-66 absolute left-0 -bottom-72">
                <Image 
                    src="/footer-grid.svg"
                    alt="footer-grid"
                    width="1200"
                    height="1200"
                    className="opocity-50"
                />
            </div> */}

            <div className='flex flex-col items-center'>
                <h1 className="heading lg:max-w-[45vw]">
                    Ready to take <span className="text-purple-600">your</span> digital presence to next level ? 
                </h1>
                <p className="text-white-200 md:mt-10 my-5 text-center">
                    Reach out to me today and let's discuss how I can help you achieve your goals 
                </p>
                <Link 
                    href="mailto:donatienoussaodb@gmail.com"
                >
                    <MagicButton 
                        title="Let's Get in Touch"
                        icon={<FaLocationArrow />}
                        position="right"
                    />    
                </Link>
            </div>

            <div className='flex justify-between items-center mt-16'>
                <p className='md:text-base text-sm md:font-normal font-light'>
                    Copyright © 2025, Donatien OUSSA
                </p>

                <div className="flex items-center md:gap-3 gap-6  md:mr-35">
                    {socialMedia.map((profile) => (
                        <div
                            key={profile.id}
                            className='h-10 w-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-80 bg-black-200 rounded-lg border border-black-300'
                        >
                            <Image
                                src={profile.img}
                                alt={profile.img}
                                width="20"
                                height="20"
                            />
                        </div>
                    ))}
                </div>
            </div>

            
        </footer>
    );
}

export default Footer
