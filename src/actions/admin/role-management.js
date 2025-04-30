'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { v4 as uuidv4 } from 'uuid'
import useAuth from "@/hooks/useAuth";
import { db } from "@/lib/db";
import { includes, orderBy, update } from "lodash";
import { slugify } from "@/utils/functions";


const RoleManagement = z.object({
    id: z.optional(z.string()),
    title: z.optional(z.string()),
    description: z.optional(z.string()),
    status: z.optional(z.string()),
    type: z.string(),
    permissions: z.optional(z.array(z.string()))
});

const handler = async (data) => {
    const { userId } = await useAuth()
    const { id, title, description, type, status, permissions } = data;
    let roles


    try {

        if (type === 'getRoles') {
            roles = await db.role.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    permissions: true
                }
            })
        }


        if (type === 'addRole') {

            const nperm = permissions.map((i) => { return { id: i }; })


            roles = await db.role.create({
                data: {
                    title: slugify(title),
                    description,
                    status: status === 'true' ? true : false,

                },
                include: {
                    permissions: true
                }
            })


            permissions.map(async (p) => {
                roles = await db.role.update({
                    where: {
                        id: roles.id
                    },
                    data: {
                        permissions: {
                            set: nperm
                        },
                    }
                })
            })


        }

        if (type === 'editRole') {

            const nperm = permissions.map((i) => { return { id: i }; })

            roles = await db.role.update({
                where: { id },
                data: {
                    title: slugify(title),
                    description,
                    status: status === 'true' ? true : false,
                    permissions: {
                        set: nperm
                    },
                },
                include: {
                    permissions: true
                }
            })


        }

        if (type === 'deleteRole') {
            roles = await db.role.delete({
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

    revalidatePath(`/admin//role`)
    return { data: { roles: roles } };

}


export const roleManagement = createSafeAction(RoleManagement, handler);