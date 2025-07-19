import { Query } from "appwrite"
import { config, databases } from "../appwrite"
import { Service } from "@/types"

export async function addService(data: {
  title: string,
  shortDescription: string,
  description?: string,
  listOfSubServices: string[],
  type?: string | undefined,
  show?: boolean | undefined
}) {
  const response = await databases.createDocument(
    config.databaseId,
    config.serviceCollectionId,
    'unique()',
    data
  )

  return response
}


export async function fetchServices({show}: { show?: boolean } ) : Promise<Service[]> {
  
  try {
    const queryBuilder = [Query.orderAsc('title')]

    if (show) {
      queryBuilder.push(Query.equal('show', show))
    }

    const response = await databases.listDocuments(
      config.databaseId,
      config.serviceCollectionId,
      queryBuilder
    )


    const services = response.documents.map((doc) => ({
      id: doc.$id,
      title: doc.title,
      shortDescription: doc.shortDescription,
      description: doc.description,
      listOfSubServices: doc.listOfSubServices || [],
      type: doc.type,
      show: doc.show || false,
      createdAt: doc.$createdAt,
    }));

    return services;

  

    
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function fetchSingleService({ id }: { id: string }) {

  try{
    const response = await databases.getDocument(
      config.databaseId,
      config.serviceCollectionId,
      id
    )

    return response
    
  }catch(error){
    console.error("Error fetching service:", error);
  }
}

export async function updateService(id: string, data: {
  title?: string,
  shortDescription?: string,
  description?: string,
  listOfSubServices?: string[],
  type?: string | undefined,
  show?: boolean | undefined
}) {
  try{
    const response = await databases.updateDocument(
      config.databaseId,
      config.serviceCollectionId,
      id,
      data
    )

    return response;
    
  } catch (error) {
    console.error("Error updating service:", error);
  }
}

export async function deleteService(id:string){

  try {
    const response = await databases.deleteDocument(  
      config.databaseId,
      config.serviceCollectionId,
      id
    )

    return response;
    
  }catch(error){
    console.error("Error deleting service:", error);
  }

}