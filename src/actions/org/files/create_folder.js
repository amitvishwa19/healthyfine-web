'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { db } from "@/lib/db";
import useAuth from "@/hooks/useAuth";
import { put } from "@vercel/blob";


const CreateFolder = z.object(
    {
        orgId: z.string(),
        userId: z.string(),
        name: z.string()
    }
);

const handler = async (data) => {
    const { orgId, userId, name } = data

    let folder
    try {


        console.log(orgId, userId)

        folder = await db.folder.create({
            data: {
                userId,
                name
            }
        })


    } catch (error) {
        console.log(error)
        return { error: "Failed to create new folder." }
    }

    revalidatePath(`/workspace/${orgId}/file`)
    return { data: folder };

}


export const createFolder = createSafeAction(CreateFolder, handler);