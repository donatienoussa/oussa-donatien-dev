import React from 'react'
import { BentoGrid, BentoGridItem } from './ui/BentoGrid'
import { gridItems } from '@/data'
import { Title } from './ui/Title'
import { Quote } from './Quote'

const About = () => {
    return (
        <section id="about">
            <Title title={`1. À  propos  de  moi`} />
            <h2 className='text-blue-600'>A propos de moi</h2>
            <Quote
                quote={"« Choisis un travail que tu aimes, et tu n’auras pas à travailler un seul jour de ta vie. »"}
                author={"— Confucius"}
            />
            <BentoGrid className="w-full p-5 md:p-20 ">
                {gridItems.map(({
                    id,
                    title,
                    description,
                    className,
                    img,
                    imgClassName,
                    titleClassName,
                    spareImg
                }) => (
                    <BentoGridItem
                        id={id}
                        key={id}
                        title={title}
                        description={description}
                        className={className}
                        img={img}
                        imgClassName={imgClassName}
                        titleClassName={titleClassName}
                        spareImg={spareImg}
                    />
                ))}
            </BentoGrid>
        </section>
    )
}

export default About
