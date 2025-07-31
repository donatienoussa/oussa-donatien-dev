/**
 * This file contains all schemas used in my forms
 * 
 * @author OUSSA Donatien <donatienoussaodb@gmail.com>
 */


import { z } from 'zod/v4'


// -------------------------- AUTHENTICATION SCHEMAS --------------------------------------
export const authSchema = z.object({
    email: z
        .email({
            message: "Email invalide"
        }),
    password: z
        .string()
        .min(6, {
            message: "Mot de passe trop court"
        }),
});


// ---------------------------------- SERVICE SCHEMAS -----------------------------------------
export const serviceFormSchema = z.object({
    title: z
        .string()
        .min(2, {
            message: 'Le titre est requis'
        }),
    shortDescription: z
        .string()
        .min(5, { message: 'Une description est requise' }),
    description: z
        .string()
        .min(10, { message: 'La description doit contenir au moins 10 caractères' }),
    listOfSubServices: z
        .string(),
    type: z
        .string()
        .optional(),
    show: z
        .boolean()
        .optional(),
})


export const EditServiceFormSchema = z.object({
    title: z
        .string()
        .optional(),
    shortDescription: z
        .string()
        .optional(),
    description: z
        .string()
        .optional(),
    listOfSubServices: z
        .string()
        .optional(),
    type: z
        .string()
        .optional(),
    show: z
        .boolean()
        .optional(),
})



// ---------------------------------- PROJECT SCHEMAS -----------------------------------

export const CreateProjectFormSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Le titre est requis." }),
    description: z
        .string()
        .min(10, { message: "La description est trop courte." }),
    features: z
        .string()
        .min(3, { message: "Les fonctionnalités sont requises." }),
    type: z
        .string()
        .min(1, { message: "Le type est requis." }),
    link: z
        .string()
        .optional(),
    poster: z
        .file({message: "Une image est requise."}), 
    video: z
        .file({message: "Une video est requise."}),
});


export const EditProjectFormSchema = z.object({
    title: z
        .string()
        .optional(),
    description: z
        .string()
        .optional(),
    features: z
        .string()
        .optional(),
    img: z
        .file()
        .optional(),
    techs: z
        .array(z.string())
        .optional(),
    link: z
        .url("Lien du projet invalide.")
        .optional(),
    type: z
        .string()
        .optional(),
});
  


// ----------------------------------- TECH SCHEMAS ---------------------------------------
export const CreateTechFormSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Le titre est requis." }),
    description: z
        .string()
        .optional(),
    icon: z
        .file({message: "Une icône est requise."}),       
});


export const EditTechFormSchema = z.object({
    title: z
        .string()
        .optional(),
    description: z
        .string()
        .optional(),
    icon: z
        .file()
        .optional(),
});


// --------------------------- TESTIMONIAL SCHEMAS --------------------------------
export const testimonialSchema = z.object({
    quote: z
        .string()
        .min(10, "La citation doit contenir au moins 10 caractères"),
    name: z
        .string()
        .min(2, "Le nom est requis"),
    title: z
        .string()
        .min(2, "Le titre est requis"),
    draft: z
        .boolean(),
});


export const editTestimonialSchema = z.object({
    quote: z
        .string()
        .optional(),
    name: z
        .string()
        .optional(),
    title: z
        .string()
        .optional(),
    draft: z
        .boolean()
        .optional(),
});