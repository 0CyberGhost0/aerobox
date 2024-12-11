'use server';
import { Account, Avatars, Client, Databases, Storage } from "node-appwrite"
import { appwriteConfig } from "./config"
import { cookies } from "next/headers";
import { Databases as Database } from "node-appwrite";

export const createSessionClient=async()=>{
    const client=new Client().setEndpoint(appwriteConfig.endPointUrl).setProject(appwriteConfig.projectId); 
    const session=(await cookies()).get("appwrite-session");
    if(!session || !session.value) throw new Error("No session Found");
    client.setSession(session.value);
    return {
        get account(){
            return new Account(client);
        },
        get databases(){
            return new Database(client);
        }
    }
};
export const createAdminClient=async()=>{
    const client=new Client().setEndpoint(appwriteConfig.endPointUrl).setProject(appwriteConfig.projectId).setKey(appwriteConfig.secretKey);
    
    return {
        get account(){
            return new Account(client);
        },
        get databases(){
            return new Databases(client);
        },
        get storage(){
            return new Storage(client);
        },
        get avatar(){
            return new Avatars(client);
        }
    }
}