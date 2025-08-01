"use client";

import { workExperience } from '@/data';
import React from 'react';
import { Button } from './ui/moving-border';
import Image from 'next/image';
import { Title } from './ui/Title';
import { Quote } from './Quote';

function Experience() {
  return (
    <div className="py-20 mt-10 bg-white dark:bg-neutral-950 transition-colors duration-300 text-black dark:text-white">

      <Title title="5. Mon expérience de travail" />
      <Quote
        quote={"« L’expérience n’est pas ce qui nous arrive, c’est ce que nous faisons de ce qui nous arrive. »"}
        author={"— Aldous Huxley"}
      />

      <div className="w-full mt-12 flex flex-wrap justify-center items-center gap-10">
        {workExperience.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            className="flex-1 md:w-[500px] border-neutral-200 dark:border-slate-800 text-black dark:text-white bg-gray-600 dark:bg-zinc-900"
          >
            <div className="flex lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <Image
                src={card.thumbnail}
                alt={card.title}
                width={64}
                height={64}
                className="rounded-md"
              />
              <div className="lg:ms-5">
                <h2 className="text-start text-xl text-white md:text-2xl font-bold">
                  {card.title}
                </h2>
                <p className="text-start mt-3 font-semibold text-white">
                  {card.desc}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Experience;
