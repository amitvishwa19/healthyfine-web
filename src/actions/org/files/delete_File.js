'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { db } from "@/lib/db";
import useAuth from "@/hooks/useAuth";
import { put, del } from "@vercel/blob";


const DeleteFiles = z.object(
    {
        documentId: z.string(),
        orgId: z.string(),
        userId: z.optional(z.string()),
        url: z.string()
    }
);

const handler = async (data) => {

    const { documentId, orgId, userId, url } = data
    let document
    let documents
    try {
        console.log('Delete Document', orgId, documentId, userId)

        document = await db.document.delete({
            where: {
                id: documentId,
                userId
            }
        })

        documents = await db.document.findMany({
            where: {
                userId: userId
            }
        })

        const delfile = del(url);


    } catch (error) {
        console.log(error)
        return {
            error: "Failed to delete document"
        }
    }

    revalidatePath(`/workspace/${orgId}/file`)
    return { data: { document, documents } };

}


export const deleteFiles = createSafeAction(DeleteFiles, handler);