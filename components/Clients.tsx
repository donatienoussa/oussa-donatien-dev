import React from 'react'
import { InfiniteMovingCards } from './ui/InfiniteMovingCards'
import { companies, testimonials } from '@/data'
import Image from 'next/image'

const Clients = () => {
  
    return (
        <div id="testimonials" className='py-4 text-white'>
            <h2 className="heading">Kind words from {` `}
                <span className="text-purple-600">our clients</span>
            </h2>

            <div className='flex flex-col items-center mt-10'>
                
                <InfiniteMovingCards
                    items={testimonials}
                    direction="right"
                    speed='slow'
                />

                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg: mt-10">
                    {companies.map(({ id, img, name, nameImg }) => (
                        <div key={id} className="flex justify-center items-center md:max-w-60 max-w-32 gap-2">
                            <Image
                                src={img}
                                alt={name}
                                width="20"
                                height="20"
                                className="md:w-10 w-5"
                            />
                            <Image
                                src={nameImg}
                                alt={name}
                                width="80"
                                height="20"
                                className="md:w-24 w-20 h-5"
                            />
                        </div> 
                    ))}
                </div>
                     
            </div>
        </div>
    )
}

export default Clients
