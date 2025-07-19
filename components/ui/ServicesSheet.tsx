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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"
import { FaWhatsapp } from "react-icons/fa6"
import { useAppwrite } from "@/hooks/useAppwrite"
import { fetchServices } from "@/lib/actions/services"
import Loader from "@/components/ui/Loader"
import { Title } from "@/components/ui/Title"
import { Plus } from "lucide-react"

export function ServicesSheet() {
    const [open, setOpen] = useState(false)
    const { data: services, loading, error } = useAppwrite({
        fn: fetchServices, 
        params: { show: true }
    })
    const phone = "+2290162140234"

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                    <Plus /> Voir tous mes services
                </Button>
            </SheetTrigger>

            <SheetContent
                side="right"
                className="w-screen  lg:max-w-[75%] overflow-y-auto p-10 bg-white dark:bg-neutral-950"
            >
                <motion.div
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 80, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 60, damping: 20 }}
                >
                    <SheetHeader>
                        <Title title="Mes services" />
                        <SheetDescription>
                            Découvrez les prestations que je propose et tous les détails pour me contacter.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="py-6">
                        {loading && <Loader />}
                        {error && (
                            <p className="text-center text-red-500 dark:text-red-400 mt-6">{error}</p>
                        )}

                        {!loading && !error && (
                            <>
                                {!services || services.length === 0 ? (
                                    <p className="text-center mt-10 text-gray-600 dark:text-gray-300">
                                        Aucun service disponible
                                    </p>
                                ) : (
                                    <Accordion type="multiple" className="space-y-4 mt-6">
                                        {services.map((service, idx) => {
                                            const encodedMsg = encodeURIComponent(
                                                `Bonjour, je suis intéressé par le service suivant : "${service.title}". Pourriez-vous m'en dire plus ?`
                                            )
                                            const whatsappUrl = `https://wa.me/${phone}?text=${encodedMsg}`

                                            return (
                                                <AccordionItem key={service.id} value={`item-${idx}`} className="my-4 border rounded-xl">
                                                    <AccordionTrigger className="px-4 py-3 text-left font-semibold text-lg">
                                                        {service.title}
                                                    </AccordionTrigger>

                                                    <AccordionContent className="px-4 pb-4 pt-2 text-sm text-gray-700 dark:text-gray-300">
                                                        <p className="mb-2">{service.shortDescription}</p>
                                                        <p className="mb-2">{service.description}</p>

                                                        {service.listOfSubServices && (
                                                            <div className="mb-4">
                                                                <p className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400 mb-1">
                                                                    Sous-services :
                                                                </p>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {service.listOfSubServices
                                                                        .map((sub:string, i:number) => (
                                                                            <span
                                                                                key={i}
                                                                                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs font-semibold px-3 py-1 rounded-full"
                                                                            >
                                                                                {sub}
                                                                            </span>
                                                                        ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        <a
                                                            href={whatsappUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-block mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer"
                                                        >
                                                            <FaWhatsapp className="inline-block mr-2" />
                                                            Me contacter sur WhatsApp
                                                        </a>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            )
                                        })}
                                    </Accordion>
                                )}
                            </>
                        )}
                    </div>

                    <SheetFooter className="mt-6 ">
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
