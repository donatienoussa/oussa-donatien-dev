import { Post } from "@/types";
import { config, databases } from "../appwrite";
import { ID, Query } from "appwrite";

// READ ALL POSTS
export async function fetchPosts({isDraft}:{isDraft?:boolean}): Promise<Post[]> {
    try {

        const queryBuilder = [
            Query.orderDesc("postedAt")
        ]

        if (!isDraft) {
            queryBuilder.push(Query.equal("isDraft", false));
        }

        const response = await databases.listDocuments(
            config.databaseId,
            config.postCollectionId,
            queryBuilder
        );

        return response.documents.map((doc) => ({
            id: doc.$id,
            title: doc.title,
            excerpt: doc.excerpt,
            content: doc.content,
            postedAt: doc.postedAt,
            isDraft: doc.isDraft,
            createdAt: doc.createdAt
        }));
    } catch (error) {
        console.error("Erreur lors du fetch des posts :", error);
        return [];
    }
}


// READ A SINGLE POST
export async function fetchPostById({ postId }: { postId: string }): Promise<Post | null> {
    try {
        const response = await databases.getDocument(
            config.databaseId,
            config.postCollectionId,
            postId
        );

        return {
            id: response.$id,
            title: response.title,
            excerpt: response.excerpt,
            content: response.content,
            postedAt: response.postedAt,
            isDraft: response.isDraft,
            createdAt: response.createdAt
        };
    } catch (error) {
        console.error("Erreur lors du fetch du post :", error);
        return null;
    }
}


// CREATE A NEW POST
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

// UPDATE AN EXISTING POST
export async function updatePost(id: string, data: {
    title?: string;
    excerpt?: string;
    content?: string;
    isDraft?: boolean;
}) {
    try {
        const response = await databases.updateDocument(
            config.databaseId,
            config.postCollectionId,
            id,
            data
        );

        return response;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du post :', error);
        throw error;
    }
}

// DELETE A POST
export async function deletePost(id: string) {
    try {
        await databases.deleteDocument(
            config.databaseId,
            config.postCollectionId,
            id
        );
    } catch (error) {
        console.error('Erreur lors de la suppression du post :', error);
        throw error;
    }
}