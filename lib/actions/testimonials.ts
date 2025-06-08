import { config, databases } from '@/lib/appwrite';
import { Testimonial } from '@/types';

export async function addTestimonial(data: {
    quote: string;
    name: string;
    title: string;
}) {
    try {
        await databases.createDocument(
            config.databaseId,
            config.testimonialCollectionId, 'unique()', data);
    } catch (err) {
        console.error('Erreur ajout testimonial :', err);
        throw err;
    }
}


export default async function fetchTestimonials(): Promise<Testimonial[]> {
    try {
        const response = await databases.listDocuments(
            config.databaseId,
            config.testimonialCollectionId
        );
        

        const testimonials = await Promise.all(
            response.documents.map(async (doc) => ({
                quote: doc.quote,
                name: doc.name,
                title: doc.title,
            }))
        );
        
        return testimonials;
        
    }catch(error){
        console.log(error); 
        return [];
    }
    
}