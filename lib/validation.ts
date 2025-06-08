import { z } from "zod";

export const authSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    password: z.string().min(6, { message: "Mot de passe trop court" }),
});

export const projectSchema = z.object({
    title: z.string().min(3, "Le titre est requis."),
    description: z.string().min(10, "La description est trop courte."),
    img: z.any().refine((file) => file?.length === 1, 'Un fichier est requis.'),
    iconLists: z
        .string()
        .refine((val) => val.trim().length > 0, {
            message: "Icônes requises (séparées par des virgules)",
        }),
    link: z.string().url("Lien du projet invalide."),
});


export const testimonialSchema = z.object({
    quote: z.string().min(10, "La citation doit contenir au moins 10 caractères"),
    name: z.string().min(2, "Le nom est requis"),
    title: z.string().min(2, "Le titre est requis"),
});
