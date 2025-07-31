import { ID, Query } from "appwrite";
import { config, databases } from "../appwrite";
import { getFile, uploadFile } from "./files";
import { Project } from "@/types";



//1- CREATE 
export async function addProject(projectData: {
    title: string;
    description: string;
    features: string[];
    poster: File;
    video: File;
    link?: string;
    type: string;
    createdAt: string;
}) {

    try {

        //1- Uploader l'image (poster)
        const uploadedImage = await uploadFile(projectData.poster);
        
        if (!uploadedImage) {
            throw new Error("Échec de l'upload de l'image.");
        }

        const uploadedVideo = await uploadFile(projectData.video);
        
        if (!uploadedVideo) {
            throw new Error("Échec de l'upload de la video.");
        }

        const response = await databases.createDocument(
            config.databaseId,
            config.projectCollectionId,
            ID.unique(),
            {
                title: projectData.title,
                description: projectData.description,
                features: projectData.features,
                poster: uploadedImage.$id,
                video: uploadedVideo.$id,
                link: projectData.link,
                type: projectData.type,
                createdAt: projectData.createdAt
            }
        );

        return response;
    } catch (error) {
        console.error('Erreur lors de l’ajout du projet :', error);
        throw error;
    }
}


//2- READ ONE
export async function getProjectById({id}: {id: string}): Promise<Project | null> {
    
    try {
        
        const doc = await databases.getDocument(
            config.databaseId,
            config.projectCollectionId,
            id
        );

        const project: Project = {
            id: doc.$id,
            title: doc.title,
            description: doc.description,
            poster: await getFile(doc.poster),
            video: await getFile(doc.video),
            link: doc.link,
            features: doc.features,
            type: doc.type,
            createdAt: doc.createdAt
        };

        return project;
    } catch (error) {
        console.error('Erreur lors de la récupération du projet :', error);
        return null;
    }
}


//3- READ MANY
export async function fetchProjects({
    type,
    limit
}: {
    type: string,
    limit?: number
}): Promise<Project[]> {
    
    try {

        const queryBuilder = [
            Query.equal('type', type)
        ];

        if (limit && !isNaN(Number(limit))) {
            queryBuilder.push(Query.limit(Number(limit)));
        }

        queryBuilder.push(Query.orderDesc('createdAt'));

        const response = await databases.listDocuments(
            config.databaseId,
            config.projectCollectionId, 
            queryBuilder
        );

        console.warn('Projets récupérés :', response.documents);


        // On utilise Promise.all pour attendre que toutes les images soient récupérées
        const projects = await Promise.all(
            response.documents.map(async (doc) => ({
                id: doc.$id,
                title: doc.title,
                description: doc.description,
                poster: await getFile(doc.poster), 
                video: await getFile(doc.video),
                link: doc.link,
                features: doc.features, 
                type: doc.type,
                createdAt: doc.createdAt
            }))
        );
        
        return projects;

    } catch (error) {
        console.error('Erreur lors de la récupération des projets :', error);
        return [];
    }
}

//4- UPDATE
export async function updateProject(id: string, projectData: {
    title?: string;
    description?: string;
    features?: string[];
    poster?: string;
    iconLists?: string[];
    link?: string ;
    type?: string;
  }) { 
    try {
        const response = await databases.updateDocument(
            config.databaseId,
            config.projectCollectionId,
            id,
            projectData
        );

        return response;
        
    } catch (error) {
        console.error('Erreur lors de la mise à jour du projet :', error);
        throw error;
    }
}


//5- DELETE
export async function deleteProject(id: string) {
    try {
        await databases.deleteDocument(
            config.databaseId,
            config.projectCollectionId,
            id
        );
    } catch (error) {
        console.error('Erreur lors de la suppression du projet :', error);
        throw error;
    }
}
