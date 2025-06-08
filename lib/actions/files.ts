import { ID } from "appwrite";
import { config, storage } from "../appwrite";



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

export  async function getFile(id: string): Promise<string> {
    try {
        const response = storage.getFileView(
            config.mediaBucketId,
            id
        ); 

        return response.toString();
        
    } catch (error) {
        console.log(error);
        return '';
    }
}