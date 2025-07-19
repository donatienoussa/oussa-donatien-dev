import { Tech } from "@/types";
import { config, databases } from "../appwrite"
import { getFile, uploadFile } from "./files";
import { Query } from "appwrite";


// CREATE 
export async function createTech(data: {
    title: string;
    description?: string;
    icon: File;
}) {
    try {

        //1- Upload the icon 
        const uploadedFile = await uploadFile(data.icon);
        
        if (!uploadedFile) {
            
            console.log("Échec de l'upload de l'image.");
            
            return {
                success: false, 
                message: "Échec de l'upload de l'image."
            };
        }

        //2- Ajouter une technologie à la base de données
        await databases.createDocument(
            config.databaseId,
            config.techCollectionId,
            "unique()",
            {
                title: data.title,
                description: data.description,
                icon: uploadedFile.$id,
            }
        ); 

        return {
            success: true, 
            message: "Technologie ajoutée avec succès."
        };

    } catch (error) {
        console.error(error)
        return {
            success: false, 
            message: "Échec de l'ajout de la technologie."
        };
    }
}


// GET MANY
export async function getAllTechs(): Promise<Tech[]> {
    try {
        const response = await databases.listDocuments(
            config.databaseId,
            config.techCollectionId,
            [
                Query.orderDesc('title')
            ]
        )
        
        const techs = await Promise.all(
            response.documents.map(async (doc) => ({
                id: doc.$id,
                title: doc.title,
                description: doc.description,
                icon: await getFile(doc.icon),
            }))
        );

        console.log(techs)

        return techs


    } catch (error) {
        console.error("Error fetching techs:", error);
        return [];
    }
}


// READ ONE
export async function getTechnologyById({ id }: { id: string }) {
    try {
        const response = await databases.getDocument(
            config.databaseId,
            config.techCollectionId,
            id
        )

        const tech = {
            id: response.$id,
            title: response.title,
            description: response.description,
            icon: await getFile(response.icon),
        }

        return tech

    
    }catch(error) {
        console.log(error)
    }
}

// UPDATE
export async function updateTech(id: string,  data: {
    title?: string;
    description?: string;
    icon?: File;
}) {
    try {
        
        let uploadedFile = null;

        if (data.icon) {
            
            //Supprimer l'ancienne image 
            
            // Uploader la nouvelle 
            uploadedFile = await uploadFile(data.icon);
            
            if (!uploadedFile) {
                console.log("Échec de l'upload de l'image.");
                return {
                    success: false,
                    message: "Échec de l'upload de l'image."
                };
            }
        }

        const payload: Partial<Tech> = {};
        if (data.title)
            payload.title = data.title;
        
        if (data.description)
            payload.description = data.description;
        
        if (data.icon)
            payload.icon = uploadedFile?.$id;


        await databases.updateDocument(
            config.databaseId,
            config.techCollectionId,
            id,
            payload   
        )

        return {
            success: true, 
            message: "Technologie mise à jour avec succès."
        };
    } catch (error) {
        console.error("Error updating tech:", error);
        return {
            success: false, 
            message: "Échec de la mise à jour de la technologie."
        };
    }
}


// DELETE
export async function deleteTech(id: string) {
    try {
        const response = await databases.deleteDocument(
            config.databaseId,
            config.techCollectionId,
            id
        )

        return response;
    } catch (error) {
        console.error("Error deleting tech:", error);
    }
}
