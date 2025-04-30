'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { symmetricEncrypt } from "@/lib/encryption";



const CreateCredential = z.object({
    userId: z.string(),
    name: z.string(),
    value: z.string().optional(),
    orgId: z.string().optional(),
});

const handler = async (data) => {
    const session = await getServerSession(authOptions)
    const { name, value, orgId } = data

    let credential

    console.log('orgId', orgId)

    try {


        const encryptedValue = symmetricEncrypt(value)


        credential = await db.credential.create({
            data: {
                userId: session.user.userId,
                name,
                value: encryptedValue
            }
        })

        if (!credential) {
            throw new Error('Failed to create credential')
        }


    } catch (error) {
        console.log(error)
        return {
            error: "Failed to create workflow"
        }
    }

    revalidatePath(`/org//${orgId}/credentials`)
    return { data: credential };

}



export const createCredential = createSafeAction(CreateCredential, handler);