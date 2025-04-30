'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { prisma } from "../../../../prisma/prisma";

const UpdateCardOrder = z.object({
    items: z.array(
        z.object({
            id: z.string(),
            title: z.string(),
            order: z.number(),
            listId: z.string(),
        })
    ),
    boardId: z.string(),
});

const handler = async (data) => {

    const { items, boardId } = data;
    console.log('update card data', data)
    let updatedCards;


    try {
        const transaction = items.map((card) =>
            prisma.card.update({
                where: { id: card.id },
                data: {
                    order: card.order,
                    listId: card.listId,
                },
            }),
        );

        updatedCards = await prisma.$transaction(transaction);

    } catch (error) {
        console.log(error)
        return {
            error: "Failed to reorder cards."
        }
    }


    revalidatePath(`/project/taskman/board/${boardId}`)
    return { data: updatedCards };

}


export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);