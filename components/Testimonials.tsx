'use client';

import React from 'react';
import { InfiniteMovingCards } from './ui/InfiniteMovingCards';
import Image from 'next/image';
import { useAppwrite } from '@/hooks/useAppwrite';
import { fetchTestimonials } from '@/lib/actions/testimonials';
import { getAllTechs } from '@/lib/actions/tech';
import Loader from './ui/Loader';
import { Title } from './ui/Title';
import { Quote } from './Quote';


const Testimonials = () => {
    
    const { data: testimonials, loading: testimonialsLoading } = useAppwrite({
        fn: fetchTestimonials,
    });

    const { data: techs, loading: techsLoading } = useAppwrite({
        fn: getAllTechs,
    });

    if (testimonialsLoading || techsLoading)
        return <Loader />;

    return (
        <div
            id="testimonials"
            className="py-4 bg-white dark:bg-neutral-950 text-black dark:text-white transition-colors duration-300"
        >
            <Title title="4. Ce que disent mes clients" />
            <Quote
                quote={'« Ce que vous faites fait une différence. À vous de choisir laquelle. »'}
                author={'— Jane Goodall'}
            />

            <div className="flex flex-col items-center mt-10">
                <InfiniteMovingCards items={testimonials || []} direction="left" />

                {/* Liste des technologies */}
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-6 mt-6">
                    
                    <h3 className="text-2xl md:text-3xl font-semibold">Technologies utilisées</h3>
                    
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-12">
                        {techs?.map(({ id, title, icon }) => {

                            return (
                                <div
                                    key={id}
                                    className="flex flex-col items-center text-center w-[80px] md:w-[100px] space-y-2"
                                >
                                    <Image
                                        src={icon}
                                        alt={title}
                                        width={40}
                                        height={40}
                                        className="rounded-full bg-white dark:bg-black border border-gray-300 dark:border-gray-700 p-1"
                                    />
                                    <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 line-clamp-1">
                                        {title}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
