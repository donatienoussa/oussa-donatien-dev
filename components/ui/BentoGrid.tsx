"use client";

import { useState, useEffect } from "react";
import { IoCopyOutline } from "react-icons/io5";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

import animationData from "@/data/confetti.json";
import { BackgroundGradientAnimation } from "./background-gradient-animation";
import { MagicButton } from "./MagicButton";
import { GridGlobe } from "./GridGlobe";
import Image from "next/image";

const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                // grid avec colonnes adaptatives et gaps
                "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    id,
    title,
    titleClassName,
    description,
    img,
    imgClassName,
    spareImg,
}: {
    className?: string;
    id: number;
    title?: string | React.ReactNode;
    titleClassName?: string;
    description?: string | React.ReactNode;
    img?: string;
    imgClassName?: string;
    spareImg?: string;
}) => {
    const leftLists = ["Next.js", "Expo", "Typescript"];
    const rightLists = ["Nativewind", "Supabase", "Nest.js"];

    const [copied, setCopied] = useState(false);

    //S i l'utilisateur clique sur le bouton de copie, on change l'état copied à true 
    // et après 2 secondes, on le remet à false 
    useEffect(() => {
        setTimeout(() => {
            if (copied) {
                setCopied(false);
            }
        }, 10000);
    })


    const defaultOptions = {
        loop: copied,
        autoplay: copied,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const handleCopy = () => {
        const text = "donatienoussaodb@gmail.com";
        navigator.clipboard.writeText(text);
        setCopied(true);
    };

    return (
        <div
            className={cn(
                "row-span-1 relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input justify-between flex flex-col space-y-4",
                "bg-blue dark:bg-gradient-to-r dark:from-[#04071d] dark:to-[#0c0e23]",
                className
            )}
        >
            <div className={`${id === 6 && "flex justify-center"} h-full`}>
                {/* Image principale */}
                <div className="w-full h-full absolute">
                    {img && (
                        <Image
                            src={img}
                            alt={typeof img === "string" ? img : "image"}
                            width={100}
                            height={100}
                            className={cn(imgClassName, "object-cover object-center")}
                        />
                    )}
                </div>

                {/* Spare image en bas à droite */}
                <div className={`absolute right-0 -bottom-5 ${id === 5 && "w-full opacity-80"}`}>
                    {spareImg && (
                        <Image
                            src={spareImg}
                            alt={typeof spareImg === "string" ? spareImg : "spare image"}
                            width={800}
                            height={400}
                            className="object-cover object-center"
                        />
                    )}
                </div>

                {/* Animation spéciale sur la 6ème carte */}
                {id === 6 && (
                    <BackgroundGradientAnimation>
                        {/* Tu peux ajouter un contenu ici si besoin */}
                    </BackgroundGradientAnimation>
                )}

                <div
                    className={cn(
                        titleClassName,
                        "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
                    )}
                >
                    {/* Titre */}
                    <div className="font-sans lg:text-xl max-w-96 font-bold z-10">
                        {title}
                    </div>

                    {/* Description */}
                    <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-neutral-600 dark:text-[#C1C2D3] z-10">
                        {description}
                    </div>

                    
                    {/* Globe Demo uniquement sur id=2 */}
                    {id === 2 && <GridGlobe />}

                    {/* Tech stack uniquement sur id=3 */}
                    {id === 3 && (
                        <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
                            <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                                {leftLists.map((item, i) => (
                                    <span
                                        key={i}
                                        className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-gray-100 dark:bg-[#10132E] text-black dark:text-white"
                                    >
                                        {item}
                                    </span>
                                ))}
                                <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center bg-gray-100 dark:bg-[#10132E]"></span>
                            </div>
                            <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                                <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg text-center bg-gray-100 dark:bg-[#10132E]"></span>
                                {rightLists.map((item, i) => (
                                    <span
                                        key={i}
                                        className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-gray-100 dark:bg-[#10132E] text-black dark:text-white"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bouton copier uniquement sur id=6 */}
                    {id === 6 && (
                        <div className="mt-5 relative">
                            <div
                                className={`absolute -bottom-5 right-0 ${copied ? "block" : "block"
                                    }`}
                            >
                                <Lottie options={defaultOptions} />
                            </div>

                            <MagicButton
                                title={copied ? "Adresse e-mail copiée!" : "Copier mon adresse e-mail"}
                                icon={<IoCopyOutline />}
                                position="left"
                                handleClick={handleCopy}
                                otherStyles=""
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
