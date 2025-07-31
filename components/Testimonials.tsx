"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";
import { companies } from "@/data";
import Image from "next/image";
import { useAppwrite } from "@/hooks/useAppwrite";
import { fetchTestimonials } from "@/lib/actions/testimonials";
import Loader from "./ui/Loader";
import { Title } from "./ui/Title";
import { Quote } from "./Quote";

const Testimonials = () => {
    const { data: testimonials, loading: testimonialsLoading } = useAppwrite({
        fn: fetchTestimonials,
    });

    if (testimonialsLoading) return <Loader />;

    return (
        <div id="testimonials" className="py-4 bg-white dark:bg-neutral-950 text-black dark:text-white transition-colors duration-300">
            <Title title="4. Ce  que  disent  mes  clients" />
            <Quote
                quote={"« Ce que vous faites fait une différence. À vous de choisir laquelle. »"}
                author={"— Jane Goodall"}
            />

            <div className="flex flex-col items-center mt-10">
                <InfiniteMovingCards
                    items={testimonials || []}
                    direction="left"
                />

                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg: mt-10">
                    {companies.map(({ id, img, name }) => (
                        <div
                            key={id}
                            className="flex justify-center items-center md:max-w-60 max-w-32 gap-2"
                        >
                            <Image
                                src={img}
                                alt={name}
                                width={20}
                                height={20}
                                className="md:w-10 w-5 rounded-full bg-black dark:bg-white"
                            />
                            <p className="text-2xl text-gray-800 dark:text-gray-100">{name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;

