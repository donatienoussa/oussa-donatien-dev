/** This file contain the of propos using in components */

export type Project = {
    id: string;
    title: string;
    description: string;
    link: string;
    img: string;
    iconLists: string[];
    features: string[];
}


export type Testimonial = {
    quote: string;
    name: string;
    title: string;
}


export type Service = {
    id: string;
    title: string;
    video: string;
    shortDescription: string;
    description: string;
    active: boolean;
};


export type Post =  {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    postedAt: string;
    isDraft: boolean;
}