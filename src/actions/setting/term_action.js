'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { prisma } from "../../../prisma/prisma";
import useAuth from "@/hooks/useAuth";
import { db } from "@/lib/db";
// import useAuth from "@/hooks/useAuth";

const TermAction = z.object({
    type: z.string(),
    key: z.string(),
    value: z.optional(z.string()),
});

const handler = async (data) => {
    const { userId } = await useAuth()
    const { type, key, value } = data;
    let res;

    try {

        console.log(userId)
        //console.log('Privacy Policy', value)

        if (type === 'get') {
            res = await db.setting.findFirst({
                where: {
                    key: key
                }
            })

        }

        if (type === 'post') {

            await db.setting.deleteMany({
                where: {
                    key
                }
            })
            res = await db.setting.create({
                data: {
                    userId,
                    key,
                    value
                }
            })
        }



    } catch (error) {
        console.log(error)
        return {
            error: "error"
        }
    }

    //revalidatePath(`/project/taskman/board/${boardId}`)
    return { data: { type, res } };

}


export const termAction = createSafeAction(TermAction, handler);