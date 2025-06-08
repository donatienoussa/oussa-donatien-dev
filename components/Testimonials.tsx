"use client"

import React from 'react'
import { InfiniteMovingCards } from './ui/InfiniteMovingCards'
import { companies } from '@/data'
import Image from 'next/image'
import { useAppwrite } from '@/hooks/useAppwrite'
import fetchTestimonials from '@/lib/actions/testimonials'
import Loader from './ui/Loader'
import { Title } from './ui/Title'
import { Quote } from './Quote'

const Testimonials = () => {

    const { data: testimonials, loading: testimonialsLoading } = useAppwrite(
        { fn: fetchTestimonials }
    );
  
    
    if(testimonialsLoading) return <Loader />
    
    return (
        <div id="testimonials" className='py-4 text-white'>
            <Title title="4. Ce que disent mes clients" />
            <Quote
                quote={"« Ce que vous faites fait une différence. À vous de choisir laquelle. »"}
                author={"— Jane Goodall"}
            />

            <div className='flex flex-col items-center mt-10'>
                
                <InfiniteMovingCards
                    items={testimonials || []}
                    direction="left"
                    speed='slow'
                />

                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg: mt-10">
                    {companies.map(({ id, img, name }) => (
                        <div key={id} className="flex justify-center items-center md:max-w-60 max-w-32 gap-2">
                            <Image
                                src={img}
                                alt={name}
                                width="20"
                                height="20"
                                className="md:w-10 w-5 text-white"
                            />
                            <p className="text-2xl">{name}</p>
                            {/* <Image
                                src={nameImg}
                                alt={name}
                                width="80"
                                height="20"
                                className="md:w-24 w-20 h-5"
                            /> */}
                        </div> 
                    ))}
                </div>
                     
            </div>
        </div>
    )
}

export default Testimonials
