import { workExperience } from '@/data'
import React from 'react'
import { Button } from './ui/moving-border'
import Image from 'next/image'

function Experience() {
  
  return (
    <div  className='py-4 text-white mt-10'>
      <h2 className="heading">Mon   {` `}
        <span className="text-purple-600">Experience de Travail</span>
      </h2>

      <div className='w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10'>
        {workExperience.map((card) => (
          
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius='1.75rem'
            className="flex-1 text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
              <Image
                src={card.thumbnail}
                alt={card.thumbnail}
                width="64"
                height="12"
              />
              <div className="lg:ms-5">
                <h2 className='text-start text-xl md:text-2xl font-bold'>
                  {card.title}
                </h2>
                <p className="text-start text-white-100 mt-3 font-semibold">
                  {card.desc}
                </p>
              </div>  
            </div>
            </Button>
          
        ))}
      </div>
    </div>

  )
}

export default Experience
