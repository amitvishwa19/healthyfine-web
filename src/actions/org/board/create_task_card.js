'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { db } from "@/lib/db";

const CreateTaskCard = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
    }).min(3, {
        message: "Title is too short",
    }),
    listId: z.string(),
    boardId: z.string(),
    orgId: z.string()
});

const handler = async (data) => {
    console.log('Create task card')
    const { title, listId, boardId, orgId } = data;
    let card;
    let server;


    try {

        const lastCard = await db.card.findFirst({
            where: { listId },
            orderBy: { order: "desc" },
            select: { order: true },
        });

        const newOrder = lastCard ? lastCard.order + 1 : 1;

        card = await db.card.create({
            data: { title, description: '', listId, order: newOrder }
        })

        server = await db.server.findFirst({
            where: {
                id: orgId
            },
            include: {
                channels: {
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                boards: {
                    where: {
                        status: true
                    },
                    include: {
                        lists: {
                            include: {
                                cards: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                members: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        role: "desc",
                    }
                },

            }
        })



    } catch (error) {
        console.log(error)
        return {
            error: "Failed to create new Task Card"
        }
    }

    //revalidatePath(`/dashboard/org/${orgId}/board/${boardId}`)
    return { data: server };

}


export const createTaskCard = createSafeAction(CreateTaskCard, handler);