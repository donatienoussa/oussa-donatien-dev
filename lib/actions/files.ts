import { ID } from "appwrite";
import { config, storage } from "../appwrite";


// 1- CREATE
export async function uploadFile(file: File) {

    try {
        const response = await storage.createFile(
            config.mediaBucketId,
            ID.unique(),
            file
        )
        return response;
    } catch (error) {
        console.log(error)
        return null
    }
}

// 2- READ
export  async function getFile(id: string) {
    try {

        if (typeof id !== 'string') throw new Error('ID doit être une string');

        const response = storage.getFileView(
            config.mediaBucketId,
            id
        ); 
        
        console.log("File URL:", response.toString());

        return response.toString();

        
    } catch (error) {
        console.log(error);
        return '';
    }
}

//3- UPDATE 
export async function deleteFile(id: string): Promise<void> {
    try {
        await storage.deleteFile(config.mediaBucketId, id);
    } catch (error) {
        console.log(error);
    }
}