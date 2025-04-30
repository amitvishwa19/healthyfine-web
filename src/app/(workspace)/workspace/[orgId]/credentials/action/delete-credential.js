'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { symmetricEncrypt } from "@/lib/encryption";



const DeleteCredential = z.object({
    id: z.string(),
    userId: z.string(),
    orgId: z.string()
});

const handler = async (data) => {
    const session = await getServerSession(authOptions)
    const { id, userId, orgId } = data

    let credential



    try {


        //const encryptedValue = symmetricEncrypt(value)


        credential = await db.credential.delete({
            where: {
                userId: session.user.userId,
                id,
            }
        })

        if (!credential) {
            throw new Error('Failed to create credential')
        }


    } catch (error) {
        console.log(error)
        return {
            error: "Failed to delete credential"
        }
    }

    revalidatePath(`/org//${orgId}/credentials`)
    return { data: credential };

}



export const deleteCredential = createSafeAction(DeleteCredential, handler);