import { Post } from "@/types";
import { config, databases } from "../appwrite";
import { ID, Query } from "appwrite";

export async function fetchPosts(): Promise<Post[]> {
    try {
        const response = await databases.listDocuments(
            config.databaseId,
            config.postCollectionId,
            [
                Query.equal("isDraft", false),
                Query.orderDesc("postedAt")
            ]
        );

        return response.documents.map((doc) => ({
            id: doc.$id,
            title: doc.title,
            excerpt: doc.excerpt,
            content: doc.content,
            postedAt: doc.postedAt,
            isDraft: doc.isDraft,
        }));
    } catch (error) {
        console.error("Erreur lors du fetch des posts :", error);
        return [];
    }
}




export async function createPost(data: {
    title: string;
    excerpt: string;
    content: string;
    postedAt: string;
    isDraft: boolean;
}) {
    try {
        const response = await databases.createDocument(
            config.databaseId,
            config.postCollectionId,
            ID.unique(),
            data
        );

        return response;
    } catch (error) {
        console.error('Erreur lors de la création du post :', error);
        throw error;
    }
}
