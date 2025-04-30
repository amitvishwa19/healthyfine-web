'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { db } from "@/lib/db";
import useAuth from "@/hooks/useAuth";
import { put } from "@vercel/blob";


const UploadFIle = z.object(
    // z.object({
    //     name: z.optional(z.string()),
    //     type: z.optional(z.string()),
    //     url: z.string(),
    //     size: z.optional(z.number()),
    //     //file: z.optional(z.any())
    // })
    {
        item: z.string()
    }
);

const handler = async (data) => {
    const { userId } = await useAuth()
    const { item } = data;
    let file

    try {
        console.log('FIle Upload', JSON.parse(item))



    } catch (error) {
        console.log(error)
        return {
            error: "Failed to create new board."
        }
    }

    //revalidatePath(`/org/${orgId}/file`)
    return { data: file };

}


export const uploadFIle = createSafeAction(UploadFIle, handler);