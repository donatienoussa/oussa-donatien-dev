import { ID } from "appwrite";
import { config, databases } from "../appwrite";
import { getFile } from "./files";
import { Project } from "@/types";

export async function fetchProjects() {
    try {
        const response = await databases.listDocuments(
            config.databaseId,
            config.projectCollectionId
        );

        
        const projects = await Promise.all(
            response.documents.map(async (doc) => ({
                id: doc.$id,
                title: doc.title,
                description: doc.description,
                img: await getFile(doc.img), // <-- on attend ici
                iconLists: doc.iconLists,
                link: doc.link,
                features: doc.features
            }))
        );
        
        return projects;

    } catch (error) {
        console.error('Erreur lors de la récupération des projets :', error);
        return [];
    }
}


export async function addProject(projectData: {
    title: string;
    description: string;
    img: string;
    iconLists: string[];
    link: string;
}) {
    try {
        const response = await databases.createDocument(
            config.databaseId,
            config.projectCollectionId, 
            ID.unique(),
            {
                title: projectData.title,
                description: projectData.description,
                img: projectData.img,
                iconLists: projectData.iconLists,
                link: projectData.link,
            }
        );

        return response;
    } catch (error) {
        console.error('Erreur lors de l’ajout du projet :', error);
        throw error;
    }
}

// Fonction pour récupérer un projet
export async function getProjectById(
    { projectId }: { projectId: string }
): Promise<Project | null> {
    try {
        const document = await databases.getDocument(
            config.databaseId,
            config.projectCollectionId,
            projectId
        );

        return {
            id: document.$id,
            title: document.title,
            description: document.description,
            link: document.link,
            img: document.img,
            iconLists: document.iconLists,
            features: document.features
        };
    } catch (error) {
        console.error('Erreur lors de la récupération du projet :', error);
        return null;
    }
  }