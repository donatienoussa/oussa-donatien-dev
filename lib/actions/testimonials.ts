import { config, databases } from '@/lib/appwrite';
import { Testimonial } from '@/types';


export async function addTestimonial(data: {
    quote: string;
    name: string;
    title: string;
    draft: boolean;
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


export async function fetchTestimonials(): Promise<Testimonial[]> {
    try {
        const response = await databases.listDocuments(
            config.databaseId,
            config.testimonialCollectionId
        );
        

        const testimonials = await Promise.all(
            response.documents.map(async (doc) => ({
                id: doc.$id,
                quote: doc.quote,
                name: doc.name,
                title: doc.title,
                draft: doc.draft
            }))
        );
        
        return testimonials;
        
    }catch(error){
        console.log(error); 
        return [];
    }
    
}

export async function getTestimonialById({ id }: { id: string }): Promise<Testimonial | null> {
    try {
        const response = await databases.getDocument(
            config.databaseId,
            config.testimonialCollectionId,
            id
        );
        return {
            id: response.$id,
            quote: response.quote,
            name: response.name,
            title: response.title,
            draft: response.draft
        };
    } catch (error) {
        console.error('Error fetching testimonial:', error);
        return null;
    }
}

export async function deleteTestimonial(id: string) {
    try {
        await databases.deleteDocument(
            config.databaseId,
            config.testimonialCollectionId,
            id
        );
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        throw error;
    }
}

export async function editTestimonial(id: string, data: {
    quote?: string;
    name?: string;
    title?: string;
    draft?: boolean;
}) {

    try {
        await databases.updateDocument(
            config.databaseId,
            config.testimonialCollectionId,
            id,
            data
        );
    } catch (error) {
        console.error('Error updating testimonial:', error);
        throw error;
    }
}