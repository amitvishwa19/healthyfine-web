'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { db } from "@/lib/db";
import useAuth from "@/hooks/useAuth";
import { put } from "@vercel/blob";


const GetFiles = z.object(
    {
        data: z.optional(z.string()),
    }
);

const handler = async (data) => {
    const { userId } = await useAuth()
    let documents
    try {
        documents = await db.document.findMany({
            where: {
                userId: userId
            }
        })
    } catch (error) {
        console.log(error)
        return {
            error: "Failed to create new board."
        }
    }

    //revalidatePath(`/org/${orgId}/file`)
    return { data: documents };

}


export const getFiles = createSafeAction(GetFiles, handler);