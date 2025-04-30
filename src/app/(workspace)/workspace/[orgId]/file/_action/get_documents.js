'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { db } from "@/lib/db";


const GetDocuments = z.object({
    userId: z.string(),
    serverId: z.optional(z.string()),
});

const handler = async (data) => {


    const { userId, serverId } = data;
    let documents



    try {

        documents = await db.document.findMany({
            where: {
                userId: userId
            }
        })

        //console.log('getting docs', documents, userId)

    } catch (error) {
        console.log(error)
        return {
            error: "Failed to get documents"
        }
    }

    //revalidatePath(`/org//${server.id}`)
    return { data: documents };

}


export const getDocuments = createSafeAction(GetDocuments, handler);