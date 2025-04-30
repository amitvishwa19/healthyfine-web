'use server'
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/utils/CreateSafeAction";
import { db } from "@/lib/db";
import { AppMailer } from "@/utils/AppMailer";
import BoardNotification from '@/emails/BoardNotification'
import useAuth from "@/hooks/useAuth";

const CreateBoard = z.object({
    orgId: z.string(),
    title: z.string(),
    description: z.string(),
    avatar: z.string(),
});

const handler = async (data) => {
    const { user } = await useAuth()
    const { orgId, title, description, avatar } = data;
    let board;
    let server;

    try {

        board = await db.board.create(
            {
                data: {
                    serverId: orgId,
                    title,
                    description,
                    avatar,
                    showBackground: false
                }
            }
        )

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

        const mailData = {
            name: user.displayName,
            boardTitle: title,
            type: 'create',
            boardUrl: `dashboard/org/${orgId}/board/${board.id}`
        }


        if (board) {
            AppMailer(
                user.email,
                'Devlomatix Info <info@devlomatix.online>',
                `Taskboard ${title} created successfully`,
                <BoardNotification mailData={mailData} />,
            )
        }


    } catch (error) {
        console.log(error)
        return {
            error: "Failed to create new board."
        }
    }

    revalidatePath(`/dashboard/org/${orgId}`)
    return { data: server };

}


export const createBoard = createSafeAction(CreateBoard, handler);