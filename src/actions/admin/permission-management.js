'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { v4 as uuidv4 } from 'uuid'
import useAuth from "@/hooks/useAuth";
import { db } from "@/lib/db";
import { includes, orderBy } from "lodash";
import { slugify } from "@/utils/functions";


const PermissionManagement = z.object({
    id: z.optional(z.string()),
    title: z.optional(z.string()),
    description: z.optional(z.string()),
    status: z.optional(z.string()),
    type: z.string(),
});

const handler = async (data) => {
    const { userId } = await useAuth()
    const { id, title, description, type, status } = data;
    let permissions





    try {

        if (type === 'getPermission') {
            permissions = await db.permission.findMany({

                orderBy: {
                    createdAt: 'desc',
                },
            })
        }


        if (type === 'addPermission') {
            permissions = await db.permission.create({
                data: {
                    title: slugify(title),
                    description,
                    status: status === 'true' ? true : false
                }
            })

        }

        if (type === 'editPermission') {
            permissions = await db.permission.update({
                where: { id },
                data: {
                    title: slugify(title),
                    description,
                    status: status === 'true' ? true : false
                }
            })

        }

        if (type === 'deletePermission') {
            const deleteUser = await db.permission.delete({
                where: {
                    id
                },
            })

        }




    } catch (error) {
        console.log(error)
        return {
            error: "Failed to create permission"
        }
    }

    revalidatePath(`/admin//permission`)
    return { data: { permissions: permissions } };

}


export const permissionManagement = createSafeAction(PermissionManagement, handler);