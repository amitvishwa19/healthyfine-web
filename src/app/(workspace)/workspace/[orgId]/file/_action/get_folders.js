'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { db } from "@/lib/db";


const GetFolders = z.object({
    userId: z.string(),
    serverId: z.optional(z.string()),
});

const handler = async (data) => {


    const { userId, serverId } = data;
    let folder

    folder = await db.folder.findMany({
        where: {
            userId: userId
        }
    })

    try {



    } catch (error) {
        console.log(error)
        return {
            error: "Failed to create channel"
        }
    }

    //revalidatePath(`/org//${server.id}`)
    return { data: folder };

}


export const getFolders = createSafeAction(GetFolders, handler);