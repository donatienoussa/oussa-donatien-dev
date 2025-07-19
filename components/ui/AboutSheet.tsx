"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const aboutParagraphs = [
    `Je suis Donatien OUSSA, développeur full‑stack web & mobile spécialisé en Next.js, React Native et IA.`,
    `Après une licence en Mathématiques & Informatique Générale, je me suis auto‑formé au web, puis j’ai poursuivi en Systèmes d’Information & Réseaux, et une formation mobile.`,
    `Je développe des apps web, iOS et Android avec React Native, en freelance ou entreprise, selon la méthode SCRUM.`,
    `Passionné par l’IA (Python, OpenAI), la blockchain (Solidity), et la 3D Web. Mon credo : créer de la valeur, pas seulement du code.`,
    `Ma méthode : ateliers client, UX/UI, dev scalable en sprints, déploiement continu.`,
    `Projets clés : app IA Aora, messagerie sécurisée, DApp francophone, plateformes métiers.`,
]

const aboutSkills = [
    "Frontend : Next.js, Tailwind CSS",
    "Mobile : React Native, Nativewind",
    "Backend : Supabase, Appwrite, ExpressJS",
    "IA & Data : Python, OpenAI, LangChain",
    "DevOps & outils : Git, GitHub, Figma",
    "Autres : WordPress, LWS",
]

export function AboutSheet() {
    const [open, setOpen] = useState(false)

    return (
        <Sheet
            open={open}
            onOpenChange={setOpen} 
        >
            <SheetTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                    <Plus className="mr-2" />
                    Plus de détails sur moi
                </Button>
            </SheetTrigger>

            <SheetContent className="bg-white dark:bg-neutral-950 p-12 w-full overflow-y-auto">
                <motion.div
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 80, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 60, damping: 20 }}
                >
                    <SheetHeader>
                        <SheetTitle className="text-3xl font-bold">À propos de moi</SheetTitle>
                        <SheetDescription>
                            Un aperçu de mon parcours, mes expertises et projets clés.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="space-y-6 py-6 px-1 text-gray-800 dark:text-gray-300 text-sm leading-relaxed">
                        {aboutParagraphs.map((text, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                {text}
                            </motion.p>
                        ))}

                        <motion.ul
                            className="list-disc list-inside space-y-1"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            viewport={{ once: true }}
                        >
                            {aboutSkills.map((skill, i) => (
                                <li key={i}>{skill}</li>
                            ))}
                        </motion.ul>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            Tu veux collaborer ?{" "}
                            <a
                                href="mailto:donatienoussaodb@gmail.com"
                                className="text-blue-600 dark:text-blue-400 underline"
                            >
                                donatienoussaodb@gmail.com
                            </a>
                        </motion.p>
                    </div>

                    <SheetFooter>
                        <SheetClose asChild>
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Button variant="outline">Fermer</Button>
                            </motion.div>
                        </SheetClose>
                    </SheetFooter>
                </motion.div>
            </SheetContent>
        </Sheet>
    )
}
