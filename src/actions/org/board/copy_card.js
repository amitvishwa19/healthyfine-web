'use server'
import { z } from "zod";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { db } from "@/lib/db";

const CopyCard = z.object({
    id: z.string(),
    boardId: z.optional(z.string()),
    listId: z.optional(z.string()),
});

const handler = async (data) => {

    const { id, boardId, listId } = data;
    let card;

    try {

        const cardToCopy = await db.card.findUnique({
            where: { id },
        });

        if (!cardToCopy) {
            return { error: 'Card not found' }
        }



        const lastCard = await db.card.findFirst({
            where: { listId },
            orderBy: { order: "desc" },
            select: { order: true },
        });

        const newOrder = lastCard ? lastCard.order + 1 : 1



        card = await db.card.create({
            data: {
                listId: cardToCopy.listId,
                title: `${cardToCopy.title} - Copy`,
                description: `${cardToCopy.description}`,
                order: newOrder,

            }
        });

        // await createAuditLog({
        //     entityTitle: card.title,
        //     entityId: card.id,
        //     entityType: ENTITY_TYPE.CARD,
        //     action: ACTION.CREATE,
        // })


    } catch (error) {
        console.log(error)
        return {
            error: "Failed to copy the card."
        }
    }

    //revalidatePath(`/project/taskman/board/${boardId}`)
    return { data: card };

}


export const copyCard = createSafeAction(CopyCard, handler);