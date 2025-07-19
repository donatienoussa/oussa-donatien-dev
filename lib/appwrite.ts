import {Client, Account, Databases, Storage} from "appwrite"

export const config = {
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
    endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!, 
    projectCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_COLLECTION_ID!, 
    testimonialCollectionId: process.env.NEXT_PUBLIC_APPWRITE_TESTIMONIAL_COLLECTION_ID!,
    postCollectionId: process.env.NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID!,
    mediaBucketId: process.env.NEXT_PUBLIC_APPWRITE_MEDIA_BUCKET_ID!,
    serviceCollectionId: process.env.NEXT_PUBLIC_APPWRITE_SERVICE_COLLECTION_ID!,
    techCollectionId: process.env.NEXT_PUBLIC_APPWRITE_TECH_COLLECTION_ID!
}

export const client = new Client()
client
    .setProject(config.projectId)
    .setEndpoint(config.endpoint)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)