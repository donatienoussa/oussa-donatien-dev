"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Title } from "./ui/Title";
import { Quote } from "./Quote";
import { AboutSheet } from "./ui/AboutSheet";


export function About() {
    return (
        <section id="about" className="py-15">
            <Title title={`1. À  propos  de  moi`} />

            <Quote
                quote={"« Choisis un travail que tu aimes, et tu n’auras pas à travailler un seul jour de ta vie. »"}
                author={"— Confucius"}
            />

            <ul className="bg-white dark:bg-neutral-900 grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-3 xl:max-h-[34rem] xl:grid-rows-2 mt-15">

                <GridItem
                    area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                    className="bg-gradient-to-br from-pink-400 via-white to-blue-900 dark:from-orange-900 dark:via-neutral-900 dark:to-yellow-800"
                    icon={<Box className="h-4 w-4 text-black dark:text-neutral-400" />}
                    title="Mobile-first."
                    description="Je conçois des apps mobiles robustes et intuitives. React Native, Expo, Nestjs, Tailwind et IA intégrée au cœur de l'expérience."
                />

                <GridItem
                    area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                    className="bg-gradient-to-br from-indigo-600 via-white to-red-700 dark:from-indigo-900 dark:via-neutral-900 dark:to-purple-800"
                    icon={<Settings className="h-4 w-4 text-black dark:text-neutral-400" />}
                    title="Architecture modulaire et scalable"
                    description="Code strictement typé, zero 'any', CI/CD automatisé, auth solide et navigation par rôles. Chaque pixel a une raison d’être."
                />

                <GridItem
                    area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                    className="bg-gradient-to-br from-red-500 via-white to-blue-600 dark:from-red-900 dark:via-neutral-900 dark:to-pink-800"
                    icon={<Lock className="h-4 w-4 text-black dark:text-neutral-400" />}
                    title="Sécurité et performance en priorité"
                    description="Optimisation native, gestion des erreurs robuste, RLS et protection des données dès le design. L’utilisateur mérite le meilleur."
                />

                <GridItem
                    area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                    className="bg-gradient-to-br from-teal-400 via-white to-blue-200 dark:from-teal-900 dark:via-neutral-900 dark:to-blue-800"
                    icon={<Sparkles className="h-4 w-4 text-black dark:text-neutral-400" />}
                    title="Expérience utilisateur pensée métier"
                    description="Onboarding dynamique, interface responsive et rôle UX dans chaque décision produit. Chaque flow est un levier de valeur."
                />

                <GridItem
                    area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                    className="bg-gradient-to-br from-lime-300 via-white to-green-200 dark:from-lime-900 dark:via-neutral-900 dark:to-green-800"
                    icon={<Search className="h-4 w-4 text-black dark:text-neutral-400" />}
                    title="API & intégrations puissantes"
                    description="Telegram, Facebook, YouTube, IA… tout est orchestré pour automatiser et enrichir vos opérations, sans compromettre la sécurité."
                />
            </ul>

            <div className="flex items-center justify-end md:5 md:mr-20 mt-5">
                <AboutSheet />
            </div>
        </section>
    );
}

interface GridItemProps {
    area: string;
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
    className?: string;
}

const GridItem = ({ area, icon, title, description, className }: GridItemProps) => {
    return (
        <li className={`min-h-[14rem] list-none ${area}`}>
            <div className={`relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3`}>
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                />
                <div className={`border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl p-6 md:rounded-3xl md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] ${className}`}>
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className="w-fit rounded-lg border border-gray-600 p-2">
                            {icon}
                        </div>
                        <div className="space-y-3">
                            <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-blue-600 md:text-2xl/[1.875rem]">
                                {title}
                            </h3>
                            <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                                {description}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default About;
