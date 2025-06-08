// src/components/Approach.tsx
"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { Title } from "./ui/Title";
import { Quote } from "./Quote";

function Approach() {
    return (
        <section className="w-full py-20 text-white">
            <Title title="6. Ma méthode de travail" />
            <Quote
                quote={"« Une bonne organisation transforme une idée en résultat, un rêve en produit, et une équipe en moteur de réussite. »"}
                author={"— Donatien OUSSA"}
            />

            <div className="my-20 flex flex-wrap items-center justify-center gap-6 w-full">
                {/** Phase 1 */}
                <Card
                    title="Phase 1 : Vision Produit & Spécification"
                    icon={<AceternityIcon order="Phase 1" />}
                    description="J'organise des ateliers d’idéation avec le client pour définir le backlog initial. À l’aide de user stories et EPICs, je clarifie les attentes métier, les rôles utilisateurs, et prépare les fondations du projet en collaboration avec le Product Owner."
                    bgColor="bg-emerald-900"
                />

                {/** Phase 2 */}
                <Card
                    title="Phase 2 : Design, Architecture & Prototypage"
                    icon={<AceternityIcon order="Phase 2" />}
                    description="Je conçois l'UX avec des wireframes validés rapidement par le client, puis j’élabore les maquettes UI. En parallèle, je prépare l’architecture technique et les spécifications fonctionnelles afin d’assurer un développement fluide, sécurisé et scalable."
                    bgColor="bg-sky-600"
                />

                {/** Phase 3 */}
                <Card
                    title="Phase 3 : Développement Agile & Livraison Continue"
                    icon={<AceternityIcon order="Phase 3" />}
                    description="J’implémente les fonctionnalités par sprints, avec tests automatisés, gestion multilingue et intégration de contenu. Les livrables sont validés en continu et déployés progressivement pour garantir qualité, performance et satisfaction utilisateur."
                    bgColor="bg-black"
                    extraOverlay
                />
            </div>
        </section>
    );
}

const Card = ({
    title,
    icon,
    description,
    bgColor,
    extraOverlay = false,
}: {
    title: string;
    icon: React.ReactNode;
    description: string;
    bgColor: string;
    extraOverlay?: boolean;
}) => {
    const [hovered, setHovered] = React.useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group/canvas-card relative max-w-sm w-full mx-auto p-4 lg:h-[35rem] rounded-3xl border border-black/20 dark:border-white/20 flex items-center justify-center"
        >
            <Icon className="absolute h-6 w-6 -top-3 -left-3 text-black dark:text-white" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 text-black dark:text-white" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-black dark:text-white" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-black dark:text-white" />

            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 h-full w-full z-0"
                    >
                        <CanvasRevealEffect
                            animationSpeed={3.5}
                            containerClassName={bgColor}
                            colors={
                                bgColor === "bg-black"
                                    ? [
                                        [236, 72, 153],
                                        [232, 121, 249],
                                    ]
                                    : [[125, 211, 252]]
                            }
                            dotSize={2}
                        />
                        {extraOverlay && (
                            <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-20 text-center">
                <div className="mb-4">{icon}</div>

                <h2 className="text-xl font-bold text-black dark:text-white group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-300">
                    {title}
                </h2>

                <p
                    className="mt-4 text-center text-base text-black/70 dark:text-white/80 group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 opacity-0 group-hover/canvas-card:opacity-100 transition duration-300"
                    style={{ color: "#E4ECFF" }}
                >
                    {description}
                </p>
            </div>
        </div>
    );
};

const AceternityIcon = ({ order }: { order: string }) => {
    return (
        <div className="w-full flex justify-center">
            <span className="inline-flex items-center justify-center h-12 px-6 py-2 text-2xl font-bold text-white rounded-full bg-gradient-to-tr from-purple-500 to-indigo-700 shadow-lg">
                {order}
            </span>
        </div>
    );
};


export const Icon = ({
    className,
    ...rest
}: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={className}
            {...rest}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
    );
};

export default Approach;
