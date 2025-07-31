export type Service = {
    id: string;
    title: string;
    shortDescription: string;
    description: string;
    listOfSubServices?: string[];
    type: string;
    show?: boolean;
}


export type Tech = {
    id: string;
    title: string;
    description?: string;
    icon: string; // The id of the uploaded file
}

export type Project = {
    id: string;
    title: string;
    description: string;
    link?: string;
    poster: string;
    video: string;
    features: string[];
    type: string; // "web" | "mobile"
    createdAt: string;
}


export type Testimonial = {
    id: string;
    quote: string;  // Le texte du témoignage
    name: string; // Le nom de l'auteur
    title: string; // Le titre de l'auteur (son poste ou son emploi)
    draft: boolean;
}


export type Post =  {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    postedAt: string;
    isDraft: boolean;
    createdAt: string;
}