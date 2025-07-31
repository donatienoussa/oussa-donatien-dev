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
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Title } from "@/components/ui/Title"
import { Plus } from "lucide-react"
import { MobileProjects } from "../MobileProjects"


export function ProjectsSheet() {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                    <Plus /> Voir tous mes projets mobiles
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-screen lg:max-w-[75%] overflow-y-auto p-10 bg-white dark:bg-neutral-950"
            >
                <motion.div
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 80, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 60, damping: 20 }}
                >
                    <SheetHeader>
                        <Title title="Mes projets mobiles" />
                        <SheetDescription>
                            Découvrez les applications que j&apos;ai développées et leur impact produit.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="py-6">
                        <MobileProjects limit={10} />
                    </div>

                    <SheetFooter className="mt-6">
                        <SheetClose asChild>
                            <motion.div
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.03 }}
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
